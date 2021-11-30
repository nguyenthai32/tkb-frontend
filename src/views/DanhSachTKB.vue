<template>
  
  <div class="col-12 col-md-4">
  <h2>Danh sách thời khóa biểu</h2>

  <ul class="list-group list-group-flush thai1">
  <li v-for="(tkb,key) in dsTkb" :key="key" class="list-group-item"  @click="chiSoHienTai=key" :class="{active: chiSoHienTai==key}">{{tkb.tenTkb}}</li>
  
</ul>
  </div>


<div class="col-12 col-md-6">
    <h2 style="text-align: center">Thời khóa biểu</h2>

    <table class="table table-bordered" id="tkb">
      <thead>
        <tr style="background-color: #9dead6">
          <th style="text-align: center">#</th>
          <th style="text-align: center">Thứ 2</th>
          <th style="text-align: center">Thứ 3</th>
          <th style="text-align: center">Thứ 4</th>
          <th style="text-align: center">Thứ 5</th>
          <th style="text-align: center">Thứ 6</th>
          <th style="text-align: center">Thứ 7</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(t,index) in tkb_table' :key='index'>
          <th style="text-align: center; background-color: #9dead6">{{index+1}}</th>
          <td style="color: #FF00FF; font-size: 20px; " v-for="(hp,key) in t" :key='key'>{{hp}}</td>
          
        </tr>
        
      </tbody>
    </table>
    <button v-if="chiSoHienTai!=null" type="button" class="btn btn-danger" @click="xoaTkb">Xóa TKB</button>
  </div>
  
  
</template>

<script>
import TkbService from '../services/tkb.services'
export default {
  data(){
    return {
      dsTkb:[],
      chiSoHienTai: null,
      
    }
  },
  methods: {
    async xoaTkb(){
      console.log(this.dsTkb[this.chiSoHienTai].id)
      console.log(this.dsTkb[this.chiSoHienTai])
      const id =this.dsTkb[this.chiSoHienTai].id
      const [error, response] = await this.handle(
                TkbService.xoa(id)
            );
      if (error) {
          console.log(error);
      } else {
        
        console.log('tkb xoa', response.data)
        this.khoiTaoDs()
        this.chiSoHienTai=null
      }
    },
    async khoiTaoDs(){
       const [error, response] = await this.handle(
                TkbService.getAll()
            );
      if (error) {
          console.log(error);
      } else {
        this.dsTkb=response.data
        console.log('tkb Lay', this.dsTkb)
      }
    },
    chuyenDoiTkb(data){
      let table = []
      for(let i=0; i<=8; i++){
        let tmp = []
        for(let j=2;j<=7;j++){
          tmp.push(null)
        }
        table[i] = tmp
      }
      for(let t=0; t<data.length; t++)
      for(let k=0; k<data[t].length; k++){
        for(let i=parseInt(data[t][k].tietbd); i<parseInt(data[t][k].tietbd)+parseInt(data[t][k].sotiet); i++)
          table[i-1][parseInt(data[t][k].thu)-2] = data[t][k].mahp +'-'+ data[t][k].nhom
        }
        console.log(data)
      console.log(table)
      return table
    },
  },
  computed:{
    
    tkb_table(){
      if(this.chiSoHienTai==null){
        return null
      }
      return this.chuyenDoiTkb(this.dsTkb[this.chiSoHienTai].data)
    }
  },
  mounted(){
    this.khoiTaoDs()
  }
}
</script>

<style>
  .thai1{
    
  }
  .thai1:hover{
    cursor: pointer;
  }
</style>