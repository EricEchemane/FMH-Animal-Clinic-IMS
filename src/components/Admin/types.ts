export type Tabs =
	| 'appointments'
	| 'services'
	| 'inventory'
	| 'feedbacks'
	| 'accounts';
export type AppointmentTabs = 'Pending' | 'Done' | 'Cancelled' | 'All';
export type InventoryTabs = 'all' | 'add' | 'archive';
export type FeedbackTabs = 'To Review' | 'Published' | 'All';

export type dateFilters =
	| 'Today'
	| 'Tomorrow'
	| 'This Week'
	| 'Next Week'
	| 'All';
export type ScheduleStatus = 'pending' | 'done' | 'cancelled';
