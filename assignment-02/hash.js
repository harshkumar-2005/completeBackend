const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function verifyPassword(plainPassword, storedHash) {
    const match = await bcrypt.compare(plainPassword, storedHash);
    return match;
}

module.exports = { hashPassword, verifyPassword };
