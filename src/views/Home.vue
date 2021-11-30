<template>
  
  <!-- Tim học phần -->
        <div class="col-12 col-md-5">
            <h2 style="text-align:center">Tìm học phần</h2>
            <form action="" method="post">
                <div class="input-group">
                    <input v-model="search" type="search" name="mahp" class="form-control rounded" placeholder="Nhập mã học phần" aria-label="Search" aria-describedby="search-addon" required="">
                    <button type="submit" class="btn btn-outline-primary" @click.prevent="searchByMaHP">search</button>
                </div>
            </form>

            
            <span v-if='errMessage' style="color:red"><b>{{errMessage}}</b></span>
            <table class="table align-middle">
                <thead>
                    <tr>
                        <!-- <th scope="col">#</th> -->
                        <th scope="col">Mã học phần</th>
                        <th scope="col">Tên học phần</th>
                        <th scope="col">Tín chỉ</th>
                        <th scope="col">Chọn</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Show học phần tìm được -->
                     <tr v-for='(hp,key) in ketQua' :key='key'>
                        <th class="thai">{{hp.mahp}}</th>
                        <th class="thai">{{hp.tenhp}}</th>
                        <th class="thai">{{hp.tinchi}}</th>
                        <th class="them-btn" @click="themKeHoach(hp)">Thêm</th>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- END ---Tìm học phần -->

        <!-- Kế hoạch học tập -->
        <div class="col-12 col-md-5">
            <h2 style="text-align:center">Kế hoạch học tập</h2>
            <h4>Username: {{loggedInUser.username}}</h4>
            <!-- Danh sách học phần -->
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th>STT</th>
                        <th>Mã HP</th>
                        <th>Tên học phần</th>
                        <th>Tín chỉ</th>
                        <th>Xóa</th>
                    </tr>
                    
                </thead>

                <tr v-for='(hp,key) in keHoachHT' :key='key'>
                        <th >{{key+1}}</th>
                        <th class="thai">{{hp.mahp}}</th>
                        <th class="thai">{{hp.tenhp}}</th>
                        <th class="thai">{{hp.tinchi}}</th>
                        <th @click="xoaKeHoach(hp.mahp)" class="xoa">Xóa</th>
                </tr>
                <tbody>

                </tbody>
                <tfoot>
                  <tr>
                    <th colspan="3" style="text-align:right">Tổng Số Tín Chỉ: </th>
                    <th class="tongtc">{{tongTC}}</th>
                  </tr>
                </tfoot>
            </table>
        </div>
        <!-- END ---Kế hoạch học tập -->
</template>

<script>
import { mapGetters } from 'vuex'
import HocPhanService from '../services/hocphan.service'
import KeHoachService from '../services/kehoach.service'
export default {
  data(){
    return{
      search: null,
      errMessage: null,
      keHoachHT:null,
      ketQua:null,
    }
  },
  methods: {
    async searchByMaHP(){
      console.log('searchval', this.search)
      const [error, response] = await this.handle(
                HocPhanService.findbyMaHP(this.search)
            );
      if (error) {
          console.log(error);
      } else {
          this.ketQua = response.data;
          if(response.data.length==0){
            this.errMessage = 'Không tìm thấy Mã Học Phần'
          }else{
            this.errMessage = null
          }
          console.log(response.data);
      }
    },
    async getAllKeHoach(){
      const [error, response] = await this.handle(
                KeHoachService.getAll()
            );
      if (error) {
          console.log(error);
      } else {
          this.keHoachHT = response.data;
          console.log(response.data);
      }
    },
    async themKeHoach(data){
      console.log(data)
      const [error, response] = await this.handle(
                KeHoachService.add(data)
            );
      if (error) {
          console.log(error);
      } else {
          console.log(response.status);
          if(response.status==201){
            this.errMessage = response.data
          }else{
            this.getAllKeHoach();
          this.errMessage=null
          }
         

      }
    },
    async xoaKeHoach(mahp){
      const [error, response] = await this.handle(
                KeHoachService.delete(mahp)
            );
      if (error) {
          console.log(error);
      } else {
          // this.keHoachHT = response.data;
          this.getAllKeHoach();
          console.log(response.data);
      }
    }
  },
  computed:{
    tongTC : function(){
      if(this.keHoachHT==null){
        return 0
      }else{
        let sum=0;
        this.keHoachHT.forEach(element => {
          sum += parseInt(element.tinchi)
        });
        return sum;
      }
    },
    ...mapGetters([
      "loggedInUser"
    ]),
    
  },
  mounted(){
    this.getAllKeHoach();
  }
}
</script>

<style>
  .them-btn{
    
    color: blue;
  }
  .them-btn:hover{
    cursor: pointer;
    
  }
  .thai {
    color: #b020c3;
  }
  .xoa{
    color: crimson;
  }
  .xoa:hover{
    cursor: pointer;
  }
  .tongtc{
    color: #00BFFF;
  }
h4{
  color: #e20fad;
}
</style>