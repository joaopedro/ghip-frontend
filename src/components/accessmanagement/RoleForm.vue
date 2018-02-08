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
        <b-field>
          <div class="button is-dark" @click="toggleAssetFormClicked()">
              <b-icon icon="plus" v-if="!showAssetForm"></b-icon>
              <b-icon icon="minus" v-if="showAssetForm"></b-icon>
              <span>Asset</span>
          </div>
        </b-field>
        <b-field grouped v-if="showAssetForm">
          <b-select placeholder="Select an Asset" v-model="assetId">
            <option
              v-for="asset in availableAssets"
              :value="asset.id"
              :key="asset.id"
              v-text="asset.name">
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
        <b-table
          :data="role.assetAuthorities"
          :paginated="false"
          :default-sort-direction="asc"
          default-sort="asset.name">

          <template slot-scope="assetAuthority">
            <b-table-column field="asset.id" label="ID" sortable numeric>
              {{ assetAuthority.row.pk.asset.id }}
            </b-table-column>

            <b-table-column field="asset.name" label="Name" sortable>
              {{ assetAuthority.row.pk.asset.name }}
            </b-table-column>

            <b-table-column field="permissions" label="Permissions" sortable>
              <span class="tag is-success" v-if="assetAuthority.row.read == true">
                Read
              </span>
              <span class="tag is-success" v-if="assetAuthority.row.write == true">
                Write
              </span>
              <span class="tag is-success" v-if="assetAuthority.row.delete == true">
                Delete
              </span>
            </b-table-column>
          </template>
        </b-table>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="create-button button is-primary" @click="createRole">Create</button>
      </footer>
    </div>
  </form>
</template>

<script>
  import aaaService from '@/services/aaa.service'
  import _ from 'lodash'

  export default {
    name: 'RoleForm',
    data () {
      return {
        showAssetForm: false,
        loading: false,
        role: {
          name: '',
          assetAuthorities: []
        },
        availableAssets: [],
        permissions: [],
        assetId: null
      }
    },
    methods: {
      createRole () {
        console.debug('creating role ->' + this.role)
        console.debug(this.role)
        var button = document.querySelector('.create-button')
        button.classList.toggle('is-loading')
        aaaService.createRole(this.role)
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
        aaaService.getAssets().then((data) => {
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
      },
      addAsset () {
        var asset = _.find(this.availableAssets, {id: this.assetId})
        if (typeof asset !== 'undefined') {
          _.remove(this.role.assetAuthorities, {pk: {asset: {id: asset.id}}})
          this.role.assetAuthorities.push(
            {
              pk: {
                asset: asset,
                authority: {}
              },
              read: this.permissions.includes('Read'),
              write: this.permissions.includes('Write'),
              delete: this.permissions.includes('Delete')
            }
          )
        }
        console.debug(this.permissions.includes('Read'))
      },
      toggleAssetFormClicked () {
        this.showAssetForm = !this.showAssetForm
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
