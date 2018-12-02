import { User } from "../model";

export const getUser = userId => User.findById(userId);
