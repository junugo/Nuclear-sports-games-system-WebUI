import { Nav, Avatar, Dropdown, Layout, Breadcrumb, Modal, Toast } from '@douyinfe/semi-ui';
import { IconAvatar, IconConfig, IconBanner, IconForm, IconSteps, IconProgress, IconOverflow } from '@douyinfe/semi-icons-lab';
import { Outlet, Link, useNavigation, Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

export default function Root() {
    const menu = [
        {
            itemKey: 'Preparation',
            text: '管理赛事',
            icon: <IconConfig />,
            items: [
                {
                    itemKey: 'Race Settings',
                    text: '管理运动会',
                },
                {
                    itemKey: 'Staff Arrangements',
                    text: '工作人员配置',
                },
                {
                    itemKey: 'Account Management',
                    text: '账号管理',
                },
            ]
        },
        {
            itemKey: 'Pre-race',
            text: '赛前准备',
            icon: <IconForm />,
            items: [
                {
                    itemKey: 'Event Settings',
                    text: '管理项目',
                },
                {
                    itemKey: 'Class Settings',
                    text: '管理班级',
                },
                {
                    itemKey: 'Sign Up',
                    text: '项目报名',
                },
                {
                    itemKey: 'Sign-up Approval',
                    text: '教师报名审核',
                },
                {
                    itemKey: 'Export File',
                    text: '生成文档',
                },
            ]
        },
        {
            itemKey: 'Race',
            text: '赛中处理',
            icon: <IconProgress />,
            items: [
                {
                    itemKey: 'Recording',
                    text: '成绩录入',
                },
                {
                    itemKey: 'Score Audit',
                    text: '成绩审核',
                },
            ]
        },
        {
            itemKey: 'Post-race',
            text: '赛后总结',
            icon: <IconSteps />,
            items: [
                {
                    itemKey: 'Adjust Grades',
                    text: '修改成绩',
                },
                {
                    itemKey: 'Print',
                    text: '打印文档',
                },
            ]
        },
        {
            itemKey: 'Dashboard Control',
            icon: <IconBanner />,
            text: '控制大屏',
        },
        {
            itemKey: 'Teacher End',
            text: '教师端',
            icon: <IconAvatar />,
            items: [
                {
                    itemKey: 'Teacher Sign Tp',
                    text: '教师报名',
                },
                {
                    itemKey: 'Cheer',
                    text: '教师加油',
                },
                {
                    itemKey: 'Timing',
                    text: '裁判计时',
                },
                {
                    itemKey: 'Teacher Query Results',
                    text: '教师查询',
                },
                {
                    itemKey: 'Photo Management',
                    text: '管理照片',
                },
            ]
        },
        {
            itemKey: 'Public End',
            text: '公示端',
            icon: <IconOverflow />,
            items: [
                {
                    itemKey: 'Dashboard',
                    text: '数据大屏',
                },
                {
                    itemKey: 'Schedule',
                    text: '电子日程表',
                },
                {
                    itemKey: 'Check-in',
                    text: '电子检录',
                },
                {
                    itemKey: 'Query Results',
                    text: '查询成绩',
                },
            ]
        },
    ];
    const routerMap = {
        Test1: "test/1",
        Test2: "test/2",
        Error: "error",
        "Login": "/Login"
    };

    const { Header, Footer, Sider, Content } = Layout;

    const cookies = new Cookies(null, { path: '/' });
    //console.log(cookies.get('isLoggedIn'));
    if (!cookies.get('isLoggedIn')) {
        return <Navigate to="/login" replace />;
    }

    const LoginOut = () => {
        console.log('退出登录');
        Toast.success('您的账号已登出')
        //cookies.remove('isLoggedIn');
        const timer = setTimeout(() => {
            cookies.set('isLoggedIn', false, { path: '/'});
            location.reload();
        }, 1000); // 延迟3秒跳转
        return () => clearTimeout(timer); // 清除定时器;
    }

    function confirm() {
        Modal.confirm({ title: '您真的想要退出登录吗？', content: '下次打开管理员页面需重新登录' , onOk:LoginOut});
    }

    const Logo = () => (
        <img src="/icon.svg" width="36px" height="36px" />
    );

    const LogoBlack = () => (
        <img src="/icon.svg" width="20px" height="20px" style={{ filter: "brightness(0%)", marginRight: '8px' }} />
    );

    const TopHeader = () => (
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <div>
                <Nav
                    mode={'horizontal'}
                    onSelect={key => console.log(key)}
                    header={{
                        logo: <Logo style={{ height: '36px', fontSize: 36 }} />,
                        text: '运动会名称',
                        link: "/",
                    }}
                    footer={
                        <Dropdown
                            position="bottomRight"
                            render={
                                <Dropdown.Menu>
                                    <Dropdown.Item>详情</Dropdown.Item>
                                    <Dropdown.Item onClick={confirm}>退出</Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        >
                            <Avatar size="small" color='light-blue' style={{ margin: 4 }}>U</Avatar>
                            <span>User</span>
                        </Dropdown>
                    }
                />
            </div>
        </Header>
    );

    const LeftNav = () => (
        <Nav
            bodyStyle={{ height: '70vh' }}
            style={{ maxWidth: 220, height: '100%' }}
            defaultSelectedKeys={['Home']}
            renderWrapper={({ itemElement, props }) => {
                if (Object.prototype.hasOwnProperty.call(routerMap, props.itemKey)) {
                    return (
                        <Link
                            style={{ textDecoration: "none" }}
                            to={routerMap[props.itemKey]}
                        >
                            {itemElement}
                        </Link>
                    );
                }

                // 如果 props.itemKey 不在 routerMap 中，直接返回 itemElement
                return itemElement;
            }}
            items={menu}
            footer={{
                collapseButton: true,
            }}
        />
    );

    const FooterContent = () => (
        <>
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <LogoBlack />
                <span>核能运动会操作系统</span>
            </span>
            <span>
                <span style={{ marginRight: '24px' }}><a href={`https://github.com/junugo/Nuclear-sports-games-system`} target="_blank">访问源码</a></span>
                <span><a href={`https://github.com/junugo/Nuclear-sports-games-system/issues`} target="_blank">反馈与建议</a></span>
            </span>
        </>
    );
    const navigation = useNavigation();
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
            <TopHeader />
            <Layout>
                <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <LeftNav />
                </Sider>
                <Content
                    style={{
                        padding: '24px',
                        backgroundColor: 'var(--semi-color-bg-0)',
                    }}
                >
                    <Breadcrumb
                        style={{ marginBottom: '24px', }}
                        routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
                    />
                    <div
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--semi-color-border)',
                            height: '376px',
                            padding: '32px',
                        }}
                        id="detail"
                        className={navigation.state === "loading" ? "loading" : ""}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <Footer
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    color: 'var(--semi-color-text-2)',
                    backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                }}
            >
                <FooterContent />
            </Footer>
        </Layout>
    );
};