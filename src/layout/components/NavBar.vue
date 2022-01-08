<template>
  <div class="navbar">
    <hamburger class="hamburger-container" />
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect" />
      <screen-full class="right-menu-item hover-effect" />
      <theme-picker class="right-menu-item hover-effect" />
      <lang-select class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            :size="40"
            :src="$store.getters.userInfo.avatar"
            shape="square"
          ></el-avatar>
          <el-icon><tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>
              <router-link to="/">主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a href="#" target="_blank">课程主页</a>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Tools } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import Hamburger from './hamburger'
import Breadcrumb from './Breadcrumb'
import LangSelect from './LangSelect'
import ThemePicker from '@/components/ThemePicker'
import ScreenFull from '@/components/ScreenFull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from './/Guide'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  // align-items: center;
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
