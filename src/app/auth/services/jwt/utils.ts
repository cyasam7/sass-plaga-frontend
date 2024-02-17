import { AuthRoles } from '@fuse/utils/FuseUtils';
import { User, UserLoginResponse } from '../../user';

function toTemplateRole(params: string): string {
	const map = {
		RL000: 'admin',
		RL001: 'staff',
		RL002: 'user'
	};

	return map[params] as string;
}

export function formatUserResponse(response: UserLoginResponse): User {
	const user = {
		uid: response.id,
		role: toTemplateRole(response.role.code as AuthRoles),
		data: {
			displayName: response.name,
			photoURL: response.name,
			email: response.email
		}
	} as User;
	console.log({ user });
	return user;
}
