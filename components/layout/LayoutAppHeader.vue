<template>
  <header class="app-header">
    <NuxtLink to="/">
      <h1 class="app-title">Главные новости РБК</h1>
    </NuxtLink>
  </header>
</template>

<style scoped>
.app-header {
  padding: 30px 0;
  text-align: center;

  a {
    text-decoration: none;
  }
}

.app-title {
  color: #424242;
  text-transform: uppercase;
}
</style>