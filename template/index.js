import Vue from 'vue/dist/vue.js'; // to load Vue2 template parser
import ${bigName} from './src/${name}.vue';

new Vue({
    el: '#container',
    components: {
        '${name}': ${bigName}
    },
    data() {
        return {};
    }
});
