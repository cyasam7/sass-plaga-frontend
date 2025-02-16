import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import { ReactElement } from 'react';

import { IServiceOrderReport } from './IServiceOrder';
import { styles } from './styles';
import CustomText from '../Template/ServiceOrder/CustomText';

Font.register({
	family: 'Inter',
	fonts: [
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
			fontWeight: 100
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
			fontWeight: 200
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
			fontWeight: 300
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
			fontWeight: 400
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
			fontWeight: 500
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
			fontWeight: 600
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
			fontWeight: 700
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
			fontWeight: 800
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
			fontWeight: 900
		}
	]
});
export function getYesOrNo(value: boolean): string {
	return value ? 'Si' : 'No';
}

export function ServiceOrderReport(props: IServiceOrderReport): ReactElement {
	const { report } = props;
	return (
		<Document>
			<Page style={styles.page}>
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Image
							src="/placeholder.svg"
							style={styles.logo}
						/>
						<View>
							<Text style={styles.title}>{report.companyName}</Text>
							<Text style={styles.subTitle}>{report.companyAddress}</Text>
						</View>
					</View>
					<CustomText style={styles.subTitle}>
						Fecha del reporte: {new Date().toLocaleDateString()}
					</CustomText>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Información del cliente</CustomText>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Nombre:</CustomText>
							<CustomText style={styles.normalText}>{report.clientName}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Dirección:</CustomText>
							<CustomText style={styles.normalText}>{report.clientAddress}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Teléfono:</CustomText>
							<CustomText style={styles.normalText}>{report.clientPhone}</CustomText>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Servicios realizados</CustomText>
					<View style={styles.list}>
						{report.services.map((service) => (
							<CustomText style={styles.listItem}>• {service}</CustomText>
						))}
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Información de servicio</CustomText>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Areas revisadas:</CustomText>
							<CustomText style={styles.normalText}>{report.infestationArea}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Nivel de infestación:</CustomText>
							<CustomText style={styles.normalText}>{report.infestationLvl}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Plagas:</CustomText>
							<CustomText style={styles.normalText}>{report.plagues}</CustomText>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Plan de acción</CustomText>
					<CustomText style={{ fontSize: 12 }}>{report.observations}</CustomText>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Instrucciones finales</CustomText>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Incluir certificado:</CustomText>
							<CustomText style={styles.normalText}>{getYesOrNo(report.includeCertificate)}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Programar seguimiento:</CustomText>
							<CustomText style={styles.normalText}>{getYesOrNo(report.scheduleFollowUp)}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Días para seguimiento:</CustomText>
							<CustomText style={styles.normalText}>{`${report.daysFollowUp} Dias`}</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Costo del servicio:</CustomText>
							<CustomText style={styles.normalText}>{report.servicePrice}</CustomText>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Aviso de privacidad</CustomText>
					<CustomText style={styles.normalText}>
						{report.terms ??
							`La información personal recopilada en este reporte será utilizada únicamente para fines de
						prestación del servicio y no será compartida con terceros sin su consentimiento.
						`}
					</CustomText>
				</View>
				<View
					style={{
						...styles.section,
						...styles.border,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						gap: '12px'
					}}
				>
					<View style={{ flex: 1 }}>
						<View>
							<CustomText style={styles.boldText}>Firma del fumigador:</CustomText>
							<Image
								src={report.signFumigator}
								style={styles.signatureBox}
							/>
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<View>
							<CustomText style={styles.boldText}>Firma del cliente:</CustomText>
							<Image
								src={report.signClient}
								style={styles.signatureBox}
							/>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
}
