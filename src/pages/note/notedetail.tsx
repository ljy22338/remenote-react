import { useContext, useEffect, useRef, useState } from 'react';
import { CustomIcon, ExposeParam, MdEditor, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Button, Switch } from 'antd-mobile';
import { history, useRequest, useParams } from 'umi';
import { FloatPanel } from '@/components/float';
import { HeaderHeightCotext } from '@/layouts';
import { defaultoption, notedetailget, notedetailpost, runableoption, updatenote } from '@/service/note';
import { useDispatch, useSelector } from 'react-redux';
import { changeTitle } from '@/store/slices/userSlice';
import { NoteVo } from '@/service/entity/response';
import Loading from '../loading';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import { Transformer } from 'markmap-lib';
import React from 'react';


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

const HeaderButton = (props: { editorRef: React.MutableRefObject<ExposeParam | undefined>, headerLevel: number }) =>
  <div className=' p-0.5'><Button size='mini' onClick={() => {
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

export default function Note() {

  const dispatch = useDispatch()
  const [text, setText] = useState('1234');
  const [mindmap, setMindmap] = useState(false);
  const { noteTitle, notebookName } = history.location.state as { noteTitle: string, notebookName: string }
  const { run, data, loading, error } = useRequest(notedetailpost, runableoption)
  const { run: runSave, loading: saveloading, error: saveError } = useRequest(updatenote, runableoption)
  const editorRef = useRef<ExposeParam>();
  const editorDivRef = useRef<HTMLDivElement>(null);
  const refSvg = useRef<SVGSVGElement>(null);
  const refMm = useRef<Markmap>();
  let headerHeight = useContext(HeaderHeightCotext);
  useEffect(() => {
    console.log(data)
    if (data) {
      const response = data as NoteVo
      console.log(response)
      setText(response.content)
      dispatch(changeTitle(response.title))
    }
  }, [data])


  useEffect(() => {
    run({
      noteTitle: noteTitle,
      content: '',
      noteOwnerName: '',
      notebookId:0,
      notebookDescription:'',
      delNoteId: 0,
      notebookName: notebookName,
      isPublic: '',
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
  return (<>

    <div ref={editorDivRef} className=' '>
      {mindmap
        ? <MarkmapHooks content={text} />
        : <MdEditor
          inputBoxWitdh={"0%"}
          ref={editorRef}
          style={{ height: '100%' }}
          preview={false}
          modelValue={text}
          onChange={setText}
          customIcon={customIcon}
          toolbars={toolbars}
          footers={[]}
        />}
    </div>

    <FloatPanel>

      <HeaderButton editorRef={editorRef} headerLevel={1} />
      <HeaderButton editorRef={editorRef} headerLevel={2} />
      <HeaderButton editorRef={editorRef} headerLevel={3} />
      <HeaderButton editorRef={editorRef} headerLevel={4} />
      <Button size='mini' onClick={() => {
        runSave({
          noteTitle: noteTitle,
          content: text,
          noteOwnerName: '',
          notebookId:0,
          notebookDescription:'',
          delNoteId: 0,
          notebookName: notebookName,
          isPublic: '',
          srcNotebook: '',
          srcTitle: '',
          move: false
        })
      }}>保存</Button>
      <Switch
        onChange={(checked) => {
          editorRef.current?.togglePreview(checked);
        }}
        uncheckedText='预览'
        checkedText='编辑'
      />
      <Switch
        onChange={(checked) => {
          setMindmap(checked)
        }}
        uncheckedText='导图'
        checkedText='笔记'
      />
    </FloatPanel>

  </>)

}


const transformer = new Transformer();
export  function MarkmapHooks(props:{content:string}) {
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




