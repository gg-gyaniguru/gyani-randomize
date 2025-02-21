const randomize = (length = 30, characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {

    const charLength = characters.length;

    const randomValues = new Uint8Array(length);

    crypto.getRandomValues(randomValues);

    return Array.from(randomValues, (val) => characters[val % charLength]).join('');
}

export default randomize;