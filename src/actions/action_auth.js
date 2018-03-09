import authService from '../services/service_auth';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const UPDATE = 'update';

export function login() {
  return {
    type: LOGIN,
    payload: authService.login()
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: authService.logout()
  };
}

export function updateAuthedStatus(user) {
  return {
    type: UPDATE,
    payload: user
  };
}