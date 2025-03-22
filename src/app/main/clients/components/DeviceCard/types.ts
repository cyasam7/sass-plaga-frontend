export interface Device {
  id: string;
  type: string;
  code: string;
  location: string;
  status: string;
  installDate: string;
  lastCheck?: string;
  nextCheck?: string;
  notes?: string;
}

export interface DeviceCardProps {
  device: Device;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, deviceId: string) => void;
  onEditDevice: (device: Device) => void;
  getDeviceTypeLabel: (type: string) => string;
  getStatusLabel: (status: string) => string;
  getStatusColor: (status: string) => string;
} 