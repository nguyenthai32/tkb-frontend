<template>
<div class="row">

<Navigation />
<router-view></router-view>
</div>
    
</template>

<script>
import Navigation from './components/Navigation.vue'
import {mapGetters,mapMutations} from "vuex";

export default {
    name: 'App',
    components: {
        Navigation,
    },
    computed:{
        ...mapGetters({
                currentUser: "loggedInUser",
            }),
    },
    methods: {
        ...mapMutations([
            "initAuthState"
        ]),

        logout() {
            this.$store.commit("logout");
            this.$router.push("login");
        },
    },
    mounted() {
        this.initAuthState();
    },
}
</script>

<style>
@charset "ISO-8859-1";
@import url("https://use.fontawesome.com/releases/v5.0.11/css/all.css");
.Button {
    height: 50px;
    position: relative;
    background: #ccc;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    overflow: hidden;
}

.nav-side-menu {
    overflow: auto;
    font-family: verdana;
    font-size: 14px;
    font-weight: 200;
    background-color: white;
    position: fixed;
    top: 0px;
    padding-left: 0px;
    height: 100%;
    width: 17%;
    color: black;
}

.nav-side-menu .brand {
    background-color: white;
    line-height: 50px;
    display: block;
    text-align: center;
    font-size: 14px;
}

.nav-side-menu .toggle-btn {
    display: none;
}

.nav-side-menu ul,
.nav-side-menu li {
    list-style: none;
    padding: 0px;
    margin: 0px;
    line-height: 35px;
    cursor: pointer;
}

.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
    font-family: 'Font Awesome 5 Free';
    content: "\f13a";
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    vertical-align: middle;
    float: right;
    font-weight: 900;
}

.nav-side-menu ul .active,
.nav-side-menu li .active {
    border-left: 3px solid #d19b3d;
    background-color: rgb(96, 177, 252);
}

.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
    color: #d19b3d;
}

.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
    color: #d19b3d;
}

.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
    background-color: #1ee04d;
    border: none;
    line-height: 28px;
    border-bottom: 1px solid #23282e;
    margin-left: 0px;
}

.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
    background-color: #020203;
}

.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
    font-family: 'Font Awesome 5 Free';
    content: "\f105";
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    vertical-align: middle;
    font-weight: 900;
}

.nav-side-menu li {
    padding-left: 0px;
    border-left: 3px solid #84a3c6;
    border-bottom: 1px solid #23282e;
}

.nav-side-menu li a {
    text-decoration: none;
    color: black;
}

.nav-side-menu li a i {
    padding-left: 10px;
    width: 20px;
    padding-right: 20px;
}

.nav-side-menu li:hover {
    border-left: 3px solid #d19b3d;
    /* background-color: #4f5b69; */
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
}

@media (max-width: 767px) {
    .nav-side-menu {
        position: relative;
        width: 100%;
        margin-bottom: 10px;
    }
    .nav-side-menu .toggle-btn {
        display: block;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10 !important;
        padding: 3px;
        background-color: #ffffff;
        color: #000;
        width: 40px;
        text-align: center;
    }
    .brand {
        text-align: left !important;
        font-size: 22px;
        padding-left: 20px;
        line-height: 50px !important;
    }
}

@media (min-width: 767px) {
    .nav-side-menu .menu-list .menu-content {
        display: block;
    }
}

body {
    margin: 0px;
    padding: 0px;
}

#editing,
#highlighting {
    /* Both elements need the same text and space styling so they are directly on top of each other */
    margin: 10px;
    padding: 10px;
    border: 0;
    width: calc(100% - 32px);
    height: 150px;
}

#editing,
#highlighting,
#highlighting * {
    /* Also add text styles to highlighting tokens */
    font-size: 15pt;
    font-family: monospace;
    line-height: 20pt;
}

@mixin make-container() {
    width: 100%;
    padding-right: ($grid-gutter-width / 2);
    padding-left: ($grid-gutter-width / 2);
    margin-right: auto;
    margin-left: auto;
}

@mixin make-container-max-widths($max-widths: $container-max-widths,
$breakpoints: $grid-breakpoints) {
    @each $breakpoint,
    $container-max-width in $max-widths {
        @include media-breakpoint-up($breakpoint,
        $breakpoints) {
            max-width: $container-max-width;
        }
    }
}

@mixin make-row() {
    display: flex;
    flex-wrap: wrap;
    margin-right: ($grid-gutter-width / -2);
    margin-left: ($grid-gutter-width / -2);
}

@mixin make-col-ready() {
    position: relative;
    width: 100%;
    min-height: 1px; 
    padding-right: ($grid-gutter-width / 2);
    padding-left: ($grid-gutter-width / 2);
}

@mixin make-col($size,
$columns: $grid-columns) {
    max-width: percentage($size / $columns);
}

@mixin make-col-offset($size,
$columns: $grid-columns) {
    $num: $size / $columns;
    margin-left: if($num==0, 0, percentage($num));
}
</style>
