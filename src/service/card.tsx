import { request } from "umi"
import { baseUrl } from "./note"
import { DeckRequest } from "./entity/request"

export const listDecks = ( username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/card/listDecks', {method:"POST",headers:{
        "username":username!,
        "token":token!,
    }})
}
export const getDeck = (deckRequest:DeckRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/card/getDeck', {method:"POST",data:{...deckRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const searchDeck = (deckRequest:DeckRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/card/search', {method:"POST",data:{...deckRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const saveDeck = (deckRequest:DeckRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/card/saveDeck', {method:"POST",data:{...deckRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const createDeck = (deckRequest:DeckRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/card/createDeck', {method:"POST",data:{...deckRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
export const deleteDeck = (deckRequest:DeckRequest, username?: string, token?: string) => {
    if (username == null || token == null) {
        const user = JSON.parse(localStorage.getItem("user") as string)
        username = user.username
        token = user.token
    }
    return request(baseUrl+'/card/deleteDeck', {method:"POST",data:{...deckRequest},headers:{
        "username":username!,
        "token":token!,
    }})
}
