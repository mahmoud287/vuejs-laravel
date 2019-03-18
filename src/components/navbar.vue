<template>
    <nav>
        <v-toolbar height="90px">
            <v-toolbar-side-icon v-on:click="drawer = !drawer"></v-toolbar-side-icon>
            <!--<div v-on:click="drawer = !drawer" class='side_icon titanic titanic-menu-close'></div>-->
            <v-spacer></v-spacer>
            <v-menu dark offset-y offset-x transition="scale-transition">
                <template v-slot:activator="{ on }">
                    <v-toolbar-side-icon v-on="on">
                        <i class="fas fa-chevron-down fa-3x"></i>
                    </v-toolbar-side-icon>
                </template>
                <div class="pa-5">
                    <h3 class="mb-2">{{name}}</h3>
                    <h4 class="mb-3">{{email}}</h4>
                    <v-btn v-on:click="logout" class="red white--text font-weight-bold px-5">Log Out</v-btn>
                </div>
            </v-menu>
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="mini"
                app
                dark
                color="#7951C8"
                class="drawer"
        >
            <v-list class="pa-1 mb-4">
                <v-list-tile v-if="mini" @click.stop="mini = !mini" v-on:click="show=!show">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://scontent.fcai2-2.fna.fbcdn.net/v/t1.0-9/24296269_1908698929447134_6892109596430621013_n.jpg?_nc_cat=111&_nc_ht=scontent.fcai2-2.fna&oh=24d59eb1922c951d3dfb0a632f2b9f63&oe=5D134EFB">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{name}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.stop="mini = !mini" v-on:click="show=!show">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <hr class="hr">
            <v-list>
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        avatar
                        class="tile"
                        route :to="item._route"
                >
                    <v-list-tile-avatar>
                        <i :class="item.icon"></i>
                    </v-list-tile-avatar>
                    <v-list-tile-title class="body-2">{{item.title}}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                show: false,
                drawer: true,
                mini: true,
                items: [
                    {title: 'Dashboard', icon: 'fas fa-chart-line fa-1x', _route: '/'},
                    {title: 'Users', icon: 'fas fa-users', _route: '/users'},
                    {title: 'Coupons', icon: 'far fa-address-card', _route: '/coupons'},
                    {title: 'Setting', icon: 'fas fa-cog', _route: '/setting'},
                    {title: 'Home Banner', icon: 'fas fa-home', _route: '/home_banner'},
                    {title: 'Ads Banner', icon: 'fas fa-audio-description', _route: '/ads_banner'},
                    {title: 'Ads', icon: 'fab fa-app-store-ios', _route: '/ads'},
                    {title: 'Market', icon: 'fas fa-thumbtack', _route: '/market'},
                    {title: 'Category', icon: 'fas fa-star', _route: '/category'},
                    {title: 'Sub Category', icon: 'far fa-star', _route: '/sub_category'},
                    {title: 'Log Coupon', icon: 'fab fa-audible', _route: '/log_coupon'},


                ]
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
    }
</script>

<style lang="scss">
    .side_icon {
        cursor: pointer;
    }

    .v-menu__content {
        background-image: url("../assets/bg-7.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        h3 {
            letter-spacing: 4px;
            font-size: 27px;
            color: #fff;
        }

        h4 {
            letter-spacing: 2px;
            font-size: 15px;
            color: #b9b9b9;
        }
    }


    .tile {
        cursor: pointer;
        color: rgba(237, 237, 238, 1);
        border-radius: 5px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.2);

            i {
                color: rgba(237, 237, 238, 1);
            }
        }

        i {
            color: rgba(145, 146, 205, 1);
        }
    }

    .theme--dark.v-navigation-drawer {
        background-color: rgba(121, 81, 200, 1);
    }
</style>