<template>
  <div>
      <div class="tabs is-boxed">
        <ul>
          <li :class="{'is-active' : isActiveTab(0)}"><a @click="activeTab = 0">{{$tc('accessManagement.user.shortDescription', 2)}}</a></li>
          <li :class="{'is-active' : isActiveTab(1)}"><a @click="activeTab = 1">{{$tc('accessManagement.role.shortDescription', 2)}}</a></li>
          <li :class="{'is-active' : isActiveTab(2)}"><a @click="activeTab = 2">{{$tc('accessManagement.asset.shortDescription', 2)}}</a></li>
        </ul>
      </div>
      <div class="tab-panels">
        <ListUsers v-if="isActiveTab(0)"></ListUsers>
        <ListRoles v-if="isActiveTab(1)"></ListRoles>
        <ListAssets v-if="isActiveTab(2)"></ListAssets>
      </div>
  </div>
</template>
<script>
import ListUsers from './ListUsers'
import ListRoles from './ListRoles'
import ListAssets from './ListAssets'

export default {
  name: 'AccessManagement',
  components: {
    'ListUsers': ListUsers,
    'ListRoles': ListRoles,
    'ListAssets': ListAssets
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
