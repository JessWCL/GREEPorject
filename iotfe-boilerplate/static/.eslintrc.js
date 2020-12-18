module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"], // 分号
        "quotes": ["error", "single"], // 单引号
        "space-before-function-paren": ["error", "always"], // 函数括号前有空格
        "spaced-comment": ["error", "always"] // 注释与文字之间有空格
    }
};