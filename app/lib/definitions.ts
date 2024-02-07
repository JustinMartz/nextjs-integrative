export interface User {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    privelege: Privelege,
    practiceName: string
}

export interface Client {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    address: Address | AddressWithUnit,
    phone: string,
    active: boolean,
    reminderPreference: Reminder,
    dateOfBirth: Date
}

export enum Privelege {
    ADMIN = 5,
    PROVIDER = 1
}

export enum Reminder {
    NONE = 0,
    TEXT = 1,
    EMAIL = 2,
    BOTH = 3
}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface AddressWithUnit extends Address {
    unit: string;
}