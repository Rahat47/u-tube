import { User, UserModel } from './user.model';

export const createUser = (user: Partial<User>) => UserModel.create(user);

export const findUserByEmail = (email: User['email']) =>
    UserModel.findOne({ email });
