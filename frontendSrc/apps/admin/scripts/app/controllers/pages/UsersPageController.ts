import {User} from '../../../../../core/scripts/app/models/classes/UserModel';
import {UserService} from '../../../../../core/scripts/app/services/UserService';
import {URLService} from '../../../../../core/scripts/app/services/URLService';
import {FrameworkService} from '../../services/FrameworkService';

export class UsersPageController {

    public selectedUser: User;
    public userBackUp: User;
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
        this.userBackUp = new User().deserialize(this.selectedUser);
    }

    public createNewUser(): void {
        console.log('Create and select new user.');
        this.selectUser(new User(void 0, void 0, 'New User'));
    }

    public cancelUserChanges(): void {
        const index: number = this.listOfUsers.indexOf(this.selectedUser);
        if (index > -1) {
            this.listOfUsers[index] = new User().deserialize(this.userBackUp);
            this.selectedUser = this.listOfUsers[index];
        } else {
            this.selectedUser = void 0;
        }
    }

    public saveUser(user: User): void {
        if (user.id === -1) {
            UserService
                .createUser(user)
                .then(() => {
                    console.log('New User saved.');
                    FrameworkService.redraw();
                })
                .catch((error: ErrorEvent) => {
                    console.log('Error on saving new user: ', error);
                });
        } else {
            UserService
                .updateUser(user)
                .then(() => {
                    console.log('User updated.');
                    FrameworkService.redraw();
                })
                .catch((error: ErrorEvent) => {
                    console.log('Error on update user: ', error);
                });
        }
    }

    public deleteUser(user: User): void {
        if (user.id !== -1) {
            UserService
                .deleteUser(user.id)
                .then(() => {
                    console.log('User deleted.');
                    FrameworkService.redraw();
                })
                .catch((error: ErrorEvent) => {
                    console.log('Error on deleting user: ', error);
                });
        } else {
            this.selectedUser = void 0;
        }
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
