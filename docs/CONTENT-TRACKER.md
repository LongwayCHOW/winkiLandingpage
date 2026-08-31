# 内容生产进度追踪（CONTENT-TRACKER）

> 作用：双向看板——左边追踪「素材是否已提供」，右边追踪「博文是否已产出」，两边一一对应。
> 使用：每完成一项就把它从 `[ ]` 改成 `[x]`。素材未齐 → 博文保持空着。
> 关联文件：素材模板见 `docs/素材模板/`，排期见 `docs/CONTENT-CALENDAR.md`，质量门见 `docs/BLOG-CHECKLIST.md`。

---

## 一、素材总览（每 app 的素材是否已给）

> 勾选 = 已提供对应素材（模板见 `docs/素材模板/`）。通用素材（截图/评价/硬数据）在末尾表。

| App | 用户故事 | 开发者思考 | 版本更新 | 对比评测 | 教程 | 场景 | 榜单 | 通用素材齐 |
|---|---|---|---|---|---|---|---|---|
| Chronicle | [ ] | [ ] | [ ] | [x]（vs Day One 已写） | [ ] | [ ] | [ ] | [ ] |
| MeowTalkie | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Flip Timer | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Focus One | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Photo Swipe Cleaner | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Aesthetic Calculator | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| DeliSeek | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| VocalTrans | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

**通用素材（与具体博文无关，可一次补齐）**
- [ ] 8 个 app 的硬数据（下载量/评分/评价数）
- [ ] 每个 app 2-3 张真实截图 → `src/assets/images/post/<app>/`
- [ ] 每个 app 1-2 条真实用户评价
- [ ] 产品事实清单（平台/定价/订阅/隐私，尤其 DeliSeek、VocalTrans 的 iOS 规划）

---

## 二、博文产出追踪（按 app 分组）

> 勾选 = 该博文已发布（文件在 `src/data/post/`）。素材来源列指向你提供的素材文件（若有）。
> ✅ 开头 = 已有博文（历史遗留或本轮已完成）。

### Chronicle（落地页 ✓）
- [x] **Put Your Day Back Together** — user-story（已存在）
- [x] **One Timeline, Less Friction** — dev-notes（已存在）
- [x] **Chronicle vs. Day One** — 对比（已存在，已补下载组件）
- [x] **A New Year Note** — 场景/品牌（已存在）
- [x] **What's New — Big Fix Week** — 版本更新（已存在）
- [ ] 「Day One 替代品 / 无订阅日记」— 对比/教程（素材：____）
- [ ] 「如何开始数字日记 / 极简规划」— 教程（素材：____）

### MeowTalkie（落地页 ✓）
- [x] **Why We Built a Cat Sounds App** — user-story（已存在）
- [x] **Talk to Your Cat** — user-story（已存在）
- [x] **Update: Real Cat Sounds & Dialects** — 版本更新（已存在）
- [ ] 「猫的叫声什么意思」— 场景（素材：____）
- [ ] 「如何训练/和猫沟通」— 教程（素材：____）

### Flip Timer（落地页 ✓）
- [x] **Motion First — Why We Built a Hands-Free Timer** — dev-notes（已存在）
- [x] **Flip, Don't Tap** — user-story（已存在）
- [ ] 「健身/厨房免手计时指南」— 教程（素材：____）
- [ ] 「番茄钟 vs 秒表怎么选」— 对比（素材：____）

### Focus One（落地页 ✓）
- [x] **Monotask by Design** — dev-notes（已存在）
- [x] **Do One Thing Well** — user-story（已存在）
- [ ] 「ADHD 人群如何专注」— 场景（素材：____）
- [ ] 「深度工作 + Pomodoro 实操」— 教程（素材：____）

### Photo Swipe Cleaner（落地页 ✓）
- [x] **Declutter, Organize, Protect** — user-story（已存在）
- [x] **Declutter Gallery, Organize Albums** — user-story（已存在）
- [ ] 「如何清理 iPhone 照片释放空间」— 教程（素材：____）
- [ ] 「相册整理极简方法」— 教程（素材：____）

### Aesthetic Calculator（落地页 ✓）
- [x] **Cute Themes & Custom Palettes** — user-story（已存在）
- [x] **Cute Themes, Custom Colors, Ad-Free** — user-story（已存在）
- [ ] 「让计算器配得上主屏」— 场景（素材：____）
- [ ] 「学校/日常计算器怎么选」— 对比（素材：____）

### DeliSeek（落地页 ✓ 已建）
- [ ] 「2026 去中国旅游必备 app」— 榜单（素材：____）
- [ ] 「中国哪些城市吃什么」— 场景（素材：____）
- [ ] 「如何看懂中文菜单」— 教程（素材：____）

### VocalTrans（落地页 ✓ 已建）
- [ ] 「去中日韩如何离线翻译」— 教程（素材：____）
- [ ] 「粤语翻译：香港旅游必备」— 场景（素材：____）
- [ ] 「离线 vs 在线翻译 app」— 对比（素材：____）

### 全站 / 链接诱饵
- [ ] 「2026 年 8 款极简工具盘点」— 榜单（素材：____）
- [ ] 「去中国需要哪些 app（整合 travel-china）」— 榜单（素材：____）

---

## 三、模板类博文（与 app 无关，建议处理）

| 文件 | 状态 | 建议 |
|---|---|---|
| astrowind-template-in-depth | [x] 已存在 | 建议设 draft 或删除（稀释主题） |
| get-started-website-with-astro | [x] 已存在 | 同上 |
| how-to-customize-astrowind | [x] 已存在 | 同上 |
| markdown-elements-demo-post | [x] 已存在 | 同上 |
| landing | [x] 已存在 | 同上 |
| useful-resources-to-create-websites | [x] 已存在 | 同上 |

---

## 四、使用流程（写一篇的完整链路）

1. 从「二、博文产出」挑一篇待写的 → 打开「一、素材总览」对应格子
2. 若素材 `[ ]` 未齐 → 打开 `docs/素材模板/` 对应模板，填空 → 存为 `docs/素材/app-<类型>.md` → 回来打勾
3. 素材齐 → 把素材文件路径发我 → 我按 `/zac-seo` + `/seo-writing` 产出英文博文
4. **本地预览审阅**：`npm run dev` 起本地站点 → 导航到新博文 URL → 开发者人眼核对配图契合度、排版、文案。
5. 产出后 → 在「二」对应项打勾，填入素材来源（替换 `____`）
6. 发布前对照 `docs/BLOG-CHECKLIST.md` 自查 → 发布 → 确认进 sitemap
