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
firewall-cmd --query-port=6666/tcp
```

添加端口

```bash
firewall-cmd --add-port=6666/tcp --permanent
```

移除端口

```bash
firewall-cmd --remove-port=6666/tcp --permanent
```

重新加载

```bash
firewall-cmd --reload
```
