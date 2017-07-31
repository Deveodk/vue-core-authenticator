<template>
    <div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <div class="social">
                    <div class="row">
                        <div class="col-md-6">
                            <a @click="login('facebook')" href="#" class="btn btn-facebook">
                                <i aria-hidden="true" class="fa fa-facebook"></i>
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a @click="login('google')" href="#" class="btn btn-googleplus">
                                <i aria-hidden="true" class="fa fa-google-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        methods: {
            login (provider) {
                this.$auth.oauth2({
                    provider: provider
                })
            }
        }
    }
</script>
<style scoped>
    .social{
        margin-bottom: 20px;
    }
    .social a{
        width: 100%;
    }
</style>
