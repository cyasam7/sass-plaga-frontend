import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import CompaniesConfig from '../main/business/BusinessConfig';
import OrdersConfig from '../main/orders/OrdersConfig';
import ContactsAppConfig from '../main/clients/ClientsAppConfig';
import UsersConfig from '../main/users/UsersConfig';
import forgotPasswordPagesConfig from '../main/forgot-password/forgotPasswordPagesConfig';

const routeConfigs: FuseRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	forgotPasswordPagesConfig,
	ExampleConfig,
	CompaniesConfig,
	OrdersConfig,
	ContactsAppConfig,
	UsersConfig
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/example" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
