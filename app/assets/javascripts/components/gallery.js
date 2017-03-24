
export default {
  name: 'Gallery',

  template: `
    <div>
        <div class="columns is-multiline">
            <div class="column" v-for="n in 9" v-on:click="openModal(n)"> 
                <figure class="image is-96x96">
                    <img src="http://bulma.io/images/placeholders/96x96.png">
                </figure>
            </div>
        </div>
    </div>
  `,

  props: [{
    name: 'urls',
    type: Object
  }],

  data: function() {
    return {
      showModal: true,
      'urls': {
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
      openModal(n) {
          alert('Set image for ' + n)
      }
  }

}
