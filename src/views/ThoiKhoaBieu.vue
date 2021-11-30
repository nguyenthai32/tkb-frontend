<template>
  <!-- Thời khóa biểu -->
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
          <td v-for="(hp,key) in t" :key='key'>{{hp}}</td>
          
        </tr>
        
      </tbody>
    </table>
    <h5>Tên Thời Khóa Biểu</h5>
    <input class="tentkb1" type="text" v-model="tenTkb" placeholder="Vui lòng nhập tên thời khóa biểu">
    <button
      type="button"
      class="btn btn-primary luu"
      id="luuTkb"
      @click="luuTkb"
    >
      Lưu TKB
    </button>
    <span class="luuthanh" v-if="luuThanhCong">Đã lưu thành công</span>
    
    
    <div id="ketqua"></div>
  </div>
  <!-- END ---Thời khóa biểu -->
  <ChonNhom @thayDoiNhom='thayDoiNhom' />
  
</template>

<script>
import KeHoachService from '../services/kehoach.service'
import TkbService from '../services/tkb.services'
import ChonNhom from '../components/ChonNhom.vue'
export default {
  components:{
    ChonNhom,
  },
  data(){
    return {
      tkb_Data:[],
      tkb_table:[],
      tenTkb:null,
      luuThanhCong: false,
    }
  },
  methods: {
    async luuTkb(){
      if(this.tenTkb==null||this.tenTkb==''){
        // alert("Vui long nhap ten tkb");
        alert('Vui Lòng Nhập Tên Thời Khóa Biểu')
      }
      const [error, response] = await this.handle(
                TkbService.add({tenTkb:this.tenTkb, detail:this.tkb_Data})
            );
      if (error) {
          console.log(error);
      } else {
        console.log('luu', response.data)
        this.tenTkb = ''
        this.luuThanhCong = true
      }
       
    },
    khoiTaoBang(){
      for(let i=0; i<=8; i++){
        let tmp = []
        for(let j=2;j<=7;j++){
          tmp.push(null)
        }
        this.tkb_table[i] = tmp
      }
    },
    kiemTraTkb(tkbNhom){
     

      for(let k=0; k<tkbNhom.length; k++){
        for(let i=parseInt(tkbNhom[k].tietbd); i<parseInt(tkbNhom[k].tietbd)+parseInt(tkbNhom[k].sotiet); i++){
          if(this.tkb_table[i-1][parseInt(tkbNhom[k].thu)-2]!=null){
            return false
          }
        }
      }
      for(let k=0; k<tkbNhom.length; k++){
        for(let i=parseInt(tkbNhom[k].tietbd); i<parseInt(tkbNhom[k].tietbd)+parseInt(tkbNhom[k].sotiet); i++)
          this.tkb_table[i-1][parseInt(tkbNhom[k].thu)-2] = tkbNhom[k].mahp 
        }
      return true
    },
    xoaHocPhanTkb(mahp){
      let filtered = this.tkb_Data.filter(function(value){ 
          return value[0].mahp!=mahp
        })
        console.log(filtered)
        this.tkb_Data = filtered
      for(let i=0; i<=8; i++)
        for(let j=0; j<=7;j++){
          if(this.tkb_table[i][j]==mahp)
            this.tkb_table[i][j]=null
        }

    }
    ,
    async thayDoiNhom(mahp,nhom,resolve){

      if(nhom==0){
        this.xoaHocPhanTkb(mahp)
        
      }else{
        this.xoaHocPhanTkb(mahp)
        const [error, response] = await this.handle(
                KeHoachService.getTkb(mahp,nhom)
            );
      if (error) {
          console.log(error);
      } else {
        if(this.kiemTraTkb(response.data)){
          this.tkb_Data.push(response.data)
          resolve('ok')
          console.log('tkb khi them', this.tkb_table)
          console.log('tkb data', this.tkb_Data)
        }else{
          resolve('false')
        }
      }
      }
      
      
    }
  },
  mounted(){
    this.khoiTaoBang()
  }
};
</script>

<style>
.tentkb1{
  border-radius: 11px ;
  width: 278px;
  height: 40px;
}
.luu{
  margin-left: 18px; 
}
.luuthanh{
  margin-left: 30px;
  color: red;
}
</style>