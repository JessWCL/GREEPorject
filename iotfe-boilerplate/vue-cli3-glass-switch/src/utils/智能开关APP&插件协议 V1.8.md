> 项目名称： 智能开关（蓝牙网关设备接入类通用）
> 文档版本：V1.8
> 更新时间： 2019-12-29
> 成员： Jerry、Mangor、LaoLee
> 编写人： Jerry-Rain

-----
|   修改时间   |   修改内容   |   修改人   |
| :---------: | :---------: | :------: |
| 2019-9-4 | 制订基本协议 | Jerry-Rain |
|  2019-9-4 | 定时改为分钟 | Jerry-Rain |
| 2019-9-5 | 规范cmd协议，改为opt、p | Jerry-Rain |
| 2019-9-10 | 修改定时cmd协议，opt添加timerList，添加注意事项 | Jerry-Rain |
| 2019-9-10 | 添加修改接口协议 | Jerry-Rain |
| 2019-9-17 | 修改接口协议+mac | Jerry-Rain |
| 2019-9-18 | 修改接口协议，查询定时添加switchNum开关编号 | Jerry-Rain |
| 2019-9-22 | 增加注意事项，更新协议 | Jerry-Rain |
| 2019-11-19 | 修改添加定时的协议 | Jerry-Rain |
| 2019-12-29 | 更新添加定时协议 | Jerry-Rain |

---
> 注意：
> 本协议由Jerry、Mangor、LaoLee制订，适用于蓝牙设备，制订原则“以硬件通讯协议为准”，好处“协议如有变化，主体不用更改，插件根据协议修改解析逻辑，减少多方修改”。
>
> *保留原来的习惯：Pow字段大写，其他的小写例如。timerList、meshId
>
> *统一所有Json 都发："meshId"、"switchNum"
>
> *（已删除）定时列表index从 0开始，修改定时也要index 
>
> *定时不再发序号，index = 5 ，发送，硬件排序；支持删除重新排位
>
> *定时列表查询接口，失败返回404 成功返回数组以及空数组
>
> *定时列表60s刷新一次，有修改时也会刷新，首次进入会刷新存在state
>
> *发送命令时，这段等待时间 停止更新statusDev
------
- Url 传入数据： `meshId , switchNum（开关编号）`
- 发送*定时列表 （打开，关闭，删除）
> `"{"mac":"","t":"meshCmd","meshId":"",p":[""],"opt":["timerList"]}"`
>   eg: `"{"mac":"","t":"meshCmd","meshId":"","p":["[49,[[1,6],[1,1],[1,5],[2,61],[1,127],[1,1]]]"],"opt":["timerList"]}"`
>   解释: 
>   cmd > 功能字 > 开关编号 > 列表索引（5） > 时间（分钟） > 周期 （二进制转十进制）> 开关状态
>   [Data data, Data length]
>
> callback 成功200  失败404
- 修改定时列表 （修改）
>　`"{"mac":"","t":"meshCmd","meshId":"","p":[""],"opt":["timerList"]}"`
>eg: `"{"mac":"","t":"meshCmd","meshId":"","p":["[49,[[1,7],[1,1],[1,1],[1,1]]]"],"opt":["timerList"]}"`,
>解释: 
>修改：cmd > 功能字 > 开关编号 > 列表索引 0- 4 > 类型 1开2关3删
>
>添加：cmd > 功能字 > 开关编号 > 列表索引 * 5  > 类型 1开2关3删
>
>[Data data, Data length]
>
>注意： 修改时发列表索引5，最新修改的

- 查询*定时列表
> 发送TimerList，callback 定时列表
> `"{"mac":"","t":"meshStatus","meshId":"","switchNum":"",cols":["timerList"]}"`
>
> callBack: `[[1,0,61,1],[使能,开关,时间(分钟),周期（十进制）]],[列表三],[列表四],[列表五]]` 或者 `[]`或者失败`404`


- 发送*普通指令
> 只有Pow功能
`"{"mac":"","t":"meshCmd","meshId":"","switchNum":"","opt":["Pow"],"p":[1]}"`

- 查询*普通指令
> meshId替代mac
`"{"mac":"",t":"meshStatus","meshId":"","switchNum":"","cols":["Pow","meshId"]}"`

