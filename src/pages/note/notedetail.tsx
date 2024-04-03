import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CustomIcon, ExposeParam, MdEditor, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Button, Card, List, Radio, Space, Switch } from 'antd-mobile';
import { history, useRequest, useParams } from 'umi';
import { FloatPanel } from '@/components/float';
import { HeaderHeightCotext } from '@/layouts';
import { defaultoption, notedetailget, notedetailpost, runableoption, updatenote } from '@/service/note';
import { useDispatch, useSelector } from 'react-redux';
import { changeTitle } from '@/store/slices/userSlice';
import { CommentSectionVo, NoteVo } from '@/service/entity/response';
import Loading from '../loading';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import { Transformer } from 'markmap-lib';
import React from 'react';
import { makeComment, viewComment } from '@/service/comment';
import res from 'antd-mobile-icons/es/AaOutline';


const customIcon: CustomIcon = {
};
const toolbars: ToolbarNames[] = [
  'bold',
  'underline',
  'strikeThrough',
  'quote',
  'unorderedList',
  'orderedList',
  'code',
  'table',
  'save',
  '=',
  'catalog',
]
const modevalues = ['编辑', '渲染', '导图', '评论']
const radiostyle = {
  '--icon-size': '18px',
  '--font-size': '14px',
  '--gap': '6px',
}
const HeaderButton = (props: { editorRef: React.MutableRefObject<ExposeParam | undefined>, headerLevel: number }) =>
  <div className=''><Button size='mini' onClick={() => {
    props.editorRef.current?.insert((selectedText) => {
      let targetValue = '';
      for (let i = 0; i < props.headerLevel; i++) {
        targetValue += '#';
      }
      return {
        targetValue: targetValue + ` 添加标题 `,
        select: true,
        deviationStart: props.headerLevel + 1,
        deviationEnd: 0
      };
    })
  }}>{"h" + props.headerLevel}</Button></div>

const Comment = (props: { note: NoteVo, refresh: boolean }) => {
  const { data, run, loading, error } = useRequest(viewComment, runableoption)
  useEffect(() => {
    run({
      noteOwnerUserName: props.note.username,
      notebookName: props.note.notebookName,
      noteTitle: props.note.title,
      content: '',
      createTime: '',
      publisher: '',
    })
  }, [props.refresh])
  useEffect(() => {
    if (!data) {
      run({
        noteOwnerUserName: props.note.username,
        notebookName: props.note.notebookName,
        noteTitle: props.note.title,
        content: '',
        createTime: '',
        publisher: '',
      })
    }
  }, [data])
  const comments = (data as CommentSectionVo)
  if (loading) return <div><Loading /></div>
  if (error) return <div><Loading /></div>
  return <>
    {/* <List mode='card' header={<div>评论区 共{comments?.commentList.length}条评论</div>}>
      {comments?.commentList.map(comment => <List.Item key={comment.createTime} extra={comment.createTime}>{comment.publisher}：{comment.commentContent}</List.Item>)}
    </List> */}
      <List style={{"--border-top":"0px","--border-bottom":"0px"}} header={`评论区 共${comments?.commentList.length}条评论`} />
      {comments?.commentList.map(comment =>
     <>
        <Card className=' m-3' key={comment.createTime} title={comment.publisher} extra={comment.createTime}>
          {comment.commentContent}
        </Card>
        </>
      )}
      <div className=' h-32'/>
  
  </>
}
export default function Note() {

  const [text, setText] = useState('1234');
  const [refresh, setrefresh] = useState(false);
  const [comment, setComment] = useState<string>('')
  const [modevalue, setModeValue] = useState<string>(modevalues[0])

  const refMm = useRef<Markmap>();
  const editorRef = useRef<ExposeParam>();
  const refSvg = useRef<SVGSVGElement>(null);
  const editorDivRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  let headerHeight = useContext(HeaderHeightCotext);
  const { note } = history.location.state as { note: NoteVo }
  const nickname = useSelector((state: any) => state.user.nickname)

  const { run: makecomment } = useRequest(makeComment, runableoption)
  const { run, data, loading, error } = useRequest(notedetailpost, runableoption)
  const { run: runSave, loading: saveloading, error: saveError } = useRequest(updatenote, runableoption)

  const handleSave = () => {
    runSave({
      noteTitle: note.title,
      content: text,
      noteOwnerName: '',
      notebookId: 0,
      notebookDescription: '',
      delNoteId: 0,
      notebookName: note.notebookName,
      isPublic: (data as NoteVo).isPublic,
      srcNotebook: '',
      srcTitle: '',
      move: false
    })
  }
  useEffect(() => {
    if (data) {
      const response = data as NoteVo
      console.log(data)
      setText(response.content)
      dispatch(changeTitle(response.title))
    }
  }, [data])
  useEffect(() => {
    run({
      noteTitle: note.title,
      content: '',
      noteOwnerName: '',
      notebookId: 0,
      notebookDescription: '',
      delNoteId: 0,
      notebookName: note.notebookName,
      isPublic: false,
      srcNotebook: '',
      srcTitle: '',
      move: false
    })
    const editorDiv = editorDivRef.current;
    const newHeight = window.innerHeight;
    if (!editorDiv) return;
    editorDiv.style.setProperty('height', `${newHeight - headerHeight}px`);
    const handleResize = () => {
      const editorDiv = editorDivRef.current;
      const newHeight = window.innerHeight;
      if (!editorDiv) return;
      editorDiv.style.setProperty('height', `${newHeight - headerHeight}px`);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (!refSvg.current) return;
    const mm = Markmap.create(refSvg.current);
    refMm.current = mm;
  }, [refSvg.current]);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(text);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, text]);

  if (loading) return <div ref={editorDivRef}><Loading /></div>
  if (error) return <div ref={editorDivRef}><Loading /></div>
  if (saveloading) return <div ref={editorDivRef}><Loading /></div>
  if (saveError) return <div ref={editorDivRef}><Loading /></div>
  const modes = () => {
    if (modevalue === modevalues[0] || modevalue === modevalues[1]) {
      return <MdEditor
        inputBoxWitdh={"0%"}
        ref={editorRef}
        style={{ height: '100%' }}
        preview={false}
        modelValue={text}
        onChange={setText}
        customIcon={customIcon}
        toolbars={toolbars}
        footers={[]}
      />
    } else if (modevalue === modevalues[2]) {
      return <MarkmapHooks content={text} />
    } else if (modevalue === modevalues[3]) {
      return <Comment refresh={refresh} note={note} />
    }
  }
  const editorButtons = () => {
    if (modevalue === modevalues[0]) {
      return <Space direction='horizontal' style={{ "--gap": "2px" }}>
        <HeaderButton editorRef={editorRef} headerLevel={1} />
        <HeaderButton editorRef={editorRef} headerLevel={2} />
        <HeaderButton editorRef={editorRef} headerLevel={3} />
        <HeaderButton editorRef={editorRef} headerLevel={4} />
        <Button size='mini' onClick={handleSave}>保存</Button>
      </Space>
    }
  }
  const commentSubmit = () => {
    if (modevalue === modevalues[3]) {
      return <div>
        <input type='text' value={comment} onChange={e => setComment(e.target.value)} />
        <Button size='mini' onClick={() => {
          makecomment({
            noteOwnerUserName: note.username,
            notebookName: note.notebookName,
            noteTitle: note.title,
            content: comment,
            createTime: '',
            publisher: nickname,
          }).then(() => {
            setrefresh(!refresh)
          })
        }}>提交</Button>
      </div>
    }
  }
  return (<>

    <div ref={editorDivRef} className=' '>
      {modes()}
    </div>
    <FloatPanel>
      {editorButtons()}
      {commentSubmit()}
      <Radio.Group defaultValue={modevalues[0]} value={modevalue}
        onChange={val => {
          const checked = val === modevalues[1];
          editorRef.current?.togglePreview(checked);
          setModeValue(val as string)
        }}>
        <Space direction='horizontal' style={{ "--gap": "2px" }}>
          <Radio value={modevalues[0]}
            style={radiostyle}>编辑</Radio>
          <Radio value={modevalues[1]}
            style={radiostyle}>渲染</Radio>
          <Radio value={modevalues[2]}
            style={radiostyle}>导图</Radio>
          <Radio value={modevalues[3]}
            style={radiostyle}>评论</Radio>
        </Space>
      </Radio.Group>
    </FloatPanel>
  </>)

}


const transformer = new Transformer();
export function MarkmapHooks(props: { content: string }) {
  const refSvg = useRef<SVGSVGElement>(null);
  const refMm = useRef<Markmap>();
  useEffect(() => {
    if (!refSvg.current) return;
    const mm = Markmap.create(refSvg.current);
    refMm.current = mm;
  }, [refSvg.current]);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(props.content);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, props.content]);
  return (
    <> <svg className="flex-1 h-full w-full" ref={refSvg} /></>
  );
}




