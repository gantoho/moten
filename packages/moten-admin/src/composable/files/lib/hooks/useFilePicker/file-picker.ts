import { ExtractPropTypes, PropType } from 'vue'
import { type AxiosRequestConfig } from 'axios'

/**
 * 文件资源
 */
export interface PageDesignerFile {
  /**
   *文件ID
   */
  id?: string
  /**
   *文件名称
   */
  name: string
  /**
   * 文件url
   */
  url: string
  /**
   * 缩略图
   */
  thumb: string
  /**
   * 文件大小，单位字节 Byte
   */
  size: number
  /**
   * 文件扩展名
   */
  ext: string
  /**
   * 宽度
   */
  width?: number
  /**
   * 高度
   */
  height?: number
  /**
   * 最后更新时间
   */
  updateTime?: string
}

export interface GetListDto {
  fileList: PageDesignerFile[]
  folderList: PageDesignerFolder[]
  isRootCreateDir: boolean
}

/**
 * 文件夹对象
 */
export interface PageDesignerFolder {
  /**
   * 名称
   */
  name: string
  /**
   * 路径，如 `/foo/bar`
   */
  path: string
  /**
   * 子文件夹
   */
  children?: PageDesignerFolder[]
}

export interface PageDesignerFilePickerConfig {
  uploadFn: (file: File, dir: string, config: AxiosRequestConfig) => Promise<boolean>
  /**
   * 删除文件的方法
   * @param filePath 文件路径
   * @return `Promise<boolean>` 是否删除成功
   */
  deleteFileFn: (options: {name: string, id?: string | number}) => Promise<boolean>
  /**
   * 获取文件和文件夹列表的方法
   * @param path 文件夹路径
   * @return `Promise<{ fileList: PageDesignerFile[]; folderList: PageDesignerFolder[] }>` 文件和文件夹列表
   */
  getFolderAndFileListFn: (path: string) => Promise<GetListDto | false>
  /**
   * 创建文件夹的方法
   * @param path 文件夹路径
   * @return `Promise<string>` resolve创建成功的文件夹的路径
   */
  createFolderFn: (path: string) => Promise<PageDesignerFolder | false>
}

export const filePickerProps = {
  /**
   * 是否可多选
   */
  multiple: {
    type: Boolean,
    default: true
  },
  /**
   * 原生 input file 的 accept，默认为 `image/*`
   */
  accept: {
    type: String,
    default: 'image/*'
  },
  /**
   * 文件类型限制
   *
   * 传入扩展名数组，文件列表中将进行过滤，建议和 accept 所限制的文件类型保持相对统一以获得一致的使用体验
   */
  exts: {
    type: Array as PropType<string[]>
  },
  /**
   * 上传
   */
  uploadFn: {
    type: Function as PropType<PageDesignerFilePickerConfig['uploadFn']>,
    required: true
  },
  /**
   * 删除文件
   */
  deleteFileFn: {
    type: Function as PropType<PageDesignerFilePickerConfig['deleteFileFn']>,
    required: true
  },
  /**
   * 获取文件与文件夹列表
   */
  getFolderAndFileListFn: {
    type: Function as PropType<PageDesignerFilePickerConfig['getFolderAndFileListFn']>,
    required: true
  },
  /**
   * 创建文件夹
   */
  createFolderFn: {
    type: Function as PropType<PageDesignerFilePickerConfig['createFolderFn']>,
    required: true
  }
} as const

export type FilePickerProps = ExtractPropTypes<typeof filePickerProps>

export const filePickerEmits = {
  change: (val: PageDesignerFile[]) => Array.isArray(val),
  cancel: () => true
}
