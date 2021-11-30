<template>
  <div class="col-12 col-md-5"></div>
  <div class="d-flex justify-content-center h-100">
    <div class="user_card">
      <div class="d-flex justify-content-center">
        <div class="brand_logo_container">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png"
            class="brand_logo"
            alt="Logo"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center form_container">
        <form>
          <div class="input-group mb-3">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input
              type="text"
              name=""
              class="form-control input_user"
              v-model="user.username"
              placeholder="username"
            />
          </div>
          <div class="input-group mb-2">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="password"
              name=""
              class="form-control input_pass"
              v-model="user.passwd"
              placeholder="password"
            />
          </div>
          
          <div class="d-flex justify-content-center mt-3 login_container">
            <button type="button" name="button" class="btn login_btn" @click="dangNhap(user)">
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
      <div class="mt-4">
            <div v-if='err' class="alert alert-danger" role="alert">
              {{message}}
            </div>
            
        </div>
      <div class="mt-4">
        <router-link to='/dangky'>
        <div class="d-flex justify-content-center links">
          Bạn chưa có tài khoản? <a href="#" class="ml-2">Đăng Ký</a>
        </div>
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      user:{
        username:'',
        passwd:''
      },
      message:'',
      err:false,
    }
  },
  computed: {
        ...mapGetters([
            "userLoggedIn"
        ]),
    },

    created() {
        if (this.userLoggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
      kiemTra(user){
        if(user.username==''||user.passwd==''){
          this.message="Vui lòng nhập đầy đủ thông tin"
          this.err = true
          return false
        }
        return true
      },
      async dangNhap(user) {
          if(this.kiemTra(user)){
            const [error] = await this.handle(
                this.$store.dispatch("login", user)
            );
            if (error) {
                console.log(error);
                this.err = true;
                this.message = "Đăng nhập thất bại";
            } else {
                this.$router.push("/");
            }
            console.log(user);
          }

          
      },
    },
};
</script>

<style>
.user_card {
			height: 400px;
			width: 350px;
			margin-top: 150px;
			margin-bottom: auto;
			background: #f39c12;
			position: relative;
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 10px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			border-radius: 5px;

		}
		.brand_logo_container {
			position: absolute;
			height: 170px;
			width: 170px;
			top: -75px;
			border-radius: 50%;
			background: #60a3bc;
			padding: 10px;
			text-align: center;
		}
		.brand_logo {
			height: 150px;
			width: 150px;
			border-radius: 50%;
			border: 2px solid white;
		}
		.form_container {
			margin-top: 100px;
		}
		.login_btn {
			width: 100%;
			background: #c0392b !important;
			color: white !important;
		}
		.login_btn:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.login_container {
			padding: 0 2rem;
		}
		.input-group-text {
			background: #c0392b !important;
			color: white !important;
			border: 0 !important;
			border-radius: 0.25rem 0 0 0.25rem !important;
		}
		.input_user,
		.input_pass:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
			background-color: #c0392b !important;
		}
</style>