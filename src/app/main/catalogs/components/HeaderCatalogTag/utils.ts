import { ECatalogType } from 'src/app/shared/entities/CatalogEntities';

const mapCatalogsTranslated = {
	[ECatalogType.APPLICATION_TYPE]: 'TIPO DE APLICACIÓN',
	[ECatalogType.INSECTICIDE]: 'INSECTICIDA',
	[ECatalogType.TYPE_PLAGUE]: 'TIPO DE PLAGA',
	[ECatalogType.TYPE_SERVICE]: 'TIPO DE SERVICIO'
};

export function translateCatalogs(catalog: ECatalogType): string {
	return mapCatalogsTranslated[catalog];
}
