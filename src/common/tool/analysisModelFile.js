'use strict'
/**
 * Created by weiChow on 2020/07/17
 * 自动分析model文件目录
 */
const fs = require('fs')
const path = require('path')

const models = []
extractModels(path.resolve(__dirname, '../../model'))

/**
 * 提取model文件地址
 * @param filePath
 */
function extractModels(filePath) {
  const files = fs.readdirSync(filePath)
  for (const filename of files.values()) {
    const fileDir = path.join(filePath, filename) // 获取当前文件的绝对路径
    const stat = fs.lstatSync(fileDir)
    if (stat.isFile()) {
      models.push(`${fileDir.split('src')[1]}`)
    } else if (stat.isDirectory()) {
      extractModels(fileDir)
    }
  }
}
module.exports = models
