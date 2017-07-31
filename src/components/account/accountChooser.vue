<template>
    <div>
    <h4>{{ promptLabel }}</h4>
    <div v-if="accounts.length" v-for="account in accounts">
        <core-account-item @selected="$emit('selected', $event)" :account="account"></core-account-item>
    </div>
    <div class="form-group text-center m-t-20">
        <div class="col-sm-12 text-center">
            <span @click="$emit('clearAccount')">
                <i class="fa fa-chevron-left fa-fw"></i>
            </span>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        props: {
            promptLabel: {
                type: String,
                required: true
            },
            accounts: {
                type: Array,
                required: true
            }
        }
    }
</script>
