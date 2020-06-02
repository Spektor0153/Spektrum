import * as axios from "axios";
/*
export const instance= axios.create({
    baseURL: 'http://192.168.1.102:3001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token?`Bearer ${localStorage.token}`:''
    },

})
*/
/*
export const instance2 = (()=> {
    return axios.create({
        baseURL: 'http://192.168.1.102:3001',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
        },

    })
})()*/


export const instance=()=> {
    return axios.create({
        baseURL: 'http://192.168.1.101:3001',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
        },

    })
}

export const instanceMulti= axios.create({
    baseURL: 'http://192.168.1.101:3001',
    headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': localStorage.token?`Bearer ${localStorage.token}`:''
    },

})
console.log(instanceMulti)