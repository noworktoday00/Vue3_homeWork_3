import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'vanmoritz';
let productModal = {};

const app = createApp({
    data() {
        return {
            products:[],
            tempProduct:{
                imagesUrl:[],
            },
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
                .catch(err =>{
                    alert(err.data.message);
                    window.location = '.login.html';
                })
        },
        getProducts(){
            const url = `${apiUrl}api/${api_path}/admin/products/all`;
            axios.get(url)
            .then(res=>{
                console.log(res);
                this.products = res.data.products;
            })
        },
        openModal(){
            productModal.show();
        },
        addProduct(){
            console.log(this.tempProduct)
            const url = `${apiUrl}api/${api_path}/admin/product`;
            axios.post(url, {"data":this.tempProduct})
            .then(res=>{
                console.log(res);
                this.getProducts();
                productModal.hide();
            }).catch(err=>{
                alert(err.data.message);
            })
        }
    },
    mounted() {
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
    },
})

    .mount('#app')