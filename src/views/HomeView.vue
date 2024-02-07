<template>
  <div class="home-container">
    <el-radio-group v-model="menu" size="large" @change="chooseMenu">
      <el-radio-button
        v-for="menu in menuList"
        :key="menu"
        :label="menu.label"
        >{{ menu.name }}</el-radio-button
      >>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const menuList = reactive([
  {
    name: "3D地球",
    label: "3DEarth",
  },
]);
const menu = ref("");

const chooseMenu = (menu: string) => {
  let pathName = "";
  switch (menu) {
    case "3DEarth":
      pathName = "earth";
      break;
  }

  router.push({ name: pathName });
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
