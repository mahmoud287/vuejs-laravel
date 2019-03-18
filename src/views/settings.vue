<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Settings</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-flex xs8 class="pa-2">
                <v-card flat>
                    <form>
                        <div v-for="x in w_count">
                            <v-text-field
                                    v-model="whats_app[x-1]"
                                    label="Whats App"
                                    type="number"
                                    required
                                    :rules="[rules.required]"
                                    append-icon="delete_forever"
                                    @click:append="w_count--"
                            ></v-text-field>
                        </div>
                        <v-btn class="d-block" v-on:click="w_count++">Add Whats App</v-btn>
                        <div v-for="x in p_count">
                            <v-text-field
                                    v-model="phone[x-1]"
                                    label="Add Phone"
                                    type="number"
                                    required
                                    :rules="[rules.required]"
                                    append-icon="delete_forever"
                                    @click:append="p_count--"
                            ></v-text-field>
                        </div>
                        <v-btn class="d-block" v-on:click="p_count++">Add Phone</v-btn>

                        <div v-for="x in e_count">
                            <v-text-field
                                    v-model="email[x-1]"
                                    label="Add Email"
                                    required
                                    :rules="[rules.required, rules.email]"
                                    append-icon="delete_forever"
                                    @click:append="e_count--"
                            ></v-text-field>
                        </div>
                        <v-btn class="d-block" v-on:click="e_count++">Add Email</v-btn>
                        <v-btn v-on:click="settings" large
                               class="mt-2 green darken-3 white--text font-weight-regular">Save
                        </v-btn>
                        <v-btn v-on:click="rest" large :loading="loading"
                               class="mt-2 purple darken-3 white--text font-weight-regular">Rest
                        </v-btn>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar :class="color" class="text-uppercase font-weight-bold text-xs-center"
                    v-model="snackbar"
                    :bottom="y === 'bottom'"
                    :left="x === 'left'"
                    :multi-line="mode === 'multi-line'"
                    :right="x === 'right'"
                    :timeout="timeout"
                    :top="y === 'top'"
                    :vertical="mode === 'vertical'">
            {{ message }}
        </v-snackbar>
    </v-container>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "add_user",
        data() {
            return {
                w_count: 0,
                p_count: 0,
                e_count: 0,
                color: '',
                message: '',
                snackbar: false,
                text: '',
                y: 'top',
                x: null,
                mode: '',
                timeout: 5000,
                show1: false,
                loading: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                },
                nameRules:
                    [
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 20) || 'Name must be less than 10 characters'
                    ],
                email: [],
                phone: [],
                whats_app: []
            }
        },
        methods: {
            settings() {
                const data = {
                    whats_app: this.whats_app,
                    phone: this.phone,
                    email: this.email,
                    audio_file_state: 'on'
                };
                axios.post('http://127.0.0.1:8000/api/public/settings', data, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        Accept: 'application/json',
                        contentType: "application/json"
                    }
                }).then(response => {
                    console.log(response.data)
                    this.message = 'Successfully added'
                    this.color = 'green--text'
                    this.snackbar = true
                    this.loading = false;
                }).catch(e => {
                    console.log(e)
                    this.message = 'Failed added'
                    this.color = 'red--text'
                    this.snackbar = true
                    this.loading = false;
                })
            },
            rest() {
                this.w_count = 0
                this.p_count = 0
                this.e_count = 0
                this.whats_app = []
                this.phone = []
                this.email = []
            }

        }
    }
</script>

<style lang="scss">
    .v-text-field {
        margin-bottom: 40px;
    }
</style>