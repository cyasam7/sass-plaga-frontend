import FusePageCarded from '@fuse/core/FusePageCarded';
import CustomHeaderBack from 'app/shared-components/CustomHeaderBack/CustomHeaderBack';
import React from 'react';

function CompanyDetail() {
	return (
		<FusePageCarded
			header={
				<CustomHeaderBack
					backText="Companies"
					title="Coca Cola"
					subtitle="Details"
				/>
			}
			content={<div>hola</div>}
			leftSidebarContent={<div>hola</div>}
			rightSidebarContent={<div>hola</div>}
		/>
	);
}

export default CompanyDetail;
