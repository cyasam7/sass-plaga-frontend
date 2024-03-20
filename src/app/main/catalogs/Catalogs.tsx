import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import CatalogsContent from './components/CatalogsContent/CatalogsContent';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Catalogs() {
	return (
		<Root
			header={
				<div className="p-24">
					<Typography variant="h6">Catálogos</Typography>
				</div>
			}
			content={
				<div className="p-24 w-full">
					<CatalogsContent />
				</div>
			}
		/>
	);
}

export default Catalogs;
