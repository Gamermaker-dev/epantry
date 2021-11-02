<template>
  <div class="home">
    <RefuelBanner :title="'Refuel ePantry'" :subtitle="'Loving People Safely'" />
    <RefuelVerseOfTheDay :verseRef="verseRef" :verse="verse" />
    <section v-if="authenticated" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="content">
              Welcome back, {{ user.first_name }} {{ user.last_name }}!
            </div>
          </div>
        </div>
      </div>
    </section>
    <RefuelLogin v-else />
  </div>
</template>

<script>
import axios from "axios"
import { toast } from "bulma-toast"
import RefuelBanner from "../components/RefuelBanner.vue"
import RefuelVerseOfTheDay from "../components/RefuelVerseOfTheDay.vue"
import RefuelLogin from "../components/RefuelLogin.vue"

export default {
  name: "Home",
  inject: ['securityService'],
  components: {
    RefuelBanner,
    RefuelVerseOfTheDay,
    RefuelLogin,
  },
  data () {
    return {
      verseRef: null,
      verse: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.get('/verseoftheday/')
      .then((res) => {
        next(vm => vm.setVerse(res.data.verse, res.data.passage))
      }, (rej) => {
        const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
        toast({
            message: errorMessage,
            type: 'is-danger',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
        })
      })
  },
  beforeRouterUpdate (to, from, next) {
    this.verseRef = null;
    this.verse = null;
    axios.get('/verseoftheday/')
      .then((res) => {
        this.setVerse(res.data.verse, res.data.passage)
        next()
      }, (rej) => {
        const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
        toast({
            message: errorMessage,
            type: 'is-danger',
            dismissible: true,
            animate: { in: 'fadeIn', out: 'fadeOut' },
        })
      })
  },
  methods: {
    setVerse: function (verseRef, verse) {
      this.verseRef = verseRef
      this.verse = verse
    }
  },
  computed: {
    user: function() {
      return this.securityService.user
    },
    authenticated: function() {
      return this.securityService.isUserAuthenticated()
    },
  },
};
</script>
