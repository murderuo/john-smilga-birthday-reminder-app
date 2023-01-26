import { configureStore } from '@reduxjs/toolkit';
import users from './userSlice';

export default configureStore({
  reducer: { users },
});
