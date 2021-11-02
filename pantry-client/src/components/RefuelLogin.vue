<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <form>
                        <b-field label="Username">
                            <b-input v-model="username"></b-input>
                        </b-field>
                        <b-field label="Password">
                            <b-input type="password" v-model="password"></b-input>
                        </b-field>
                        <b-field>
                            <p class="control">
                                <b-button label="Login" type="is-refuel" @click="login" />
                            </p>
                        </b-field>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { toast } from "bulma-toast"

export default {
    name: "RefuelLogin",
    inject: ['securityService'],
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        login: function() {
            this.securityService.login(this.username, this.password)
                .then(() => {
                    toast({
                        message: 'Login successful!',
                        type: 'is-success',
                        dismissible: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                    })
                }, (rej) => {
                    const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
                    toast({
                        message: errorMessage,
                        type: 'is-danger',
                        dismissible: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                    })  
                })
        }
    }
}
</script>