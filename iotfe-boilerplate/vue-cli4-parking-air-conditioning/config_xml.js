var fs = require('fs'),
    xml2js = require('xml2js')

var parser = new xml2js.Parser({
    explicitArray: false
})
var builder = new xml2js.Builder();

fs.readFile(__dirname + '/src/config/config.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        var version = (parseFloat(result.device.version) + 0.1) || 1.0;
        version = version.toFixed(1);
        result.device.version = version;
        console.log(result)
        console.log(`插件版本加 0.1，现在版本是 ${version}`)

        // config.json 用于 vuex
        fs.writeFile(__dirname + '/src/config/config.json', JSON.stringify(result), err => {
            if (err) throw err
            console.log('config.json 文件已保存')
        })

        var xml = builder.buildObject(result);
        // 覆盖 config.xml 保存
        fs.writeFile(__dirname + '/src/config/config.xml', xml, err => {
            if (err) throw err
            console.log('config.xml 文件已保存')
        })
    })
})