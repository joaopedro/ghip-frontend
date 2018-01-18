<template>
  <div>
      <div class="tabs is-boxed">
        <ul>
          <li :class="{'is-active' : isActiveTab(0)}"><a @click="activeTab = 0">Users</a></li>
          <li :class="{'is-active' : isActiveTab(1)}"><a @click="activeTab = 1">Roles</a></li>
          <li :class="{'is-active' : isActiveTab(2)}"><a @click="activeTab = 2">Assets</a></li>
        </ul>
      </div>
      <div class="tab-panels">
        <ListUsers v-if="isActiveTab(0)"></ListUsers>
        <div class="tab-panel" v-if="isActiveTab(1)">
          <h2 class="title">
            User Roles
          </h2>
          <h3>To Do!</h3>
        </div>
        <div class="tab-panel" v-if="isActiveTab(2)">
          <h2 class="title">
            Asset Management
          </h2>
          <h3>To Do!</h3>
        </div>
      </div>
  </div>
</template>
<script>
import ListUsers from './ListUsers'

export default {
  name: 'AccessManagement',
  components: {
    'ListUsers': ListUsers
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    isActiveTab (id) {
      return this.activeTab === id
    }
  }
}
</script>
