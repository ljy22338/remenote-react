import { request, useRequest } from 'umi';
import { NoteRequest } from '@/service/entity/request';
import { UserVo } from './entity/response';

// export const baseUrl = "http://100.64.0.1:8080"
export const baseUrl = "http://localhost:8080"
export const defaultoption = { formatResult: (d: any) => d.data }
export const runableoption = { formatResult: (d: any) => d.data, manual: true, throwOnError: true, }


export const allnotes = (username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/allnotes', {
        method: "POST", headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const notebooklist = (username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/notebooklist', {
        method: "GET", headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const notelist = (notebookId: number, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/' + notebookId, {
        method: "GET", headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const notedetailget = (id: number, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/notedetail/' + id, {
        method: "GET", headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const notedetailpost = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/notedetail', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const createnote = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/createnote', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const createnotebook = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/createnotebook', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const deletenote = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/deletenote', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const deletenotebook = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/deletenotebook', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const updatenote = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/updatenote', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}
export const searchnote = (NoteRequest: NoteRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl + '/note/search', {
        method: "POST", data: { ...NoteRequest }, headers: {
            "username": username!,
            "token": token!,
        }
    })
}

