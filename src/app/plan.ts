export class Plan {
    ID: number;
    Name: String;
    Description: String;
    Published: boolean;
    CreateID: number;
    ModeID: number;
    CreateDate: string;
    ModeDate: string;
    imageUrl: string;

    constructor(id: number, name: string, description: string, published: boolean,
        createId: number, modeId: number, createDate: string, modeDate: string, imageUrl: string) {
        this.ID = id;
        this.Name = name;
        this.Description = description;
        this.Published = published;
        this.CreateID = createId;
        this.ModeID = modeId;
        this.CreateDate = createDate;
        this.ModeDate = modeDate;
        this.imageUrl = imageUrl;
    }
}
