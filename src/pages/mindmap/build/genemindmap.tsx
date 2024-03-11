import { List , Avatar } from "antd-mobile";
import {history} from 'umi';
import { path } from "@/constant/path";
export default function Genecard() {
    const books = [
        {
            name: '默认知识库',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '默认知识库的描述信息',
        },
        {
            name: '第一知识库',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '第一知识库的描述信息',
        },
        {
            name: '第二知识库',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '第二知识库的描述信息',
        },
    ];
    function handleClick() {
        history.push(path.choosenote2mindmap);
    }
    return (
        <>
           <List mode='card' header='笔记本列表'>
                {books.map(note => (
                    <List.Item
                        clickable={true}
                        onClick={handleClick}
                        key={note.name}
                        prefix={
                            <>
                                <Avatar
                                    src={note.avatar}
                                    style={{ borderRadius: 5 }}
                                    fit='cover'
                                />
                            </>
                        }
                        description={note.description}
                    >
                        {note.name}
                    </List.Item>
                ))}
            </List>
        </>
    );
}