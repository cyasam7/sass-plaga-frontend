export enum ETabsPlagues {
	ALL,
	TODAY,
	TOMORROW,
	PENDING
}

export interface IProps {
	onChange: (value: ETabsPlagues) => void;
	value: ETabsPlagues;
}
