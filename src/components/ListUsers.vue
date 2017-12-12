<template>
  <div class="container">
    <div class="column is-6 is-offset-3">
      <h1 class="title">
        Users
      </h1>
      <h2 class="subtitle">
        {{ msg }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListUsers',
  data () {
    return {
      msg: 'List of users'
    }
  }
}
</script>
