import VueAuth from '@websanova/vue-auth'

    function CoreAuth (Vue, options) {
        Vue.use(VueAuth, {
            auth: options.auth,
            http: options.http,
            router: options.router,
            rolesVar: options.rolesVar,
            loginData: options.loginData,
            fetchData: options.fetchData,
            logoutData: options.logoutData,
            authRedirect: options.authRedirect,
            notFoundRedirect: options.notFoundRedirect,
            forbiddenRedirect: options.forbiddenRedirect,
            refreshData: options.refreshData,
            tokenName: options.tokenName,
            facebookData: options.facebookData,
            googleData: options.googleData,
            facebookOauth2Data: options.facebookOauth2Data,
            googleOauth2Data: options.googleOauth2Data
        }, options.router)
        // definePrototype(Vue)
    }

    function definePrototype (Vue, vm) {
        CoreAuth.prototype.login = (data) => {
            return vm.login(data)
        }

        CoreAuth.prototype.user = () => {
            return Vue.prototype.$auth.user()
        }
    }

export default CoreAuth
