

const TEST_DATA = [];

for (let index = 0; index < 3; index += 1) {
  const data = {
    id: '10000',
    picture: 'https://www.example.com/img.png',
    copies: 1,
    dishname: '测试 - 烤鸡翅',
    ingredients: {
      main: [
        {
          ingredName: '测试 - 0.5茶匙',
          num: 0.5,
          unit: '茶匙'
        },
        {
          ingredName: '测试 - 0.25茶匙',
          num: 0.25,
          unit: '茶匙'
        },
        {
          ingredName: '测试 - 0适量',
          num: 0,
          unit: '适量'
        },
      ],
      auxiliary: [
        {
          ingredName: '测试 - 奥尔良粉',
          num: 20,
          unit: 'g',
        },
        {
          ingredName: '测试 - 奥尔良粉',
          num: 20,
          unit: 'g',
        },
        {
          ingredName: '测试 - 奥尔良粉',
          num: 20,
          unit: 'g',
        },
      ]
    }
  };
  data.id += index;
  TEST_DATA.push(data);
}

export { TEST_DATA };
