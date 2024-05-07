import api from '@/services/api';
import { LoginCredentials } from '@/types/global';
import { getToken, removeToken, setToken } from '@/utils/helper-functions';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { rejectWithValue }) => {
    try {
        const accessToken = getToken();
        if (!accessToken || accessToken.split('.').length !== 3) {
            return rejectWithValue('Invalid token');
        }
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        const response = await api.get('auth/user');
        return { ...response.data, accessToken };
    } catch (e) {
        removeToken();
        return rejectWithValue('');
    }
});

export const login = createAsyncThunk('auth/login', async (payload: LoginCredentials, { rejectWithValue }) => {
    try {
        const response = await api.post('auth/authenticate', payload);
        if (response && response.status === axios.HttpStatusCode.Forbidden) {
            return rejectWithValue('Invalid username or password');
        }
        setToken(response.data.accessToken);
        return response.data;
    } catch (error) {
        return rejectWithValue('An error occurred during login');
    }
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    removeToken();
});