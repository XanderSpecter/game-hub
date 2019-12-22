import { User } from '../models/User';

const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
});

interface ResultStatus {
    success: boolean;
}

interface GetResult<T> {
    data?: T;
    status: number;
    error?: string;
}

interface PostResult {
    status: number;
    success?: boolean;
    error?: string;
}

interface UserResult {
    status: number;
    user?: User;
    error?: string;
}

export const getData = async <T>(url: string) => {
    const options: RequestInit = {
        headers,
        method: 'GET',
    };

    try {
        const response = await fetch(`./api${url}`, options);

        const text = await response.text();
        const data: T = JSON.parse(text);
        const {status} = response;

        const result: GetResult<T> = {
            status,
            data,
        };

        return result;
    } catch(e) {
        return {
            status: 500,
            error: 'Ошибка загрузки данных',
        } as GetResult<T>;
    }
};

export const uploadData = async (url: string, body?: BodyInit) => {
    const options: RequestInit = {
        body,
        headers,
        method: 'POST',
    };

    try {
        const response = await fetch(`./api${url}`, options);

        const text = await response.text();
        const data: ResultStatus = JSON.parse(text);
        const {status} = response;

        const result: PostResult = {
            status,
            success: data.success,
        };

        return result;
    } catch(e) {
        return {
            status: 500,
            error: 'Что-то пошло не так',
        } as PostResult;
    }
};

export const authUserById = async (id: string) => {
    const body = new FormData();
    body.append('id', id);
    body.append('type', 'ID');

    const options: RequestInit = {
        headers,
        body,
        method: 'POST',
    };
    try {
        const response = await fetch('./api/users', options);

        const text = await response.text();
        const user: User = JSON.parse(text);
        const {status} = response;

        const result: UserResult = {
            status,
            user,
        };

        return result;
    } catch(e) {
        return {
            status: 500,
            error: 'Что-то пошло не так',
        } as UserResult;
    }
};

export const loginUser = async (body: FormData) => {
    body.append('type', 'NAME');

    const options: RequestInit = {
        headers,
        body,
        method: 'POST',
    };
    try {
        const response = await fetch('./api/users', options);

        const text = await response.text();

        let error: string;

        if (text === 'not found') {
            error = 'Пользователь не найден';
        }

        if (text === 'wrong password') {
            error = 'Не верный пароль';
        }

        if (text === 'user exists') {
            error = 'Пользователь существует';
        }

        let user: User;

        if (!error) {
            user = JSON.parse(text);
        }

        const {status} = response;

        const result: UserResult = {
            status,
            user,
            error,
        };

        return result;
    } catch(e) {
        return {
            status: 500,
            error: 'Что-то пошло не так',
        } as UserResult;
    }
};
