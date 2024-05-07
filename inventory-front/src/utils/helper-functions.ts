export const removeToken = (): void => {
    localStorage.removeItem('accessToken');
}

export const setToken = (value: string): void => {
    localStorage.setItem('accessToken', value);
}

export const getToken = () => localStorage.getItem('accessToken');