export const backendUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:2900'
		: 'https://fmh-clinic-backend-production-7bd7.up.railway.app';
