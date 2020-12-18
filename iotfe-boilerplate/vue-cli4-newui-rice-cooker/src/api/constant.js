// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';

// 30x61C 精煮饭 13456  五个阶段
// 30x61C 糙米   123456 六个阶段
// 30x61C 快煮饭 13456  五个阶段
// 30x61C 锅巴饭 123456 六个阶段
export const RC_MID_TYPE_30X61C = 257; // 电控煮饭阶段 1~6 不同模式有不同阶段 (>5显示`时间`，<=5显示`烹饪中`)
export const RC_MID_TYPE_30X66C = 17921; // 电控煮饭阶段只发 0 6 (>5显示`时间`，<=5显示`烹饪中`)
export const RC_MID_TYPE_30X88C = 17921; // 电控煮饭阶段只发 0 6 (>5显示`时间`，<=5显示`烹饪中`)
export const RC_MID_TYPE_40X65C = 26116; // 电控煮饭阶段只发 0 6 (>5显示`时间`，<=5显示`烹饪中`)
export const RC_MID_TYPE_4009C = 26116; // 电控煮饭阶段只发 0 6 (>5显示`时间`，<=5显示`烹饪中`)
// 26368是整机的校验码传过来，并不是细分码
export const RC_MID_TYPE_2008C = 26368; // 电控煮饭阶段 0~4 五个阶段 (等于4显示`时间`)

export const MID_828409 = '828409';
export const MID_828402 = '828402';

// 显示时间的煮饭阶段
export const COOKING_STAGE_DISPLAY_TIME = 6;
export const COOKING_STAGE_DISPLAY_TIME_2008C = 4;

export const TURN_ON = 1; // 使能打开
export const TURN_OFF = 0; // 使能关闭

// 模式
export const MODE_STANDARD_COOKING = 1; // 标准煮
export const MODE_SLOW_COOKING = 2; // 精煮饭、精华煮
export const MODE_QUICK_COOKING = 3; // 快煮饭、超快煮
export const MODE_CONGEE = 4; // 煮粥
export const MODE_PORRIDGE = 5; // 稀饭
export const MODE_SOUP = 6; // 煲汤
export const MODE_WARNING = 7; // 热饭、再加热
export const MODE_GROCERY_PORRIDGE = 8; // 杂粮粥
export const MODE_POT_RICE = 9; // 锅巴饭
export const MODE_STEAM = 10; // 蒸煮
export const MODE_CAKE = 11; // 蛋糕
export const MODE_YOGURT = 12; // 酸奶
export const MODE_SPROUT_RICE = 13; // 发芽饭
export const MODE_BABY_PORRIDGE = 14; // 婴儿粥
export const MODE_HOT_POT_RICE = 15; // 煲仔饭
export const MODE_CEREAL_RICE = 16; // 杂粮饭
export const MODE_QUICK_CONGEE = 17; // 快煮粥
export const MODE_COARSE_RICE = 18; // 糙米饭
export const MODE_DESUGAR_RICE = 19; // 脱糖饭
export const MODE_KEEP_WARM = 30; // 保温

/**
 * 模式显示排序
 * 米饭类：快煮饭、精煮饭、标准煮、主打特色功能（如煲仔饭、发芽饭等）、杂粮饭、糙米饭、锅巴饭
 * 粥类：煮粥、稀饭、快煮粥、杂粮粥、婴儿粥
 * 其他：煲汤、蒸煮、蛋糕、酸奶、热饭、保温
 */
export const ORDER_QUICK_COOKING = 0; // 快煮饭、超快煮
export const ORDER_SLOW_COOKING = 1; // 精煮饭、精华煮
export const ORDER_STANDARD_COOKING = 2; // 标准煮
export const ORDER_HOT_POT_RICE = 3; // 煲仔饭 *特色功能*
export const ORDER_SPROUT_RICE = 4; // 发芽饭 *特色功能*
export const ORDER_CEREAL_RICE = 5; // 杂粮饭
export const ORDER_COARSE_RICE = 6; // 糙米饭
export const ORDER_POT_RICE = 7; // 锅巴饭
export const ORDER_CONGEE = 8; // 煮粥
export const ORDER_PORRIDGE = 9; // 稀饭
export const ORDER_QUICK_CONGEE = 10; // 快煮粥
export const ORDER_GROCERY_PORRIDGE = 11; // 杂粮粥
export const ORDER_BABY_PORRIDGE = 12; // 婴儿粥
export const ORDER_SOUP = 13; // 煲汤
export const ORDER_STEAM = 14; // 蒸煮
export const ORDER_CAKE = 15; // 蛋糕
export const ORDER_YOGURT = 16; // 酸奶
export const ORDER_WARNING = 17; // 热饭、再加热
export const ORDER_KEEP_WARM = 18; // 保温

// 默认
export const CR_STAGE_DEFAULT = ['大火升温', '浸润吸水', '淀粉溶胀', '小火预热', '焖饭增香'];
// 4030C 精煮饭 快煮饭
export const CR_4030C_SLOW_OR_QUICK_COOKING = ['小火预热', '浸润吸水', '大火升温', '淀粉溶胀', '焖饭增香'];
// 4030C 发芽饭
export const CR_4030C_SPROUT_RICE = ['小火预热', '糙米萌芽', '大火升温', '淀粉溶胀', '焖饭增香'];
// 4030C 脱糖饭
export const CR_4030C_DESUGAR_RICE = ['小火预热', '浸润吸水', '大火升温', '沸腾沥糖', '蒸饭熟化'];
