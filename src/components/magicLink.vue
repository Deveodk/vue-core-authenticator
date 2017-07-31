<template>
    <div class="form-group text-center m-t-20">
        <div class="col-xs-12">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </div>
    </div>
</template>
<script>
    import errorMixin from '../mixins/errorMixin'
    export default {
        name: 'magicLinkAuth',
        mixins: [errorMixin],
        data () {
            return {
                data: {
                    token: this.$route.query.token
                }
            }
        },
        created () {
            this.authenticated()
        },
        methods: {
            authenticated () {
                this.$auth.login({
                    url: this.$coreAuthOptions('baseURL') + '/auth/magic_link/authenticate',
                    data: this.data,
                    error: (error) => {
                        this.setErrors(error)
                        this.$emit('back')
                    },
                    rememberMe: true,
                    fetchUser: true
                })
            }
        }
    }
</script>
