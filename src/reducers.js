// reducers.js

const initialState = {
    loggedIn: false,
    name: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          loggedIn: true,
          name: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          loggedIn: false,
          name: '',
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  