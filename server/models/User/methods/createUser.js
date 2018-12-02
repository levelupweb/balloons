import { User } from "../model";

export const createUser = user => User.create(user);
