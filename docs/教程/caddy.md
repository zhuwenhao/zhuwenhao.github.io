---
sidebar: auto
title: Caddy
date: 2021-07-23 10:33:16
permalink: /tutorial/caddy/
categories:
  - 教程
tags:
  - Linux
---

# Caddy

[官网](https://caddyserver.com)

## 下载

勾选 `http.handlers.webhook` 模块并 [下载](https://caddyserver.com/download)对应平台的二进制文件

## 安装

移动下载的二进制文件到 `/usr/bin/`

```bash
$ sudo mv caddy_linux_amd64_custom /usr/bin/caddy
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

创建一个名为 `Caddyfile` 的配置文件

```bash
$ sudo mkdir /etc/caddy
$ sudo touch /etc/caddy/Caddyfile
```

配置文件内容

```
example.com, www.example.com {
  root * /var/www/example.com
  file_server

  handle_errors {
    rewrite * /errors/{http.error.status_code}.html
    file_server
  }

  route /webhook {
    webhook {
      repo https://github.com/example/foobar.git
      path /var/www/example.com
      branch master
      secret xxx
    }
  }
}
```

`xxx` 远程仓库设置中 Webhook 的 Secret

## 服务

[下载](https://raw.githubusercontent.com/caddyserver/dist/master/init/caddy.service)服务文件并移动到 `/etc/systemd/system/`

```bash
$ sudo mv caddy.service /etc/systemd/system/
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
