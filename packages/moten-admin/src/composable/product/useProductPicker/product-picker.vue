<template>
  <div class="pd-product-picker-container">
    <el-drawer v-model="state.visible" :with-header="false" size="90%" @closed="reset">
      <div class="pd-product-picker" v-loading="state.loading">
        <div class="pd-product-picker__hd">
          <div class="pd-product-picker__selection-list">
            <template v-if="state.selection.length">
              <el-tooltip placement="bottom" :show-arrow="false" effect="light">
                <div class="fz-14">
                  已选择：<el-tag type="danger">{{ state.selection.length }}个商品</el-tag>
                </div>
                <template #content>
                  <el-tag
                    v-for="(item, index) in state.selection"
                    :key="item.sku"
                    closable
                    disable-transitions
                    @close="onUnSelect(item, index)"
                    class="m-r-10 m-t-5"
                  >
                    <el-tooltip
                      v-if="item.name"
                      class="box-item"
                      effect="dark"
                      :content="item.sku"
                      placement="top"
                    >
                      {{ item.name }}
                    </el-tooltip>
                    <template v-else>{{ item.sku }}</template>
                  </el-tag>
                </template>
              </el-tooltip>
            </template>
            <div v-else class="fz-14">请选择商品</div>
          </div>
          <div class="controls">
            <el-select
              v-model="state.params.visibility"
              placeholder="是否可见"
              style="width: 150px"
              @change="init"
            >
              <el-option value="0" label="全部显示"></el-option>
              <el-option value="1" label="Not Visible Individually"></el-option>
              <el-option value="2" label="Catalog"></el-option>
              <el-option value="3" label="Search"></el-option>
              <el-option value="4" label="Catalog, Search"></el-option>
            </el-select>

            <el-select
              v-model="state.params.status"
              placeholder="上下架商品显示"
              style="width: 150px"
              @change="init"
            >
              <el-option value="0" label="显示全部商品"></el-option>
              <el-option value="1" label="只显示上架商品"></el-option>
              <el-option value="2" label="只显示下架商品"></el-option>
            </el-select>
            <el-select
              v-model="state.params.sortDir"
              placeholder="排序方式"
              style="width: 130px"
              @change="init"
            >
              <el-option value="desc" label="创建时间逆序"></el-option>
              <el-option value="asc" label="创建时间正序"></el-option>
            </el-select>
            <el-cascader
              v-model="state.params.categoryId"
              placeholder="商品分类筛选"
              :options="state.categoryTree"
              :props="cascaderProps"
              :show-all-levels="false"
              filterable
              clearable
              style="width: 220px"
              @change="getList"
            >
              <template #default="scope: any">
                <span
                  :class="[
                    `pd-product-picker__category-item`,
                    { inactive: scope.data.isactive === '0' },
                  ]"
                  >{{ scope.data.name }}</span
                >
              </template>
            </el-cascader>
            <el-input
              v-model="state.params.keywords"
              placeholder="搜索"
              class="pd-product-picker__input-search"
              clearable
              style="width: 400px"
              @change="init"
            >
              <template #prepend>
                <el-select
                  v-model="state.params.searchKey"
                  placeholder="搜索类型"
                  style="width: 130px"
                  @change="onChangeSearchKey"
                >
                  <el-option value="sku" label="搜索SKU"></el-option>
                  <el-option value="name" label="搜索商品名称"></el-option>
                </el-select>
              </template>
              <template #append>
                <el-button :icon="Search" @click="init" />
              </template>
            </el-input>
          </div>
        </div>
        <div class="pd-product-picker__bd">
          <el-table :data="state.productList" stripe max-height="calc(100vh - 53px - 53px)">
            <el-table-column label="#" min-width="60px" align="center">
              <template #default="scope: any">
                <el-checkbox
                  style="margin-bottom: 0"
                  v-model="selectionChecked[scope.$index]"
                  size="large"
                  @change="(e) => onSelectChange(e, scope.row, scope.$index)"
                />
                <!--                <input-->
                <!--                  type="checkbox"-->
                <!--                  class="input-selection-checkbox"-->
                <!--                  :checked="selectionChecked[scope.$index]"-->
                <!--                  @change="e => onSelectChange(e, scope.row, scope.$index)"-->
                <!--                />-->
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" min-width="70px" align="center" />
            <el-table-column label="Thumbnail" min-width="100px" align="center">
              <template #default="scope: any">
                <el-image
                  class="img-thumbnail"
                  style="width: 50px"
                  :src="scope.row.thumbnail"
                  hide-on-click-modal
                  fit="cover"
                />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="Name" min-width="220px" show-overflow-tooltip />
            <el-table-column label="Type" min-width="200px" show-overflow-tooltip>
              <template #default="scope: any">
                <span class="col-type">{{ scope.row.type }} product</span>
              </template>
            </el-table-column>
            <el-table-column label="Price" min-width="100px" align="center" show-overflow-tooltip>
              <template #default="scope: any">
                <span class="col-price">{{
                  scope.row.price ? formatPrice(scope.row.price) : '---'
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="sku"
              label="SKU"
              min-width="180px"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="Salable Quantity" min-width="200px" align="center">
              <template #default="scope: any">
                <div class="col-quantity">
                  <span v-for="item in scope.row.salable_quantity" :key="item.stock_name">
                    <b>{{ item.stock_name }}: </b>{{ item.qty }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Status" min-width="100px" align="center">
              <template #default="scope: any">
                <span class="col-status">
                  {{ scope.row.status === '1' ? 'Enable' : 'Disable' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="websites" label="Websites" min-width="200px" align="center" />
          </el-table>
        </div>
        <div class="pd-product-picker__ft">
          <div class="pagination">
            <el-pagination
              v-model:current-page="state.params.page"
              v-model:page-size="state.params.pageSize"
              background
              layout="prev, pager, next"
              :page-count="state.totalPages"
              @current-change="getList"
              @size-change="init"
            />
          </div>
          <div class="buttons">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  productPickerProps,
  productPickerEmits,
  PageDesignerProduct,
  ProductCategory,
  PageDesignerProductQueryParams,
} from './product-picker'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, reactive } from 'vue'
import './product-picker.scss'

const props = defineProps(productPickerProps)
const emit = defineEmits(productPickerEmits)

interface IState {
  loading: number
  /**
   * 是否显示弹窗
   */
  visible: boolean
  /**
   * 已选择的商品列表
   */
  selection: PageDesignerProduct[]
  /**
   * 商品列表
   */
  productList: PageDesignerProduct[]
  /**
   * 商品分类树
   */
  categoryTree: ProductCategory[]
  /**
   * 查询参数
   */
  params: PageDesignerProductQueryParams
  /**
   * 总页数
   */
  totalPages: number
}

const state: IState = reactive({
  loading: 0,
  visible: false,
  selection: [],
  productList: [],
  categoryTree: [],
  params: {
    page: 1,
    pageSize: 20,
    categoryId: undefined,
    searchKey: 'sku',
    keywords: '',
    sort: 'created_at',
    sortDir: 'desc',
    status: '1',
    visibility: '4',
    storeCode: '',
  },
  totalPages: 0,
})

const cascaderProps = {
  checkStrictly: true,
  expandTrigger: 'hover',
  emitPath: false,
  value: 'id',
  label: 'name',
  children: 'child',
}

/**
 * expose暴露给外部，用于打开弹窗
 */
const open = () => {
  state.visible = true
  getList()
  getCategoryTree()
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
  state.productList = []
  state.categoryTree = []
  state.params = {
    page: 1,
    pageSize: 20,
    categoryId: undefined,
    searchKey: 'sku',
    keywords: '',
    sort: 'created_at',
    sortDir: 'desc',
    status: '1',
    visibility: '4',
    storeCode: '',
  }
}

/**
 * 确认选择
 */
const confirm = () => {
  const params: any = {
    skus: state.selection.map((item) => {
      return item.sku
    }),
  }

  params.skus = params.skus.join(',')

  props.resetProductListFn(params).then((res: any) => {
    if (res.code === 1) {
      state.visible = false
      emit('change', res.data)
    } else {
      ElMessage(res.message || '数据获取错误，请重试')
    }
  })
}

const getList = async () => {
  state.loading++
  const res = await props.getProductListFn(state.params)
  if (res) {
    state.productList = res.item
    state.totalPages = res.totalPages
  }
  state.loading--
}

const getCategoryTree = async () => {
  state.loading++
  const res = await props.getProductCategoryFn()
  if (res) {
    state.categoryTree = res.category
  }
  state.loading--
}

const init = () => {
  state.params.page = 1
  getList()
}

const onUnSelect = (item: PageDesignerProduct, index: number) => {
  state.selection.splice(index, 1)
}

const onChangeSearchKey = () => {
  if (state.params.keywords) {
    init()
  }
}

const formatPrice = (price: string) => {
  if (!price) return '￥0'
  let priceFormated = price.toString()
  const dotIndex = priceFormated.indexOf('.')
  if (dotIndex > -1) {
    const priceArr = priceFormated.split('.')
    if (priceArr[1].length >= 2) {
      priceArr[1] = priceArr[1].substring(0, 2)
    }
    priceFormated = priceArr.join('.')
  }
  priceFormated = '￥' + priceFormated
  return priceFormated
}

const selectionChecked = computed<boolean[]>(() => {
  const skus = state.selection.map((x) => x.sku)
  const val = state.productList.map((x) => skus.includes(x.sku))
  return val
})

const onSelectChange = (e: any, row: PageDesignerProduct, index: number) => {
  // const inputCheckbox = e.target
  const checked = e

  if (props.multiple) {
    if (checked) {
      if (state.selection.length < props.max) {
        state.selection.push(row)
      } else {
        state.selection.shift()
        state.selection.push(row)
      }
    } else {
      const index = state.selection.findIndex((x) => x.sku === row.sku)
      state.selection.splice(index, 1)
    }
  } else {
    if (checked) {
      state.selection = [row]
    } else {
      state.selection = []
    }
  }
}

defineExpose({
  open,
})
</script>
