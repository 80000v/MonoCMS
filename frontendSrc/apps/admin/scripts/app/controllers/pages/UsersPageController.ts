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
    }

    public createNewUser(): void {
        console.log('Create and select new user.');
        this.selectUser(new User(void 0, void 0, 'New User'));
    }

    public cancelUserChanges(): void {
        const index: number = this.listOfUsers.indexOf(this.selectedUser);
        if (index > -1) {
            UserService
                .getById(this.selectedUser.id)
                .then((user: User) => {
                    console.log('Use restored: ', user);
                    this.listOfUsers[this.listOfUsers.indexOf(this.selectedUser)] = user;
                    this.selectedUser = user;
                    FrameworkService.redraw();
                })
                .catch((error: ErrorEvent) => {
                    console.log('Error on saving new user: ', error);
                });

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
                    this.updateAllUsersList();
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
                    this.updateAllUsersList();
                    FrameworkService.redraw();
                })
                .catch((error: ErrorEvent) => {
                    console.log('Error on update user: ', error);
                });
        }
    }

    public deleteUser(user: User): void {
        if (user.id !== -1) { // if not new user
            UserService
                .deleteUser(user.id)
                .then(() => {
                    console.log('User deleted.');
                    this.updateAllUsersList();
                    FrameworkService.redraw();
                })
                .catch((error: ErrorEvent) => {
                    console.log('Error on deleting user: ', error);
                });
        } else {
            this.selectedUser = void 0;
        }
    }

    public updateAllUsersList(): void {

        UserService
            .getAllUsers()
            .then((usersList: User[]) => {
                console.log('Users list: ', usersList);
                this.listOfUsers = usersList.sort((userA: User, userB: User) => {
                    if (userA.id < userB.id) {
                        return -1;
                    }
                    if (userA.id > userB.id) {
                        return 1;
                    }
                    return 0;
                });
                // restore selected user
                if (this.selectedUser !== void 0) {
                    for (let i: number = 0; i < this.listOfUsers.length; i += 1) {
                        if (this.listOfUsers[i].id === this.selectedUser.id) {
                            console.log(this.listOfUsers[i], this.selectedUser);
                            this.selectedUser = this.listOfUsers[i];
                            break;
                        } else if (i === this.listOfUsers.length - 1) { // if not found
                            this.selectedUser = void 0;
                        }
                    }
                }
                FrameworkService.redraw();
            })
            .catch((error: ErrorEvent) => {
                console.error('UsersPageController:updateAllUsersList: error on all users list request: ', error);
            });

    }

}
