import React, { useState } from 'react'
import { Radio, RadioChangeEvent, Button } from 'antd'
import { RadioGroupOptionType, RadioGroupButtonStyle } from 'antd/lib/radio'
import { SyncOutlined } from '@ant-design/icons'

// local imports
import styles from './CountPointsPage.module.css'

type CountPointsFormOptionField = 'type' | 'winType' | 'headType' | 'readyType'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CountPointsFormOption = Record<CountPointsFormOptionField, any> & { [key: string]: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CountPointsFormStates = Record<CountPointsFormOptionField, [any, React.Dispatch<any>]> & { [key: string]: any } // prettier-ignore

export const CountPointsPage: React.FC = () => {
  const states: CountPointsFormStates = {
    type: useState('其他'),
    winType: useState('其他'),
    headType: useState('其他'),
    readyType: useState('两面/双碰')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [concealedTriplet, setConcealedTriplet] = useState<{ [key: string]: any }>({
    // 中张牌
    z: {
      // 明刻
      mk: { count: 0, score: 2 },
      // 暗刻
      ak: { count: 0, score: 4 },
      // 明杠
      mg: { count: 0, score: 8 },
      // 暗杠
      ag: { count: 0, score: 16 }
    },
    // 幺九牌
    y: {
      mk: { count: 0, score: 4 },
      ak: { count: 0, score: 8 },
      mg: { count: 0, score: 16 },
      ag: { count: 0, score: 32 }
    }
  })

  const RGProps: { optionType: RadioGroupOptionType; buttonStyle: RadioGroupButtonStyle } = {
    optionType: 'button',
    buttonStyle: 'solid'
  }
  const createRGProps = (optionName: string) => {
    return {
      value: states[optionName][0],
      onChange: ({ target }: RadioChangeEvent) => {
        console.log(`${target.name} checked = ${target.value}`)
        if (target.name) {
          states[target.name][1](target.value)
        }
      },
      ...RGProps
    }
  }

  const options: CountPointsFormOption = {
    type: {
      label: '类型',
      value: [
        { label: '其他', value: '其他' },
        { label: '七对', value: '七对' },
        { label: '平胡', value: '平胡' }
      ]
    },
    winType: {
      label: '胡牌类型',
      value: [
        { label: '其他', value: '其他' },
        { label: '自摸', value: '自摸' },
        { label: '门清荣和', value: '门清荣和' }
      ]
    },
    headType: {
      label: '雀头类型',
      value: [
        { label: '其他', value: '其他' },
        { label: '役牌', value: '役牌' }
      ]
    },
    readyType: {
      label: '听牌类型',
      value: [
        { label: '两面/双碰', value: '两面/双碰' },
        { label: '坎/边/单骑', value: '坎/边/单骑' }
      ]
    }
  }

  // eslint-disable-next-line comma-spacing
  const zip = <T,>(rows: Array<Array<T>>) => rows[0].map((_, c) => rows.map((row) => row[c]))

  return (
    <div
      style={{
        width: '500px',
        backgroundColor: 'white',
        padding: '40px',
        margin: '0 auto'
      }}
    >
      {Object.keys(options).map((optionName) => {
        return (
          <div
            key={optionName}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px'
            }}
          >
            <div>{options[optionName].label}:</div>
            <Radio.Group
              name={optionName}
              options={options[optionName].value}
              {...createRGProps(optionName)}
            />
          </div>
        )
      })}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>统计刻子的种类: </div>
      <table className={styles['concealed-triplet-table']}>
        <thead>
          <tr>
            <td></td>
            <td>中张牌</td>
            <td>幺九牌</td>
          </tr>
        </thead>
        <tbody>
          {zip([
            ['明刻', '暗刻', '明杠', '暗杠'],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.keys(concealedTriplet.z).map((key) => ['z', key] as any),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.keys(concealedTriplet.y).map((key) => ['y', key] as any)
          ]).map(([label, y, z]) => {
            return (
              <tr key={label}>
                <td>{label}</td>
                {[y, z].map(([tileType, elementsType]) => {
                  return (
                    <td key={`${tileType}-${elementsType}`}>
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          setConcealedTriplet({
                            ...concealedTriplet,
                            [tileType]: {
                              ...concealedTriplet[tileType],
                              [elementsType]: {
                                ...concealedTriplet[tileType][elementsType],
                                count: concealedTriplet[tileType][elementsType].count + 1
                              }
                            }
                          })
                        }}
                      >
                        {concealedTriplet[tileType][elementsType].score}符 x{' '}
                        {concealedTriplet[tileType][elementsType].count}个
                      </Button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div
        style={{
          textAlign: 'right',
          marginTop: '50px'
        }}
      >
        <Button
          icon={<SyncOutlined />}
          type="primary"
          shape="circle"
          // size="large"
          onClick={() => {
            Object.keys(states).forEach((key) => {
              states[key][1]('其他')
            })
            states.readyType[1]('两面/双碰')
            setConcealedTriplet({
              z: {
                mk: { count: 0, score: 2 },
                ak: { count: 0, score: 4 },
                mg: { count: 0, score: 8 },
                ag: { count: 0, score: 16 }
              },
              y: {
                mk: { count: 0, score: 4 },
                ak: { count: 0, score: 8 },
                mg: { count: 0, score: 16 },
                ag: { count: 0, score: 32 }
              }
            })
          }}
        />{' '}
        重置
      </div>
      {/* debug */}
      <div>
        {Object.keys(states).map((state) => {
          return (
            <div key={state}>
              {state}: {states[state][0]}
            </div>
          )
        })}
      </div>

      <div>{JSON.stringify(concealedTriplet)}</div>
    </div>
  )
}