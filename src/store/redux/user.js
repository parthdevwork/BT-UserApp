import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    userData:{}
  },
  reducers: {
    initUser: (state, action) => {
      state.data = { ...action.payload.data };
      // if (action.payload.data)
      //   AsyncStorage.setItem("user", JSON.stringify(action.payload.data));
      // else AsyncStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    setUserFromApi: (state, action) => {
      state.userData = { ...action.payload };
  },
  },
});

export const { initUser, setUser,setUserFromApi } = UserSlice.actions;
export default UserSlice.reducer;