import { useState, useRef, useMemo, useEffect, FC } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

const COUNT_SECOND = 60
const COUNT_FORMAT = '重新发送(SSs)'
const COUNT_DEFAULT = '发送验证码'

export interface CountDownProps {
  /**
   * 手机号码
   */
  mobile?: string
  /**
   * 是否立即开始
   */
  starting?: boolean
  /**
   * 默认显示内容
   */
  defaultText?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 请求函数
   */
  request?: () => Promise<any>
  /**
   * 格式化文本
   */
  format?: string
  /**
   * 点击事件
   */
  onClick?: () => void
  /**
   * 倒计时开始数字
   */
  startNum?: number
}

/**
 * 倒计时
 * @param props CountDownProps
 * @returns
 */
const CountDown: FC<CountDownProps> = props => {
  const { startNum, starting, defaultText, request, format, disabled } = props
  const [counting, setCounting] = useState<boolean>(starting)
  const [requesting, setRequesting] = useState<boolean>(false)
  const [showTime, setShowTime] = useState<number>(startNum || COUNT_SECOND)
  const timerRef = useRef<number>()
  const timeValRef = useRef<number>()
  timeValRef.current = showTime

  // 第一次好使，每次执行，都会有一个新的闭包，count
  // count 保存了上一次闭包的值
  const count = () => {
    clearTimeout(timerRef.current)
    setCounting(true)
    if (timeValRef.current <= 0) {
      clearCount()
      return
    }
    setShowTime(timeValRef.current - 1)
    timerRef.current = window.setTimeout(() => {
      count()
    }, 1000)
  }
  const clearCount = () => {
    clearTimeout(timerRef.current)
    setCounting(false)
    timeValRef.current = startNum || COUNT_SECOND
  }
  const currTime = useMemo(() => formatWord(showTime), [showTime])

  useEffect(() => {
    if (counting) {
      count()
    }
    return clearCount
  }, [])

  function formatWord(timeVal) {
    return (format || COUNT_FORMAT).replace('SS', timeVal)
  }
  function handleClick() {
    if (disabled || requesting || counting) {
      return
    }
    setRequesting(true)
    count()
    if (!request) {
      return
    }
    request()
      .then(resp => {
        console.log(resp)
      })
      .finally(() => setRequesting(false))
  }
  return (
    <span className={cls('count-down', { disable: counting || disabled })} onClick={handleClick}>
      {counting ? currTime : defaultText || COUNT_DEFAULT}
    </span>
  )
}

CountDown.propTypes = {
  /**
   * 手机号码
   */
  mobile: PropTypes.string,
  /**
   * 是否立即开始
   */
  starting: PropTypes.bool,
  /**
   * 默认显示内容
   */
  defaultText: PropTypes.string,
  /**
   * 是否禁用
   */
  disabled: PropTypes.bool,
  /**
   * 请求函数，返回一个promise
   */
  request: PropTypes.func,
  /**
   * 倒计时格式化
   */
  format: PropTypes.string,
  /**
   * 开始倒计时数据，与starting配合使用，starting = false时，无效
   */
  startNum: PropTypes.number
}

CountDown.defaultProps = {
  disabled: false,
  defaultText: COUNT_DEFAULT,
  format: COUNT_FORMAT
}

CountDown.displayName = 'CountDown'

export default CountDown
