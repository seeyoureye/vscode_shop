import {
  mapGetters
} from "vuex";

export default {
  onShow() {
    this.setTabBar();
  },
  methods: {
    setTabBar() {
      let newv = this.getCartCount;
      let str = newv + "";
      let obj = {index: 2};
      if (str) obj.text = str;
      uni.setTabBarBadge(obj);
    }
  },

  computed: {
    ...mapGetters("shopCart", ["getCartCount"]),
  },

}