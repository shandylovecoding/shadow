const bcrypt = require("bcrypt");


function hashPassword(password) {
    return new Promise((resolve, reject) => {
        //Generating a salt
        bcrypt.genSalt((err, salt) => {
            if (err) {
                reject(err)
            } else {
                //Hashing the password with a salt and returning the hash
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(hash) 
                })
            }
        })
    })
}

function checkPassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            if(err) {
                reject(err);
            } else {
                resolve(match)
            }
        })
    })
}

module.exports = {
    checkPassword: checkPassword,
    hashPassword: hashPassword
}
