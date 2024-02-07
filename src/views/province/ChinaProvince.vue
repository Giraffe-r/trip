<template>
    <div id="provinceChart" :style="{ background: `url(${require('../../assets/starfield.jpg')}) no-repeat center center / cover` }"
        style="width: 100%; height: 100%;"></div>
</template>
<script>

import * as echarts from "echarts";
import pinyin from 'pinyin';
export default {
    data() {
        return {
            provinceChart: null, // 实例化echarts
            province: null,
            points: [
                { name: "迪士尼", value: [121.66, 31.14] },
                { name: "外滩", value: [121.49, 31.23] },
                { name: "陆家嘴", value: [121.50, 31.24] },
                { name: "静安寺", value: [121.45, 31.22] },
                { name: "武康路", value: [121.44, 31.21] },
            ],
            tooltipAutoplay: null, // 提示框自动播放
            tooltipAutoplayIndex: 0, // 提示框自动播放index
        }
    },
    created() { },
    mounted() {
        this.province = this.$route.params.params
        const pinyinArray = pinyin(this.province, {
            style: pinyin.STYLE_NORMAL, // 使用普通风格的拼音，还有其他风格可选
        });
        // 将拼音数组转换成字符串
        this.province = pinyinArray.map(item => item[0]).join('');
        console.log(this.province)
        this.$nextTick(() => {
            this.initEcharts();
            this.provinceChart.on("mouseover", this.echartsMapMouseover);
            this.provinceChart.on("mouseout", this.echartsMapMouseout);
            this.echartsMapMouseout();
        })

    },
    methods: {
        //初始化图表
        initEcharts() {

            this.provinceChart = echarts.init(document.getElementById("provinceChart"));
            this.provinceChart.clear()
            const requirePath = 'echarts/map/json/province/' + this.province + '.json'
            const provinceMapData = require(`echarts/map/json/province/${this.province}.json`)
            echarts.registerMap(this.province, provinceMapData)
            // this.chart.on("click", this.echartsMapClick)
            // 配置省份地图
            const option = {
                // 背景色
                // backgroundColor: "black",
                tooltip: {
                    trigger: 'item'
                },
                // 配置项(组件)
                geo: {
                    map: this.province,
                    // 地图的长宽比例
                    aspectScale: 0.75,
                    // 图层
                    zoom: 1.1,
                    // 样式
                    itemStyle: {
                        // 标准
                        normal: {
                            // 地图区域的颜色
                            areaColor: {
                                type: "radial",
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                // 颜色的步骤
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#09132c",
                                    },
                                    {
                                        offset: 1,
                                        color: "#274d68",
                                    },
                                ],
                                // 延长作用域
                                globalCoord: true,
                            },
                            // 盒子的阴影
                            shadowColor: "rgb(248,251,246)",
                            // 偏移
                            // shadowOffsetX: 10,
                            // shadowOffsetY: 11,
                        },
                    },
                },
                series: [
                    // 配置地图相关的数据参数
                    {
                        type: "map",
                        label: {
                            normal: {
                                // 显示文字
                                show: true,
                                textStyle: {
                                    color: "#1DE9B6",
                                },
                            },
                            emphasis: {
                                textStyle: {
                                    color: "rgb(184,220,161)",
                                },
                            },
                        },
                        // 图层
                        zoom: 1.1,
                        map: this.province,
                        itemStyle: {
                            normal: {
                                // 背景色
                                backgroundColor: "rgb(147,235,248)",
                                // 边框
                                borderWidth: 1,
                                // 区域颜色
                                areaColor: {
                                    type: "radial",
                                    x: 0.5,
                                    y: 0.5,
                                    // 文档
                                    r: 0.8,
                                    colorStops: [
                                        { offset: 0, color: "rgb(78,112,175)" },
                                        // { offset: 1, color: "rgb(129,151,198)" },
                                    ],
                                    // 全局生效
                                    globalCoord: true,
                                },
                            },
                            // 高亮效果
                            emphasis: {
                                areaColor: "rgb(46,229,206)",
                                borderWidth: 0.1,
                            },
                        }
                    },

                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        showEffectOn: "render",
                        zlevel: 1,
                        rippleEffect: {
                            period: 8,
                            scale: 4,
                            brushType: "fill",
                        },
                        selectedMode: false,
                        tooltip: {
                            trigger: "item",
                            backgroundColor: "rgba(0,0,0,0.4)", // 提示框浮层的背景颜色。
                            axisPointer: {
                                // 坐标轴指示器配置项。
                                type: "shadow", // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
                                axis: "auto", // 指示器的坐标轴。
                                snap: true, // 坐标轴指示器是否自动吸附到点上
                            },
                            textStyle: {
                                // 提示框浮层的文本样式。
                                color: "#41feff",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontFamily: "sans-serif",
                                fontSize: 20,
                            },
                            padding: 0, // 提示框浮层内边距，
                            formatter: function (params) {
                                let showname = params;
                                var ret = "";
                                // console.log("district:" + district);
                                try {
                                    ret = `
                          <div style='width:350px;height:300px;'>
                              <img style='width:100%;height:250px;' src="${require("@/assets/2.jpg")}"/>
                              <p  style="width:100%;height:50px; background: linear-gradient(#2caaab, #136692);  text-align: center;line-height: 50px;">${showname.data.name
                                        }</p>
                        </div>
                        `;
                                    console.log("图片存在");
                                } catch {

                                    ret = `
                          <div style='width:350px;height:300px;'>
                              <p  style="width:100%;height:50px; background: linear-gradient(#2caaab, #136692);  text-align: center;line-height: 50px;">${showname.data.name}</p>
                        </div>
                        `;
                                    console.log("图片不存在");
                                }
                                return ret;
                            },
                            // position: ['70%', '20%']
                        },
                        itemStyle: {
                            normal: {
                                color: "#1DE9B6",
                                shadowBlur: 10,
                                shadowColor: "#000",
                            },
                        },
                        data: this.points,
                        zoom: 1.5,
                        map: "SH", //使用
                    },
                ],
            }

            this.provinceChart.setOption(option);
        },

        // 地图点击
        echartsMapClick(params) {
            console.log("params:", params);
        },
        // 地图鼠标移入事件
        echartsMapMouseover() {
            clearInterval(this.tooltipAutoplay);
            this.provinceChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: this.tooltipAutoplayIndex,
            });
        },
        // 地图鼠标移出事件
        echartsMapMouseout() {
            this.setTooltipAutoplay();
        },

        // 动态显示tooltip
        setTooltipAutoplay() {
            clearInterval(this.tooltipAutoplay);
            this.tooltipAutoplay = setInterval(() => {
                this.provinceChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 1,
                    dataIndex: this.tooltipAutoplayIndex,
                });
                this.provinceChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 1,
                    dataIndex: this.tooltipAutoplayIndex,
                });
                this.provinceChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 1,
                    dataIndex: this.tooltipAutoplayIndex,
                });
                this.tooltipAutoplayIndex++;
                if (this.tooltipAutoplayIndex >= this.points.length) {
                    this.tooltipAutoplayIndex = 0;
                    this.setTooltipAutoplay();
                }
            }, 2000);
        },

    }

}
</script>