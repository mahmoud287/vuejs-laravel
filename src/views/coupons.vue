<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Coupons</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Coupons</v-toolbar-title>
                <v-spacer/>
                <v-btn class="purple white--text" rout to="/add_coupon">
                    <v-icon class="mr-1">exposure_plus_1</v-icon>
                    Add Coupon
                </v-btn>
            </v-toolbar>
            <v-flex xs12 md4 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_name"
                            class="pa-2"
                            label="Name"
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
                :items="coupons_data"
                class="elevation-1"
                :loading="loading"
        >
            <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>{{ props.item.price }}</td>
                <td>
                    <v-icon
                            class="red--text mr-2"
                            small
                            @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                    <v-icon
                            small
                            class=" green--text"
                            @click="title(props.item)"
                    >
                        show_chart
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
    </v-container>
</template>

<script>
    import axios from 'axios'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "coupons",
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
                search_name: null,
                headers: [
                    {text: 'Name', sortable: true, value: 'title'},
                    {text: 'Quantity', value: 'quantity'},
                    {text: 'Price', value: 'price'},
                    {text: 'Action', value: 'action'}
                ],
                coupons_data: [],
                loading: false,
                editedIndex: -1,
            }
        },
        created: function () {
            this.getdata();
        },
        methods: {
            search(title,search_word){
                this.loading = true;
                axios.get(`http://127.0.0.1:8000/api/public/coupon/all/titleGroup?${title}=${search_word}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((res) => {
                    this.coupons_data = res.data.data
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.totalItems = res.data.meta.total
                    this.pagination.rowsPerPage = res.data.meta.per_page
                    this.loading=false
                }).catch(eer => {
                    console.log(eer)
                });
            },
            __search(page) {
                if (this.search_name != null || this.search_price != null) {
                    if (this.search_name != null) {
                        this.search('title',this.search_name)
                    }
                    if (this.search_name == null) {
                        this.search('price',this.search_price)
                    }
                } else {
                    this.message = "There are no keywords to search"
                    this.color = "red--text"
                    this.snackbar = true
                }

            },
            getdata(page) {
                this.search('page',page)
            },
            rest() {
                this.getdata(this.pagination.page);
                this.search_price = null;
                this.search_name = null;
            },
            title(item) {
                this.editedIndex = this.coupons_data.indexOf(item)
                localStorage.setItem('title',this.coupons_data[this.editedIndex].title)
                localStorage.setItem('used',this.coupons_data[this.editedIndex].user_id)
                this.$router.push({name:'coupon_details'})
            },
            deleteItem(item) {
                this.editedIndex = this.coupons_data.indexOf(item);
                this.editedItem = Object.assign({}, item);
                const index = this.coupons_data.indexOf(item)
                confirm('Are you sure you want to delete this coupons?') && axios.delete(`http://127.0.0.1:8000/api/public/coupon/${this.coupons_data[this.editedIndex].id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                            Accept: 'application/json',
                            contentType: "application/json"
                        }
                    }).then((res) => {
                    this.coupons_data.splice(index, 1)
                    this.message = "coupons is Deleted .... "
                    this.color = "red--text"
                    this.snackbar = true
                }).catch(eer => {
                    console.log(eer)
                    this.message = "coupons is not Deleted !!! . there is an Error..."
                    this.color = "red--text"
                    this.snackbar = true
                });
            },
        },
    }
</script>

<style lang="scss">

</style>