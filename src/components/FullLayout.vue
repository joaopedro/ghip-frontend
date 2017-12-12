<template>
  <section class="hero is-info is-fullheight">
      <app-header></app-header>
      <div class="hero-body">
        <router-view></router-view>
      </div>
    <app-footer></app-footer>
  </section>
</template>

<script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'

  export default {
    name: 'FullLayout',
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter
    }
  }
</script>

<style lang='scss'>
  html,body {
    font-family: 'Open Sans', serif;
  }
  .hero.is-info {
    background: linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ), url('https://unsplash.it/1200/900?random') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .hero .subtitle {
    padding: 3rem 0;
    line-height: 1.5;
  }
</style>
