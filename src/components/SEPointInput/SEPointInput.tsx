import React from 'react'
import { Input, Form } from 'antd'

// local imports
import styles from './SEPointInput.module.css'

export const SEPointInput: React.FC = () => {
  return (
    <Form.Item label="配点-返し">
      <Input.Group compact>
        {/* start input */}
        <Form.Item name={['point', 'start']} noStyle>
          <Input placeholder="配点" style={{ width: 100, textAlign: 'center' }} />
        </Form.Item>
        {/* split line */}
        <Input
          placeholder="-"
          className={styles['sep-input-split']}
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none'
          }}
          disabled
        />
        {/* return input */}
        <Form.Item name={['point', 'return']} noStyle>
          <Input
            className={styles['sep-input-right']}
            placeholder="返し"
            style={{
              width: 100,
              textAlign: 'center'
            }}
          />
        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}
