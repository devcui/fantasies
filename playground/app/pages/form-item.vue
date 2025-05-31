<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center mb-8">
      FFormItem Comprehensive Test Page
    </h1>

    <!-- Dynamic Props Binding Example -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        1. Dynamic Props Binding (from `formFields`)
      </h2>
      <div v-for="field in formFields" :key="field.name" class="space-y-2 mb-4">
        <label class="block text-sm font-medium text-gray-600">{{ field.label }}</label>
        <FFormItem
          v-model="formData[field.name]"
          v-bind="field.props"
          @input="handleFieldChange(field.name, $event)"
        />
      </div>
      <div class="bg-yellow-50 p-3 rounded text-xs mt-2 border border-yellow-200">
        <strong>Form Data:</strong>
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </div>

    <!-- Dynamic Component Type Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        2. Dynamic Component Type Test (`type` prop)
      </h2>
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-600">Component Type Selector</label>
        <FFormItem
          v-model="selectedType"
          type="select"
          :items="componentTypes"
          placeholder="Select Component Type"
        />
        <p class="text-xs text-gray-500">
          Selected type: <code class="bg-gray-200 px-1 rounded">{{ selectedType }}</code>. The component below should render as {{ selectedType === 'input' ? 'an Input' : 'a Select' }}.
        </p>
      </div>
      <div class="space-y-2 mt-3">
        <label class="block text-sm font-medium text-gray-600">Dynamically Typed Component</label>
        <FFormItem
          v-bind="dynamicProps"
          v-model="dynamicValue"
        />
        <p class="text-xs text-gray-500">
          Value: <code class="bg-gray-200 px-1 rounded">{{ dynamicValue }}</code>
        </p>
      </div>
    </div>

    <!-- Simple Select Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        3. Simple Select Functionality
      </h2>
      <div class="space-y-2 bg-blue-50 p-4 rounded border border-blue-200">
        <label class="block text-sm font-medium text-blue-700">Basic Select Box</label>
        <FFormItem
          v-model="testSelectValue"
          type="select"
          :items="[
            { label: 'Test Option 1', value: 'test1' },
            { label: 'Test Option 2', value: 'test2' },
            { label: 'Test Option 3', value: 'test3' }
          ]"
          placeholder="This is a test select box"
        />
        <div class="text-xs text-blue-600">
          Selected Value: <code class="bg-blue-200 px-1 rounded">{{ testSelectValue }}</code>
        </div>
      </div>
    </div>

    <!-- Responsive Props Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        4. Responsive Configuration (Dynamic Props)
      </h2>
      <div class="space-y-2">
        <div class="flex space-x-2 mb-2">
          <button
            class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
            @click="toggleSize"
          >
            Toggle Size (Current: {{ currentSize }})
          </button>
          <button
            class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
            @click="toggleDisabled"
          >
            Toggle Disabled (Current: {{ isDisabled ? 'Yes' : 'No' }})
          </button>
        </div>
        <FFormItem
          v-model="responsiveValue"
          type="input"
          :size="currentSize"
          :disabled="isDisabled"
          :placeholder="dynamicPlaceholder"
        />
      </div>
    </div>

    <!-- Validation Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        5. Form Validation Example
      </h2>
      <div class="space-y-2">
        <FFormItem
          v-bind="validationProps"
          v-model="validationValue"
          @blur="validateField"
        />
        <p v-if="validationError" class="text-red-500 text-sm mt-1">
          {{ validationError }}
        </p>
      </div>
    </div>

    <!-- Slot Passthrough Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        6. Slot Passthrough Test
      </h2>
      <div class="space-y-3 bg-green-50 p-4 rounded border border-green-200">
        <!-- Input with leading slot -->
        <div>
          <label class="text-xs text-gray-700">Input with `leading` slot:</label>
          <FFormItem v-model="inputWithLeadingSlotValue" type="input" placeholder="Input with leading slot">
            <template #leading>
              <span class="text-gray-500 text-xl ml-1">📧</span>
            </template>
          </FFormItem>
        </div>
        <!-- Input with trailing slot -->
        <div>
          <label class="text-xs text-gray-700">Input with `trailing` slot:</label>
          <FFormItem v-model="inputWithTrailingSlotValue" type="input" placeholder="Input with trailing slot">
            <template #trailing>
              <span class="text-gray-500 text-xl mr-1">🔔</span>
            </template>
          </FFormItem>
        </div>
        <!-- Select with leading slot -->
        <div>
          <label class="text-xs text-gray-700">Select with `leading` slot:</label>
          <FFormItem v-model="selectWithLeadingSlotValue" type="select" :items="slotTestSelectItems" placeholder="Select with leading slot">
            <template #leading>
              <span class="text-gray-500 text-xl ml-1">⭐</span>
            </template>
          </FFormItem>
        </div>
        <!-- Select with custom 'label' slot -->
        <div>
          <label class="text-xs text-gray-700">Select with custom `label` slot (selected value display):</label>
          <FFormItem v-model="selectWithCustomLabelSlotValue" type="select" :items="slotTestSelectItemsComplex" placeholder="Select with custom label slot">
            <template #label="{ modelValue }">
              <span v-if="modelValue" class="text-purple-600 font-semibold">
                ✨ {{ slotTestSelectItemsComplex.find(i => i.value === modelValue)?.label }} ✨
              </span>
              <span v-else class="text-gray-400 italic">Choose an option...</span>
            </template>
          </FFormItem>
        </div>
        <!-- Select with custom 'option' slot -->
        <div>
          <label class="text-xs text-gray-700">Select with custom `option` slot (dropdown items display):</label>
          <FFormItem v-model="selectWithCustomOptionSlotValue" type="select" :items="slotTestSelectItemsComplex" placeholder="Select with custom option slot">
            <template #option="{ option, selected }">
              <div class="flex items-center justify-between w-full p-1">
                <span :class="{ 'font-bold text-blue-600': selected, 'text-gray-800': !selected }">
                  {{ option.icon }} {{ option.label }}
                </span>
                <span class="text-xs text-gray-500 italic">{{ option.description }}</span>
              </div>
            </template>
          </FFormItem>
        </div>
      </div>
    </div>

    <!-- Attribute Passthrough Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        7. Attribute Passthrough Test
      </h2>
      <div class="space-y-3 bg-purple-50 p-4 rounded border border-purple-200">
        <p class="text-sm text-purple-700">
          Inspect these elements in browser dev tools to verify `id`, `name`, `data-testid`, `aria-label`, and `readonly` attributes.
        </p>
        <div>
          <label class="text-xs text-gray-700">Input with various attributes:</label>
          <FFormItem
            id="attr-input-id-test"
            v-model="attrTest_inputValue"
            type="input"
            placeholder="Input for attribute test"
            name="attr-input-name-test"
            :readonly="attrTest_isReadonly"
            data-testid="formitem-input-attr-test"
            aria-label="Input for attribute testing"
            class="mt-1"
          />
          <button class="mt-1 text-xs px-2 py-0.5 bg-purple-200 rounded" @click="attrTest_isReadonly = !attrTest_isReadonly">
            Toggle Readonly: {{ attrTest_isReadonly }}
          </button>
        </div>
        <div>
          <label class="text-xs text-gray-700">Select with various attributes:</label>
          <FFormItem
            id="attr-select-id-test"
            v-model="attrTest_selectValue"
            type="select"
            :items="attrTest_selectItems"
            placeholder="Select for attribute test"
            name="attr-select-name-test"
            data-testid="formitem-select-attr-test"
            aria-label="Select for attribute testing"
            class="mt-1"
          />
        </div>
      </div>
    </div>

    <!-- Comprehensive Event Handling Test -->
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        8. Comprehensive Event Handling Test
      </h2>
      <div class="space-y-3 bg-teal-50 p-4 rounded border border-teal-200">
        <div>
          <label class="text-xs text-gray-700">Input Event Test:</label>
          <FFormItem
            v-model="eventTest_inputValue"
            type="input"
            placeholder="Trigger events here (input)"
            class="mt-1"
            @focus="logEvent('Input Focus')"
            @blur="logEvent('Input Blur')"
            @input="logEvent('Input Input', $event)"
            @change="logEvent('Input Change', $event)"
          />
        </div>
        <div>
          <label class="text-xs text-gray-700">Select Event Test:</label>
          <FFormItem
            v-model="eventTest_selectValue"
            type="select"
            :items="eventTest_selectItems"
            placeholder="Trigger events here (select)"
            class="mt-1"
            @focus="logEvent('Select Focus')"
            @blur="logEvent('Select Blur')"
            @change="logEvent('Select Change', $event)"
          />
        </div>
        <div class="mt-2">
          <label class="text-xs text-gray-700">Event Log (Last 10 events):</label>
          <pre class="text-xs bg-gray-100 p-2 rounded max-h-32 overflow-y-auto border border-gray-300 mt-1">
            <div v-if="!eventLog.length" class="text-gray-500 italic">No events logged yet.</div>
            <div v-for="(event, index) in eventLog" :key="index">{{ event }}</div>
          </pre>
          <button class="mt-1 text-xs px-2 py-0.5 bg-teal-200 rounded" @click="eventLog = []">
            Clear Log
          </button>
        </div>
      </div>
    </div>

    <!-- Data Display -->
    <div class="p-4 border rounded-lg shadow-sm bg-gray-50 mt-8">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">
        9. Current Page Data Summary
      </h2>
      <pre class="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto">{{ JSON.stringify({
        formData,
        dynamicValue,
        selectedType,
        testSelectValue,
        responsiveValue,
        currentSize,
        isDisabled,
        validationValue,
        validationError,
        inputWithLeadingSlotValue,
        inputWithTrailingSlotValue,
        selectWithLeadingSlotValue,
        selectWithCustomLabelSlotValue,
        selectWithCustomOptionSlotValue,
        attrTest_inputValue,
        attrTest_selectValue,
        attrTest_isReadonly,
        eventTest_inputValue,
        eventTest_selectValue,
        eventLogCount: eventLog.length
      }, null, 2) }}</pre>
    </div>

    <!-- Standalone FFormItem for quick testing -->
    <div class="mt-8 p-4 border rounded-lg shadow-sm bg-white">
      <h3 class="text-lg font-medium mb-2 text-gray-600">
        Quick Test Select
      </h3>
      <FFormItem
        v-model="value"
        type="select"
        :items="items"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
        class="w-48"
        @change="(v) => { console.log('Standalone Select Changed:', v); logEvent('Standalone Select Change', v) }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClientOnly, FFormItem } from '#components' // Assuming FFormItem is auto-imported or globally registered
import { ref, computed, reactive } from 'vue'

// General items for standalone select
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

// 1. Dynamic Props Binding
interface FormData {
  username: string
  email: string
  age: string
  city: string
  country: string
  [key: string]: string
}
const formData = reactive<FormData>({
  username: 'JaneDoe',
  email: 'jane.doe@example.com',
  age: '30',
  city: 'shanghai',
  country: 'USA'
})
const formFields = ref([
  { name: 'username', label: 'Username', props: { type: 'input', placeholder: 'Enter username', size: 'md' } },
  { name: 'email', label: 'Email', props: { type: 'input', placeholder: 'Enter email', inputType: 'email' } },
  { name: 'age', label: 'Age', props: { type: 'input', placeholder: 'Enter age', inputType: 'number', size: 'sm' } },
  { name: 'city', label: 'City', props: { type: 'select', placeholder: 'Select city', items: [{ label: 'Beijing', value: 'beijing' }, { label: 'Shanghai', value: 'shanghai' }, { label: 'Guangzhou', value: 'guangzhou' }] } }
])
const handleFieldChange = (fieldName: string, fieldValue: any) => {
  console.log(`Field ${fieldName} changed to:`, fieldValue)
  logEvent(`Form Field ${fieldName} Input`, fieldValue)
}

// 2. Dynamic Component Type Test
const selectedType = ref<'input' | 'select'>('input')
const dynamicValue = ref('')
const componentTypes = [
  { label: 'Input Component', value: 'input' },
  { label: 'Select Component', value: 'select' }
]
const dynamicProps = computed(() => {
  const baseProps = {
    type: selectedType.value,
    placeholder: `Dynamic ${selectedType.value === 'input' ? 'Input' : 'Select'}`
  }
  if (selectedType.value === 'select') {
    return { ...baseProps, items: [{ label: 'Dynamic Option 1', value: 'dyn_opt1' }, { label: 'Dynamic Option 2', value: 'dyn_opt2' }] }
  }
  return baseProps
})

// 3. Simple Select Test
const testSelectValue = ref('test1')

// 4. Responsive Props Test
const currentSize = ref('md')
const isDisabled = ref(false)
const responsiveValue = ref('Responsive text')
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
let sizeIndex = sizes.indexOf(currentSize.value)
const dynamicPlaceholder = computed(() => `Size: ${currentSize.value}, Disabled: ${isDisabled.value ? 'Yes' : 'No'}`)
const toggleSize = () => {
  sizeIndex = (sizeIndex + 1) % sizes.length
  currentSize.value = sizes[sizeIndex]
}
const toggleDisabled = () => { isDisabled.value = !isDisabled.value }

// 5. Validation Test
const validationValue = ref('')
const validationError = ref('')
const validationProps = computed(() => ({
  type: 'input',
  placeholder: 'Enter 6-20 chars',
  size: 'md',
  color: validationError.value ? 'red' : 'primary' // Assuming color prop exists and works
}))
const validateField = () => {
  const val = validationValue.value
  if (!val) validationError.value = 'This field is required.'
  else if (val.length < 6) validationError.value = 'Minimum 6 characters.'
  else if (val.length > 20) validationError.value = 'Maximum 20 characters.'
  else validationError.value = ''
}

// 6. Slot Passthrough Test
const inputWithLeadingSlotValue = ref('leading@example.com')
const inputWithTrailingSlotValue = ref('trailing_notification')
const selectWithLeadingSlotValue = ref('B')
const slotTestSelectItems = ref(['Option A', 'Option B', 'Option C'])
const slotTestSelectItemsComplex = ref([
  { label: 'Alpha Item', value: 'alpha', description: 'First letter', icon: '🍎' },
  { label: 'Beta Item', value: 'beta', description: 'Second letter', icon: '🍌' },
  { label: 'Gamma Item', value: 'gamma', description: 'Third letter', icon: '🍒' }
])
const selectWithCustomLabelSlotValue = ref('beta')
const selectWithCustomOptionSlotValue = ref('gamma')

// 7. Attribute Passthrough Test
const attrTest_inputValue = ref('Readonly test')
const attrTest_selectValue = ref('AttrOpt2')
const attrTest_selectItems = ref(['AttrOpt1', 'AttrOpt2', 'AttrOpt3'])
const attrTest_isReadonly = ref(true)

// 8. Comprehensive Event Handling Test
const eventTest_inputValue = ref('')
const eventTest_selectValue = ref('')
const eventTest_selectItems = ref(['EventOpt A', 'EventOpt B'])
const eventLog = ref<string[]>([])
const logEvent = (eventName: string, eventData?: any) => {
  const timestamp = new Date().toLocaleTimeString()
  let message = `${timestamp} - ${eventName}`
  if (eventData !== undefined && (typeof eventData === 'string' || typeof eventData === 'number' || typeof eventData === 'boolean')) {
    message += `: ${eventData}`
  } else if (eventData !== undefined) {
    message += `: (see console for details)` // Avoid complex objects in this simple log
    console.log(`${eventName} data:`, eventData)
  }
  eventLog.value.unshift(message)
  if (eventLog.value.length > 10) {
    eventLog.value.pop()
  }
  console.log('Playground Event Logged:', message)
}
</script>

<style scoped>
/* Optional: Add some global styling for the page if needed */
code {
  font-family: 'Courier New', Courier, monospace;
}
</style>
