import { Device } from "../../types";

export interface DeviceCardProps {
  device: Device;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, deviceId: string) => void;
  onEditDevice: (device: Device) => void;
  getDeviceTypeLabel: (type: string) => string;
  getStatusLabel: (status: string) => string;
  getStatusColor: (status: string) => string;
} 