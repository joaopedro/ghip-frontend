<template>
    <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">Login</h3>
          <p class="subtitle has-text-white">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../assets/logo.png">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="email" placeholder="Your Email" autofocus=""
                    v-model="username" v-on:keydown.enter.prevent='login'>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Your Password"
                    v-model="password" v-on:keydown.enter.prevent='login'>
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
              </div>
              <button type="submit" class="is-hidden" ></button>
              <a class="button is-block is-info is-large" v-on:click="login()">Login</a>
            </form>
          </div>
          <p class="has-text-white">
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    login () {
      var button = document.querySelector('.button')
      button.classList.toggle('is-loading')
      this.$store.dispatch('login', {username: this.username, password: this.password})
        .then(() => {
          this.username = ''
          this.password = ''
          this.$router.replace('/init')
        }).catch((data) => {
          console.debug(data)
          button.classList.toggle('is-loading')
          this.$toast.open({
            message: 'Could not Login!',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
<style lang='scss' scoped>
  html,body {
    font-family: 'Open Sans', serif;
    font-size: 14px;
    font-weight: 300;
  }

  .hero.is-success {
    background: #F2F6FA;
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
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }

</style>

