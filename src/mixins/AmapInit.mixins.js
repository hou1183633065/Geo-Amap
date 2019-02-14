
import remoteLoad from "@/utils/remoteLoad.js";
import {
  MapKey,
  MapVersion,
  PluginVersion
} from "@/config/config";

const AmapInitMixins = {
  data() {
    return {
      AMapUI: null,
      AMap: null
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(
        `//webapi.amap.com/maps?v=${MapVersion}&key=${MapKey}`
      );
      await remoteLoad(
        `//webapi.amap.com/ui/1.0/main.js?v=${PluginVersion}`
      );
      this.initMap();
    }
  },
  methods: {

  }
}

export default AmapInitMixins