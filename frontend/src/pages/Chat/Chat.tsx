import React from 'react';
import styles from './Chat.module.css';
import { Messages } from './Messages/Messages';
import { Sidebar } from './Sidebar/Sidebar';

export function Chat() {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.messages}>
                <Messages />
            </div>
        </div>
    )
}