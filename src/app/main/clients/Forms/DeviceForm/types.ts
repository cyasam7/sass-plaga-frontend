import { z } from 'zod';
import { StatusDevice, TypeDevice } from '../../types';

const deviceTypes = [TypeDevice.CRAWLING, TypeDevice.FLYERS, TypeDevice.RODENTS] as const;
const deviceStatuses = [StatusDevice.DISABLED, StatusDevice.ENABLED, StatusDevice.MAINTENANCE] as const;

export const deviceSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  branchId: z.string(),
  areaId: z.string(),
  type: z.enum(deviceTypes, { required_error: 'Tipo de dispositivo' }),
  stationNumber: z.string({ required_error: 'Numero de dispositivo requerido' }),
  status: z.enum(deviceStatuses, { required_error: 'Estatus del dispositivo requerido.' })
});

export type DeviceFormData = z.infer<typeof deviceSchema>;

export interface DeviceFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (device: DeviceFormData) => void;
  device: DeviceFormData | null;
  isEditing: boolean;
  clientId: string;
  branchId: string;
  areaId: string;
}
