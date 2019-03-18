<template>
    <v-app>
        <v-layout align-center justify-center row fill-height class="con">
            <v-flex class="text-xs-center login">
                <div class="pa-5 ml-auto mr-5 text-xs-center">
                    <img src="../assets/logo_default_dark.png">
                    <h2 class="text">Sign In To Admin</h2>
                    <v-form @submit.prevent="login" ref="form">
                        <v-text-field
                                v-model="email"
                                label="E-mail"
                                required
                                :rules="[rules.required, rules.email]"
                                color="white"
                                class="white--text"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                hint="At least 6 characters"
                                counter
                                @click:append="show1 = !show1"
                        ></v-text-field>
                        <p class="red--text text-uppercase">{{erorr}}</p>
                        <v-btn :disabled="disabled" type="submit" large
                               class="mt-5 blue darken-3 white--text font-weight-regular">Sign In
                        </v-btn>
                    </v-form>
                </div>
                <v-snackbar
                        v-model="snackbar"
                        :bottom="y === 'bottom'"
                        :left="x === 'left'"
                        :multi-line="mode === 'multi-line'"
                        :right="x === 'right'"
                        :timeout="timeout"
                        :top="y === 'top'"
                        :vertical="mode === 'vertical'">
                    {{ text }} >>> {{minutes}}<span id="middle">:</span>{{ seconds }}
                </v-snackbar>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
    const axios = require('axios');
    import {router} from '../router'

    export default {
        name: "login",
        data() {
            return {
                snackbar: false,
                text: 'You entered the wrong data 5 times .. can try again after two minutes',
                y: 'top',
                x: null,
                mode: '',
                timeout: 120000,
                email: '',
                nameRules:
                    [
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                    ],
                show1: false,
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                },
                counter: 0,
                erorr: '',
                timer: null,
                totalTime: (0.25 * 60),
                disabled: false,
                route: null
            }
        },
        methods: {
            // start submit for login
            login() {
                let email = this.email;
                let password = this.password;
                this.$store.dispatch('login', {email, password})
                    .then(() => {
                        this.counter = 0;
                        this.erorr = '';
                        this.snackbar = false;
                        this.disabled = false;
                        this.$router.push('/')

                    })
                    .catch(eer => {
                        console.log(eer);
                        this.counter += 1;
                        this.erorr = 'invalid username or password';
                        if (this.counter == 5) {
                            this.snackbar = true;
                            this.startTimer();
                            this.disabled = true;
                        }
                    })
            },
            // end submit for login
            // start set timer for wrong sign in
            startTimer: function () {
                this.timer = setInterval(() => this.countdown(), 1000);
            }
            ,
            resetTimer: function () {
                this.totalTime = (0.25 * 60);
                clearInterval(this.timer);
                this.timer = null;
            }
            ,
            padTime: function (time) {
                return (time < 10 ? '0' : '') + time;
            }
            ,
            countdown: function () {
                this.totalTime--;
                if (this.totalTime == 0) {
                    this.snackbar = false;
                    this.resetTimer();
                    this.counter = 0;
                    this.disabled = false;
                }
            }
            ,
            // end set timer for wrong sign in
        },
        computed: {
            minutes: function () {
                const minutes = Math.floor(this.totalTime / 60);
                return this.padTime(minutes);
            }
            ,
            seconds: function () {
                const seconds = this.totalTime - (this.minutes * 60);
                return this.padTime(seconds);
            }
            // for settings timer
        }
    }
</script>

<style lang="scss">
    .con {
        background-image: url("../assets/bg-7.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        .login {
            max-width: 500px;

            .text {
                color: #fff;
                letter-spacing: 4px;
                font-size: 27px;
                margin-top: 26px;
                margin-bottom: 40px;
                text-transform: capitalize;
            }
        }
    }

</style>