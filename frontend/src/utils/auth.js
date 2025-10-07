
export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!getToken();
}

export function authHeaders() {
  const token = getToken();
  return token ? { 'Content-Type': 'application/json', 'jwt_token': token } : { 'Content-Type': 'application/json' };
}
