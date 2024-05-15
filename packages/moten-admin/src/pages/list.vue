<template>
  <div class="page-list-box p-v-20 p-r-20">
    <div class="page-list-box__header-name fw-500 fz-20 p-b-20">页面配置列表</div>
    <el-row :gutter="10" justify="space-between">
      <el-col :span="19">
        <div v-for="item in tabs" class="d-i-b">
          <el-button @click="createOpen" :type="item.type" class="page-list-box__button">
            {{ item.name }}
          </el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="searchText"
          @input="searchInfo"
          @keydown="() => searchInfo(searchText)"
          placeholder="请输入您要搜索的内容"
          :suffix-icon="search"
        />
      </el-col>
      <el-col :span="1">
        <el-button @click="searchInfo(searchText)" class="w-p-100" type="primary"> 搜索 </el-button>
      </el-col>
    </el-row>
  </div>
  <div class="m-r-20 clearfix">
    <el-table
      v-loading="tableLoading"
      max-height="calc(100vh - 192px)"
      :stripe="true"
      @sort-change="sortChange"
      @filter-change="filterHandler"
      :data="tableInfo.data"
      style="width: 100%"
    >
      <el-table-column
        v-for="item in tableColumn"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :filters="item.filters"
        :fixed="item.fixed"
      >
        <template #default="scope">
          <div v-if="item.prop === 'title'">
            <div>{{ scope.row.title }}</div>
            <div class="c-9">页面ID: {{ scope.row.id }}</div>
          </div>
          <div v-if="item.prop === 'webTypeCode'">
            <div>官网</div>
          </div>
          <el-tag v-if="item.prop === 'status'" :type="scope.row.statusColor" disable-transitions>
            {{ scope.row.status }}
          </el-tag>
          <div class="page-list-box__edit" v-if="item.prop === 'edit'">
            <div class="d-i-b item" @click="">预览</div>
            <el-tooltip effect="dark" content="修改信息" placement="top">
              <div @click="" class="d-i-b item m-l-10">修改</div>
            </el-tooltip>
            <el-tooltip effect="dark" content="进入组件编辑页面" placement="top">
              <div @click="" class="d-i-b m-l-10 item">编辑</div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              :content="`更改状态为[${String(scope.row.statusCode) === '0' ? '已发布' : '未发布'}]`"
              placement="top"
            >
              <div
                class="d-i-b m-l-10 item"
                :class="{
                  'c-r': String(scope.row.statusCode) === '1',
                  'g-r': String(scope.row.statusCode) === '0',
                }"
                @click=""
              >
                {{ String(scope.row.statusCode) === '0' ? '未发布' : '已发布' }}
              </div>
            </el-tooltip>
            <el-dropdown>
              <div class="d-i-b m-t-3 m-l-10 item">
                更多
                <el-icon class="el-icon--right icon">
                  <arrow-down />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click=""> 复制 </el-dropdown-item>
                  <el-dropdown-item class="c-r" @click=""> 删除 </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-20 f-r">
      <el-pagination
        small
        background
        :page-sizes="[10, 50, 100, 150, 200]"
        layout="sizes, prev, pager, next, jumper, total"
        :total="200"
        class="mt-4"
        @size-change="(e: any) => paginationChange('size', e)"
        @current-change="(e: any) => paginationChange('page', e)"
      />
    </div>
  </div>

  <el-dialog v-model="isCreateOpen" title="请选择配置项" width="30%" align-center>
    <el-form label-position="top" ref="formRef" :rules="{}" :model="askParams">
      <el-form-item v-for="item in createAsk" :prop="item.key" :label="item.label">
        <el-input
          v-if="item.type === 'input'"
          :disabled="item.disabled"
          v-model="askParams[item.key]"
          :placeholder="item.placeholder"
        />
        <el-select
          v-if="item.key === 'webTypeCode'"
          v-model="askParams[item.key]"
          :placeholder="item.placeholder"
        >
          <el-option v-for="it in item.data" :label="it.name" :value="it.code" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isCreateOpen = false">取消</el-button>
        <el-button type="primary" @click=""> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { nanoid } from '@/utils/index'
import { Search as searchIcon } from '@element-plus/icons-vue'

const isCreateOpen = ref(false)
const tableLoading = ref(false)
const searchText = ref('')
const search = ref(searchIcon)
const tabs = ref([
  {
    name: '新建',
    key: 'create',
    type: 'primary',
  },
])
const askParams = ref({
  identifier: nanoid(10),
  title: '',
  description: '',
  webTypeCode: '',
})
const saveParams = ref({})
const tableInfo = ref({
  page: 1,
  data: [],
  totalPages: 0,
  pageSize: 10,
})
const tableColumn = ref([
  {
    prop: 'title',
    label: '页面名称',
    width: 140,
    fixed: true,
  },
  {
    prop: 'identifier',
    label: '页面唯一值',
    width: 140,
  },
  {
    prop: 'webTypeCode',
    label: '渠道',
    width: 200,
  },
  {
    prop: 'description',
    label: '页面描述',
    width: 250,
  },
  {
    prop: 'username',
    label: '最后修改人',
    width: 120,
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    sortable: true,
    width: 200,
  },
  {
    prop: 'saveFinalContentTime',
    label: '发布时间',
    sortable: true,
    width: 200,
  },
  {
    prop: 'updatedAt',
    label: '最后修改时间',
    sortable: true,
    width: 200,
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'edit',
    label: '操作',
    width: 250,
    fixed: 'right',
  },
])
const createAsk = ref([
  {
    type: 'input',
    key: 'identifier',
    label: '配置ID',
    placeholder: '请输入名称',
    rules: [
      {
        required: true,
        message: '请输入唯一标识',
        trigger: 'change',
      },
    ],
  },
  {
    type: 'input',
    key: 'title',
    label: '配置标题',
    placeholder: '请输入名称',
    rules: [
      {
        required: true,
        message: '请输入标题信息',
        trigger: 'change',
      },
      {
        required: true,
        min: 2,
        message: '输入信息要大于2个字',
        trigger: 'change',
      },
    ],
  },
  {
    type: 'input',
    key: 'description',
    label: '配置描述',
    placeholder: '请输入描述',
  },
  {
    type: 'select',
    key: 'webTypeCode',
    label: '渠道平台',
    placeholder: '请选择适用平台',
    data: [],
    rules: [
      {
        required: true,
        message: '请选择适用平台',
        trigger: 'change',
      },
    ],
  },
])

/**
 * 打开创建弹窗
 */
const createOpen = () => (isCreateOpen.value = true)

/**
 * 搜索
 */
const searchInfo = (e: any) => {
  searchText.value = e
  tableLoading.value = true
  const params = {
    page: 1,
    pageSize: tableInfo.value.pageSize,
    keywords: '',
  }
  if (e) params.keywords = e
}

/**
 * 排序
 */
const sortChange = (e: { prop: string; order: string }) => {
  const { prop, order } = e
  const params: any = {
    page: 1,
    pageSize: tableInfo.value.pageSize,
  }
  if (order) {
    params.sortDir = order === 'ascending' ? 'asc' : 'desc'
    if (prop === 'createdAt') {
      params.sort = 'created_at'
    } else if (prop === 'updatedAt') {
      params.sort = 'updated_at'
    }
  }
  tableLoading.value = true
}

/**
 * 筛选
 */
const filterHandler = (e: any) => {
  const params: any = {
    page: 1,
    pageSize: tableInfo.value.pageSize,
  }
  // table只有状态才可以做筛选 写死当前位置
  if (Object.values(e) && Object.values(e)[0]) {
    const info: any = Object.values(e)[0]
    if (info && Object.values(info) && Object.values(info).length > 0) {
      params.filter = Object.values(info).join(',')
    }
  }

  tableLoading.value = true
}

/**
 * 分页
 */
const paginationChange = (type: string, e: any) => {
  const params: any = Object.assign({}, saveParams)

  if (type === 'page') {
    params.page = e
    params.pageSize = tableInfo.value.pageSize
    tableInfo.value.page = e
  } else if (type === 'size') {
    params.page = tableInfo.value.page
    params.pageSize = e
    tableInfo.value.pageSize = e
  }

  tableLoading.value = true
}
</script>

<style lang="scss" scoped></style>
