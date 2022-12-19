<template>
    <div class="home">
        <header>
            <h1>Decentralized Identity on EOS</h1>
            <div v-if="!authorized">
                <button @click="login">Login</button>
            </div>
            <div v-else>
                <span>{{ auth.actor }}({{ auth.permission }})</span>
                <button @click="logout">Log Out</button>
            </div>
        </header>
        <div class="form">
            <div>
                <span>Account</span>
                <input v-model="account_name" />
            </div>
            <div>
                <span>Nickname</span>
                <input v-model="title" />
            </div>
            <div>
                <span>Avatar</span>
                <input v-model="avatar" />
            </div>
            <div>
                <span>Intro</span>
                <textarea v-model="desc" />
            </div>
            <button @click="transact">Pay 0.1000 EOS to Confirm</button>
        </div>
    </div>
</template>

<script>
import Link from "anchor-link";
import BrowserTransport from "anchor-link-browser-transport";

export default {
    name: "Home",
    data() {
        return {
            authorized: false,
            auth: undefined,
            account_name: "",
            avatar: "",
            desc: "",
            title: "",
            url: {
                website: "",
                telegram: "",
                twitter: "",
                wechat: "",
            },
        };
    },
    mounted() {
        this.link = new Link({
            transport: new BrowserTransport({ requestStatus: false }),
            rpc: window.apiNode,
            chainId: window.chainId,
        });

        const data = window.localStorage.getItem("auth");

        if (!data) {
            this.authorized = false;
        } else {
            this.authorized = true;
            this.auth = JSON.parse(data);
        }
    },
    methods: {
        async login() {
            const identity = await this.link.login("mydapp");
            const { session } = identity;

            this.auth = session.auth;
            this.authorized = true;

            window.localStorage.setItem("auth", JSON.stringify(session.auth));
        },
        logout() {
            window.localStorage.removeItem("auth");
            this.authorized = false;
        },
        async transact() {
            this.link
                .transact({ actions: this.getActions() })
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getActions() {
            return [
                {
                    account: "eosio.token",
                    name: "transfer",
                    authorization: [this.auth],
                    data: {
                        from: this.auth.actor, // the current account,which is used to update other account's information
                        memo: this.account_name, // the account whose information will be update
                        quantity: "0.1000 EOS", // initial price is 0.1EOS, the price will be 1.5 times on each update
                        to: window.CONTRACT_NAME, // the contract account
                    },
                },
                {
                    account: window.CONTRACT_NAME,
                    name: "update",
                    authorization: [this.auth],
                    data: {
                        account_name: this.account_name, // the account whose information will be update
                        avatar: this.avatar, // avatar url
                        desc: this.desc,
                        modifier: this.auth.actor,
                        title: this.title, // nickname
                        url: JSON.stringify(this.url),
                    },
                },
            ];
        },
    },
};
</script>

<style scoped>
@import "../assets/styles/style.css";
</style>
