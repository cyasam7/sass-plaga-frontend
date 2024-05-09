import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PDFViewer } from '@react-pdf/renderer';
import { DocumentCanvasProvider } from './hooks/useDocumentCanvas';
import ServiceOrderTemplate from './components/Template/ServiceOrder/ServiceOrderTemplate';

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

function Reports() {
	const { t } = useTranslation('ReportsPage');

	return (
		<DocumentCanvasProvider>
			<DndProvider backend={HTML5Backend}>
				<Root
					header={
						<div className="p-24">
							<h4>{t('TITLE')}</h4>
						</div>
					}
					content={
						<div className="p-24 w-full">
							<PDFViewer
								width="100%"
								height="800px"
							>
								<ServiceOrderTemplate />
							</PDFViewer>
						</div>
					}
				/>
			</DndProvider>
		</DocumentCanvasProvider>
	);
}

export default Reports;
