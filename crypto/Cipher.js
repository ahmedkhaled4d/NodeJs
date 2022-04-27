const {
    createReadStream,
    createWriteStream,
} = require('fs');

const {
    pipeline
} = require('stream');

const {
    scrypt,
    randomFill,
    createCipheriv,
} = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, 'salt', 24, (err, key) => {
    if (err) throw err;
    // Then, we'll generate a random initialization vector
    randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;

        const cipher = createCipheriv(algorithm, key, iv);

        const input = createReadStream('test.js');
        const output = createWriteStream('test.enc');

        pipeline(input, cipher, output, (err) => {
            if (err) throw err;
        });
    });
});