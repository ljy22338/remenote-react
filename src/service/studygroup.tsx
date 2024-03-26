import { request } from "@/.umi/plugin-request"
import { baseUrl } from "./note"
import { GroupReq } from "./entity/request"

export const create = (studyGroupReq:GroupReq,username:string ,token:string) => {
    return request(baseUrl+'/studygroup/create', {method:"POST",data:{...studyGroupReq},headers:{
        "username":username,
        "token":token,
    }})
}
export const find = (studyGroupReq:GroupReq,username:string ,token:string) => {
    return request(baseUrl+'/studygroup/find', {method:"POST",data:{...studyGroupReq},headers:{
        "username":username,
        "token":token,
    }})
}
export const search = (studyGroupReq:GroupReq,username:string ,token:string) => {
    return request(baseUrl+'/studygroup/search', {method:"POST",data:{...studyGroupReq},headers:{
        "username":username,
        "token":token,
    }})
}

