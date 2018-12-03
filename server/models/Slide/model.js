import mongoose from "mongoose";
import { SLIDE_MODEL } from "@consts/_models";
import * as consts from "@consts/slide";

const Schema = mongoose.Schema;

const SlideSchema = new Schema(
	{
		[consts.SLIDE_TITLE]: {
			type: String,
			required: true
		},
		[consts.SLIDE_DESCRIPTION]: {
			type: String,
			required: true
		},
		[consts.SLIDE_IMAGE_URL]: {
			type: String,
			required: true
		},
		[consts.SLIDE_ACTION_URL]: {
			type: String,
			required: false
		}
	},
	{
		timestamps: {
			createdAt: consts.SLIDE_CREATED,
			updatedAt: consts.SLIDE_UPDATED
		}
	}
);

export const Slide = mongoose.model(SLIDE_MODEL, SlideSchema);

export default Slide;
