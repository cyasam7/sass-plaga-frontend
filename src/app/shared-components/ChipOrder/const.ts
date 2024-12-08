export const statusLabel = {
	CREATED: 'Creada',
	ASSIGNED: 'Asignada',
	IN_REVIEW: 'En revision',
	REVIEWED: 'Revisada',
	IN_PROGRESS: 'En progreso',
	DONE: 'Hecha',
	FINISHED: 'Terminada',
	CANCELED: 'Cancelada'
};

export type StatusOrderColors = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export const statusColor: Record<string, StatusOrderColors> = {
	CREATED: 'default',
	ASSIGNED: 'primary',
	IN_REVIEW: 'secondary',
	REVIEWED: 'secondary',
	IN_PROGRESS: 'warning',
	DONE: 'info',
	FINISHED: 'success',
	CANCELED: 'error'
};
