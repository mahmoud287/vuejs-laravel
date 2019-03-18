<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Users</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Users</v-toolbar-title>
                <v-spacer/>
                <v-btn class="purple white--text" rout to="/add_user">
                    <v-icon class="mr-1">exposure_plus_1</v-icon>
                    Add User
                </v-btn>
            </v-toolbar>
            <v-flex xs12 md6 lg3 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_id"
                            class="pa-2"
                            label="ID"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_name"
                            class="pa-2"
                            label="Name"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_email"
                            class="pa-2"
                            label="Email"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg3 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_phone"
                            class="pa-2"
                            label="Phone"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-btn class="green white--text" v-on:click="__search(pagination.page)">
                <v-icon class="mr-1">search</v-icon>
                search
            </v-btn>
            <v-btn class="purple white--text" v-on:click="rest(pagination.page)">
                <v-icon class="mr-1">settings_backup_restore</v-icon>
                reset search
            </v-btn>
        </v-layout>
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
                                        v-model="editedItem.name"
                                        label="Name"
                                        required
                                        :rules="nameRules"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.phone"
                                        label="Phone"
                                        required
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.password"
                                        label="Password"
                                        required
                                        @click:append="show1 = !show1"
                                        :type="show1 ? 'text' : 'password'"
                                        :rules="[rules.required]"
                                        hint="At least 6 characters"
                                        counter
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.password_confirmation"
                                        label="Confirm Password"
                                        required
                                        @click:append="show1 = !show1"
                                        :type="show1 ? 'text' : 'password'"
                                        :rules="[rules.required]"
                                        hint="At least 6 characters"
                                        counter
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.language"
                                        label="language"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.toggle_music"
                                        label="toggle_music"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-select
                                        v-model="editedItem.type"
                                        :items="type_items"
                                        label="Type"
                                        required
                                        :rules="[rules.required]"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-select
                                        v-model="editedItem.state"
                                        :items="state_items"
                                        label="State"
                                        required
                                        :rules="[rules.required]"
                                ></v-select>
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
        <!--:search="search"-->
        <v-data-table
                :headers="headers"
                hide-actions
                :items="user_data"
                class="elevation-1"
                :loading="loading"
        >
            <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.balance }}</td>
                <td>{{ props.item.state }}</td>
                <td>
                    <v-icon
                            small
                            class="mr-2 green--text"
                            @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            class="red--text"
                            small
                            @click="deleteItem(props.item)"
                    >
                        delete
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
        name: "users",
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
                    ], type_items: [
                    'admin',
                    'client',
                ], state_items: [
                    'active',
                    'suspended',
                ],
                dialog: false,
                editedIndex: -1,
                editedItem: {
                    id: '',
                    name: '',
                    phone: '',
                    password: "",
                    password_confirmation: "",
                    language: '',
                    toggle_music: '',
                    type: '',
                    state: ''
                },
                defaultItem: {
                    id: '',
                    name: '',
                    phone: '',
                    password: "",
                    password_confirmation: "",
                    language: '',
                    toggle_music: '',
                    type: '',
                    state: ''
                },
                pagination: {
                    page: 1,
                    rowsPerPage: '', // -1 for All
                    totalItems: ''
                },
                search_id: null,
                search_name: null,
                search_email: null,
                search_phone: null,
                headers: [
                    {text: 'ID', sortable: true, value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Type', value: 'type'},
                    {text: 'Phone', value: 'phone'},
                    {text: 'Balance', value: 'balance'},
                    {text: 'Account state', value: 'state'},
                    {text: 'Action', value: 'action'}
                ],
                user_data: []
                , loading: false
            }
        },
        created: function () {
            this.getdata();
        },
        methods: {
            search(title,search_word){
                this.loading = true;
                axios.get(`http://127.0.0.1:8000/api/public/user/all?${title}=${search_word}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((res) => {
                    this.user_data = res.data.data
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.totalItems = res.data.meta.total
                    this.pagination.rowsPerPage = res.data.meta.per_page
                    this.loading=false
                }).catch(eer => {
                    console.log(eer)
                });
            },
            __search() {
                if (this.search_id != null || this.search_name != null || this.search_email != null || this.search_phone != null) {
                    if (this.search_id != null) {
                       this.search('id',this.search_id)
                    }
                    if (this.search_id == null) {
                       this.search('name',this.search_name)
                    }
                    if (this.search_id == null && this.search_name == null) {
                        this.search('email',this.search_email)
                    }
                    if (this.search_id == null && this.search_name == null && this.search_email == null) {
                        this.search('phone',this.search_phone)
                    }
                } else {
                    this.message = "There are no keywords to search"
                    this.color = "red--text"
                    this.snackbar = true
                }
            }
            ,
            getdata(page) {
             this.search('page',page)
            },
            rest() {
                this.getdata(this.pagination.page);
                this.search_id = null;
                this.search_name = null;
                this.search_email = null;
                this.search_phone = null
            },
            editItem(item) {
                this.editedIndex = this.user_data.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            deleteItem(item) {
                this.editedIndex = this.user_data.indexOf(item);
                this.editedItem = Object.assign({}, item);
                const index = this.user_data.indexOf(item)
                confirm('Are you sure you want to delete this user?') && axios.delete(`http://127.0.0.1:8000/api/public/user/${this.user_data[this.editedIndex].id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                            Accept: 'application/json',
                            contentType: "application/json"
                        }
                    }).then((res) => {
                    this.user_data.splice(index, 1)
                    this.message = "user is Deleted .... "
                    this.color = "red--text"
                    this.snackbar = true
                }).catch(eer => {
                    console.log(eer)
                    this.message = "user is not Deleted !!! . there is an Error..."
                    this.color = "red--text"
                    this.snackbar = true
                });

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
                        name: this.editedItem.name,
                        phone: this.editedItem.phone,
                        password: this.editedItem.password,
                        password_confirmation: this.editedItem.password_confirmation,
                        language: this.editedItem.language,
                        toggle_music: this.editedItem.toggle_music,
                        type: this.editedItem.type,
                        state: this.editedItem.state
                    };
                    axios.post(`http://127.0.0.1:8000/api/public/user/${this.user_data[this.editedIndex].id}`, data,
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
                    Object.assign(this.user_data[this.editedIndex], this.editedItem)
                    // this.user_data[this.editedIndex].id
                } else {
                    this.user_data.push(this.editedItem)
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