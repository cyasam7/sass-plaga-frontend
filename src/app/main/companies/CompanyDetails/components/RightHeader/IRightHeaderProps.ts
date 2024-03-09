export interface IRightHeaderProps {
	tab: string;
	onSaveBasicInformation: () => Promise<void>;
	onAddAreas: () => Promise<void> | void;
	onDelete: () => Promise<void> | void;
}
