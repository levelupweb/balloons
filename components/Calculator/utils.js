import {
	CALCULATOR_PARAM_LOGO,
	CALCULATOR_PARAM_LOGO_2,
	CALCULATOR_PARAM_LOGO_COLORS_2,
	CALCULATOR_PARAM_LOGO_COLORS,
	CALCULATOR_PARAM_DIAMETER,
	CALCULATOR_DIAMETER_12
} from "./consts";

export const getLogoCount = params =>
	[CALCULATOR_PARAM_LOGO, CALCULATOR_PARAM_LOGO_2].filter(
		item => !!params[item]
	).length;

export const defineType = params => {
	const colorsCount1 = params[CALCULATOR_PARAM_LOGO_COLORS].length;
	const colorsCount2 =
		getLogoCount(params) > 1
			? params[CALCULATOR_PARAM_LOGO_COLORS_2].length
			: 0;

	return [colorsCount1, colorsCount2];
};

export const defineBasicPrice = (type, rawNumber, params) => {
	const number = parseFloat(rawNumber);
	console.log(rawNumber, number);
	const realType = JSON.stringify(type);

	if (params[CALCULATOR_PARAM_DIAMETER] !== CALCULATOR_DIAMETER_12) {
		if (number === 1) {
			return 2100;
		}
		if (number === 2) {
			return 1600;
		}
		if (number >= 3 && number < 5) {
			return 1200;
		}
		if (number >= 5 && number < 10) {
			return 850;
		}
		if (number >= 10 && number < 50) {
			return 500;
		}
		if (number >= 50) {
			return 350;
		}
		return 0;
	}

	if (number >= 100 && number < 200) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 21;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 27;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 40;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 50;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 65;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 65;
		default:
			return 0;
		}
	}

	if (number >= 200 && number < 300) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 18;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 22;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 35;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 45;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 59;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 60;
		default:
			return 0;
		}
	}

	if (number >= 300 && number < 400) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 14;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 19;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 32;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 35;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 45;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 40;
		default:
			return 0;
		}
	}

	if (number >= 400 && number < 500) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 12;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 17;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 27;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 30;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 40;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 35;
		default:
			return 0;
		}
	}

	if (number >= 500 && number < 1000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 8;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 16;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 23;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 27;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 35;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 25;
		default:
			return 0;
		}
	}

	if (number >= 1000 && number < 1500) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 6.5;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 10;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 20;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 23;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 25;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 20;
		default:
			return 0;
		}
	}

	if (number >= 1500 && number < 2000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 6.3;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 8.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 13;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 21;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 20;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 19;
		default:
			return 0;
		}
	}

	if (number >= 2000 && number < 3000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 5.6;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 7.8;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 11;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 16;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 19;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 18;
		default:
			return 0;
		}
	}

	if (number >= 3000 && number < 4000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 5.5;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 6.8;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 10;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 13;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 17.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 15.3;
		default:
			return 0;
		}
	}

	if (number >= 4000 && number < 5000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 5.2;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 6.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 8.9;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 12;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 16.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 14.5;
		default:
			return 0;
		}
	}

	if (number >= 5000 && number < 6000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.9;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 6.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 8.5;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 10;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 16;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 13.5;
		default:
			return 0;
		}
	}

	if (number >= 6000 && number < 7000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.8;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 6.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 8.5;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 10;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 15;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 12.7;
		default:
			return 0;
		}
	}

	if (number >= 7000 && number < 8000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.8;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 6.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 8.3;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 9.5;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 14;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 12.7;
		default:
			return 0;
		}
	}

	if (number >= 8000 && number < 10000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.6;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 6;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 8.2;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 9.5;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 13;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 12;
		default:
			return 0;
		}
	}

	if (number >= 10000 && number < 20000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.4;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 5.7;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 7.5;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 8.7;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 10.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 11.4;
		default:
			return 0;
		}
	}

	if (number >= 20000 && number < 30000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.4;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 5.6;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 7.3;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 8.3;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 9.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 11;
		default:
			return 0;
		}
	}

	if (number >= 30000 && number < 40000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.4;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 5.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 6.9;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 8;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 9.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 10.6;
		default:
			return 0;
		}
	}

	if (number >= 40000 && number < 50000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4.4;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 5.5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 6.8;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 8;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 9.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 10.2;
		default:
			return 0;
		}
	}

	if (number >= 50000 && number < 100000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 6.5;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 7.5;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 8.5;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 10;
		default:
			return 0;
		}
	}

	if (number >= 100000) {
		switch (realType) {
		case JSON.stringify([1, 0]):
			return 4;
		case JSON.stringify([1, 1]):
		case JSON.stringify([2, 0]):
			return 5;
		case JSON.stringify([2, 1]):
		case JSON.stringify([3, 0]):
			return 6.3;
		case JSON.stringify([2, 2]):
		case JSON.stringify([4, 0]):
		case JSON.stringify([3, 1]):
			return 7.1;
		case JSON.stringify([4, 1]):
		case JSON.stringify([3, 2]):
			return 8;
		case JSON.stringify([3, 3]):
		case JSON.stringify([4, 2]):
			return 9.3;
		default:
			return 0;
		}
	}

	return 0;
};
