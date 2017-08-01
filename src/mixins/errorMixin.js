export default {
    methods: {
        setErrors (error) {
            if (error.response.status === 422) {
                this.$emit('error', error.response.data)
                return error.response.data
            }
            if (error.response.status === 404) {
                const formatted = { message: [error.response.data.message] }
                this.$emit('error', formatted)
                return formatted
            }
            if (error.response.status === 401) {
                const formatted = { message: [error.response.data.message] }
                this.$emit('error', formatted)
                return formatted
            }
            if (error.response.status === 400) {
                const formatted = { message: [error.response.data.message] }
                this.$emit('error', formatted)
                return formatted
            }
        }
    }
}
