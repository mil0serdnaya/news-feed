<script setup>
const startDate = ref(null);
const endDate = ref(null);
</script>

<template>
  <div>
      <v-date-picker
        width="300"
        v-model="startDate"
        @input="filterByDate">
        <template #title>
          Выберите начальную дату
        </template>
      </v-date-picker>

      <v-date-picker
        width="300"
        v-model="endDate"
        @input="filterByDate">
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