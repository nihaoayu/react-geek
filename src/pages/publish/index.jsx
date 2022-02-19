import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
// 导入富文本编辑器和样式
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from '@/components/channel'
import { useState, useRef } from 'react'
const Publish = () => {
  const [fileList, setFileList] = useState([])
  const [maxCount, setMaxCount] = useState(1)
  const fileListRef = useRef([])
  // 上传文件的回调
  const onUploadChange = (info) => {
    // info.fileList 用来获取当前的文件列表
    const _fileList = info.fileList.map((file) => {
      // 刚从本地上传的图片
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      }
      // 已有图片
      return file
    })
    fileListRef.current = _fileList
    setFileList(_fileList)
  }
  // 封面个数
  const changeType = (e) => {
    const count = e.target.value
    setMaxCount(count)
    if (count === 1) {
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}>
            <Channel />
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
                {/* <Radio value={-1}>自动</Radio> */}
              </Radio.Group>
            </Form.Item>
            {/* // Upload 组件说明： */}
            {maxCount > 0 && (
              <Upload
                maxCount={maxCount}
                className="avatar-uploader"
                // 发到后台的文件参数名
                // 必须指定，根据接口文档的说明，需要设置为 image
                name="image"
                // 上传组件展示方式
                listType="picture-card"
                // 展示已上传图片列表
                showUploadList
                // 接口地址
                // 注意：Upload 再上传图片时，默认不会执行 axios 的请求，所以，此处需要手动设置完整接口地址
                action="http://geek.itheima.net/v1_0/upload"
                // 多选
                multiple={maxCount > 1}
                // 已经上传的文件列表，设置该属性后组件变为 受控
                fileList={fileList}
                // 上传文件改变时的回调
                onChange={onUploadChange}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
              <Button size="large">存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
