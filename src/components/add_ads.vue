<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Ads Banner</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Add Ad Banner</v-toolbar-title>
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
                        <v-select
                                v-model="type"
                                :items="type_items"
                                label="Type"
                                required
                                :rules="[rules.required]"
                        ></v-select>
                        <div v-for="x in c_count">
                            <v-text-field
                                    v-model="categories[x-1]"
                                    label="Category"
                                    required
                                    :rules="[rules.required]"
                                    append-icon="delete_forever"
                                    @click:append="c_count--"
                            ></v-text-field>
                        </div>
                        <v-text-field
                                v-model="phone"
                                label="Phone"
                                required
                                :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                                v-model="whats_app"
                                label="Whats App"
                                required
                                :rules="[rules.required]"
                        ></v-text-field>
                        <img :src="imageUrl" height="150" v-if="imageUrl"/>
                        <v-text-field label="Select Image" @click='pickFile' v-model='imageName'
                                      prepend-icon='attach_file'></v-text-field>
                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                        >
                        <v-btn v-on:click="add_ads_banner" large :loading="loading"
                               class="mt-2 green darken-3 white--text font-weight-regular">Add Ad Banner
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="d-block" v-on:click="c_count++">Add Category</v-btn>
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
        name: "add_ads",
        data() {
            return {
                c_count: 2,
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
                },
                nameRules:
                    [
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 20) || 'Name must be less than 10 characters'
                    ],
                name: '',
                phone: '',
                type: '',
                categories: [],
                type_items: [
                    'market',
                    'ad',
                ],
                imageName: '',
                whats_app: '',
                imageUrl: '',
                imageFile: '',
                appear_home: '1'
            }
        },
        methods: {
            pickFile() {
                this.$refs.image.click()
            },

            onFilePicked(e) {
                const files = e.target.files
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
            add_ads_banner() {
                this.loading = true;
                const data = {
                    title: this.name,
                    phone: this.phone,
                    whats_app: this.whats_app,
                    image_64: this.imageUrl,
                    categories: this.categories,
                    type: this.type,
                    appear_home: this.appear_home
                };
                axios.post('http://127.0.0.1:8000/api/public/banner', data, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        Accept: 'application/json',
                    }
                }).then(response => {
                    console.log(response.data)
                    this.message = 'Successfully added'
                    this.color = 'green--text'
                    this.snackbar = true
                    this.name = '';
                    this.type = '';
                    this.c_count = 0;
                    this.phone = '';
                    this.whats_app = '';
                    this.imageUrl = ''
                    this.imageName = ''
                    this.imageFile = ''

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