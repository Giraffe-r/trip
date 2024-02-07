<template>
    <div id="chart" :style="{ background: `url(${require('../../assets/starfield.jpg')}) no-repeat center center / cover` }"
        style="width: 100%; height: 100%;"></div>
</template>
<script>

import geoJson from "echarts/map/json/china";
// import echarts from 'echarts';
import * as echarts from "echarts";
export default {
    data() {
        return {
            chart: null, // 实例化echarts
            points: [
                { name: "上海", value: [121.47, 31.23] },
                { name: "福建", value: [119.30, 26.10] },
                { name: "江苏", value: [118.76, 32.06] },
                { name: "浙江", value: [120.15, 30.27] }
            ],
        }
    },
    created() { },
    mounted() {
        this.$nextTick(() => {
            this.initEcharts();
        })

    },
    methods: {
        //初始化图表
        initEcharts() {
            this.chart = echarts.init(document.getElementById("chart"));
            echarts.registerMap("china", geoJson);
            // this.chart.on("click", this.echartsMapClick);
            const option = {
                // 背景色
                // backgroundColor: "black",
                // background:"../../assets/star.jpg",
                // ...
                // 配置项(组件)
                geo: {
                    map: "china",
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
                                // globalCoord: true,
                            },
                            // 盒子的阴影
                            shadowColor: "rgb(248,251,246)",
                            // 偏移
                            // shadowOffsetX: 10,
                            // shadowOffsetY: 11,
                        },
                    },
                    region: [
                        {
                            name: "南海诸岛",
                            itemStyle: {
                                opacity: 0,
                            },
                        },
                    ],
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
                        map: "china",
                        data: this.points.map(point => {
                            if (["上海", "福建", "江苏", "浙江"].includes(point.name)) {
                                return {
                                    name: point.name,
                                    value: point.value,
                                    itemStyle: {
                                        normal: {
                                            areaColor: "rgb(100,229,200)"
                                        }
                                    }
                                };
                            } else {
                                return point;
                            }
                        }),

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
                                    // globalCoord: true,
                                },
                            },
                            // 高亮效果
                            emphasis: {
                                areaColor: "rgb(46,229,206)",
                                borderWidth: 0.1,
                            },
                        },
                    },
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        showEffectOn: "render",
                        // zlevel: 1,
                        rippleEffect: {
                            period: 8,
                            scale: 4,
                            brushType: "fill",
                        },
                        selectedMode: false,
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

            this.chart.setOption(option);
            // 监听地图点击事件
            this.chart.on('click', this.echartsMapClick)
            // this.chart.on('click', this.handleMapSelectChanged)
        },

        // 地图点击
        echartsMapClick(params) {
            this.$router.push({ name: 'province', params: { params: params.name } })
        },

        handleMapSelectChanged(params) {
            console.log(params);
            // 在这里加载省份地图
            const provinceName = params.name // 获取点击的省份名称
            // 根据省份名称加载相应的省份地图数据
            const provinceMapData = require(`echarts/map/js/province/${provinceName}.js`)
            echarts.registerMap(provinceName, provinceMapData)

            // 配置省份地图
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                series: [
                    {
                        name: provinceName,
                        type: 'map',
                        mapType: provinceName,
                        roam: true,
                        label: {
                            show: true
                        },
                        // 添加省份地图数据
                    }
                ]
            }

            this.chart.setOption(option)
        }
    }

}
</script>