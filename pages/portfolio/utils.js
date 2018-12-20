import { fetch } from "@utils";
import { FETCH_PORTFOLIO_ENTRIES, FETCH_PORTFOLIO_ENTRY } from "@consts/_fetch";

export const getEntries = fetcher => fetch(fetcher, FETCH_PORTFOLIO_ENTRIES);

export const getEntry = (fetcher, portfolioId) =>
	fetch(fetcher, FETCH_PORTFOLIO_ENTRY, {
		params: {
			portfolioId
		}
	});

export const isEditing = editMode => {
	if (editMode && editMode === "1") {
		return true;
	}

	return false;
};
