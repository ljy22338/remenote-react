import { List } from "antd-mobile";

export default function My() {
    return (
        <>
            <List className=" m-3">
                <List.Item>
                    我的信息：<br />
                    用户名：张三<br />
                    账号：1234567890<br />
                </List.Item>
            </List>
            <List className=" m-3">
                <List.Item clickable>
                    修改用户名
                </List.Item>
                <List.Item clickable>
                    修改密码
                </List.Item>
                <List.Item clickable>
                    退出登录
                </List.Item>
            </List>
        </>
    );
}