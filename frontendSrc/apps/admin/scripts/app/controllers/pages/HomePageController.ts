export class HomePageController {

    constructor() {
        console.log('Start home page controller.');
    }

    public onunload(): void {
        console.log('Dispose home page controller.');
    }

}
