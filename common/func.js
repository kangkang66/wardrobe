
import md5 from "@/common/md5.js"

export const FuckUBitch = (config) => {
	var signParams = {
		params : uni.$u.deepMerge(config.data, config.params),
		unix   : (Number(new Date())).toString(),
		rand   : uni.$u.random(1000, 999999)
	}
	
	var sign = signObject(signParams)
	signParams.sign = md5(sign).toString()
	
	//console.log(sign, signParams.sign)
	return signParams
}

function sorter(inObject) {
	var sortedJson = {};
	var sortedKeys = Object.keys(inObject).sort();
	for (var i = 0; i < sortedKeys.length; i++) {
		sortedJson[sortedKeys[i]] = inObject[sortedKeys[i]]
	}
	return sortedJson;
}


function signObject(sortedParam) {
	sortedParam = sorter(sortedParam)
	var needSignatureStr = "";
	var i = 0;
	var length = Object.keys(sortedParam).length

	for (var key in sortedParam) {
		i++
		var value = sortedParam[key];
		//对象
		if (Object.prototype.toString.call(value) === '[object Object]') {
			value = "{"+signObject(value)+"}"
		}else if (Object.prototype.toString.call(value) === '[object Array]'){
			//数组
			value = "[" + signarray(value) + "]"
		}
		//拼接
		needSignatureStr = needSignatureStr + key + '=' + value;
		if (i < length){
			needSignatureStr = needSignatureStr + '&';
		}
	}
	return needSignatureStr;
}


function signarray(array) {
	var str = ""
	var length = array.length
	for (var vi = 0; vi < length; vi++) {
		var ty = Object.prototype.toString.call(array[vi])

		if (ty === '[object Object]') {
			str = str + "{" + signObject(array[vi]) + "}"
		}else if(ty === '[object Array]'){
			str = str + "[" + signarray(array[vi]) + "]"
		}else{
			str = str + array[vi]
		}

		if (vi < length - 1) {
			str = str + ","
		}
	}
	return str
}