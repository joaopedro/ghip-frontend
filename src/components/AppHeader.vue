<template>
    <div class='hero-head'>
      <nav class='navbar'>
        <div class='container'>
          <div class='navbar-brand'>
            <div class='navbar-item'>
              <img src='../assets/ghip-white-logo.png' alt='Logo'>
            </div>
            <span class='navbar-burger burger' data-target='navbarMenu'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id='navbarMenu' class='navbar-menu'>
            <div class='navbar-end'>
              <router-link to='/init' class='navbar-item' exact>
                {{$t("header.home")}}
              </router-link>
              <router-link to='/accessmanagement' class='navbar-item'>
                {{$t("header.accessManagement")}}
              </router-link>
                <span class='navbar-item'>
                  <div class="dropdown">
                    <div class="dropdown-trigger">
                      <button class='button is-white is-outlined' aria-haspopup='true' aria-controls='dropdown-menu'>
                        <span>
                          <span class="icon">
                            <i class="fa fa-user-o"></i>
                          </span>
                          &nbsp;{{userGivenName}}
                        </span>
                        <span class='icon is-small'>
                          <i class='fa fa-angle-down' aria-hidden='true'></i>
                        </span>
                      </button>
                    </div>
                    <div class='dropdown-menu' id='dropdown-menu' role='menu'>
                      <div class='dropdown-content '>
                        <router-link to='/userInfo' class='dropdown-item has-text-black'>
                          {{$t("header.userMenu.details")}}
                        </router-link>
                        <hr class='dropdown-divider'>
                        <a class='dropdown-item has-text-black' v-on:click='logout()'>
                          {{$t("header.userMenu.logout")}}
                        </a>
                      </div>
                    </div>
                  </div>
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
  mounted () {
    var burger = document.querySelector('.navbar-burger')
    burger.addEventListener('click', this.burgerMenu)
    var menu = document.querySelector('.dropdown')
    menu.addEventListener('click', this.userDropdownToggle)
    document.addEventListener('click', this.userDropdownClose)
  },
  beforeDestroy () {
    var burger = document.querySelector('.navbar-burger')
    burger.removeEventListener('click', this.burgerMenu)
    var menu = document.querySelector('.dropdown')
    menu.removeEventListener('click', this.userMenu)
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['userGivenName'])
  },
  methods: {
    ...mapActions(['logout']),
    burgerMenu (event) {
      event.stopPropagation()
      var burger = document.querySelector('.navbar-burger')
      var menu = document.querySelector('.navbar-menu')
      burger.classList.toggle('is-active')
      menu.classList.toggle('is-active')
    },
    userDropdownToggle (event) {
      event.stopPropagation()
      var menu = document.querySelector('.dropdown')
      menu.classList.toggle('is-active')
    },
    userDropdownClose (event) {
      var dropdown = document.querySelector('.dropdown')
      dropdown.classList.remove('is-active')
    }
  }
}
</script>

