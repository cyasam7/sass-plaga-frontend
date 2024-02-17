import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Button } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded';

function Companies() {
	const { t } = useTranslation('examplePage');

	async function handleSubmit(): Promise<void> {
		axios.get('/company').then(({ data }) => {
			console.log(data);
		});
	}

	return (
		<FusePageCarded
			header={
				<div className="p-24 flex justify-between">
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

export default Companies;
