
import {URLService} from '../../../../../core/scripts/app/services/URLService';

export class PostsPageController {

    constructor() {
        console.log('Start posts page controller.');
        URLService.updateUrl(['app=' + 'posts']);
    }

    public onunload(): void {
        console.log('Dispose posts page controller.');
    }

}
