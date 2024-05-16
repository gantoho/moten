<template>
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity form" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import Ajv from 'ajv'
import { ref } from 'vue'

const ajv = new Ajv()
ajv.addKeyword({
  keyword: ['placeholder', 'rules'],
})

const ruleFormRef = ref()

const schema = ref({
  type: 'object',
  required: ['name', 'desc'],
  properties: {
    name: {
      type: 'string',
      title: '姓',
      default: '',
      placeholder: '请输入',
      rules: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'change' },
      ],
    },
    desc: {
      type: 'string',
      title: '名',
      default: '',
      rules: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
    },
  },
})

const form = ref(
  Object.fromEntries(
    Object.entries(schema.value.properties).map(([key, value]) => [key, value.default]),
  ),
)

const rules = Object.fromEntries(
  Object.entries(schema.value.properties).map(([key, value]) => [key, value.rules]),
)

const submitForm = async (formEl) => {
  if (!formEl) return

  const validate = ajv.compile(schema.value)
  const valid = validate(form.value)
  if (!valid) {
    console.log(validate.errors)
    return
  }

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
