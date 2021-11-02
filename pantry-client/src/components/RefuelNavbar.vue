<template>
    <b-navbar class="is-refuel">
        <template #brand>
            <b-navbar-item tag="a" :href="'https://lmbc.org/refuel'">
                <img src="/img/ReFuel.png" />
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
            <b-navbar-item tag="a" :href="'#'">
                Pantry
            </b-navbar-item>
            <b-navbar-dropdown v-if="isAdmin" label="Admin">
                <b-navbar-item tag="router-link" :to="{ path: '/pantry-admin/categories' }">
                    Categories
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-item tag="router-link" :to="{ path: '/about' }">
                About
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/contact' }">
                Contact
            </b-navbar-item>
        </template>
        <template v-if="isAuthenticated" #end>
            <b-navbar-item tag="router-link" :to="{ path: '/profile' }">
                Profile
            </b-navbar-item>
            <b-navbar-item tag="a" :href="'#'" @click="logout">
                Logout
            </b-navbar-item>
        </template>
        <template v-else #end>
            <b-navbar-item tag="a" :href="'#'">
                Sign Up
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { toast } from "bulma-toast";

export default {
    name: "RefuelNavbar",
    inject: ['securityService'],
    computed: {
        isAuthenticated: function () {
            return this.securityService.isUserAuthenticated()
        },
        isAdmin: function () {
            return this.securityService.isAdmin
        }
    },
    methods: {
        logout: function () {
            this.securityService.logout()
                .then(() => {
                    toast({
                        message: 'Logout successful!',
                        type: 'is-success',
                        dismissible: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                    });
                    // window.location.href = 'http://localhost:8000';
                }, (rej) => {
                    const errorMessage = `${rej.errors[0].field}: ${rej.errors[0].message[0]}`
                    toast({
                        message: errorMessage,
                        type: 'is-danger',
                        dismissible: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' },
                    });
                })
        }
    },
}
</script>