# JSON 字段表

驻车空调字段表

| 功能                       | 内容                                                        | 字段名      | 字段类型  |
| -------------------------- | ----------------------------------------------------------- | ----------- | --------- |
| 开关机                     | 1---开机，0---关机（上电默认）                              | Pow         | 控制/查询 |
| 模式                       | 0 自动（上电默认），1-制冷，2-抽湿，3-送风                  | Mod         | 控制/查询 |
| 温度                       | 传输值=实际值-16, 范围 16.0℃~30.0℃                          | SetTem      | 控制/查询 |
| 风速                       | 0：自动风；1：低档； 2：中低档；3：中档；4: 中高档；5：高档 | WdSpd       | 控制/查询 |
| 灯光                       | 1---打开，0---关闭。                                        | Lig         | 控制/查询 |
| 节能（制冷模式）           | 1---打开，0---关闭。                                        | StHt        | 控制/查询 |
| 定时开机的剩余分钟数       | 传输值 = 剩余分钟数（剩余小时换算成分钟）                   | TmrOnMinLf  | 控制/查询 |
| 定时关机的剩余分钟数       | 传输值 = 剩余分钟数（剩余小时换算成分钟）                   | TmrOffMinLf | 控制/查询 |
| 蓄电池端电压低压保护设定值 | 传输值= （实际值-21）/0.5                                   | VoltLowSet  | 控制/查询 |
| 电池端电压提醒             | 0：正常 1:电压过低报警 2：电压过低保护 3.电压过高           | VoltWarn    | 查询      |
| 蓄电池端当前电压值         | 传输值= （实际值-10）\*10                                   | VoltNow     | 查询      |
