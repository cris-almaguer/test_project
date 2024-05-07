import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData, login, signOut } from './authThunk';
import { AuthPayload, AuthState, User } from '@/types/global';

const initialState: AuthState = {
    accessToken: null,
    loading: false,
    userData: {},
    status: 'idle',
    error: ""
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.userData = {};
                state.accessToken = null;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.status = "loading"
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
                const { accessToken, firstName, lastName, email, roles } = action.payload;
                const user: User = { firstName, lastName, email, roles };

                state.accessToken = accessToken;
                state.userData = user;
                state.loading = false;
                state.status = 'succeeded';
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'rejected';
                state.accessToken = null;
                state.userData = {};
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
                const { accessToken, email, firstName, lastName, roles } = action.payload;
                state.accessToken = accessToken;
                state.userData = { email, firstName, lastName, roles };
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.loading = false;
                state.userData = {};
                state.accessToken = null;
            });
    },
});

export const { } = authSlice.actions;

export default authSlice.reducer;
