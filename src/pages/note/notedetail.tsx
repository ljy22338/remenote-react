import React, { useContext, useEffect, useRef, useState } from 'react';
import { CustomIcon, ExposeParam, MdEditor, NormalToolbar, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { AntOutline, AppstoreOutline, HandPayCircleOutline, LeftOutline, ScanningOutline, TransportQRcodeOutline } from 'antd-mobile-icons';
import { Card, FloatingPanel, List, Button, Switch, Popover, Toast } from 'antd-mobile';
import { history } from 'umi';
import { FloatPanel } from '@/components/float';
import { HeaderHeightCotext } from '@/layouts';
import { Action } from 'antd-mobile/es/components/popover';

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

export default function Note() {
  const editorRef = useRef<ExposeParam>();
  const [text, setText] = useState('hello md-editor-rt！');
  const editorDivRef = useRef<HTMLDivElement>(null);
  let headerHeight = useContext(HeaderHeightCotext);
  useEffect(() => {
    const editorDiv = editorDivRef.current;
    const newHeight = window.innerHeight;
    if (!editorDiv) return;
    editorDiv.style.setProperty('height', `${newHeight - headerHeight}px`);
  }, [])
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleResize = () => {
    const editorDiv = editorDivRef.current;
    const newHeight = window.innerHeight;
    if (!editorDiv) return;
    editorDiv.style.setProperty('height', `${newHeight - headerHeight}px`);
  };
  return (<>
    <div ref={editorDivRef} className=' '>
      <MdEditor
        inputBoxWitdh={"0%"}
        ref={editorRef}
        style={{ height: '100%' }}
        preview={false} modelValue={text} onChange={setText}
        customIcon={customIcon}
        toolbars={toolbars}
        footers={[]}
      />
    </div>

    <FloatPanel>
      <Button onClick={() => {
        history.go(-1)
      }}><LeftOutline /></Button>
      <Button onClick={() => {
        editorRef.current?.insert((selectedText) => {
          return {
            targetValue: `## sss `,
            select: true,
            deviationStart: 3,
            deviationEnd: 0
          };
        })
      }}>保存</Button>
   
      <Switch
        onChange={(checked) => {
          editorRef.current?.togglePreview(checked);
        }}
      />
    </FloatPanel>

  </>)

}





