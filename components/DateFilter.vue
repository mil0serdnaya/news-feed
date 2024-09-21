<script setup>
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const newsStore = useNewsStore();
</script>

<template>
  <div>
      <v-date-picker
        width="300"
        v-model="startDate">
        <template #title>
          Выберите начальную дату
        </template>
      </v-date-picker>
      <v-date-picker
        width="300"
        v-model="endDate">
        <template #title>
          Выберите конечную дату
        </template>
      </v-date-picker>
  </div>
</template>

<style>
.v-picker__header {
  display: none;
}
</style>