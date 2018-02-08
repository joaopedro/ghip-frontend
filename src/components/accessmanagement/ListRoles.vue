<template>
  <div class="container">
    <div >
      <h2 class="title">
        {{$tc('accessManagement.role.longDescription', 2)}}
      </h2>
      <button class="button is-primary is-medium"
            @click="isRoleModalActive = true">
        <span>{{$t('common.new')}} {{$tc('accessManagement.role.shortDescription', 1)}}</span>
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
          <b-table-column field="id" :label="$t('common.id')" sortable>
            {{ role.row.id}}
          </b-table-column>

          <b-table-column field="name" :label="$t('common.name')" sortable>
            {{ role.row.name}}
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="role">
          <div class="content">
            <p v-if="role.row.assetAuthorities.length == 0">{{$t('accessManagement.asset.notAssociated')}}</p>
            <p v-for="assetAuthority in role.row.assetAuthorities" v-bind:key="assetAuthority.pk.asset.id">
              <strong>{{$tc('accessManagement.asset.shortDescription',1)}}: </strong>
              <small>{{ assetAuthority.pk.asset.name }}</small>
              <strong>{{$tc('accessManagement.asset.permission', 2)}}: </strong>
              <small>{{$t('accessManagement.asset.read')}}: </small><small>{{ assetAuthority.read }}</small>
              <small>{{$t('accessManagement.asset.write')}}: </small><small>{{ assetAuthority.write }}</small>
              <small>{{$t('accessManagement.asset.delete')}}: </small><small>{{ assetAuthority.delete }}</small>
            </p>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import aaaService from '@/services/aaa.service'
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
      aaaService.getRoles().then((data) => {
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
