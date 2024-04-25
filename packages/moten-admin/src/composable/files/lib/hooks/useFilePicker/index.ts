import { h, render } from 'vue'
import {
  type FilePickerProps,
  type PageDesignerFilePickerConfig,
  type PageDesignerFile,
} from './file-picker'
import FilePicker from './file-picker.vue'

export * from './file-picker'

export type UseFilePickerOptions = Partial<Pick<FilePickerProps, 'multiple' | 'accept'>>

const div = document.createElement('div')
document.body.appendChild(div)

export const useFilePicker = (config: PageDesignerFilePickerConfig) => {
  const open = (options?: UseFilePickerOptions) =>
    new Promise<PageDesignerFile[] | null>(resolve => {
      const NODE = h(FilePicker, {
        ...config,
        ...options,
        onChange: (val: PageDesignerFile[]) => {
          resolve(val)
        },
        onCancel: () => {
          resolve(null)
        },
      })
      render(NODE, div)

      NODE?.component?.exposed?.open()
    })
  return {
    open,
  }
}
