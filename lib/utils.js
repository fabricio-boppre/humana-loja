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
	priceRangeUpTo60Id: 'ate60',
	priceRangeUpTo60Title: 'Até 60 reais',
	priceRangeUpTo90Id: 'ate90',
	priceRangeUpTo90Title: 'Até 90 reais',
	priceRangeUpTo150Id: 'ate150',
	priceRangeUpTo150Title: 'Até 150 reais',
}
export const bookCategories = {
	id: 'category',
	title: 'categoria',
}
export const bookSubcategories = {
	id: 'subcategory',
	title: 'Subcategoria',
}