import * as VueQuill from '@vueup/vue-quill'
import { customAlphabet } from 'nanoid'

export const isVideo = (src: string) => {
  if (!src) return false
  return /.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i.test(src)
}

export const getImageInfo = (file: any) =>
  new Promise((resolve) => {
    const img = new Image()
    img.src = file
    if (typeof file !== 'string') {
      img.src = URL.createObjectURL(file)
    }
    img.onload = () => {
      URL.revokeObjectURL(img.src) // 释放URL对象引用
      resolve({
        width: img.width,
        height: img.height,
      })
    }
  })

export const getVideoInfo = (file: any) =>
  new Promise((resolve) => {
    // @ts-ignore
    const video = document.createElement('video')
    let url = file
    if (typeof file !== 'string') {
      url = URL.createObjectURL(file)
    }
    video.onloadedmetadata = () => {
      // Revoke when you don't need the url any more to release any reference
      URL.revokeObjectURL(url)
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      })
    }
    video.src = url
    video.load()
  })

const textNumber = () => {
  const textNumberList = []
  for (let i = 0; i < 63; i += 1) {
    textNumberList.push(i + 10)
  }
  return textNumberList
}

const textLineHeightNumber = () => {
  const textLineHeightNumberList = []
  for (let i = 0; i < 63; i += 1) {
    textLineHeightNumberList.push(i + 16)
  }
  return textLineHeightNumberList
}

export const nanoid: any = () => {
  const str = customAlphabet('1234567890qwertyuiopasdfghjklzxcbnm', 8)()
  if (str.toString().startsWith('0')) {
    return nanoid()
  }
  return str
}

export default {
  getAssetsMedia: (path: string): string => {
    return new URL(`../assets/${path}`, import.meta.url).pathname
  },
  textNumber,
  textLineHeightNumber,
  nanoid,
  quillTool: () => {
    const toolTextNum = textNumber().map((item) => `${item}px`)
    const parchment = VueQuill.Quill.import('parchment')

    const lineHeight = ['1', '1.5', '1.75', '2', '3', '4']

    const lineHeightStyle = new parchment.Attributor.Style('lineheight', 'line-height', {
      scope: parchment.Scope.INLINE,
      whitelist: lineHeight,
    })

    // const fonts = [
    //   // 'cms2-celine-en',
    //   'cms2-grotesk-text',
    //   // 'cms2-grotesk-text-bold',
    //   'cms2-grotesk-text-75Bd',
    //   // 'cms2-grotesk-text-55Rg',
    //   // 'cms2-grotesk-display-bold',
    //   // 'cms2-pingfang-sc',
    // ];

    //
    // const Font = VueQuill.Quill.import('attributors/style/font')
    // Font.whitelist = fonts;
    // VueQuill.Quill.register(Font, true)

    // VueQuill.Quill.imports['formats/font'].whitelist = fontFamily;
    // VueQuill.Quill.register(VueQuill.Quill.imports['formats/font'])

    VueQuill.Quill.imports['formats/size'].whitelist = toolTextNum
    VueQuill.Quill.register(VueQuill.Quill.imports['formats/size'])

    VueQuill.Quill.register(lineHeightStyle, true)

    return [
      ['bold', 'underline'], // toggled buttons
      // [{ 'font': Font.whitelist }],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      [{ size: toolTextNum }], // custom dropdown

      [{ color: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      [{ lineheight: lineHeight }],
    ]
  },
}
