const bcrypt = require('bcrypt');
const crypto = require("crypto");

const SALT_ROUNDS = 10;

const hash = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

const verify = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Password verification failed');
    }
};

const generatehash = async (data) => {
    const hash_data = crypto.createHash('sha256').update(data).digest('hex');
    return hash_data;
};

module.exports = {
    hash,
    verify,
    generatehash
};