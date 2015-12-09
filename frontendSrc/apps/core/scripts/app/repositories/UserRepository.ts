/// <reference path="./../../../../../typings/whatwg-fetch/whatwg-fetch.d.ts" />

import {User} from '../models/classes/UserModel';
import {BaseRepository} from '../models/classes/BaseRepository';

export class UserRepository extends BaseRepository {

    public static getAllUsers(): Promise<User[]> {
        return window
            .fetch('/api/users/all')
            .then(this.errorHandler)
            .then(this.getJSON)
            .then(function (usersList: User[]): User[] {
                console.log('1111111111111111', usersList);
                return usersList.map(function (user: User, index: number): User {
                    return new User().deserialize(user);
                });
            });
    }

}
