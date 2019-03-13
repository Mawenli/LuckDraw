<template>
  <div id="app">
    <!-- <HelloWorld/>
    <v-address/> -->
    <router-view>
   </router-view>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
import address from './components/address.vue'
export default {
  name: 'app',
  components: {
    HelloWorld,
    'v-address':address,
  }
}
</script>

<style>

</style>
