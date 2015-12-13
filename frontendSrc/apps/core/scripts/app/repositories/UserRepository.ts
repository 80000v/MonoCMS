/// <reference path="./../../../../../typings/whatwg-fetch/whatwg-fetch.d.ts" />

import {User} from '../models/classes/UserModel';
import {BaseRepository} from '../models/classes/BaseRepository';
import {RequestOptions} from '../models/classes/RequestOptions';

export class UserRepository extends BaseRepository {

    public static getAllUsers(): Promise<User[]> {
        return window
            .fetch(
                '/api/users/all',
                new RequestOptions()
            )
            .then(this.errorHandler)
            .then(this.getJSON)
            .then(function (usersList: User[]): User[] {
                return usersList.map((user: User): User => {
                    return new User().deserialize(user);
                });
            });
    }

    public static createUser(user: User): Promise<Response> {
        return window
            .fetch(
                '/api/users/create',
                new RequestOptions(
                    'post',
                    void 0,
                    JSON.stringify(user)
                )
            )
            .then(this.errorHandler);
    }

    public static updateUser(user: User): Promise<Response> {
        return window
            .fetch(
                '/api/users/update',
                new RequestOptions(
                    'post',
                    void 0,
                    JSON.stringify(user)
                )
            )
            .then(this.errorHandler);
    }

    public static deleteUser(id: number): Promise<Response> {
        return window
            .fetch(
                '/api/users/delete?id=' + id,
                new RequestOptions()
            )
            .then(this.errorHandler);
    }

    public static deleteUsers(ids: number[]): Promise<Response> {
        return window
            .fetch(
                '/api/users/delete',
                new RequestOptions(
                    'post',
                    void 0,
                    JSON.stringify(ids)
                )
            )
            .then(this.errorHandler);
    }

}
