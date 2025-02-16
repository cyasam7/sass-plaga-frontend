export interface IServiceOrderReport {
	report: {
		companyName: string;
		companyAddress: string;
		date: string;
		clientName: string;
		clientAddress: string;
		clientPhone: string;
		services: string[];
		observations: string;
		includeCertificate: boolean;
		scheduleFollowUp: boolean;
		daysFollowUp: number;
		servicePrice: string;
		infestationArea: string;
		infestationLvl: string;
		plagues: string;
		terms?: string;
		signFumigator: string;
		signClient: string;
	};
}
