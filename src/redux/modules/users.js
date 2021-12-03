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

function login() {
    // Test 코드
    return dispatch => {
        dispatch(setLogIn());
    }
    // API 연결 코드
    // return dispatch => {
    //   return fetch(
    //     `${JSON.parse(process.env.REACT_APP_FRONTEND_ENVIRONMENTS).backendApiUrl}/auth/v0`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email,
    //         password,
    //       }),
    //     }
    //   )
    //     .then(res => {
    //       myconsole(`redux login res.status: ${res.status}`);
    //       if (res.status === 401) {
    //         return Promise.all([null, res]);
    //       } else {
    //         return Promise.all([res.json(), res]);
    //       }
    //     })
    //     .then(values => {
    //       const [json, res] = values;
    //       myconsole(`redux login json: ${JSON.stringify(json)}`);
    //       if (res.status === 201) {
    //         //로그인 성공, 미인증 유저도 201이 뜬다.
    //         dispatch(setLogIn(json.accessToken, json.refreshToken));
    //         return json.accessToken;
    //       } else if (res.status === 401) {
    //         alert(i18next.t('SERVER_UNEXPECTED_ERROR'));
    //         return false;
    //       } else if (json.message) {
    //         //이메일 로그인 400 Bad Request
    //         if (json.code === 57 && history) {
    //           // 이메일 미인증 사용자
    //           history.push({
    //             pathname: '/auth/emailvalid',
    //             state: { email: email },
    //           });
    //           return false;
    //         } else {
    //           alert(json.message);
    //           return false;
    //         }
    //       } else {
    //         //json.message가 없는 경우
    //         alert(i18next.t('SERVER_MESSAGE_MISSING_ERROR'));
    //         return false;
    //       }
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       alert(i18next.t('FRONT_UNEXPECTED_ERROR'));
    //       return false;
    //     });
    // };
}
  
function logout() {
    // Test 코드
    return dispatch => {
        dispatch(logOut());
    }
    // API 연결 코드
    // return dispatch => {
    //   return fetch(
    //     `${JSON.parse(process.env.REACT_APP_FRONTEND_ENVIRONMENTS).backendApiUrl}/auth/v0`,
    //     {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    //       },
    //     }
    //   )
    //     .then(res => {
    //       myconsole(`redux logout res.status: ${res.status}`);
    //       if (res.status === 401 || res.status === 204) {
    //         return Promise.all([null, res]);
    //       } else {
    //         return Promise.all([res.json(), res]);
    //       }
    //     })
    //     .then(values => {
    //       const [json, res] = values;
    //       myconsole(`redux logout json: ${JSON.stringify(json)}`);
    //       if (res.status === 204) {
    //         //204 No Content 로그아웃 성공
    //         dispatch(logOut());
    //       } else if (res.status === 401) {
    //         //401 Unauthorized 로그아웃 후 로그인 페이지로 이동
    //         alert(i18next.t('SERVER_UNEXPECTED_ERROR'));
    //         dispatch(logOut());
    //       } else if (res.status === 404) {
    //         //404 Not Found 에러 메세지 있음. 현재 엑세스 토큰에 대응되는 재발급 토큰이 존재하지 않는 경우(사용자가 이미 로그아웃한 경우)
    //         alert(json.message);
    //         dispatch(logOut());
    //       } else if (json.message) {
    //         alert(json.message);
    //       } else {
    //         //500번대인데 에러 핸들링이 안된경우, 에러 메세지가 없는 경우
    //         alert(i18next.t('SERVER_MESSAGE_MISSING_ERROR'));
    //       }
    //       return res.status;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       alert(i18next.t('FRONT_UNEXPECTED_ERROR'));
    //     });
    // };
}

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
    return {
        ...state,
        isLoggedIn: true,
        id: id
    };
}

function applyLogOut(state, action) {
    return {
        isLoggedIn: false,
        id: ''
    };
}

//exports
const actionCreators = {
    login,
    logout
};
export { actionCreators };
  
//reducer exports
export default reducer;