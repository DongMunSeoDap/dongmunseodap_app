import { createClient } from 'urql';

export const urqlClient = createClient({
    url: 'http://192.168.33.140:8080/',
    fetchOptions: {
        credentials: 'include',
    },
});
