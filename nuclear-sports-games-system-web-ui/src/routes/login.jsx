import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Form, Checkbox, Button, Tooltip, Notification } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import Cookies from 'universal-cookie';
import './login.css';
export default function ErrorPage() {
    const { Title, Text } = Typography;
    const navigate = useNavigate();
    var rememberMe = false;

    const cookies = new Cookies(null, { path: '/' });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (cookies.get('isLoggedIn')) {
        Notification.success({
            title: '您已登录',
            content: '将在 3 秒内跳转至控制台',
            duration: 3,
        })
        // 跳转到主页
        const timer = setTimeout(() => {
            navigate('/manager/');
        }, 2500); // 延迟3秒跳转
        return () => clearTimeout(timer); // 清除定时器;
    }

    const handleRememberMe = (e) => {
        rememberMe=e.target.checked
    }

    const handleLogin = () => {
        // 发送请求
        if (username === 'admin' && password === '123456') {
            // 登录成功，保存 cookie
            const expires = new Date();
            expires.setTime(expires.getTime() + 5 * 60 * 60 * 1000); // 5小时后过期
            if (rememberMe) {
                console.log('remember me')
                cookies.set('isLoggedIn', true, { path: '/' });
            }
            else {
                console.log('not remember me')
                cookies.set('isLoggedIn', true, { path: '/', expires: expires });
            }
            Notification.success({
                title: '登陆成功',
                content: '将在 3 秒内跳转至控制台',
                duration: 3,
            })
            // 跳转到主页
            const timer = setTimeout(() => {
                navigate('/manager/');
            }, 3000); // 延迟3秒跳转
            return () => clearTimeout(timer); // 清除定时器;
        } else {
            // 登录失败，显示错误信息
            Notification.error({
                title: '登陆失败',
                content: '可能是您的用户名或密码有误，请确认后重试',
                duration: 3,
            })
        }
    };

    const Logo = () => (
        <img src="/icon.svg" width="90px" height="90px" />
    );
    return (
        <div className="frame">
            <div className="main">
                <div className="login" style={{ "minWidth": "400px", "width": "40%" }}>
                    <div className="component66">
                        <Logo />
                        <div className="header">
                            <Title style={{ marginBottom: '8px 0' }} >欢迎回来</Title>
                            <div style={{
                                display: "flex",
                                "flexDirection": "row",
                                "alignItems": "center"
                            }}>
                                <Text type="secondary" style={{ marginRight: "8px" }}>登录您的账户</Text>
                                <Tooltip
                                    position='top'
                                    content={<Text style={{ color: "rgba(var(--semi-grey-0), 1)" }}>请使用网站管理员为您注册的账号，如果您未得到账号，请咨询您的网站管理员</Text>}>
                                    <IconHelpCircle />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="form" style={{ "width": "100%" }}>
                        <Form style={{ width: "100%", "display": "flex", "flexDirection": "column", "rowGap": "24px" }}>
                            <Form.Input showClear
                                label={{ text: "用户名" }}
                                placeholder="输入用户名"
                                field="input"
                                fieldStyle={{ padding: 0 }}
                                style={{ width: "100%" }}
                                onChange={(text) => setUsername(text)}
                            />
                            <Form.Input
                                mode="password"
                                label={{ text: "密码" }}
                                placeholder="输入密码"
                                field="field1"
                                fieldStyle={{ padding: 0 }}
                                style={{ width: "100%" }}
                                onChange={(text) => setPassword(text)}
                            />
                        </Form>
                        <Checkbox type="default" onChange={handleRememberMe}>
                            记住我
                        </Checkbox>
                        <Button onClick={handleLogin} theme="solid" style={{ width: "100%" }}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}