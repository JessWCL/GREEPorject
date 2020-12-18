// 专业烘烤
// 模式顺序对应ProfessionalBaking.vue中swiper的顺序

const tempConfig = [
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 170 }, // 3D热风
  { tempMin: 190, tempMax: 230, defaultIndex: 0, defaultTemp: 210 }, // 烧烤小面积
  { tempMin: 190, tempMax: 230, defaultIndex: 0, defaultTemp: 210 }, // 烧烤大面积
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 180 }, // 热风烧烤
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 145 }, // 上下加热
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 150 }, // 底部加热
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 200 }, // 背底加热
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 160 }, // 节能热风
  { tempMin: 40, tempMax: 230, defaultIndex: 0, defaultTemp: 170 } // 节能上下加热
];

const tempData = [];

for (let i = 0; i < tempConfig.length; i += 1) {
  const arr = [];
  // 烧烤小面积 || 烧烤大面积
  if (i === 1 || i === 2) {
    arr.push({ text: '高', value: 230 });
    arr.push({ text: '中', value: 210 });
    arr.push({ text: '低', value: 190 });
  } else {
    for (let min = tempConfig[i].tempMin; min <= tempConfig[i].tempMax; min += 1) {
      arr.push({
        text: `${min}`,
        value: min
      });
    }
  }
  tempData.push([arr]);
}

export { tempConfig, tempData };
