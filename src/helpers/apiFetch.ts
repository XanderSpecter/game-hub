const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
});


export const getData = async (url: string, body?: BodyInit) => {
    const options: RequestInit = {
        body,
        headers,
        method: 'GET',
    };

    try {
        const response = await fetch(`http://xspecter.ru/game_hub/api${url}`, options);

        const text = await response.text();
        const responseBody = text ? JSON.parse(text) : text;

        return {
            ...responseBody,
            status: response.status,
            ok: response.ok,
        };
    } catch(e) {
        return {
            status: 500,
            error: e,
        };
    }
};

export const uploadData = async (url: string, body?: BodyInit) => {
    const options: RequestInit = {
        body,
        headers,
        method: 'POST',
    };

    try {
        const response = await fetch(`http://xspecter.ru/game_hub/api${url}`, options);

        const text = await response.text();
        const responseBody = text ? JSON.parse(text) : text;

        return {
            ...responseBody,
            status: response.status,
            ok: response.ok,
        };
    } catch(e) {
        return {
            status: 500,
            error: e,
        };
    }
};
