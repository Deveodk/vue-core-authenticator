<template>
    <div class="core-auth">
        <transition-group name="fade" tag="p">
            <div class="alert alert-danger" role="alert" v-for="error in errors" v-bind:key="error">
                <span class="fa fa-warning" aria-hidden="true"></span>
                {{error[0]}}
            </div>
        </transition-group>
        <magic-link-auth v-if="magicToken" @error="setError($event)">
        </magic-link-auth>
        <o-auth-callback v-else-if="oAuthCode" @back="oAuthCode = false" promptLabel="Choose account" @error="setError($event)">
        </o-auth-callback>
        <div v-else>
        <core-login-form v-if="!magicLink" @error="setError($event)"
                :emailPlaceholder="emailPlaceholder"
                :forgotPasswordLabel="forgotPasswordLabel"
                :forgotPasswordRouteName="forgotPasswordRouteName"
                :loginButton="loginButton"
                :passwordPlaceholder="passwordPlaceholder"
                :rememberMeLabel="rememberMeLabel"
                :nextButton="nextButton">
        </core-login-form>

        <magic-link-create v-if="magicLink" @error="setError($event)"
                :emailPlaceholder="emailPlaceholder"
                :magicLinkButton="magicLinkButton"
                :magicLinkRedirect="magicLinkRedirect"
                :magicLinkInstructions="magicLinkInstructions">
        </magic-link-create>

        <o-auth2 v-if="!accountFlow && !magicLink"></o-auth2>

        <div v-if="!accountFlow">
            <div class="form-group magic-link-wrapper" v-if="!magicLink">
                <div class="col-sm-12 text-center">
                    <p class="magic-link-label">{{magicLinkShowLabel}} <a href="#" @click="toggleMagicLink(true)" class="text-primary m-l-5"><b>{{magicLinkShowLink}}</b></a></p>
                </div>
            </div>
            <div class="form-group" v-else>
                <div class="col-sm-12 text-center">
                    <p class="login-form-label">{{loginFormShowLabel}} <a href="#" @click="toggleMagicLink(false)" class="text-primary m-l-5"><b>{{loginFormShowLink}}</b></a></p>
                </div>
            </div>
        </div>

        </div>
    </div>
</template>
<style>
    .core-auth.fade-enter-active, .fade-leave-active {
            transition: opacity .25s
    }
    .core-auth.fade-enter, .fade-leave-to {
            opacity: 0
    }
</style>
<script>
    import eventHub from '../eventHub'
    import coreLoginForm from './login/coreLoginForm.vue'
    import OAuthCallback from './oAuthCallback.vue'
    import magicLinkCreate from './login/magicLinkCreate.vue'
    import oAuth2 from './login/oAuthForm.vue'
    import MagicLinkAuth from './magicLink'

export default {
        name: 'coreLogin',
        components: {
            MagicLinkAuth,
            coreLoginForm,
            magicLinkCreate,
            oAuth2,
            OAuthCallback
        },
        mounted () {
            eventHub.$on('accountFlowOn', this.setAccountSelectorOn)
            eventHub.$on('accountFlowOff', this.setAccountSelectorOff)
            this.checkForMagicToken()
            this.checkForOAuthCode()
        },
        beforeDestroy () {
            eventHub.$off('accountFlowOn')
            eventHub.$off('accountFlowOff')
        },
        props: {
            nextButton: {
                type: String,
                default: 'Next'
            },
            magicLinkRedirect: {
                type: String,
                default: window.location.origin + '/login'
            },
            emailPlaceholder: {
                type: String,
                default: 'E-mail'
            },
            passwordPlaceholder: {
                type: String,
                default: 'Password'
            },
            rememberMeLabel: {
                type: String,
                default: 'Remember me'
            },
            forgotPasswordLabel: {
                type: String,
                default: 'Forgot password'
            },
            forgotPasswordRouteName: {
                type: String,
                default: 'ForgotPassword'
            },
            loginButton: {
                type: String,
                default: 'Login'
            },
            magicLinkButton: {
                type: String,
                default: 'Send magic link'
            },
            magicLinkShowLabel: {
                type: String,
                default: 'Try a new way to login'
            },
            magicLinkShowLink: {
                type: String,
                default: 'Get link'
            },
            loginFormShowLabel: {
                type: String,
                default: 'Use the old way'
            },
            loginFormShowLink: {
                type: String,
                default: 'Go to form'
            },
            magicLinkInstructions: {
                type: String,
                default: 'Open your mailbox and follow the instructions'
            }
        },
        data () {
            return {
                magicToken: false,
                oAuthCode: false,
                magicLink: false,
                accountFlow: false,
                errors: []
            }
        },
        methods: {
            checkForMagicToken () {
                if (this.$route.query.token) {
                    this.magicToken = true
                }
            },
            checkForOAuthCode () {
                if (this.$route.query.code) {
                    this.oAuthCode = true
                }
            },
            setAccountSelectorOn () {
                this.accountFlow = true
            },
            setAccountSelectorOff () {
               this.accountFlow = false
            },
            toggleMagicLink (value) {
                this.setError([])
                this.magicLink = value
            },
            setError (errors) {
               this.errors = errors
            }
        }
    }
</script>
<style scoped>
    .magic-link-wrapper{
        margin-bottom: 0px;
    }
</style>
