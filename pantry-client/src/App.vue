<template>
  <div id="app">
    <RefuelHeader />
    <router-view />
  </div>
</template>

<script>
import RefuelHeader from "./components/RefuelHeader.vue"

export default {
  name: "App",
  components: {
    RefuelHeader,
  },
}
</script>

<style>
/* Found help on keeping footer at bottom of page here: https://stackoverflow.com/questions/63099883/bulma-flexbox-footer-not-sticking-to-the-bottom-of-the-page */

body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

.footer {
    margin-top: auto;
}

.card-footer a {
    color: #ffffff;
}

.has-text-light strong {
    color: #f5f5f5!important;
}
</style>
