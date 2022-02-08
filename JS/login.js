import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const api = `${this.apiUrl}/admin/signin`;
            axios.post(api, this.user)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `vansToken=${token};expires=${new Date(expired)};path=/`;
                    window.location = './products.html';
                }).catch(err => {
                    alert(err.data.message);
                })
        }
    },
});


app.mount("#app");