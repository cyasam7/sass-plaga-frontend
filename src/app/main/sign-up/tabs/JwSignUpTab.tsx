import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import _ from '@lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { AxiosError } from 'axios';
import { SignUpPayload, useAuth } from '../../../auth/AuthRouteProvider';

/**
 * Form Validation Schema
 */
const schema = z
	.object({
		name: z.string().nonempty('You must enter your name'),
		email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
		phone: z.string(),
		password: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().nonempty('Password confirmation is required'),
		companyName: z.string().nonempty(FIELD_REQUIRED),
		workspaceName: z.string().nonempty(FIELD_REQUIRED),
		acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});

const defaultValues = {
	name: '',
	email: '',
	password: '',
	phone: '',
	companyName: '',
	workspaceName: '',
	passwordConfirm: '',
	acceptTermsConditions: false
};

function JwtSignUpTab() {
	const { jwtService } = useAuth();

	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(formData: SignUpPayload) {
		jwtService
			.signUp({
				...formData
			})
			.then(() => {
				//
			})
			.catch((_errors: AxiosError<{ message: string }>) => {
				const { message } = _errors.response.data;
				if (message === 'Ya existe un usuario con ese teléfono') {
					setError('phone', { message });
				}
				if (message === 'Ya existe un usuario con ese email') {
					setError('email', { message });
				}
				if (message === 'Ya existe tenant con ese nombre') {
					setError('workspaceName', { message: 'Ya existe un espacio de trabajo con ese nombre' });
				}
			});
	}

	return (
		<form
			name="registerForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Nombre completo"
						autoFocus
						type="name"
						error={!!errors.name}
						helperText={errors?.name?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Email"
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Contraseña"
						type="password"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Contraseña (Confirmar)"
						type="password"
						error={!!errors.passwordConfirm}
						helperText={errors?.passwordConfirm?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>
			<Controller
				name="phone"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Teléfono"
						type="text"
						error={!!errors.phone}
						helperText={errors?.phone?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>
			<Controller
				name="companyName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Nombre de compañía"
						type="text"
						error={!!errors.companyName}
						helperText={errors?.companyName?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>
			<Controller
				name="workspaceName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						onChange={(e) => {
							const value = e.target.value ?? '';
							const formattedValue = value.replace(' ', '-').toLowerCase();
							field.onChange(formattedValue);
						}}
						className="mb-24"
						label="Nombre de espacio de trabajo"
						type="text"
						error={!!errors.workspaceName}
						helperText={errors?.workspaceName?.message}
						variant="standard"
						required
						fullWidth
					/>
				)}
			/>
			<Controller
				name="acceptTermsConditions"
				control={control}
				render={({ field }) => (
					<FormControl
						className="items-center"
						error={!!errors.acceptTermsConditions}
					>
						<FormControlLabel
							label="I agree to the Terms of Service and Privacy Policy"
							control={
								<Checkbox
									size="small"
									{...field}
								/>
							}
						/>
						<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
					</FormControl>
				)}
			/>

			<Button
				variant="contained"
				color="secondary"
				className="mt-24 w-full"
				aria-label="Register"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
			>
				Create your free account
			</Button>
		</form>
	);
}

export default JwtSignUpTab;
