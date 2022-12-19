import Vue from 'vue';

import VueRouter from 'vue-router';
import router from './router';
import Index from './Index';

import { ChainName } from "eosio-uri";
import { JsonRpc } from 'enf-eosjs';

Vue.router = router;
Vue.use(VueRouter);

window.apiNode = "https://api.eosn.io";
window.chainId = ChainName.EOS;
window.CONTRACT_NAME = "account.info";
window.rpc = new JsonRpc(window.apiNode, { fetch });

if (window.location.href.indexOf('eosaccount.cipherdogs.net') > -1 || window.location.href.indexOf('ost:') > -1)
    new Vue({
        render: h => h(Index),
        el: '#app',
        router
    });
