
export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 20 minutes
    date.setTime(date.getTime() + (20 * 60 * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) {
        const ppop = parts.pop();
        if (ppop) {
            return ppop.split(";").shift();
        }
    }
}

export function deleteCookie(name: string) {
    const date = new Date();

    // Set it to expire in the past (1 day ago)
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set the cookie with an expired date
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
