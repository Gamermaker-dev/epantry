import React, { Component } from "react";
import { toast } from "bulma-toast";

import RefuelHeader from "./components/RefuelHeader";
import RefuelFooter from "./components/RefuelFooter";
import { RefuelRouter } from "./router/RefuelRouter";

class App extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            isAuthenticated: this.props.securityService.isUserAuthenticated(),
            user: null,
            cart: [],
            loginErrors: [],
        }
        
        const logged_in = this.props.cookieService.getCookie("logged_in");
        if (logged_in) {
            this.getUser();
        }
    }

    login(username, password) {
        this.props.securityService.login(username, password)
            .then((res) => {
                this.setState({isAuthenticated: res});
                this.getUser();
                toast({
                    message: 'Login successful!',
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
            });
    }

    logout() {
        this.props.securityService.logout()
            .then((res) => {
                this.setState({isAuthenticated: res});
                toast({
                    message: 'Logout successful!',
                    type: 'is-success',
                    dismissible: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                });
                window.location.href = 'http://localhost:8000';
            });
    }

    getUser() {
        const id = window.localStorage.getItem("user");
        if (id) {
            this.props.userService.get(id)
                .then((user) => {
                    this.setState({user: user});
                });
        }
    }

    getCart() {
        if (this.state.user) {
            this.props.clothesService.getCart(this.state)
                .then((cart) => {
                    this.setState({cart: cart});
                });
        }
    }

    addToCart(id, price) {
        let cost = 0;

        this.state.cart.map((c) => {
            cost += c.price;
        });

        if ((price+cost) <= 300) {
            // add to cart
        } else {
            toast({
                message: 'You have exceeded the max amount of clothes for the month.',
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeIn', out: 'fadeOut' },
            });
        }
    }

    render() {
        return (
            <div>
                <RefuelHeader
                  userAuthenticated={this.state.isAuthenticated}
                  currency={this.state.user ? this.state.user.currency : 0}
                  logout={this.logout}
                 {...this.props}></RefuelHeader>
                <RefuelRouter login={this.login} {...this.props}></RefuelRouter>
                <RefuelFooter {...this.props}></RefuelFooter>
            </div>
        );
    }
}

export default App;