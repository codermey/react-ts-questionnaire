import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfoApi, loginPasswordApi, loginCodeApi } from '@/services/api/user'
import type { UserInfo, LoginPasswordParams, LoginCodeParams } from '@/types/user'

interface UserState {
  userInfo: UserInfo | null
}

const initialState: UserState = {
  userInfo: null,
}

export const loginPasswordAction = createAsyncThunk(
  'user/loginPassword',
  async (payload: LoginPasswordParams) => {
    const res = await loginPasswordApi(payload)
    console.log('🚀 ~ loginPasswordAction res:', res)
    return res
  }
)

export const loginCodeAction = createAsyncThunk(
  'user/loginCode',
  async (payload: LoginCodeParams) => {
    const res = await loginCodeApi(payload)
    console.log('🚀 ~ loginCodeAction res:', res)
    return res
  }
)

export const getUserInfoAction = createAsyncThunk<UserInfo>('user/getUserInfo', async () => {
  const res = await getUserInfoApi()
  console.log('🚀 ~ getUserInfoAction ~ res:', res)
  return res
})

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginPasswordAction.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
    builder.addCase(loginCodeAction.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
  },
})

export default userSlice.reducer
