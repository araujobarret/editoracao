const API_URL = 'https://editoracao.herokuapp.com';

export const USUARIO_LOGIN = `${API_URL}/usuario/login`;
export const USUARIO_CHECK_TOKEN = `${API_URL}/usuario/me`;
export const USUARIO_LOGOUT = `${API_URL}/usuario/logout`;
export const TOKEN_LOCAL_STORAGE = 'editoracao-x-auth';
export const LOGIN_LOCAL_STORAGE = 'editoracao-login';

export const GET_LOCAIS = `${API_URL}/local`;
export const ADD_LOCAL = `${API_URL}/local`;

export const AUTOR = `${API_URL}/autor`;

export const RUBRICA = `${API_URL}/rubrica`;

export const HTTP_HEADER = {
  'Content-Type': 'application/json'
};

export const GET_HTTP_HEADER = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}
