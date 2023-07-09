import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ThemeState {
  Theme_mode: boolean
}

const initialState: ThemeState = {
  Theme_mode: false,
}

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },



    switch_theme: (state) => {
        state.Theme_mode = !state.Theme_mode;
      },
  },
})


// Action creators are generated for each case reducer function
export const { switch_theme } = ThemeSlice.actions

export default ThemeSlice.reducer