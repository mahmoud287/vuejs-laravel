<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">users</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Add Users</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-flex xs8 class="pa-2">
                <v-card flat>
                    <form>
                        <v-text-field
                                v-model="name"
                                label="Name"
                                required
                                :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                                v-model="email"
                                label="E-mail"
                                required
                                :rules="[rules.required, rules.email]"
                        ></v-text-field>
                        <v-text-field
                                v-model="phone"
                                label="Phone"
                                required
                                :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                label="Password"
                                required
                                @click:append="show1 = !show1"
                                :type="show1 ? 'text' : 'password'"
                                :rules="[rules.required, rules.min]"
                                hint="At least 6 characters"
                                counter
                                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        ></v-text-field>
                        <v-text-field
                                v-model="confirm_pass"
                                label="Confirm Password"
                                required
                                @click:append="show1 = !show1"
                                :type="show1 ? 'text' : 'password'"
                                :rules="[rules.required, rules.min]"
                                hint="At least 6 characters"
                                counter
                                :append-icon="show1 ? 'visibility_off' : 'visibility'">
                        </v-text-field>
                        <v-select
                                v-model="type"
                                :items="type_items"
                                label="Type"
                                required
                                :rules="[rules.required]"
                        ></v-select>
                        <v-select
                                v-model="state"
                                :items="state_items"
                                label="State"
                                required
                                :rules="[rules.required]"
                        ></v-select>
                        <v-btn v-on:click="add_user" large :loading="loading"
                               class="mt-2 green darken-3 white--text font-weight-regular">ADD USER
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
                name: '',
                email: '',
                phone: '',
                password: '',
                confirm_pass: '',
                type: null,
                state: null,
                type_items: [
                    'admin',
                    'client',
                ], state_items: [
                    'active',
                    'suspended',
                ],
            }
        },
        methods: {

            add_user() {
                if (this.password === this.confirm_pass) {
                    this.loading = true;
                    const data = {
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        password: this.password,
                        password_confirmation: this.confirm_pass,
                        type: this.type,
                        state: this.state
                    };
                    axios.post('http://127.0.0.1:8000/api/public/user', data, {
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
                } else {
                    this.message = 'The password does not match'
                    this.color = 'red--text';
                    this.snackbar = true
                }
            }

        }
    }
</script>

<style lang="scss">
    .v-text-field {
        margin-bottom: 40px;
    }
</style>