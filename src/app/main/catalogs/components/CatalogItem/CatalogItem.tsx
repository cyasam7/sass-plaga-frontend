import { Stack, Typography, Paper, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Delete, Edit } from '@mui/icons-material';
import { ICatalogItem } from './CatalogItemProps';
import { CatalogsService } from '../../service/catalogs.service';
import { columnsCatalog } from './columns';
import CatalogDialog from './CatalogDialog';

function CatalogItem(props: ICatalogItem) {
	const { title, route } = props;

	const [open, setOpen] = useState(false);

	const { data = [], isLoading } = useQuery({
		queryKey: ['CatalogItem', route],
		queryFn: () => CatalogsService.getCatalog(route),
		enabled: !!route
	});

	const columns: GridColDef[] = [
		...columnsCatalog,
		{
			field: 'actions',
			type: 'actions',
			getActions: () => {
				return [
					<GridActionsCellItem
						label="Eliminar"
						icon={<Delete />}
					/>,
					<GridActionsCellItem
						label="Eliminar"
						icon={<Edit />}
					/>
				];
			}
		}
	];

	return (
		<>
			<CatalogDialog
				open={open}
				route={route}
				onClose={() => setOpen(false)}
			/>
			<Paper>
				<Stack
					p={2}
					height="40vh"
				>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h6">{title}</Typography>
						<Button
							color="primary"
							variant="contained"
							onClick={() => setOpen(true)}
						>
							Agregar
						</Button>
					</Stack>
					<DataGrid
						rows={data}
						loading={isLoading}
						columns={columns}
					/>
				</Stack>
			</Paper>
		</>
	);
}

export default CatalogItem;
