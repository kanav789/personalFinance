import { createSlice } from "@reduxjs/toolkit";
interface User {
    id: string;
    email: string;
    name: string;
    image?: string;

}


const initialState = {
    user: null as User | null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true

        },
        clearUser: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }

})

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;