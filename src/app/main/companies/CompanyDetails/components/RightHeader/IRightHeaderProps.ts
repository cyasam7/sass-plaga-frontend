export interface IRightHeaderProps {
	tab: string;
	onSaveBasicInformation: () => Promise<void>;
	onAddAreas: () => Promise<void> | void;
}
