import React, { useEffect, useState } from 'react'
import {
    Button,
    List,
    SearchBar,
    Space,
} from 'antd-mobile'


export default () => {
    const [data, setData] = useState<string[]>([])
    async function doSearch() {
        const append = ['1', '2', '3', '4', '5']
        setData([])
        setData(val => [...val, ...append])
    }

    useEffect(() => {
        doSearch()
    }, [])

    return (
        <>
            <div className=' flex p-3 items-center bg-white'>
                <div className=' flex-auto'><SearchBar /></div>
                <div className=' flex-none pl-3'>
                    <Button size='small' color='primary' onClick={doSearch}>
                        搜索
                    </Button>
                </div>
            </div>

            <>
                <List>
                    {data.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                    ))}
                </List>
            </>

        </>
    )
}