<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                //
            }
        }, created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch(logout)
                    }
                    throw err;
                });
            });
        }

    }
</script>
<style lang="scss">
    body {
    }
</style>
