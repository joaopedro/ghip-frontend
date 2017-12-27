<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">User</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-input
            v-model="user.name"
            placeholder="Name"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="email"
            v-model="user.email"
            placeholder="Email"
            maxlength="30"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="username"
            v-model="user.username"
            placeholder="Username"
            required
            maxlength="30">
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="password"
            v-model="user.password"
            placeholder="Your password"
            password-reveal
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="password"
            v-model="user.passwordConfirmation"
            placeholder="Confirm Your password"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-taginput
            v-model="user.roles"
            :data="availableRoles"
            autocomplete
            field="name"
            icon="label"
            placeholder="Add a Role"
            @typing="getAvailableRoles">
          </b-taginput>
        </b-field>
        <b-field>
          <b-input type="textarea"
            v-model="user.comment"
              maxlength="100"
            placeholder="comment on the user">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary" @click="createUser">Create</button>
      </footer>
    </div>
  </form>
</template>

<script>
  import appService from '../app.service'

  export default {
    name: 'UserForm',
    data () {
      return {
        user: {
          name: '',
          email: '',
          username: '',
          password: '',
          passwordConfirmation: '',
          roles: [],
          comment: ''
        },
        availableRoles: [
          {id: 1, name: 'ADMIN'},
          {id: 2, name: 'USER'}
        ],
        filteredRoles: this.availableRoles
      }
    },
    methods: {
      getFilteredTags   (text) {
        this.availableRoles = this.availableRoles.filter((option) => {
          return option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        })
      },
      createUser () {
        console.debug('creating user ->' + this.user)
        console.debug(this.user)
        appService.createUser(this.user)
      }
    }
  }
</script>
<style scoped>
  .modal-card {
    width: auto;
  }
</style>
