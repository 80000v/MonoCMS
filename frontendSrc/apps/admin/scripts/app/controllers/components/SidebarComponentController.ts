import {PagesManager} from '../../../../../core/scripts/app/models/viewModels/AppModel';
import {FrameworkService} from '../../services/FrameworkService';

export class SidebarComponentController {

    public appManage: PagesManager;

    constructor(args: {appManager: PagesManager}) {
        console.log('Start sidebar controller.');
        this.appManage = args.appManager;
    }

    public onunload(): void {
        console.log('Dispose sidebar controller.');
    }

    public onSelectAppClick(index: number): void {
        this.appManage.currentApp = this.appManage.listOfApps[index];
        FrameworkService.redraw();
    }

}
