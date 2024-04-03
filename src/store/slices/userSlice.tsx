import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    title: "",
    username:"",
    token: "",
    nickname: "",
    groupName: "",
    isLogin: false,
    mode: "light",
  },
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    changeToken: (state, action) => {
      state.token = action.payload;
    },
    changeIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    changeNickname: (state, action) => {
      state.nickname = action.payload;
    },
    changeGroupName: (state, action) => {
      state.groupName = action.payload;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    }
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {changeTitle,changeToken,changeUsername ,changeIsLogin,changeNickname,changeGroupName,changeMode} = counterSlice.actions;

export default counterSlice.reducer;

