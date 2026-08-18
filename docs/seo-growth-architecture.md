# Winki 自然获客体系架构（SEO Growth System）

> 目标：为 Winki 旗下 8 个 app（Chronicle、MeowTalkie、Photo Swipe Cleaner、Aesthetic Calculator、Focus One、Flip Timer、DeliSeek、VocalTrans）在 Google/百度等搜索引擎获得持续、可自动放大的自然下载量。
> 方法论：ZAC《SEO实战密码》框架（关键词研究→结构→页面→外链→监测→AI）+ SEO Writing 技能。
> 生成：2026-08-15 | 当前站点：winki.win（Astro 5 静态站，Cloudflare Pages）

---

## 0. 体系总览（一页图）

```
┌─────────────────────────────────────────────────────────────────────┐
│  长期自然获客飞轮：                                               │
│                                                                     │
│  关键词研究(ASO+Web) → 内容生产(落地页+博客+AI辅助)                    │
│        ↑                          ↓                                 │
│  效果监测(GSC+GA+排名) ← 外链/社交 ← 技术SEO(结构/Schema/速度)         │
│                                                                     │
│  每个 app = 一个"内容集群"(主题簇)                                    │
│  集群 = 1 个落地页(支柱页) + N 篇支撑博客 + 内链/外链                  │
└─────────────────────────────────────────────────────────────────────┘
```

**核心原则**（来自 ZAC）：
1. SEO 追求**目标流量**（能转化的下载），不是排名本身。
2. 关键词金字塔布局：每个 app 一个集群，每页 2-4 个关键词。
3. 内容为王，链接为后；自然写作，避免堆砌。
4. 长尾 + AI 意图研究是中小站的主要机会。
5. 一切以**可监测、可迭代**为闭环。

---

## 1. 定位与网站目标设定

**网站目标**（营销意义）：让访客**下载对应平台的 app**（App Store / Google Play / TestFlight）。
所有页面、内链、CTA 都要服务这个目标，落到可测量行为：点击下载按钮 / 跳转商店。

**目标测量**：
- 主转化：点击下载/商店跳转（GA4 事件 `download_click`，按 app 拆分）。
- 辅助目标：落地页停留、博客到落地页的点击、newsletter 注册（可建邮件列表做再营销）。

**为什么先定目标**：不同页面文案、内链安排、关键词选择都依赖它——Chronicle 落地页追求"下载"转化，博客追求"让用户记住品牌"，首页追求"分发到各 app 落地页"。

---

## 2. 关键词体系（ASO 数据 → Web SEO 映射）

### 2.1 关键洞察：ASO 关键词 ≠ 网站 SEO 关键词

ASO 数据（App Store 关键词）针对**应用商店搜索**意图；网站 SEO 关键词针对**Google/百度搜索**意图，两者有交集但不重叠：
- **ASO 词**："photo swipe cleaner"、"journal calendar"（用户已在商店内搜索）→ 网站也要用。
- **Web 特有词**："how to clean up photos"、"best journal app"、"app vs app"、"journal app for adhd"（用户先搜索问题/比较，才下载）→ 网站的主要机会。
- **泛词剔除**：当前 ASO 表大量是 amazon/burger king/chinese food near me 等无关泛词，**必须过滤**。

### 2.2 每个 app 建一个关键词集群（金字塔）

以 Chronicle 为例（其余 app 同理）：

| 层级 | 关键词类型 | 示例 | 落地位置 |
|---|---|---|---|
| 塔尖（2-3 词） | 品牌词 + 核心词 | "chronicle journal calendar"、"journal calendar" | 落地页标题/H1 |
| 塔身（分类） | 功能词 | "planner app"、"habit tracker"、"diary app" | 落地页 sections + 分类博客 |
| 塔底（长尾） | 问题/比较/场景词 | "best journal calendar app"、"journal app vs day one"、"adhd habit tracker" | 博客文章 |

### 2.3 关键词来源与清洗流程

1. **清洗 ASO 表**：移除与 app 无关的泛词（品牌名、连锁店、通用动词）。保留与 app 功能/场景/人群相关的词。
2. **Web 扩展**：用 Google Keyword Planner / 谷歌趋势 / Google Search Console 查询，补充问题式、比较式、场景式长尾词。
3. **AI 辅助**（ZAC ch9）：输入 app 功能，让 AI 按"目标群体/地域/场景/问题"扩展关键词并分组。
4. **意图分类**：把词分成导航类（品牌）、交易类（下载意图强，优先）、信息类（研究阶段，做博客）。
5. **形成关键词—URL 对应表**：每个重要词指定目标页面，避免内部竞争。

### 2.4 各 app 初始词库建议（从现有数据提炼）

| App | 核心词（落地页） | 长尾/博客方向 |
|---|---|---|
| Chronicle | journal calendar, planner, habit tracker | journal vs day one, bullet journal app, digital planner for ipad, adhd journal |
| Focus One | focus timer, adhd timer, pomodoro | pomodoro for adhd, focus timer for students, screen time addiction |
| Flip Timer | flip timer, countdown timer, gym timer | 5/10/30 minute timer, timer for workout, interval timer |
| MeowTalkie | talk to cat, cat sounds, cat communicator | cat meow translator, why does my cat meow, cat language |
| Photo Swipe Cleaner | photo cleaner, delete duplicate photos | clear storage iphone, find duplicate photos, organize gallery |
| Aesthetic Calculator | aesthetic calculator, cute calculator | calculator themes, iphone calculator widget |
| DeliSeek | china travel app, chinese food guide | china food translator, what to eat in china, hong kong dim sum |
| VocalTrans | offline translator, cantonese translator | translate chinese to english offline, travel language app |

---

## 3. 信息架构与内容集群

### 3.1 每个 app = 一个内容集群（Topic Cluster）

```
/apps/<app>            → 落地页（支柱页 pillar page，权威性+转化）
/blog/<app>-<topic>    → 支撑文章（长尾流量 + 内链到落地页）
```

结构（以 Chronicle 为例）：
- 支柱页：`/apps/chronicle/`（或保留 `/homes/chronicle/`，见 3.3）
- 支撑文章：journal vs day one、how to start bullet journaling、planner for adhd、best journal calendar 2026…
- 全部文章通过内链指向支柱页，支柱页链接到各文章（Hub-Spoke 模型）。

### 3.2 落地页结构（每页针对 2-4 个核心词）

1. **H1**：核心关键词（"Chronicle: Journal Calendar"）
2. **首段**（前 50-100 词）：核心词 + 一句话价值主张（"你的日记、任务、习惯、日历合一的时间线"）
3. **Features**：功能分块，每块自然带一个功能词
4. **场景/人群**：针对搜索意图的段落（"为 ADHD 人群设计的时间管理"）
5. **FAQ**：5-10 个真实问题（同时是结构化数据素材）
6. **下载 CTA**：App Store / Google Play 按钮（转化目标）
7. **内链**：到本 app 的 2-3 篇关键博客

### 3.3 URL 结构评估

当前落地页在 `/homes/xxx`，博客在根路径 `/%slug%`。**建议（低风险改动）**：
- 保留现有 URL（避免破坏已收录），但新内容一律用干净结构。
- 落地页保持 `/homes/chronicle` 可接受（已被 sitemap 收录）；若未来重做，用 `/apps/chronicle`。
- 博客 slug 已无日期前缀（利于长尾），保持。

---

## 4. 页面级优化（每个落地页 & 每篇博客）

遵循 SEO Writing 技能 + ZAC 页面优化：
- **Title**：50-60 字符，核心词靠前，独特不重复，吸引点击。英文页面不要用中文冒号"："。
- **Meta description**：150-160 字符，含核心词 + CTA（"Download free on App Store"）。
- **H 层级**：H1 一次（核心词），H2 分段（功能词/场景词），H3 小节，不跳级。
- **首段**：核心词在正文前 100 词内出现 1 次。
- **ALT**：图片描述性文字含关键词；文件名用 `seo-descriptive-name.webp`。
- **结构化数据**（落地页重点）：`SoftwareApplication`（含 operatingSystem/offers）+ `FAQPage`。博客可加 `Article`/`HowTo`。
- **内链**：每篇博客 2-3 个相关内链 + 1 个到对应落地页；锚文字描述性（禁 "click here"）。
- **外链**：每篇 1-2 个到权威来源（Apple App Store 官方、Wikipedia、权威评测）。
- **速度**：已有 astro-compress + CDN；确保图片 <100KB、懒加载（AstroWind 已内置 lazyImagesRehypePlugin）。

---

## 5. 内容引擎（可持续自动增长的核心）

### 5.1 内容类型矩阵（每 app 目标：1 落地页 + 12-20 篇/年）

| 类型 | 目的 | 示例 | 频率 |
|---|---|---|---|
| 落地页（支柱页） | 转化 + 品牌 | /homes/chronicle | 维护 |
| 比较文 | 抢竞争对手词 | "Chronicle vs Day One"（已有！） | 2-3/年/app |
| 教程/HowTo | 长尾流量 | "How to start a digital journal" | 4-6/年/app |
| 场景文 | 意图匹配 | "Focus timer for ADHD students" | 2-4/年/app |
| 更新/用户故事 | E-E-A-T + 忠诚 | 已有 team-notes/user-story 系列 | 随更新 |
| 列表/榜单 | 链接诱饵 | "10 best minimal journal apps 2026" | 1-2/年 |

### 5.2 生产流水线（结合 AI 辅助）

1. **选题**：从关键词集群选 1 个长尾词 + 搜索意图。
2. **草稿**：AI 辅助生成（ZAC 提问法：角色+场景+问题+回答期望），加入**真实使用体验**（用过的功能、真实数据、个人感受——E-E-A-T 关键）。
3. **编辑**：人工审核事实、补充截图/数据、保证"有别人没说过的东西"。
4. **发布**：按 SEO Writing 清单检查 title/meta/slug/内链/外链/图片/FAQ。
5. **更新**：每半年回看核心文章，更新数据与链接。

### 5.3 批量与质量平衡（ZAC 警示）

- 绝不做"纯 AI 无编辑"批量内容（案例：80 万 IP → 3690 IP 崩盘）。
- AI 用于：扩展关键词、生成标题、改写、翻译、首稿——**人工做事实核查和体验注入**。

---

## 6. 技术 SEO 基线（已具备 vs 待补）

| 项 | 状态 | 说明 |
|---|---|---|
| Sitemap | ✅ | sitemap-index.xml 已生成、robots.txt 已指向 |
| robots.txt | ✅ | Allow all + Sitemap 声明 |
| 静态化/速度 | ✅ | Astro 静态、compress、CDN、懒加载 |
| GSC 验证 | ✅ | googleSiteVerificationId 已配 |
| 移动友好 | ✅ | AstroWind 响应式 |
| **结构化数据** | ⚠️ | 落地页缺 SoftwareApplication/FAQ schema → 待补 |
| **分析(GA)** | ❌ | hasExternalScripts=false，GA 未启用 → 待补 |
| **About/品牌页** | ❌ | about 被 sitemap 排除、导航注释掉 → 待补（E-E-A-T） |
| **DeliSeek/VocalTrans 落地页** | ❌ | 无独立落地页 → 待补 |

---

## 7. 外部链接与品牌信号

- **链接诱饵**（最高优先级）：做一个免费的线上工具页——如"Photo Swipe Cleaner 在线去重预览"、"Timer 网页版"、"Journal 模板下载"，工具天然吸引链接。
- **目录/平台**：Product Hunt、App Store 收录、GitHub README 链接、相关 subreddit/社区。
- **内容外链**：榜单文、比较文自然吸引引用。
- **社交媒体**：每个 app 建立账号，发文带链接（Google 快讯监控品牌提及）。
- **节奏**：平稳持续，每月 2-5 个高质量链接来源，忌突击（ZAC 外链原则）。

---

## 8. 效果监测与迭代闭环

### 8.1 必装
1. **GA4**（启用 hasExternalScripts + GA id）：装 `download_click` 事件（按 app/平台拆分）。
2. **Google Search Console**：已验证 → 提交 sitemap、看收录/点击/查询。
3. **关键词排名跟踪**：第三方工具（或 GSC 查询数据）记录每个集群核心词排名。

### 8.2 月度节奏
- **收录**：site: 指令 + GSC 索引报告（未索引原因分析）。
- **流量**：GA 着陆页、跳出率、转化（下载点击）。
- **排名**：核心词排名变化，标记下降词。
- **策略**：把流量好/转化高的词 → 加大内容；收录差的页 → 检查结构/质量。
- **长尾检查**：首页流量占比 <20% 为安全（当前品牌站应关注各落地页流量分布）。

### 8.3 关键阈值
- 自然搜索流量占总流量比例：新站起步正常，但>50% 需分散来源（品牌+外链+社交）。
- 收录率：小站目标 90%+。
- 每月至少 2-4 篇新内容维持抓取频率。

---

## 9. 长期自动化机制

| 机制 | 自动化方式 |
|---|---|
| 内容日历 | 每季度定 1 页内容计划（app×类型矩阵），AI 辅助生成大纲 |
| 关键词监控 | GSC 查询 API + 周报；排名工具告警 |
| 发布流水线 | GitHub Actions：构建时自动跑 sitemap 校验、SEO 清单检查（title 长度/meta/slug/schema） |
| AI 内容辅助 | 模板化 prompt：按 app 功能词生成标题/FAQ/首稿 |
| 链接机会发现 | Google 快讯监控品牌词 + 竞争词 |
| 数据看板 | GA4 + GSC 周报，落地页转化漏斗 |

---

## 10. 90 天启动计划

**第 1-30 天（基础打牢）**
1. 启用 GA4 + GSC 提交 sitemap ✅（GSC 已配）
2. 清洗 ASO 关键词 → 每 app 建立"Web 关键词集群表"（关键词—URL 对应表）
3. 补 DeliSeek、VocalTrans 落地页
4. 补结构化数据（SoftwareApplication + FAQ schema）到现有落地页
5. 修复所有 title 的英文冒号/堆砌问题

**第 31-60 天（内容启动）**
6. 每 app 发布 2 篇长尾博客（共 16 篇），内链到落地页
7. 制作 1 个链接诱饵工具页
8. 建 About 页 + 每个 app 的品牌页

**第 61-90 天（放大）**
9. 建立月度内容节奏（每 app 2-3 篇）
10. 外链建设开始（目录/社区/工具推荐）
11. 首次月度监测复盘，调整关键词与内容方向

---

## 11. 本项目现状审计（2026-08-15 实测）

对照本架构逐项盘点当前 winki.win 状态，标注差距与补足方案。

### 11.1 已具备 ✅

| 项 | 现状 | 评价 |
|---|---|---|
| Sitemap | 构建自动生成 sitemap-index.xml，robots.txt 已指向 | 正常 |
| 静态化/速度 | Astro 静态输出 + astro-compress + CDN + 图片懒加载 | 良好 |
| GSC 验证 | googleSiteVerificationId 已配置 | 良好 |
| 移动友好 | AstroWind 响应式 | 良好 |
| 落地页数量 | 6 个 app 有独立落地页 | 基础可用 |
| 博客系统 | 22 篇文章，含 user-story / team-notes 系列（E-E-A-T 素材好） | 有潜力 |

### 11.2 主要差距与补足 ⚠️

**G1. ASO 关键词数据泛词过多，未做 Web 意图清洗**（最高优先级）
- 现状：Chronicle/DeliSeek/Flip 表大量 amazon、burger king、chinese food near me 等无关泛词；3 个 app 只有纯词列表（Aesthetic Calc、Photo Swipe Cleaner、VocalTrans）无搜索量/竞争数据。
- 影响：直接照搬会误导内容选题，无法建立可排名的关键词集群。
- 补足：按 §2.3 流程清洗；用 GSC/Keyword Planner 补 Web 长尾；先做 Chronicle + Flip Timer 两个词的完整集群试点。

**G2. 落地页 Title 不规范**
- 现状：`Flip Timer：Gym,Study & Work`、`MeowTalkie：Talk to Your Cat`、`Focus One：ADHD Focus Timer` 用了**中文冒号"："**（应英文 ":"），且不含空格、堆叠关键词。
- 影响：SERP 显示异常、点击率受损、关键词匹配弱。
- 补足：改为 `Flip Timer: Gym Study & Work Timer` 等 50-60 字符、核心词靠前、含场景词。

**G3. 首页 Title/Meta 关键词堆砌**
- 现状：首页 title 是超长列表 `Winki — Small but beautiful products:Calendar,Planner,To-Do,Habit Tracker,...Theme.`，description 同理。
- 影响：违反"简练通顺、不堆砌"原则，首页这个最重要页面反而无法聚焦。
- 补足：首页 title 改为品牌+核心定位（如 `Winki — Small Apps for Everyday Life`），把各 app 词放到落地页和博客；首页做分发枢纽即可。

**G4. 结构化数据完全缺失**
- 现状：落地页无 SoftwareApplication/FAQPage schema，全局无任何 ld+json。
- 影响：失去富摘要机会，App 在 SERP 展示受限。
- 补足：落地页加 SoftwareApplication（name/operatingSystem/offers/aggregateRating）+ FAQPage（从页面 FAQ 生成）；博客加 Article。

**G5. 分析监测未启用**
- 现状：`hasExternalScripts=false`，GA id 为 null → 无任何流量/转化数据。
- 影响：无法判断什么关键词带来下载，无法迭代（违反体系闭环）。
- 补足：启用 GA4（改 config + hasExternalScripts），埋 `download_click` 事件；连接 GSC。

**G6. 两个 app 无落地页**
- 现状：DeliSeek 只有 travel-china.astro（不含 DeliSeek 品牌、非下载导向）；VocalTrans 全站无页面。
- 影响：两个 app 失去自然搜索入口。
- 补足：新建 DeliSeek 落地页（/homes/deliseek）与 VocalTrans 落地页（/homes/vocaltrans），按 §3.2 结构。

**G7. About/品牌页被排除且无内容**
- 现状：about/services/pricing 存在于源码但被 sitemap 排除，导航中注释掉。
- 影响：无 E-E-A-T 的"创作者/公司背景"页，YMYL 和品牌可信度弱。
- 补足：写真正的 About（团队、理念、联系方式）、Privacy/Terms 已有；重新纳入 sitemap。

**G8. 博客与落地页内链不足**
- 现状：22 篇文章中仅 2 篇内链到落地页（Hub-Spoke 未形成）。
- 影响：权重无法汇聚到转化页，博客流量难转化为下载。
- 补足：每篇文章加 1 个描述性锚文字到对应落地页 + 相关文章互链；落地页加"相关博客"区。

**G9. 关键词—URL 对应表缺失**
- 现状：无每个核心词对应的目标页面规划。
- 影响：关键词无明确落点，易内部竞争。
- 补足：按 §2.4 建立每 app 的"关键词→URL"表，新增内容按表选题。

**G10. 外链/链接诱饵为零**
- 现状：无外链建设痕迹，无工具类链接诱饵。
- 影响：新站权重积累慢，收录/排名受限。
- 补足：按 §7 做 1 个线上工具诱饵（如网页版 Timer / 图片去重预览）+ 目录提交 + Product Hunt。

### 11.3 优先级排序（90 天）

| 优先级 | 差距 | 理由 |
|---|---|---|
| P0（第 1 月） | G2、G3（title/meta 修复）、G5（GA 启用）、G4（schema） | 低投入、立即可见、影响收录与展示 |
| P0 | G6（补两个落地页） | 打开流量入口 |
| P1（第 2 月） | G1（关键词清洗+集群）、G8（内链）、G9（URL 对应表） | 内容体系地基 |
| P1 | G7（About 页） | E-E-A-T |
| P2（第 3 月） | G10（外链/诱饵）、内容节奏 | 放大增长 |

---

## 12. 免责与时效

- 关键词数据（搜索量/竞争度）会随时间变化；本架构中的示例词来自现有 ASO 数据，发布前用 GSC/工具复核。
- 算法（Panda/Penguin/有用内容更新）持续演进，重点关注 E-E-A-T 与真实体验。
- 本架构聚焦自然搜索；ASO（商店内）优化另按 App Store/Play 规范执行。
