<template>
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="Activity name" prop="name.desktop">
      <el-input v-model="form.name.desktop" />
      <!-- <input v-model="form.name.desktop" @blur="submitForm(ruleFormRef)" /> -->
    </el-form-item>
    <el-form-item label="Activity form" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button type="primary" @click="ajvSubmitForm(ruleFormRef)"> ajv validate </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import { ref } from 'vue'

const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'widget'],
})
AjvErrors(ajv)

const ruleFormRef = ref()

const schema = ref({
  type: 'object',
  required: ['name', 'desc'],
  properties: {
    name: {
      type: 'object',
      required: ['desktop', 'mobile'],
      properties: {
        desktop: {
          widget: 'config-input',
          type: 'string',
          title: '姓',
          default: '',
          placeholder: '请输入',
          minLength: 1,
          maxLength: 5,
          //   pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
          errorMessage: {
            required: '最少1个字符',
            minLength: '最少1个字符',
            maxLength: '最多5个字符',
            pattern: '没通过哈哈',
          },
          rules: [
            { required: true, min: 1, message: '最少1个字符', trigger: 'blur' },
            { max: 5, message: '最多5个字符', trigger: 'change' },
          ],
        },
        mobile: {
          widget: 'config-input',
          type: 'string',
          title: '姓',
          default: '',
          placeholder: '请输入',
          minLength: 1,
          maxLength: 5,
          //   pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
          errorMessage: {
            required: '最少1个字符',
            minLength: '最少1个字符',
            maxLength: '最多5个字符',
            pattern: '没通过哈哈',
          },
          rules: [
            { required: true, min: 1, message: '最少1个字符', trigger: 'blur' },
            { max: 5, message: '最多5个字符', trigger: 'change' },
          ],
        },
      },
    },
    desc: {
      widget: 'config-input',
      type: 'string',
      title: '名',
      default: '',
      rules: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
    },
  },
})

const transfer = (b, key = 'default') => {
  return Object.fromEntries(
    Object.entries(b.properties).map(([keyP, valueP]) => {
      if (valueP.properties) return [keyP, transfer(valueP, key)]
      return [keyP, valueP[key]]
    }),
  )
}

const form = ref(transfer(schema.value, 'default'))

const rules = transfer(schema.value, 'rules')

const ajvSubmitForm = () => {
  const validate = ajv.compile(schema.value)
  const valid = validate(form.value)
  if (!valid) {
    console.warn(
      'ajv error: ',
      validate.errors[0].instancePath + validate.errors[0].message,
      form.value,
    )
    return
  }
  console.log('ajv submit!')
}

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('form submit!')
      return
    }
    console.log('error submit!', fields)
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
