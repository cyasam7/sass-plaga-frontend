import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

// Register fonts
Font.register({
	family: 'Inter',
	src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
});

// Create styles
const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontFamily: 'Inter'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
		borderTopWidth: 8,
		borderTopColor: '#1a5f7a',
		paddingTop: 15
	},
	logoContainer: {
		width: 120
	},
	logo: {
		width: 100,
		height: 50,
		objectFit: 'contain'
	},
	licenseNumber: {
		fontSize: 8,
		color: '#4B5563',
		marginTop: 4
	},
	titleContainer: {
		alignItems: 'flex-end'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1a5f7a'
	},
	certificateNumber: {
		fontSize: 10,
		color: '#4B5563'
	},
	companyName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#2d9cdb',
		marginBottom: 15
	},
	infoGrid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15
	},
	infoColumn: {
		width: '48%'
	},
	infoRow: {
		marginBottom: 8
	},
	label: {
		fontSize: 8,
		color: '#4B5563'
	},
	value: {
		fontSize: 10,
		marginTop: 2
	},
	serviceDetails: {
		backgroundColor: '#f8fafc',
		padding: 15,
		borderRadius: 6,
		marginBottom: 15
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#2d9cdb',
		marginBottom: 10
	},
	serviceGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	serviceItem: {
		width: '50%',
		marginBottom: 10
	},
	productsSection: {
		backgroundColor: '#ffffff',
		padding: 12,
		borderRadius: 4,
		marginTop: 15
	},
	signatures: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		paddingTop: 15,
		borderTopWidth: 1,
		borderTopColor: '#E5E7EB'
	},
	signature: {
		width: 120,
		alignItems: 'center'
	},
	signatureBox: {
		height: 60,
		width: '100%',
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 4
	},
	signatureLine: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#9CA3AF',
		marginBottom: 4
	}
});

export interface CertificateData {
	companyName: string;
	clientName: string;
	address: string;
	date: string;
	certificateNumber: string;
	validUntil: string;
	logoUrl: string;
	sanitaryLicense: string;
	serviceType: string;
	treatedAreas: string;
	chemicals: string;
	targetPests: string;
	applicationMethod: string;
	dosage: string;
	urlClientSignature: string;
	urlTechnicalSignature: string;
}

interface CertificatePDFProps {
	data: CertificateData;
	primaryColor: string;
	secondaryColor: string;
	showLogo?: boolean;
}

function Certificate({ data, primaryColor, secondaryColor, showLogo = true }: CertificatePDFProps): JSX.Element {
	return (
		<Document>
			<Page
				size="A4"
				style={styles.page}
			>
				<View style={[styles.header, { borderTopColor: primaryColor }]}>
					{showLogo ? (
						<View style={styles.logoContainer}>
							<Image
								src={data.logoUrl}
								style={styles.logo}
							/>
							<Text style={styles.licenseNumber}>
								Licencia Sanitaria: {data.sanitaryLicense || '[Número de Licencia]'}
							</Text>
						</View>
					) : (
						<View style={styles.logoContainer}>
							<Text style={styles.licenseNumber}>
								Licencia Sanitaria: {data.sanitaryLicense || '[Número de Licencia]'}
							</Text>
						</View>
					)}
					<View style={styles.titleContainer}>
						<Text style={[styles.title, { color: primaryColor }]}>Certificado de Fumigación</Text>
						<Text style={styles.certificateNumber}>No. {data.certificateNumber}</Text>
					</View>
				</View>

				<Text style={[styles.companyName, { color: secondaryColor }]}>{data.companyName}</Text>

				<View style={styles.infoGrid}>
					<View style={styles.infoColumn}>
						<View style={styles.infoRow}>
							<Text style={styles.label}>Cliente:</Text>
							<Text style={styles.value}>{data.clientName || '[Nombre del Cliente]'}</Text>
						</View>
						<View style={styles.infoRow}>
							<Text style={styles.label}>Dirección:</Text>
							<Text style={styles.value}>{data.address || '[Dirección]'}</Text>
						</View>
					</View>
					<View style={styles.infoColumn}>
						<View style={styles.infoRow}>
							<Text style={styles.label}>Fecha:</Text>
							<Text style={styles.value}>{new Date(data.date).toLocaleDateString()}</Text>
						</View>
						<View style={styles.infoRow}>
							<Text style={styles.label}>Válido hasta:</Text>
							<Text style={styles.value}>{new Date(data.validUntil).toLocaleDateString()}</Text>
						</View>
					</View>
				</View>

				<View style={styles.serviceDetails}>
					<Text style={[styles.sectionTitle, { color: secondaryColor }]}>Detalles del Servicio</Text>

					<View style={styles.serviceGrid}>
						<View style={styles.serviceItem}>
							<Text style={styles.label}>Tipo de Servicio:</Text>
							<Text style={styles.value}>{data.serviceType || '[Tipo de Servicio]'}</Text>
						</View>

						<View style={styles.serviceItem}>
							<Text style={styles.label}>Plagas Objetivo:</Text>
							<Text style={styles.value}>{data.targetPests || '[Plagas Objetivo]'}</Text>
						</View>

						<View style={styles.serviceItem}>
							<Text style={styles.label}>Áreas Tratadas:</Text>
							<Text style={styles.value}>{data.treatedAreas || '[Áreas Tratadas]'}</Text>
						</View>
					</View>

					<View style={styles.productsSection}>
						<Text style={[styles.sectionTitle, { color: secondaryColor, fontSize: 14 }]}>
							Productos y Aplicación
						</Text>

						<View style={styles.serviceGrid}>
							<View style={styles.serviceItem}>
								<Text style={styles.label}>Productos Utilizados:</Text>
								<Text style={styles.value}>{data.chemicals || '[Productos Químicos]'}</Text>
							</View>

							<View style={styles.serviceItem}>
								<Text style={styles.label}>Método de Aplicación:</Text>
								<Text style={styles.value}>{data.applicationMethod || '[Método]'}</Text>
							</View>

							<View style={styles.serviceItem}>
								<Text style={styles.label}>Dosis:</Text>
								<Text style={styles.value}>{data.dosage || '[Dosis]'}</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.signatures}>
					<View style={styles.signature}>
						<Image
							src={data.urlTechnicalSignature}
							style={styles.signatureBox}
						/>
						<View style={styles.signatureLine} />
						<Text style={styles.label}>Técnico Responsable</Text>
					</View>
					<View style={styles.signature}>
						<Image
							src={data.urlClientSignature}
							style={styles.signatureBox}
						/>
						<View style={styles.signatureLine} />
						<Text style={styles.label}>Cliente</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}

export default Certificate;
