import { Device } from '../../types';

export interface DeviceCardProps {
  device: Device;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, deviceId: string) => void;
}
