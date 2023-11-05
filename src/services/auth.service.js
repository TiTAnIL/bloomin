import { httpService } from "./http.service"

export const authService = {
  login,
  logout,
}

async function login(email, password) {
    console.log('login service', email, password)
    try {
      const response = await httpService.post(`auth/login`, {email, password})
      console.log('response', response)

      if (response.ok) {
        const userData = await response.json();
        console.log('userData', userData)
        return userData
      } 
      if (response.status === 401) {
        console.log('401', response.status)
      } else if (response.status === 500) {
        console.log('500', response.status)
      } else if (response.status > 401 && response.status < 500) {
        console.log('other client-side errors', response.status)
      } else if (response.status === 404) {
        console.log('404', response.status)
     } else {
        console.log(response)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }


async function logout() {
  await httpService.post('auth/logout')
}

