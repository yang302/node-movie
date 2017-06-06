# node-movie
node+express+ejs+mongodb+es6实现一个电影小网站

# 项目介绍
本项目包含： 电影首页，电影录入页，电影列表页，电影详情页。

使用技术：
node+express+ejs+mongodb+es6

插件：
其中时间格式化使用moment插件

# 项目使用步骤
1，git clone到本地

2，npm install

3，bower install （全局安装bower，项目依赖jquery 和 bootstrap）

4，开启mongodb服务

a，需要下载安装mongodb到本地；

b，在当前根目录下新建文件夹data，data里面再新建一个文件夹db，防止运行mongod.exe时出现闪退；

c，进入安装目录mongodb下的bin目录下，运行mongod.exe；

5，npm start（使用supervisor监听入口文件的改动，自动重启node，需要全局安装supervisor）

6，运行 localhost:3000
