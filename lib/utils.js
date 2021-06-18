export function priceFormat(price) {
	// 1. Convert a number into a string, rounding the number to keep only two decimals;
	// 2. Replace dot for comma and vice-versa (using # as a non-existent character to help us);
	return 'R$ '+ price.toFixed(2).replace(',','#').replace('.',',').replace('#', '.');
}

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const oldYear = '1900'

// Constants for filters & orders:
export const bookPublicationYear = {
	id: 'publication_year', 
	title: 'ano de publicação',
	publicationYearAscId: 'publicationYearAsc',
	publicationYearAscTitle: oldYear + ' → ' + currentYear,
	publicationYearDescId: 'publicationYearDesc',
	publicationYearDescTitle: currentYear + ' → ' + oldYear,
}
export const bookPrices = {
	id: 'price', 
	title: 'preço',
	priceAscId: 'priceAsc',
	priceAscTitle: '$ → $$$',
	priceDescId: 'priceDesc',
	priceDescTitle: '$$$ → $',
}
export const bookFormats = {
	id: 'format', 
	title: 'formato',
	formatLivroId: 'livro',
	formatLivroTitle: 'livro',
	formatEbookId: 'ebook',
	formatEbookTitle: 'ebook'
}
export const bookConditions = {
	id: 'condition',
	title: 'estado',
	conditionNovoId: 'novo', 
	conditionNovoTitle: 'novo',
	conditionUsadoId: 'usado', 
	conditionUsadoTitle: 'usado'
}
export const bookPriceRanges = {
	id: 'priceRange', 
	title: 'faixa de preço',
	priceRangeUpTo30Id: 'ate30',
	priceRangeUpTo30Title: 'Até 30 reais',
	priceRange31to60Id: '31a60',
	priceRange31to60Title: 'Entre 31 e 60 reais',
	priceRange61to90Id: '61a90',
	priceRange61to90Title: 'Entre 61 e 90 reais',
	priceRange91onwardsId: 'maisde90',
	priceRange91onwardsTitle: 'Mais de 90',
}
export const bookCategories = {
	id: 'category',
	title: 'categoria',
}