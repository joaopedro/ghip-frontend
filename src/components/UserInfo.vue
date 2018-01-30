<template>
  <div class="container has-text-centered">
    <div class="column is-6 is-offset-3">
      <h1 class="title">
        Coming Soon
      </h1>
      {{user}}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import appService from '@/app.service'

export default {
  name: 'UserInfo',
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters(['userUsername'])
  },
  methods: {
    loadUser () {
      this.loading = true
      appService.getUser(this.userUsername).then((data) => {
        console.debug(data)
        this.user = data
      }).catch((data) => {
        console.debug(data)
        this.loading = true
        this.$toast.open({
          message: 'Could not load user!',
          type: 'is-danger'
        })
        this.loading = false
      })
    }
  },
  mounted () {
    this.loadUser()
  }
}
</script>

