<template>
  <v-main class="pa-0"> 

    <v-app-bar color="primary" class="navbar-top" dark fixed>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="logo-text">Personal me</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>      

    </v-app-bar>  

  </v-main> 
</template>

<script>
export default {
  data(){
    return{
      drawer:false
    }
  }
  
}
</script>

<style scoped>
.logo-text{
  font-family: Assistant;
  font-style: normal;
  font-weight: 800;
  font-size: 34px;
  line-height: 84px;
  color: #FFFCFC;
}
.navbar-top{
  box-shadow: 0px 4px 35px rgba(32, 242, 91, 0.53)!important;
}

</style>