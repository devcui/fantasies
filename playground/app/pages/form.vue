<script setup lang="ts">
import type { FormFieldProps, FormProps } from '#fantasies/types'
import type { FormSchema, FormSubmitEvent } from '@nuxt/ui'
import { h } from 'vue'
import z from 'zod'

// 复杂表单验证schema
const schema = z.object({
  name: z.string().min(1, '姓名不能为空').max(50, '姓名不能超过50个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  age: z.number().int().min(18, '年龄不能小于18岁').max(120, '年龄不能超过120岁'),
  role: z.string().min(1, '请选择角色'),
  department: z.array(z.string()).min(1, '请至少选择一个部门'),
  bio: z.string().optional(),
  isActive: z.boolean(),
  skills: z.array(z.string()).max(5, '最多选择5个技能'),
  salary: z.number().min(1000, '薪资不能低于1000').optional(),
  favoriteColor: z.string().optional(),
  experience: z.number().min(0).max(10, '经验不能超过10分').optional()
})

const state = reactive({
  name: '张三',
  email: 'zhangsan@example.com',
  age: 25,
  role: '',
  department: [],
  bio: '',
  isActive: true,
  skills: [],
  salary: 8000,
  favoriteColor: '#3b82f6',
  experience: 5
})

// 选项数据
const roleOptions = [
  '前端',
  '后端'
]

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
  { label: '运营部', value: 'operation' },
  { label: '市场部', value: 'marketing' }
]

const skillOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'Docker', value: 'docker' }
]

const form: FormProps = {
  schema: schema,
  state: state,
  inline: true,
  emits: {
    submit: (e: FormSubmitEvent<FormSchema>) => {
      console.log('表单提交事件:', e)
    }
  },
  fields: {
    name: {
      label: '姓名',
      required: true,
      description: '请输入您的真实姓名',
      widget: {
        modelValue: state.name,
        type: 'input',
        placeholder: '例如：张三',
        icon: 'i-heroicons-user',
        emits: {
          change: (value: any) => {
            console.log(value)
          }
        }
      }
    },
    email: {
      label: '邮箱地址',
      required: true,
      description: '用于接收重要通知',
      widget: {
        type: 'input',
        placeholder: 'zhangsan@example.com',
        icon: 'i-heroicons-envelope'
      }
    },
    age: {
      label: '年龄',
      required: true,
      help: '请输入您的真实年龄',
      widget: {
        type: 'input-number',
        placeholder: '请输入年龄',
        min: 18,
        max: 120
      }
    },
    role: {
      label: '职位角色',
      required: true,
      widget: {
        type: 'select-menu',
        placeholder: '请选择您的职位',
        items: roleOptions
      }
    },
    department: {
      label: '所属部门',
      required: true,
      description: '可以选择多个部门',
      widget: {
        type: 'checkbox-group',
        items: departmentOptions
      }
    },
    bio: {
      label: '个人简介',
      description: '简单介绍一下自己',
      widget: {
        type: 'textarea',
        placeholder: '请输入个人简介...',
        rows: 4
      }
    },
    isActive: {
      label: '账户状态',
      description: '是否激活账户',
      widget: {
        type: 'switch'
      }
    },
    skills: {
      label: '技能',
      description: '选择您掌握的技术栈（最多5个）',
      widget: {
        type: 'checkbox-group',
        items: skillOptions
      }
    },
    salary: {
      label: '期望薪资',
      description: '单位：元/月',
      widget: {
        type: 'input-number'
      }
    },
    favoriteColor: {
      label: '喜欢的颜色',
      description: '选择您喜欢的颜色',
      widget: {
        type: 'color-picker'
      }
    },
    experience: {
      label: '工作经验',
      description: '请评估您的工作经验水平（0-10分）',
      widget: {
        type: 'slider',
        min: 0,
        max: 10,
        step: 1
      }
    }
  }
}

const submit = (e: FormSubmitEvent<FormSchema>) => {
  console.log('表单提交数据:', e.data)
  // 这里可以添加提交后的处理逻辑
  alert('表单提交成功！请查看控制台输出')
}

const handleReset = () => {
  Object.assign(state, {
    name: '',
    email: '',
    age: 18,
    role: '',
    department: [],
    bio: '',
    isActive: false,
    skills: [],
    salary: undefined,
    favoriteColor: '#3b82f6',
    experience: 0
  })
}
</script>

<template>
  <div class="container mx-auto p-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        FForm 组件综合用例
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        这个表单展示了FForm组件的各种功能，包括不同类型的表单控件、验证规则、自定义slots等
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 表单区域 -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <FForm v-bind="form" class="space-y-6">
            <template #default>
              <div class="flex gap-4 mt-8">
                <button
                  type="submit"
                  class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  提交表单
                </button>
                <button
                  type="button"
                  class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  @click="handleReset"
                >
                  重置表单
                </button>
              </div>
            </template>
          </FForm>
        </div>
      </div>

      <!-- 数据预览区域 -->
      <div class="lg:col-span-1">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            实时数据预览
          </h3>
          <div class="space-y-3 text-sm">
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">姓名:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">{{ state.name || '未填写' }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">邮箱:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">{{ state.email || '未填写' }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">年龄:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">{{ state.age || '未填写' }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">角色:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">
                <!-- {{ roleOptions.find(r => r.value === state.role)?.label || '未选择' }} -->
              </span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">部门:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">
                {{ state.department.map(d => departmentOptions.find(dept => dept.value === d)?.label).join(', ') || '未选择' }}
              </span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">激活状态:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">{{ state.isActive ? '已激活' : '未激活' }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">技能:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">
                {{ state.skills.map(s => skillOptions.find(skill => skill.value === s)?.label).join(', ') || '未选择' }}
              </span>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">期望薪资:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">{{ state.salary ? `¥${state.salary}` : '未填写' }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-700 dark:text-gray-300">喜欢的颜色:</span>
              <div class="ml-2 flex items-center gap-2">
                <div
                  class="w-4 h-4 rounded border border-gray-300"
                  :style="{ backgroundColor: state.favoriteColor }"
                />
                <span class="text-gray-900 dark:text-gray-100">{{ state.favoriteColor }}</span>
              </div>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">工作经验:</span>
              <span class="ml-2 text-gray-900 dark:text-gray-100">{{ state.experience }}/10 分</span>
            </div>
          </div>

          <!-- JSON 数据预览 -->
          <details class="mt-6">
            <summary class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              查看完整JSON数据
            </summary>
            <pre class="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-auto">{{ JSON.stringify(state, null, 2) }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>
