<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{$tc('accessManagement.user.shortDescription', 1)}}</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-input
            v-model="user.name"
            :placeholder="$t('common.name')"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="email"
            v-model="user.email"
            :placeholder="$t('accessManagement.user.email')"
            maxlength="30"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="username"
            v-model="user.username"
            :placeholder="$t('accessManagement.user.username')"
            required
            maxlength="30">
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="password"
            v-model="user.password"
            :placeholder="$t('accessManagement.user.password')"
            password-reveal
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="password"
            v-model="user.passwordConfirmation"
            :placeholder="$t('accessManagement.user.passwordConfirmation')"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-taginput
            v-model="user.authorities"
            :data="filteredRoles"
            autocomplete
            field="name"
            icon="label"
            :placeholder="$t('accessManagement.user.addRole')"
            @typing="getfilteredRoles">
          </b-taginput>
        </b-field>
        <b-field>
          <b-select :placeholder="$t('accessManagement.user.lang')"
              v-model="user.lang" required>
            <option value="pt">Portugues</option>
            <option value="en">English</option>
            <option value="jp">Japonese</option>
          </b-select>
        </b-field>
        <b-field>
          <b-input type="textarea"
            v-model="user.comment"
              maxlength="100"
            :placeholder="$t('accessManagement.user.comment')">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">{{$t('common.close')}}</button>
        <button class="create-button button is-primary" @click="createUser">{{$t('common.create')}}</button>
      </footer>
    </div>
  </form>
</template>

<script>
  import aaaService from '@/services/aaa.service'

  export default {
    name: 'UserForm',
    data () {
      return {
        user: {
          name: '',
          email: '',
          username: '',
          password: '',
          lang: '',
          passwordConfirmation: '',
          authorities: [],
          comment: ''
        },
        availableRoles: [],
        filteredRoles: this.availableRoles
      }
    },
    methods: {
      loadRoles () {
        this.loading = true
        aaaService.getRoles().then((data) => {
          this.roles = []
          data.forEach((role) => this.availableRoles.push(role))
        }).catch((data) => {
          console.debug(data)
          this.loading = true
          this.$toast.open({
            message: 'Could not load Roles!',
            type: 'is-danger'
          })
          this.loading = false
        })
      },
      getfilteredRoles (text) {
        this.filteredRoles = this.availableRoles.filter((option) => {
          return option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        })
      },
      createUser () {
        console.debug('creating user ->' + this.user)
        console.debug(this.user)
        var button = document.querySelector('.create-button')
        button.classList.toggle('is-loading')
        aaaService.createUser(this.user)
        .then(() => {
          button.classList.toggle('is-loading')
          this.$parent.$emit('loadUsers')
          this.$parent.close()
        }).catch((data) => {
          button.classList.toggle('is-loading')
          this.$toast.open({
            message: `Could create user! : ${data}`,
            type: 'is-danger'
          })
        })
      }
    },
    mounted () {
      this.loadRoles()
    }
  }
</script>
<style scoped>
  .modal-card {
    width: auto;
  }
</style>
