<template>
  <div class="pd-file-picker-container">
    <el-drawer v-model="state.visible" :with-header="false" size="90%" @closed="reset">
      <div class="pd-file-picker" v-loading="state.loading">
        <div class="pd-file-picker__left">
          <el-scrollbar height="100%">
            <Tree
              :data="state.folderTree"
              node-key="path"
              :current-key="state.currentFolder?.path ?? ''"
              @node-click="(val: any) => toggleFolder(val)"
            >
              <span class="icon-folder"></span>
            </Tree>
          </el-scrollbar>
        </div>
        <div class="pd-file-picker__right">
          <el-scrollbar height="100%">
            <div class="pd-file-picker__hd">
              <div class="pd-file-picker__hd-btns">
                <input
                  type="file"
                  multiple
                  hidden
                  ref="inputUpload"
                  :accept="props.accept"
                  :key="inputFileSeed"
                  @change="onUploadChange"
                />
                <el-button
                  v-if="state.isCreateRoot || state.currentFolder.path"
                  @click="onCreateFolder"
                  ><span class="icon-folder"></span>新建文件夹</el-button
                >
                <el-button type="primary" :icon="Upload" @click="onUpload">上传文件</el-button>
                <el-button
                  type="danger"
                  :icon="Delete"
                  :disabled="!state.selection.length"
                  @click="onDelete"
                  >删除选中</el-button
                >
              </div>
              <div class="pd-file-picker__hd-search">
                <el-input v-model="state.keywords" placeholder="搜索" :prefix-icon="Search" />
              </div>
            </div>
            <div class="pd-file-picker__bd">
              <div
                v-for="item in filterList"
                :key="item.name"
                :class="[
                  `pd-file-picker__list-item`,
                  { active: state.selection.some((x) => x.url === item.url) },
                ]"
                @click="onSelect(item)"
                @dblclick="onDoubleClick(item)"
                @contextmenu="(e: Event) => onShowContext(e, item)"
              >
                <button class="btn-context" @click="(e: Event) => onShowContext(e, item)">
                  <el-icon><CaretBottom /></el-icon>
                </button>
                <el-image
                  v-if="canPreviewExts.includes(item.ext)"
                  :src="item.url"
                  fit="cover"
                  lazy
                  @load="(e: Event) => onSetWidthHeight(e, item)"
                >
                  <template #error v-if="item.ext">
                    <div class="el-image__error pd-file-picker__ext">
                      {{ item.ext.replace('.', '') }}
                    </div>
                  </template>
                </el-image>
                <el-image
                  v-else
                  :src="item.url"
                  fit="cover"
                  lazy
                  @load="(e: Event) => onSetWidthHeight(e, item)"
                >
                  <template #error v-if="item.ext">
                    <div class="el-image__error pd-file-picker__ext">
                      {{ item.ext.replace('.', '') }}
                    </div>
                  </template>
                </el-image>
                <div class="file-meta">
                  <span>{{ calcSize(item.size) }}</span>
                  <span v-if="item.width">{{ `${item.width} x ${item.height}` }}</span>
                </div>
                <div class="file-name">{{ item.name }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button :disabled="state.loading" @click="close">取消</el-button>
          <el-button type="primary" :disabled="state.loading" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <el-dialog
      v-model="state.uploadDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="上传进度"
      width="500px"
      class="dialog-upload-status"
      :before-close="onBeforeCloseUploadDialog"
      @closed="onUploadDialogClosed"
    >
      <div class="dialog-upload-status__list">
        <div
          v-for="(item, index) in uploadFileList"
          :key="index"
          class="dialog-upload-status__item"
        >
          <span class="dialog-upload-status__file" :title="item.name">
            <span class="dialog-upload-status__file-name">{{ item.name }}</span>
            <span class="dialog-upload-status__file-size">{{ calcSize(item.size) }}</span>
          </span>
          <el-progress
            :percentage="uploadFileInfo[index]?.progress || 0"
            :status="uploadFileInfo[index]?.status ?? ''"
          />
          <el-icon><Close v-if="!uploadFileInfo[index]?.status" @click="onAbort(index)" /></el-icon>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import './file-picker.scss'
import {
  filePickerProps,
  filePickerEmits,
  type PageDesignerFile,
  type PageDesignerFolder,
} from './file-picker'
import { computed, h, reactive, ref } from 'vue'
import asyncPool from 'tiny-async-pool'
import { AxiosProgressEvent } from 'axios'
import { useMagicKeys } from '@vueuse/core'
import { ElMessageBox, ElMessage, ElIcon } from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/icon/style/css'
import { Delete, Search, Upload, CaretBottom, ZoomIn, Close } from '@element-plus/icons-vue'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu, { MenuItem } from '@imengyu/vue3-context-menu'
import { getImageInfo, getVideoInfo, isVideo } from '@/utils/utils'
import { Tree } from '../../components'

interface IState {
  loading: boolean
  /**
   * 是否显示弹窗
   */
  visible: boolean
  /**
   * 已选择的文件列表
   */
  selection: PageDesignerFile[]
  /**
   * 文件夹树
   */
  folderTree: PageDesignerFolder[]
  /**
   * 当前所选择的文件夹
   */
  currentFolder: PageDesignerFolder | undefined
  /**
   * 当前文件夹内的文件列表
   */
  fileList: PageDesignerFile[]
  /**
   * 文件筛选关键词
   */
  keywords: string
  /**
   * 上传进度弹窗
   */
  uploadDialogVisible: boolean
  /**
   * 根目录是否可以创建文件夹
   */
  isCreateRoot: boolean
}
/**
 * 用于记录上传文件的状态信息
 */
interface IUploadFileInfo {
  /**
   * 上传进度
   */
  progress: number
  /**
   * 中断控制器
   */
  controller: AbortController | undefined
  /**
   * 上传状态
   */
  status?: 'success' | 'exception'
}

const props = defineProps(filePickerProps)
const emit = defineEmits(filePickerEmits)

const state: IState = reactive({
  loading: false,
  visible: false,
  selection: [],
  folderTree: [],
  currentFolder: undefined,
  fileList: [],
  keywords: '',
  uploadDialogVisible: false,
  isCreateRoot: true,
})

const getValueInfo = async () => {
  for (const item of state.selection) {
    const { width, height }: any = isVideo(item.url)
      ? await getVideoInfo(item.url)
      : await getImageInfo(item.url)
    item.width = width
    item.height = height
  }
  return state.selection
}

/**
 * 筛选后的文件列表
 */
const filterList = computed(() => {
  let list = state.fileList.filter((x) => x.name.includes(state.keywords))
  if (props.exts) {
    list = list.filter((x) => props.exts.includes(x.ext))
  }
  return list
})

/**
 * expose暴露给外部，用于打开弹窗
 */
const open = () => {
  state.visible = true
  // 初始化获取文件夹与文件
  toggleFolder()
}

/**
 * 关闭弹窗
 */
const close = () => {
  state.visible = false
  emit('cancel')
}

/**
 * 关闭弹窗重置状态
 */
const reset = () => {
  state.selection = []
  state.folderTree = []
  state.fileList = []
  state.keywords = ''
  state.currentFolder = undefined
}

/**
 * 确认选择文件
 */
const confirm = async () => {
  const val = await getValueInfo()
  state.visible = false
  emit('change', val)
}

/**
 * 切换文件夹
 */
const toggleFolder = async (folder?: PageDesignerFolder, force?: boolean) => {
  const hasChange = folder !== state.currentFolder
  const node = folder ?? {
    name: '根目录',
    path: '',
  }
  state.currentFolder = node
  if (node.children === undefined || force || hasChange) {
    state.loading = true
    const res = await props.getFolderAndFileListFn(node.path)
    state.loading = false
    if (res) {
      state.fileList = res.fileList
      node.children = res.folderList
      state.isCreateRoot = !res.isRootCreateDir
    }
  }
  if (!folder) {
    state.folderTree = [node]
  }
}

const onSetWidthHeight = (e: Event, item: PageDesignerFile) => {
  item.width = (e.target as HTMLImageElement)?.naturalWidth ?? 0
  item.height = (e.target as HTMLImageElement)?.naturalHeight ?? 0
}

/**
 * 文件尺寸单位换算
 * @param a 要转换的文件大小，单位Byte
 * @param b 要保留的小数位数，四舍五入，默认保留2位
 */
const formatBytes = (a: number, b: number = 2): string => {
  if (0 == a) return '0 B'
  var c = 1024,
    e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(a) / Math.log(c))
  return parseFloat((a / Math.pow(c, f)).toFixed(b)).toFixed(2) + ' ' + e[f]
}

// 文件尺寸单位换算
const calcSize = (size: number) => {
  return formatBytes(size, 2)
}

// multiple为true时，按住control或command按键进行多选
const { control, meta } = useMagicKeys()

// 选中文件
const onSelect = (item: PageDesignerFile) => {
  const index = state.selection.findIndex((x) => x === item)
  if (index > -1) {
    state.selection.splice(index, 1)
  } else {
    if (props.multiple && (control.value || meta.value)) {
      state.selection.push(item)
    } else {
      state.selection = [item]
    }
  }
}

const onDoubleClick = async (item: PageDesignerFile) => {
  onSelect(item)
  const val = await getValueInfo()
  state.visible = false
  emit('change', val)
}

// 原生 input file ref
const inputUpload = ref()
// 点击上传按钮
const onUpload = () => {
  inputUpload.value.click()
}

// 选择文件
const onUploadChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement)?.files ?? []
  if (!files.length) return
  const valueInfo = Array.from(files)
  let item: any
  for (item of valueInfo) {
    const { width, height }: any = isVideo(item.name)
      ? await getVideoInfo(item)
      : await getImageInfo(item)
    item.width = width
    item.height = height
  }

  uploadFileList.value = Array.from(files)
  state.uploadDialogVisible = true
  // 异步并发控制
  for await (const res of asyncPool(2, uploadFileList.value, taskCreator)) {
    // noop
  }
  state.loading = false
}
// 需上传的文件数组
const uploadFileList = ref<File[]>([])
// 中断控制器与进度
const uploadFileInfo = ref<IUploadFileInfo[]>([])
// 异步并发上传队列工厂函数
const taskCreator = (file: File) => {
  return new Promise<boolean>((resolve, reject) => {
    const index = uploadFileList.value.findIndex((x) => x === file)
    const controller = new AbortController()
    if (index > -1) {
      uploadFileInfo.value[index] = {
        controller,
        progress: 0,
      }
    }
    props
      .uploadFn(file, state.currentFolder?.path ?? '', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal,
        onUploadProgress: (e: AxiosProgressEvent) => {
          if (e.progress) {
            const progress = Number((e.progress * 100).toFixed(2))
            uploadFileInfo.value[index].progress = progress
            if (progress >= 100) {
              uploadFileInfo.value[index].status = 'success'
            }
          }
        },
      })
      .then((res: boolean) => {
        resolve(res)
      })
      .catch((err: any) => {
        uploadFileInfo.value[index].status = 'exception'
        reject(err)
      })
  })
}

// 关闭上传进度弹窗，中断上传
const onBeforeCloseUploadDialog = (done: Function) => {
  if (uploadFileInfo.value.some((x) => x.status !== 'success')) {
    ElMessageBox.confirm('是否中断上传?', 'Warning', {
      confirmButtonText: '确 定',
      cancelButtonText: '取 消',
      type: 'warning',
    })
      .then(() => {
        uploadFileInfo.value.forEach((item) => item.controller?.abort())
        done()
      })
      .catch(() => {})
  } else {
    done()
  }
}

// 点击上传进度后的 x，中断单个文件的上传
const onAbort = (index: number) => {
  ElMessageBox.confirm(`是否中断上传“${uploadFileList.value[index].name}”?`, 'Warning', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
    .then(() => {
      if (uploadFileInfo.value[index].status !== 'success') {
        uploadFileInfo.value[index].controller?.abort()
        uploadFileInfo.value.splice(index, 1)
        uploadFileList.value.splice(index, 1)
      }
    })
    .catch(() => {})
}

const inputFileSeed = ref(0)

// 关闭上传进度弹窗后刷新并重置文件列表与待上传文件列表
const onUploadDialogClosed = () => {
  toggleFolder(state.currentFolder, true)
  uploadFileList.value = []
  inputFileSeed.value++
}

const deleteTaskCreator = (params: { name: string; id?: string | number }) => {
  return new Promise<boolean>((resolve, reject) => {
    props.deleteFileFn(params).then(resolve).catch(reject)
  })
}

// 删除文件
const onDelete = (item?: PageDesignerFile) => {
  if (!state.selection.length && !item) return
  ElMessageBox.confirm('确认删除?', 'Warning', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
    .then(async () => {
      state.loading = true
      const folder =
        state.currentFolder && state.currentFolder.path
          ? state.currentFolder.path.endsWith('/')
            ? state.currentFolder.path
            : `${state.currentFolder.path}/`
          : ''
      const isEvent = item instanceof Event
      const filePaths = (item && !isEvent ? [item] : state.selection).map((x: any) => {
        return {
          id: x.id,
          name: `${folder}${x.name}`,
        }
      })

      try {
        const results: boolean[] = []
        for await (const res of asyncPool(2, filePaths, deleteTaskCreator)) {
          results.push(res)
        }
        if (results.some((x) => !x)) {
          ElMessage.error('删除文件出错')
        } else {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
        }
      } catch (error) {
        ElMessage.error('删除请求出错')
        console.error('删除请求出错', error)
      } finally {
        toggleFolder(state.currentFolder, true)
        state.loading = false
      }
    })
    .catch(() => {})
}

// 创建文件夹
const onCreateFolder = () => {
  ElMessageBox.prompt('请输入文件夹名称', '新建文件夹', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    inputValidator: (val) => {
      if (!/^[a-zA-Z0-9-_]*$/.test(val)) {
        return '文件夹名称无效，请重新输入'
      }
      if (state.currentFolder?.children?.find((x) => x.name === val)) {
        return `文件夹“${val}”已存在，请重新输入`
      }
      return true
    },
  })
    .then(async ({ value }) => {
      state.loading = true
      const folder =
        state.currentFolder && state.currentFolder.path
          ? state.currentFolder.path.endsWith('/')
            ? state.currentFolder.path
            : `${state.currentFolder.path}/`
          : ''
      const path = `${folder}${value}`
      try {
        const res = await props.createFolderFn(path)
        if (!res) {
          ElMessage.error('创建失败')
        } else {
          ElMessage({
            message: '创建成功',
            type: 'success',
          })
        }
      } catch (error) {
        ElMessage.error('请求出错，创建失败')
      } finally {
        toggleFolder(state.currentFolder, true)
        state.loading = false
      }
    })
    .catch(() => {})
}

const canPreviewExts: string[] = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.svg',
  '.webp',
  '.tiff',
  '.raw',
  '.mp4',
  '.pdf',
]

const onShowContext = (e: Event, item: PageDesignerFile) => {
  e.preventDefault()
  e.stopPropagation()
  const menus: MenuItem[] = []
  const ext = item.ext.toLowerCase()
  const previewLabel = canPreviewExts.includes(ext) ? '预览' : '下载'
  menus.push({
    label: previewLabel,
    icon: h(ZoomIn),
    onClick: () => {
      window.open(item.url)
    },
  })
  menus.push({
    label: `删除`,
    icon: h(Delete),
    onClick: async () => {
      onDelete(item)
    },
  })
  ContextMenu.showContextMenu({
    x: (e as PointerEvent).x,
    y: (e as PointerEvent).y,
    zIndex: 9999,
    items: menus,
  })
}

defineExpose({
  open,
})
</script>
