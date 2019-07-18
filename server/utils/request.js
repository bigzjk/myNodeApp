const axios = require('axios')
const { userAgent } = require('./userAgent')
module.exports = (opt) =>{
    let paramsInfo = {
        baseURL: 'https://api.zhuishushenqi.com/',
        method: opt.type || 'get',
        url: opt.url,
        headers: {
            'User-Agent': userAgent()
        }
    }
    if (paramsInfo.type == 'get'){
        paramsInfo.params = opt.data
    } else {
        paramsInfo.data = opt.data
    }
    paramsInfo = {
        ...paramsInfo,
        ...opt
    }

    return axios(paramsInfo)
}