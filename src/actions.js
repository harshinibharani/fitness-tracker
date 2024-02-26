// actions.js

export const login = (name) => ({
    type: 'LOGIN',
    payload: name,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  