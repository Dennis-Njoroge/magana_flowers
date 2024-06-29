import { createContext, useEffect, useReducer } from "react";

import PropTypes from "prop-types";
import {AUTH_REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY} from "@/utils/constants";
import {useRouter} from "next/router";
import {authApi} from "@/services/auth-apis";
import {menuItems} from "@/utils/dummy-data/menus";
import {clearLocally, getLocally, saveLocally} from "@/utils/helper-functions";


let ActionType;
(function (ActionType) {
    ActionType["INITIALIZE"] = "INITIALIZE";
    ActionType["GET_MENUS"] = "GET_MENUS";
    ActionType["LOGIN"] = "LOGIN";
    ActionType["LOGOUT"] = "LOGOUT";
})(ActionType || (ActionType = {}));

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    isFetchingMenus: true,
    user: null,
    userMenus: menuItems,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    GET_MENUS: (state, action) => {
        const {isFetchingMenus, userMenus} = action.payload;

        return {
            ...state,
            isFetchingMenus,
            userMenus
        };
    }
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    refreshToken : () => Promise.resolve(),
    logout: () => Promise.resolve(),
    fetchUserMenus: () => Promise.resolve()
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    useEffect(() => {
        const initialize = async () => {

            try {
                const accessToken = getLocally(AUTH_TOKEN_KEY);
                const refreshToken = getLocally(AUTH_REFRESH_TOKEN_KEY);

                if (accessToken) {
                    const decodedToken = await authApi.decodeToken(accessToken);
                    const user = {
                        ...decodedToken,
                        accessToken,
                        refreshToken,
                    }
                    dispatch({
                        type: ActionType.INITIALIZE,
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    });
                   // await fetchUserMenus(user?.userid);
                } else {
                    dispatch({
                        type: ActionType.INITIALIZE,
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (userDetails) => {
        const decodedToken = await authApi.decodeToken(userDetails.token);
        const user = {
            ...decodedToken,
            accessToken: userDetails?.token,
            //refreshToken: userDetails?.refreshToken,
        }

        //save token locally
        saveLocally(AUTH_TOKEN_KEY, userDetails.token )
        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });
        router
            .push("/dashboard")
            .catch(console.error);

        //await fetchUserMenus(user?.userid);
    };



    const refreshToken = async (newToken, newRefreshToken) => {
        const decodedToken = await authApi.decodeToken(newToken);
        const user = {
            ...decodedToken,
            accessToken: newToken,
            refreshToken: newRefreshToken,
        }

        //save token and refresh token locally
        saveLocally(AUTH_TOKEN_KEY, newToken );
        saveLocally(AUTH_REFRESH_TOKEN_KEY, newRefreshToken );

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });


    }

    const logout = async () => {

        //clear token and refresh token locally
        clearLocally(AUTH_TOKEN_KEY);
        clearLocally(AUTH_REFRESH_TOKEN_KEY);

        await dispatch({ type: ActionType.LOGOUT });
        router
            .push({
                pathname: "/",
                query: { returnUrl: router.asPath },
            })
            .catch(console.error);
    };


    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
