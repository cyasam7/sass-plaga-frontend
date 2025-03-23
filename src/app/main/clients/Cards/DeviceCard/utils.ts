export const getDeviceTypeLabel = (type: string) => {
  switch (type) {
    case 'trap':
      return 'Trampa';
    case 'bait':
      return 'Cebo';
    case 'monitor':
      return 'Monitor';
    default:
      return 'Otro';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    case 'maintenance':
      return 'warning';
    default:
      return 'default';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'inactive':
      return 'Inactivo';
    case 'maintenance':
      return 'En mantenimiento';
    default:
      return status;
  }
};
