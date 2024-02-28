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
    first_name: string;
    last_name: string;
    active: boolean;
    start_time: string;
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

export type RecentClientRaw = {
    id: string;
    client_name: string;
    start_time: string;
    has_notes: string;
}

export type Session = {
    id: string;
    provider_id: string;
    client_id: string;
    appointment_id: string;
    location_id: string; // TODO: change to OfficeLocation object
    rate: number;
}

export type Note = {
    id: string;
    provider_id: string;
    client_id: string;
    session_id: string;
    note_text: string;
}

export type Invoice = {
    id: string;
    provider_id: string;
    client_id: string;
    session_id: string;
    total: number;
    status: 'pending' | 'paid';
}
