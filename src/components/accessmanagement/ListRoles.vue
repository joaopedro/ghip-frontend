<template>
  <div class="container">
    <div >
      <h2 class="title">
        Roles
      </h2>
      <button class="button is-primary is-medium"
            @click="isRoleModalActive = true">
        <span>New Role</span>
      </button>
      <b-modal :active.sync="isRoleModalActive" @loadRoles='loadRoles'>
        <modal-form />
      </b-modal>
      <b-table
        :data="roles"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="id"
        detailed>

        <template slot-scope="role">
          <b-table-column field="id" label="Id" sortable>
            {{ role.row.id}}
          </b-table-column>

          <b-table-column field="name" label="Name" sortable>
            {{ role.row.name}}
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="role">
          <div class="content">
            <p v-if="role.row.assetAuthorities.length == 0">No Asset Associated yet</p>
            <p v-for="assetAuthority in role.row.assetAuthorities" v-bind:key="assetAuthority.pk.asset.id">
              <strong>Asset: </strong>
              <small>{{ assetAuthority.pk.asset.name }}</small>
              <strong>Permissions: </strong>
              <small>Read: </small><small>{{ assetAuthority.read }}</small>
              <small>Write: </small><small>{{ assetAuthority.write }}</small>
              <small>Delete: </small><small>{{ assetAuthority.delete }}</small>
            </p>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import appService from '@/app.service'
import RoleForm from './RoleForm'

export default {
  name: 'ListUsers',
  components: {
    'modal-form': RoleForm
  },
  data () {
    return {
      isRoleModalActive: false,
      isPaginated: true,
      loading: false,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      roles: []
    }
  },
  methods: {
    loadRoles () {
      this.loading = true
      appService.getRoles().then((data) => {
        this.roles = []
        data.forEach((role) => this.roles.push(role))
      }).catch((data) => {
        console.debug(data)
        this.loading = true
        this.$toast.open({
          message: 'Could not load Roles!',
          type: 'is-danger'
        })
        this.loading = false
      })
    }
  },
  mounted () {
    this.loadRoles()
  }
}
</script>
<style lang="scss" scoped>
  .container {
    margin-bottom: auto;
  }
</style>
