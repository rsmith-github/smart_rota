import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const register = createAsyncThunk(
    "main/register",
    async ({ username, email, employer_code, password, user_type }, thunkAPI) => {
        const body = JSON.stringify({
            username,
            email,
            employer_code,
            password,
            user_type,
        });

        // Parse the JSON string back into an object
        const parsedBody = JSON.parse(body);

        try {
            let res;
            if (parsedBody.user_type === "Employee") {
                res = await fetch("register-employee", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body,
                });
            } else if (parsedBody.user_type === "Manager") {
                res = await fetch("register-employer", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body,
                });
            }

            const data = await res.json();

            if (res.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
    try {
        const res = await fetch('/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        const data = await res.json();

        if (res.status === 200) {
            // const { username } = data;
            // return { user: data, username };
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const login = createAsyncThunk(
    'main/login',
    async ({ username, password }, thunkAPI) => {

        const body = JSON.stringify({
            username,
            password,
        });

        try {
            const res = await fetch('/api/token/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            });

            const data = await res.json();

            if (res.status === 200) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                const { dispatch } = thunkAPI;

                dispatch(getUser());

                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'users/verify',
    async (_, thunkAPI) => {

        const token = localStorage.getItem("access_token");
        try {
            const res = await fetch('/verify', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            const data = await res.json();

            if (res.status === 200) {
                const { dispatch } = thunkAPI;

                dispatch(getUser());

                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);



export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
    try {
        const res = await fetch('/api/users/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await res.json();

        if (res.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
            })
            .addCase(register.fulfilled, state => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, state => {
                state.loading = false;
            })
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, state => {
                state.loading = false;
            })
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log("Payload: ", action.payload);
                state.username = action.payload.username;
            })
            .addCase(getUser.rejected, state => {
                state.loading = false;
            })
            .addCase(checkAuth.pending, state => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, state => {
                state.loading = false;
            })
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, state => {
                state.loading = false;
            });
    },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;