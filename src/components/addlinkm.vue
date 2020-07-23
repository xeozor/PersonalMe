<template>
  <v-dialog content-class="dialog-neon" v-model="addLinkToggler"
   overlay-color="#000000" overlay-opacity="0.85">
     
        <v-form class="form-modal d-flex align-center flex-column pb-5 primary"> 
          <v-container class="d-flex align-center primary">                       
          <v-container class="preview-container d-flex flex-column justify-space-around align-center" dark>            
            <h1 class="white--text">Preview:</h1>
            <v-icon class="preview-icon">{{currentLinkIcon}}</v-icon>
            <p class="input-title white--text">{{linkTitleTextInput}}</p>            
            <input id="icon-text-input" type="text" placeholder="Set a name" v-model="linkTitleTextInput" />
            <input id="link-input" type="text" placeholder="Set a link" v-model="linkInput" />
          </v-container>
          <v-container class="icon-container secondary">
            <span class="icon-box primary mx-2" v-for="icon in iconArray" :key="icon.icon" @click="setCurrentLinkIc(icon.icon)">
              <v-icon class="icon-choose primary my-1">{{icon.icon}}</v-icon>
            </span>  
          </v-container>  
          </v-container>          
          <v-btn @click="addLink" class="add-group-btn primary">Add Link</v-btn>                      
        </v-form> 
                 
        
              
      
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  data(){
    return{
      currentLinkIcon:'mdi-youtube',
      linkTitleTextInput:'',
      linkInput:'',
      db: this.$firebase.firestore(), 
      fv: this.$firebase.firestore.FieldValue,
    }
  },
  methods:{
    addLink(){
      this.db.collection("Group").doc(this.currentGroupId).collection("Links").add({      
      icon: this.currentLinkIcon,
      title: this.linkTitleTextInput,
      link: this.linkInput
    })
    this.$store.commit('addLinkToggle');        
    },
    setCurrentLinkIc(ic){
      this.currentLinkIcon = ic;
    }
  },
  computed:{
    ...mapGetters([
      'addLinkToggler',
      'iconArray',
      'currentGroupId'
    ])    
  }
}
</script>

<style scoped>
#icon-text-input[type = text]{
  font-family: Assistant;
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  padding: 5px;
}
#link-input[type = text]{
  font-family: Assistant;
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  padding: 5px;
}
#icon-text-input{
  border-radius: 15px;
  background-color: white;
}
#link-input{
  margin-top:15px; 
  border-radius: 15px;
  background-color: white;
}
.icon-container{
  border-radius: 15px;
  height: 240px;
  width: 380px;
  overflow: scroll;
  overflow-x: hidden;
}
.icon-box{
  cursor: pointer;
}
.preview-container{
  position: relative;
  height:300px;
}
.preview-icon{
  font-size: 80px;
  color: white;
  padding: 15px;
  margin-bottom: 20px;
}
.icon-choose{
  box-shadow: 0px 0px 10px 12px rgba(30, 30, 60, 0.22);
  padding: 8px;
  font-size: 35px;
  color: white;
}
.icon-select{
  border-radius: 25px!important;  
}
.input-title{
  position: absolute;
  bottom:100px;
  font-size: 20px;
  font-family: Assistant;
  font-style: normal;
  font-weight: 800;
}
.add-group-btn{
  box-shadow: 0px 0px 35px rgba(32, 242, 91, 0.53)!important;
  border-radius: 20px!important;  
}
</style>
<style>
.dialog-neon{
  box-shadow: 0px 0px 35px rgba(32, 242, 91, 0.53)!important;
  border-radius: 28px!important;
  max-width: 50%;
}
</style>