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
              <a class="navbar-item is-active">
                Home
              </a>
              <a class="navbar-item">
                Users
              </a>
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
    // created () {
    //   var burger = document.querySelector('.nav-toggle')
    //   burger.addEventListener('click', this.burgerMenu)
    // },
    // beforeDestroy () {
    //   var burger = document.querySelector('.nav-toggle')
    //   burger.removeEventListener('click', this.burgerMenu)
    // },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      ...mapActions(['logout'])
    //   burgerMenu () {
    //     var burger = document.querySelector('.nav-toggle')
    //     var menu = document.querySelector('.nav-menu')
    //     burger.classList.toggle('is-active')
    //     menu.classList.toggle('is-active')
    //   }
    }
  }
</script>

