import React from 'react'
import { Form, Checkbox, Button, Select, Input } from 'antd'

export const PtSettingForm: React.FC = () => {
  const defaultValue = {
    point: {
      start: 25000,
      return: 30000
    },
    uma: '10-30',
    oka: true
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  }
  return (
    <Form
      name="basic"
      {...layout}
      initialValues={defaultValue}
      onFinish={(values) => {
        console.log('Success:', values)
      }}
      onFinishFailed={(errorInfo) => {
        console.log('Failed:', errorInfo)
      }}
      autoComplete="off"
      style={{
        width: '500px',
        backgroundColor: '#fff',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'left'
      }}
    >
      <Form.Item label="配点-返し">
        <Input.Group compact>
          {/* start input */}
          <Form.Item
            name={['point', 'start']}
            normalize={(value) => (value ? parseInt(value) : 0)}
            rules={[{ required: true, type: 'integer' }]}
            noStyle
          >
            <Input placeholder="配点" style={{ width: 100, textAlign: 'center' }} />
          </Form.Item>
          {/* split line */}
          <Input
            placeholder="-"
            // className={styles['sep-input-split']}
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none'
            }}
            disabled
          />
          {/* return input */}
          <Form.Item
            name={['point', 'return']}
            normalize={(value) => (value ? parseInt(value) : 0)}
            rules={[{ required: true, type: 'integer' }]}
            noStyle
          >
            <Input
              // className={styles['sep-input-right']}
              placeholder="返し"
              style={{
                width: 100,
                textAlign: 'center'
              }}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label="ウマ" name="uma">
        <Select
          style={{
            width: '229px'
          }}
        >
          <Select.Option value="5-10">ゴットー(5-10)</Select.Option>
          <Select.Option value="10-20">ワンツー(10-20)</Select.Option>
          <Select.Option value="10-30">ワンスリー(10-30)</Select.Option>
          <Select.Option value="20-30">ツースリー(20-30)</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="oka" valuePropName="checked" {...tailLayout}>
        <Checkbox>オカあり</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
