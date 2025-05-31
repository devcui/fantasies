<template>
  <div class="p-4 space-y-8">
    <h1 class="text-2xl font-bold">
      FFormItem Playground
    </h1>

    <!-- Input Type Examples -->
    <section class="space-y-4 p-4 border rounded-md">
      <h2 class="text-xl font-semibold">
        Input Type
      </h2>

      <!-- Basic Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Basic Input (v-model: {{ inputV1 }})</label>
        <FFormItem
          v-model="inputV1"
          type="input"
          placeholder="Enter text here"
          @update:model-value="logEvent('inputV1 update:modelValue', $event)"
        />
      </div>

      <!-- Input with Size and Autocomplete Off -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input with Size 'lg' & Autocomplete Off (v-model: {{ inputV2 }})</label>
        <FFormItem
          v-model="inputV2"
          type="input"
          size="lg"
          placeholder="Large input"
          autocomplete="off"
          @change="logEvent('inputV2 change', $event)"
        />
      </div>

      <!-- Disabled Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Disabled Input</label>
        <FFormItem
          model-value="Cannot edit"
          type="input"
          disabled
        />
      </div>

      <!-- Readonly Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Readonly Input</label>
        <FFormItem
          model-value="Readonly text"
          type="input"
          readonly
        />
      </div>

      <!-- Input with Loading State -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input with Loading State</label>
        <FFormItem
          type="input"
          loading
          placeholder="Loading..."
        />
      </div>

      <!-- Input with Icon -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input with Icon (v-model: {{ inputV3 }})</label>
        <FFormItem
          v-model="inputV3"
          type="input"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
        />
      </div>

      <!-- Clearable Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Clearable Input (v-model: {{ inputV4 }})</label>
        <FFormItem
          v-model="inputV4"
          type="input"
          clearable
          placeholder="Type and clear"
        />
      </div>

      <!-- Input with Leading and Trailing Slots -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input with Leading/Trailing Slots (v-model: {{ inputV5 }})</label>
        <FFormItem
          v-model="inputV5"
          type="input"
          placeholder="With slots"
        >
          <template #leading>
            <span class="text-gray-500 dark:text-gray-400 text-xs">URL</span>
          </template>
          <template #trailing>
            <UIcon name="i-heroicons-question-mark-circle" class="text-gray-500 dark:text-gray-400" />
          </template>
        </FFormItem>
      </div>

      <!-- Input type="password" -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input type="password" (v-model: {{ inputPassword }})</label>
        <FFormItem
          v-model="inputPassword"
          type="input"
          input-type="password"
          placeholder="Enter password"
        />
      </div>

      <!-- Input type="number" -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Input type="number" (v-model: {{ inputNumber }})</label>
        <FFormItem
          v-model.number="inputNumber"
          type="input"
          input-type="number"
          placeholder="Enter a number"
        />
      </div>
    </section>

    <!-- Select Type Examples -->
    <section class="space-y-4 p-4 border rounded-md">
      <h2 class="text-xl font-semibold">
        Select Type
      </h2>

      <!-- Basic Select -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Basic Select (v-model: {{ selectV1 }})</label>
        <FFormItem
          v-model="selectV1"
          type="select"
          :items="selectOptions"
          placeholder="Select an option"
          @update:model-value="logEvent('selectV1 update:modelValue', $event)"
        />
      </div>

      <!-- Select with Size 'lg' -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select with Size 'lg' (v-model: {{ selectV2 }})</label>
        <FFormItem
          v-model="selectV2"
          type="select"
          size="lg"
          :items="selectOptions"
          @change="logEvent('selectV2 change', $event)"
        />
      </div>

      <!-- Disabled Select -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Disabled Select</label>
        <FFormItem
          model-value="option1"
          type="select"
          :items="selectOptions"
          disabled
        />
      </div>

      <!-- Select with Loading State -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select with Loading State</label>
        <FFormItem
          type="select"
          :items="selectOptions"
          loading
        />
      </div>

      <!-- Select with Icon -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select with Icon (v-model: {{ selectV3 }})</label>
        <FFormItem
          v-model="selectV3"
          type="select"
          icon="i-heroicons-tag"
          :items="selectOptions"
          placeholder="Select with icon"
        />
      </div>

      <!-- Clearable Select -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Clearable Select (v-model: {{ selectV4 }})</label>
        <FFormItem
          v-model="selectV4"
          type="select"
          :items="selectOptions"
          clearable
          placeholder="Select and clear"
        />
      </div>

      <!-- Select with custom value and option attributes -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select with custom attributes (v-model: {{ selectV5 }})</label>
        <FFormItem
          v-model="selectV5"
          type="select"
          :items="customAttributeOptions"
          value-attribute="id"
          option-attribute="name"
          placeholder="Select a user"
        />
      </div>

      <!-- Select with Leading and Trailing Slots -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select with Leading/Trailing Slots (v-model: {{ selectV6 }})</label>
        <FFormItem
          v-model="selectV6"
          type="select"
          :items="selectOptions"
          placeholder="Select with slots"
        >
          <template #leading>
            <UIcon name="i-heroicons-users" />
          </template>
          <template #trailing>
            <UIcon name="i-heroicons-chevron-down-20-solid" />
          </template>
        </FFormItem>
      </div>

      <!-- Select with Custom Option Slot -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select with Custom Option Slot (v-model: {{ selectV7 }})</label>
        <FFormItem
          v-model="selectV7"
          type="select"
          :items="richOptions"
          placeholder="Select rich option"
        >
          <template #option="{ option }">
            <div class="flex items-center">
              <UIcon :name="option.icon" class="mr-2" />
              <span>{{ option.label }} - <em class="text-xs opacity-75">{{ option.description }}</em></span>
            </div>
          </template>
          <template #option-empty="{ query }">
            <div class="italic">
              No options match "{{ query }}"
            </div>
          </template>
          <template #empty>
            <div class="italic">
              No options available
            </div>
          </template>
        </FFormItem>
      </div>
    </section>

    <div class="mt-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
      <h3 class="text-lg font-medium">
        Event Log:
      </h3>
      <ul class="max-h-60 overflow-y-auto text-sm">
        <li v-for="(log, index) in eventLogs" :key="index" class="font-mono">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputV1 = ref('')
const inputV2 = ref('Initial value for large input')
const inputV3 = ref('')
const inputV4 = ref('Some text to clear')
const inputV5 = ref('')
const inputPassword = ref('')
const inputNumber = ref<number | undefined>()

const selectV1 = ref('')
const selectV2 = ref('option2')
const selectV3 = ref('')
const selectV4 = ref('option3')
const selectV5 = ref<number | undefined>()
const selectV6 = ref('')
const selectV7 = ref('')

const selectOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Disabled Option', value: 'option4', disabled: true }
]

const customAttributeOptions = [
  { name: 'Alice Wonderland', id: 101 },
  { name: 'Bob The Builder', id: 102 },
  { name: 'Charlie Chaplin', id: 103 }
]

const richOptions = [
  { label: 'Feature A', value: 'featA', icon: 'i-heroicons-star', description: 'The main feature' },
  { label: 'Feature B', value: 'featB', icon: 'i-heroicons-cog', description: 'A secondary feature' },
  { label: 'Bugfix C', value: 'bugC', icon: 'i-heroicons-wrench', description: 'Important fix' }
]

const eventLogs = ref<string[]>([])
const logEvent = (eventName: string, eventData: any) => {
  console.log(eventName, eventData)
  eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] ${eventName}: ${JSON.stringify(eventData)}`)
  if (eventLogs.value.length > 20) {
    eventLogs.value.pop()
  }
}

// Expose console.log for template usage if needed, though logEvent is preferred
const console = {
  log: (...args: any[]) => logEvent('console.log', args)
}
</script>

<style scoped>
/* Add some basic styling for readability */
label {
  cursor: default;
}
</style>
