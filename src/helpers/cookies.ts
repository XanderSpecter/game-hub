export function setCookie(name: string, value: string, expiresHours: number) {
    const date = new Date();
    let cookieExpires = date.toUTCString();

    date.setTime(date.getTime() + expiresHours * 60 * 60 * 1000);
    const expiresDate = date;

    if (expiresDate && expiresDate.toUTCString) {
        cookieExpires = expiresDate.toUTCString();
    }

    const cookieValue = encodeURIComponent(value);

    const updatedCookie = `${name}=${cookieValue}; expires=${cookieExpires}; path=/`;

    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const regex = new RegExp(
        `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    );
    const matches = regex.exec(document.cookie);

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, '', -1);
}
