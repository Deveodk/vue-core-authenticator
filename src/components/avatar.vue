<template>
    <div>
        <div class="core-avatar" v-if="profilePicture">
            <div class="login-avatar">
                <img :src="profilePicture"/>
            </div>
        </div>
        <div class="core-avatar" v-else>
            <div class="login-initials">
                {{ initials }}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'coreAvatar',
        props: {
            profilePicture: {
                type: String
            },
            initials: {
                type: String
            }
        }
    }
</script>
<style>
    .core-avatar{
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        border-radius: 50px;
        font-family: 'Helvetica',serif;
    }
    .core-avatar .login-avatar{
        height: 50px;
        width: 50px;
        transition: 0.3s ease all;
    }
    .core-avatar .login-avatar img{
        width: 100%;
        height: 100%;
        border-radius: 50px;
        margin-top: -1px;
    }
    .core-avatar .login-initials{
        background: rgb(242,242,242);
        border-radius: 50px;
        transition: 0.3s ease all;
    }
</style>
