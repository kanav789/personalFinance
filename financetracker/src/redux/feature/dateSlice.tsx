import { createSlice } from "@reduxjs/toolkit";
interface DataState {
    items: any[];
}
const initialState: DataState = {
    items: []

}
export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.items = action.payload

        }
    }
})

export const { setData } = dataSlice.actions;
export default dataSlice.reducer