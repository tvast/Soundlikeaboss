<template>
  <q-page>
    <h1>Hello list</h1>
    <div
      :key="index"
      v-for="(item, index) in info"
    >{{item.title}}a
      <q-markdown :src="item.content"></q-markdown>
    </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      info: null
    }
  },
  methods: {

    async getactivedeveloper () {
      const response = await fetch('https://lit-ocean-56096.herokuapp.com/getDatasql')
      return await response.json()
    },
    GetdataPrint () {
      try {
        this.getactivedeveloper().then(x => {
          this.$store.commit('change', x)
          this.info = x
          // this.postData(f)
          // this.$router.push({ path: '/result' })
          window.console.log(x)
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.GetdataPrint()
  }
}

</script>
