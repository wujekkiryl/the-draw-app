export enum Tables {
    Rooms = 'rooms',
    Persons = 'persons'
}

export enum RoomStatuses {
    New = 'New',
    InProgress = 'In progress',
    Closed = 'Closed'
}

export enum PersonPairedStatuses {
    NotPaired = 'Todo',
    InProgress = 'In progress',
    Paired = 'Done'
}

export enum PersonFields {
    Name = 'name',
    RoomId = 'room_id',
    Paired = 'paired'
} 

export interface Person {
    name: string;
    room_id: string[] | string;
    paired?: PersonPairedStatuses,
    gives_to?: string[];
    gets_from?: string[];
}