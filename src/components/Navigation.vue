<template>
  <div v-if="$route.name!='DangKy'&&$route.name!='DangNhap'" class="col-12 col-md-2" style="padding-left:0">
            <div class="nav-side-menu">
                <div class="brand">Hệ Thống DKTKB</div>
                <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div class="menu-list">

                    <ul id="menu-content" class="menu-content collapse out">

                        <li :class="{active: $route.name=='Home'}">
                            <router-link to='/'>
                            <a href="#">
                                <i class="fas fa-user-tie fa-lg"></i> Kế Hoạch Học Tập
                            </a>
                            </router-link>
                        </li>
                        <li :class="{active: $route.name=='ThoiKhoaBieu'}">
                            <router-link to="/thoikhoabieu">
                            <a href="#">
                                <i class="fas fa-user-tie fa-lg"></i> Sắp Thời Khóa Biểu
                            </a>
                            </router-link>
                        </li>
                        <li :class="{active: $route.name=='DanhSachTKB'}"> 
                            <router-link to="/dstkb">
                            <a href="#">
                                <i class="fas fa-user-tie fa-lg"></i> Danh sách Thời Khóa Biểu
                            </a>
                            </router-link>
                        </li>

                        
                        <li>
                            <a href="./logout" @click.prevent="dangXuat">
                                <i class="fas fa-sign-out-alt"></i> Đăng xuất
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
            
        </div>
</template>

<script>
export default {
    methods: {
        dangXuat() {
            this.$store.commit("logout");
            this.$router.push("/dangnhap");
        },
    },
}
</script>

<style>

</style>