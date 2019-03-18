<template>
    <v-container fluid class="white">
        <h3 class="mt-2 font-weight-bold text-uppercase headline mb-5">Ads</h3>
        <v-layout align-start justify-center row fill-height wrap>
            <v-toolbar flat>
                <v-toolbar-title>Ads</v-toolbar-title>
                <v-spacer/>
                <v-btn class="purple white--text" rout to="/add_ads">
                    <v-icon class="mr-1">exposure_plus_1</v-icon>
                    Add Ads
                </v-btn>
            </v-toolbar>
            <v-flex xs12 md6 lg4 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_name"
                            class="pa-2"
                            label="Name"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg4 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_phone"
                            class="pa-2"
                            label="Phone"
                            single-line
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 lg4 class="pa-2">
                <v-card flat>
                    <v-text-field
                            v-model="search_whats"
                            class="pa-2"
                            label="Whats App"
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
                    <span class="headline black--purple white--textext font-weight-bold">Edit ِAds</span>
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
                                        v-model="editedItem.phone"
                                        label="Phone"
                                        required
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.whats_app"
                                        label="Whats App"
                                        required
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.place"
                                        label="Place"
                                        required
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="editedItem.category.name"
                                        label="Category"
                                        required
                                        :rules="[rules.required]"
                                ></v-text-field>
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
                            <v-flex xs12 md6 v-for="x in i_count">
                                <!--<img :src="'http://127.0.0.1:8000/'+editedItem.images_url" height="150"-->
                                     <!--v-if="!imageUrl"/>-->
                                <img :src="imageUrl[x-1]" height="150" v-if="imageUrl[x-1]"/>
                                <v-text-field label="Select Image" @click='pickFile' v-model='imageName[x-1]'
                                              prepend-icon='attach_file' append-icon="delete_forever"
                                              @click:append="i_count--"></v-text-field>
                                <input
                                        type="file"
                                        style="display: none"
                                        ref="image"
                                        accept="image/*"
                                        @change="onFilePicked">
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-on:click="i_count++">Add Images</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
                :headers="headers"
                hide-actions
                :items="ads_data"
                class="elevation-1"
                :loading="loading"
        >
            <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.category.name }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.whats_app }}</td>
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
        name: "ads",
        data() {
            return {
                state_items: [
                    'pinned',
                    'featured',
                    'none'
                ],
                i_count: 1,
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
                },
                nameRules:
                    [
                        v => !!v || 'Name is required',
                    ],
                dialog: false,
                editedIndex: -1,
                editedItem: {
                    type: 'ad',
                    title: '',
                    phone: '',
                    whats_app: '',
                    place: '',
                    category: [],
                    images_url: '',
                    state: ''

                },
                defaultItem: {
                    type: 'ad',
                    title: '',
                    phone: '',
                    whats_app: '',
                    place: '',
                    category: [],
                    images_url: '',
                    state: ''
                },
                pagination: {
                    page: 1,
                    rowsPerPage: '', // -1 for All
                    totalItems: '',
                },
                search_name: null,
                search_whats: null,
                search_phone: null,
                headers: [
                    {text: 'Name', sortable: true, value: 'title'},
                    {text: 'Category', value: 'category'},
                    {text: 'Phone', value: 'phone'},
                    {text: 'Whats App', value: 'whats_app'},
                    {text: 'Action', value: 'action'}
                ],
                ads_data: [],
                loading: false,
                imageName: [],
                imageUrl: [],
                imageFile: [],
            }
        },
        created: function () {
            this.getdata();
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
                    this.imageName = []
                    this.imageFile = []
                    this.imageUrl = []
                }
            },
            search(title, search_word) {
                this.loading = true;
                axios.get(`http://127.0.0.1:8000/api/public/item/all/ads?${title}=${search_word}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((res) => {
                    this.ads_data = res.data.data
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.totalItems = res.data.meta.total
                    this.pagination.rowsPerPage = res.data.meta.per_page
                    this.loading = false
                }).catch(eer => {
                    console.log(eer)
                });
            },
            __search() {
                if (this.search_name != null || this.search_phone != null || this.search_whats != null || this.search_category != null) {
                    if (this.search_name != null) {
                        this.search('title', this.search_name)
                    }
                    if (this.search_name == null) {
                        this.search('phone', this.search_phone)
                    }
                    if (this.search_name == null && this.search_phone == null) {
                        this.search('whats_app', this.search_whats)
                    }
                } else {
                    this.message = "There are no keywords to search"
                    this.color = "red--text"
                    this.snackbar = true
                }

            },
            getdata(page) {
                this.search('page', page)
            },
            rest() {
                this.getdata(this.pagination.page);
                this.search_name = null;
                this.search_whats = null;
                this.search_phone = null
            },
            editItem(item) {
                this.editedIndex = this.ads_data.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            deleteItem(item) {
                this.editedIndex = this.ads_data.indexOf(item);
                this.editedItem = Object.assign({}, item);
                const index = this.ads_data.indexOf(item)
                confirm('Are you sure you want to delete this Ads?') && axios.delete(`http://127.0.0.1:8000/api/public/item/${this.ads_data[this.editedIndex].id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                            Accept: 'application/json',
                            contentType: "application/json"
                        }
                    }).then((res) => {
                    this.ads_data.splice(index, 1)
                    this.message = "Ads is Deleted .... "
                    this.color = "red--text"
                    this.snackbar = true
                }).catch(eer => {
                    console.log(eer)
                    this.message = "Ads is not Deleted !!! . there is an Error..."
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
                        title: this.editedItem.title,
                        phone: this.editedItem.phone,
                        whats_app: this.editedItem.whats_app,
                        image_64: this.imageUrl,
                        place:this.editedItem.place,
                        state:this.editedItem.state
                    };
                    axios.post(`http://127.0.0.1:8000/api/public/homeBanner/${this.ads_data[this.editedIndex].id}`, data,
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
                        this.imageName = "";
                        this.imageUrl = '';
                        this.imageFile = '';
                        this.getdata();
                    }).catch(eer => {
                        this.message = "Edit Failed!!!!.";
                        this.color = "red--text";
                        this.snackbar = true;
                    });
                    Object.assign(this.ads_data[this.editedIndex], this.editedItem)
                } else {
                    this.ads_data.push(this.editedItem)
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