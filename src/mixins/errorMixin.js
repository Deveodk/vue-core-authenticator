export default {
    methods: {
        setErrors (error) {
            if (error.response.status === 422) {
                this.$emit('error', error.response.data)
            }
            if (error.response.status === 404) {
                const formatted = { message: [error.response.data.message] }
                this.$emit('error', formatted)
            }
        }
    }
}
