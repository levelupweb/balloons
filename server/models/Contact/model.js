import mongoose from "mongoose";
import * as consts from "@consts/contact";
import { CONTACT_MODEL } from "../../../consts/_models";

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
	{
		[consts.CONTACT_PHONE]: {
			type: String,
			required: true
		},
		[consts.CONTACT_NAME]: {
			type: String,
			required: true
		},
		[consts.CONTACT_MESSAGE]: {
			type: String,
			default: null
		},
		[consts.CONTACT_AGREEMENT]: {
			type: Boolean,
			required: true
		},
		[consts.CONTACT_IS_SENT]: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: {
			createdAt: consts.CONTACT_CREATED,
			updatedAt: consts.CONTACT_UPDATED
		}
	}
);

export const Contact = mongoose.model(CONTACT_MODEL, ContactSchema);

export default Contact;
