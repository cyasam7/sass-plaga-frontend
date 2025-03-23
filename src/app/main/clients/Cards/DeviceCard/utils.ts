import { StatusDevice, TypeDevice } from '../../types';

export const getDeviceTypeLabel = (type: TypeDevice) => {
  switch (type) {
    case TypeDevice.RODENTS:
      return 'Roedores';
    case TypeDevice.CRAWLING:
      return 'Rastreros';
    case TypeDevice.FLYERS:
      return 'Voladores';
    default:
      return 'Desconocido';
  }
};

export const getStatusColor = (status: StatusDevice) => {
  switch (status) {
    case StatusDevice.ENABLED:
      return 'success';
    case StatusDevice.DISABLED:
      return 'error';
    case StatusDevice.MAINTENANCE:
      return 'warning';
    default:
      return 'default';
  }
};

export const getStatusLabel = (status: StatusDevice) => {
  switch (status) {
    case StatusDevice.ENABLED:
      return 'Activo';
    case StatusDevice.DISABLED:
      return 'Inactivo';
    case StatusDevice.MAINTENANCE:
      return 'En mantenimiento';
    default:
      return status;
  }
};
