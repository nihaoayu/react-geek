import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
// 导入富文本编辑器和样式
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from '@/components/channel'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addArticleAction } from '@/store/actions/article'
import { useHistory, useParams } from 'react-router-dom'
import request from '@/utils/request'
const Publish = () => {
  const [fileList, setFileList] = useState([])
  const [maxCount, setMaxCount] = useState(1)
  const fileListRef = useRef([])
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const params = useParams()
  const isEdit = !!params.id
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
  // 封装发布和存为草稿个公共方法
  const publishArticle = async (formData, draft) => {
    const { type, ...rest } = formData
    if (fileList.length !== type) {
      return message.error('发布的封面和选择的封面个数不一致')
    }
    const data = {
      ...rest,
      cover: {
        type,
        images: fileList.map((item) => item.url),
      },
    }
    try {
      await dispatch(addArticleAction(data, draft))
      message.success(!draft ? '发布成功' : '存为草稿成功')
      history.push('/home/article')
    } catch (error) {
      console.log(error)
    }
  }
  // 发布功能
  const onFinsh = async (formData) => {
    publishArticle(formData, false)
  }
  // 存为草稿
  const serveDraft = async () => {
    try {
      const values = await form.validateFields()
      publishArticle(values, true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const loadData = async () => {
      if (!isEdit) return
      try {
        const { data } = await request.get(`/mp/articles/${params.id}`)
        const {
          title,
          channel_id,
          content,
          cover: { type, images },
        } = data
        const formData = { title, channel_id, content, type }
        form.setFieldsValue(formData)
        const imgFile = images.map((item) => ({ url: item }))
        setFileList(imgFile)
        fileListRef.current = imgFile
        setMaxCount(type)
      } catch (error) {
        console.dir(error)
      }
    }
    loadData()
  }, [isEdit, params, form])
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {!isEdit ? '发布文章' : '编辑文章'}
            </Breadcrumb.Item>
          </Breadcrumb>
        }>
        <Form
          form={form}
          onFinish={onFinsh}
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
                {!isEdit ? '发布文章' : '编辑文章'}
              </Button>
              <Button size="large" onClick={serveDraft}>
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
