
// Auth State
export class AuthState {
    public token: string;
    public constructor() {
        const storedToken = JSON.parse(sessionStorage.getItem("token"));
        if (storedToken) {
            this.token = storedToken;
        }
    }
}

// ----------------------------------------------------------

// Auth Action Types:
export enum AuthActionType {
    login = "login",
    signup = "signup",
    logout = "logout"
}

// -----------------------------------------------------------

// Auth Action - an object that holding the action data
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// --------------------------------------------------------------

// Auth Action Creators: functions which takes payload and action type and returns the action object
export function loginAction(token: string): AuthAction {
    return { type: AuthActionType.login, payload: token };
}

export function signUpAction(token: string): AuthAction {
    return { type: AuthActionType.login, payload: token };
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.logout };
}


export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.login:
        case AuthActionType.signup:
            newState.token = action.payload;
            sessionStorage.setItem("token", JSON.stringify(newState.token));
            break;
        case AuthActionType.logout:
            newState.token = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;
}