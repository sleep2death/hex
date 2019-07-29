<template>
  <div class="about">
    <h1>Is server running? {{running}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'game',
  components: {
  },
  methods: {
    ...mapActions(['isServerRunning']),
    connect () {
      const conn = new WebSocket('ws://localhost:9090/ws')
      conn.onopen = function (evt) {
        console.log(evt)
      }
    }
  },
  mounted () {
    this.isServerRunning()
    this.connect()
  },
  computed: mapState([
  // map this.count to store.state.count
    'running'
  ])
}
</script>
