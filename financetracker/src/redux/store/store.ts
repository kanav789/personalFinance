import { configureStore } from '@reduxjs/toolkit'
import datareducer from "../feature/dateSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      data: datareducer,
    }
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']