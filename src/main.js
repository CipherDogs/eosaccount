import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import router from './router';
import Index from './Index';

import { ChainName } from "eosio-uri";

Vue.router = router;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

window.apiNode = "https://api.eosn.io";
window.chainId = ChainName.EOS;
window.CONTRACT_NAME = "account.info";

if (window.location.href.indexOf('eosaccount.cipherdogs.net') > -1 || window.location.href.indexOf('ost:') > -1)
    new Vue({
        render: h => h(Index),
        el: '#app',
        router
    });
