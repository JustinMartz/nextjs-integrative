export type Provider = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    privelege: Privelege;
    practiceName: string;
};

export type Client = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    addressId: string;
    phone: string;
    active: boolean;
    reminderPreference: Reminder;
    dateOfBirth: Date;
};

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

export type Address = {
    id: string;
    unit?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
};

export type ClientField = {
    id: string;
    firstName: string;
    lastName: string;
    active: boolean;
}

export type Appointment = {
    id: string;
    startTime: Date;
    endTime: Date;
    clientId: string;
}

export type UpcomingSessionRaw = {
    id: string;
    start_time: string;
    end_time: string;
    client_name: string;
};

export type UpcomingSession = {
    id: string;
    time: string;
    time_difference: string;
    client_name: string;
}
