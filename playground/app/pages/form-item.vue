<template>
  <div class="p-6 space-y-8">
    <h2 class="text-3xl font-bold text-center mb-8">
      FFormItem Component Examples
    </h2>

    <!-- Section 1: Basic Usage & Input Types -->
    <section class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">
        1. Basic Usage & Input Types
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">Input (Text)</label>
          <FFormItem v-model="basicInputText" type="input" placeholder="Enter text" />
          <p class="text-xs text-gray-500 mt-1">
            Value: <code class="bg-gray-100 px-1 rounded">{{ basicInputText }}</code>
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Input (Email)</label>
          <FFormItem v-model="basicInputEmail" type="input" input-type="email" placeholder="Enter email" />
          <p class="text-xs text-gray-500 mt-1">
            Value: <code class="bg-gray-100 px-1 rounded">{{ basicInputEmail }}</code>
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Input (Number)</label>
          <FFormItem v-model="basicInputNumber" type="input" input-type="number" placeholder="Enter number" />
          <p class="text-xs text-gray-500 mt-1">
            Value: <code class="bg-gray-100 px-1 rounded">{{ basicInputNumber }}</code>
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Select (String Array Items)</label>
          <FFormItem v-model="basicSelectString" type="select" :items="['Option A', 'Option B', 'Option C']" placeholder="Select an option" />
          <p class="text-xs text-gray-500 mt-1">
            Value: <code class="bg-gray-100 px-1 rounded">{{ basicSelectString }}</code>
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Select (Object Array Items)</label>
          <FFormItem
            v-model="basicSelectObject"
            type="select"
            :items="[
              { label: 'Item X', value: 'x' },
              { label: 'Item Y', value: 'y' },
              { label: 'Item Z', value: 'z' }
            ]"
            placeholder="Select an item"
          />
          <p class="text-xs text-gray-500 mt-1">
            Value: <code class="bg-gray-100 px-1 rounded">{{ basicSelectObject }}</code>
          </p>
        </div>
      </div>
    </section>

    <!-- Section 2: Dynamic Form Generation from Configuration -->
    <section class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">
        2. Dynamic Form Generation from Configuration
      </h3>
      <div class="space-y-4">
        <div v-for="field in formFields" :key="field.name" class="space-y-2">
          <label :for="field.name" class="block text-sm font-medium">{{ field.label }}</label>
          <FFormItem
            :id="field.name"
            v-model="formData[field.name]"
            v-bind="field.props"
            @input="handleFieldChange(field.name, $event)"
          />
        </div>
        <div class="bg-yellow-100 p-3 rounded text-sm mt-4">
          <strong>Form Data (from dynamic generation):</strong>
          <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    </section>

    <!-- Section 3: Conditional Rendering & Dynamic Component Type -->
    <section class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">
        3. Conditional Rendering & Dynamic Component Type
      </h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Select Component Type</label>
          <div class="text-xs text-gray-500 mb-1">
            Current selection: {{ selectedType }}
          </div>
          <FFormItem
            v-model="selectedType"
            type="select"
            :items="componentTypes"
            placeholder="Choose component type"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Dynamically Rendered Component</label>
          <div class="text-xs text-gray-500 mb-1">
            Dynamic Props: <code class="bg-gray-100 px-1 rounded">{{ JSON.stringify(dynamicProps) }}</code>
          </div>
          <FFormItem
            v-bind="dynamicProps"
            v-model="dynamicValue"
          />
          <p class="text-xs text-gray-500 mt-1">
            Value: <code class="bg-gray-100 px-1 rounded">{{ dynamicValue }}</code>
          </p>
        </div>
      </div>
    </section>

    <!-- Section 4: Responsive & Interactive Properties -->
    <section class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">
        4. Responsive & Interactive Properties
      </h3>
      <div class="space-y-4">
        <div class="flex space-x-2 mb-2">
          <button
            class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            @click="toggleSize"
          >
            Toggle Size (Current: {{ currentSize }})
          </button>
          <button
            class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
            @click="toggleDisabled"
          >
            Toggle Disabled (Current: {{ isDisabled ? 'Disabled' : 'Enabled' }})
          </button>
        </div>
        <FFormItem
          v-model="responsiveValue"
          type="input"
          :size="currentSize"
          :disabled="isDisabled"
          :placeholder="dynamicPlaceholder"
        />
        <p class="text-xs text-gray-500 mt-1">
          Value: <code class="bg-gray-100 px-1 rounded">{{ responsiveValue }}</code>
        </p>
      </div>
    </section>

    <!-- Section 5: Validation -->
    <section class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">
        5. Validation Example
      </h3>
      <div class="space-y-2">
        <FFormItem
          v-bind="validationProps"
          v-model="validationValue"
          @blur="validateField"
        />
        <p v-if="validationError" class="text-red-500 text-sm">
          {{ validationError }}
        </p>
        <p v-else-if="validationValue && !validationError" class="text-green-500 text-sm">
          Input is valid.
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Value: <code class="bg-gray-100 px-1 rounded">{{ validationValue }}</code>
        </p>
      </div>
    </section>

    <!-- Section 6: UI Customization -->
    <section class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">
        6. UI Customization (e.g., Trailing Icon)
      </h3>
      <div class="space-y-2">
        <label class="block text-sm font-medium mb-1">Select with Custom Trailing Icon</label>
        <FFormItem
          v-model="customUiSelectValue"
          type="select"
          :items="statusItems"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200 i-heroicons-chevron-down-20-solid'
          }"
          class="w-48"
          placeholder="Select status"
          @change="(v) => { console.log('Custom UI Select Change:', v) }"
        />
        <p class="text-xs text-gray-500 mt-1">
          Value: <code class="bg-gray-100 px-1 rounded">{{ customUiSelectValue }}</code>
        </p>
      </div>
    </section>

    <!-- Global Data Overview -->
    <section class="p-4 border rounded-lg shadow bg-gray-50 mt-10">
      <h3 class="text-xl font-semibold mb-4">
        Global Data Overview
      </h3>
      <div class="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
        <pre class="text-sm">{{ JSON.stringify({
          section1_basicExamples: {
            basicInputText,
            basicInputEmail,
            basicInputNumber,
            basicSelectString,
            basicSelectObject
          },
          section2_dynamicForm: { formData },
          section3_conditionalRendering: { selectedType, dynamicValue },
          section4_responsiveProps: { responsiveValue, currentSize, isDisabled },
          section5_validation: { validationValue, validationError },
          section6_uiCustomization: { customUiSelectValue }
        }, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FFormItem } from '#components'
import { ref, computed, reactive } from 'vue'

// --- Section 1: Basic Usage & Input Types ---
const basicInputText = ref('Initial text')
const basicInputEmail = ref('test@example.com')
const basicInputNumber = ref<number | string>(123)
const basicSelectString = ref('Option B')
const basicSelectObject = ref('y')

// --- Section 2: Dynamic Form Generation from Configuration ---
interface FormData {
  username: string
  email: string
  age: string
  city: string
  [key: string]: string
}

const formData = reactive<FormData>({
  username: 'johndoe',
  email: 'john.doe@example.com',
  age: '30',
  city: 'beijing'
})

const formFields = ref([
  {
    name: 'username',
    label: 'Username',
    props: {
      type: 'input',
      placeholder: 'Enter username',
      size: 'md',
      required: true
    }
  },
  {
    name: 'email',
    label: 'Email',
    props: {
      type: 'input',
      placeholder: 'Enter email',
      size: 'md',
      inputType: 'email'
    }
  },
  {
    name: 'age',
    label: 'Age',
    props: {
      type: 'input',
      placeholder: 'Enter age',
      size: 'sm',
      inputType: 'number'
    }
  },
  {
    name: 'city',
    label: 'City',
    props: {
      type: 'select',
      placeholder: 'Select city',
      items: [
        { label: 'Beijing', value: 'beijing' },
        { label: 'Shanghai', value: 'shanghai' },
        { label: 'Guangzhou', value: 'guangzhou' }
      ]
    }
  }
])

const handleFieldChange = (fieldName: string, value: any) => {
  console.log(`Field ${fieldName} changed to:`, value)
}

// --- Section 3: Conditional Rendering & Dynamic Component Type ---
const selectedType = ref('input')
const dynamicValue = ref('Initial dynamic value')

const componentTypes = [
  { label: 'Input Box', value: 'input' },
  { label: 'Selector', value: 'select' }
]

const dynamicProps = computed(() => {
  const baseProps: { type: string, placeholder: string, items?: Array<{ label: string, value: string }> } = {
    type: selectedType.value,
    placeholder: `This is a dynamic ${selectedType.value === 'input' ? 'input box' : 'selector'}`
  }

  if (selectedType.value === 'select') {
    return {
      ...baseProps,
      items: [
        { label: 'Dynamic Option 1', value: 'dyn_opt1' },
        { label: 'Dynamic Option 2', value: 'dyn_opt2' },
        { label: 'Dynamic Option 3', value: 'dyn_opt3' }
      ]
    }
  }
  return baseProps
})

// --- Section 4: Responsive & Interactive Properties ---
const currentSize = ref('md')
const isDisabled = ref(false)
const responsiveValue = ref('Responsive input text')

const SIZES_AVAILABLE = ['xs', 'sm', 'md', 'lg', 'xl'] as const // Use as const for stricter typing
type SizeType = typeof SIZES_AVAILABLE[number]
let currentSizeIndex = SIZES_AVAILABLE.indexOf(currentSize.value as SizeType)

const dynamicPlaceholder = computed(() =>
  `Size: ${currentSize.value}, Disabled: ${isDisabled.value ? 'Yes' : 'No'}`
)

const toggleSize = () => {
  currentSizeIndex = (currentSizeIndex + 1) % SIZES_AVAILABLE.length
  currentSize.value = SIZES_AVAILABLE[currentSizeIndex]
}

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
}

// --- Section 5: Validation ---
const validationValue = ref('')
const validationError = ref('')

const validationProps = computed(() => ({
  type: 'input',
  placeholder: 'Enter 6-20 characters',
  size: 'md',
  color: validationError.value ? 'red' : undefined // Use undefined for default or primary color
}))

const validateField = () => {
  const value = validationValue.value
  if (!value) {
    validationError.value = 'This field is required.'
  } else if (value.length < 6) {
    validationError.value = 'Minimum 6 characters required.'
  } else if (value.length > 20) {
    validationError.value = 'Maximum 20 characters allowed.'
  } else {
    validationError.value = ''
  }
}

// --- Section 6: UI Customization ---
const statusItems = ref(['Backlog', 'Todo', 'In Progress', 'Done', 'Archived'])
const customUiSelectValue = ref('Todo')
</script>
