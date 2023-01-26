import { createSlice } from '@reduxjs/toolkit';
import data from '../Data/data';

export const userSlice = createSlice({
  name: 'users',
  initialState: [...data],
  reducers: {
    addUser: (state, action) => {
      state.push({
        ...action.payload,
        image: data.reduce((acc, item) => [...acc, item.image], [])[
          Math.floor(Math.random() * 5)
        ],
      });
    },
    deleteUser: (state, action) => {
      return state.filter(user => {
        if (user.id !== action.payload) {
          return user;
        }
      });
    },
    doneUser: (state, action) => {
      return state.map(user => {
        if (user.id === action.payload) {
          return { ...user, done: true };
        }
        return user;
      });
    },
    unDoneUser: (state, action) => {
      return state.map(user => {
        if (user.id === action.payload) {
          return { ...user, done: false };
        }
        return user;
      });
    },
    clearAllUsers: (state,action) => {
      return state=[]
    },
  },
});

export const { addUser, deleteUser, doneUser, clearAllUsers, unDoneUser } =
  userSlice.actions;

export default userSlice.reducer;
