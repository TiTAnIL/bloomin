import { authService } from '../../services/auth.service'

export const loginSuccess = () => {
  console.log('loginSuccess user')
  return { type: 'LOGIN_SUCCESS' }
}

export const logout = () => {
  return { type: 'LOGOUT' }
}

export const loginFail = (error) => {
  console.log('loginFail error', error)
  return { type: 'LOGIN_FAIL', error }
}

export async function signIn(email, password) {
  try {
    await authService.login(email, password)
  } catch (err) {
    console.log('Cannot login', err)
    throw err
  }
}

export function signOut() {
  return async (dispatch) => {
    try {
      await authService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('Cannot logout', err)
      throw err
    }
  }
}