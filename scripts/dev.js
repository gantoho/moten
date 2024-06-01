/**
 * 组件开发预览脚本
 *
 * 原理解析：
 * pnpm ui 和 pnpm editor 会同时监听文件，
 * 不能直接使用 pnpm ui && pnpm editor，
 * 否则 pnpm ui会阻塞 pnpm editor，
 * 需要使用 exec 先执行 pnpm ui，监听它的输出，
 * 如果输出了 built in 表示编译结束，就执行 pnpm editor，
 * pnpm ui 会监听文件变化，然后重新编译，
 * 重新编译后也会输出 built in，所以第一次执行 pnpm editor 即可。
 * windows上是\u001b[36mbuilt in，mac上是built in。
 */

import { exec } from 'child_process'

function ex(cmd, callback) {
  const ls = exec(cmd)

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
    if (callback) callback(data)
  })

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

function main() {
  let firstUIBuild = true
  ex('pnpm ui', (msg) => {
    if (!firstUIBuild) return
    if (msg.startsWith('\u001b[36mbuilt in') || msg.startsWith('built in')) {
      ex('pnpm editor')
      firstUIBuild = false
    }
  })
}

main()
