export class User {

    public id: number = -1;
    public login: string;
    public password: string;
    public nicename: string;
    public email: string;
    public url: string;
    public registered: Date;
    public activationKey: string;
    public status: string;
    public viewName: string;

    constructor(login?: string,
                password?: string,
                nicename?: string,
                email?: string,
                url?: string,
                registered?: Date,
                activationKey?: string,
                status?: string,
                viewName?: string) {

        this.login = login !== void 0 ? login : '';
        this.password = password !== void 0 ? password : null;
        this.nicename = nicename !== void 0 ? nicename : '';
        this.email = email !== void 0 ? email : '';
        this.url = url !== void 0 ? url : '';
        this.registered = registered !== void 0 ? registered : new Date();
        this.activationKey = activationKey !== void 0 ? activationKey : '';
        this.status = status !== void 0 ? status : '';
        this.viewName = viewName !== void 0 ? viewName : '';

    }

    public deserialize(object: User): this {

        this.id = object.id !== void 0 ? object.id : this.id;
        this.login = object.login !== void 0 ? object.login : this.login;
        this.password = object.password !== void 0 ? object.password : this.password;
        this.nicename = object.nicename !== void 0 ? object.nicename : this.nicename;
        this.email = object.email !== void 0 ? object.email : this.email;
        this.url = object.url !== void 0 ? object.url : this.url;
        this.registered = object.registered !== void 0 ? new Date(object.registered.toString()) : this.registered;
        this.activationKey = object.activationKey !== void 0 ? object.activationKey : this.activationKey;
        this.status = object.status !== void 0 ? object.status : this.status;
        this.viewName = object.viewName !== void 0 ? object.viewName : this.viewName;

        return this;

    }

}
