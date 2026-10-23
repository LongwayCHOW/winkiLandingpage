# Winki 全站 SEO 诊断报告

> 审计日期：2026-10-23（本地时间；部分 HTTP 响应的 UTC 日期为 10 月 22 日）。
>
> 审计对象：`https://winki.win/`、当前仓库源码、生产构建、`docs/ASO 数据.xlsx`。
>
> 代码基线：`7cc8aca5b2b575d4bfdd5a19d3586c23d6526ec8`。
>
> 本次只诊断和交付文档，没有修改业务代码、线上配置或商店信息，没有提交或推送。

## 阅读顺序

1. 先读第 1～4 节，了解结论、证据边界与优先级。
2. 技术执行看第 5～8 节；内容和增长执行看第 9～14 节。
3. 将 [AI 执行任务书](./seo_optimization_tasks_2026_10_23.md) 连同本报告交给执行 AI。
4. 全量附件：[216 个 HTML 页的 URL 清单](./seo_url_inventory_2026_10_23.csv)、[2,667 条原始关键词记录](./seo_keyword_source_2026_10_23.csv)。

---

## 1. 核心结论

**目前更像是“技术基础基本可用，但品牌可信度、搜索意图匹配、产品事实管理和转化路径没有形成闭环”，而不是 GitHub 推送到 Cloudflare 的部署方式本身导致 SEO 差。**

Astro 的静态 HTML、Cloudflare Pages、GitHub 自动部署可以正常承载 SEO。没有必要为了 SEO 迁移 WordPress、Next.js、服务器渲染或更换域名。现有根路径博客和 `/homes/<app>/` 路径也不需要整体迁移。

最值得先投入的工作：

1. **清理公开的模板内容。** 首页 FAQ 仍是无关影视台词；联系页仍有虚构地址；另有 13 个模板页面可索引。
2. **纠正不准确或互相矛盾的产品与旅行说明。** 比“多放几个关键词”更重要。
3. **修复下载路径与品牌实体。** 首页产品卡片没有产品页链接，通用 Download 指向 GitHub；AiTrans 没有自己的落地页，VocalTrans 与 AiTrans 的关系不清。
4. **重新解释关键词数据。** Excel 的广告竞争度不是 SEO 难度，大量高量泛词不适合这个站点。
5. **补齐内容与产品页的双向正文链接。** 21 篇已发布文章中 14 篇没有正文产品页链接；8 个产品页都没有正文相关文章入口。
6. **建立可验证的测量和发布质量门。** GA4 已启用，但没有找到 `download_click` 实现，无法确认自然搜索到底带来了多少商店访问。

**不应优先做：** 批量生产几十篇 AI 泛文、给每个分钟数建立薄页、购买外链、复制商店评分进 schema、盲目增加 FAQ/HowTo schema、为了“新鲜度”改日期、把所有旧 URL 重定向首页。

## 2. 28 天数据能说明什么

用户提供：展示 1,237 次，点击 19 次。

| 指标     | 计算结果               | 解释                               |
| -------- | ---------------------- | ---------------------------------- |
| 整体 CTR | 19 / 1,237 = **1.54%** | 是观察值，不等于已经证实“标题很差” |
| 日均展示 | 44.2                   | 搜索可见规模仍小                   |
| 日均点击 | 0.68                   | 不适合拆成大量小样本 A/B 实验      |

目前缺少查询、页面、排名、设备、国家和趋势明细，不能确定低点击主要来自：

- 未收录或抓取问题；
- 已收录但排名靠后；
- 曝光在错误的搜索意图下；
- 非品牌词覆盖少；
- 排名不错但摘要吸引力不足；
- 搜索结果本身有即时答案、工具、广告或其他无需点击的结果。

**优先导出 GSC 的最近 28 天、前一个 28 天、最近 3 个月及可用的历史数据。** 记录确切起止日期和搜索类型。分别导出 Queries、Pages、Countries、Devices、Search appearance，再对核心落地页提取查询明细。

以相近国家、设备、排名区间的“查询 × 页面”为单位比较 CTR。不要拿全站 1.54% 与网上的通用行业 CTR 表直接判优劣；更不要把商店 CVR 当成网站 CTR。

仅作算术说明：如果展示维持 1,237，CTR 从 1.54% 变为 3%，点击约为 37 次。即使 CTR 翻倍，绝对访问仍有限，因此需要同时改善相关曝光和下载转化。**这不是增长预测。**

## 3. 范围、方法与证据边界

### 3.1 已完成

- 读取站点配置、布局、SEO 组件、导航、全部产品页和全部博客的结构与链接信息。
- 解析 Excel 的 16 个工作表，包括 8 个产品规划表和 8 个关键词表。
- 执行生产构建，输出至临时目录，未覆盖项目原 `dist`。
- 构建成功：**215 个 Astro 页面**；计入复制的 Decap CMS 页面后，共 **216 个 HTML 文件**。
- 对这 216 个 HTML 提取 title、description、canonical、robots、H1/H2、JSON-LD、图片和正文链接。
- 对线上 sitemap 中 **44 个 URL 全部执行 HTTP GET**；额外测试 16 个路径，共 60 个页面请求。
- 另外检查 HTTP/HTTPS、www、尾斜杠、`index.html`、UTM URL、旧模板文章、AiTrans 路径和 Partytown 资源。
- 抽验 15 个商店链接：9 个 Google Play 链接、6 个 Apple 链接。
- 浏览器抽查首页与旅行页，检查 DOM、桌面可见性及页面结构。
- 执行 `npm run check`：Astro 为 0 errors / 0 warnings / 5 hints；ESLint 通过；Prettier 在 **22 个既有文件**上失败。
- 查阅 Google Search Central、Google Ads、Cloudflare、Apple 和中国国家移民管理局的官方资料。

### 3.2 没有获得的数据

没有访问 GSC、GA4、Cloudflare 控制台、App Store Connect、Play Console 或付费外链数据库。没有真实用户 CrUX 数据，没有覆盖所有移动设备、所有目标国家及所有外部资源。

公开 PageSpeed API 返回 **429 配额不足**，所以本报告**不提供伪造的 Lighthouse 分数、LCP、INP 或 CLS 实测值**。

浏览器检查是桌面抽查，不等于全站移动端验收。全量本地链接检查覆盖 `<a href>` 的站内路径是否有构建目标，不涵盖所有 JS 按钮、二维码内容、外站资源和地区限定商店可用性。

初次 Python 默认 HTTP 客户端访问 sitemap 得到 403，换用 curl 后正常得到 200。**这不足以判断 Googlebot 被拦截**，也不能断言一定是 Cloudflare WAF，需看安全日志与 GSC 实时测试。

### 3.3 结论标记

- **已证实：** 源码、构建产物、线上 HTTP 或明确官方文档直接支持。
- **高可信判断：** 信息架构或内容策略分析，但尚无 GSC 数据验证其流量贡献。
- **待验证：** 需要后台、目标地区设备、用户行为或开发者确认。

“可索引”不等于“Google 已收录”；“存在 SEO 缺陷”不等于“已经证明它造成了多少流量损失”。

## 4. 问题总表

P0 表示本轮必须先处理的基础问题，不代表已发生全站索引灾难。P1 为随后修复，P2 为数据支持后的增长优化。

| ID  | 优先级 | 问题与证据                                                          | 主要影响                       | 判断                         |
| --- | ------ | ------------------------------------------------------------------- | ------------------------------ | ---------------------------- |
| F01 | P0     | 首页 FAQ 为无关台词；联系页写模板销售和 Night City 虚构地址         | 可信度、内容相关性、转化       | 已证实                       |
| F02 | P0     | 13 个模板路由返回 200、`index,follow`，仅从 sitemap 排除            | 无用索引入口、错误品牌信息     | 已证实                       |
| F03 | P0     | 旅行页仍写 72/144 小时过境免签；静态汇率标 Live Rate                | 信息时效性、旅行与支付决策安全 | 已证实                       |
| F04 | P0     | 产品平台、备份/同步、清缓存、翻译准确性等说明需统一                 | 产品信任、转化、事实质量       | 部分矛盾已证实，能力待确认   |
| F05 | P0     | 主导航 Download 指向 GitHub；首页正文没有 8 个产品页链接            | 访客路径和转化                 | 已证实                       |
| F06 | P0     | GA4 已开启但没有找到下载事件；JS 下载按钮缺原生 href                | 可测量性、无 JS 可用性         | 代码已证实，后台收数待验证   |
| F07 | P1     | 8 个真实产品页输出相对 canonical 和相对 `og:url`                    | 多域名规范化稳健性             | 已证实；不等于 Google 不识别 |
| F08 | P1     | sitemap 含 `/blog/2/`、`/blog/3/`、`/blog/4/` 三个 noindex 页       | 索引信号一致性                 | 已证实                       |
| F09 | P1     | www 子域两次测试返回 525                                            | 域名变体访问失败、外链到达     | 已证实；影响规模未知         |
| F10 | P1     | 14/21 篇文章无正文产品页链接；8/8 产品页无相关文章正文链接          | 用户探索、主题关联、转化       | 已证实                       |
| F11 | P1     | 21 篇文章以故事/更新为主，教程与任务解答不足；多篇旧文类似产品介绍  | 非品牌搜索需求覆盖             | 高可信判断                   |
| F12 | P1     | 首页 title 长列表；两篇文章重复 `Winki`；多页复用全局 description   | 搜索摘要质量                   | 已证实                       |
| F13 | P1     | AiTrans 有独立 Play 商店页，站内指定路径 404；同时存在 VocalTrans   | 品牌一致性与新增入口           | 已证实；品牌关系待确认       |
| F14 | P1     | About 不是真实开发者页；文章作者多数只有 Winki Team 纯文本          | 来源透明、信任                 | 已证实                       |
| F15 | P1     | Focus One 故事把“本产品没做”写成“iOS 完全不允许屏蔽 App”            | 技术内容准确性                 | 已证实                       |
| F16 | P1     | 关键词表广告 Competition 被用作 SEO 竞争解释，且数据缺地区/日期     | 错误选题和投入方向             | 已证实                       |
| F17 | P2     | 8 个应用 schema 缺 review/aggregateRating，不满足软件富结果完整条件 | 富结果资格，不影响普通收录资格 | 已证实                       |
| F18 | P2     | 没有文章、面包屑、品牌实体 schema；FAQ 富结果预期不适用             | 机器理解与展示机会             | 已证实                       |
| F19 | P2     | 构建 157 个 noindex 标签页；存在 15,904w 图片变体                   | 维护和资源效率                 | 已证实；非已证实抓取预算瓶颈 |
| F20 | P1     | 文档落后于代码，现有质量门未拦住 SEO 内容问题                       | 后续 AI 重复或错误优化         | 已证实                       |

---

## 5. 技术 SEO 与 Cloudflare

### 5.1 正常项：应保留

| 检查项                    | 本次观察                                               |
| ------------------------- | ------------------------------------------------------ |
| 主域名 HTTPS              | 首页及 44 个 sitemap URL 全部返回 200                  |
| robots.txt                | 200，`User-agent: *`、`Allow: /`，声明 sitemap         |
| sitemap-index / sitemap-0 | 均正常；URL 使用 HTTPS 主域名及尾斜杠                  |
| 静态正文                  | 内容存在于构建 HTML，不需要先执行 JS 才能拿到正文      |
| H1                        | 44 个 sitemap 页面均有一个 H1                          |
| 未知路径                  | 测试随机不存在路径返回真实 404，不是首页 200           |
| 六篇 AstroWind 示例博客   | 源码均已 `draft: true`；抽查旧文路径返回 404           |
| 标签页                    | 配置 noindex，抽查线上符合；已排除 sitemap             |
| 站内链接目标              | 本地 HTML 的站内 `<a href>` 路径检查未发现缺失构建目标 |
| Partytown JS              | 线上资源返回 200，不能据此推断 GA 数据正常             |

不要重复执行旧文档中“启用 GA、创建 DeliSeek/VocalTrans 页、给所有产品首次加 schema、隐藏六篇模板文章”等已经完成的任务。

### 5.2 模板页面治理：不能只改 sitemap

以下 **13 个 URL 在线可索引**：

```text
/about/
/services/
/pricing/
/homes/mobile-app/
/homes/personal/
/homes/saas/
/homes/startup/
/landing/click-through/
/landing/lead-generation/
/landing/pre-launch/
/landing/product/
/landing/sales/
/landing/subscription/
```

证据：`astro.config.ts` 的 `sitemap.filter` 只决定 sitemap 内容，不改变路由生成和页面 robots。`/homes/mobile-app/` 甚至输出了 `Your App Name` 软件和 FAQ 结构化数据。

处理原则：

- `/about/` 原路径重写为真实开发者介绍，再纳入 sitemap 与导航。
- 无业务用途的模板移出 `src/pages/`，放到非路由模板目录；不要让参考模板成为公开页面。
- 确认没有需要保留的业务用途、外链和搜索流量后，移除的路径返回 404；只有真实等价替代页才做 301/308。
- 暂时不能移除的演示页可设置 `noindex,follow` 并排除 sitemap，但长期应减少无用线上页面。
- 不要先用 robots.txt 禁止抓取再期待搜索引擎读取 noindex；不要批量 canonical 到首页。
- `public/decapcms/` 已 noindex。若仍使用，另行检查认证；robots 不是权限控制。

### 5.3 canonical 与 URL 一致性

**证据链：**

`src/pages/homes/chronicle.astro:31,45-48` 使用 `getPermalink(Astro.url.pathname)` 作为 `app.url`，再赋给 canonical 和 Open Graph URL。其他 7 个真实产品页同样如此。

实际 HTML：

```html
<link rel="canonical" href="/homes/chronicle/" />
```

Google 支持相对 canonical，但官方推荐绝对 URL，避免测试域名等环境下的长期问题。[S3]

实施建议：

- 路由链接继续使用 `getPermalink`；SEO URL 使用 `getCanonical` 或统一的绝对 URL 规范化函数。
- canonical、`og:url`、JSON-LD 的页面 URL 均使用 `https://winki.win/.../`。
- 不要盲目删除查询参数：本项目用于跟踪的 UTM 可以不进入 canonical；未来真实改变内容的参数需单独判断。
- 现有尾斜杠策略保留，图片 endpoint `/_image/` 的修复也保留。
- 不为了关键词更短而迁移全部根路径文章，收益未证实却会增加迁移风险。

**更正旧说法：** 301/308 不意味着“Google 无法读取”。Google 能处理永久重定向。这里的目标是让内部链接、canonical 和 sitemap 直接指向最终 URL，减少不必要跳转，而不是声称重定向会让站点无法收录。

### 5.4 sitemap、分页和标签

- 当前 44 个 sitemap URL 中，3 个博客分页为 noindex；其余 41 个未声明 noindex。
- 当前博客分页已正确使用自身 canonical，**不要把第 2～4 页 canonical 到第 1 页**。
- 可选策略 A：分页保留 noindex，从 sitemap 去掉，保证每篇文章仍能通过产品、分类、首页列表等正常链接发现。
- 可选策略 B：让有用分页可索引、保留自身 canonical；需同时定义未来分页策略。
- 本站优先选 A，改动较小；问题不是“分页 noindex 必定有害”，而是发布规则必须一致。
- 六个 category 页可以先保留，补分类介绍、主产品入口和精选教程；不要仅因文章少就一律删除或 canonical 到产品页。
- 157 个标签页已 noindex，不是急需“拯救抓取预算”的证据。清理 `rid`、`minus`、`sonically` 等面向关键词堆词而非用户导航的标签，是维护优化。
- sitemap 缺 `lastmod` 不会阻止收录。有可靠内容更新时间后再添加，不能每次构建都改成当天；Google 忽略 `priority`、`changefreq`。[S4]

### 5.5 www、预览域名与机器人

`https://www.winki.win/` 两次请求均返回 **525**，主域名正常。需要在 Cloudflare 检查 www 的 DNS、Pages 自定义域名和 SSL 状态，配置永久跳转到主域名，保留路径与查询参数。

不能仅凭 525 确认底层具体配置错误，也不能说它解释了主域名全部低流量。

另外人工核查：

- `*.pages.dev` 生产别名与预览域名是否暴露可索引副本。Cloudflare 默认对预览 URL 加 `X-Robots-Tag: noindex`，仍需实测；生产 pages.dev 别名不要直接假定同样被保护。[S5]
- 不要对生产域名全局加 `X-Robots-Tag: noindex`。
- 用 Cloudflare Security Events 与 GSC URL 实时测试核查 verified Googlebot/Bingbot，不把伪造 UA 的测试当真实 Googlebot。[S6]
- 不要为了 SEO 关闭全站 WAF；只处理被证实误伤的规则。
- 当前 `/_astro/*` 长缓存适合带内容哈希的资源；不要给 HTML、robots、sitemap 套一年 immutable。
- DNS、robots 和 sitemap 均不是“保证收录”的开关。

## 6. 首页、品牌与信任

### 6.1 首页必须从模板展示改成产品目录

位置：`src/pages/index.astro`。

已发现：

- title 为 141 字符的品牌加关键词长列表。
- Hero 中有残留 `CSS.`，移动端文案 `Winki: Production-ready.` 与应用产品无关。
- `Our Apps` 只有名称和描述，**首页 `<main>` 中没有任何指向 8 个真实产品页的链接**。导航和页脚有链接，因此不是完全孤儿页，但正文任务路径缺失。
- FAQ 中出现 Michael Knight、Starship Enterprise 等无关台词，以及不适合产品网站的句子。
- 大量泛化场景图，无法直接说明 App 长什么样、怎么用。

建议首页信息结构：

1. 一句品牌定位及“浏览应用”入口。
2. 8 个已确认产品的卡片；AiTrans 是否作为第 9 个或替换 VocalTrans，先确认关系。
3. 每卡片包含真实名称、用途、当前平台、产品页原生链接。
4. 按需要分组：专注与规划、照片与日常工具、宠物互动、旅行。
5. 真实开发者简介和产品原则。
6. 少量真实 FAQ：平台、付费方式、支持渠道、数据处理，不能一概把所有 App 描述为完全相同。

候选首页 title：`Winki | Small Apps for Everyday Life`。这是文案起点，不是必须照搬的排名公式。

### 6.2 联系、About、法律页面

位置：`src/pages/contact.astro`、`about.astro`、`privacy.md`、`terms.md`。

- Contact 删除模板购买、模板安装支持和虚构地点；保留真实邮箱，使用 `mailto:` 原生链接。
- About 写明真实开发者身份、产品经历、所在地披露范围、支持渠道、公开发布记录；不编团队规模、奖项、客户数量或地址。
- `Winki Team` 并非错误，但缺少可核对的作者背景。为文章作者提供真实简介及 About 链接；不强制每篇都创建独立作者页。
- Privacy 写着 2024-03-18，列出中国服务器、Aurora、HealthKit、实名注册等广泛数据处理条款；与“local-first”定位可能不一致。**不能据此认定实际违规，也不能让 AI 猜测实际数据流。**
- 开发者应按“网站分析”与“每个 App 的权限、SDK、订阅、备份、数据删除”分别确认，再由适当的合规人员审核文案。
- 不得把“删除 App”等同于所有远端账户数据已删除，除非系统事实确实如此。
- Terms/Privacy 目前只枚举六款产品，补核 DeliSeek、VocalTrans、AiTrans 的适用范围。
- 飞书法律文档属于外部依赖，本次没有读取其内容或验证匿名访问。后续按飞书专用工具核查权限，并考虑经审核后在站内提供权威版本，避免多份条款冲突。

这些首先是用户信任与产品准确性问题，不能承诺“补 About 就会提高排名”。E-E-A-T 不是一个可直接配置的排名分数。[S2]

## 7. 产品事实与结构化数据

### 7.1 先建立产品事实表

建议新建显式维护的数据文件，例如 `src/data/apps.ts`，作为平台、商店 ID、定价边界、功能状态和相关内容的单一来源。**不是要求重构所有组件**，先解决分散信息互相冲突。

每款产品至少记录：

- 标准品牌名、旧名、标准产品页 URL、支持平台与区域。
- 当前商店 URL、包名/ID、当前版本及核验日期。
- 免费范围、订阅/IAP、地区定价说明。
- 已发布功能、测试功能、计划功能、明确不支持的功能。
- 离线前置下载、权限、硬件要求、数据处理与备份方式。
- 真实截图和演示的版本、来源。
- 事实审核者、证据链接；未知项保留 unknown，不由 AI 补全。

### 7.2 已发现的具体事实风险

| 产品                 | 证据                                                                     | 应采取的动作                                                                    |
| -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Aesthetic Calculator | FAQ 说 Android planned；同页按钮和 schema 说 Android；Play 页面已能访问  | 统一平台状态；核实“hundreds of themes”、pro math、widget 是否真实               |
| Chronicle            | FAQ 同时说 cloud backup later 和 timeline syncs across devices           | 区分本地数据、备份、跨设备同步、计划功能；明确当前版本能力                      |
| Photo Swipe Cleaner  | FAQ 说人工发现重复；正文写 duplicate finder、clear cache、junk optimizer | 明确人工筛选而非自动去重；无实际能力则删除系统清缓存表述                        |
| Photo Swipe Cleaner  | “wrong swipe is never permanent”等安全承诺                               | 写清确认删除、App 内撤销、系统 Recently Deleted、iCloud 同步删除的边界          |
| MeowTalkie           | FAQ 说 works for all cats；其他故事承认反应存在差异                      | 改为反应因个体而异；不把声音播放包装为可靠语言翻译                              |
| Flip Timer           | hands-free、HIIT/Tabata、手势规则与多场景混用                            | 以实机确认支持的手势、循环、后台/锁屏行为和设备要求；区分不触屏与完全不接触手机 |
| Focus One            | ADHD 支持效益有较强措辞                                                  | 定位为辅助专注工具，不做诊断、治疗或临床效果承诺                                |
| DeliSeek             | 素材写 beta、数据纠错仍在探索；落地页承诺地图、菜单翻译、出租车卡等      | 按当前版本逐项核实，写明城市覆盖和资料核验日期                                  |
| VocalTrans / AiTrans | 两个名称与包名均有 Play 页面；旅行页推广 AiTrans，导航仍 VocalTrans      | 先确认是否不同产品、重命名或迁移；不得擅自合并、改包名或重定向                  |
| 翻译产品             | “top-tier”“perfect translation”“verify meaning is correct”               | 反向翻译不是准确性保证；补离线模型下载、支持语言和医疗/过敏等高风险场景限制     |

Apple 六个 URL 在本次网络环境中都跳转到 `https://apps.apple.com/cn/iphone/today`，不是目标产品页。因此本次**不能确认 iOS 链接在美国等目标市场正常，也不能断言 App 已下架**。必须用目标地区设备和 App Store Connect 核实。

### 7.3 schema 已有，但预期与建模需要修正

位置：`src/components/common/AppSchema.astro`。

现状：

- 8 个真实产品页均有 `SoftwareApplication + FAQPage`。
- 加上模板页后，构建共有 9 个 SoftwareApplication、9 个 FAQPage。
- Travel 页有 `TravelGuide`，这不是 Google 独立承诺支持的富结果类型。
- 21 篇正式博客没有 Article/BlogPosting JSON-LD。
- 没有统一 WebSite / Organization（或真实 Person）/ BreadcrumbList。
- 软件名称通过品牌拼接关键词，例如 `Aesthetic Calculator: aesthetic calculator`，没有必要。
- 软件全部默认 `UtilitiesApplication` 和价格 0；应基于真实类别和下载收费方式，而非所有产品统一默认。
- `appleAppStoreId` / `googlePlayAppStoreId` 不应当成标准可识别的下载字段；优先使用 `identifier`、`installUrl`、适当的 `offers.url` 等，并用 Schema Markup Validator 核验当前词汇。
- 软件图片已在构建中解析成可用形式，不应重复诊断为全部 alias 图片坏链。

**关键规则：**

1. Google 软件富结果需要 name、offers.price，以及 review 或 aggregateRating；当前缺少评价字段，所以不能说已满足完整富结果资格。[S7]
2. 这不影响普通搜索结果的索引资格，也不应该为了“全绿”伪造评分。
3. 评分必须符合当前评论规范、来源和页面可见内容；不能默认把 App Store/Play 的聚合星级复制过来就合规，也不能混合两个商店的评分数。没有合规评价来源时宁可不做评分富结果。[S8]
4. FAQ 富结果仅限符合要求的权威政府/健康网站。Winki 不是因为有 ADHD 页面就符合条件。FAQ 可用于解答疑问，但**不要把增加 FAQ schema 当作显著提升 CTR 的主要策略**。[S9]
5. 对文章添加 BlogPosting 时，使用真实 author、headline、image、datePublished、dateModified、mainEntityOfPage；不要因为构建更新而重写文章时间。
6. Organization/Person/schema 只表达真实实体，不制造办公室、团队或媒体背书。
7. BreadcrumbList 要对应用户可见的路径，例如 Home → Apps/产品 → 指南；不要伪造不存在的 `/apps/` 页面。
8. JSON-LD 的正确语法、schema.org 词汇有效性、Google 富结果资格是三层不同检查。

## 8. 下载转化、统计与体验

### 8.1 下载路径

`src/navigation.ts:67` 的通用 Download 指向 GitHub 仓库。建议改成首页应用目录锚点或真实应用集合入口，不应诱导用户去源码仓库下载手机 App。

`src/components/widgets/AppDownload.astro:84-100,106-115` 无论有没有 URL 都输出 button，再用 `window.open` 跳转；注释和项目记忆中所谓“自动切换 a/button”**与实际代码不符**。

改进：

- 有真实商店 URL 时用 `<a href>`；二维码切换才使用 button。
- 不支持的平台不显示可点击按钮；不要让没有二维码、没有 URL 的按钮留下空操作。
- 有直接链接时文案不要仍只写 `Scan to Download`。
- 二维码是桌面辅助入口，不能是手机访客唯一下载方式。
- 保留无 JS 的下载路径、键盘访问和明确的 accessible name。
- 旅行页第三方 App 卡片目前只传二维码，缺直接商店链接；逐个确认目标，不猜包名。
- 不点击或测试真实收款二维码，不进行付款。

### 8.2 GA4 现状与实施方式

`astro.config.ts:19` 为 `hasExternalScripts = true`；`src/config.yaml:68-70` 有 GA4 ID；`Layout.astro` 有 Partytown 和主线程 gtag 包装。

**已启用脚本不等于事件正确到达。** 浏览器看到 Partytown 资源加载，但没有后台 DebugView 权限，且 Worker 请求不一定完整出现在页面 Performance API 中，不能因此断言收不到数据。

应实现并验证：

| 事件                 | 触发                 | 建议参数                                              |
| -------------------- | -------------------- | ----------------------------------------------------- |
| `app_view`           | 打开产品落地页，可选 | `app_id`、`page_type`                                 |
| `product_page_click` | 首页/文章前往产品页  | `app_id`、`source_page`、`placement`                  |
| `download_click`     | 真正点击商店链接     | `app_id`、`platform`、`placement`、`destination_host` |
| `qr_reveal`          | 展示二维码           | `app_id`、`platform`                                  |
| `support_click`      | 点击支持邮箱         | `app_id`（有则填）、`page_type`                       |

不要把 `qr_reveal` 或 `download_click` 命名为已安装。商店打开不等于下载或首次启动。

Astro ClientRouter 下应特别测试：首次加载、客户端切页、返回上一页各记录一次 page_view；下载点击也不能因 `setupAppCards()` 和 `astro:page-load` 重复绑定而重复计数。当前组件同时直接初始化和监听 page-load，有重复注册隐患，需要实测和幂等初始化。

归因注意：

- 内部链接不要追加 UTM，避免污染会话来源。
- Google Play 的 referrer 与 App Store campaign 参数按各平台官方方案分别配置，不能假设一套 UTM 能证明两端安装。
- 连接 GSC 与 GA4，保留各自口径；不同平台数字本来就不应强行对齐。
- 法规适用范围由业务确认；根据目标地区实施同意管理，不把“启用 GA”默认等同于无需同意。
- 不采集日记内容、照片信息、翻译文本或个人健康资料作为营销参数。

### 8.3 性能与移动端

没有实测 CWV 结果，以下是**源码和资源层面的风险清单**：

- `Hero.astro`、`Hero2.astro`、`SinglePost.astro` 的桌面主内容初始有 `opacity-0`，依赖 IntersectionObserver 动画。首页正常 JS 下最终 H1 opacity=1，但应确保无 JS/脚本异常时内容仍可见。
- 首屏图片已 eager，不要统一改为 lazy；按实际 LCP 元素决定是否添加 `fetchpriority="high"`。
- 博客头图 `sizes="(max-width: 900px) 400px, 900px"` 可能与平板真实显示尺寸不匹配，需用 currentSrc 和渲染宽度验证。
- `meowtalkie-shy-cat-story` 的正文图片输出 width=7952、最高 **15904w** 的 srcset；最大 WebP 约 3.0 MB，源 JPG 约 3.57 MB。应限制正文实际需要的宽度及变体数。
- **上述是构建资源大小，不代表每个手机用户下载了最大变体。** 要看浏览器选中的 currentSrc。
- `AppDownload` 和旅行页多处原生 img 没有显式 width/height 或 loading；CSS 固定盒子可能已稳定布局，仍需实测，而非直接判定发生 CLS。
- 旅行页有大量 8～11px 文本、跑马灯以及强制 light mode；需检查字号、对比度、reduced-motion 和导航返回后的主题行为。
- 产品页大量重复库存图与功能关系弱；真实产品截图优先，不用生成图冒充真实 UI、用户评价或测试结果。

验收使用真实数据的 p75：LCP ≤2.5s、INP ≤200ms、CLS ≤0.1；这是目标，不是本次测量。[S10] 数据不足时做移动端实验室测试和必要的轻量 RUM，Lighthouse 分数不是排名分数。

## 9. Excel 诊断：哪些数据能用

### 9.1 数据规模

| 关键词工作表             | 有数值月搜索量的记录数 |
| ------------------------ | ---------------------: |
| Aesthetic Calc 关键词    |                    109 |
| MeowTalkie关键词         |                    127 |
| focusOne 关键词          |                    225 |
| Flip Time 关键词         |                    468 |
| PhotoSwipeCleaner 关键词 |                    309 |
| Chronicle关键词          |                    550 |
| DeleSeek关键词           |                    620 |
| VocalTrans关键词         |                    259 |
| 合计                     |              **2,667** |

跨表按 trim + lowercase 去重后有 **2,512** 个词。附件保留重复来源，便于追溯，不把重复词的量相加。

Aesthetic 关键词表的前几行还有散落的范围式词条和笔记，没有混入结构化数值记录计数。产品规划表中的长尾建议也不是带有独立实测量的数据。

### 9.2 三个必须更正的解释

**第一，广告竞争不是自然搜索竞争。**

字段 `Avg. monthly searches`、`Competition`、`Competition (indexed value)`、`Top of page bid` 与 Keyword Planner 数据形式一致。Google 官方定义 Competition 为广告主竞争，与自然结果中的网站竞争并不等价。[S1]

例如 `focusOne!F4` 用 “Pomodoro Timer 50k、4 竞争” 推导“竞争低、必须覆盖”，这个自然搜索优先级推导不成立。

**第二，搜索量不是可获得流量。**

表里大量 50 / 500 / 5,000 / 50,000 / 500,000 / 5,000,000 的档位数值，以及 Aesthetic 表头范围值，说明必须把它们视为粗粒度历史估计。Google 也说明搜索量存在取整并受地区、时间、网络与近似变体影响。不能拿宽范围中点精确计算收益。

**第三，数据存在时间与来源空缺。**

`MeowTalkie关键词!A1` 明确写的是 **2024-09-01 至 2025-08-31**，不是最近 28 天。其他关键词表没有明确记录相同日期或目标地区，不能擅自套用这个周期。Excel 文件的保存日期也不等于关键词统计日期。

### 9.3 原始词样例与正确用途

所有量和竞争指数均为表内原值，不是本报告重新查询的当前量。

| 原始位置                             | 关键词                           |  表内月量 | 广告竞争指数 | 网站策略                                               |
| ------------------------------------ | -------------------------------- | --------: | -----------: | ------------------------------------------------------ |
| `Aesthetic Calc 关键词!A6:F6`        | calculator                       | 5,000,000 |            2 | 泛工具即时需求，不作首页主攻词                         |
| `Aesthetic Calc!G6`                  | aesthetic calculator with themes |  无独立量 |           无 | 与功能匹配的候选长尾；验证后用于产品页                 |
| `MeowTalkie关键词!A72:F72`           | cat sound                        |    50,000 |            1 | 用户可能想立即听声音；可做授权声音演示，不仅是下载广告 |
| `MeowTalkie关键词!A74:F74`           | cat translator                   |    50,000 |           23 | 需澄清不是真实语言翻译；不做虚假能力承诺               |
| `MeowTalkie关键词!A91:F91`           | cat communicator                 |     5,000 |           18 | 产品页次级词，需真实表达                               |
| `MeowTalkie关键词!A124:F124`         | cat sounds soundboard            |        50 |            0 | 功能匹配好，低量也可有用                               |
| `focusOne 关键词!A63:F63`            | pomodoro timer                   |    50,000 |            4 | 广泛词；先攻 App/单任务差异化，非直接推定易排          |
| `focusOne 关键词!A83:F83`            | adhd timer                       |     5,000 |           84 | 需验证实体计时器与 App 意图，谨慎健康措辞              |
| `focusOne 关键词!A208:F208`          | study timer app                  |       500 |            5 | 与产品页匹配的候选词                                   |
| `Flip Time 关键词!A353:F353`         | hiit timer                       |     5,000 |            7 | 仅在产品真实支持训练间歇流程时承接                     |
| `Flip Time 关键词!A422:F422`         | hiit timer app                   |       500 |           17 | 功能匹配优先于量；与 Focus One 分工                    |
| `PhotoSwipeCleaner 关键词!A258:F258` | iphone photo cleaner             |       500 |           76 | 产品页或清理教程；先验证 iOS 功能                      |
| `PhotoSwipeCleaner 关键词!A240:F240` | free duplicate photo cleaner     |       500 |           69 | 自动去重意图风险；人工清理不能伪装自动扫描             |
| `PhotoSwipeCleaner 关键词!A271:F271` | photo cleaner swipewipe          |       500 |           39 | 竞品品牌；只能用于真实对比，非冒名落地页               |
| `Chronicle关键词!A499:F499`          | journal app free                 |     5,000 |           27 | 适合产品页，需明示免费限制                             |
| `Chronicle关键词!A478:F478`          | day one journal                  |     5,000 |            1 | 竞品导航意图；不是 Chronicle 默认可获得的用户          |
| `DeleSeek关键词!A382:F382`           | china travel guidelines          |     5,000 |           41 | 旅行专题，须真正提供指南并维护时效                     |
| `DeleSeek关键词!A519:F519`           | china travel agency              |       500 |           25 | 不经营旅行社则排除                                     |
| `VocalTrans关键词!A221:F221`         | offline translator app           |     5,000 |           47 | 产品页主候选词之一，需验证品牌关系                     |
| `VocalTrans关键词!A256:F256`         | offline translator german        |        50 |          100 | 不能支持德语时排除，不能因有量补造功能                 |

### 9.4 排除与待验证词

**排除作为本轮目标：** amazon、amazon prime、7 eleven near me、gym、apple、go、how、you、sonically、survivalcraft day one，以及无对应能力的医学诊断、BMI、系统清缓存等词。

**需验证 SERP 和功能：** widget、math solver、app blocker、automatic duplicate finder、Cantonese offline voice translation、HIIT/Tabata、菜单识别。

**不要把 ASO 规则搬到网页：** 网页没有 iOS 100 字符关键词字段的同等机制；Google 不使用 meta keywords 排名；“标题占 60% 权重”等固定公式没有可用于本网站的可靠证据；重复密度不是目标。

产品规划表中的商店表现也不是网站数据：

- Aesthetic `K4=673, L4=0.005, M4=1`，若同口径曝光作分母，三项对不上，需解释曝光/详情访问/下载的口径。
- Focus One 9 次访问、2 次下载等极小样本，不适合用来判定某产品“SEO 转化最好”。
- 不把缺失的 Chronicle、DeliSeek、VocalTrans 下载数据当 0。

## 10. 逐产品关键词与页面策略

以下是**候选路线，不是已验证的当前搜索量或排名保证**。先在目标国家和设备人工检查前排结果类型，再做取舍。保留现有 URL，避免无必要迁移。

| 产品/目标 URL                  | 首要意图与候选词                                                         | 页面需要补的证据                                    | 一篇优先支撑内容                                 |
| ------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------ |
| `/homes/aesthetic-calculator/` | 个性化计算器 App；aesthetic calculator app、cute calculator themes       | 当前真实主题画廊、换主题操作、功能边界、两端状态    | 如何更换计算器主题与配色，附真实截图             |
| `/homes/chronicle/`            | 日历式日记与规划；journal calendar app、journal app with calendar        | 同一时间线展示、免费限制、本地/备份/同步说明        | 日历式日记工作流；升级现有 Day One 对比也可      |
| `/homes/meowtalkie/`           | 声音播放与互动；cat soundboard app、cat sounds app                       | 可试听的授权声音、声音来源、个体反应与停止提示      | 如何安全使用声音播放与宠物互动                   |
| `/homes/photo-swipe-cleaner/`  | 手动滑动清理；swipe photo cleaner、iphone photo cleaner                  | 操作录像、删除确认与恢复流程、权限与存储范围        | 按月清理相册并避免误删的实际步骤                 |
| `/homes/focus-one/`            | 单任务可视化专注；visual focus timer app、study timer app                | 一项任务界面、计时/记录真实状态、非医疗用途         | 单任务专注计时流程，不宣称治疗 ADHD              |
| `/homes/flip-timer/`           | 动作控制计时；flip timer app、motion controlled timer                    | 手势演示、机型支持、后台/锁屏限制、是否支持自动间歇 | 厨房或健身实际动作计时流程                       |
| `/homes/deliseek/`             | 中国本地餐饮发现；china food guide app、find local food in China         | 已覆盖城市、真实地点、菜单功能是否已上线、beta 边界 | 一个真实去过的城市美食路线，注明核验日期         |
| `/homes/vocaltrans/`           | 离线语音翻译；offline voice translator app、offline Cantonese translator | 下载模型后断网测试、语言对、设备与耗时、版本限制    | 飞行模式下完成一次旅行对话的测试指南             |
| `/homes/aitrans/`（待定）      | 品牌实体或新产品承接                                                     | 确认与 VocalTrans 关系后决定独立建页还是迁移        | 使用已有真实旅行与模型选择素材，不复写同一篇泛文 |
| `/travel-china/`               | 行前实操；apps for traveling to China、China travel apps                 | 更新时间、国籍/地区适用边界、支付/联网实操与来源    | 当前先把此页做好，暂不拆多个薄专题               |

### 10.1 两个重要的意图区分

**Focus One 与 Flip Timer：** 前者承接单任务、可视化专注、学习流程；后者承接动作控制、厨房与运动。不要两页都用“1/3/5/10/15/20/30 minute timer”大量占据正文。

本次公开搜索 `15 minute timer` 返回多个直接可运行的在线计时器。这只是一组非固定地区的搜索样本，但与该词“现在就计时”的意图一致。仅展示 App 下载的营销页通常不能完整满足需求。若将来做网页计时器，应真的能计时，先做一个有价值的工具，不是批量分钟数页面。[S19]

**VocalTrans 与 AiTrans：** 两个包名目前都能打开，不应直接推断为同一个 App 改名。确认后：

- 如果是两个产品：分别解释差异、支持语言、模型、平台和用户选择场景。
- 如果确为替代迁移：选择主品牌，更新导航、首页、旅行页和商店说明，再做逐路径的等价永久跳转。
- 如果仍未确认：不生成第二批相同“offline translator”内容，不删除原页。

## 11. 内容审计与内容治理

### 11.1 当前内容供给

正式博客 **21 篇**，另有 **6 篇草稿模板文章**。正式文章分布：Chronicle 5、MeowTalkie 4、Aesthetic Calculator 3、Flip Timer 3、Focus One 3、Photo Swipe Cleaner 3；DeliSeek/VocalTrans/AiTrans 均无对应已发布博客。

主题以开发者故事、产品介绍和更新为主。真实开发经历是优势，但不能把所有用户需求都转换成“Why we built…”。

故事适合提供产品判断依据和第一手证据；教程负责解决任务；对比负责帮助决策；产品页负责确认能力和下载。四者不应只是换一个 title 重复卖点。

### 11.2 正文缺产品内链的 14 篇

```text
aesthetic-calculator-team-notes
aesthetic-calculator-user-story
chronicle-journal-calendar-team-notes
chronicle-journal-calendar-user-story
chronicle-vs-dayone-story
chronicle-whats-new-big-fix-week
flip-timer-team-notes
flip-timer-user-story
focus-one-team-notes
focus-one-user-story
meowtalkie-team-notes
meowtalkie-user-story
photo-swipe-cleaner-team-notes
photo-swipe-cleaner-user-story
```

这些文章仍可能通过页脚链接产品，也可能直接链接商店；结论不是“完全没有链接”，而是缺乏与上下文相关的产品页正文入口。

### 11.3 文章处理建议

| 文章组                                     | 建议                                                                       | 注意                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 六款 App 的旧 team-notes / user-story      | 对照内容识别相似意图；保留独特体验，重写为不同任务，或在证据支持时合并     | 相似标题不等于已证明关键词互相抢排名；先看 GSC 查询重叠                                       |
| 三篇 sensor / swipe / refactor 新故事      | 保留第一手开发过程；减少为关键词而加的重复锚文字，补真实 UI 与使用步骤入口 | 技术故事不一定承担最多下载流量                                                                |
| `why-i-built-focus-timer-screen-addiction` | 更正 iOS 能力绝对判断，区分本产品未实现与系统 API 条件；保留真实取舍       | Apple Family Controls + Managed Settings 能在授权条件下实现限制，不等于任意拦截所有 App [S13] |
| `chronicle-vs-dayone-story`                | 增加事实比较表、适合谁/不适合谁、版本/价格核验时间和开发者利益披露         | 对竞品批评和用户引语需来源；不是编一份客观评分榜                                              |
| `chronicle-new-year-note-and-promo`        | 保留历史文章，核对兑换码是否过期；过期时显著标注活动结束                   | 不把旧活动继续作为当前优惠，也不要仅改年份重发                                                |
| `meowtalkie-update-real-cat-sounds`        | 区分观察、假设和研究结论；引用准确对应观点的来源                           | “dialects”不能以营销故事替代科学证据                                                          |
| `chronicle-whats-new-big-fix-week`         | 加版本号、发布日期、修复前后真实行为和产品页入口                           | 版本更新可短，不需要凑成长文                                                                  |
| 六篇模板草稿                               | 保持不发布；进度看板同步为已处理                                           | 不再创建“删除这些已在线模板文章”的重复工单                                                    |

### 11.4 旅行页需单独修订

`src/pages/travel-china.astro` 的 H1/title 承诺 2026 完整指南，但正文更像 App 和二维码传单：

- 过境免签写 72/144 小时；官方 2026-08-20 公告已经说明扩展后的 240 小时政策及条件。[S14]
- 不应简单全局替换成“所有人 240 小时”。必须说明国籍、口岸、第三国行程、停留区域等适用条件，并链接官方当前规则。
- `Live Rate: 1 CNY = 0.14 USD` 为写死文本，应删除 Live，或显示有日期的参考值；非必要无需引入实时汇率 API。
- 支付测试码必须说明收款方、款项性质、是否真扣款和退款边界。若不能确认，不作为“官方验证”步骤。
- `perfect translation` 不可作保证。
- 补作者/资料核验日期、目录、实际步骤和限制；不是只改年份。
- 增加与真实 DeliSeek 和翻译产品的上下文链接，清楚披露自家产品，不伪装独立推荐。
- 指南应有真实验证方法，不能声称所有二维码“verified”却没有维护记录。

### 11.5 新内容发布标准

每篇先回答：读者要完成什么、现有结果哪里不足、我们有何独有证据、为什么需要独立 URL。

最低证据要求：产品步骤必须对应实际版本；测试给设备、设置、样本和局限；用户引语有授权与来源；竞品信息链接到官方当前说明。

禁止为固定词数、关键词密度、外链数量而写作。标题/description 应简明准确；“50～60 / 150～160 字符”只能作编辑提示，不是 Google 硬性限额。[S2][S11]

合并文章前导出原 URL 查询/点击/外链并保存映射。没有等价内容就不做不相关 301；不会因为两篇都出现同一关键词就自动 canonical。

## 12. 图片、视频、多语言与可访问性

### 图片与视频

- 实际 UI、手势、主题、删除确认和离线测试，比泛化办公图库更能帮助下载决策。
- 优先使用经用户授权的真实素材；图片文件名遵循项目下划线约定，不为了 SEO 批量重命名历史资源。
- ALT 描述图像的实际信息，不把 excerpt 或关键词清单直接塞进去；装饰图用空 ALT。
- 不宣称所有图都必须小于 100KB；按渲染尺寸、可读性和网络测试设预算。
- 如新增演示视频，保证授权、字幕/文字说明、可访问播放；只有符合视频内容和页面要求才加 VideoObject。
- 不生成“真实 App 截图”“真实用户故事照片”作为第一手证据。

### 多语言

目前英语正文配 `lang=en` 合理；没有其他语言版本，所以没有 hreflang 并不是当前缺陷。

先用 GSC 国家/语言线索和商店下载数据选择语言。确认有需求后：

- 采用明确语言路径；每个翻译页自指 canonical。
- hreflang 使用绝对 URL、自包含、双向返回；`x-default` 仅在有合适默认入口时配置。[S15]
- 不把所有翻译页 canonical 到英文页，不强制按 IP 跳转挡住爬虫。
- 翻译支持、定价和能力要按地区校对；别批量建立没有独特内容的语言/城市组合页。
- 若目标包括中国大陆访问，单独实测 Google 服务、外站图片和商店可用性；不能假定 Cloudflare 全球可用就等于大陆所有依赖可用。

### 可访问性

检查 360/390/768/1280px、键盘导航、菜单焦点、二维码状态提示、按钮名称、色彩对比、200% 字号放大与 reduced-motion。可访问性首先服务真实用户；不要把每项 WCAG 检查描述为独立排名因子。

## 13. 外部发现、品牌与 AI 搜索

### 外链与品牌

本次没有外链数据库或 GSC Links 导出，**不能说外链为零**。

建议按实际产品受众开展：

- 商店 Developer Website/Support 链接指向规范产品页或支持页。
- 真实开发者公开主页、开源项目说明和产品发布页保持名称与域名一致。
- 对有实际测试能力的评测者提供完整事实、测试版本和素材，不购买 dofollow 或五星评价。
- 在相关社区解决问题，遵守自荐规则，披露开发者身份，不让 AI 假扮用户推荐。
- 从真实可引用资产切入：传感器兼容记录、离线翻译基准、主题设计细节、照片删除行为说明。
- 付费合作使用合适的 `rel="sponsored"`；不以链接数量或月增速作为硬 KPI。

不要因为 8 个产品横跨类别就立刻拆成 8 个域名。现在多域会增加维护和信号分散；先通过清晰产品目录、独立产品内容和开发者实体解释共同品牌。

### Google AI Overviews / AI Mode

本次查阅了 Google 当前的 AI features 文档及生成式搜索优化指南。其核心仍然是可抓取、可索引、有用的独特内容、清晰技术结构与真实来源。[S16]

- **没有要求安装特殊 AI schema、llms.txt 或把全站改为 Markdown。**
- 不需要为了“AI chunking”拆成大量极短页面。
- 第一手测试、可核实的限制、对比条件和事实表，比堆“答案式段落”更有价值。
- AI 搜索可见性不能靠机器人模拟提问得出稳定排名；记录引用样本和带来的网站行为即可。
- Google AI features 的流量按其官方口径进入 GSC Web 报告，不要虚构后台不存在的独立流量指标。
- Bing Webmaster Tools 可作为辅助；IndexNow 仅用于支持它的搜索引擎，不是 Google 加速收录通道。
- Google Indexing API 不是普通产品页和博客的通用提交工具。
- 训练机器人权限、搜索抓取权限与用户触发访问是不同问题；涉及放开 AI 抓取时由站点所有者选择，不为 SEO 自动放开全部访问。

## 14. 测量与 90 天计划

### 14.1 先定义业务漏斗

```text
相关查询曝光
→ 搜索点击
→ 正确落地页
→ 查看功能与限制
→ 商店点击
→ 商店详情访问
→ 安装/首次使用
```

网站能可靠测到商店点击；安装部分要依靠商店和 App 端归因，不能把最后两步合并。

建议按产品分组监测：

- 核心产品页的可索引与 Google-selected canonical 状态。
- 品牌/非品牌查询曝光、点击、查询意图与排名区间。
- organic landing sessions、到产品页点击、`download_click` 次数及有点击会话比例。
- 平台、页面位置与来源路径，排除自己和调试流量。
- 商店侧 campaign/referrer 的详情访问、安装与激活（有数据时）。

不要要求“首页流量必须低于 20%”“自然流量超过 50% 就危险”“每月必须更新才能保持抓取”等无业务依据的阈值。

### 14.2 排期

| 阶段        | 交付                                                                               | 验收/判断                                   |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| 第 1 周     | 导出 GSC 基线；清模板；改首页/Contact 错误；纠正旅行与高风险事实；恢复正确下载入口 | 核心 URL 正常、无公开占位内容、事实有负责人 |
| 第 2 周     | canonical/sitemap/www；完成下载事件和 ClientRouter 测试；产品事实表                | HTML 检查通过，DebugView 事件不重复         |
| 第 3～4 周  | 两个产品集群试点：每个 1 个产品页改进、1 篇旧文修订、1 篇真实教程；补双向链接      | 按搜索意图和事实验收，不以字数验收          |
| 第 5～8 周  | 观察 GSC 与商店点击，修正试点；完善 About/schema/图片；开展相关真实外部发布        | 数据支持再扩大，不均摊到所有 App            |
| 第 9～12 周 | 复盘查询×页面表现；再选 1～2 个产品；评估工具页或语言版本                          | 保留有效页面，停止无需求或无能力承接的选题  |

试点产品默认可在 **Photo Swipe Cleaner / Aesthetic Calculator** 中选功能展示较明确者，再加一个有差异化证据的产品。但最终应由 GSC 已有相关曝光、真实下载情况、产品成熟度和素材可用性决定，**不是根据广告月量表直接排名**。

只有 19 次点击时，不建议同时跑多套 title A/B。保存变更日志，优先做修复前后按相同查询/页面和更长周期的方向性比较，并注明季节性与排名变化的混杂影响。改动后数周到数月才有足够数据是可能的，没有保证时限。

## 15. 发布与回归标准

当前 GitHub Actions 已有 build/check，不是“完全没有 CI”。但 Cloudflare 的推送部署不自动意味着它一定等待另一条 GitHub 检查成功，需要核实发布门禁。

新增 SEO 检查应直接检查构建 HTML，而不只检查源码字符串：

1. 关键路由的状态/存在性；模板路由不再公开为可索引营销页。
2. sitemap URL 必须对应最终规范 200 页面，且无 noindex。
3. canonical、og:url 与 JSON-LD URL 为预期主域绝对地址。
4. 无重复 title 品牌后缀、明显占位文案、缺失必要 description。
5. 正式产品页有一个清晰 H1；不能把机械 H1 计数作为唯一内容质量判断。
6. 每个实际可下载平台有真实 `<a href>`；无效平台不露出空按钮。
7. JSON-LD 可解析、事实与正文一致；缺乏合规评分不应逼迫构建伪造评分。
8. 内链目标、关键图片与商店 ID 检查；外部短暂失败应区别于真正坏链。
9. 无 JS 访问仍可看到正文和点击商店；客户端导航后事件仍只触发一次。
10. 线上抽查 www、随机 404、robots、sitemap 与缓存，而不是只在本地通过。

本次质量门现状：构建成功，类型与 ESLint 通过，22 个既有文件格式未通过。不要对全仓库运行自动格式化顺便制造巨大 diff；分工单修复，保证与 SEO 业务修改可分辨。

## 16. 旧文档需要纠偏

`AGENTS.md`、`docs/seo-growth-architecture.md`、`docs/CONTENT-TRACKER.md`、`docs/BLOG-CHECKLIST.md` 存在与现实不一致或过度简化的内容，后续 AI 极易重复执行。

| 旧描述                                             | 当前正确认识                                     |
| -------------------------------------------------- | ------------------------------------------------ |
| 外部脚本 false、GA 未启用                          | 当前 true，GA4 有 ID；重点验证事件而非重复安装   |
| 没有 DeliSeek / VocalTrans 页面                    | 两页已存在；AiTrans 才是新的待确认入口           |
| 所有结构化数据缺失                                 | 软件和 FAQ 已有；缺的是文章/实体及准确的资格认识 |
| 六篇模板博文需要设 draft                           | 已全部 draft；仍公开的是 13 个 Astro 模板路由    |
| AppDownload 会自动输出 a/button                    | 当前仍统一 button + window.open                  |
| AstroWind 响应式所以移动体验已通过                 | 需要实际设备和性能验收                           |
| 有 sitemap 即已收录、有验证 ID 即 GSC 已验证       | 只能确认配置，后台状态需核实                     |
| 308 会让 Google 无法读取                           | Google 能处理永久重定向；追求规范 URL 一致       |
| FAQ / HowTo schema 可普遍带来富结果                | 普通 App 站不应这样承诺；按当前支持范围验收      |
| 固定字数、固定内外链数量、标题中文冒号直接决定 SEO | 编辑规范不是固定排名公式，优先准确与意图         |
| 3 款 App 词表没有数值                              | 当前 8 个关键词表均有结构化量和广告竞争字段      |
| 没看到外链建设记录等于外链为零                     | 需 GSC Links 或第三方数据                        |

## 17. 下一位执行 AI 的硬约束

- 以本报告证据和新读取的源码为起点，不把旧报告当当前事实。
- 每次只执行一个有边界的任务包；先说明修改文件、风险和验证方式。
- 保留现有 URL、`~/` 别名、静态架构和尾斜杠，除非明确批准迁移。
- 不默认修改 `vendor/integration/`，不进行全仓库重构。
- 不编造评分、下载量、用户引语、设备测试、产品功能或当前关键词量。
- 不自动改商店信息、Cloudflare DNS/WAF、GA/GSC 后台或付款二维码。
- 品牌迁移、法律文案、价格与能力确认属于人工审批门。
- 不批量 canonical/noindex 产品页、正式文章；不把相关性不同的旧页重定向首页。
- 不把格式、schema 全绿或 sitemap 成功当成实际 SEO 增长。
- 实施交付必须包含：修改摘要、检查结果、未解决项、线上验收方式和回滚点。

## 18. 参考来源

以下均在本次审计中检索或读取。官方文档可能持续变化，执行时对关键政策再次核对。最新不等于必须采用所有新功能，优先选择适合本站的要求。

| 编号 | 来源                                                                                                                                                                                                         | 本报告使用点                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| S1   | [Google Ads: About Keyword Planner forecasts](https://support.google.com/google-ads/answer/3022575?hl=en)                                                                                                    | 广告竞争定义、历史量的取整与地区设置                          |
| S2   | [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)                                                                  | 第一手经验、来源、E-E-A-T、没有推荐固定字数                   |
| S3   | [Google: Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)                                                                                 | canonical，绝对 URL 推荐                                      |
| S4   | [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)                                                                                     | 规范 URL、准确 lastmod、忽略 priority/changefreq              |
| S5   | [Cloudflare Pages: Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/)                                                                                                      | 404/SPA 回退、默认缓存、预览 noindex；页面标注更新 2026-10-10 |
| S6   | [Cloudflare: Verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/)                                                                                                              | 真实机器人核验；页面标注更新 2026-10-08                       |
| S7   | [Google: Software app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)                                                                                    | 软件富结果必需属性和支持类别                                  |
| S8   | [Google: Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)                                                                                                | 评价 schema 及规范入口                                        |
| S9   | [Google: FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)                                                                                                  | FAQ 富结果仅限合格政府与健康站点                              |
| S10  | [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)                                                                                                              | LCP/INP/CLS 体验目标                                          |
| S11  | [Google: Title links](https://developers.google.com/search/docs/appearance/title-link)                                                                                                                       | 简明 title、避免模板重复、非固定字符硬限制                    |
| S12  | [Google: Make your links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)                                                                                             | 原生 a href、上下文内链                                       |
| S13  | [Apple: Family Controls](https://developer.apple.com/documentation/familycontrols)、[ManagedSettingsStore.shield](https://developer.apple.com/documentation/managedsettings/managedsettingsstore/shield)     | 授权限制能力，纠正 iOS 绝对不可能说法                         |
| S14  | [国家移民管理局 2026-08-20 公告](https://en.nia.gov.cn/n147413/c217834/content.html)                                                                                                                         | 240 小时过境免签及适用条件                                    |
| S15  | [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=en)                                                                                     | hreflang、自包含和双向关系                                    |
| S16  | [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features)、[Optimizing for generative AI search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | AI 搜索沿用 SEO 基础，无特殊文件/schema 要求                  |
| S17  | [线上 robots](https://winki.win/robots.txt)、[sitemap](https://winki.win/sitemap-0.xml)                                                                                                                      | 本次 44 URL 索引信号快照                                      |
| S18  | [AiTrans 商店](https://play.google.com/store/apps/details?id=wiki.winki.aitrans)、[VocalTrans 商店](https://play.google.com/store/apps/details?id=wiki.winki.vocaltrans)                                     | 两个包名均可访问，不擅自认定更名                              |
| S19  | [15 分钟工具样例一](https://glow-clock.com/15-minute-timer)、[样例二](https://pomodorotimer.online/15-minute-timer)                                                                                          | 搜索意图抽样，不作为排名、质量或流量权威数据                  |

**最终判断：先让网站准确、可信、可直接下载和可测量，再用少量真正回答用户问题的内容扩大非品牌曝光。不要继续把“加关键词、加 schema、增加文章数量”作为主要优化动作。**
