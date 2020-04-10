<template>
  <q-page padding>
    <!-- content -->
    <!-- <h3>{{$store.getters.flavor.title}}</h3> -->
    <div
      class="q-gutter-y-md"
      style="max-width: 600px"
    >
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            name="register"
            label="Register"
          />
          <q-tab
            name="login"
            label="Login"
          />
          <!-- <q-tab
            name="movies"
            label="Movies"
          /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel name="register">
            <div class="text-h6">LOGIN</div>
            <q-form @submit="submitForm">
              <q-input
                v-if="tab == 'login'"
                v-model="formData.name"
                class="q-mb-md"
                outlined
                label="Name"
              />
              <q-input
                v-model="formData.email"
                class="q-mb-md"
                outlined
                type="email"
                label="Email"
              />
              <q-input
                v-model="formData.password"
                class="q-mb-md"
                outlined
                type="password"
                label="Password"
              />
              <div class="row">
                <q-space />
                <q-btn
                  color="primary"
                  type="submit"
                  :label="tab"
                />
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="login">
            <div class="text-h6">REGISTER</div>
            <q-form @submit="submitForm">
              <q-input
                v-if="tab == 'register'"
                v-model="formData.name"
                class="q-mb-md"
                outlined
                label="Name"
              />
              <q-input
                v-model="formData.email"
                class="q-mb-md"
                outlined
                type="email"
                label="Email"
              />
              <q-input
                v-model="formData.password"
                class="q-mb-md"
                outlined
                type="password"
                label="Password"
              />
              <div class="row">
                <q-space />
                <q-btn
                  color="primary"
                  type="submit"
                  :label="tab"
                />
              </div>
            </q-form>

          </q-tab-panel>

          <!-- <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card>
    </div>
    <!-- <q-tab
        name="movies"
        icon="movie"
        label="Movies"
      /> -->
    <!-- </q-tabs> -->
  </q-page>
</template>

<script>
// import Vue from 'vue'
// import Plugin from '@quasar/quasar-ui-qmarkdown'
// import '@quasar/quasar-ui-qmarkdown/dist/index.css'
// Vue.use(Plugin)
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tab: 'register',
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('store', ['registerUser', 'loginUser']),
    submitForm () {
      if (this.tab === 'login') {
        this.loginUser(JSON.stringify(this.formData))
        console.log(this.formData)
      } else {
        this.registerUser(JSON.stringify(this.formData))
        console.log(this.formData)
      }
    }
  }
  // name: 'PageName',
}
</script>
