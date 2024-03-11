import { FloatingBubble } from 'antd-mobile';
import { AddOutline, MessageFill } from 'antd-mobile-icons'
import React from 'react';
import { useEffect, useRef } from 'react';

export const FloatButton =(props:{onClick:()=>void})=>(
    <FloatingBubble
    style={{
        '--initial-position-bottom': '72px',
        '--initial-position-right': '24px',
        '--edge-distance': '24px',
        '--size': '60px',
    }}
    onClick={props.onClick}
>
    <AddOutline fontSize={32} />
</FloatingBubble>
)

export function FloatPanel(props: {
    children: React.ReactNode
    bottom?: string
    right?: string
}) {
    const floatButtonRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const floatButton = floatButtonRef.current
        if (!floatButton) return
        if (!floatButton.style) return
        if (props.bottom) floatButton.style.bottom = props.bottom
        if (props.right) floatButton.style.right = props.right
    }, [])
    return (
        <div ref={floatButtonRef} onClick={(e) => {
            e.preventDefault()
        }} className='   rounded-3xl bg-slate-200 shadow-sm 
        flex items-center justify-center
            fixed right-5 left-5 bottom-6
            z-50
         active:'>
            {props.children}
        </div>
    )
}