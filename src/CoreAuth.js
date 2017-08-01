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

        Vue.router.beforeEach((to, from, next) => {
            if (to.meta.core === undefined) {
                return next()
            }

            const roles = Vue.prototype.$auth.user().roles

            if (roleCheck(to.meta.core, roles, Vue.prototype.$auth)) {
                return next()
            } else {
                if (Vue.prototype.$auth.check()) {
                    return next(options.authRedirect)
                }
                return next(options.forbiddenRedirect)
            }
        })

        definePrototype(Vue)
    }

    function roleCheck (check, userRoles, auth) {
        const authCheck = auth.check()
        if (check === undefined) {
            return authCheck
        }

        if (check === false || check === true) {
            if (check === true) {
                return !!authCheck
            }
            if (check === false) {
                return !authCheck
            }
        }

        const roles = userRoles
        for (let i = 0; i < roles.length; i++) {
            if (check.indexOf(roles[i].name) !== -1) {
                return true
            }
        }
        return false
    }

    function definePrototype (Vue) {
        CoreAuth.prototype.check = (role) => {
            return roleCheck(role, Vue.prototype.$auth.user().roles, Vue.prototype.$auth)
        }
    }

export default CoreAuth
