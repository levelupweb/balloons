import mongoose from "mongoose";
import * as consts from "@consts/news";
import { NEWS_MODEL } from "@consts/_models";

const Schema = mongoose.Schema;

const NewsSchema = new Schema(
	{
		[consts.NEWS_TITLE]: {
			type: String,
			required: true
		},
		[consts.NEWS_DESCRIPTION]: {
			type: String,
			default: null
		},
		[consts.NEWS_CONTENT]: {
			type: String,
			default: null
		},
		[consts.NEWS_IMAGE]: {
			type: String,
			default: null
		}
	},
	{
		timestamps: {
			createdAt: consts.NEWS_CREATED,
			updatedAt: consts.NEWS_UPDATED
		}
	}
);

export const News = mongoose.model(NEWS_MODEL, NewsSchema);

export default News;
