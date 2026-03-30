export interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    login: {
        uuid: string;
    };
    phone: string;
    location: {
        state: string;
        city: string;
    };
    picture: {
        thumbnail: string;
        large: string;
    };
    registered: {
        date: string;
    };
}