import store from '@/store'

// 处理
function checkPermission(el, binding) {
 // 获取权限
 const { value } = binding // 获取到用户传入的值
 // 获取到当前用户所有的功能权限
 const points = store.getters.userInfo.permission.points
 // value必须是数组
 if (value && value instanceof Array) {
  // 匹配对应的指令
  const hasPermission = points.some(point => { // 判断里面的元素是否存在
    return value.includes(point)
  })
  // 匹配失败 则删除元素
  if (!hasPermission) {
    el.parentNode && el.parentNode.removeChild(el)
  }
 } else {
   throw new Error('v-permission value is Array')
 }
}
export default {

  // 绑定元素的父组件被挂载后调用
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  updated (el, binding) {
    checkPermission(el, binding)
  }
}
