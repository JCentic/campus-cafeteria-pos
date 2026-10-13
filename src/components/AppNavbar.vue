<script setup>
// Only Menu and Order are in the navbar. Payment and Receipt are steps of
// the order, so the Order tab stays highlighted while they are open.
const props = defineProps({
  currentPage: { type: String, required: true },
})

const emit = defineEmits(['navigate'])

const tabs = [
  { page: 'menu', label: 'Menu' },
  { page: 'order', label: 'Order' },
]

function isActive(page) {
  if (page === 'order') {
    return ['order', 'payment', 'receipt'].includes(props.currentPage)
  }
  return props.currentPage === page
}
</script>

<template>
  <header class="topbar">
    <div class="brand">
      <span class="brand-mark" aria-hidden="true">C</span>
      <span class="brand-copy">
        <span class="brand-name">Campus Cafeteria</span>
        <span class="brand-caption">Point of sale</span>
      </span>
    </div>

    <nav class="main-nav" aria-label="Main">
      <button
        v-for="tab in tabs"
        :key="tab.page"
        type="button"
        class="nav-tab"
        :class="{ 'is-active': isActive(tab.page) }"
        :aria-current="isActive(tab.page) ? 'page' : undefined"
        @click="emit('navigate', tab.page)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <div class="shift-status">
      <span class="status-dot" aria-hidden="true"></span>
      <span>Register ready</span>
    </div>
  </header>
</template>
