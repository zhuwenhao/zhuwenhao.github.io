---
title: Caddy
date: 2021-07-23 10:33:16
category:
  - 教程
order: 1
---

# Caddy

<!-- more -->

## 下载

打开 [下载](https://caddyserver.com/download) 页面，选择对应的平台，点选 `http.handlers.webhook` 模块，然后点击下载按钮

## 安装

移动下载的二进制文件到 `/usr/bin/`

```bash
$ sudo mv caddy_linux_amd64_custom /usr/bin/caddy
```

修改 `caddy` 权限

```bash
$ sudo chmod 755 /usr/bin/caddy
```

测试是否有效

```bash
$ caddy version
```

创建一个名为 `caddy` 的组

```bash
$ sudo groupadd --system caddy
```

创建一个名为 `caddy` 且有可写的主目录的用户

```bash
$ sudo useradd --system \
    --gid caddy \
    --create-home \
    --home-dir /var/lib/caddy \
    --shell /usr/sbin/nologin \
    --comment "Caddy web server" \
    caddy
```

## 配置

创建一个名为 `foobar.com` 的站点目录

```bash
$ sudo mkdir -p -m 777 /var/www/foobar.com
```

创建一个名为 `Caddyfile` 的配置文件

```bash
$ sudo mkdir /etc/caddy
$ sudo touch /etc/caddy/Caddyfile
```

配置文件内容

```
foobar.com, www.foobar.com {
  root * /var/www/foobar.com
  file_server

  encode zstd gzip

  route /webhook {
    webhook {
      repo https://github.com/foo/bar.git
      path /var/www/foobar.com
      branch pages
      secret xxx
    }
  }

  route {
    try_files {path} /index.html
  }
}
```

`xxx` 为远程仓库设置中 Webhook 的 Secret

## 服务

将服务文件下载到 `/etc/systemd/system`

```bash
$ sudo wget -P /etc/systemd/system https://raw.githubusercontent.com/caddyserver/dist/master/init/caddy.service
```

启用 `caddy` 服务

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl enable --now caddy
```

检查是否在运行中

```bash
$ systemctl status caddy
```

## 日志

```bash
$ sudo journalctl -u caddy -f -o json-pretty
```
