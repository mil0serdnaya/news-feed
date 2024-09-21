<script setup>
defineProps(['news'])
</script>

<template>
  <section>
    <ul>
      <NewsListItem
        v-for="(article, index) in news"
        :key="index"
        :article="article"
      />
    </ul>
  </section>
</template>


<style scoped lang="scss">

</style>