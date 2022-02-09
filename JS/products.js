import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'vanmoritz';
let productModal = {};
let delProductModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: '',
        }
    },
    methods: {
        checkLogin() {
            //提取token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)vansToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common['Authorization'] = token;
            // console.log(token);
            const url = `${apiUrl}api/user/check`;
            axios.post(url)
                .then(res => {
                    // console.log(res);
                    this.getProducts()
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = '.login.html';
                })
        },
        getProducts() {
            const url = `${apiUrl}api/${api_path}/admin/products/all`;
            axios.get(url)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                }).catch(err => {
                    alert(err.message);
                })
        },
        openModal(status, product) {
            console.log(status, product)
            if (status === 'addProduct') {
                this.tempProduct = {
                    imagesUrl: [],
                }
                this.isNew = true;
                productModal.show();
            } else if (status === 'editProduct') {
                //注意物件傳參考特性 要做展開淺拷貝
                this.tempProduct = { ...product };
                this.isNew = false;
                productModal.show();
            } else if (status === 'delProduct'){
                this.tempProduct = {...product};
                delProductModal.show();
            }
        },
        updateProduct() {
            //把新增&編輯合併起來
            console.log(this.tempProduct)
            let url = `${apiUrl}api/${api_path}/admin/product`;
            let method = 'post';
            if (!this.isNew) {
                url = `${apiUrl}api/${api_path}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            axios[method](url, { data: this.tempProduct })
                .then(res => {
                    console.log(res);
                    this.getProducts();
                    alert(res.data.message);
                    productModal.hide();
                }).catch(err => {
                    alert(err.message);
                })
        },
        delProduct() {
            const url = `${apiUrl}api/${api_path}/admin/product/${this.tempProduct.id}`;
            axios.delete(url).then(res => {
                alert(res.data.message);
                delProductModal.hide();
                this.getProducts();
            }).catch(err => {
                alert(err.message);
            })
        }
    },
    mounted() {
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    },
})

    .mount('#app')