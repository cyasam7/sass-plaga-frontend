import React from 'react';
import { Button, Stack, Tab, Tabs } from '@mui/material';
import { ECatalogType } from 'src/app/shared/entities/CatalogEntities';
import { IHeaderCatalogTagProps } from './IHeaderCatalogTagProps';
import { translateCatalogs } from './utils';

function HeaderCatalogTag(props: IHeaderCatalogTagProps) {
	const { onChangeTab, onClickOpenModal, value } = props;
	return (
		<Stack direction="column">
			<Tabs
				value={value}
				onChange={(_, v: string) => onChangeTab(v)}
			>
				<Tab
					sx={{ width: 200 }}
					label={translateCatalogs(ECatalogType.APPLICATION_TYPE)}
					value={ECatalogType.APPLICATION_TYPE}
				/>
				<Tab
					sx={{ width: 200 }}
					label={translateCatalogs(ECatalogType.TYPE_PLAGUE)}
					value={ECatalogType.TYPE_PLAGUE}
				/>
				<Tab
					sx={{ width: 200 }}
					label={translateCatalogs(ECatalogType.TYPE_SERVICE)}
					value={ECatalogType.TYPE_SERVICE}
				/>
				<Tab
					sx={{ width: 200 }}
					label={translateCatalogs(ECatalogType.INSECTICIDE)}
					value={ECatalogType.INSECTICIDE}
				/>
				<Stack
					direction="row"
					justifyContent="flex-end"
					className="w-full"
				>
					<Button
						variant="contained"
						color="primary"
						onClick={onClickOpenModal}
					>
						{`CREAR ${translateCatalogs(value as ECatalogType)}`}
					</Button>
				</Stack>
			</Tabs>
		</Stack>
	);
}

export default HeaderCatalogTag;
