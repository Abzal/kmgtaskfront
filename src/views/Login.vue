<template>
        <div class="login-container">
            <h2>Вход</h2>
            <form @submit.prevent="submitLogin">
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" v-model="email" required />
                </div>
                <div class="input-group">
                    <label for="password">Пароль:</label>
                    <input type="password" v-model="password" required />
                </div>
                <button type="submit" class="login-button">Вход</button>
            </form>
        </div>

</template>

<script>
    import {mapActions} from "vuex";
    import {LOGIN_ACTION} from "@/store/storeconstants";
    export default {
        name: "Login",
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            ...mapActions('auth',{
                login: LOGIN_ACTION
            }),
            submitLogin() {
                if (this.email && this.password) {
                    this.login({email: this.email, password: this.password}).then(res => {
                        if (res){
                            this.$router.push({name: 'home'});
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #id{
        position: relative;
    }
    .login-container {
        background-color: white;
        padding: 50px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    h2 {
        text-align: center;
    }

    .input-group {
        margin-bottom: 15px;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
    }

    .input-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .login-button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .login-button:hover {
        background-color: #0056b3;
    }

</style>