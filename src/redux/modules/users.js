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

function login(id, password) {
    return dispatch => {
        return fetch(
          `http://3.139.42.82:8081/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
              pw: password,
            }),
          }
        ).then(res => {
            if (res.status === 200) {
              dispatch(setLogIn(id));
              return true;
            } else {
              return false;
            }
        })
    }
}
  
function logout() {
    return dispatch => {
        return fetch(
          `http://3.139.42.82:8081/logout`,
          {
            method: 'GET'
          }
        ).then(res => {
            if (res.status === 200) {
              dispatch(logOut());
              return true;
            } else {
              return false;
            }
        })
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