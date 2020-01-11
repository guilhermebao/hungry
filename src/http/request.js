import axios from 'axios'
import {
  mapActions
} from 'vuex'
import {
  errorMessage
} from '@/components/MessageBus'

export const setTokenHeader = (token) => {
  if (HTTP)
    HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const HTTP = axios.create({})

export default {
  methods: {
    ...mapActions({
      startLoading: 'startLoading',
      endLoading: 'endLoading'
    }),
    baseRequest(method, url, data, endLoading) {
      this.startLoading();
      return new Promise((resolve, reject) => {
        HTTP.request({
          method,
          url,
          data
        }).then(response => {
          resolve(response.data)
          if (typeof endLoading == 'undefined' || endLoading)
            this.endLoading()
        }).catch(error => {
          if (typeof endLoading == 'undefined' || endLoading)
            this.endLoading()
          if (error.response) {
            if (error.response.status === 405 || error.response.status === 500) {
              if (error.response.data.errorCode === 3) {
                errorMessage('Seu login expirou');
              } else if (error.response.data.errorMessage) {
                errorMessage(error.response.data.errorMessage);
              } else {
                errorMessage('Ocorreu um error inesperado');
              }
            } else if (error.response.status === 504) {
              errorMessage('Ocorreu um erro na comunicação em breve será restaurado');
            } else if (error.response.data.errorMessage) {
              errorMessage(error.response.data.errorMessage);
            }
          } else if (error.request) {
            console.log('Error', error.request);
            errorMessage(error.message);
          } else {
            console.log('Error', error.message);
            errorMessage(error.message)
          }
          reject(error)
        })
      })
    },
    post(url, data, endLoading) {
      return this.baseRequest('post', url, data, endLoading);
    },
    get(url) {
      return this.baseRequest('get', url);
    },
    put(url, data) {
      return this.baseRequest('put', url, data);
    },
    delete(url) {
      return this.baseRequest('delete', url);
    }
  }
}