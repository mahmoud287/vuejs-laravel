<template>
    <v-container fluid>
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-3">dashboard</h3>
        <v-layout align-start justify-center row fill-height wrap v-for="(result, index) in dashboard_data">
            <v-flex xs12 md6 lg3>
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">users</h4>
                        <span class="right purple--text text--darken-1"><i class="far fa-user fa-3x"></i></span>
                        <span class="purple--text text--darken-1 subheading font-weight-medium mt-2 d-block">{{result.user}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3>
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">Total Categories</h4>
                        <span class="right blue--text text--darken-2"><i class="fas fa-th fa-3x"></i></span>
                        <span class="blue--text text--darken-2 subheading font-weight-medium mt-2 d-block">{{result.category.totalCategories}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3>
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">Ads Banner</h4>
                        <span class="right purple--text text--darken-1"><i class="fas fa-images fa-3x"></i></span>
                        <span class="purple--text text--darken-1 subheading font-weight-medium mt-2 d-block">{{result.banner.adBanner}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3>
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">Home Banner</h4>
                        <span class="right light-blue--text text--darken-2"><i class="fas fa-home fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block light-blue--text text--darken-2">{{result.banner.homeBanner}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">total ads</h4>
                        <span class="right teal--text text--lighten-2"><i class="fas fa-certificate fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block teal--text text--lighten-2">{{result.items.ad.totalAds}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">pinned ads</h4>
                        <span class="right cyan--text text--darken-1"><i class="fas fa-thumbtack fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block cyan--text text--darken-1">{{result.items.ad.pinnedAds}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">featured ads</h4>
                        <span class="right purple--text text--darken-2"><i class="far fa-star fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block purple--text text--darken-2">{{result.items.ad.featuredAds}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">normal ads</h4>
                        <span class="right orange--text text--darken-3"><i class="fas fa-certificate fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block orange--text text--darken-3">{{result.items.ad.normalAds}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">total markets</h4>
                        <span class="right grey--text text--darken-4" ><i class="fas fa-shopping-cart fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block grey--text text--darken-4">{{result.items.market.totalMarkets}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">pinned markets</h4>
                        <span class="right purple--text text--darken-4" ><i class="far fa-star fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block purple--text text--darken-4">{{result.items.market.pinnedMarkets}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">featured markets</h4>
                        <span class="right deep-orange--text text--darken-3" ><i class="far fa-star fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block deep-orange--text text--darken-3">{{result.items.market.featuredMarket}}</span>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="mt-5">
                <v-card class="pl-4 pr-5 pb-5 pt-4">
                    <div class="pt-4">
                        <h4 class="text-uppercase title mb-3 d-inline font-weight-bold">normal markets</h4>
                        <span class="right blue--text text--darken-3" ><i class="fas fa-shopping-cart fa-3x"></i></span>
                        <span class="subheading font-weight-medium mt-2 d-block blue--text text--darken-3">{{result.items.market.normalMarket}}</span>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import axios from 'axios'

    export default {
        name: "dashboard",
        data() {
            return {
                dashboard_data: []
            }
        }, mounted() {
            this.getdata();
        }
        , methods: {
            getdata() {
                axios.get('http://127.0.0.1:8000/api/admin/administration/statistics', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')

                    }
                }).then((res) => {
                    this.dashboard_data = res.data
                }).catch(eer => {
                    console.log(eer)
                })
            }
        }
    }
</script>
<style lang="scss">
</style>