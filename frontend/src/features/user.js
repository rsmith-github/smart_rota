import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
                'Authorization': `Bearer ${getCookie('access_token')}`,
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

// obtain a pair of tokens: an access token and a refresh token using Django REST Framework's TokenObtainPairView
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

            // will look somehing like
            // {
            //     access: '1r2krij42jr9t5434qt',
            //     refresh: '3fje02FJNROUFDAFRGR'
            // }

            if (res.status === 200) {

                setCookie('access_token', data.access, 1);
                setCookie('refresh_token', data.refresh, 0.05);

                const { dispatch } = thunkAPI;

                // if (!user) {
                    dispatch(getUser());
                // }

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

        const accessToken = getCookie("access_token");
        try {
            const res = await fetch('/verify', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
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
        const res = await fetch('/api/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await res.json();

        // Remove access and refresh tokens from cookies
        removeCookie('access_token');
        removeCookie('refresh_token');

        if (res.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function getCookie(cname) {
    const cookies = Object.fromEntries(
        document.cookie.split(/; /).map(c => {
            const [key, v] = c.split('=', 2);
            return [key, decodeURIComponent(v)];
        }),
    );
    return cookies[cname] || '';
}


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

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;


