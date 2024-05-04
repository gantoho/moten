/**
 * 组件开发预览脚本
 *
 * 原理解析：
 * pnpm ui 和 pnpm admin 会同时监听文件，
 * 不能直接使用 pnpm ui && pnpm admin，
 * 否则 pnpm ui会阻塞 pnpm admin，
 * 需要使用 exec 先执行 pnpm ui，监听它的输出，
 * 如果输出了 built in 表示编译结束，就执行 pnpm admin，
 * pnpm ui 会监听文件变化，然后重新编译，
 * 重新编译后也会输出 built in，所以第一次执行 pnpm admin 即可。
 * windows上是\u001b[36mbuilt in，mac上是built in。
 */

import { exec } from 'child_process'

function ex(cmd: string, callback?: Function) {
  const child = exec(cmd)

  child?.stdout?.on('data', function (data) {
    console.log(data)
    if (callback) callback(data)
  })
  child?.stderr?.on('data', function (data) {
    console.log(data)
  })
  child.on('close', function (code) {
    console.log('closing code: ' + code)
  })
}

let firstUIBuild = true
ex('pnpm sv')
ex('pnpm ui', (data: string) => {
  if (!firstUIBuild) return

  if (data.startsWith('\u001b[36mbuilt in') || data.startsWith('built in')) {
    ex('pnpm admin')
    firstUIBuild = false
  }
})
