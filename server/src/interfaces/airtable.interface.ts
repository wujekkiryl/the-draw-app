export enum Tables {
    Rooms = 'rooms',
    Persons = 'persons'
}

export enum RoomStatuses {
    New = 'New',
    InProgress = 'In progress',
    Closed = 'Closed'
}

export interface Room {
    name: string;
    status: RoomStatuses;
    persons: string[];
}

export enum RoomFields {
    Name = 'name',
    Status = 'status',
    Persons = 'persons'
}

export enum PersonPairedStatuses {
    NotPaired = 'Todo',
    InProgress = 'In progress',
    Paired = 'Done'
}

export enum PersonFields {
    Name = 'name',
    RoomId = 'room_id',
    Paired = 'paired',
    GivesTo = 'gives_to',
    GetsFrom = 'gets_from'
} 

export interface Person {
    name: string;
    room_id: string[] | string;
    paired?: PersonPairedStatuses,
    gives_to?: string[];
    gets_from?: string[];
    id?: string;
}

export interface PersonsDTO {
    id: string;
    fields: Person;
}