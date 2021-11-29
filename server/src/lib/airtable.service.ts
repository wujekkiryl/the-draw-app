import Airtable from 'airtable';
import { AirtableOptions } from 'airtable';

import { Tables, RoomStatuses, Person, PersonPairedStatuses, PersonFields, PersonsDTO, Room, RoomFields } from '../interfaces/airtable.interface';

const config: AirtableOptions = {
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: process.env.AIRTABLE_ENDPOINT_URL
}

export class AirtableService {

    private base: any = undefined;

    constructor() {
        Airtable.configure(config);
        const database: string = process.env.AIRTABLE_BASE as string;
        this.base = Airtable.base(database);
    }

    public async getTableData(limit: number = 5) {
        let data: any[] = [];
        return await this.base(Tables.Persons).select({
            maxRecords: limit,
            view: "Grid view"
        }).eachPage((records: any, fetchNextPage: any) => {
            records.forEach((record: any) => {
                data.push({
                    name: record.get(PersonFields.Name), 
                    id: record.getId(),
                    room_id: record.get(PersonFields.RoomId),
                    paired: record.get(PersonFields.Paired),
                    gives_to: record.get(PersonFields.GivesTo),
                    gets_from: record.get(PersonFields.GetsFrom)
                });
            });
            fetchNextPage();
            return 'asd';
        }).then((err: any) => {
            if (err) {
                console.error(err);
                return;
            }
            return data;
        });
    }

    public async getRoom(roomId: string) {
        let room: Room;
        return await this.base(Tables.Rooms).find(roomId)
            .then((record: any) => {
                console.log(record.get('persons'));
                room = {
                    name: record.get(RoomFields.Name),
                    persons: record.get(RoomFields.Persons),
                    status: record.get(RoomFields.Status)
                }

                return room;
            })
            .catch((err: any) => {
                if (err) {
                    console.error(err);
                    return;
                }
            })
    }

    public async createRoom(name: string) {
        let roomId: string;
        return await this.base(Tables.Rooms).create([
            {
                fields: {
                    name,
                    status: RoomStatuses.New
                }
            }
        ]).then((records: any) => {
            records.forEach((record: any) => {
                roomId = record.getId();
            });
            return roomId;
        }).catch((err: any) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    public async addPerson(person: Person) {
        return await this.base(Tables.Persons).create([
            {
                fields: {
                    name: person.name,
                    room_id: [person.room_id],
                    paired: PersonPairedStatuses.NotPaired
                }
            }
        ]).then((records: any) => {
            const record = records[0];
            const user: Person = {
                name: record.get(PersonFields.Name),
                room_id: record.get(PersonFields.RoomId),
                paired: record.get(PersonFields.Paired)
            };

            return user;
        }).catch((err: any) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    public async updatePersons(persons: PersonsDTO[]) {
        let users: Person[];
        return await this.base(Tables.Persons).update(
            persons
        ).then((records: any) => {
            records.forEach((record: any) => {
                users.push({
                    name: record.get(PersonFields.Name),
                    room_id: record.get(PersonFields.RoomId),
                    paired: record.get(PersonFields.Paired),
                    gives_to: record.get(PersonFields.GivesTo),
                    gets_from: record.get(PersonFields.GetsFrom)
                });
            })

            return users;
        }).catch((err: any) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    public async getAllPersons() {
        let data: Person[];
        return await this.base(Tables.Persons).select({
            view: "Grid view"
        }).eachPage((records: any, fetchNextPage: any) => {
            records.forEach((record: any) => {
                data.push({
                    name: record.get(PersonFields.Name), 
                    id: record.getId(),
                    room_id: record.get(PersonFields.RoomId),
                    paired: record.get(PersonFields.Paired),
                    gives_to: record.get(PersonFields.GivesTo),
                    gets_from: record.get(PersonFields.GetsFrom)
                });
            });
            fetchNextPage();
            return 'asd';
        }).then((err: any) => {
            if (err) {
                console.error(err);
                return;
            }
            return data;
        });
    }
}