import React, { useEffect, useState } from 'react';
import { Chat } from '../../../models/chat.model';
import { User } from '../../../models/user.model';
import { useObservable } from '../../../store';
import { activeChat$, changeActiveChat, chats$, createChat } from '../../../store/chat';
import { contacts$, listContacts, logout, user$ } from '../../../store/user';
import styles from './Sidebar.module.css';

export function Sidebar() {
    const contacts = useObservable<User[]>(contacts$);
    const chats = useObservable<Chat[]>(chats$);
    const user = useObservable<User>(user$);
    const activeChat = useObservable<User>(activeChat$);
    const [showContacts, setShowContacts] = useState(false);

    function onCreateChat(userId: string, contactId: string) {
        createChat(userId, contactId);
        setShowContacts(false);
    }

    useEffect(() => { listContacts() }, [])

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
                <div className={styles.icon} onClick={() => { setShowContacts(!showContacts); listContacts() }}>
                    <img src="/chat.svg" alt="" />
                </div>
            </div>
            <div>
                {
                    chats?.length === 0 &&
                    <div className={styles.emptyInbox}>No chats</div>
                }
                {
                    chats?.map((chat, index) => (
                        <div key={index} className={`${styles.contact} ${activeChat?._id === chat._id ? styles.active : ''}`} onClick={() => changeActiveChat(user?._id || "", chat._id)}>
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