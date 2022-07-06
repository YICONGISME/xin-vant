# Xin-Vant

基于Vant的移动端组件库

## 安装

- yarn

```bash
$ yarn config set "@xin:registry" "http://39.107.47.200"
$ yarn add @xin/xin-vant
```

## 开发


### 发布

- 登陆

```bash
$ npm login --scope=@xin --registry=http://39.107.47.200
```

- 版本号

```bash
# 更新小版本号
$ npm run patch

# 其他版本号
$ npm run  [ major | minor ]
```

- 打包

```bash
# 组件打包
$ npm run build:common
```

- 发布

```bash
$ npm publish
```

### 本地调试
```bash
$ npm run yalc:push
```


### 组件

组件名|功能
---|---
XinVtDynamicForm| 动态生成表单组件
XinVtFileUploader| 文件上传组件
XinVtFilePreview| 文件预览组件
XinVtFileList| 文件列表组件
XinVtImgUploader| 图片上传组件


### 工具

- XinVtValidator 校验库
- HttpClient 接口请求类
