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
      images1: require("@/assets/images/carStatus_01.png"),
      images2: require("@/assets/images/carStatus_02.png"),
      images3: require("@/assets/images/carStatus_03.png"),
      images4: require("@/assets/images/carStatus_04.png"),
      images5: require("@/assets/images/charging.png")
    };
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(
        `//webapi.amap.com/maps?v=${MapVersion}&key=${MapKey}&plugin=AMap.MarkerClusterer`
      );
      // await remoteLoad(`//a.amap.com/jsapi_demos/static/citys.js`);
      this.initMap();
    }
  },
  methods: {
    // 实例化地图
    initMap() {
      let mapConfig = {
        mapStyle: "amap://styles/5b64e5715c3330f0247483d96fcdbd1c",
        zoom: 4,
        resizeEnable: true,
        center: [105, 34]
      };
      let map = new AMap.Map("js-container", mapConfig);
      let labelText = new AMap.Text({
        map: map,
        text:'标记',
        textAlign:'center',
        zIndex: 230,
        offset: new AMap.Pixel(0, -60),
        style:{
            'padding': '.75rem 1.25rem',
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            'width': '15rem',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            'color': 'blue'
        }
      })
      labelText.hide()
      this.labelText = labelText
      this.markerClusterer(map);
    },
    markerClusterer(_map) {
      let resData = this.createPoints(_map.getCenter(), 100000);
      let cluster = null;
      _map.plugin(["AMap.MarkerClusterer"], () => {
        cluster = new AMap.MarkerClusterer(_map);
        cluster.setGridSize(100);
        // cluster.setMinClusterSize(5);
        cluster.addMarkers(this.getMarkers(resData));
      });
    },

    getMarkers(data) {
      let markers = data.map(item => {
        let { imageUrl, size } = this.getIconConf(item.groupId);
        let marker = new AMap.Marker({
          position: item.position,
          icon: new AMap.Icon({
            image: imageUrl,
            size: new AMap.Size(...size),
            imageSize: new AMap.Size(...size)
          }),
          offset: new AMap.Pixel(-size[0] / 2, -size[1] / 2),
          angle: 0
        });
        marker.setExtData({
          isCar: 'options.type == "car" ? true : false',
          content: "options.content",
          status: "options.status",
          id: "options.device_id",
          imgPath: imageUrl
        });
        let _this = this;
        marker.on("mouseover", function() {
          _this.labelText.setPosition(this.getPosition());
          _this.labelText.setText(this.getExtData().content);
          _this.labelText.show();
          // console.log(this.getPosition(), this.getExtData().content);
        });
        marker.on("mouseout", function() {
          _this.labelText.hide();
        });
        marker.on("click", function() {
          console.log(this.getExtData());
        });
        return marker;
      });
      setTimeout(() => {
        markers = null;
      }, 500);
      return markers;
    },

    getIconConf(type) {
      let imgConf = {
        imageUrl: this.images1,
        size: [36, 22]
      };
      switch (type) {
        case 0:
          imgConf.imageUrl = this.images1;
          break;
        case 1:
          imgConf.imageUrl = this.images2;
          break;
        case 2:
          imgConf.imageUrl = this.images3;
          break;
        case 3:
          imgConf.imageUrl = this.images4;
          break;
        case 4:
          imgConf.imageUrl = this.images5;
          imgConf.size = [28, 28];
          break;
      }
      return imgConf;
    },
    // this.createPoints(map.getCenter(), 100000);
    createPoints(center, num) {
      let data = [];
      for (let i = 0, len = num; i < len; i++) {
        data.push({
          position: [
            center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
            center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random()
          ],
          groupId: i % 5,
          title: `title-No-${i}`
        });
      }
      setTimeout(() => {
        data = null;
      }, 500);
      return data;
    }
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