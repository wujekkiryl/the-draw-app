import { Room } from '../interfaces/airtable.interface';
import { AirtableService } from './airtable.service';

export class DrawService {

    airtable = new AirtableService();

    constructor() {}

    public async drawPairs(roomId: string) {
        let room: Room;
        const roomData = await this.airtable.getRoom(roomId);
        // const persons = await this.airtable.getAllPersons();
        const persons = await this.airtable.getTableData();
        console.log(persons);

        return roomData;
    }
}