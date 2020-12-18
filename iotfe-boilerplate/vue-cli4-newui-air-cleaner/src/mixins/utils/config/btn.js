import { mapState } from 'vuex';

const btnConfig = {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
    }),
    
    footList(){
      return [
      {
        isScenesShow: true,
        Name: 'home.power',
        ImgName: 'btn_on'
      },
      {
        isScenesShow: true,
        Name: 'home.function',
        ImgName: 'btn_function'
      }
      {
        isScenesShow: true,
        Name: 'home.power',
        ImgName: 'btn_on'
      },
      {
        isScenesShow: true,
        Name: 'home.function',
        ImgName: 'btn_function'
      }
    ]
  }
}
};
export default btnConfig;
