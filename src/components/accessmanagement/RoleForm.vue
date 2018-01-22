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
        <b-field grouped>
          <b-select placeholder="Select an Asset" v-model="asset">
            <option
              v-for="asset in availableAssets"
              :value="asset.id"
              :key="asset.id">
              {{ asset.name }}
            </option>
          </b-select>
          <b-checkbox-button v-model="permissions"
                native-value="Read"
                type="is-success">
                <b-icon icon="check"></b-icon>
                <span>Read</span>
            </b-checkbox-button>
          <b-checkbox-button v-model="permissions"
                native-value="Write"
                type="is-success">
                <b-icon icon="check"></b-icon>
                <span>Write</span>
            </b-checkbox-button>
          <b-checkbox-button v-model="permissions"
                native-value="Delete"
                type="is-success">
                <b-icon icon="check"></b-icon>
                <span>Delete</span>
          </b-checkbox-button>
          <button class="button is-info" type="button" @click='addAsset()'>Add</button>
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
        loading: false,
        role: {
          name: ''
        },
        availableAssets: [],
        permissions: [],
        asset: null
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
      },
      loadAssets () {
        this.loading = true
        appService.getAssets().then((data) => {
          this.availableAssets = []
          data.forEach((item) => this.availableAssets.push(item))
        }).catch((data) => {
          console.debug(data)
          this.loading = true
          this.$toast.open({
            message: 'Could not load Assets!',
            type: 'is-danger'
          })
          this.loading = false
        })
      }
    },
    mounted () {
      this.loadAssets()
    }
  }
</script>
<style scoped>
  .modal-card {
    width: auto;
  }
</style>
