import * as methods from "./methods";
import UserModel from "./model";

UserModel.getUser = methods.getUser;
UserModel.createUser = methods.createUser;

export const User = UserModel;
export default User;
