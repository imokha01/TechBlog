import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import {persistReducer} from 'redux-persist' 
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import themeReducer from './theme/themeSlice.js'


//! Combines all reducers into a single root reducer. This root reducer will manage the state of the user and theme slices.
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});


//! Configured the Persisted Reducer to persist state across sessions.
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}


//! Created a Persisted Reducer to persist state across sessions by storing the combined rootReducer object in the storage key in persistConfig object.
const persistedReducer = persistReducer(persistConfig, rootReducer);

//! Creates a Redux store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,}),
});


//! Exports the store and persistor for use in the app.
export const persistor = persistStore(store);