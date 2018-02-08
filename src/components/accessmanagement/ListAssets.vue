<template>
  <div class="container">
    <div >
      <h2 class="title">
        Assets
      </h2>
      <button class="button is-primary is-medium"
            @click="isAssetModalActive = true">
        <span>New Asset</span>
      </button>
      <b-modal :active.sync="isAssetModalActive" @loadAssets='loadAssets'>
        <modal-form v-bind="formProps"></modal-form>
      </b-modal>
      <b-table
        :data="assets"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="id">

        <template slot-scope="asset">
          <b-table-column field="id" label="Id" sortable>
            {{ asset.row.id}}
          </b-table-column>

          <b-table-column field="name" label="Name" sortable>
            {{ asset.row.name}}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import aaaService from '@/services/aaa.service'
import AssetForm from './AssetForm'

export default {
  name: 'ListAssets',
  components: {
    'modal-form': AssetForm
  },
  data () {
    return {
      isAssetModalActive: false,
      isPaginated: true,
      loading: false,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      assets: [],
      formProps: {
        email: 'evan@you.com',
        password: 'testing'
      }
    }
  },
  methods: {
    loadAssets () {
      this.loading = true
      aaaService.getAssets().then((data) => {
        this.assets = []
        data.forEach((asset) => this.assets.push(asset))
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
<style lang="scss" scoped>
  .container {
    margin-bottom: auto;
  }
</style>
