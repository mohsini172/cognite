import React, { useEffect, useState } from 'react';
import { User } from '../../../models/user.model';
import { Text } from '../../../models/text.model';
import { useObservable } from '../../../store';
import { activeChat$, messages$, send } from '../../../store/chat';
import { user$ } from '../../../store/user';
import styles from './Messages.module.css';
import { Chat } from '../../../models/chat.model';

export function Messages() {
    const messages = useObservable<Text[]>(messages$)
    const activeChat = useObservable<Chat>(activeChat$)
    const user = useObservable<User>(user$);
    const [message, setMessage] = useState("");
    const [lastMessage, setLastMessage] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lastMessage) {
            lastMessage?.scrollIntoView({ behavior: "smooth" });
        }
    })

    function onSubmit(event: any) {
        event.preventDefault();
        if (!message) return;
        const to = (activeChat?.user1._id !== user?._id) ? activeChat?.user1._id : activeChat?.user2._id
        send(user?._id || "", to || "", message);
        setMessage("");
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {(activeChat?.user1?._id !== user?._id ? activeChat?.user1.name : activeChat?.user2?.name) || "Messages"}
            </div>
            <div className={styles.background}></div>
            <div className={styles.texts}>
                {
                    messages?.map((message, index) => (
                        message.from === user?._id ? (
                            <div key={index} className={styles.rightTextContainer} ref={(el) => { setLastMessage(el); }}>
                                <div className={styles.rightText}>{message.value}</div>
                            </div>
                        ) : (
                                <div key={index} className={styles.leftTextContainer} ref={(el) => { setLastMessage(el); }}>
                                    <div className={styles.leftText}>{message.value}</div>
                                </div>
                            )
                    ))
                }

            </div>
            <form onSubmit={(e) => onSubmit(e)} className={styles.footer}>
                <input value={message} required={true} onChange={(e) => setMessage(e.target.value)} type="text" className="input" placeholder="Type a message" />
                <img onClick={(e) => onSubmit(e)} className={styles.sendIcon} src="/send.svg" alt="" />
            </form>
        </div>
    )
}