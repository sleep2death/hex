  <template>
  <div class="section">
    <!-- <h1>Is server running? {{running}}</h1> -->
    <div class="field has-addons">
      <div class="control fullwidth">
        <input v-model="message" @keyup="onKeyUp" type="text" class="input" placeholder="Input here" />
      </div>
      <div class="control">
        <a class="button" @click="send">Echo</a>
      </div>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.message }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'game',
  components: {},
  methods: {
    ...mapActions(['isServerRunning', 'connect', 'send']),
    onKeyUp (evt) {
      if (evt.key === 'Enter') {
        this.send()
      }
    }
  },
  mounted () {
    this.isServerRunning()
    this.connect()
  },
  computed: {
    ...mapState({
      // map this.count to store.state.count
      running: 'running',
      list: state => state.echo.list
    }),
    message: {
      get () {
        return this.$store.state.echo.message
      },
      set (value) {
        this.$store.commit('updateMessage', value)
      }
    }
  }
}
</script>

<style lang="css">
  .fullwidth {
    width: 100%;
  }
</style>
