---
title: Obsidian 使用指南
author: CNDLive
pubDate: 2025-12-02
created: 2025-12-02
description: 本文关于官网如何更新文章和内容做出基础指南
tags:
  - 指南
  - obsidian
  - markdown
---

> 官网内容以 Markdown 为主，新发布内容需先转为 Markdown 再交付前端。  
> 本文基于 Obsidian 操作，下载地址：[Download - Obsidian](https://obsidian.md)。

![](./images/1fa972ddd1916d74a650f7943e21d50f_MD5.webp)

---

## 1. 安装插件：Local Images Plus

**作用**：插图时自动生成 `images` 文件夹，图片统一转 WebP，方便前端渲染。

![](./images/f20888213a81c279600210cbbe0dee0c_MD5.webp)

**配置步骤**

1. 启用插件后进入设置，按下图调整：
   ![](./images/3e369e65eceb4e6b6a08ac700503592e_MD5.webp)
   ![](./images/e4e5553f2ad37dbb8a2c29c2ebb1476f_MD5.webp)

2. **Files and Links** 页签：
   - 第二点：设置为“当前文件夹的子文件夹”
   - 第三点：填 `image`  
     ![](./images/26f37470869379ac0d39a90a11c10dc5_MD5.webp)

3. 页面底部勾选 **copy obsidian settings**。  
   ![](./images/Pasted%20image%2020251202165707.png)

---

## 2. 两种使用场景

| 场景           | 目的         |
| -------------- | ------------ |
| ① 扒现有网页   | 更新已有页面 |
| ② 自行导入文章 | 发布新页面   |

> 文末附“易错点 & 注意事项”，请务必阅读。

---

# ① 扒现有网页

**环境**：Google Chrome  
**插件**：一键将网页转 Markdown 并推送到 Obsidian

![](./images/245f0a8899c8243af387b67123e38e9b_MD5.webp)

1. 打开目标文章 → 点击插件图标 → **Add to Obsidian**  
   ![](./images/96767332341a8e3015a2deb4286269fe_MD5.webp)

2. 内容自动同步到 Obsidian  
   ![](./images/38880df11f3140e41f65ee4fe1b58462_MD5.webp)

---

## 填写 Properties（必须）

| 属性          | 说明                        |
| ------------- | --------------------------- |
| `title`       | 官网显示标题                |
| `author`      | 固定 `CNDLive`              |
| `pubDate`     | 发布日期（**D 大写**）      |
| `created`     | 创建日期（可与 pubDate 同） |
| `description` | SEO 描述（可 AI 生成）      |
| `tag`         | 无空格，回车生成            |

![](./images/9feb18769dbbf73762a723a6c2c61db4_MD5.webp)

---

## 整理文件夹

1. 插件已自动生成总文件夹  
   ![](./images/b013afdbddf9991f8c0bd5484ab333a2_MD5.webp)

2. **有封面时**：在总文件夹内新建 `cover` 子文件夹并放入封面图  
   ![](./images/7352c58e727af1b918914a92d3d7a97d_MD5.webp)

3. **重命名规则**
   - 总文件夹：`文章关键词-用横线连接`（**URL 路径，不可重复**）
   - 文章文件：`index.md`  
     ![](./images/1f8938e6063a241f49fdd9ed97b1dbfb_MD5.webp)

4. 检查 `images` 目录，确认图片已自动转 WebP  
   ![](./images/13410c7eddc858bc2fc4746acfb399a9_MD5.webp)

5. 交付：右键总文件夹 → **Show in system explorer** → 复制整个文件夹给前端  
   ![](./images/11daa58b6ce315b501f6d324efa51b6b_MD5.webp)

---

# ② 自行导入文章

以 Word 为例：

1. 将正文用任意工具转 Markdown 并复制代码  
   ![](./images/1a0b8caa60a401f498651c06b3ff96c9_MD5.webp)

2. 在 Obsidian 新建总文件夹，内部再建：
   - `cover`（可选）
   - `images`
   - `index`（**笔记文件，非文件夹**）  
     ![](./images/d7ac354f6c5cf144899e146b464cae7c_MD5.webp)

3. 在 `index` 中粘贴 Markdown → 右侧边栏添加 Properties → 按上表填写  
   ![](./images/bc3f92f32d1fbe9d5f15fc9768512a9d_MD5.webp)

4. 插图：直接粘贴，插件自动在 `images` 生成 WebP  
   ![](./images/a7d0372f1f336a3ec175a9e06618325e_MD5.webp)

5. 同场景 ① 重命名总文件夹、检查内容后交付。

---

# 3. 易错点 & 注意事项

## ① Properties 六项必填

| 字段          | 提示                 |
| ------------- | -------------------- |
| `title`       | 官网标题             |
| `author`      | `CNDLive`            |
| `pubDate`     | 注意大小写，决定排序 |
| `created`     | 一般同 pubDate       |
| `description` | SEO 用，勿空         |
| `tag`         | 禁止空格，回车确认   |

![](./images/f8302366dfcdd4772b4f5b8d54081f50_MD5.webp)

---

## ② 文件夹结构（单文单夹）
