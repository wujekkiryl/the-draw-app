import Airtable from 'airtable';
import { AirtableOptions } from 'airtable';

import { Tables, RoomStatuses, Person, PersonPairedStatuses, PersonFields } from '../interfaces/airtable.interface';

const config: AirtableOptions = {
    apiKey: 'keyVWURzww2mcxNta',
    endpointUrl: 'https://api.airtable.com'
}

export class AirtableService {

    private base: any = undefined;

    constructor() {
        Airtable.configure(config);
        this.base = Airtable.base('appFcrf4z9U4eg2c4');
    }

    public async getTableData(tableName: Tables, limit: number = 5) {
        let data: any[] = [];
        return await this.base(tableName).select({
            maxRecords: limit,
            view: "Grid view"
        }).eachPage((records: any, fetchNextPage: any) => {
            records.forEach(function (record: any) {
                data.push({ name: record.get('name'), id: record.getId() });
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
}