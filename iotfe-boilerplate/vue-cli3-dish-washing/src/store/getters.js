const getters = {

  hasLighting(state) {
    return (state.DataObject.MidType << 8) > 0;
  }

};

export default getters;
