import React from 'react';
import styles from './Layout.module.css'
import { Routes } from './Routes';


export function Layout() {
    return (
        <div className={styles.layout}>
            <Routes />
        </div>
    )
}