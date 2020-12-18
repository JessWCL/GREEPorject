import { isIOS } from '@/utils';
import { activityGetAwardMapping } from '../../../../static/lib/PluginInterface.promise';

const homeConfig = {
  data() {
    return {
      // 奖品列表
      prize_list: []
    };
  },
  created() {
    activityGetAwardMapping()
      .then(res => {
        console.log(`GetAwardMapping: ${res}`);
        let resInfo;
        if (isIOS) {
          try {
            resInfo = res.match(/msg":"(\S*)/)[1];
            resInfo = resInfo.substr(0, resInfo.length - 2);
            resInfo = JSON.parse(resInfo);
            console.log(resInfo);
          } catch (e) {
            console.log('GetAwardMapping Parse Data Error');
          }
        } else {
          resInfo = eval('(' + JSON.parse(res)['msg'] + ')');
        }
        this.prize_list = resInfo.awardList;
      })
      .catch(err => {
        err;
      });
  }
};

export default homeConfig;
