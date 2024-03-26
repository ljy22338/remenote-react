import { request } from "@/.umi/plugin-request"
import { baseUrl } from "./note"
import { UserRequest } from "./entity/request"
import { UserVo } from "./entity/response"

export const login = (userReq:UserRequest) => {
    return request(baseUrl+'/user/login', {method:"POST",data:{...userReq}})
}
export const validate = (username?:string ,token?:string) => {
    if(username==null||token==null){
        const user=JSON.parse(localStorage.getItem("user") as string) as UserVo
        username=user.username
        token=user.token
        console.log(username,token)
    }
    return request(baseUrl+'/user/validate', {method:"POST",headers:{
        "username":username!,
        "token":token!,
    }})
}
export const register = (userReq:UserRequest) => {
    return request(baseUrl+'/user/register', {method:"POST",data:{...userReq}})
}
export const changeNick = (userReq:UserRequest,username?:string ,token?:string) => {
    if(username==null||token==null){
        const user=JSON.parse(localStorage.getItem("user") as string) as UserVo
        username=user.username
        token=user.token
        console.log(username,token)
    }
    return request(baseUrl+'/user/changeNick', {method:"POST",data:{...userReq},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const changePass = (userReq:UserRequest,username?:string ,token?:string) => {
    if(username==null||token==null){
        const user=JSON.parse(localStorage.getItem("user") as string) as UserVo
        username=user.username
        token=user.token
        console.log(username,token)
    }
    return request(baseUrl+'/user/changePass', {method:"POST",data:{...userReq},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const logout = (username?:string ,token?:string) => {
    if(username==null||token==null){
        const user=JSON.parse(localStorage.getItem("user") as string) as UserVo
        username=user.username
        token=user.token
        console.log(username,token)
    }
    return request(baseUrl+'/user/logout', {method:"POST",headers:{
        "username":username!,
        "token":token!,
    }})
}
export const joingroup = (userReq:UserRequest,username?:string ,token?:string) => {
    if(username==null||token==null){
        const user=JSON.parse(localStorage.getItem("user") as string) as UserVo
        username=user.username
        token=user.token
        console.log(username,token)
    }
    return request(baseUrl+'/user/joingroup', {method:"POST",data:{...userReq},headers:{
        "username":username!,
        "token":token!,
    }})
}
