export default {
  name: 'ImgGrid',

  template: `
    <div class="grid clearfix">
      <div v-for="n in 9">
        <a v-on:click="openvModal(n)">
          <span v-if="urls[n] === null">+</span>
          <img v-bind:src="urls[n]" alt="" v-else>
        </a>
      </div>
    </div>
  `,

  props: [{
    name: 'urls',
    type: Object
  }],

  data: function() {
    return {
      urls: {
        'img_1': null,
        'img_2': null,
        'img_3': null,
        'img_4': null,
        'img_5': null,
        'img_6': null,
        'img_7': null,
        'img_8': null,
        'img_9': null
      }
    }
  },

  methods: {
    // modal for input url for nth image
    openModal(n) {
      
    }
  }
}
