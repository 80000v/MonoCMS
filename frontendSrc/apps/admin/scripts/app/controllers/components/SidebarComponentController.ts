export class SidebarComponentController {

    constructor() {
        console.log('Start sidebar controller.');
    }

    public onunload(): void {
        console.log('Dispose sidebar controller.');
    }

}
