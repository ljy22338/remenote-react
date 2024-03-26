// public class UserRequest {

//     private String username;

//     private String password;

//     private String token;

//     private String newPassword;
//     private String groupName;
// }
export interface UserRequest {
    username: string;
    password: string;
    newNickname: string;
    token: string;
    newPassword: string;
    groupName: string;
}
// public class NoteRequest {
//     private String noteOwnerName;
//     private Integer delNoteId;

//     private String noteTitle;

//     private String notebookName;
//     private String isPublic;

//     private String content;

//     private String srcNotebook;

//     private String srcTitle;

//     private Boolean move;
// }
export interface NoteRequest {
    noteOwnerName: string;
    delNoteId: number;
    noteTitle: string;
    notebookName: string;
    notebookId:number;
    notebookDescription: string;
    isPublic: string;
    content: string;
    srcNotebook: string;
    srcTitle: string;
    move: boolean;
}
// public class GroupReq {
//     private String groupName;
// }
export interface GroupReq {
    groupName: string;
}
// public class CardRequest {
//     public Integer id;
//     public String front;
//     public String back;
//     public Integer memoryCount;

// }
// public class DeckRequest {
//     private String deckName;
//     private List<CardRequest> cardItems;
//     private String srcNotebook;
//     private String srcNoteTitle;

// }

// public class CommentReq {
//     private String noteOwnerName;
//     private String notebookName;
//     private String noteTitle;
//     private String content;
//     private String createTime;
//     private String publisher;
// }
export interface CommentReq {
    noteOwnerName: string;
    notebookName: string;
    noteTitle: string;
    content: string;
    createTime: string;
    publisher: string;
}
export interface CardRequest {
    id: number;
    front: string;
    back: string;
    memoryCount: number;
}
export interface DeckRequest {
    deckName: string;
    deckId: number;
    cardItems: CardRequest[];
    srcNotebook: string;
    srcNoteTitle: string;
}
