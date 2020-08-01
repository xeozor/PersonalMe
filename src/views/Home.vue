<template>
  <div class="main secondary"> 
    <navbar></navbar> 

    <v-btn @click="addModalToggle" v-if="!VissibleSwitch" key="AddModalToggler"
     class="text-center primary rounded-circle d-inline-flex align-center justify-center ma-3 add-modal-btn" height="64" width="64" icon>
      <v-icon class="add-modal-icon white--text">mdi-plus</v-icon>     
    </v-btn>

    <v-btn @click="addLinkToggle" v-if="VissibleSwitch" key="AddLinkToggler"
     class="text-center primary rounded-circle d-inline-flex align-center justify-center ma-3 add-link-btn" height="64" width="64" icon>
      <v-icon class="add-modal-icon white--text">mdi-plus</v-icon>     
    </v-btn>

    <v-btn @click="VissibleSwitch = !VissibleSwitch" v-if ="VissibleSwitch" key="DesktopLink"
     class="text-center primary rounded-circle d-inline-flex align-center justify-center ma-3 desktop-back-btn" height="64" width="64" icon>
      <v-icon class="desktop-link-icon white--text">mdi-chevron-left</v-icon>
    </v-btn>

    <v-col v-if="!VissibleSwitch" class="link-container mx-auto" key="linkGroup"> 
      <v-list class="d-flex flex-wrap group-list secondary" dark>     
      <li v-for="group in groupCol" :key="group.groupId"
       class="desktop-group d-flex align-center justify-center primary ml-lg-14 ml-md-10 mt-md-4 md-lg-7">        
        <v-icon @click="moveToGroup(group.groupId)" class="white--text group-icon">{{group.icon}}</v-icon>
        <p class="group-title text-center pt-lg-3 pb-lg-0">{{group.title}}</p>
        <v-icon class="delete-group" @click="deleteGroup(group.groupId)">mdi-close</v-icon>
      </li>
      </v-list>
    </v-col> 
    <add-modal></add-modal>

    <v-col v-if="VissibleSwitch" class="link-container mx-auto" key="currentLinkGroup"> 
      <v-list class="d-flex flex-wrap group-list secondary" dark>     
      <li :to="link.link" v-for="link in subGroupArr" :key="link.LinkId"     
       class="link-group d-flex align-center justify-center primary ml-lg-14 ml-md-10 mt-md-4 md-lg-7">        
        <v-icon @click="moveToLink(link.link)" class="white--text link-icon">{{link.icon}}</v-icon>
        <p class="link-title text-center pt-lg-3 pb-lg-0">{{link.title}}</p>
        <v-icon class="delete-link" @click="deleteLink(link.linkId)">mdi-close</v-icon>
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
      currentGroup:'',
      subGroupArr:[],
      VissibleSwitch:false,
      groupSwitch:true,      
    }
  },
  computed:{
    ...mapGetters([      
      'iconArray',
      'addLinkToggler',
      'currentGroupId',
    ])    
  },
  methods:{   
    addModalToggle(){
      this.$store.commit('addModalToggle');
    },    
    addLinkToggle(){
      this.$store.commit('addLinkToggle');
    },        
    moveToGroup(groupId){
      this.db.collection('Group').doc(groupId).collection("Links").get().then(snapshot =>{
        snapshot.forEach(doc => {
          this.subGroupArr.push({icon: doc.data().icon, title: doc.data().title, link:doc.data().link, linkId:doc.id});
        })                       
      }).then(
      this.$store.commit('SetCurrentGroupId', groupId),
      this.VissibleSwitch = !this.VissibleSwitch
      );               
    },
    moveToLink(link){
      window.open(link, "_blank")
    },
    deleteLink(linkId){
      this.db.collection('Group').doc(this.currentGroupId).collection('Links').doc(linkId).delete().then(
        this.db.collection('Group').doc(this.groupId).collection("Links").get().then(snapshot =>{
        snapshot.forEach(doc => {
          this.subGroupArr.push({icon: doc.data().icon, title: doc.data().title, link:doc.data().link, linkId:doc.id});
        })                       
      })
      );
    },
    deleteGroup(groupId){
      this.db.collection('Group').doc(groupId).delete().then(
        this.db.collection('Group').doc(groupId).collection("Links").get().then(snapshot =>{
        snapshot.forEach(doc => {
          this.subGroupArr.push({icon: doc.data().icon, title: doc.data().title, link:doc.data().link, linkId:doc.id});
        })                       
      })
      );      
    }
    
   
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
.add-modal-btn, .add-link-btn{
  position: absolute;
  bottom:40px;
  left: 40px;
  box-shadow: 0px 4px 35px rgba(32, 242, 91, 0.53)!important;
}
.desktop-back-btn{
  position: absolute;  
  bottom: 120px;
  left: 40px;
  box-shadow: 0px 4px 35px rgba(32, 242, 91, 0.53)!important;

}
.add-modal-icon, .add-link-icon, .desktop-link-icon {
  font-size: 22px;  
}
.link-container{
  margin-top:14vh; 
  max-width: 83%!important;
  width: 100%;
}
.group-list{
  width: 100%;
  list-style-type: none;
}
.desktop-group{
  box-shadow: 0px 0px 35px rgba(32, 242, 91, 0.53);
  border-radius: 28px;
  width: 14vw;
  height: 14vw;
  position: relative;  
  cursor: pointer;  
}
.link-group{
  box-shadow: 0px 0px 35px rgba(32, 242, 91, 0.53);
  border-radius: 28px;
  width: 11vw;
  height: 11vw;
  position: relative;
  cursor: pointer;
}
.group-icon{
  font-size: 5vw;
}
.link-icon{
  font-size: 4vw;
}
.group-title{
  position: absolute;  
  bottom: 0.85vw;
  font-size: 1.3vw; 
}
.link-title{
  position: absolute;  
  bottom: 0.55vw;
  font-size: 1.2vw; 
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
.delete-link{
  position: absolute;
  top:-14px;
  right:-10px;
  z-index:1051;
}
.delete-group{
  position:absolute;
  top:-15px;
  right:-10px;
  z-index: 1051;
}
</style>


