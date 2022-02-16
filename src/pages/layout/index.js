import { Layout, Menu, Popconfirm } from 'antd'
import { LogoutOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import Home from '../home/index'
import Article from '../article/index'
import Publish from '../publish/index'
import { Route, Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserAction } from '@/store/actions/user'
import { logoutAction } from '@/store/actions/login'
const { Header, Sider } = Layout
function Layouts () {
  const location = useLocation()
  const history = useHistory()
  const selectedKey = location.pathname.startsWith('/home/publish') ? '/home/publish' : location.pathname
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserAction())
  }, [dispatch])
  const user = useSelector(state => state.user)
  const logout = () => {
    dispatch(logoutAction())
    history.replace('/login')

  }
  return (
    <Layout className={styles.root}>
      <Header className="header">
        <div className="logo" />
        {/* + 用户信息 */}
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" onConfirm={logout} okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* + 菜单 */}
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/home">
              <Link to='/home'>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/home/article">
              <Link to='/home/article'>内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/home/publish">
              <Link to='/home/publish'>发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Route exact path='/home' component={Home} />
          <Route path='/home/article' component={Article} />
          <Route path='/home/publish/:id?' component={Publish} />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Layouts
