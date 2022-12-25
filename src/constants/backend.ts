export const backendUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:2900'
		: 'https://fmh.onrender.com';
