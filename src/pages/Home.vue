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
        <div class="search">
            <input
                placeholder="Search EOS Account"
                v-model="account_name"
                v-on:keyup.enter="searchEOSAccount"
                :disabled="search == 1"
            />
        </div>
        <div v-if="!authorized" class="account">
            <img :src="avatar" />
            <span><b>{{ title }}</b></span>
            <span>{{ desc }}</span>
        </div>
        <div v-else class="form">
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
            search: 0,
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
        async searchEOSAccount() {
            let vm = this;
            await window.rpc
                .get_table_rows({
                    code: window.CONTRACT_NAME,
                    scope: window.CONTRACT_NAME,
                    table: "accounts",
                    lower_bound: this.account_name,
                    limit: 1,
                    json: true,
                })
                .then(function (res) {
                    if (res.rows && res.rows.length == 1) {
                        vm.avatar = res.rows[0].avatar;
                        vm.desc = res.rows[0].desc;
                        vm.title = res.rows[0].title;

                        const url = JSON.parse(res.rows[0].url);
                        vm.url.website = url.website;
                        vm.url.telegram = url.telegram;
                        vm.url.twitter = url.twitter;
                        vm.url.wechat = url.wechat;

                        vm.search = vm.authorized ? 1 : 0;
                    }
                });
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
