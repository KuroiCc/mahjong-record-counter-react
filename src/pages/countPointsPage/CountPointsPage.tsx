import React, { useState, useEffect } from 'react'
import { Radio, RadioChangeEvent, Button, Typography, Image } from 'antd'
import { RadioGroupOptionType, RadioGroupButtonStyle } from 'antd/lib/radio'
import { SyncOutlined } from '@ant-design/icons'

// local imports
import styles from './CountPointsPage.module.css'
import simpleScoreTable from '../../assets/pdf-simple-score-table.jpg'

type CountPointsFormOptionField = 'type' | 'winType' | 'headType' | 'readyType'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CountPointsFormOption = Record<CountPointsFormOptionField, any> & { [key: string]: any }
type CountPointsFormStates = Record<
  CountPointsFormOptionField,
  [string, React.Dispatch<string>]
> & { [key: string]: [string, React.Dispatch<string>] }

// eslint-disable-next-line comma-spacing
const zip = <T,>(rows: Array<Array<T>>) => rows[0].map((_, c) => rows.map((row) => row[c]))

export const CountPointsPage: React.FC = () => {
  // ****************** state定义
  const states: CountPointsFormStates = {
    type: useState('其他'),
    winType: useState('其他'),
    headType: useState('其他'),
    readyType: useState('两面/双碰')
  }

  const initialConcealedTriplet = {
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
  }

  const [concealedTriplet, setConcealedTriplet] = useState<
    typeof initialConcealedTriplet & {
      [key: string]: { [key: string]: typeof initialConcealedTriplet.z.mk }
    }
  >(initialConcealedTriplet)

  const [result, setResult] = useState<number | string>(30)

  // ****************** 符数计算
  useEffect(() => {
    let result: number | string = 'err'

    if (states.type[0] === '七对') {
      result = '25'
    } else if (states.type[0] === '平胡') {
      if (states.winType[0] === '自摸') {
        result = 20
      } else if (states.winType[0] === '门清荣和') {
        result = 30
      } else {
        result = 'error'
      }
    } else {
      const winTypeScore = states.winType[0] === '其他' ? 0 : states.winType[0] === '自摸' ? 2 : 10
      const headTypeScore = states.headType[0] === '役牌' ? 2 : 0
      const readyTypeScore = states.readyType[0] === '坎/边/单骑' ? 2 : 0

      let concealedTripletScore = 0
      // 按幺九牌/中张牌取出
      for (const tileTypeValue of Object.values(concealedTriplet)) {
        // 按明/暗,,刻/杠取出
        for (const elementsTypeValue of Object.values(tileTypeValue)) {
          concealedTripletScore +=
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (elementsTypeValue as any).score * (elementsTypeValue as any).count
        }
      }

      result = 20 + winTypeScore + headTypeScore + readyTypeScore + concealedTripletScore
      result = result === 20 ? 30 : result
    }
    setResult(result)
  }, [concealedTriplet, ...Object.keys(states).map((key) => states[key][0])])

  // ****************** 单选框选项
  const options: CountPointsFormOption = {
    type: {
      label: '特殊なタイプ',
      value: [
        { label: 'その他', value: '其他' },
        { label: '七対子', value: '七对' },
        { label: '平和', value: '平胡' }
      ]
    },
    winType: {
      label: '和了形',
      value: [
        { label: 'その他', value: '其他', disabled: states.type[0] !== '其他' },
        { label: 'ツモ', value: '自摸', disabled: states.type[0] === '七对' },
        { label: '門前ロン', value: '门清荣和', disabled: states.type[0] === '七对' }
      ]
    },
    headType: {
      label: '雀頭の種類',
      value: [
        { label: 'その他', value: '其他', disabled: states.type[0] !== '其他' },
        { label: '役牌', value: '役牌', disabled: states.type[0] !== '其他' }
      ]
    },
    readyType: {
      label: '待ちの形',
      value: [
        { label: '両面/シャボ', value: '两面/双碰', disabled: states.type[0] !== '其他' },
        { label: '辺張/嵌張/単騎', value: '坎/边/单骑', disabled: states.type[0] !== '其他' }
      ]
    }
  }

  // ****************** 单选框Props creator, 主要定义onChange事件
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

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'wrap',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#fdfdfd'
        }}
      >
        <div
          style={{
            width: '500px',
            backgroundColor: 'white',
            padding: '15px 30px',
            borderRadius: '30px',
            boxShadow: '0 0 1px rgba(0,0,0,0.1)'
          }}
        >
          <Typography.Title
            level={3}
            style={{
              marginBottom: '30px'
            }}
          >
            符数计算
          </Typography.Title>
          {/* ****************** 渲染单选框 ****************** */}
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
          {/* ****************** 刻子杠子表格 ****************** */}
          <div style={{ marginTop: '20px', textAlign: 'left' }}>统计刻子的种类: </div>
          <table className={styles['concealed-triplet-table']}>
            <thead>
              <tr>
                <td></td>
                <td>中張牌</td>
                <td>么九牌</td>
              </tr>
            </thead>
            <tbody>
              {zip([
                ['明刻', '暗刻', '明槓', '暗槓'],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Object.keys(concealedTriplet.z).map((key) => ['z', key] as any),
                Object.keys(concealedTriplet.y).map((key) => ['y', key])
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
                            disabled={states.type[0] !== '其他'}
                            onClick={() => {
                              concealedTriplet[tileType][elementsType].count += 1
                              setConcealedTriplet({ ...concealedTriplet })
                            }}
                          >
                            {concealedTriplet[tileType][elementsType].score}符 x{' '}
                            {concealedTriplet[tileType][elementsType].count}
                          </Button>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* 重置按钮 */}
          <div
            style={{
              textAlign: 'right',
              marginTop: '20px'
            }}
          >
            <Button
              icon={<SyncOutlined />}
              type="primary"
              shape="circle"
              // size="large"
              onClick={() => {
                Object.keys(states).forEach((key) => states[key][1]('其他'))
                states.readyType[1]('两面/双碰')
                setConcealedTriplet(initialConcealedTriplet)
              }}
            />{' '}
            リセット
          </div>
          {/* 结果区域 */}
          <div
            style={{
              marginTop: '-20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline'
            }}
          >
            <Typography.Title>
              {typeof result === 'number' ? Math.ceil((result as number) / 10) * 10 : result}符
            </Typography.Title>
            <span style={{ marginLeft: '5px', fontSize: 'larger' }}>({result})</span>
          </div>
          {/* debug */}
          {/* <div>
      {Object.keys(states).map((state) => {
        return (
          <div key={state}>
            {state}: {states[state][0]}
          </div>
        )
      })}
    </div>

    <div>{JSON.stringify(concealedTriplet)}</div> */}
        </div>
        <div>
          <Image width={400} src={simpleScoreTable} preview={false} />
          <div>
            出典:
            <a href="https://majandofu.com/rule-score-pointstable">麻雀豆腐</a>
          </div>
        </div>
      </div>
    </div>
  )
}
