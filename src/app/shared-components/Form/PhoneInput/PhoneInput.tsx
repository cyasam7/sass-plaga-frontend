import 'react-international-phone/style.css';

import { BaseTextFieldProps, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { CountryIso2, defaultCountries, FlagImage, parseCountry, usePhoneInput } from 'react-international-phone';

export interface MUIPhoneProps extends BaseTextFieldProps {
	value: string;
	onChange: (phone: string) => void;
}

export function PhoneInput({ value, onChange, ...restProps }: MUIPhoneProps) {
	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: 'mx',
		value,
		countries: defaultCountries,
		onChange: (data) => {
			if (data.phone !== `+${data.country.dialCode}`) {
				onChange(data.phone);
			}
		}
	});

	return (
		<TextField
			variant="outlined"
			label="Phone number"
			color="primary"
			placeholder="Phone number"
			value={inputValue}
			onChange={handlePhoneValueChange}
			type="tel"
			inputRef={inputRef}
			InputProps={{
				startAdornment: (
					<InputAdornment
						position="start"
						style={{ marginRight: '2px', marginLeft: '-8px' }}
					>
						<Select
							MenuProps={{
								style: {
									height: '300px',
									width: '360px',
									top: '10px',
									left: '-34px'
								},
								transformOrigin: {
									vertical: 'top',
									horizontal: 'left'
								}
							}}
							sx={{
								width: 'max-content',
								// Remove default outline (display only on focus)
								fieldset: {
									display: 'none'
								},
								'&.Mui-focused:has(div[aria-expanded="false"])': {
									fieldset: {
										display: 'block'
									}
								},
								// Update default spacing
								'.MuiSelect-select': {
									padding: '8px',
									paddingRight: '24px !important'
								},
								svg: {
									right: 0
								}
							}}
							value={country.iso2}
							onChange={(e) => setCountry(e.target.value as CountryIso2)}
							renderValue={(value) => (
								<FlagImage
									iso2={value}
									style={{ display: 'flex' }}
								/>
							)}
						>
							{defaultCountries.map((c) => {
								const country = parseCountry(c);
								return (
									<MenuItem
										key={country.iso2}
										value={country.iso2}
									>
										<FlagImage
											iso2={country.iso2}
											style={{ marginRight: '8px' }}
										/>
										<Typography marginRight="8px">{country.name}</Typography>
										<Typography color="gray">+{country.dialCode}</Typography>
									</MenuItem>
								);
							})}
						</Select>
					</InputAdornment>
				)
			}}
			{...restProps}
		/>
	);
}
