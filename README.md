# WorkInfoHtml
这个网站项目是梨苏橙于2020年开始构建，前端后台全由个人独立完成

一、后台主要是利用python+mysql将数据从实习僧和应届生求职网上的实习信息爬取下来写入本地数据库；

二、利用python Flask将本地的数据库信息提取出来转化成json文件，并形成api数据接口；

三、使用jquery ajax获取api的数据，并且使用js处理数据，体现到html中。

v1.0=》目前该网站主要含有的功能有：

    1.对于全国地区实习信息的展现和按照时间的整理
    
    2.对于武汉地区实习信息的展现和按照时间的整理

    3.对于目前所有的周末专题进行了上传和展示，但是上传这个功能还需要进一步实现
这个网站在实现过程中对于数据的请求尝试了许多种方式：

1.使用原生ajax请求flask搭建的后台：失败，无法解决异源请求的问题

2.使用jquery中的ajax请求flask搭建的后台：失败，无法解决异源请求的问题

3.使用原生ajax请求php对于本地数据库的操作：失败，无法解决异源请求的问题，readystate=4，status=200，但依旧没有获取到数据

4.使用jquery中的ajax请求php对于本地数据库的操作：失败，原因和之前一样

5.利用nodejs搭建本地的服务器，之后使用ajax请求php对于本地数据库的操作，失败，原因如上述

    问题：搭建了本地数据库之后，chrome依旧报出异源的错误，这个不知道为什么？？

6.将falsk搭建的api接口放到本地服务器的域名之下，依旧是无法处理这个问题

7.使用jquery中的ajax请求flask搭建的后台（使用jsonp的形式，非官方，只能使用get方式）：失败，无法解决异源请求的问题

    问题：对本地的api接口import了CORS，并且设置可以异源请求访问，依然报错。

8.使用ngrok对本地api接口进行内网映射，之后使用jsonp形式进行访问，失败

9.使用vue+axios对本地api接口（已放到本地服务器同一端口），失败

10.使用jquery ajax对于本地api接口（服务端设置允许异源请求）进行post请求，可以返回数据，这是目前唯一成功的方式。

11.使用 ajax 对于上传至git的数据接口进行请求，可以返回数据。
