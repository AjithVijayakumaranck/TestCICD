const Crypto = require('crypto-js');


const Encrypt = async (string) => {

    const Secretkey = await 10000 + Math.floor(Math.random() * 10000000)
    const Encrypt = await Crypto.AES.encrypt(JSON.stringify(string), JSON.stringify(Secretkey)).toString()
    return ({ Encrypt, Secretkey })
}

const Decrypt = async (encryptedString, secretKey) => {

    const bytes = await Crypto.AES.decrypt(encryptedString, JSON.stringify(secretKey))
    const decrypted = await bytes.toString(Crypto.enc.Utf8)
    return decrypted;

}


module.exports = { Encrypt, Decrypt }





