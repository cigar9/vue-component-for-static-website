
var myTab = Vue.extend({
  template: `
    <div class="p-tab-content">
      <ul class="p-tab-menu">
        <li @click="show(1)">メニュー1</li>
        <li @click="show(2)">メニュー2</li>
        <li @click="show(3)">メニュー3</li>
      </ul>
      <div class="p-tab-body">
        <transition name="my-tab">
          <section v-if="active(1)" :key="1">
            <h2>タブ1のタイトル</h2>
            <p>タブ1のコンテンツ。</p>
          </section>
          <section v-if="active(2)" :key="2">
            <h2>タブ2のタイトル</h2>
            <p>タブ2のコンテンツ。</p>
          </section>
          <section v-if="active(3)" :key="3">
            <h2>タブ3のタイトル</h2>
            <p>タブ3のコンテンツ。</p>
          </section>
        </transition>
      </div>
    </div>
  `,
  data () {
    return {
      current: 1,
      list: [{
        id: 1,
        label: 'menu1',
        content: 'コンテンツその1'
      }, {
        id: 2,
        label: 'menu2',
        content: 'コンテンツその2'
      }, {
        id: 3,
        label: 'menu3',
        content: 'コンテンツその3'
      }]
    }
  },
  methods: {
    active: function (id) {
      return this.current === id
    },
    show: function (id) {
      this.current = id
    }
  }
})
Vue.component('my-tab', myTab);