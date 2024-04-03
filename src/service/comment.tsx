    //23. 发表一个评论：POST /comment/make
//24. 查看笔记的评论：POST /comment/view
//25. 删除一个评论：POST /comment/delete

import { request } from "@/.umi/plugin-request"
import { baseUrl } from "./note"
import { CommentReq } from "./entity/request"

export const makeComment = (CommentRequest:CommentReq,username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/comment/make', {method:"POST",data:{...CommentRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const viewComment = (CommentRequest:CommentReq,username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/comment/view', {method:"POST",data:{...CommentRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const deleteComment = (CommentRequest:CommentReq,username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/comment/delete', {method:"POST",data:{...  CommentRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}