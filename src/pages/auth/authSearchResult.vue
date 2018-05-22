<template>
  <div>
    <img :src="url" alt="" v-on:error="error">
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: '/staticm/img/avatar.png'
    }
  },
  methods: {
    error () {
      this.url = 'https://www.baidu.com/img/540-258%20dong_0ca7c638f1d7a2376739fe2d382feef1.gif'
    }
  }
}
</script>
