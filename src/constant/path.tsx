const notebook = "/note/notebook";
const notelist = '/note/notelist';
const notedetail = '/note/notedetail';
const createnote = '/note/build/createnote';
const createnotebook = '/note/build/createnotebook';
export const getnotedetailpath = (id?: number) => {
    return notedetail + "/" + String(id);
}

const rememberCard = '/card/remembercard';
const carddetail = '/card/carddetail';
const createcard = '/card/build/createcard';
const genecard = '/card/build/genecard';
const choosenote2card = '/card/build/choosenote';

const studyGroup = '/studygroup/studygroup';
const displaynote = '/studygroup/display/note';
const displaycard = '/studygroup/display/card';
const displaymindmap = '/studygroup/display/mindmap';
const pubmanager = '/studygroup/pubmanager';
const groupmanager = '/studygroup/groupmanager';
const joingroup = '/studygroup/joingroup';

const my = '/my/my';
const changenickn = '/my/changenickn';
const changepwd = '/my/changepwd';

export const path = {
    notebook,
    notelist,
    notedetail,
    createnote,
    createnotebook,

    rememberCard,
    genecard,
    choosenote2card,
    createcard,
    carddetail,

    studyGroup,
    pubmanager,
    groupmanager,
    joingroup,
    displaynote,
    displaycard,
    displaymindmap,

    my,
    changenickn,
    changepwd,
}
export const mainPath = [
    notebook,
    rememberCard,
    studyGroup,
    my
]