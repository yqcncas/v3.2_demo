export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码必须大于6位数'))
    } else {
      callback()
    }
  }
}
