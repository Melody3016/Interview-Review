export function checkDataLen (rule, value, callback) {
  if (/^[1-9][0-9]*$/.test(value)) {
    callback()
  } else {
    callback(new Error('只能输入正整数'))
  }
}
// 取值范围 根据数据类型判断范围
export function validValueRange (rule, value, callback) {
  const dataType = this.ruleForm.dataType
  // 整数
  const reg = /^-?[1-9]\d*$|^0$/
  // 最多保留七位小数
  const reg1 = /^(-|\+)?\d+(\.\d{0,7})?$/

  switch (dataType) {
    case 'int':
      if (!reg.test(value)) {
        return callback(new Error('只能输入整数'))
      } else {
        if (value <= -2147483649 || value >= 2147483648) {
          return callback(new Error('-2147483648 至 2147483647的整数'))
        } else {
          return callback()
        }
      }
    case 'float':
      if (!reg1.test(value)) {
        return callback(
          new Error('-2^128 至 +2^128的数值，最多保留7位小数')
        )
      } else {
        if (
          value <= -3402823669209384634633746074317682114571 ||
          value >= 3402823669209384634633746074317682114570
        ) {
          return callback(new Error('-2^128 至 +2^128的数值'))
        } else {
          return callback()
        }
      }
    default:
      break
  }
  return callback()
}

// 取值范围 根据数据类型判断范围  最小
export function validValueRangeMin (rule, value, callback) {
  const maxValue = this.ruleForm.maxValue
  if (value >= maxValue) {
    return callback(new Error('最小值必须小于最大值'))
  }
  return callback()
}

// 取值范围 根据数据类型判断范围  最大
export function validValueRangeMax (rule, value, callback) {
  const minValue = this.ruleForm.minValue
  if (value <= minValue) {
    return callback(new Error('最大值必须大于最小值'))
  }
  return callback()
}

// 步长
export function validStep (rule, value, callback) {
  const dataType = this.ruleForm.dataType
  const difference =
    this.ruleForm.maxValue -
    this.ruleForm.minValue
  const reg = /^[1-9]\d*$/
  const reg1 = /^(\+)?\d+(\.\d{0,7})?$/

  switch (dataType) {
    case 'int':
      if (!reg.test(value)) {
        return callback(new Error('只能输入正整数'))
      } else {
        console.log(value, 'value')
        if (value < 0 || value > 2147483647) {
          return callback(new Error('必须是大于0且小于2147483647的整数'))
        } else if (value > difference) {
          return callback(new Error('不能大于取值范围的差值'))
        } else {
          return callback()
        }
      }

    case 'float':
      if (!reg1.test(value)) {
        return callback(
          new Error('大于0且小于2^128的数值，最多保留7位小数')
        )
      } else {
        if (value < 0 || value > Math.pow(2, 128)) {
          return callback(new Error('必须大于0且小于2^128'))
        } else if (value > difference) {
          return callback(new Error('不能大于取值范围的差值'))
        } else {
          return callback()
        }
      }
    default:
      break
  }
}
