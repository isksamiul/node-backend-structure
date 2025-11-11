const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-secret-key', 'salt', 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return Buffer.from(iv.toString('hex') + ':' + encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

const decrypt = (encryptedData) => {
  try {
    const textParts = encryptedData.toString().split(':');
    const ivFromData = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = textParts.join(':');
    const decipher = crypto.createDecipheriv(algorithm, key, ivFromData);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData;
  }
};

module.exports = {
  encrypt,
  decrypt
};
