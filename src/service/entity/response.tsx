// public class UserVo {

//     private String username;
//     private String groupName;
//     private String token;
// }
export interface UserVo {
    username: string;
    groupName: string;
    nickname: string;
    token: string;
}
// public class StudyGroupVo {
//     public String studyGroupName;
//     public List<NoteVo> notes;
//     public List<DeckVo> decks;
// }
export interface StudyGroupVo {
    studyGroupName: string;
    notes: NoteVo[];
    decks: DeckVo[];
}
// public class NoteVo {
//     public String username;
//     public Integer id;
//     public String notebookName;
//     public String title;
//     public String content;
//     public Boolean isPublic;

//     public static NoteVo fromNoteDo(NoteDo note) {
//         return new NoteVo().setTitle(note.getNoteTitle())
//                 .setId(note.getId())
//                 .setContent(note.getNoteContent())
//                 .setIsPublic(true).setNotebookName(note.getNotebook())
//                 .setUsername(note.getUsername());
//     }

//     public static List<NoteVo> fromNoteDoList(List<NoteDo> noteDoList) {
//         List<NoteVo> noteVos = new ArrayList<>();
//         for (NoteDo noteDo : noteDoList) {
//             noteVos.add(NoteVo.fromNoteDo(noteDo));
//         }
//         return noteVos;
//     }
// }
export interface NoteVo {
    username: string;
    id: number;
    notebookName: string;
    title: string;
    content: string;
    isPublic: boolean;
}
// public class NotebookVo {
//     public String notebookName;
//     public List<NoteVo> noteList;
// }
// public class NotebookListVo {
//     public List<NotebookVo> notebookList;
// }
export interface NotebookVo {
    // private Integer notebookId;
    // public String notebookName;
    // public String description;
    notebookId: number;
    notebookName: string;
    description: string;

}

export interface NotebookListVo {
    notebookList: NotebookVo[];
}
// public class DeckVo {
//     public String deckName;
//     public List<CardVo> cardList;
// }

export interface DeckVo {
    deckName: string;
    deckId: number;
    cardList: CardVo[];
}
// public class CardVo {
//     public Integer id;
//     public String deckName;
//     public String front;
//     public String back;
//     public Integer memoryCount;

//     public static CardVo fromCardDo(CardDo cardDo) {
//         return new CardVo().setId(cardDo.getId())
//                           .setDeckName(cardDo.getDeckName())
//                           .setFront(cardDo.getFront())
//                           .setBack(cardDo.getBack())
//                           .setMemoryCount(cardDo.getMemoryCount());
//     }

// }
export interface CardVo {
    id: number;
    deckName: string;
    front: string;
    back: string;
    memoryCount: number;
}
// public class CommentVo {
//     private String publisher;
//     private String commentContent;
//     private String createTime;
// }
export interface CommentVo {
    publisher: string;
    commentContent: string;
    createTime: string;
}
// public class CommentSectionVo {
//     private String notebookName ;
//     private String noteTitle;
//     private List<CommentVo> commentList;
// }
export interface CommentSectionVo {
    notebookName: string;
    noteTitle: string;
    commentList: CommentVo[];
}
