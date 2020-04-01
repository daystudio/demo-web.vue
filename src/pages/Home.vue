<template>
  <div>

    <v-app-bar
      app
      color="#008577"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Demo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon
        @click="open_add"
      >
        <v-icon>add</v-icon>
      </v-btn>

    </v-app-bar>
    <v-content>
      <v-card
        v-for="r in rs"
        :key="r.id"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              :src="r.a"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{r.u}}</v-list-item-title>
            <v-list-item-subtitle>{{r.t}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          :src="r.i"
          height="240"
        />

        <v-card-text>
          {{r.c}}
        </v-card-text>

      </v-card>
      <v-bottom-sheet
        v-model="ui.sheet_new.enable"
        color="white"
      >
        <v-card class="px-3">
          <v-subheader>新增紀錄</v-subheader>
          <v-text-field
            v-model="new_r.a"
            label="Avatar"
            hint="Avatar"
          />
          <v-text-field
            v-model="new_r.u"
            label="Name"
            hint="Name"
          />
          <v-text-field
            v-model="new_r.t"
            label="Time"
            hint="Time"
          />
          <v-text-field
            v-model="new_r.c"
            label="Content"
            hint="Content"
          />
          <v-text-field
            v-model="new_r.i"
            label="Image"
            hint="Image"
          />
          <v-flex>
            <v-btn
              style="margin-bottom: 10px;"
              color="success white--text"
              @click="save_new"
            >
              新增
            </v-btn>
          </v-flex>
        </v-card>
      </v-bottom-sheet>
    </v-content>
  </div>
</template>


<script>
export default {
  name: 'App',

  components: {
  },
  mounted () {
    console.log("good")
    this.get_post()
  },
  data: () => ({
    API_POST: 'https://crt8b3p0n9.execute-api.ap-southeast-1.amazonaws.com/prod',
    rs: [],
    new_r:{
      a: 'https://s3-ap-southeast-1.amazonaws.com/k.demo-mobile/steve.png',
      u: 'Steve Jobs',
      t: '2019-12-31',
      c: 'Toy Story 5: Woody, Buzz Lightyear and the rest of the gang embark on a road trip with Bonnie and a new toy named Forky.',
      i: 'https://s3-ap-southeast-1.amazonaws.com/k.demo-mobile/toystory4.jpg'
    },
    ui: {
      sheet_new: {
        enable: false
      }
    }
  }),
  methods: {
    get_post: function () {
      var self = this
      this.$axios
        .get(this.API_POST, {
          headers: {
          }
        })
        .then(response => {
          console.log(response.data)
          if (response.data.length > 0) {
            this.rs = response.data
          } else {
            self.$snack.danger({
              text: 'error',
              button: 'OK'
            })
          }
        }).catch(reason => {
          console.log(reason)
          self.$snack.danger({
            text: reason,
            button: 'OK'
          })
        })
    },
    open_add: function () {
      console.log('add')
      this.ui.sheet_new.enable = true
    },
    save_new: function () {
      console.log('save')
      var self = this

      this.ui.sheet_new.enable = false
      this.$axios
        .post(this.API_POST, this.new_r, {
          headers: {
            'Content-type': 'application/json',
          }
        })
        .then(response => {
          console.log(response.data)
          if (response.data.length > 0) {
            this.$snack.success({
              text: '已儲存',
              button: 'OK'
            })
            self.rs = response.data
          } else {
            self.$snack.danger({
              text: 'error',
              button: 'OK'
            })
          }
        }).catch(reason => {
          console.log(reason)
          self.$snack.danger({
            text: reason,
            button: 'OK'
          })
        })
    }
  }
};
</script>
