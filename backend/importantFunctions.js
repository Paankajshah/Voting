// var str = "pankaj@gmail.com"
// const index = str.indexOf("@");
// const string = str.slice(0, index)
// const a = (Math.floor((Math.random() * 100000) )).toString()
// const final = string.concat(a)
// console.log(final)


var CryptoJS = require("crypto-js");
 
var ciphertext = CryptoJS.AES.encrypt('message', 'secret key 123').toString();
console.log(ciphertext)


var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(originalText);