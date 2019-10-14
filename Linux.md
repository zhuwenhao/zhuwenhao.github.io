# Linux

## Command

后台运行

```bash
nohup command >/dev/null 2>&1 &
```

查看所有进程

```bash
ps -ef
```

查找特定进程

```bash
ps -ef | grep processname
```

关闭进程

```bash
kill -9 pid
```



## BBR

[GitHub](https://github.com/google/bbr)

### Ubuntu 18.04

1. 修改系统变量

```
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
```

2. 保存生效

```
sysctl -p
```

3. 查看内核是否已开启BBR

```
sysctl net.ipv4.tcp_available_congestion_control
```

显示以下即已开启：

```
net.ipv4.tcp_available_congestion_control = reno cubic bbr
```

4. 查看BBR是否启动

```
lsmod | grep bbr
```

显示以下即启动成功：

```
tcp_bbr                20480  14
```



## Shadowsocks-libev

### 安装

#### 下载源码

```bash
git clone https://github.com/shadowsocks/shadowsocks-libev.git
cd shadowsocks-libev
git submodule update --init --recursive
```

#### 安装依赖

```bash
sudo apt-get install --no-install-recommends gettext build-essential autoconf libtool libpcre3-dev asciidoc xmlto libev-dev libc-ares-dev automake libmbedtls-dev libsodium-dev
```

#### 编译安装

```bash
./autogen.sh && ./configure && make
sudo make install
```

### 配置

#### 创建配置文件

```bash
mkdir /etc/shadowsocks-libev
vim /etc/shadowsocks-libev/config.json
```

#### 配置内容

```json
{       
    "server": "0.0.0.0",
    "server_port": 10000,
    "local_port": 1080,
    "password": "password",
    "method": "xchacha20-ietf-poly1305",
    "fast_open": true,
    "timeout": 60
}
```

### 服务

#### 创建服务文件

```bash
vim /etc/systemd/system/shadowsocks-libev.service
```

#### 服务内容

```
[Unit]
Description=Shadowsocks-libev Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/ss-server -c /etc/shadowsocks-libev/config.json

[Install]
WantedBy=multi-user.target
```

#### 相关命令

```bash
systemctl start shadowsocks-libev   #启动服务
systemctl stop shadowsocks-libev    #停止服务
systemctl restart shadowsocks-libev #重启服务
systemctl enable shadowsocks-libev  #开机启动
systemctl disable shadowsocks-libev #取消开机启动
systemctl status shadowsocks-libev  #查看状态
```

### 更新

```bash
git pull origin master
./autogen.sh && ./configure && make
sudo make install
```



## Caddy

### 安装

```bash
curl https://getcaddy.com | bash -s personal
```

### 创建必须的目录

```
$ sudo mkdir /etc/caddy
$ sudo chown -R root:root /etc/caddy

$ sudo mkdir /etc/ssl/caddy
$ sudo chown -R root:www-data /etc/ssl/caddy
$ sudo chmod 0770 /etc/ssl/caddy

$ sudo touch /etc/caddy/Caddyfile
$ sudo chown root:root /etc/caddy/Caddyfile
$ sudo chmod 644 /etc/caddy/Caddyfile

$ sudo mkdir /var/www
$ sudo chown www-data:www-data /var/www
$ sudo chmod 555 /var/www
$ sudo mkdir /var/www/example.com
$ sudo chown -R www-data:www-data /var/www/example.com
$ sudo chmod -R 555 /var/www/example.com
```



## RssBot

[GitHub](https://github.com/iovxw/rssbot)

### 安装

1. 下载

```bash
wget https://github.com/iovxw/rssbot/releases/download/v1.4.4/rssbot-v1.4.4-linux.zip
```

2. 解压

```bash
unzip rssbot-v1.4.4-linux.zip
```

3. 运行

```bash
./rssbot DATAFILE TELEGRAM-BOT-TOKEN
```

### 使用

```
/rss       - 显示当前订阅的 RSS 列表，加 raw 参数显示链接
/sub       - 订阅一个 RSS: /sub http://example.com/feed.xml
/unsub     - 退订一个 RSS: /unsub http://example.com/feed.xml
/unsubthis - 使用此命令回复想要退订的 RSS 消息即可退订, 不支持 Channel
/export    - 导出为 OPML
```