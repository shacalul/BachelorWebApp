import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
	const user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
};

const saveUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};

const clearLocalStorage = () => {
	localStorage.clear();
};

const initialState = {
	name: 'auth',
	user: getUserFromLocalStorage(),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			const { user } = action.payload;
			saveUserToLocalStorage(user);
			state.user = user;
		},
		logout: (state) => {
			clearLocalStorage();
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
