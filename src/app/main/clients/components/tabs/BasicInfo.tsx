import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box, Typography } from '@mui/material';
import { ClientEntity } from 'src/app/shared/entities/ClientsEntities';
import { translateClientType } from '../../utils';

interface IBasicInfoProps {
	client: ClientEntity;
}

function BasicInfo(props: IBasicInfoProps) {
	const { client } = props;
	return (
		<div className="flex flex-col space-y-32">
			{client?.phone && (
				<div className="flex">
					<FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
					<div className="min-w-0 ml-24 space-y-4">
						<div className="flex items-center leading-6">
							<Box
								className="hidden sm:flex w-24 h-16 overflow-hidden"
								sx={{
									backgroundSize: '24px 3876px'
								}}
							>
								<svg
									width="20"
									height="15"
									viewBox="0 0 20 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clipPath="url(#clip0_270_60847)">
										<rect
											width="20"
											height="15"
											fill="white"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M14 0H20V15H14V0Z"
											fill="#D9071E"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0 0H6V15H0V0Z"
											fill="#006923"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 0H14V15H6V0Z"
											fill="white"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8.99007 4.94588C8.99007 4.94588 8.56083 5.27879 8.6411 5.63371C8.72138 5.98864 9.56732 5.63371 9.46505 5.2898C9.36279 4.94588 8.99007 4.94588 8.99007 4.94588Z"
											fill="#FCCA3D"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8.33462 5.79255C8.01345 5.79255 7.87955 5.5249 7.94598 5.24043C7.98148 5.0884 8.07369 4.89555 8.22415 4.64496L8.75998 4.96669C8.70262 5.06223 8.6569 5.14516 8.62298 5.21361C8.73532 5.2468 8.84606 5.29609 8.93619 5.35544C9.22801 5.54761 9.33542 5.89001 9.02256 6.14377C8.96201 6.19289 8.86376 6.36033 8.80952 6.52114C8.9588 6.52946 9.0655 6.55191 9.16385 6.61009C9.4401 6.77349 9.41411 7.0715 9.20374 7.30164C9.05464 7.46475 8.85556 7.59706 8.66801 7.66483C8.35597 7.77759 8.02212 7.7344 8.02212 7.33493L8.02204 7.33201C8.02143 7.31574 8.02038 7.28793 8.15973 7.28478M8.16585 7.28466L8.15973 7.28478C7.92196 7.28141 7.87107 7.15553 7.84142 6.9314C7.83391 6.87462 7.83088 6.82058 7.82671 6.70397L7.82393 6.62808L7.82058 6.55418L7.81958 6.53774C7.81488 6.4656 7.81162 6.41564 7.97336 6.41564H7.61082V5.79064H7.97336C8.17898 5.79064 8.29262 5.86007 8.35774 6.00363C8.39398 5.93853 8.43342 5.87724 8.47492 5.8223C8.42264 5.8042 8.36963 5.79255 8.33462 5.79255M8.16585 7.28466C8.17254 7.28455 8.17955 7.28449 8.18688 7.28449L8.17738 7.28443L8.16585 7.28466ZM8.73271 6.89036L8.74244 6.87995C8.74137 6.88111 8.74033 6.8826 8.73932 6.88438L8.73271 6.89036ZM8.45889 7.07583C8.45875 7.07589 8.45911 7.07581 8.4598 7.07566L8.45889 7.07583ZM8.45974 6.84006L8.46102 6.84942C8.4603 6.84398 8.45963 6.83803 8.45899 6.83133L8.45974 6.84006Z"
											fill="#A8AC71"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M12.0415 7.75181C12.0415 7.75181 12.6197 6.03847 11.7007 5.15157C10.7817 4.26467 9.71976 4.32402 9.71976 4.32402C9.71976 4.32402 9.41395 4.55123 9.71976 4.72452C10.0256 4.89781 9.89745 5.06396 9.89745 5.06396C9.89745 5.06396 9.3853 4.54393 9.04531 4.84775C8.70532 5.15157 9.36269 5.10533 9.2931 5.33409C9.22351 5.56285 8.9287 6.57851 9.35949 7.09129C9.79028 7.60407 8.95218 7.49279 9.12264 7.49279C9.2931 7.49279 9.89745 7.61215 9.89745 7.49279C9.89745 7.37343 10.1076 7.95684 10.2874 7.95684C10.4672 7.95684 10.6059 7.75181 10.6059 7.75181C10.6059 7.75181 10.858 7.95684 11.0116 7.95684C11.1651 7.95684 11.7007 7.82266 11.7007 7.82266L10.6885 6.96983C10.6885 6.96983 10.7495 6.59367 10.6059 6.51225C10.4624 6.43084 11.7571 7.23377 11.8584 7.49279C11.9598 7.75181 12.0415 7.75181 12.0415 7.75181Z"
											fill="#8F4620"
										/>
										<path
											d="M6.91654 7.32911C6.91654 7.32911 7.01038 7.03001 7.11086 7.00925C7.1979 6.99126 7.38094 7.15258 7.38094 7.15258C7.70609 8.95875 8.4923 9.6642 9.79683 9.6642C11.1167 9.6642 11.9167 9.12815 12.3835 7.46236C12.3835 7.46236 12.6316 7.20893 12.7192 7.2371C12.8145 7.26777 12.934 7.60307 12.934 7.60307C12.3985 9.51408 11.3866 10.3649 9.79683 10.3649C8.1917 10.3649 7.28988 9.40299 6.91654 7.32911Z"
											fill="#9FAB2F"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8.33389 8.53528C8.33389 8.53528 10.2116 8.93362 10.9528 8.93362C11.6939 8.93362 10.3025 9.53849 9.75956 9.53849C9.21664 9.53849 8.33389 8.53528 8.33389 8.53528Z"
											fill="#2FC2DC"
										/>
										<rect
											x="9.16666"
											y="8.8125"
											width="1.25"
											height="0.669643"
											rx="0.104167"
											fill="#F9AA51"
										/>
										<path
											d="M7.6097 7.58494L8.12134 7.22598C8.78724 8.17512 9.78306 8.48737 11.1758 8.16147L11.3182 8.77004C9.69009 9.15101 8.43157 8.75639 7.6097 7.58494Z"
											fill="#259485"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M10.3696 7.71892C10.3696 7.71892 9.61105 8.11822 9.86389 8.11822C10.1167 8.11822 11.1063 8.31787 10.9137 8.11822C10.7212 7.91857 10.3696 7.71892 10.3696 7.71892Z"
											fill="#FCCA3D"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M9.47274 7.24264C9.47274 7.24264 9.32861 6.82635 9.02869 6.82635C8.72876 6.82635 8.81342 7.16784 8.66918 7.16784C8.52495 7.16784 8.80358 7.40814 8.92776 7.40814C9.05195 7.40814 9.47274 7.24264 9.47274 7.24264Z"
											fill="#FCCA3D"
										/>
									</g>
									<defs>
										<clipPath id="clip0_270_60847">
											<rect
												width="20"
												height="15"
												fill="white"
											/>
										</clipPath>
									</defs>
								</svg>
							</Box>

							<div className="ml-10 font-mono">{client.phone}</div>

							<Typography
								className="text-md truncate"
								color="text.secondary"
							>
								<span className="mx-8">&bull;</span>
								<span className="font-medium">Personal</span>
							</Typography>
						</div>
					</div>
				</div>
			)}
			{client.address && (
				<div className="flex items-center">
					<FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
					<div className="ml-24 leading-6">{client.address}</div>
				</div>
			)}
			{client.typeClient && (
				<div className="flex items-center">
					<FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
					<div className="ml-24 leading-6">{translateClientType(client.typeClient)}</div>
				</div>
			)}
		</div>
	);
}

export default BasicInfo;
