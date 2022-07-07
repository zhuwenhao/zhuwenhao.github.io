---
sidebar: auto
title: Shadowsocks-rust
date: 2021-07-23 10:30:16
permalink: /tutorial/shadowsocks-rust/
categories:
  - 教程
tags:
  - Linux
---

# Shadowsocks-rust

## 下载

[下载](https://github.com/shadowsocks/shadowsocks-rust/releases/latest)对应平台的压缩文件

```bash
$ wget -O shadowsocks.tar.xz https://github.com/shadowsocks/shadowsocks-rust/releases/download/v1.14.3/shadowsocks-v1.14.3.x86_64-unknown-linux-musl.tar.xz
```

解压

```bash
$ tar -xf shadowsocks.tar.xz
```

## 安装

移动 `ssserver` 到 `/usr/bin/`

```bash
$ sudo mv ssserver /usr/bin/
```

测试是否有效

```bash
$ ssserver --version
```

## 配置

创建一个名为 `config.json` 的配置文件

```bash
$ sudo mkdir /etc/shadowsocks
$ sudo touch /etc/shadowsocks/config.json
```

配置文件内容

```json
{
  "servers": [
    {
      "address": "::",
      "port": 12345,
      "method": "chacha20-ietf-poly1305",
      "password": "password"
    }
  ],
  "mode": "tcp_and_udp",
  "no_delay": true
}
```

## 服务

创建一个名为 `shadowsocks.service` 的服务文件

```bash
$ sudo touch /etc/systemd/system/shadowsocks.service
```

服务文件内容

```
[Unit]
Description=Shadowsocks
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks/config.json

[Install]
WantedBy=multi-user.target
```

启用 `Shadowsocks` 服务

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl enable --now shadowsocks
```

检查是否在运行中

```bash
$ systemctl status shadowsocks
```
