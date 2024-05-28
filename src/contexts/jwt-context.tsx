import React, {createContext, useReducer, useEffect, useCallback} from 'react';
import type { FC, ReactNode } from 'react';
import { User } from '../types/User';
import { usersApi } from '../api/users-api';

interface State {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
}

type InitializeAction = {
  type: ActionType.INITIALIZE,
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  }
}

type LoginAction = {
  type: ActionType.LOGIN,
  payload: {
    user: User;
  }
}

type Action = InitializeAction | LoginAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
}

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextValue extends State {
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize =useCallback(()=>{
    const accessToken = globalThis.localStorage.getItem('ACCESS_TOKEN')

    if (accessToken){
        dispatch({
            type:ActionType.INITIALIZE,
            payload:{
                isAuthenticated:true,
                user:null,
            }
        })
    } else {
        dispatch({
            type:ActionType.INITIALIZE,
            payload:{
                isAuthenticated:false,
                user:null,
            }
        })
    }
  },[dispatch]);

  useEffect(()=>{
    initialize();
  },[])

  const login = useCallback(async (email:string,password:string) : Promise<void>=>{
    const userResponse = await usersApi.login(email,password) 
    const userProfile = await usersApi.getUserWithSession(userResponse.access_token)

    globalThis.localStorage.setItem('ACCESS_TOKEN', userResponse.access_token)

    dispatch({
        type:ActionType.LOGIN,
        payload:{
            user:userProfile,
        }
    })
  },[dispatch]);

  return(
    <AuthContext.Provider value={{...state,login}}>
        {children}
    </AuthContext.Provider>
  );


};

export const AuthConsumer = AuthContext.Consumer;
