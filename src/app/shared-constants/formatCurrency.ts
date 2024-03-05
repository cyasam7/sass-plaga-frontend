import BigNumber from 'bignumber.js';

interface IConfigCurrency {
	decimalPlaces: number;
	mode: BigNumber.RoundingMode;
	format?: BigNumber.Format;
}

export const formatCurrency = (value: number | string, config?: IConfigCurrency): string => {
	console.log(value);
	const { decimalPlaces = 2, mode = 4, format } = config ?? {};
	console.log(decimalPlaces, mode, format);

	const bigNumber = BigNumber(value);
	return bigNumber.toFormat(decimalPlaces, mode, format);
};
