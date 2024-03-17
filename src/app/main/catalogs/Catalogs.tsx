import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
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
	const { t } = useTranslation('CatalogsPage');

	return (
		<Root
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
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
