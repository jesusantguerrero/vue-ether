import { reactive } from "vue";

// auth state
export const AuthState = reactive({
    user: null,
    uid: null,
    settings: {},
    provider: null,
    onLoaded: () => {},
})

export const useEthAuth = (provider?: any) => {
    if (provider) {
        AuthState.provider = provider
    }

    const initAuth = async (authenticatedCallback) => {
        await AuthState.provider?.initAuth()
        
        if (AuthState.provider?.getUser) {
            AuthState.user = AuthState.provider.getUser();
            authenticatedCallback && authenticatedCallback(AuthState.user);
        }
    };
    
    const isAuthenticated = async () => {
        if (!AuthState.user) {
            await new Promise(resolve => initAuth(resolve));
        }
        return AuthState.user;
    }
    
    return {
        isAuthenticated,
        initAuth,
        register: AuthState.provider?.register,
        login: AuthState.provider?.login,
        logout: AuthState.provider?.logout,
        loginWithProvider: AuthState.provider?.loginWithProvider,
        AuthState,
    }
}
