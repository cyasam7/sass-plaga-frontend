import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

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

function Clients() {
	return (
		<Root
			header={
				<div className="p-24">
					<Typography variant="h6">Clientes</Typography>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					<p>hla</p>
				</div>
			}
		/>
	);
}

export default Clients;
