<template>
  <div class="container">
    <div >
      <h2 class="title">
        {{ $tc('accessManagement.user.longDescription', 2) }}
      </h2>
      <button class="button is-primary is-medium"
            @click="isUserModalActive = true">
        <b-icon icon="account-plus"
                size="is-small"></b-icon>
        <span>{{$t('common.new')}}</span>
      </button>
      <b-modal :active.sync="isUserModalActive" @loadUsers='loadUsers'>
        <modal-form v-bind="formProps"></modal-form>
      </b-modal>
      <b-table
        :data="users"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="email">

        <template slot-scope="user">
          <b-table-column field="username" :label="$t('accessManagement.user.username')" sortable>
            {{ user.row.username}}
          </b-table-column>

          <b-table-column field="email" :label="$t('accessManagement.user.email')" sortable>
            {{ user.row.email}}
          </b-table-column>

          <b-table-column field="name" :label="$t('common.name')" sortable>
            {{ user.row.name }}
          </b-table-column>

          <b-table-column field="language" :label="$t('accessManagement.user.lang')" sortable>
            {{ user.row.lang }}
          </b-table-column>

          <b-table-column field="roles" :label="$tc('accessManagement.role.shortDescription',2)" >
            <div v-for="auth of user.row.authorities" v-bind:key="auth.name">
              {{auth.name}}&nbsp;
            </div>
          </b-table-column>

          <b-table-column field="comment" :label="$t('accessManagement.user.comment')">
            {{ user.row.comment }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import aaaService from '@/services/aaa.service'
import UserForm from './UserForm'

export default {
  name: 'ListUsers',
  components: {
    'modal-form': UserForm
  },
  data () {
    return {
      isUserModalActive: false,
      isPaginated: true,
      loading: false,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      users: [],
      formProps: {
        email: 'evan@you.com',
        password: 'testing'
      }
    }
  },
  methods: {
    loadUsers () {
      this.loading = true
      aaaService.getUsers().then((data) => {
        this.users = []
        data.forEach((item) => this.users.push(item))
      }).catch((data) => {
        console.debug(data)
        this.loading = true
        this.$toast.open({
          message: 'Could not load Users!',
          type: 'is-danger'
        })
        this.loading = false
      })
    }
  },
  mounted () {
    this.loadUsers()
  }
}
</script>
<style lang="scss" scoped>
  .container {
    margin-bottom: auto;
  }
</style>
