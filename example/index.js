import { Swipe as vueSwipe, SwipeItem as vueSwipeItem } from '../src';

// const vueSwipe = VueSwipe.Swipe;
// const vueSwipeItem = VueSwipe.SwipeItem;

new Vue({
  el: 'body',
  components: {
    'swipe': vueSwipe,
    'swipe-item': vueSwipeItem
  },
  data() {
    return {
      datas: [
        {
          name: '1'
        },{
          name: '22'
        },{
          name: '333'
        }
      ]
    }
  }
})
