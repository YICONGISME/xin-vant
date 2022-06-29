module.exports = {
    root: true,
    env: {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    extends: [
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: [
        "@typescript-eslint",
        "vue"
    ],
    "globals": {
        "$": "writable",//jquery中的全局$不报错
        "Vue":'readonly'
    },
    rules: {
        'no-useless-escape': 'off',
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/mustache-interpolation-spacing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/v-bind-style': 'off',
        'vue/v-on-style': 'off',
        'vue/require-default-prop': 'off',
        'no-empty-function': 'error', //禁止空函数
        'no-extra-parens': 'error', //禁止不必要的括号
        'default-case': 'error', //switch 必须有default
        'no-lone-blocks': 'error', //禁用不必要的嵌套块
        'no-multi-spaces': 'error', //禁止使用多个空格

        'vue/html-closing-bracket-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/require-v-for-key': 'off',
        'vue/html-indent': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'no-var': 'off', //允许使用var
        'prefer-const':'off', //关闭将let转化成const
        "no-unused-vars": 'off',//任何地方声明和不使用的变量不报错
        "vue/no-unused-vars":'off',//.vue任何地方声明和不使用的变量不报错
        "@typescript-eslint/no-explicit-any":'off',//ts-使用any警告
        "@typescript-eslint/explicit-module-boundary-types":'off',//函数必须有返回类型-9341-warning
        "@typescript-eslint/no-unused-vars":'off',//允许已定义从未使用的变量-1803-warning
        "@typescript-eslint/no-empty-interface":'off',//允许空接口定义--7-error
        "@typescript-eslint/no-this-alias":'off',//this设置别名使this变成了局部变量-1901-error
        "@typescript-eslint/ban-types":'off',//不可以将funtion和object作为类型-1117-error
        "@typescript-eslint/ban-ts-comment":'off',//可以使用@ts-ignore
        "@typescript-eslint/no-non-null-assertion":'off',//非空断言 warning
        "@typescript-eslint/no-var-requires":"off",//可以使用require
        "@typescript-eslint/no-empty-function":'off',//空箭头函数
        '@typescript-eslint/camelcase': 'off',//关闭命名校验
        "prefer-spread":'off',//不强制使用扩展运算符
        "prefer-rest-params":'off',//可以使用arguments
        "no-async-promise-executor": "off",
        "no-misleading-character-class": "off",
        "no-prototype-builtins": "off",
        "no-shadow-restricted-names": "off",
        "no-useless-catch": "off",
        "no-with": "off",
        "require-atomic-updates": "off",
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        "parser": '@typescript-eslint/parser',
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true //兼容jsx语法
        }
    }
}
