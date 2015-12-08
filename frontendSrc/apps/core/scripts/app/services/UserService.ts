import {UserRepository} from '../repositories/UserRepository';
import {User} from '../models/classes/UserModel';

export class UserService {

    public static getAllUsers(): Promise<User[]> {
        return UserRepository.getAllUsers();
    }

}
