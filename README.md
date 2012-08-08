PersistenceJS Plugin to persiste encrypted data

For PersistenceJs
http://persistencejs.org

For Security:
http://code.google.com/p/crypto-js/

**Encryption/Decryption**

Once library is included, override the `persistence.secure.encrypt` and `persistence.secure.decrypt` to do the actual encryption.

```javascript
var passKey = "1234";
persistence.secure.encrypt = function(type, field, fieldType, value){
	if(fieldType == "TEXT"){
		value = CryptoJS.AES.encrypt( value , passKey ).toString();
	}
	
	return value;
}

persistence.secure.decrypt = function(type, field, fieldType, value){
	if(fieldType == "TEXT"){
		value = CryptoJS.AES.decrypt(value, passKey);
		value = value.toString(CryptoJS.enc.Utf8);
	}
	
	return value;
}
```