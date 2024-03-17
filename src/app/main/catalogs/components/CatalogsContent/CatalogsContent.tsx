import { Grid } from '@mui/material';
import React from 'react';
import CatalogItem from '../CatalogItem/CatalogItem';

function CatalogsContent() {
	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				item
				xs={12}
				md={6}
			>
				<CatalogItem
					route="typePlague"
					title="Tipo de plaga"
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
			>
				<CatalogItem
					route="typeService"
					title="Tipo de servicios"
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
			>
				<CatalogItem
					route="recommendation"
					title="Recomendaciones"
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
			>
				<CatalogItem
					route="frequency"
					title="Frecuencia"
				/>
			</Grid>
		</Grid>
	);
}

export default CatalogsContent;
