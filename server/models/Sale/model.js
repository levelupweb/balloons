import mongoose from "mongoose";
import * as consts from "@consts/sale";
import { SALE_MODEL } from "../../../consts/_models";

const Schema = mongoose.Schema;

const SaleSchema = new Schema(
	{
		[consts.SALE_TITLE]: {
			type: String,
			required: true
		},
		[consts.SALE_IMAGE]: {
			type: String,
			default: null
		},
		[consts.SALE_DESCRIPTION]: {
			type: String,
			required: true
		},
		[consts.SALE_END_DATE]: {
			type: Date,
			default: null
		},
		[consts.SALE_DISCOUNT]: {
			type: Number,
			min: 0,
			max: 100,
			default: null
		}
	},
	{
		timestamps: {
			createdAt: consts.SALE_CREATED,
			updatedAt: consts.SALE_UPDATED
		}
	}
);

export const Sale = mongoose.model(SALE_MODEL, SaleSchema);

export default Sale;
