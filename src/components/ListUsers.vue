<template>
  <div class="container">
    <div >
      <h2 class="title">
        Application Users
      </h2>
      <b-table
        :data="users"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="email">

        <template slot-scope="user">
          <b-table-column field="email" label="Email" sortable>
            {{ user.row.username}}
          </b-table-column>

          <b-table-column field="name" label="Name" sortable>
            {{ user.row.name }}
          </b-table-column>

          <b-table-column field="roles" label="Roles" >
            <div v-for="auth of user.row.authorities" v-bind:key="auth.name">
              {{auth.name}}&nbsp;
            </div>
          </b-table-column>

          <b-table-column field="comment" label="Comment">
            {{ user.row.comment }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import appService from '../app.service'

export default {
  name: 'ListUsers',
  data () {
    return {
      isPaginated: true,
      loading: false,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      users: []
    }
  },
  methods: {
    loadUsers () {
      this.loading = true
      appService.getUsers().then((data) => {
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
