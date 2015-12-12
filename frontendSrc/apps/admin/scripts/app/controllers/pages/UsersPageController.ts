import {User} from '../../../../../core/scripts/app/models/classes/UserModel';
import {UserService} from '../../../../../core/scripts/app/services/UserService';
import {URLService} from '../../../../../core/scripts/app/services/URLService';
import {FrameworkService} from '../../services/FrameworkService';

export class UsersPageController {

    public selectedUser: User;
    public listOfUsers: User[] = [];

    constructor() {
        console.log('Start users page controller.');
        this.updateAllUsersList();
        URLService.updateUrl(['app=' + 'users']);
    }

    public onunload(): void {
        console.log('Dispose users page controller.');
    }

    public selectUser(user: User): void {
        console.log('Select user: ', user);
        this.selectedUser = user;
        FrameworkService.redraw();
    }

    private updateAllUsersList(): void {

        UserService
            .getAllUsers()
            .then((usersList: User[]) => {
                console.log('Users list: ', usersList);
                this.listOfUsers = usersList;
                FrameworkService.redraw();
            })
            .catch((error: ErrorEvent) => {
                console.error('UsersPageController:updateAllUsersList: error on all users list request: ', error);
            });

    }

}
