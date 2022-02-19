import { Select } from "antd"
import { useSelector } from "react-redux"

const { Option } = Select
function Channel ({ value, onChange }) {
  const { channel } = useSelector(
    (state) => state.article
  )
  return (
    <Select
      value={value}
      onChange={onChange}
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
  )
}

export default Channel
