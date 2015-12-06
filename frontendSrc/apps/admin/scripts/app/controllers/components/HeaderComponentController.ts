export class HeaderComponentController {

    constructor() {
        console.log('Start header controller.');
    }

    public onunload(): void {
        console.log('Dispose header controller.');
    }

}
