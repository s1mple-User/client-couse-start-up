import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	checkAuth,
	login,
	logout,
	register,
} from './user.action';
import { InterfaceEmailAndPassword, UserIntialStateType } from './user.interface';

const initialState: UserIntialStateType = {
	user: null,
	isLoading: false,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		pendingRegister: (state, action: PayloadAction<InterfaceEmailAndPassword>) => {
			state.user = {
				email: action.payload.email,
				password: action.payload.password,
			};
		},
		clearError: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload.user;
				state.error = null;
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.user = null;
				state.error = payload;
			})
			.addCase(login.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload.user;
				state.error = null;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.user = null;
				state.error = payload;
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user;
			});
	},
});

export const userReducer = userSlice.reducer;
export const userSliceAction = userSlice.actions;