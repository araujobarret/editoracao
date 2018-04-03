const API_URL = 'https://editoracao.herokuapp.com';

export const USUARIO_LOGIN = `${API_URL}/usuario/login`;
export const USUARIO_CHECK_TOKEN = `${API_URL}/usuario/me`;
export const USUARIO_LOGOUT = `${API_URL}/usuario/logout`;
export const TOKEN_LOCAL_STORAGE = 'editoracao-x-auth';
export const LOGIN_LOCAL_STORAGE = 'editoracao-login';

export const HTTP_HEADER = {
  'Content-Type': 'application/json'
};
