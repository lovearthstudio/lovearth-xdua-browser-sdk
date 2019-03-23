<h1 >lovearth-xdua-browser-sdk</h1>
<p>
  地球号（xdua.com）是专为软件开发者提供的稳定、高效、安全，保密的云端用户管理平台。 无论是个人、团队、或是企业，都能够用地球号实现用户托管和二次开发。 地球号于2018年正式推出，由中科院计算所泛在计算中心开发，致力于为开发者提供优质稳定的用户托管服务。
</p>
<h2>Install</h2>

Install with npm:

```bash
npm i lovearth-xdua-browser-sdk
```

Install with yarn:

```bash
yarn add lovearth-xdua-browser-sdk --dev
```

Publish to npmjs

### 发布npm包,在package.json里修改版本号后,使用npm publish命令，可能会要求npm adduser 来添加用户.

```bash
npm publish
```
我们发现一个问题，必须先要`npm run build`把dist文件夹建立起来，然后npm publish 才会把整个dist连同lib都发到库里，然后在www.xdua.com调用的时候调用的是npm发布的dist。

为什么使用dist而不是lib,是因为SDK根目录的index.js里面直接引用了dist而不是lib.

lib里是ES6的语法，改动要改在lib里，运行npm run build会把lib的code转成es5存放到dist里。

<h2>api用法</h2>

- 参照 [地球号 API](http://doc.xdua.com)

github账号:lovearthhome@gmail.com h*2*b
