import { Dayjs } from 'dayjs';
import { EStatusOrder } from 'src/app/shared/entities/OrderEntity';
import { ETabsPlagues } from '../HeaderTabs/IHeaderTabsProps';

export interface IHeaderFiltersProps {
	onChangeDay?: (value?: ETabsPlagues) => void;
	onChangeDate?: (value?: Dayjs) => void;
	onChangeStatus?: (value?: EStatusOrder) => void;
}
