---
sidebar: auto
title: Windows 激活
date: 2021-07-23 11:11:11
permalink: /tutorial/windows-activation/
categories:
  - 教程
tags:
  - Windows
---

# Windows 激活

## KMS激活

打开 `Windows PowerShell (管理员)` 输入以下命令

```powershell
slmgr.vbs -upk
slmgr.vbs -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX # 这个密钥是Windows 10 专业版的，不同系统版本的密钥不一样，详见下方链接
slmgr.vbs -skms kms.cangshui.net             # KMS的域名或IP
slmgr.vbs -ato
slmgr.vbs -dlv
```

![KMS激活成功](/images/kms-activated-success.png)

[沧水的KMS激活服务](https://kms.cangshui.net) [KMS 客户端安装密钥](https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys)
