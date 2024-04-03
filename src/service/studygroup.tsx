import { request } from "@/.umi/plugin-request"
import { baseUrl } from "./note"
import { GroupReq } from "./entity/request"

export const findall = (username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/studygroup/all', {method:"POST",headers:{
        "username":username!,
        "token":token!,
    }})
}
export const findgroupnote = (username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/studygroup/findgroupnote', {method:"POST",headers:{
        "username":username!,
        "token":token!,
    }})
}

export const creategroup = (studyGroupReq:GroupReq,username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/studygroup/create', {method:"POST",data:{...studyGroupReq},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const findgroup = (studyGroupReq:GroupReq,username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/studygroup/find', {method:"POST",data:{...studyGroupReq},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const searchgroup = (studyGroupReq:GroupReq,username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/studygroup/search', {method:"POST",data:{...studyGroupReq},headers:{
        "username":username!,
        "token":token!,
    }})
}

