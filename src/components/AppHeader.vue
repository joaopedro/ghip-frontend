<template>
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <div class="navbar-item">
              <img src="../assets/ghip-white-logo.png" alt="Logo">
            </div>
            <span class="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
              <router-link to="/init" class="navbar-item is-active" exact>
                Home
              </router-link>
              <router-link to="/listusers" class="navbar-item">
                Users
              </router-link>
              <span class="navbar-item">
                <button v-on:click='logout()' class="button is-white is-outlined">
                  <span>Logout</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    // TODO: Get Burger menu working
    mounted () {
      var burger = document.querySelector('.navbar-burger')
      burger.addEventListener('click', this.burgerMenu)
    },
    beforeDestroy () {
      var burger = document.querySelector('.navbar-burger')
      burger.removeEventListener('click', this.burgerMenu)
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      ...mapActions(['logout']),
      burgerMenu () {
        var burger = document.querySelector('.navbar-burger')
        var menu = document.querySelector('.navbar-menu')
        burger.classList.toggle('is-active')
        menu.classList.toggle('is-active')
      }
    }
  }
</script>

