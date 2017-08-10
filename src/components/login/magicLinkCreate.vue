<template>
    <div>
        <core-account-from v-if="!Object.keys(account).length"
                           @selected="setAccount($event)"
                           :emailPlaceholder="emailPlaceholder"
                           :nextButton="magicLinkButton"
                           @error="setError($event)"
                           :promptLabel="promptLabel">
        </core-account-from>
        <div v-else>
            <h4>{{ magicLinkInstructions }}</h4>
        </div>
    </div>
</template>
<script>
    import coreAccountFrom from './coreAccountForm.vue'
    import axios from 'axios'
    export default {
        name: 'coreMagicLinkCreator',
        components: {
            coreAccountFrom
        },
        props: {
           emailPlaceholder: {
               type: String,
               required: true
           },
            magicLinkButton: {
                type: String,
                required: true
            },
            magicLinkRedirect: {
                type: String,
                required: true
            },
            magicLinkInstructions: {
               type: String,
               required: true
            },
            promptLabel: {
               type: String,
                required: true
            }
        },
        watch: {
            data: {
                handler: function () {
                    this.clearErrors()
                },
                deep: true
            }
        },
        data () {
          return {
              data: {
                  email: '',
                  url: '',
                  model: ''
              },
              account: []
          }
        },
        mounted () {
            this.setRedirectLocation()
        },
        methods: {
            generateMagicLink () {
                axios.post(this.$coreAuthOptions('baseURL') + '/auth/magic_link', this.data).then((response) => {
                }).catch((error) => {
                    this.setErrors(error)
                })
            },
            setAccount (account) {
                this.account = account
                this.data.email = account.email
                this.data.model = account.model
                this.generateMagicLink()
            },
            setRedirectLocation () {
                this.data.url = this.magicLinkRedirect
            },
            clearErrors () {
                this.$emit('error', [])
            },
            setError (error) {
                this.$emit('error', error)
            }
        }
    }
</script>
