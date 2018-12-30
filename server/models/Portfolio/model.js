import mongoose from "mongoose";
import { PORTFOLIO_MODEL } from "@consts/_models";
import * as consts from "@consts/portfolio";

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema(
	{
		[consts.PORTFOLIO_TITLE]: {
			type: String,
			required: true
		},
		[consts.PORTFOLIO_DESCRIPTION]: {
			type: String,
			required: true
		},
		[consts.PORTFOLIO_IMAGES]: [
			{
				type: String,
				default: []
			}
		]
	},
	{
		timestamps: {
			createdAt: consts.PORTFOLIO_CREATED,
			updatedAt: consts.PORTFOLIO_UPDATED
		}
	}
);

export const Portfolio = mongoose.model(PORTFOLIO_MODEL, PortfolioSchema);

export default Portfolio;
