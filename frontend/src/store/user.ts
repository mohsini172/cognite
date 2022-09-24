import { BehaviorSubject, ReplaySubject } from 'rxjs';
import axios from 'axios';
import config from '../config.json';
import { User } from '../models/user.model';

//----------------- Initialization ----------------//
const profile = JSON.parse(localStorage.getItem('profile') || "{}");
const initialLoginStatus = profile?._id && profile?.name && profile?.username;



//----------------- Subjects and Observables ----------------//
const isLoggedIn = new BehaviorSubject<boolean>(initialLoginStatus);
const loading = new BehaviorSubject<boolean>(false);
const user = new ReplaySubject<User>(1);
const contacts = new ReplaySubject<User[]>(1)
const error = new ReplaySubject<string|undefined>(1)

if (initialLoginStatus) {
    user.next(profile)
}

export const isLoggedIn$ = isLoggedIn.asObservable();
export const loading$ = loading.asObservable();
export const user$ = user.asObservable();
export const contacts$ = contacts.asObservable();
export const error$ = error.asObservable();


//----------------- xxxxxxxx ----------------//


export async function login(username: string) {
    try {
        loading.next(true);
        const { data } = await axios.post<User>(`${config.apiUrl}/auth/login`, { username })
        isLoggedIn.next(true);
        user.next(data);
        localStorage.setItem('profile', JSON.stringify(data));
    } catch (_) {
        error.next('Invalid username.')
        setTimeout(() => {
            error.next(undefined)
        }, 5000);
        loading.next(false);
    }
}

export async function signup(name: string, username: string) {
    try {
        loading.next(true);
        const { data } = await axios.post<User>(`${config.apiUrl}/auth/signup`, { name, username })
        isLoggedIn.next(true);
        user.next(data);
        localStorage.setItem('profile', JSON.stringify(data));
    } catch (error) {
        loading.next(false);
    }
}

export function listContacts() {
    axios.get<User[]>(`${config.apiUrl}/users`)
        .then(({ data }) =>
            contacts.next(data)
        )
        .catch(error => console.error(error))
}

export async function logout() {
    try {
        localStorage.setItem('profile', "");
        isLoggedIn.next(false);
    } catch (error) {
        console.error(error);
    }
}

listContacts();