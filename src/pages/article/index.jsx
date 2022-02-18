import { Link } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Modal,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useRef } from 'react'
import {
  getChannelAction,
  getArticleAction,
  delArticleAction,
} from '@/store/actions/article'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select
const { RangePicker } = DatePicker
// 优化文章状态的处理
const articleStatus = {
  0: { color: 'yellow', text: '草稿' },
  1: { color: '#ccc', text: '待审核' },
  2: { color: 'green', text: '审核通过' },
  3: { color: 'red', text: '审核失败' },
}
const Article = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // 获取频道列表
    dispatch(getChannelAction())
    // 获取table表格
    dispatch(getArticleAction({}))
  }, [dispatch])
  // 频道列表
  const { channel, list, total, page, pageSize } = useSelector(
    (state) => state.article
  )
  // 筛选
  const paramsFilter = useRef()
  const onFilter = ({ channel_id, date, status }) => {
    const params = { channel_id }
    if (status !== -1) {
      params.status = status
    }
    if (!!date) {
      params.begin_pubdate = date[0].format('YYYY-MM-DD HH:mm:ss')
      params.end_pubdate = date[1].format('YYYY-MM-DD HH:mm:ss')
    }
    paramsFilter.current = params
    dispatch(getArticleAction(params))
  }
  // 分页功能
  const pageChange = (page, pageSize) => {
    const params = {
      ...paramsFilter.current,
      page,
      per_page: pageSize,
    }
    dispatch(getArticleAction(params))
  }
  // 删除功能
  const delArticle = (data) => {
    Modal.confirm({
      title: '提示',
      content: `确定删除${data.title} 这篇文章吗`,
      icon: <WarningOutlined />,
      onOk() {
        dispatch(delArticleAction(data.id, paramsFilter.current))
      },
    })
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (cover) => {
        return <img src={cover || img404} width={200} height={150} alt="" />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => (
        <Tag color={articleStatus[data].color}>{articleStatus[data].text}</Tag>
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => delArticle(data)}
            />
          </Space>
        )
      },
    },
  ]

  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: 'http://geek.itheima.net/resources/images/15.jpg',
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'webview离线化加载h5资源解决方案',
  //   },
  // ]
  return (
    <>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}>
        <Form onFinish={onFilter} initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              // defaultValue="lucy"
              style={{ width: 120 }}>
              {/* <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option> */}
              {channel.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <div>共计{total}篇文章</div>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            position: ['bottomLeft'],
            current: page,
            pageSize,
            total,
            onChange: pageChange,
          }}
        />
      </Card>
    </>
  )
}

export default Article
