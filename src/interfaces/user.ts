export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'Appear Offline',
    Away = 'Away'
}

export interface User {
    uid: string,
    nick: string,
    name: string,
    age: number,
    email: string,
    active: boolean,
    status: Status,
    friend: boolean
}