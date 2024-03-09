export interface OrderDialogProps {
	open: boolean;
	onSubmit: () => Promise<void>;
	onCancel: () => void;
	id?: string;
}
