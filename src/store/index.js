import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addModalToggler:false, 
    addLinkToggler:false,
    addSubGroupToggler:false,  
    currentGroupId:'',   
    iconArray:[
      {icon:'mdi-youtube', type:'fab', awesUnic:'&#xf167;'},
      {icon:'mdi-spotify', type:'fab', awesUnic:'&#xf1bc;'},
      {icon:'mdi-school', type:'fas', awesUnic:'&#xf19c;'},
      {icon:'mdi-gamepad', type:'fas', awesUnic:'&#xf11b;'},
      {icon:'mdi-briefcase', type:'fas', awesUnic:'&#xf0b1;'},
      {icon:'mdi-basketball', type:'fas', awesUnic:'&#xf1e3;'},
      {icon:'mdi-food-fork-drink', type:'fas', awesUnic:'&#xf2e7;'},
      {icon:'mdi-film', type:'fas', awesUnic:'&#xf008;'},
      {icon:'mdi-play-circle', type:'far', awesUnic:'&#xf144;'},
      {icon:'mdi-account-supervisor', type:'fas', awesUnic:'&#xf500;'},
      {icon:'mdi-twitter', type:'fab', awesUnic:'&#xf099;'},
      {icon:'mdi-heart', type:'fas', awesUnic:'&#xf004;'},
      {icon:'mdi-facebook', type:'fab', awesUnic:'&#xf09a;'},
      {icon:'mdi-email', type:'fas', awesUnic:'&#xf0e0;'},
      {icon:'mdi-telegram', type:'fab', awesUnic:'&#x;'},
      {icon:'mdi-bike', type:'fas', awesUnic:'&#xf2c6;'},
      {icon:'mdi-discord', type:'fab', awesUnic:'&#xf392;'},
      {icon:'mdi-soundcloud', type:'fab', awesUnic:'&#xf1be;'},
      {icon:'mdi-vk', type:'fab', awesUnic:'&#xf189;'},
      {icon:'mdi-linkedin', type:'fab', awesUnic:'&#xf08c;'},
      {icon:'mdi-link', type:'fas', awesUnic:'&#xf0c1;'},
      {icon:'mdi-laptop', type:'fas', awesUnic:'&#xf109;'},
      {icon:'mdi-facebook-messenger', type:'fab', awesUnic:'&#xf39f;'},      
    ]
  },
  getters:{
    iconArray: state =>{
      return state.iconArray;
    },
    addModalToggler: state =>{
      return state.addModalToggler;
    },
    addLinkToggler: state =>{
      return state.addLinkToggler;
    },
    currentGroupId: state =>{
      return state.currentGroupId;
    }        
  },
  mutations: {
    addModalToggle: state =>{
      state.addModalToggler = !state.addModalToggler;
    },    
    addLinkToggle: state =>{
      state.addLinkToggler = !state.addLinkToggler;
    },
    SetCurrentGroupId(state,id){
      state.currentGroupId = id;
    }

       
  },
  actions: {   
  },
  modules: {
  }
})
