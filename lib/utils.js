export default function priceFormat(price) {
	// 1. Convert a number into a string, rounding the number to keep only two decimals;
	// 2. Replace dot for comma and vice-versa (using # as a non-existent character to help us);
	// 3. If the end is ',00' (no cents), then hide it.
	return 'R$ '+ price.toFixed(2).replace(',','#').replace('.',',').replace('#', '.').replace(/\,00$/,'');
}