import jwtDecode, { JwtPayload } from 'jwt-decode';

const JWTManager = () => {
    const LOGOUT_EVENT_NAME = 'jwt-logout';

    // jwt only store in memory of javascript, best way to store jwt to (12/28/2021)
    // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#changelog
    let inMemoryToken: string | null = null;
    let refreshTokenTimeoutId: number | null = null;
    let userId: string | null = null;

    const getToken = () => inMemoryToken;

    const getUserId = () => userId;

    const setToken = (accessToken: string) => {
        inMemoryToken = accessToken;

        // Decode and set countdown to refresh
        const decoded = jwtDecode<
            JwtPayload & {
                userId: string;
                roles: { id: string; name: string }[];
            }
        >(accessToken);
        userId = decoded.userId;
        console.log(decoded);
        setRefreshTokenTimeout(
            (decoded.exp as number) - (decoded.iat as number),
        );

        return true;
    };

    const abortRefreshToken = () => {
        if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
    };

    const deleteToken = () => {
        inMemoryToken = null;
        abortRefreshToken();
        window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());
        return true;
    };

    // To logout all tabs (nullify inMemoryToken)
    if (typeof window !== 'undefined') {
        window.addEventListener('storage', (event) => {
            if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null;
        });
    }

    const getRefreshToken = async () => {
        try {
            const response = await fetch(
                'http://localhost:4000/refresh_token/',
                {
                    credentials: 'include',
                },
            );
            const data = (await response.json()) as {
                success: boolean;
                accessToken: string;
            };

            setToken(data.accessToken);
            return true;
        } catch (error) {
            console.log('UNAUTHENTICATED', error);
            deleteToken();
            return false;
        }
    };

    const setRefreshTokenTimeout = (delay: number) => {
        // 5s before token expires
        refreshTokenTimeoutId = window.setTimeout(
            getRefreshToken,
            delay * 1000 - 5000,
        );
    };

    return { getToken, setToken, getRefreshToken, deleteToken, getUserId };
};

export default JWTManager();
