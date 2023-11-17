import { authService } from '../../services/auth.service'

// export const loginSuccess = () => {
//   console.log('loginSuccess user')
//   return { type: 'LOGIN_SUCCESS' }
// }

// export const logout = () => {
//   return { type: 'LOGOUT' }
// }

// export const loginFail = (error) => {
//   console.log('loginFail error', error)
//   return { type: 'LOGIN_FAIL', error }
// }

export async function signIn(email, password) {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      await authService.login(email, password)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      console.log('Cannot login', err)
      dispatch({ type: 'LOGIN_FAIL', payload: err.message });
      throw err
    }
  }
}

export function signOut() {
  return async (dispatch) => {
    try {
      await authService.logout()
      dispatch({ type: 'SET_USER', user: null })
      localStorage.removeItem('token');
    } catch (err) {
      console.log('Cannot logout', err)
      throw err
    }
  }
}