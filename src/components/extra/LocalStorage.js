export default {
	
}

export const tokenStore = {
	get: () => {
		return localStorage.getItem('Authorization');
	},
	set: (token) => {
		localStorage.setItem('Authorization', token);
	}
}
