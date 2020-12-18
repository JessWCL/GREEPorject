var fs = require('fs'),
    xml2js = require('xml2js')

var parser = new xml2js.Parser({
    explicitArray: false,
})

fs.readFile(__dirname + '/src/config/config.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        console.log(result);
        result.device.statueJson = JSON.parse(result.device.statueJson)
        result.device.statueJson2 = JSON.parse(result.device.statueJson2)
        // config.json 用于 vuex
        fs.writeFile(__dirname + '/src/config/config.json', JSON.stringify(result), err => {
            if (err) throw err
            console.log('config.js 文件已保存')
        })
    })
})