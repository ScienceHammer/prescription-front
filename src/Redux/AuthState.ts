import UserModel from "../Models/UserModel";

// Auth State
export class AuthState {
    public user: UserModel;
    public constructor() {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            this.user = storedUser;
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
export function loginAction(user: string): AuthAction {
    return { type: AuthActionType.login, payload: user };
}

export function signUpAction(user: string): AuthAction {
    return { type: AuthActionType.login, payload: user };
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.logout };
}


export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.login:
        case AuthActionType.signup:
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.logout:
            newState.user = null;
            localStorage.removeItem("user");
            break;
    }

    return newState;
}