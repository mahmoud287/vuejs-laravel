<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Coupons</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Add Coupon</v-toolbar-title>
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
                                v-model="price"
                                label="Price"
                                required
                                :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                                v-model="Quantity"
                                label="Quantity"
                                required
                                :rules="[rules.required]"
                        ></v-text-field>
                        <v-btn v-on:click="add_coupon" large :loading="loading"
                               class="mt-2 green darken-3 white--text font-weight-regular">ADD Coupon
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
        name: "add_coupon",
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
                price: '',
                Quantity:''
            }
        },
        methods: {

            add_coupon() {
                this.loading = true;
                const data = {
                    title: this.name,
                    price: this.price,
                    quantity:this.Quantity
                };
                axios.post('http://127.0.0.1:8000/api/public/coupon/generate_coupons', data, {
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
            }

        }
    }
</script>

<style lang="scss">
    .v-text-field {
        margin-bottom: 40px;
    }
</style>