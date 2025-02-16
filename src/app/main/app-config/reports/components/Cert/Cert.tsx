import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 12,
		fontFamily: 'Helvetica'
	},
	section: {
		marginBottom: 20
	},
	header: {
		textAlign: 'center',
		marginBottom: 20
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	subtitle: {
		fontSize: 10,
		color: 'gray'
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	text: {
		fontSize: 12
	},
	sectionTitle: {
		fontSize: 10,
		color: 'gray',
		textTransform: 'uppercase',
		marginBottom: 4
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		paddingBottom: 6,
		marginBottom: 12
	},
	grid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12
	},
	signature: {
		textAlign: 'center',
		marginTop: 20,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		paddingTop: 4
	},
	footer: {
		textAlign: 'center',
		fontSize: 10,
		color: 'gray',
		marginTop: 20
	}
});

function Certificate() {
	return (
		<Document>
			<Page
				size="A4"
				style={styles.page}
			>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>CERTIFICADO DE FUMIGACIÓN</Text>
					<Text style={styles.subtitle}>SSA-12345-BC</Text>
				</View>

				{/* Info */}
				<View style={styles.section}>
					<View style={styles.infoRow}>
						<Text>FOLIO: FP-2024-0123</Text>
						<Text>12 MARZO 2024</Text>
					</View>

					{/* Cliente */}
					<View style={styles.borderBottom}>
						<Text style={styles.sectionTitle}>Cliente</Text>
						<Text>Empresa Ejemplo S.A. de C.V.</Text>
						<Text>Calle Comercial #456, Zona Industrial</Text>
					</View>

					{/* Servicio y Tratamiento */}
					<View style={styles.grid}>
						<View>
							<Text style={styles.sectionTitle}>Servicio</Text>
							<Text>Desinsectación</Text>
							<Text>500 m² (Oficinas y Almacén)</Text>
						</View>
						<View>
							<Text style={styles.sectionTitle}>Tratamiento</Text>
							<Text>Cipermetrina 20%</Text>
							<Text>Aspersión en frío</Text>
						</View>
					</View>

					{/* Observaciones */}
					<View>
						<Text style={styles.sectionTitle}>Observaciones</Text>
						<Text>
							Se realizó tratamiento preventivo en todas las áreas especificadas. Se recomienda
							ventilación por 2 horas.
						</Text>
					</View>
				</View>

				{/* Firmas */}
				<View style={styles.grid}>
					<View style={styles.signature}>
						<Text>Ing. Juan Pérez Rodríguez</Text>
						<Text style={styles.subtitle}>Técnico Responsable</Text>
						<Text style={styles.subtitle}>TR-12345</Text>
					</View>
					<View style={styles.signature}>
						<Text>María González</Text>
						<Text style={styles.subtitle}>Cliente</Text>
					</View>
				</View>

				{/* Footer */}
				<View style={styles.footer}>
					<Text>NOM-256-SSA1-2012</Text>
					<Text>Certificado válido por 30 días</Text>
				</View>
			</Page>
		</Document>
	);
}

export default Certificate;
