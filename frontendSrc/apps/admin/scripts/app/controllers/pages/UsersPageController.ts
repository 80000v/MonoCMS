export class UsersPageController {

    constructor() {
        console.log('Start users page controller.');
    }

    public onunload(): void {
        console.log('Dispose users page controller.');
    }

}
