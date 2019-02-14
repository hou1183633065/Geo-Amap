<template>
  <div class="m-map">
    <div id="js-container" class="map"></div>
  </div>
</template>

<script>
import AmapInitMixins from "@/mixins/AmapInit.mixins";
import { MapCityName } from "@/config/config";
export default {
  mixins: [AmapInitMixins],
  data() {
    return {
      images1: require("@/assets/images/carStatus_01.png"),
      images2: require("@/assets/images/carStatus_02.png"),
      images3: require("@/assets/images/carStatus_03.png"),
      images4: require("@/assets/images/carStatus_04.png"),
      images5: require("@/assets/images/charging.png")
    };
  },
  methods: {
    // 实例化地图
    initMap() {
      // 加载PointSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(
        ["geo/DistrictCluster", "misc/PointSimplifier"],
        (DistrictCluster, PointSimplifier) => {
          let mapConfig = {
            zoom: 1,
            mapStyle: "amap://styles/5b64e5715c3330f0247483d96fcdbd1c",
            center: [116.397428, 39.90923] //中心点坐标
          };
          let map = new AMap.Map("js-container", mapConfig);
          this.initPage(DistrictCluster, PointSimplifier, map);
        }
      );
    },
    initPage(DistrictCluster, PointSimplifier, map) {
      let groupStyleMap = {
        "0": {
          pointStyle: {
            //绘制点占据的矩形区域
            content: PointSimplifier.Render.Canvas.getImageContent(
              this.images1
            ),
            //宽度
            width: 36,
            //高度
            height: 21,
            //定位点为中心
            offset: ["-50%", "-50%"],
            fillStyle: null
            //strokeStyle: null
          }
        },
        "1": {
          pointStyle: {
            //绘制点占据的矩形区域
            content: PointSimplifier.Render.Canvas.getImageContent(
              this.images2
            ),
            //宽度
            width: 36,
            //高度
            height: 21,
            //定位点为中心
            offset: ["-50%", "-50%"],
            fillStyle: null
            // strokeStyle: null
          }
        },
        "2": {
          pointStyle: {
            //绘制点占据的矩形区域
            content: PointSimplifier.Render.Canvas.getImageContent(
              this.images3
            ),
            //宽度
            width: 36,
            //高度
            height: 21,
            //定位点为中心
            offset: ["-50%", "-50%"],
            fillStyle: null
            //strokeStyle: null
          }
        },
        "3": {
          pointStyle: {
            //绘制点占据的矩形区域
            content: PointSimplifier.Render.Canvas.getImageContent(
              this.images4
            ),
            //宽度
            width: 36,
            //高度
            height: 21,
            //定位点为中心
            offset: ["-50%", "-50%"],
            fillStyle: null
            //strokeStyle: null
          }
        },
        "4": {
          pointStyle: {
            //绘制点占据的矩形区域
            content: PointSimplifier.Render.Canvas.getImageContent(
              this.images5
            ),
            //宽度
            width: 30,
            //高度
            height: 30,
            //定位点为中心
            offset: ["-50%", "-50%"],
            fillStyle: null
            //strokeStyle: null
          }
        }
      };
      let pointSimplifierIns = new PointSimplifier({
        map: map, //关联的map
        // autoSetFitView: false, //禁止自动更新地图视野
        zIndex: 110,
        // compareDataItem: function(a, b, aIndex, bIndex) {
        //   //数据源中靠后的元素优先，index大的排到前面去
        //   return aIndex > bIndex ? -1 : 1;
        // },
        getPosition: item => {
          if (!item) {
            return null;
          }

          //返回经纬度
          return [parseFloat(item.position[0]), parseFloat(item.position[1])];
        },
        getHoverTitle: (dataItem, idx) => {
          //返回数据项的Title信息，鼠标hover时显示
          return `${dataItem.groupId}-${idx}:${dataItem.title}`;
        },
        renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
        renderOptions: {
          hoverTitleStyle: {
            classNames: "my-hover-title",
            offset: [0, -15],
            position: "top"
          },
          getGroupId: (item, idx) => {
            //按纬度区间分组
            return item.groupId;
          },
          groupStyleOptions: gid => {
            return groupStyleMap[gid];
          }
        }
      });

      let distCluster = new DistrictCluster({
        zIndex: 100,
        map: map, //所属的地图实例
        renderOptions: {
          featureStyle: {
            fillStyle: null, //填充色
            lineWidth: 0, //描边线宽
            strokeStyle: null //描边色
          },
          getFeatureStyle() {
            return {
              fillStyle: null
            };
          }
        },
        getPosition: function(item) {
          if (!item) {
            return null;
          }

          //返回经纬度
          return [parseFloat(item.position[0]), parseFloat(item.position[1])];
        }
      });

      function refresh() {
        var zoom = map.getZoom();

        //获取 pointStyle
        // var pointStyle = pointSimplifierIns.getRenderOptions().pointStyle;

        //根据当前zoom调整点的尺寸
        // pointStyle.width = pointStyle.height = 2 * Math.pow(1.2, map.getZoom() - 3);

        var zoom = map.getZoom();
        // if (zoom < 10) {
        //   distCluster.show();
        //   pointSimplifierIns.hide();
        // } else {
        //   distCluster.hide();
        //   pointSimplifierIns.show();
        // }
      }
      map.on("zoomend", function() {
        refresh();
      });
      refresh();
      //随机创建一批点，仅作示意
      let data = this.createPoints(map.getCenter(), 100000);

      //设置数据源，data需要是一个数组
      distCluster.setData(data);
      pointSimplifierIns.setData(data);

      //监听事件
      pointSimplifierIns.on("pointClick", function(
        e,
        record
      ) {
        console.log(e.type, record);
      });
    },
    createPoints(center, num) {
      var data = [];
      for (var i = 0, len = num; i < len; i++) {
        data.push({
          position: [
            center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
            center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random()
          ],
          groupId: i % 5,
          title: `title-No-${i}`
        });
      }
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
.amap-ui-pointsimplifier-container .overlay-title.my-hover-title{
  border-radius: 5px;
  background: #ccc;
  color: red;
}
</style>