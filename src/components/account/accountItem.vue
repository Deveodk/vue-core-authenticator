<template>
    <div class="login-chooser" @click="selected(account)">
        <div class="login-identity">
            <core-avatar v-if="account.profile_pictures.data.length" :profilePicture="account.profile_pictures.data[0].url"></core-avatar>
            <core-avatar v-else :initials="account.initials"></core-avatar>
            <div class="user-role">
                {{ account.label }}
            </div>
        </div>
        <div class="identity-name">
            {{ account.fullname }}
            <template v-if="$auth.check()">
                <div class="already-logged-in" v-if="$auth.user().id === account.id">
                    Logget ind
                </div>
            </template>
        </div>
        <div class="login-arrow">
            <i class="fa fa-chevron-right"></i>
        </div>
    </div>
</template>
<script>
    import eventHub from '../../eventHub'
    export default {
        name: 'coreAccountChooser',
        props: {
            account: {
                type: Object,
                required: true
            }
        },
        mounted () {
            eventHub.$emit('accountFlowOn')
        },
        beforeDestroy () {
            eventHub.$emit('accountFlowOff')
        },
        methods: {
            selected (account) {
                this.$emit('selected', account)
            }
        }
    }
</script>
<style>
    .user-role{
        font-size: 9px;
        position: absolute;
        width: 50px;
        text-align: center;
        margin-top: -10px;
        background: #5d9cec;
        color: #fff;
        padding: 0;
        line-height: 16px;
        border-radius: 2px;
    }
    .login-chooser{
        height: 70px;
        padding: 10px;
        transition: 0.3s ease all;
        border-radius: 2px;
    }
    .login-chooser:hover{
        background: rgb(242,242,242);
        cursor: pointer;
    }
    .login-chooser:hover .login-identity .login-initials{
        background: #686868;
        color: rgb(242,242,242);
    }
    .login-chooser:hover .login-identity .login-avatar{
        filter: brightness(50%);
    }
    .login-chooser .login-arrow{
        transition: 3s ease all;
        width: 25px;
        float: left;
        line-height: 50px;
        display: none;
        text-align: center;
    }
    .login-chooser:hover .login-arrow{
        display: block;
    }
    .login-chooser .identity-name, .login-chooser .login-identity{
        float: left;
    }
    .login-chooser .identity-name{
        width: calc(100% - 75px);
        line-height: 50px;
        padding-left: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .login-identity{
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        border-radius: 50px;
        font-family: 'Helvetica';
    }
    .login-identity .login-avatar{
        height: 50px;
        width: 50px;
        transition: 0.3s ease all;
    }
    .login-identity .login-avatar img{
        width: 100%;
        height: 100%;
        border-radius: 50px;
        margin-top: -1px;
    }
    .login-identity .login-initials{
        background: rgb(242,242,242);
        border-radius: 50px;
        transition: 0.3s ease all;
    }
    .already-logged-in{
        display: inline-block;
        font-size: 8px;
        background: #03a9f3;
        color: #fff;
        padding: 2px 6px;
        line-height: initial;
        margin-left: 4px;
    }
</style>
