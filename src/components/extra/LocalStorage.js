export default {
	
}

export const tokenStore = {
	get: () => {
		return localStorage.getItem('validator');
	},
	set: (token) => {
		localStorage.setItem('validator', token);
	}
}
