import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import { ReactElement } from 'react';
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

export function ServiceOrderV2(): ReactElement {
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
							<Text style={styles.title}>Pest Control Solutions</Text>
							<Text style={styles.subTitle}>123 Main St, Anytown USA</Text>
						</View>
					</View>
					<CustomText style={styles.subTitle}>Fecha del reporte: 10 de julio de 2024</CustomText>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Información del cliente</CustomText>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Nombre:</CustomText>
							<CustomText style={styles.normalText}>Juan Pérez</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Dirección:</CustomText>
							<CustomText style={styles.normalText}>456 Oak St, Anytown USA</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Teléfono:</CustomText>
							<CustomText style={styles.normalText}>555-1234</CustomText>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Servicios realizados</CustomText>
					<View style={styles.list}>
						<CustomText style={styles.listItem}>• Inspección de la propiedad</CustomText>
						<CustomText style={styles.listItem}>
							• Aplicación de tratamiento de control de plagas
						</CustomText>
						<CustomText style={styles.listItem}>• Colocación de trampas</CustomText>
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Plan de acción</CustomText>
					<CustomText style={{ fontSize: 12 }}>
						Se realizó una inspección exhaustiva de la propiedad y se identificaron las áreas afectadas por
						plagas. Se aplicó un tratamiento de control de plagas en las áreas afectadas y se colocaron
						trampas estratégicamente para monitorear y controlar la infestación.
					</CustomText>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Instrucciones finales</CustomText>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Incluir certificado:</CustomText>
							<CustomText style={styles.normalText}>Sí</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Programar seguimiento:</CustomText>
							<CustomText style={styles.normalText}>Sí</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Días para seguimiento:</CustomText>
							<CustomText style={styles.normalText}>30 días</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Costo del servicio:</CustomText>
							<CustomText style={styles.normalText}>$150.00</CustomText>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Presupuesto general</CustomText>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Total:</CustomText>
							<CustomText style={styles.normalText}>$150.00</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Tarifa:</CustomText>
							<CustomText style={styles.normalText}>$150.00</CustomText>
						</View>
						<View style={styles.gridItem}>
							<CustomText style={styles.boldText}>Saldo restante:</CustomText>
							<CustomText style={styles.normalText}>$0.00</CustomText>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Aviso de privacidad</CustomText>
					<CustomText style={styles.normalText}>
						La información personal recopilada en este reporte será utilizada únicamente para fines de
						prestación del servicio y no será compartida con terceros sin su consentimiento.
					</CustomText>
				</View>
				<View style={styles.section}>
					<CustomText style={styles.sectionTitle}>Firma del cliente</CustomText>
					<View style={styles.border}>
						<CustomText style={styles.boldText}>Firma:</CustomText>
						<View style={styles.signatureBox} />
					</View>
				</View>
			</Page>
		</Document>
	);
}
