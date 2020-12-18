<template>
  <div class="container">
    <div v-for="(item, index) in commoditySpecs" :key="index">
      <h3 class="title">{{ item.title }}</h3>
      <ul>
        <span
          v-for="(value, i) in item.list"
          :key="i"
          class="option"
          :class="{ disable: optionSpecs.indexOf(value) === -1, active: specsS.indexOf(value) > -1 }"
          @click="handleClick(optionSpecs.indexOf(value) > -1, value, index)"
          v-text="value"
        />
      </ul>
    </div>
  </div>
</template>

<script>
class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }

  init() {
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity });
  }

  getVertexRow(id) {
    const index = this.vertex.indexOf(id);
    const col = [];
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex]);
    });
    return col;
  }

  getAdjoinVertex(id) {
    return this.getVertexRow(id)
      .map((item, index) => (item ? this.vertex[index] : ''))
      .filter(Boolean);
  }

  setAdjoinVertex(id, sides) {
    const pIndex = this.vertex.indexOf(id);
    sides.forEach(item => {
      const index = this.vertex.indexOf(item);
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }

  getRowTotal(params) {
    params = params.map(id => this.getVertexRow(id));
    const adjoinNames = [];
    this.vertex.forEach((item, index) => {
      const rowtotal = params
        .map(value => value[index])
        .reduce((total, current) => {
          total += current || 0;
          return total;
        }, 0);
      adjoinNames.push(rowtotal);
    });
    return adjoinNames;
  }

  // 交集
  getUnions(params) {
    const row = this.getRowTotal(params);
    return row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
  }

  // 并集
  getCollection(params) {
    params = this.getRowTotal(params);
    return params.map((item, index) => item && this.vertex[index]).filter(Boolean);
  }
}

class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    super(commoditySpecs.reduce((total, current) => [...total, ...current.list], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
  }

  initCommodity() {
    this.data.forEach(item => {
      this.applyCommodity(item.specs);
    });
  }

  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach(item => {
      const params = [];
      item.list.forEach(value => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertex);
    }
    return params;
  }

  applyCommodity(params) {
    params.forEach(param => {
      this.setAdjoinVertex(param, params);
    });
  }
}

export default {
  data() {
    return {
      data: [
        { specs: ['自动', '自动风', '上下扫风', '左右扫风', '健康', '灯光', '新风'] },
        { specs: ['自动', '低档'] },
        { specs: ['自动', '低中档'] },
        { specs: ['自动', '中档'] },
        { specs: ['自动', '中高档'] },
        { specs: ['自动', '高档'] },
        {
          specs: [
            '制冷',
            '自动风',
            '上下扫风',
            '左右扫风',
            '强劲',
            'H静音',
            '健康',
            '灯光',
            '睡眠',
            '新风',
            '风随',
            '风避',
            '无人节能'
          ]
        },
        { specs: ['制冷', '低档'] },
        { specs: ['制冷', '低中档'] },
        { specs: ['制冷', '中档'] },
        { specs: ['制冷', '中高档'] },
        { specs: ['制冷', '高档'] },
        { specs: ['制冷', '超强'] },
        { specs: ['制冷', '静音'] },
        {
          specs: [
            '制热',
            '自动风',
            '上下扫风',
            '左右扫风',
            '强劲',
            'H静音',
            '健康',
            '灯光',
            '睡眠',
            '新风',
            '风随',
            '风避',
            '无人节能'
          ]
        },
        { specs: ['制热', '低档'] },
        { specs: ['制热', '低中档'] },
        { specs: ['制热', '中档'] },
        { specs: ['制热', '中高档'] },
        { specs: ['制热', '高档'] },
        { specs: ['制热', '超强'] },
        { specs: ['制热', '静音'] },
        { specs: ['送风', '自动风', '上下扫风', '左右扫风', '健康', '灯光', '新风'] },
        { specs: ['送风', '低档'] },
        { specs: ['送风', '低中档'] },
        { specs: ['送风', '中档'] },
        { specs: ['送风', '中高档'] },
        { specs: ['送风', '高档'] },
        { specs: ['除湿', '低档', '上下扫风', '左右扫风', '健康', '灯光', '新风'] }
      ],
      commoditySpecs: [
        { title: '模式', list: ['自动', '制冷', '制热', '送风', '除湿'] },
        { title: '风档', list: ['自动风', '低档', '低中档', '中档', '中高档', '高档', '超强', '静音'] },
        {
          title: '高级',
          list: ['上下扫风', '左右扫风', '强劲', 'H静音', '健康', '灯光', '睡眠', '新风', '风随', '风避', '无人节能']
        }
      ],
      specsS: null,
      shopAdjoin: null,
      optionSpecs: null
    };
  },
  watch: {
    specsS() {
      this.optionSpecs = this.shopAdjoin.querySpecsOptions(this.specsS);
      console.log(this.optionSpecs);
    }
  },
  created() {
    this.specsS = Array.from({ length: this.commoditySpecs.length });
    // 创建一个购物矩阵
    this.shopAdjoin = new ShopAdjoin(this.commoditySpecs, this.data);
    // 获得可选项表
    this.optionSpecs = this.shopAdjoin.querySpecsOptions(this.specsS);
  },
  methods: {
    handleClick(bool, text, index) {
      if (this.specsS[index] !== text && !bool) return;
      this.$set(this.specsS, index, this.specsS[index] === text ? '' : text);
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 29px;
  background-color: #fff;
}

.title {
  font-size: 46px;
}

.option {
  display: inline-block;
  margin: 14px;
  padding: 29px 40px;
  background-color: #f5f5f5;
  border-radius: 14px;
  color: #555;
  font-size: 30px;
  border: 1px solid #f5f5f5;
}

.disable {
  color: #cfcfcf;
}

.active {
  border-color: #00aeff;
  color: #00aeff;
  background-color: #fff5f7;
}
</style>
