import {UserRepository} from '../repositories/UserRepository';
import {User} from '../models/classes/UserModel';

export class UserService {

    public static getAllUsers(): Promise<User[]> {
        return UserRepository.getAllUsers();
    }

    public static createUser(user: User): Promise<Response> {
        return UserRepository.createUser(user);
    }

    public static updateUser(user: User): Promise<Response> {
        return UserRepository.updateUser(user);
    }

    public static deleteUser(id: number): Promise<Response> {
        return UserRepository.deleteUser(id);
    }

    public static deleteUsers(ids: number[]): Promise<Response> {
        return UserRepository.deleteUsers(ids);
    }

}
