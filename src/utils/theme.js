
import formula from '@/utils/formula.json'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import axios from 'axios'
/**
* 把新的样式表写入到style中
*/
export const writeNewStyle = newStyle => {
 const style = document.createElement('style')
 style.innerText = newStyle
 document.head.appendChild(style)
}

/**
 * 根据主题色 生成最新样式表
 */
export const generateNewStyle = async (parimaryColor) => {
  console.log(parimaryColor)
  // 1.根据主色生成色值表
  const colors = generateColors(parimaryColor)
  // 2.获取当前elementplus默认样式表 把替换的色值 弄上标记
  const cssText = await getOriginalStyle()
  console.log(cssText)
  // 3.遍历生成的色值比 然后进行替换
  Object.keys(colors).forEach(item => {
    cssText.replace(
      new RegExp('(:|\\s+)' + item, 'g'),
      '$1' + colors[item]
    )
  })
  return cssText
}

// 获取当前的主色
export const generateColors = parimary => {
  if (!parimary) return
  const colors = {
    parimary
  }
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, parimary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

// 获取elementplus默认样式表
export const getOriginalStyle = async() => {
  // 获取当前elementplus的版本
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

const getStyleTemplate = data => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
