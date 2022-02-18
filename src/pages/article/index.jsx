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
} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { useEffect } from 'react'
import { getChannelAction } from '@/store/actions/article'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChannelAction())
  }, [dispatch])
  // 频道列表
  const { channel } = useSelector((state) => state.article)
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
      render: (data) => <Tag color="green">审核通过</Tag>,
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
            />
          </Space>
        )
      },
    },
  ]

  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: 'http://geek.itheima.net/resources/images/15.jpg',
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'webview离线化加载h5资源解决方案',
    },
  ]
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
        <Form initialValues={{ status: -1 }}>
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
                <Option value="item.id" key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </>
  )
}

export default Article
