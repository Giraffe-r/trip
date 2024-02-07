<template>
  <div class="earth-container">
    <div id="earth"></div>
  </div>
  <el-dialog v-model="message.visible" title="详细信息" width="30%">
    <span>{{ message.name }}:{{ message.value }}</span>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from "@/router";
import changeConfig from "./config";
import { EarthDataType, EarthData } from "./interface";
import * as echarts from "echarts";
import "echarts-gl";
import { onBeforeUnmount, onMounted, reactive, watch } from "vue";
let earth: echarts.ECharts;
let map: echarts.ECharts;
const message = reactive({
  name: "",
  value: "" as string | number,
  visible: false,
});
const config = reactive({
  is3D: true,
  hasEarthImg: true,
  earthBackground: "",
  countryBackground: "",
  dataType: 0 as EarthDataType,
});
const common = reactive({
  isHover: false,
  hoverTimer: 0,
  rotaionTime: 36, //默认一圈36秒
  autoRotateAfterStill: 1, //在鼠标静止操作后恢复自动旋转的时间间隔
});
watch(
  () => common.isHover,
  (value) => {
    if (value) {
      // hover停止旋转
      if (common.hoverTimer) {
        window.clearTimeout(common.hoverTimer);
      }
      earth.setOption({
        globe: {
          viewControl: {
            autoRotate: false,
          },
        },
      });
    } else {
      // 移出旋转
      common.hoverTimer = window.setTimeout(() => {
        earth.setOption({
          globe: {
            viewControl: {
              autoRotate: true,
            },
          },
        });
      }, common.autoRotateAfterStill * 1000);
    }
  },
  { deep: true }
);
/**
 * @description 改变地球背景图
 */
const changeEarthImg = (value: boolean) => {
  changeConfig.changeEarthImg(earth, value);
};
/**
 * @description 改变地球背景
 */
const changeBackground = (value: string) => {
  changeConfig.changeEarthColor(map, value);
};
/**
 * @description 改变国家颜色
 */
const changeCountryBackground = (value: string) => {
  changeConfig.changeCountryColor(map, value);
};
/**
 * @description 切换2/3d
 */
const change3Dor2D = () => {
  map.dispose();
  if (config.is3D) {
    initEarth();
  } else {
    earth.dispose();
    map = null as unknown as echarts.ECharts;
    const chartDom = document.getElementById("earth") as HTMLElement;
    map = echarts.init(chartDom);
    map.setOption({
      tooltip: {
        trigger: "item",
      },
    });
  }
};
/**
 * @description 配置地图
 */
const initMap = () => {
  // 使用 echarts 绘制世界地图的实例作为纹理
  var canvas = document.createElement("canvas");
  map = echarts.init(canvas, undefined, {
    width: 4096,
    height: 2048,
  });
  map.setOption({
    series: [
      {
        type: "map",
        map: "world",
        // 绘制完整尺寸的 echarts 实例
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boundingCoords: [
          [-180, 90],
          [180, -90],
        ],
        label: {
          show: true, //展示国家名
        },
        itemStyle: {
          areaColor: "transparent",
        },
        // hover样式
        emphasis: {},
        // select样式
        select: {
          disabled: true,
        },
        // data: data.map((item) => ({ name: item.name, value: item.value })),
      },
    ],
  });
  /**
   * @description 点击国家展示信息
   */
  map.on("click", (event: any) => {
    message.name = event.name;
    console.log(event.name);
    if (event.name === "China") {
      router.push('/china');
    }else{
      message.value = "敬请期待"
      message.visible = true;

    }
  });
};
/**
 * @description 配置3d地球
 */
const initEarth = () => {
  const chartDom = document.getElementById("earth") as HTMLElement;
  earth = echarts.init(chartDom);
  echarts.registerMap("world", {
    geoJSON: require("@/utils/world.json"),
    specialAreas: {},
  });

  initMap();

  const earthOption = {
    backgroundColor: "transparent",
    globe: {
      baseTexture: require("@/assets/world.topo.bathy.200401.jpg"),
      // shading: "color",
      environment: require("@/assets/starfield2.jpg"),
      // displacementScale: 0.04,
      shading: 'realistic',
      realisticMaterial: {//灯光范围效果
        roughness: 0.9
      },
      postEffect: {
        enable: true
      },
      light: {//灯光亮度
        main: {
          intensity: 3,
          shadow: true
        },
      },
      layers: [
        {
          type: "blend",
          texture: map, //将map和3d地球纹理混合
        },
      ],
      viewControl: {
        autoRotate: true, //是否开启视角绕物体的自动旋转查看
        autoRotateAfterStill: common.autoRotateAfterStill, //在鼠标静止操作后恢复自动旋转的时间间隔
        animation: false, // 非常重要！！！ 解决setOption时停顿一下的问题
      },
    },
    visualMap: {
      show: false, // 隐藏 visualMap 组件
      calculable: true, //是否显示拖拽用的手柄
      realtime: false, //拖拽时，是否实时更新。
    },
  };
  earth.setOption(earthOption);

  map.getZr().on("mousemove", () => {
    if (config.is3D) {
      common.isHover = true;
    }
  });
  map.getZr().on("mouseout", () => {
    if (config.is3D) {
      common.isHover = false;
    }
  });
};
onMounted(() => {
  // getSelectData();
  initEarth();
});
onBeforeUnmount(() => {
  if (common.hoverTimer) {
    window.clearTimeout(common.hoverTimer);
  }
});
</script>

<style lang="scss" scoped>
.earth-container {
  width: 100%;
  height: 100%;

  #earth {
    width: 100%;
    height: 100%;
  }
}
</style>
