import {
  mapGetters
} from "vuex";

export default {
  data(){
    return {
      num:0
    }
  },
  created() {
    this.num = this.getCartCount;
    this.setTabBar();
  },
  methods: {
    setTabBar() {
      let str = this.num + "";
      let obj = {index: 2};
      if (str) obj.text = str;
      uni.setTabBarBadge(obj);
    }
  },
  watch: {
    "getCartCount_2"(nowv,oldv){
      this.num = nowv
      this.setTabBar()
    }
  },
  computed: {
    ...mapGetters("shopCart", ["getCartCount","getCartCount_2"]),
  },

}