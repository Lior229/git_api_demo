export default class Repository  {
    public id:number;
    public name:string;
    public avatar_url:string;

    public constructor(id: any, name:any, avatar_url:string) {
        this.id = id
        this.name = name
        this.avatar_url = avatar_url
    }
}