<script setup lang="ts">
import { useNewsStore } from '~/stores/newsStore';

const newsStore = useNewsStore();

const selectedStartDate = ref<Date | null>(null);
const selectedEndDate = ref<Date | null>(null);

const applyDateFilter = () => {
  newsStore.setDateFilter({ startDate: selectedStartDate.value, endDate: selectedEndDate.value });
};

const resetDateFilter = () => {
  selectedStartDate.value = null;
  selectedEndDate.value = null;
  newsStore.resetDateFilter();
};
</script>

<template>
  <div class="date-filter">
    <v-row>
      <v-col cols="12" sm="6">
        <v-date-picker 
          v-model="selectedStartDate"
          title="Дата начала"
          :max="selectedEndDate"
          class="mb-4"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-date-picker 
          v-model="selectedEndDate"
          title="Дата конца"
          :min="selectedStartDate"
          class="mb-4"
        />
      </v-col>
    </v-row>

    <v-btn color="primary" @click="applyDateFilter" class="mr-4">
      Применить фильтр
    </v-btn>
    <v-btn color="secondary" @click="resetDateFilter">
      Сбросить фильтр
    </v-btn>
  </div>
</template>

<style lang="scss">
.date-filter {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 24px;

  .v-picker__header {
    display: none;
  }
}
</style>
