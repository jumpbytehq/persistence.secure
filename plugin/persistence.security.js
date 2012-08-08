var encryptKey = "encrypt - ";
persistence.secure = {};
persistence.secure.encrypt = function(type, field, fieldType, value){
	if(fieldType == "TEXT"){
		value = encryptKey + value;
	}
	
	return value;
}

persistence.secure.decrypt = function(type, field, fieldType, value){
	if(fieldType == "TEXT"){
		value = value.substr(encryptKey.length);
	}
	
	return value;
}

persistence.Observable.prototype.toSecureJSON = function() {
    var json = {id: this.id};
    for(var p in this._data) {
        if(this._data.hasOwnProperty(p)) {
            if (typeof this._data[p] == "object" && this._data[p] != null) {
				if (this._data[p].toJSON != undefined) {
					json[p] = this[p].toJSON();
				}
            } else {
				json[p] = this[p];
            }
        }
    }
    return json;
}

persistence.defineProp = function(scope, field, setterCallback, getterCallback) {
	var fieldMap = persistence.getMeta(scope._type).fields;
	
	scope.__defineSetter__(field, function(value) {
		value = persistence.secure.encrypt(scope._type, field, fieldMap[field], value);
		setterCallback(value);
	});

	scope.__defineGetter__(field, function() {
		var value = getterCallback();
		value = persistence.secure.decrypt(scope._type, field, fieldMap[field], value);
		return value;
	});
}
