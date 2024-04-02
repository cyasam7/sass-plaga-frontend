import { Outlet } from 'react-router-dom';

/**
 * The Clients sidebar content.
 */
function ClientsSidebarContent() {
	return (
		<div className="flex flex-col flex-auto max-w-full w-lg ">
			<Outlet />
		</div>
	);
}

export default ClientsSidebarContent;
