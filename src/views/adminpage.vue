<template>
    <v-app>
        <navbar></navbar>
        <v-content class="pa-0">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import navbar from '../components/navbar'

    export default {
        name: "admin",
        components: {
            navbar
        }
    }
</script>

<style lang="scss">
    .v-content__wrap {
        background-color: #F1F0F7;
    }
</style>