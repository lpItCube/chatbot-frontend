//Model for Collection


export class Collection{

    public id: number;
    public name: string;
    public description: string;
    public isReady: boolean;

    constructor(idC: number, nameC: string, descriptionC: string, isReadyC: boolean){
       this.id = idC;
       this.name = nameC;
       this.description = descriptionC;
       this.isReady = isReadyC;
    }
}