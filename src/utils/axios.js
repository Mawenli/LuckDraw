import axios from "axios";
// axios.defaults.baseURL = 'http://activity-api.tdahai.com';
export const httpPost = (url, data = {}) => {
    return axios
        .post(url, data)
        .then(res => {
            return res
        })
        .catch(function (e) {
            Message.error('网络错误,请重试')
        })
}
export const httpGet = (url) => {
    return axios
        .get(url)
        .then(res => {
            return res
        })
        .catch(function (e) {
            Message.error('网络错误,请重试')
        })
}