import { mapMutations } from 'vuex';
import { SET_ALL_HELPDOC_ITEMS, SET_TOP_HELPDOC_ITEMS} from '../../store/types';

export default {
  methods: {
    ...mapMutations({
      setAllHelpDocItems: SET_ALL_HELPDOC_ITEMS,
      setTopHelpDocItems: SET_TOP_HELPDOC_ITEMS,
    }),
  }
};
