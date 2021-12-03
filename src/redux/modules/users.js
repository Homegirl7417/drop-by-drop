// actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

//action creators
function setLogIn(id) {
    return {
      type: LOG_IN,
      id: id
    };
}

function logOut() {
    return {
      type: LOG_OUT
    };
}

function login(id) {
    return dispatch => {
        dispatch(setLogIn(id));
    };
}
  
function logout() {
    return dispatch => {
        dispatch(logOut());
    }
}

const isLogin = (id) => {
    return dispatch => {
        if (id !== '') dispatch(setLogIn(id));
    }
};
  

// initial state
const initialState = {
    isLoggedIn: false,
    id: '',
};

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
      case LOG_IN:
        return applyLogIn(state, action);
      case LOG_OUT:
        return applyLogOut(state, action);
      default:
        return state;
    }
}

function applyLogIn(state, action) {
    const { id } = action;
    sessionStorage.setItem('id', id);
    return {
        ...state,
        isLoggedIn: true,
        id: id
    };
}

function applyLogOut(state, action) {
    sessionStorage.removeItem('id');
    return {
        isLoggedIn: false,
        id: ''
    };
}

//exports
const actionCreators = {
    login,
    logout,
    isLogin
};
export { actionCreators };
  
//reducer exports
export default reducer;