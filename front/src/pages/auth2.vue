<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">

      <div class="row">

        <div class="col-12 ">
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
                  <div class="text-h6">Register</div>
                  <q-form @submit="signUp">
                    <q-input
                      v-if="tab == 'login'"
                      v-model="name"
                      class="q-mb-md"
                      outlined
                      label="Name"
                    />
                    <q-input
                      v-model="email"
                      class="q-mb-md"
                      outlined
                      type="email"
                      label="Email"
                    />
                    <q-input
                      v-model="password"
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
                  <div class="text-h6">Login</div>
                  <q-form @submit="login">
                    <q-input
                      v-if="tab == 'register'"
                      v-model="name"
                      class="q-mb-md"
                      outlined
                      label="Name"
                    />
                    <q-input
                      v-model="email"
                      class="q-mb-md"
                      outlined
                      type="email"
                      label="Email"
                    />
                    <q-input
                      v-model="password"
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
        </div>
      </div>
      <!-- content -->
      <!-- <h3>{{$store.getters.flavor.title}}</h3> -->

      <!-- <q-tab
        name="movies"
        icon="movie"
        label="Movies"
      /> -->
      <!-- </q-tabs> -->
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
export default {
  name: 'signup',
  data () {
    return {
      tab: 'register',
      name: '',
      email: '',
      password: ''

    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          firebaseDb.ref('utilisateur/').set({
            name: this.email,
            email: this.password,
            online: true
          })
          alert('Your account has been created!')
          this.$router.push({ path: '/index' })
        },
        (err) => {
          alert('Opps!' + err.message)
        }
      )
    },
    login () {
      firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
        .then(function (response) {
          console.log(response)
        })
        .catch(error => {
          //   console.log(payload)
          console.log(error.message)
        })
    }
  }
}
</script>
