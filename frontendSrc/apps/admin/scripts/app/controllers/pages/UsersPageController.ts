import {User} from '../../../../../core/scripts/app/models/classes/UserModel';
import {UserService} from '../../../../../core/scripts/app/services/UserService';

export class UsersPageController {

    public selectedUser: User;
    public listOfUsers: User[];

    constructor() {
        console.log('Start users page controller.');
        this.updateAllUsersList();
    }

    public onunload(): void {
        console.log('Dispose users page controller.');
    }

    private updateAllUsersList(): void {

        const self: UsersPageController = this;

        UserService
            .getAllUsers()
            .then(function (usersList: User[]): void {
                self.listOfUsers = usersList;
            })
            .catch(function (error: ErrorEvent): void {
                console.error('UsersPageController:updateAllUsersList: error on all users list request: ', error);
            });

    }

}
