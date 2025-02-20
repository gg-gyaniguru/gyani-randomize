const getRandomBytes = (length) => {
    if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.getRandomValues) {
        throw new Error('Cryptographically secure random number generator is not available.');
    }

    const bytes = new Uint8Array(length);
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
}

const randomize = (size = 21, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_') => {

    const alphabetLength = alphabet.length;

    if (alphabetLength === 0 || alphabetLength > 256) {
        throw new Error('Alphabet must contain between 1 and 256 characters.');
    }

    if (alphabetLength === 1) {
        return Array.from({length: size}, () => alphabet[0]).join('');
    }

    const mask = (1 << (32 - Math.clz32(alphabetLength - 1))) - 1;
    let id = '';
    let bytes = getRandomBytes(size * 2);
    let i = 0;

    while (id.length < size) {
        if (i >= bytes.length) {
            bytes = getRandomBytes(size * 2);
            i = 0;
        }
        const byte = bytes[i++];
        const index = byte & mask;
        if (index < alphabetLength) {
            id += alphabet[index];
        }
    }

    return id;
}

export default randomize;