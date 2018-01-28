<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Asset</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-input
            v-model="asset.name"
            placeholder="Name"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="create-button button is-primary" @click="createAsset">Create</button>
      </footer>
    </div>
  </form>
</template>

<script>
  import appService from '@/app.service'

  export default {
    name: 'AssetForm',
    data () {
      return {
        asset: {
          name: ''
        }
      }
    },
    methods: {
      createAsset () {
        console.debug('creating asset ->' + this.asset)
        console.debug(this.asset)
        var button = document.querySelector('.create-button')
        button.classList.toggle('is-loading')
        appService.createAsset(this.asset)
        .then(() => {
          button.classList.toggle('is-loading')
          this.$parent.$emit('loadAssets')
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
