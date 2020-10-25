import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import config from '../config.json';
import { Chat } from '../models/chat.model';
import { user$ } from './user';
import { Text } from '../models/text.model';
import io from 'socket.io-client';
export const socket = io(config.socketHost);


//----------------- Subjects and Observables ----------------//
const loading = new BehaviorSubject<boolean>(false);
const chats = new BehaviorSubject<Chat[]>([]);
const activeChat = new BehaviorSubject<Chat | null>(null);
const messages = new BehaviorSubject<Text[]>([]);

export const loading$ = loading.asObservable();
export const chats$ = chats.asObservable();
export const activeChat$ = activeChat.asObservable();
export const messages$ = messages.asObservable();


//----------------- xxxxxxxx ----------------//



export async function listChats(userId: string) {
    try {
        const { data } = await axios.get<Chat[]>(`${config.apiUrl}/users/${userId}/chats`)
        chats.next(data);
        if (data.length > 0) {
            changeActiveChat(userId, data[0]._id);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createChat(userId: string, contactId: string) {
    try {
        const { data, status } = await axios.post<Chat>(`${config.apiUrl}/users/${userId}/chats`, { contactId })
        if (status === 201) {
            chats.next([...chats.value, data]);
        }
        if (chats.value.length > 0) {
            changeActiveChat(userId, chats.value[0]._id)
        }
    } catch (error) {
        console.error(error);
    }
}

export async function changeActiveChat(userId: string, chatId: string) {
    try {
        const chat = chats.value.find((value) => value._id === chatId);
        if (chat) {
            activeChat.next(chat)
        }
        const { data } = await axios.get<Text[]>(`${config.apiUrl}/users/${userId}/chats/${chatId}`)
        messages.next(data);
    } catch (error) {
        console.error(error);
    }
}

export async function send(from: string, to: string, value: string) {
    socket.emit('send', { from, to, value });
    messages.next([...messages.value, { from, value, date: new Date() }])
    updateLastSent({ from, value, date: new Date() })
}

user$.subscribe((user) => {
    listChats(user._id);
    socket.emit('setUser', { userId: user._id });
})

socket.on('receive', (data: Text) => {
    if (activeChat?.value?.user1._id === data.from || activeChat?.value?.user2._id) {
        messages.next([...messages.value, data]);
    }
    updateLastSent(data)
})

// This work is for last message in the sidebar
function updateLastSent(text: Text) {
    const chatIndex = chats.value.findIndex((chat) => (
        chat.user1._id === text.from || chat.user2._id === text.from
    ));

    if (chatIndex >= 0) {
        // deep clonning
        const updatedChats: Chat[] = JSON.parse(JSON.stringify(chats.value));
        updatedChats[chatIndex].texts.push(text);
        chats.next(updatedChats);
    }
}