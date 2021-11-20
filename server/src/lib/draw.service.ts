import { Room } from '../interfaces/airtable.interface';
import { AirtableService } from './airtable.service';

export class DrawService {

    airtable = new AirtableService();
    globalList: string[] = [];

    constructor() {}

    public async drawPairs(roomId: string) {
        let room: Room;
        // const roomData = await this.airtable.getRoom(roomId);
        // // const persons = await this.airtable.getAllPersons();
        // const persons = await this.airtable.getTableData();
        // console.log(persons);
        const evenList = [
            'a',
            'b', 
            'c', 
            'd',
        ];
        const oddList = [
            'a',
            'b',
            'c',
            'd',
            'e'
        ];
        const result = this.draw(evenList);
        if (result) {
            const {pairs, paired} = result;
            
            // const odds = this.draw(oddList);
            let resp: string[] = [];
            pairs.forEach((item, index) => {
                resp.push(`${item} gives to ${paired[index]}`);
            });
            return resp;
        } else {
            return this.drawPairs(roomId);
        }
    }

    private draw(list: string[]) {
        const workingList = [...list];
        this.globalList = [...list];
        const pairs: string[] = [];
        const paired: string[] = [];

        list.forEach(item => {
            const result = this.matchItem(workingList, item);
            if (result) {
                const {from, to, indexToRemove} = result;
                pairs.push(from);
                paired.push(to);
                workingList.splice(indexToRemove, 1);
            } else {
                return this.draw(list);
            }
        });
        if (pairs.length === list.length) {
            return {pairs, paired};
        } else {
            return false;
        }
    }

    private matchItem(list: string[], currentItemThatGivesTo: string): {from: string, to: string, indexToRemove: number} | false {
        const index = Math.floor(Math.random()*list.length);
        const el = list[index];
        if (currentItemThatGivesTo !== el) {
            return {
                from: currentItemThatGivesTo,
                to: el,
                indexToRemove: index
            }
        } else if (this.isNextMatchPossible(list, this.globalList)) {
            return this.matchItem(list, currentItemThatGivesTo);
        } else {
            return false;
        }
    }

    private isNextMatchPossible(itemsLeft: string[], allItems: string[]) { // making sure that the next comparision will not be false
        return itemsLeft.length > 1 || itemsLeft[0] !== allItems[allItems.length - 1];
    }
}