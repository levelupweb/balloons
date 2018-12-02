import mongoose from "mongoose";
import { CATEGORY_MODEL } from "@consts/_models";
import * as consts from "@consts/category";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
	{
		[consts.CATEGORY_TITLE]: {
			type: String,
			required: true
		}
	},
	{
		timestamps: {
			createdAt: consts.CATEGORY_CREATED,
			updatedAt: consts.CATEGORY_UPDATED
		}
	}
);

export const Category = mongoose.model(CATEGORY_MODEL, CategorySchema);

export default Category;
