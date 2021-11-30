<template>
  <!-- Chon nhom-->
  <div class="col-12 col-md-4">
    <h2 style="text-align: center">Chọn Nhóm</h2>
    <!-- Danh sách học phần -->
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>STT</th>
          <th>Mã HP</th>
          <th>Tên học phần</th>
          <th>Nhóm</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hp,index) in ds" :key='hp.mahp'>
          <th>{{index+1}}</th>
          <th class="chonnhom">{{hp.mahp}}</th>
          <th class="chonnhom">{{hp.tenhp}}</th>
          <th>
            <select @change="handleThayDoiNhom($event,hp.mahp)">
              <option value="0" >None</option>
              <option  v-for="nhom in hp.nhom" :value="nhom" :key='nhom'>{{nhom}}</option>
            </select></th>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- END ---Chon nhom-->
</template>

<script>
import KeHoachService from '../services/kehoach.service'
export default {
  data(){
    return {
      ds:null,
    }
  },
  methods: {
    async layDS(){
      const [error, response] = await this.handle(
                KeHoachService.getNhom()
            );
      if (error) {
          console.log(error);
      } else {
          this.ds = response.data;
          
      }
    },
    async handleThayDoiNhom(e,mahp){
      const nhom =e.target.value
      console.log(mahp)
      const result = new Promise((resolve) =>
        this.$emit('thayDoiNhom', mahp, nhom,resolve)
      )
      result.then((value)=>{
        console.log('tag', value)
        if(value!='ok'){
          e.target.value = 0
        }
      })

      
    }
  },
  mounted(){
    this.layDS();
  }
}
</script>

<style>
.chonnhom{
   color: #b020c3;
}
</style>