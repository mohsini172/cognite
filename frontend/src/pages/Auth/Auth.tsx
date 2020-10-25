import React from 'react';
import styles from './Auth.module.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';

export function Auth(props: {match: any}) {
    return (
        <div className={styles.authContainer}>
            <div className={styles.background}></div>
            <div className={styles.routes}>
                <div className={styles.welcome}>Welcome</div>
                <Switch>
                    <Redirect from={`${props.match.path}/`} exact={true} to={`${props.match.path}/login`} />
                    <Route path={`${props.match.path}/login`} exact={true} component={Login} />
                    <Route path={`${props.match.path}/signup`} exact={true} component={Signup} />
                </Switch>
            </div>
        </div>
    )
}