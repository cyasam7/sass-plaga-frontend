import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomPagination, { ICustomPaginationProps } from './CustomPagination';

interface ICustomDataGridProps extends ICustomPaginationProps {
	rows: unknown[];
	columns: GridColDef[];
	loading?: boolean;
}

function CustomDataGrid(props: ICustomDataGridProps) {
	const { loading, rows, columns, page, onPageChange, rowsPerPage, onRowsPerPageChange } = props;
	return (
		<DataGrid
			loading={loading}
			rows={rows}
			columns={columns}
			slots={{
				pagination: CustomPagination
			}}
			slotProps={{
				pagination: {
					page,
					onPageChange,
					rowsPerPage,
					onRowsPerPageChange
				}
			}}
		/>
	);
}

export default CustomDataGrid;
