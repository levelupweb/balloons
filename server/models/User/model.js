import mongoose from "mongoose";
import { USER_MODEL } from "@consts/_models";
import * as consts from "@consts/user";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		[consts.USER_LOGIN]: {
			type: String,
			required: true,
			unique: true
		},
		[consts.USER_PASSWORD]: {
			type: String,
			required: true,
			unique: true,
			select: false
		}
	},
	{
		timestamps: {
			createdAt: consts.USER_CREATED,
			updatedAt: consts.USER_UPDATED
		}
	}
);

export const User = mongoose.model(USER_MODEL, UserSchema);

export default User;
