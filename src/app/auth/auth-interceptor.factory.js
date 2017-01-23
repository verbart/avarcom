export default function (AuthToken) {
    function addToken(config) {
        const token = AuthToken.get();

        if (token) {
            config.headers = config.headers || {};
            config.headers.token = token;
        }

        return config;
    }

    return {
        request: addToken
    };
}
