import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { loginService } from '../services/Auth.services'

//import io from 'socket.io-client'
import jwt_decode from 'jwt-decode'
import useNotyf from '/@src/composable/useNotyf'
//import { routerKey } from 'vue-router'
//import { UserService } from '../../users/services/User.services'

const notif = useNotyf()
export interface Item {
  token: String
  isLogged: boolean
  typeUser: String
  mySocket: any | undefined
}

export const useAuthStore: any = defineStore({
  id: 'auth',
  state: () => ({
    user: useStorage('auth', {
      token: '',
      isLogged: false,
      usrole: '',
      exp: '',
      email: '',
      firstName: '',
      lastName: '',
      avatarFile: '',
      mySocket: null,
    }),
  }),
  getters: {
    authUser: (state) => state.user,
    isLogged: (state) => state.user.isLogged,
  },
  actions: {
    logout() {
      this.user = {
        token: '',
        isLogged: false,
        usrole: '',
        exp: '',
        email: '',
        firstName: '',
        lastName: '',
        avatarFile: '',
        mySocket: null,
      }
      window.location.assign('/login-page')
    },
    async login(user: string, password: string) {
      const response = await loginService.logIn({
        email: user,
        password: password,
      })

      //No llega el 201 en el data.status
      if (response.data.status === 403) {
        notif.error(response.data.message)
      } else {
        //let decoded = jwt_decode(response.data.data.access_token);
        const decoded = jwt_decode(response.data)

        this.user = {
          token: response.data,
          isLogged: true,
          //@ts-ignore
          usrole: decoded.dataToken.typeUser,
          //@ts-ignore
          email: decoded.dataToken.email,
          //@ts-ignore
          firstName: decoded.dataToken.firstName,
          //@ts-ignore
          lastName: decoded.dataToken.lastName,
          //@ts-ignore
          avatarFile: decoded.dataToken.avatarFile,
          //@ts-ignore
          exp: '',
          //@ts-ignore
          mySocket: null,
        }

        //notif.error(response.data.message)
        //No llega en mensaje desde el back
        notif.success('Welcome!')
        if (this.user.usrole == 'SUPER_ADMIN') {

          window.location.assign('/admin/users')
        } else if (this.user.usrole == 'STUDENTS' || this.user.usrole == 'CLIENTS') {
          window.location.assign('/student/dashboard')
        }
        //  this.authCheck();
      }
    },

    async setMyProfile(Item: any) {
      this.user = {
        ...this.user,
        usrole: Item.typeUser,
        //@ts-ignore
        firstName: Item.firstName,
        //@ts-ignore
        lastName: Item.lastName,
        //@ts-ignore
        avatarFile: Item.avatarFile,
        //@ts-ignore
      }
    },
    async signup(
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) {
      const response = await loginService.signup({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: email,
      })

      //No llega el 201 en el data.status
      if (response.data.status === 403) {
        notif.error(response.data.message)
      } else {
        //let decoded = jwt_decode(response.data.data.access_token);
        const decoded = jwt_decode(response.data)

        this.user = {
          token: response.data,
          isLogged: true,
          //@ts-ignore
          usrole: decoded.dataToken.typeUser,
          //@ts-ignore
          email: decoded.dataToken.email,
          //@ts-ignore
          firstName: decoded.dataToken.firstName,
          //@ts-ignore
          lastName: decoded.dataToken.lastName,
          //@ts-ignore
          avatarFile: decoded.dataToken.avatarFile,
          //@ts-ignore
          exp: '',
          //@ts-ignore
          mySocket: null,
        }

        //notif.error(response.data.message)
        //No llega en mensaje desde el back
        notif.success('Welcome!')
        window.location.assign('/home')
        //  this.authCheck();
      }
    },
    authCheck() {
      if (this.user.token.length > 1) {
        const current_time = new Date().getTime() / 1000
        if (current_time > parseInt(this.user.exp)) {
          this.user = {
            token: '',
            isLogged: false,
            usrole: '',
            exp: '',
            email: '',
            firstName: '',
            lastName: '',
            avatarFile: '',
            mySocket: null,
          }
          window.location.assign('/login-page')
        } else {
          window.location.assign('/home')
        }
      } else {
        this.user = {
          token: '',
          isLogged: false,
          usrole: '',
          exp: '',
          email: '',
          firstName: '',
          lastName: '',
          avatarFile: '',
          mySocket: null,
        }
      }
    },
  },
})
