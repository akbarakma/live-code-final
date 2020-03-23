import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'

const baseUrl = 'http://localhost:3000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    reports: []
  },
  mutations: {
    GET_COUNTRIES(state, data) {
      let sorted = data.sort((a, b) => {
        return a.id - b.id;
      })
      state.countries = sorted;
    },
    GET_REPORT(state, data) {
      state.reports = data;
    },
    DELETE_DATA(state, id) {
      let data = state.reports.filter(x => {
        return x.id !== id;
      });
      state.reports = data;
    },
  },
  actions: {
    loginUser({ commit, dispatch }, data) {
      axios({
        method: 'POST',
        url: baseUrl + '/login',
        data
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          router.push('/');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    getCountries({ commit, dispatch }) {
      axios({
        method: 'GET',
        url: baseUrl + '/countries',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('GET_COUNTRIES', data);
        }).catch(err => {
          dispatch('showError', err);
        })
    },
    getReport({ commit, dispatch }) {
      axios({
        method: 'GET',
        url: baseUrl + '/reports',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('GET_REPORT', data);
        }).catch(err => {
          dispatch('showError', err);
        })
    },
    deleteData({ commit, dispatch }, id) {
      axios({
        method: 'DELETE',
        url: baseUrl + '/reports/' + id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          commit('DELETE_DATA', id);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    addReport({ commit, dispatch }, data) {
      axios({
        method: 'POST',
        url: baseUrl + '/reports',
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
        .then(({ data }) => {
          dispatch('getReport');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    showError({ commit }, err) {
      let msg = '';
      if (err.response) {
        if (Array.isArray(err.response.data.errors)) {
          msg = err.response.data.errors.join('<br>');
        }
      } else if (err.request) {
        msg = err.request;
        console.log(err.request);
      } else {
        msg = err.message;
        console.log('err', err.message);
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `${msg}`,
      })
    }
  },
  modules: {
  }
})
