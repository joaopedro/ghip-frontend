<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Role</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-input
            v-model="role.name"
            placeholder="Name"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="create-button button is-primary" @click="createRole">Create</button>
      </footer>
    </div>
  </form>
</template>

<script>
  import appService from '@/app.service'

  export default {
    name: 'RoleForm',
    data () {
      return {
        role: {
          name: ''
        }
      }
    },
    methods: {
      createRole () {
        console.debug('creating role ->' + this.role)
        console.debug(this.role)
        var button = document.querySelector('.create-button')
        button.classList.toggle('is-loading')
        appService.createRole(this.role)
        .then(() => {
          button.classList.toggle('is-loading')
          this.$parent.$emit('loadRoles')
          this.$parent.close()
        }).catch((data) => {
          button.classList.toggle('is-loading')
          this.$toast.open({
            message: `Could create Role! : ${data}`,
            type: 'is-danger'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .modal-card {
    width: auto;
  }
</style>
