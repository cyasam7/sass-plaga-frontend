import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Button } from '@mui/material';

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
	const { t } = useTranslation('examplePage');

	async function handleSubmit(): Promise<void> {
		axios.get('/company').then(({ data }) => {
			console.log(data);
		});
	}

	return (
		<Root
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					<p>hla</p>
					<Button onClick={handleSubmit}>Peticion</Button>
				</div>
			}
		/>
	);
}

export default Clients;
