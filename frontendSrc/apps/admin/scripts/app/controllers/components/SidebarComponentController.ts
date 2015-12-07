import {AppManager} from '../../../../../core/scripts/app/models/AppModel';
import {FrameworkService} from '../../services/FrameworkService';

export class SidebarComponentController {

    public appManage: AppManager;

    constructor(args: {appManager: AppManager}) {
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
