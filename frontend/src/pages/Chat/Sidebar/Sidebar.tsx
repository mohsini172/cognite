import React, { useState } from 'react';
import { Chat } from '../../../models/chat.model';
import { User } from '../../../models/user.model';
import { useObservable } from '../../../store';
import { changeActiveChat, chats$, createChat } from '../../../store/chat';
import { contacts$, logout, user$ } from '../../../store/user';
import styles from './Sidebar.module.css';

export function Sidebar() {
    const contacts = useObservable<User[]>(contacts$);
    const chats = useObservable<Chat[]>(chats$);
    const user = useObservable<User>(user$);
    const [showContacts, setShowContacts] = useState(false);

    function onCreateChat(userId: string, contactId: string) {
        createChat(userId, contactId);
        setShowContacts(false);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.contacts} ${showContacts ? styles.contactsVisible : ''}`}>
                <div className={styles.newMessageHeader}>
                    <span>New Message</span>
                    <img onClick={() => setShowContacts(false)} src="/close.svg" alt="" />
                </div>
                {
                    contacts?.map((contact, index) => (
                        contact?._id !== user?._id &&
                        <div onClick={() => onCreateChat(user?._id || "", contact._id)} key={index} className={styles.contact}>
                            <div className={styles.contactName}>{contact.name}</div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.header}>
                <div className={styles.icon} onClick={() => logout()}>
                    <img src="/exit.svg" alt="" />
                </div>
                {user?.name}
                <div className={styles.icon} onClick={() => setShowContacts(!showContacts)}>
                    <img src="/chat.svg" alt="" />
                </div>
            </div>
            <div>
                {
                    chats?.map((chat, index) => (
                        <div key={index} className={styles.contact} onClick={() => changeActiveChat(user?._id || "", chat._id)}>
                            {console.log(chat)}
                            <div className={styles.contactName}>{chat?.user1?._id !== user?._id ? chat?.user1?.name : chat?.user2?.name}</div>
                            <div className={styles.lastMessage}>{chat?.texts?.length > 0 ? chat?.texts[chat?.texts?.length - 1].value : ''}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}