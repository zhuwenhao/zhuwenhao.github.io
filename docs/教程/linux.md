---
title: Linux
date: 2022-05-08 22:34:12
permalink: /tutorial/linux/
categories:
  - 教程
tags:
  - Linux
---

# Linux

## 防火墙

查看端口状态

```bash
sudo firewall-cmd --query-port=6666/tcp
```

添加端口

```bash
sudo firewall-cmd --add-port=6666/tcp --permanent
```

移除端口

```bash
sudo firewall-cmd --remove-port=6666/tcp --permanent
```

重新加载

```bash
sudo firewall-cmd --reload
```

## 日志

实时显示某个服务的日志

```bash
sudo journalctl -u caddy -f -o json-pretty
```
