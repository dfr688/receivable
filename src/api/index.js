import Axios from 'axios'

// 封装post请求 封装get请求
	const host = "https://www.51jikeyou.com:8888";
	// const host = "http://192.168.90.41:8091";
	export default{
		ajaxReq(reqUrl,data,type="get",token="") {
			 reqUrl = host + reqUrl;
				if(type == "post"){
					return new Promise((resolve,reject) => {
						Axios.post(reqUrl,data,{
							headers: {
							   "token":token,  //token从缓存获取
							   "Content-Type": "application/x-www-form-urlencoded"
							}
						}).then(res => {
							resolve(res.data);
							// console.log(res);
						}).catch(err =>{
							reject(err);
						})
					})
				}else if(type == "get"){
					// console.log(token);
					return new Promise((resolve,reject) => {
						// 拼接url
						let url = reqUrl + "?";
						Object.keys(data).forEach(function(key){
							url = url + key + "=" + data[key] + "&";
						});
						url = url.substring(0,url.length-1);
						// console.log(url);
						Axios.get(url,{
							headers: {
							   "token":token  //token从缓存获取
							}
						})
						.then(res => {
							resolve(res.data);
							// console.log(res);
						})
						.catch(err => {
							reject(err);
							// console.log(err);
						});
					})
				}
		}
	}
