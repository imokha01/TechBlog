import { createSlice } from '@reduxjs/toolkit';

//! Define the initial state of the user slice.  
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

//! Define the user slice and its reducers.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define the actions(i.e functions) that update the user slice state.
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});


//! Export the actions and reducer for the user slice.
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

//! Export the user slice reducer.
export default userSlice.reducer;