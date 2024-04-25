<template>
  <div>
    <el-form-item size="small" :label="label" :required="required">
      <el-radio-group v-model="radioLabel" @change="radioChange">
        <el-radio-button
          v-for="(item, index) in radioList"
          :key="index"
          :label="item.label"
          :name="item.id"
        />
      </el-radio-group>
    </el-form-item>
    <div>
      <products
        :productList="productList"
        :maxProduct="Number(currentRadio.productNum)"
        :multiple="true"
        :callback="productCallback"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from 'vue'
import Products from './config-product-select.vue'

interface State {
  label: string
  required: boolean
  productList: any[]
  radioList: {
    id: string | number
    label: string | number
  }[]
  radioLabel: string | number
  currentRadio: {
    id: string | number
    label: string | number
    productNum: number
  }
}

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Object,
      default: () => {},
    },
    skus: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Products,
  },
  setup(props: any, context: any) {
    const state: State = reactive({
      label: props.data?.label,
      required: false,
      productList: [],
      radioList: [],
      radioLabel: '',
      currentRadio: {},
    })

    const findRadioInfo = (options: { type: 'id' | 'label'; data: string | number }) => {
      const radio: any = state.radioList.find((item) => item[options.type] === options.data)
      if (radio) {
        state.currentRadio = radio
      }
      return state.currentRadio
    }

    const emit = () => {
      const skus = state.productList.map((v: any) => v.sku)
      context.emit('callback', {
        type: 'private-unit-products',
        key: props.data.key,
        value: JSON.stringify({
          model: state.currentRadio ? state.currentRadio.id : '',
          $skus: {
            skuProducts: state.productList,
            skus,
          },
        }),
      })
    }

    const productCallback = (options: { type: string; product: any }) => {
      if (options.type === 'add') {
        state.productList = state.productList.concat(options.product)
        if (state.productList.length > state.currentRadio.productNum) {
          const num = state.productList.length - state.currentRadio.productNum
          for (let i = 0; i < num; i += 1) {
            state.productList.shift()
          }
        }
        // if (state.currentRadio?.id?.toString() === '2') {
        //   const concat = state.productList.concat(options.product);
        //   if (concat.length > 2) {
        //     state.productList = [
        //       concat[concat.length - 2],
        //       concat[concat.length - 1]
        //     ];
        //   } else {
        //     state.productList = concat;
        //   }
        // } else {
        //   state.productList = options.product;
        // }
      } else {
        state.productList = options.product
      }

      emit()
    }

    const init = () => {
      if (props.data) {
        if (props.data.radioList) {
          state.radioList = props.data.radioList
        }
        if (props.data.defaultValue) {
          const findLabel = findRadioInfo({
            type: 'id',
            data: props.data.defaultValue,
          })
          if (findLabel) {
            state.radioLabel = findLabel.label
          }
        }
      }

      if (props.formData.productInfo) {
        try {
          const productInfo = JSON.parse(props.formData.productInfo)
          if (productInfo.model) {
            const findLabel = findRadioInfo({
              type: 'id',
              data: productInfo.model,
            })
            if (findLabel) {
              state.radioLabel = findLabel.label
            }
          }

          if (productInfo.$skus) {
            const product: any = []
            productInfo.$skus.skus.forEach((item: string) => {
              product.push(props.skus[item] || {})
            })

            state.productList = product
          }
        } catch (e) {
          console.log('e: ', e)
        }
      }
    }

    const radioChange = (e: string) => {
      state.radioLabel = e
      findRadioInfo({
        type: 'label',
        data: e,
      })
      state.productList = state.productList.filter((item, index) => {
        return index < Number(state.currentRadio?.productNum)
      })

      emit()
    }

    init()

    watch(props, () => {
      init()
    })

    return {
      productCallback,
      radioChange,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss"></style>
