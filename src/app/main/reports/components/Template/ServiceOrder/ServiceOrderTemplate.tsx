import React, { ReactElement } from 'react';
import { Page, Document, StyleSheet, View, Text, Image, Font } from '@react-pdf/renderer';
import vexlogo from 'public/assets/vex-logo.png';
import certImg from '../images/cert.jpg';
import qrImg from '../images/qr.jpeg';
import { mainColorPdf, textColorPdf } from '../colors';
import Category from './Category';
import InputValue from './InputValue';

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

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		backgroundColor: mainColorPdf,
		height: '35px',
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	container: {
		maxWidth: '475px',
		width: '100%'
	}
});

export default function ServiceOrderTemplate(): ReactElement {
	return (
		<Document>
			<Page size="A4">
				<View style={styles.header}>
					<View style={[styles.container, styles.headerWrapper]}>
						<Text style={{ color: '#fff', fontWeight: 'extrabold' }}>ORDEN DE SERVICIO</Text>
					</View>
				</View>
				<View style={{ marginTop: '20px', flexDirection: 'row', justifyContent: 'center' }}>
					<View style={styles.container}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={{ justifyContent: 'space-between' }}>
								<View>
									<Text
										style={{
											fontSize: '14px',
											color: mainColorPdf,
											fontWeight: 'bold',
											fontFamily: 'Inter'
										}}
									>
										Vex Fumigaciones
									</Text>
									<Text style={{ fontSize: '10px', marginTop: '8px' }}>RAMIREZ 416 ZONA CENTRO</Text>
								</View>
								<View>
									<Text style={{ fontSize: '10px' }}>N° 00001</Text>
									<Text style={{ fontSize: '10px', marginTop: '2px' }}>25 DE ABRIL DEL 2024</Text>
								</View>
							</View>
							<View>
								<Image
									source={vexlogo}
									style={{ width: '200px', height: '80px' }}
								/>
							</View>
						</View>
						<View style={{ marginTop: '24px' }}>
							<Text style={{ fontSize: '14px', color: mainColorPdf }}>Alexander Serrano</Text>
							<Text style={{ fontSize: '10px', marginTop: '8px' }}>
								Dirección: Ramirez #416 Zona Centro
							</Text>
							<Text style={{ fontSize: '10px', marginTop: '4px' }}>Telefono: +52 (618)3240572</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: '18px' }}>
							<Text
								style={{
									fontSize: '14px',
									color: textColorPdf,
									fontWeight: 'bold',
									fontFamily: 'Inter'
								}}
							>
								DATOS DE SERVICIO
							</Text>
						</View>
						<Category
							title="CONCEPTO"
							element={
								<View>
									<Text>Hola</Text>
								</View>
							}
						/>
						<Category
							title="PLAN DE ACCIÓN"
							element={
								<View>
									<Text style={{ fontSize: '10px', letterSpacing: '1.5px' }}>
										Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de
										texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde
										el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)
										desconocido usó una.
									</Text>
								</View>
							}
						/>
						<Category
							title="INSTRUCCIONES FINALES"
							element={
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: '16px' }}>
									<Image
										source={certImg}
										style={{ width: '130px', height: '65px' }}
									/>
									<View style={{ justifyContent: 'space-between', flex: 1 }}>
										<InputValue
											displayName="¿CERTIFICADO INCLUIDO?"
											value="SI"
										/>
										<InputValue
											displayName="¿BRINDAR SEGUIMIENTO?"
											value="NO"
										/>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												gap: '8px'
											}}
										>
											<InputValue
												displayName="DIAS"
												value="10 DIAS"
											/>
											<InputValue
												displayName="COSTO"
												value="1,000$"
											/>
										</View>
									</View>
									<Image
										source={qrImg}
										style={{ width: '70px', height: '70px' }}
									/>
								</View>
							}
						/>
						<Category
							title="PRESUPUESTO GENERAL"
							element={
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<View style={{ gap: '16px', flex: 0.7 }}>
										<InputValue
											displayName="TOTAL"
											value="1,000$"
										/>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												gap: '8px'
											}}
										>
											<InputValue
												displayName="ANTICIPO"
												value="9,000$"
											/>
											<InputValue
												displayName="RESTAN"
												value="100$"
											/>
										</View>
									</View>
									<View style={{ alignItems: 'center', flex: 1, marginTop: '16px' }}>
										<Text
											style={{
												fontSize: '10px',
												borderTop: '1px solid black',
												paddingTop: '8px',
												paddingHorizontal: '22px'
											}}
										>
											Firma de Aceptación del Cliente
										</Text>
									</View>
								</View>
							}
						/>
						<Category
							title="AVISO DE PRIVACIDAD"
							element={
								<View>
									<Text style={{ fontSize: '10px', letterSpacing: '1.5px' }}>
										En VEX Fumigaciones recopilamos información personal de nuestros clientes,
										incluyendo nombres, direcciones y detalles de contacto, exclusivamente con el
										propósito de proporcionar servicios de fumigación. Al firmar esta orden de
										servicio, usted está conforme con el servicio realizado así como la información
										brindada.
									</Text>
								</View>
							}
						/>
					</View>
				</View>
			</Page>
		</Document>
	);
}
