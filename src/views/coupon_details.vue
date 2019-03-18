<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Coupon</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Coupon</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
            <v-flex xs12 md4 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_code"
                            class="pa-2"
                            label="Code"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 md4 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_price"
                            class="pa-2"
                            label="Price"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
        </v-layout>
        <v-btn class="green white--text" v-on:click="__search(pagination.page)">
            <v-icon class="mr-1">search</v-icon>
            search
        </v-btn>
        <v-btn class="purple white--text" v-on:click="rest(pagination.page)">
            <v-icon class="mr-1">settings_backup_restore</v-icon>
            reset search
        </v-btn>
        <v-data-table
                :headers="headers"
                hide-actions
                :items="coupon_details"
                class="elevation-1"
                :loading="loading"
        >
            <template v-slot:items="props">
                <td>{{ props.item.code }}</td>
                <td>{{ used}}</td>
                <td>{{ props.item.price }}</td>
                <td>
                    <v-icon
                            small
                            class=" green--text"
                            @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                </td>
            </template>
            <template v-slot:pageText="props">
                Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
        </v-data-table>
        <b-pagination size="md" :total-rows="pagination.totalItems" v-model="pagination.page"
                      @input="getdata(pagination.page)" :per-page="10"></b-pagination>
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
        <v-dialog v-model="dialog" max-width="1000px">
            <v-card>
                <v-card-title>
                    <span class="headline black--purple white--textext font-weight-bold">Edit User</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.title"
                                        label="Name"
                                        required
                                        :rules="nameRules"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.price"
                                        label="Price"
                                        required
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "coupon_details",
        data() {
            return {
                selected: ['used'],
                color: '',
                message: '',
                snackbar: false,
                text: '',
                y: 'top',
                x: null,
                mode: '',
                timeout: 5000,
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                },
                nameRules:
                    [
                        v => !!v || 'Name is required',
                    ],
                pagination: {
                    page: 1,
                    rowsPerPage: '', // -1 for All
                    totalItems: ''
                },
                search_price: null,
                search_code: null,
                headers: [
                    {text: 'Code', sortable: true, value: 'code'},
                    {text: 'Used', value: 'user_id'},
                    {text: 'Price', value: 'price'},
                    {text: 'Action', value: 'action'}
                ],
                coupon_details: [],
                loading: false,
                dialog: false,
                editedIndex: -1,
                editedItem: {
                    title: '',
                    price: ''
                },
                defaultItem: {
                    title: '',
                    price: ''
                }, used: ""
            }
        },
        created: function () {
            this.getdata();
        },
        methods: {
            __search(page) {
                if (this.search_code != null || this.search_price != null) {
                    if (this.search_code != null) {
                        axios.get(`http://127.0.0.1:8000/api/public/coupon/title/${localStorage.getItem('title')}?code=${this.search_code}`,
                            {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then((res) => {
                            this.coupon_details = res.data.data
                            this.pagination.page = res.data.meta.current_page
                            this.pagination.totalItems = res.data.meta.total
                            this.pagination.rowsPerPage = res.data.meta.per_page
                        }).catch(eer => {
                            console.log(eer)
                        });
                    }
                    if (this.search_code == null) {
                        axios.get(`http://127.0.0.1:8000/api/public/coupon/title/${localStorage.getItem('title')}?price=${this.search_price}`,
                            {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then((res) => {
                            this.coupon_details = res.data.data
                            this.pagination.page = res.data.meta.current_page
                            this.pagination.totalItems = res.data.meta.total
                            this.pagination.rowsPerPage = res.data.meta.per_page
                        }).catch(eer => {
                            console.log(eer)
                        });
                    }
                } else {
                    this.message = "There are no keywords to search"
                    this.color = "red--text"
                    this.snackbar = true
                }

            },
            getdata(page) {
                this.loading = true;
                axios.get(`http://127.0.0.1:8000/api/public/coupon/title/${localStorage.getItem("title")}?page=${page}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((res) => {
                    this.coupon_details = res.data.data
                    console.log(localStorage.getItem('used'))
                    if (localStorage.getItem('used') == 'null') {
                        this.used = "No"
                    } else if (localStorage.getItem('used') != 'null') {
                        this.used = "yes"
                    }
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.totalItems = res.data.meta.total
                    this.pagination.rowsPerPage = res.data.meta.per_page
                    this.loading = false;
                }).catch(eer => {
                    console.log(eer)
                });
            },
            rest(page) {
                this.getdata(this.pagination.page);
                this.search_code = null;
                this.search_price = null;
            },
            editItem(item) {
                this.editedIndex = this.coupon_details.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                if (this.editedIndex > -1) {
                    const data = {
                        title:this.editedItem.title,
                        price:this.editedItem.price

                    };
                    axios.post(`http://127.0.0.1:8000/api/public/coupon/${this.coupon_details[this.editedIndex].id}`, data,
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                Accept: 'application/json',
                                contentType: "application/json"
                            }
                        }).then((res) => {
                        this.message = "Edit successfully.";
                        this.color = "green--text";
                        this.snackbar = true;
                    }).catch(eer => {
                        this.message = "Edit Failed!!!!.";
                        this.color = "red--text";
                        this.snackbar = true;
                    });
                    Object.assign(this.coupon_details[this.editedIndex], this.editedItem)
                    // this.coupon_details[this.editedIndex].id
                } else {
                    this.coupon_details.push(this.editedItem)
                }
                this.close()
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },
        watch: {
            dialog(val) {
                val || this.close()
            }
        },
    }
</script>

<style lang="scss">

</style>