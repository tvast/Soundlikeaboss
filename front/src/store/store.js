import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {

}
const mutations = {

}
const actions = {
  registerUser (payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.password, payload.email)
      .then(function (response) {
        console.log(response)
        const userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).set({
          name: payload.name,
          email: payload.email,
          online: true
        })
      })
      .catch(error => {
        console.log(payload)
        console.log(error.message)
      })
  },
  loginUser (payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(function (response) {
        console.log(response)
      })
      .catch(error => {
        console.log(payload)
        console.log(error.message)
      })
  }
}
const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
