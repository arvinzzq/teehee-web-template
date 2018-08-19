# teehee-web-template

A full-stack web template based on zeass and teehee.

## Usage

```javascript
npm run publish -> compile server side code and frontend resouce

npm run production -> start server side on production mode
```

## Development

```javascript
npm run start:dev -> start server side on dev mode

npm run webpack:dev -> compile frontend code
```

## 注意

本项目目前只是自用，并没有写单元测试。另外静态资源上传cdn的部分没做的原因是上传需要对应的api的key(e.g., qiniu)，这个key的管理，我没想到比较好的安全的方式，直接写在项目里面是不可以的，太危险了[《How to build an npm worm》](https://jamie.build/how-to-build-an-npm-worm)，每次输入也是很不方便的。公司的上传cdn的工具是每次调用公司的一个服务获取key然后再进行上传的操作，这需要在公司的网络下(包括vpn连接状态下)使用这个工具才能完成上传到公司cdn域的操作（其实也不安全...）。

## Frontend side
* client -> raw fred resource.
* build -> compiled local fred resource. 
* publish -> published fred resource (uploaded to cdn).

## Server side
* server -> raw server side code.
* server_dist -> compiled server side code for production mode.

## Static folder

* static
