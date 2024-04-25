/**
 * 当前配置仅做demo使用
 */
import axios, { AxiosRequestConfig } from 'axios'
import fetchApi from '@/utils/request'
import type { PageDesignerFilePickerConfig, PageDesignerFolder, GetListDto } from './lib'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
  [key: string]: any
}
//
// interface ListResponse {
//   files: ListResponseFile[]
//   dir: string[]
// }

interface ListResponseFile {
  id: string
  url: string
  size: number
  updatedAt: string
}

const mapToFolder = (val: string) => {
  return {
    name: val
      .split('/')
      .filter((x) => x && x !== '/')
      .at(-1)!,
    path: val,
  }
}
const mapToFile = (val: ListResponseFile) => {
  const urlObj = new URL(val.url)
  const name = urlObj.pathname.split('/').at(-1) ?? ''
  return {
    id: val.id,
    name,
    url: val.url,
    thumb: val.url,
    size: val.size,
    ext: name.substring(name.lastIndexOf('.'), name.length),
    updatedAt: val.updatedAt,
  }
}

export const pageDesignerFilePickerConfig: PageDesignerFilePickerConfig = {
  uploadFn: async (file: File, dir: string, config: AxiosRequestConfig) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('dir', dir)
    formData.append('isAjax', true)
    formData.append('form_key', window.LISTURLKEY.form_key)
    formData.append('width', file.width)
    formData.append('height', file.height)
    try {
      const res = await axios.post<ApiResponse<any>>(
        `/${window.LISTURLKEY.admin_key}/page_design/file/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          ...config,
        },
      )
      return res.code === 1
    } catch (error) {
      return false
    }
  },
  deleteFileFn: async (params: { name: string; id?: string | number }) => {
    try {
      const res = await fetchApi(
        `/${window.LISTURLKEY.admin_key}/page_design/file/deletefile`,
        'post',
        params,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      return res.code === 1
    } catch (error) {
      return false
    }
  },
  getFolderAndFileListFn: async (path: string) => {
    try {
      const res = await fetchApi(`/${window.LISTURLKEY.admin_key}/page_design/file/getdir`, {
        name: path,
      })
      if (res.code === 1) {
        const dto: GetListDto = {
          fileList: res.data?.files.map(mapToFile) ?? [],
          folderList: res.data?.dir.map(mapToFolder) ?? [],
          isRootCreateDir: !!res.data?.isRootCreateDir,
        }
        return dto
      }
      return false
    } catch (error) {
      return false
    }
  },
  createFolderFn: async (path: string) => {
    try {
      const res: any = await fetchApi(
        `/${window.LISTURLKEY.admin_key}/page_design/file/createdir`,
        'post',
        {
          name: path.endsWith('/') ? path : `${path}/`,
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      if (res.code === 1 && res.dirname) {
        const dir: string = res.dirname
        const folder: PageDesignerFolder = {
          name: dir.split('/').at(-1) ?? '',
          path: dir,
          children: undefined,
        }
        return folder
      }
      return false
    } catch (error) {
      return false
    }
  },
}
