import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme:{
        themes:{
            light:{
                primary:"#1E2831",
                secondary:"#24323D"
            }
        }
    },   
})

export default vuetify
