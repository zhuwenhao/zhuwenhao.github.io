---
title: Linux
date: 2022-05-08 22:34:12
category:
  - 教程
order: 2
---

# Linux

<!-- more -->

## 防火墙

查看开放的端口

```bash
$ sudo firewall-cmd --list-ports
```

查看端口状态

```bash
$ sudo firewall-cmd --query-port=6666/tcp
```

添加端口

```bash
$ sudo firewall-cmd --add-port=6666/tcp --permanent
```

重新加载

```bash
$ sudo firewall-cmd --reload
```

移除端口

```bash
$ sudo firewall-cmd --remove-port=6666/tcp --permanent
```
