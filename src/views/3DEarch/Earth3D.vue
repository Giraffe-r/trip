
<template>
    <div id="main"></div>
</template>
<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
    // mounted() {

    //     var ROOT_PATH = 'https://echarts.apache.org/examples';

    //     var chartDom = document.getElementById('main');
    //     var myChart = echarts.init(chartDom);
    //     var option;

    //     option = {
    //         backgroundColor: '#000',
    //         globe: {
    //             baseTexture: '/src/assets/world.topo.bathy.200401.jpg',
    //             heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
    //             displacementScale: 0.04,
    //             shading: 'realistic',
    //             environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
    //             realisticMaterial: {
    //                 roughness: 0.9
    //             },
    //             postEffect: {
    //                 enable: true
    //             },
    //             light: {
    //                 main: {
    //                     intensity: 5,
    //                     shadow: true
    //                 },
    //                 ambientCubemap: {
    //                     texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
    //                     diffuseIntensity: 0.2
    //                 }
    //             }
    //         }
    //     };

    //     option && myChart.setOption(option);
    // }
}
</script>