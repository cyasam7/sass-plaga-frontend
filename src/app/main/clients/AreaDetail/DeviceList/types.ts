import { Device } from '../../types';

export interface DeviceListProps {
  devices: Device[];
  onMenuClick: (event: React.MouseEvent<HTMLElement>, deviceId: string) => void;
  isLoading?: boolean;
}
