<template>
  <div class="m-map">
    <div id="js-container" class="map"></div>
  </div>
</template>

<script>
import remoteLoad from "@/utils/remoteLoad.js";
import { MapKey, MapVersion, PluginVersion } from "@/config/config";
export default {
  data() {
    return {
      resData: null,
      images1: require("@/assets/images/carStatus_01.png"),
      images2: require("@/assets/images/carStatus_02.png")
    };
  },
  async created() {
    this.getPointArr();
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(
        `//webapi.amap.com/maps?v=${MapVersion}&key=${MapKey}&plugin=AMap.CircleEditor`
      );
      // await remoteLoad(`//a.amap.com/jsapi_demos/static/citys.js`);
      this.initMap();
    }
  },
  beforeDestroy() {},
  methods: {
    // 实例化地图
    initMap() {
      let mapConfig = new AMap.Map("js-container", {
        // mapStyle: "amap://styles/5b64e5715c3330f0247483d96fcdbd1c",
        zoom: 5,
        resizeEnable: true,
        center: [105, 34]
      });
      mapConfig.on("complete", () => {
        // 地图图块加载完成后触发
        if (!this.resData) {
          return false;
        }
        this.drawRectangle(mapConfig);
        // this.drawCircle(mapConfig);
      });
      // 地图图块加载完成后触发
      // this.setTextLabel()
      // this.markerClusterer();
    },
    drawRectangle(_map) {
      let southWest = new AMap.LngLat(116.356449, 39.859008)

      let northEast = new AMap.LngLat(116.417901, 39.893797)

      let bounds = new AMap.Bounds(southWest, northEast)
      let rectangle = new AMap.Rectangle({
        bounds: bounds,
        strokeColor:'red',
        strokeWeight: 6,
        strokeOpacity:0.5,
        strokeDasharray: [30,10],
        // strokeStyle还支持 solid
        strokeStyle: 'dashed',
        fillColor:'blue',
        fillOpacity:0.5,
        cursor:'pointer',
        zIndex:50,
      });
      rectangle.setMap(_map);
      // 缩放地图到合适的视野级别
      _map.setFitView([rectangle]);
    },
    drawCircle(_map) {
      let circle = new AMap.Circle({
        center: [116.433322, 39.900255],
        radius: 1000, //半径
        borderWeight: 3,
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: "dashed",
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: "#1791fc",
        zIndex: 50
      });
      circle.setMap(_map);
      // 缩放地图到合适的视野级别
      _map.setFitView([circle]);
    },
    getPointArr() {
      let pointArr = [
        [116.478935, 39.997761],
        [116.478939, 39.997825],
        [116.478912, 39.998549],
        [116.478912, 39.998549],
        [116.478998, 39.998555],
        [116.478998, 39.998555],
        [116.479282, 39.99856],
        [116.479658, 39.998528],
        [116.480151, 39.998453],
        [116.480784, 39.998302],
        [116.480784, 39.998302],
        [116.481149, 39.998184],
        [116.481573, 39.997997],
        [116.481863, 39.997846],
        [116.482072, 39.997718],
        [116.482362, 39.997718],
        [116.483633, 39.998935],
        [116.48367, 39.998968],
        [116.484648, 39.999861]
      ];
      this.resData = pointArr;
    }
    // setTextLabel() {
    //   let labelText = new AMap.Text({
    //     map: this.markerMap,
    //     text: "标记",
    //     textAlign: "center",
    //     zIndex: 230,
    //     offset: new AMap.Pixel(0, -60),
    //     style: {
    //       padding: ".75rem 1.25rem",
    //       "margin-bottom": "1rem",
    //       "border-radius": ".25rem",
    //       "background-color": "white",
    //       width: "15rem",
    //       "border-width": 0,
    //       "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
    //       "text-align": "center",
    //       "font-size": "20px",
    //       color: "blue"
    //     }
    //   });
    //   labelText.hide();
    //   this.labelText = labelText;
    // },
    // markerClusterer() {
    //   let resData = this.createPoints(this.markerMap.getCenter(), 100000);
    //   let _markers = this.getMarkers(resData);

    //   this.markerMap.plugin(["AMap.MarkerClusterer"], () => {
    //     let cluster = new AMap.MarkerClusterer(this.markerMap);
    //     cluster.setGridSize(100);
    //     // cluster.setMinClusterSize(5);
    //     cluster.addMarkers(_markers);
    //   });
    // },

    // getMarkers(data) {
    //   let markers = data.map(item => {
    //     let { imageUrl, size } = this.getIconConf(item.groupId);
    //     let marker = new AMap.Marker({
    //       position: item.position,
    //       icon: new AMap.Icon({
    //         image: imageUrl,
    //         size: new AMap.Size(...size),
    //         imageSize: new AMap.Size(...size)
    //       }),
    //       offset: new AMap.Pixel(-size[0] / 2, -size[1] / 2),
    //       angle: 0
    //     });
    //     marker.setExtData({
    //       isCar: 'options.type == "car" ? true : false',
    //       content: "options.content",
    //       status: "options.status",
    //       id: "options.device_id",
    //       imgPath: imageUrl
    //     });
    //     let _this = this;
    //     marker.on("mouseover", function() {
    //       _this.labelText.setPosition(this.getPosition());
    //       _this.labelText.setText(this.getExtData().content);
    //       _this.labelText.show();
    //       // console.log(this.getPosition(), this.getExtData().content);
    //     });
    //     marker.on("mouseout", function() {
    //       _this.labelText.hide();
    //     });
    //     marker.on("click", function() {
    //       console.log(this.getExtData());
    //     });
    //     return marker;
    //   });
    //   setTimeout(() => {
    //     markers = null;
    //   }, 200);
    //   return markers;
    // },

    // getIconConf(type) {
    //   let imgConf = {
    //     imageUrl: this.images1,
    //     size: [36, 22]
    //   };
    //   switch (type) {
    //     case 0:
    //       imgConf.imageUrl = this.images1;
    //       break;
    //     case 1:
    //       imgConf.imageUrl = this.images2;
    //       break;
    //     case 2:
    //       imgConf.imageUrl = this.images3;
    //       break;
    //     case 3:
    //       imgConf.imageUrl = this.images4;
    //       break;
    //     case 4:
    //       imgConf.imageUrl = this.images5;
    //       imgConf.size = [28, 28];
    //       break;
    //   }
    //   return imgConf;
    // },
    // this.createPoints(map.getCenter(), 100000);
    // createPoints(center, num) {
    //   let data = [];
    //   for (let i = 0, len = num; i < len; i++) {
    //     data.push({
    //       position: [
    //         center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
    //         center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random()
    //       ],
    //       groupId: i % 5,
    //       title: `title-No-${i}`
    //     });
    //   }
    //   setTimeout(() => {
    //     data = null;
    //   }, 200);
    //   return data;
    // }
  }
};
</script>

<style lang="css">
.m-map {
  width: 100%;
  height: 100%;
  position: relative;
}
.m-map .map {
  width: 100%;
  height: 100%;
}
.m-map .search {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 180px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 5px;
  outline: none;
}
.m-map .search button {
  line-height: 26px;
  background: #fff;
  border: 1px solid #ccc;
  width: 50px;
  text-align: center;
}
.m-map .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
.amap-ui-pointsimplifier-container .overlay-title.my-hover-title {
  border-radius: 5px;
  background: #ccc;
  color: red;
}
</style>