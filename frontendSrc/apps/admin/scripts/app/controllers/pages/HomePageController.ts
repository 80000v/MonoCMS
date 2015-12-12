import {URLService} from '../../../../../core/scripts/app/services/URLService';

export class HomePageController {

    constructor() {
        console.log('Start home page controller.');
        URLService.updateUrl(['app=' + 'home']);
    }

    public onunload(): void {
        console.log('Dispose home page controller.');
    }

}
