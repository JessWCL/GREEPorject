<template>
  <gree-list>
    <div class="list-scroll">
      <gree-list-item 
        @click.native="DetailClick(index)"
        v-for="(item,index) in list" 
        :key="index"
        link 
        :title="item.name" 
      ></gree-list-item>
    </div>
  </gree-list>
</template>

<script>
import { mapState } from 'vuex';
import { List, Item } from 'gree-ui';

export default {
  components: {
    [List.name]: List,
    [Item.name]: Item
  },
  data() {
    return {
      list: [],
      standard: ''
    };
  },

  computed: {
    ...mapState({
      useerMessage: state => state.useerMessage,
      userid: state => state.dataObject.user_id
    })
  },
  watch: {
    useerMessage: {
      handler() {
        this.changeList(this.useerMessage);
      },
      immediate: true
    }
  },
  methods: {
    DataDetails() {
      this.$router.push({ name: 'DataDetails' });
    },
    changeList(msg) {
      this.list = [];
      Object.keys(msg).forEach(item => {
        let name;
        let value;
        switch (item) {
          case 'bmi':
            name = 'BMI';
            value = msg[item];
            break;
          case 'fat':
            name = 'Body Fat';
            value = msg[item];
            break;
          case 'weight':
            name = 'Weight';
            value = msg[item];
            break;
          case 'waterRate':
            name = 'Body Water';
            value = msg[item];
            break;
          // case 'bones':
          //   name = 'bones';
          //   value = msg[item];
          //   break;
          // case 'calories':
          //   name = 'calories';
          //   value = msg[item];
          //   break;
          // case 'fatRate':
          //   name = 'fatRate';
          //   value = msg[item];
          //   break;
          // case 'muscle':
          //   name = 'muscle';
          //   value = msg[item];
          //   break;
          // case 'muscleRate':
          //   name = 'muscleRate';
          //   value = msg[item];
          //   break;
          default:
            break;
        }
        const obj = {
          name:
            name === 'Weight'
              ? `${name}   ${value} kg`
              : `${name}   ${value} %`,
          value
        };
        obj.value ? this.list.push(obj) : '';
      });
    },
    DetailClick(id) {
      this.$router.push({ path: `/DataDetailsExtend/${id}` });
    }
  }
};
</script>
