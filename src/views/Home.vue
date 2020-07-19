<template>
  <div class="main secondary"> 
    <navbar></navbar> 

    <v-btn @click="addModalToglle" v-if="!VissibleSwitch" key="AddModalToggler" class="text-center primary rounded-circle d-inline-flex align-center justify-center ma-3 add-modal-btn" height="64" width="64" icon>
      <v-icon class="add-modal-icon white--text">mdi-plus</v-icon>     
    </v-btn>

    <v-btn @click="addLinkToglle" v-if="VissibleSwitch" key="AddLinkToggler" class="text-center primary rounded-circle d-inline-flex align-center justify-center ma-3 add-modal-btn" height="64" width="64" icon>
      <v-icon class="add-modal-icon white--text">mdi-minus</v-icon>     
    </v-btn>

    <v-col v-if="!VissibleSwitch" class="link-container mx-auto" key="linkGroup"> 
      <v-list class="d-flex flex-wrap group-list secondary" dark>     
      <li v-for="group in groupCol" :key="group.groupId" @click="moveToGroup(group.groupId)"
       class="link-group d-flex align-center justify-center primary ml-lg-14 ml-md-10 mt-md-4 md-lg-7">        
        <v-icon class="white--text group-icon">{{group.icon}}</v-icon>
        <p class="group-title text-center pt-lg-3 pb-lg-0">{{group.title}}</p>
      </li>
      </v-list>
    </v-col> 
    <add-modal></add-modal>

    <v-col v-if="VissibleSwitch" class="link-container mx-auto" key="currentLinkGroup"> 
      <v-list class="d-flex flex-wrap group-list secondary" dark>     
      <li v-for="link in subGroupArr" :key="link.groupId" 
       class="link-group d-flex align-center justify-center primary ml-lg-14 ml-md-10 mt-md-4 md-lg-7">        
        <v-icon class="white--text group-icon">{{link.icon}}</v-icon>
        <p class="group-title text-center pt-lg-3 pb-lg-0">{{link.title}}</p>
      </li>
      </v-list>
    </v-col>

    <add-linkm></add-linkm>   

     
 
  </div>
</template>

<script>

import navbar from '@/components/Navbar.vue'
import addModal from '@/components/addModal.vue'
import { mapGetters } from 'vuex'
import addLinkm from '@/components/addlinkm.vue'

export default {
  name: 'Home',
  components: {
   navbar,
   addModal, 
   addLinkm  
  },
  data() {
    return{
      groupCol: [],
      db: this.$firebase.firestore(), 
      fv: this.$firebase.firestore.FieldValue,
      currentIcon:'mdi-youtube',
      titleTextInput:'', 
      subGroupArr:null,  
      currentGroup:'',
      VissibleSwitch:false,
      groupSwitch:true,
    }
  },
  computed:{
    ...mapGetters([      
      'iconArray',
      'addLinkToggler',
    ])    
  },
  methods:{   
    addModalToglle(){
      this.$store.commit('addModalToglle');
    },    
    addLinkToggle(){
      this.$store.commit('addLinkToglle');
    },
    addGroup(){
      this.db.collection("Group").add({
      groupLinks:[],
      icon: this.currentIcon,
      title: this.titleTextInput
    })
    this.$store.commit('addModalToglle');        
    },    
    moveToGroup(groupId){
      this.db.collection('Group').doc(groupId).get().then(doc =>{        
        this.subGroupArr = doc.data().groupLinks;                
      }).then(
      this.currentGroup = groupId,
      this.VissibleSwitch = !this.VissibleSwitch
      );
               
    }
    
    /*createCol(){
      this.db.collection('Group').doc(this.groupCol[0].groupId).update({        
        groupLinks: this.fv.arrayUnion({icon:'youtube',title:'Youtube',link:'youtube.com'})
      })   
    }*/
  },  
  mounted(){     
    this.db.collection('Group').get().then(snapshot => {      
      snapshot.forEach(doc => {
        this.groupCol.push({icon: doc.data().icon, title: doc.data().title, groupId:doc.id});
      });     
    });
  },   
}
</script>

<style scoped>
.main{ 
  width: 100%;
  height: 100%;
}
.add-modal-btn{
  position: absolute;
  bottom:40px;
  left: 40px;
  box-shadow: 0px 4px 35px rgba(32, 242, 91, 0.53)!important;
}
.add-modal-icon{
  font-size: 22px;  
}
.link-container{
  margin-top:10vh; 
  max-width: 83%!important;
  width: 100%;
}
.group-list{
  width: 100%;
  list-style-type: none;
}
.link-group{
  box-shadow: 0px 0px 35px rgba(32, 242, 91, 0.53);
  border-radius: 28px;
  width: 14vw;
  height: 14vw;
  position: relative;
}
.group-icon{
  font-size: 5vw;
}
.group-title{
  position: absolute;  
  bottom: 0.85vw;
  font-size: 1.3vw; 
}
#icon-text-input[type = text]{
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
}
.preview-icon{
  font-size: 80px;
  color: blueviolet;
  padding: 15px;
  margin-bottom: 20px;
}
.icon-choose{
  box-shadow: 0px 0px 10px 12px rgba(30, 30, 60, 0.22);
  padding: 8px;
  font-size: 35px;
  color: blueviolet;
}
.icon-select{
  border-radius: 25px!important;  
}
.input-title{
  position: absolute;
  bottom:57px;
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


