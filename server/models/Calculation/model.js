import mongoose from "mongoose";
import * as consts from "@consts/calculation";
import { CALCULATION_MODEL } from "../../../consts/_models";

const Schema = mongoose.Schema;

const CalculationSchema = new Schema(
	{
		[consts.CALCULATION_PARAMS]: {
			type: String,
			required: true
		},
		[consts.CALCULATION_TOTAL]: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: {
			createdAt: consts.CALCULATION_CREATED,
			updatedAt: consts.CALCULATION_UPDATED
		}
	}
);

export const Calculation = mongoose.model(CALCULATION_MODEL, CalculationSchema);

export default Calculation;
