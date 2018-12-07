import mongoose from "mongoose";
import { CATEGORY_MODEL, ARTICLE_MODEL } from "@consts/_models";
import * as consts from "@consts/article";

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
	{
		[consts.ARTICLE_TITLE]: {
			type: String,
			required: true
		},
		[consts.ARTICLE_CONTENT]: {
			type: String,
			required: true
		},
		[consts.ARTICLE_CATEGORY]: {
			type: Schema.Types.ObjectId,
			required: false,
			ref: CATEGORY_MODEL,
			default: null
		},
		[consts.ARTICLE_SLUG]: {
			type: String,
			required: true
		},
		[consts.ARTICLE_INDEX]: {
			type: Number,
			default: 0
		},
		[consts.ARTICLE_DISPLAY_HEADER]: {
			type: Boolean,
			default: true
		},
		[consts.ARTICLE_DESCRIPTION]: {
			type: String,
			required: true
		}
	},
	{
		timestamps: {
			createdAt: consts.ARTICLE_CREATED,
			updatedAt: consts.ARTICLE_UPDATED
		}
	}
);

export const Article = mongoose.model(ARTICLE_MODEL, ArticleSchema);

export default Article;
