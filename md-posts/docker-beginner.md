---
title: Docker 容器化入门指南
date: 2026-04-20
tags: [Docker, DevOps]
category: 运维部署
---

## 什么是 Docker

Docker 是一个开源的容器化平台，它允许你将应用及其依赖打包成一个轻量级、可移植的容器，确保在任何环境中都能一致运行。

## 核心概念

- **镜像（Image）**：只读模板，包含创建容器所需的所有文件
- **容器（Container）**：镜像的运行实例
- **Dockerfile**：定义镜像构建步骤的脚本
- **Docker Compose**：定义和管理多容器应用

## 常用命令

```bash
# 拉取镜像
docker pull node:18-alpine

# 运行容器
docker run -d -p 3000:3000 --name my-app node:18-alpine

# 查看运行中的容器
docker ps

# 停止容器
docker stop my-app

# 构建镜像
docker build -t my-app:v1 .

# Docker Compose
docker-compose up -d
docker-compose down
```

## 编写 Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 总结

> Docker 的核心理念是"一次构建，到处运行"。它解决了"在我电脑上能跑"的经典问题，是现代 DevOps 和微服务架构的基础设施。
