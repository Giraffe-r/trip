import * as echarts from "echarts";

export default {
  /**
   * @description 改变地球背景图
   */
  changeEarthImg(earth: echarts.ECharts, value: boolean) {
    let result;
    if (value) {
      result = require("@/assets/earth.jpg");
    } else {
      result = null;
    }
    earth.setOption({
      globe: {
        baseTexture: result,
      },
    });
  },
  /**
   * @description 改变地球背景
   */
  changeEarthColor(map: echarts.ECharts, value: string) {
    let result;
    if (value) {
      result = value;
    } else {
      result = "transparent";
    }
    map.setOption({
      backgroundColor: result,
    });
  },
  /**
   * @description 改变国家背景
   */
  changeCountryColor(map: echarts.ECharts, value: string) {
    let result;
    if (value) {
      result = value;
    } else {
      result = "transparent";
    }
    map.setOption({
      series: [
        {
          itemStyle: {
            areaColor: result,
          },
        },
      ],
    });
  },
};
