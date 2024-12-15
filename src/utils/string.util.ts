// Custom ID implementation
export const createId = () => {
    const timestamp = Date.now().toString(36);
    const randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomPart = '';
    for (let i = 0; i < 5; i++) {
        randomPart += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return `${timestamp}${randomPart}`;
}

export const isValidId = (id: string) => {
    if (id.length <= 5) return false;

    const timestampPart = id.slice(0, id.length - 5);
    const randomPart = id.slice(id.length - 5);
    const timestampRegex = /^[0-9a-z]+$/;
    const randomPartRegex = /^[a-z0-9]{5}$/;

    return timestampRegex.test(timestampPart) && randomPartRegex.test(randomPart);
}
