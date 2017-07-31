import utils from './libs/utils'
import CoreAuth from './CoreAuth'

import coreLogin from './components/login.vue'
import coreMagicLink from './components/magicLink.vue'
import coreReset from './components/reset.vue'
import coreAvatar from './components/avatar.vue'
import coreAccountItem from './components/account/accountItem.vue'
import coreAccountChooser from './components/account/accountChooser.vue'

function plugin (Vue, options) {
    Vue.component('core-login', coreLogin)
    Vue.component('core-magic-link', coreMagicLink)
    Vue.component('core-reset', coreReset)
    Vue.component('core-avatar', coreAvatar)
    Vue.component('core-account-item', coreAccountItem)
    Vue.component('core-account-chooser', coreAccountChooser)

    const defaultOptions = {
            auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
            http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
            router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
            baseURL: 'http://localhost:8000',
            facebookClientId: '',
            googleClientId: '',
            oAuth2RedirectUrl: window.location.origin + window.location.pathname,
            loginData: { url: options.baseURL + '/auth/login', method: 'POST' },
            fetchData: { url: options.baseURL + '/auth/user', method: 'GET' },
            refreshData: { enabled: true, interval: 60, url: options.baseURL + '/auth/refresh', method: 'GET' },
            logoutData: { url: options.baseURL + '/auth/logout', method: 'POST', makeRequest: true },
            authRedirect: { name: 'Login' },
            notFoundRedirect: { name: 'NotFound' },
            tokenName: 'core-auth',
            rolesVar: 'permission',
            forbiddenRedirect: { name: 'Login' },
            facebookData: {
                url: options.baseURL + '/auth/facebook'
            },
            googleData: {
                url: options.baseURL + '/auth/google'
            },
            facebookOauth2Data: {
                url: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirect: function () { return options.oAuth2RedirectUrl + '?provider=facebook' },
                clientId: options.facebookClientId,
                scope: 'email'
            },
            googleOauth2Data: {
                url: 'https://accounts.google.com/o/oauth2/auth',
                redirect: function () { return options.oAuth2RedirectUrl + '?provider=google' },
                clientId: options.googleClientId,
                scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.login'
            }
    }
    options = utils.extend(defaultOptions, [options || {}])

    // Create a new instance of CoreAuth
    const Auth = new CoreAuth(Vue, options)

    // Define core prototypes
    Vue.prototype.$coreAuthOptions = function (data) {
        if (options.hasOwnProperty(data)) {
            return options[data]
        }
    }
    /*
    // Define core prototypes
   Object.defineProperties(Vue.prototype, {
        $coreAuth: {
            get: () => {
                return Auth
            }
        }
    }) */
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  version
}
