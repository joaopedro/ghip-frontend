<template>
  <div class="container has-text-centered">
    <div class="column is-6 is-offset-3">
      <h1 class="title">
        Coming Soon - {{ $t("message.hello") }}
      </h1>
      <div>
        <select v-model="selectedLang" @click="changeLanguage()">
          <option disabled value="">Please select one</option>
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="jp">Japonese</option>
        </select>
        <span>Selected: {{ selectedLang }}</span>
      </div>
      <div>{{user}}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import aaaService from '@/services/aaa.service'
import {loadLanguageAsync, i18n} from '@/setup/i18n-setup.js'
export default {
  name: 'UserInfo',
  data () {
    return {
      user: {},
      selectedLang: ''
    }
  },
  computed: {
    ...mapGetters(['userUsername'])
  },
  methods: {
    loadUser () {
      this.loading = true
      aaaService.getUser(this.userUsername).then((data) => {
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
    },
    changeLanguage () {
      loadLanguageAsync(this.selectedLang).then(() => console.debug(i18n.locale))
    }
  },
  mounted () {
    this.loadUser()
  }
}
</script>

