import { configureStore } from '@reduxjs/toolkit'
import datareducer from "../feature/dateSlice"
import authreducer from '../feature/authSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      data: datareducer,
      auth: authreducer
    }
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']