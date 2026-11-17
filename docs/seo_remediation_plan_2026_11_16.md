# Winki SEO 全面整改计划（2026-11-16）

依据：AI Studio 四轮 SEO 诊断（初诊 → 二次深挖 → 代码级深挖 → P0–P3 汇总），逐条对照仓库实际代码与 [2026-10-23 整改基线](./seo_remediation_todo_2026_10_23.md) 核验后编写。已验收项不重复列入（canonical、title/description、sitemap 过滤与 noindex、SoftwareApplication schema、法务页 9 款 App、页脚版权、demo 路由治理、模板演示博文均已 draft 不渲染等）。

> 约束：未经授权不提交、不推送、不改动任何后台。评分、价格、功能、政策数字必须有真实来源。

> **执行状态（2026-11-17 更新）**：第一部分中无需用户拍板的代码项已全部完成并通过 `astro check`（0 错误）+ ESLint + Prettier 验证——包括 A1 模板残留、A2 导航去污染、A3 noindex、A4 王牌页全部修复 + 9 款第三方 App 可点击商店链接（逐一经官方渠道核验）、`_redirects` 301 收口、travel-china 3 张外链图本地化、A6 sameAs 补充 + Googlebot 线上模拟 + robots.txt 收口到 `sitemap-index.xml`（含 vendor 构建逻辑一行修正）。**frontmatter tags 重建经用户最终决定放弃，保留原 tags（2026-11-17）**。剩余未勾选项：战略聚焦确认（B5）、部署后复验项（HTML grep、Googlebot 复跑）、内容生产（A5）与站外准备文案（A6 尾部两项）。

---

## 核心判断

站点并非"未被收录"，病根是四件事叠加：

1. **DNS / 爬虫链路受阻**：`www.winki.win` 在 Google 索引中仍是域名停放页，残留 DNS 记录（含 AAAA）可能让 Googlebot 抓到旧 IP → `sitemap-0.xml`"无法抓取"。
2. **模板残留 + 全局导航污染**：`@arthelokyo`、公告条、全局 Header 塞 10 篇博客标题，拉平每个页面的主题相关性。
3. **王牌页 `/travel-china/` 自断转化**：翻译/美食板块推荐 DeepL、Meituan、Dianping，唯独没有自家 AiTrans / VocalTrans / DeliSeek；且有过时政策与测试字样。
4. **内容全是 Devlog**：开发者叙事没有搜索量，新域名 DR 0 又同时铺 9 个不相关品类，无法建立主题权威度。

---

## 现状核对结论（诊断 vs 仓库实际）

| #   | 诊断问题                                           | 仓库核对结果                                                                                                                                        | 结论                                         |
| --- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | `www.winki.win` 停放页 + DNS 残留                  | 站外 DNS，代码无法验证                                                                                                                              | 属实（待后台核验，对应 F09）                 |
| 2   | 翻译板块漏 AiTrans/VocalTrans；美食板块漏 DeliSeek | [travel-china.astro L428-474](../src/pages/travel-china.astro#L428-L474) 确认只有 DeepL/UDictionary、Meituan/Dianping                               | 属实                                         |
| 3   | `72/144-hour` 过时免签政策                         | [travel-china.astro L233](../src/pages/travel-china.astro#L233) 确认存在                                                                            | 属实（改前需官方来源核验）                   |
| 4   | `PayTest` / `Banner Background` 测试字样           | [travel-china.astro L165](../src/pages/travel-china.astro#L165)、[L388-421](../src/pages/travel-china.astro#L388-L421) 确认存在                     | 属实                                         |
| 5   | 硬编码"Live Rate: 1 CNY = 0.14 USD"                | [travel-china.astro L376](../src/pages/travel-china.astro#L376) 确认存在（诊断未点名，复核新发现）                                                  | 新增发现                                     |
| 6   | 全局导航塞 10 篇博客标题                           | [navigation.ts](../src/navigation.ts) Blog 项 `linksAutoLatest: true`，实现于 [Header.astro L53-67](../src/components/widgets/Header.astro#L53-L67) | 属实                                         |
| 7   | `@arthelokyo` 模板残留                             | [config.yaml L26-27](../src/config.yaml#L26-L27) twitter handle/site 仍为 `@arthelokyo`                                                             | 属实                                         |
| 8   | "New updates available! »" 模板公告条              | [Announcement.astro](../src/components/widgets/Announcement.astro) 经 [PageLayout.astro L21](../src/layouts/PageLayout.astro#L21) 全站渲染          | 属实                                         |
| 9   | 页脚 `Made by Arthelokyo`                          | 已修复                                                                                                                                              | 已解决，仅抽查残留                           |
| 10  | QQ 邮箱 `winkiwiki@QQ.com`                         | 代码中已无                                                                                                                                          | 代码侧已解决；商店后台仍需核验（见第二部分） |
| 11  | 法务页漏 3 款新 App                                | terms/privacy/acceptable-use 均已含 9 款                                                                                                            | 已解决                                       |
| 12  | Tag 页灌爆 sitemap                                 | [config.yaml](../src/config.yaml) tag `index:false`；[seo-policy.ts](../src/utils/seo-policy.ts) 已过滤 `/tag/`                                     | 已解决（标签精简仍属 F19 待办）              |
| 13  | `Price` 菜单是空锚点                               | [pricing.astro](../src/pages/pricing.astro) 真实存在                                                                                                | 诊断过时，不处理                             |
| 14  | 产品页路径 `/homes/xxx`                            | [navigation.ts](../src/navigation.ts) 等确认沿用                                                                                                    | 属实，可选迁移项（暂缓）                     |
| 15  | Chronicle 产品页未入索引                           | [homes/chronicle.astro](../src/pages/homes/chronicle.astro) 存在                                                                                    | 需 GSC 网址检查定位（第二部分）              |
| 16  | 过期兑换码文仍可索引                               | [chronicle-new-year-note-and-promo.mdx](../src/data/post/chronicle-new-year-note-and-promo.mdx) `index: true`                                       | 属实                                         |
| 17  | 移动端只有二维码无可点击商店链接                   | 旅行页 AppDownload 卡片以 QR 为主（基线 F06 已记录）                                                                                                | 属实                                         |
| 18  | 301 重定向能力                                     | 仓库无 `public/_redirects`（复核新发现）                                                                                                            | 可由代码侧创建（见 1.3）                     |

---

# 第一部分：AI 代理可执行（代码 / 内容 / 验证准备）

以下全部改本地仓库，改完统一 `npm run check` + 本地 `npm run build` 验证，经你确认后 `git push` 触发 Cloudflare Pages 自动部署。

## A1. 模板残留清零

- [x] [config.yaml L25-27](../src/config.yaml#L25-L27)：twitter handle/site 的 `@arthelokyo` 删除字段或改为 Winki 自有账号（等你告知账号名，无则删）。✅ 用户已提供自有账号：handle/site 均改为 `@winki2wiki`，cardType 保留。
- [x] 移除 [PageLayout.astro L21](../src/layouts/PageLayout.astro#L21) 对 [Announcement.astro](../src/components/widgets/Announcement.astro)（"New updates available! »"）的引用。✅ 已移除 import 与 slot 引用。
- [x] 构建后全量 HTML grep 复验：无 `arthelokyo`、无 `New updates available`、无其他模板演示字样。（待部署后执行）

## A2. 全局导航去污染

- [x] ~~Blog 项删除 `linksAutoLatest: true`~~（复盘后用户拍板保留该功能，与诊断建议相反，属有意豁免）。
- [x] Header 的 Apps 下拉精简：删除"All apps & downloads"入口，下拉直接列 9 款产品；完整列表仍在 Footer 与 `/allApps` 页。✅ 用户拍板：不精简款数，只去掉 all apps 入口。
- [x] ~~`TravelChina` 文案改 `Travel China`~~（复盘后用户拍板保留原文案，属有意豁免）。

## A3. 权重收口

- [x] [chronicle-new-year-note-and-promo.mdx](../src/data/post/chronicle-new-year-note-and-promo.mdx)：`metadata.robots.index` 改 `false`（保留 follow）。✅ 已改。
- [x] 创建 `public/_redirects`（Cloudflare Pages 原生支持），将同 App 重复旧文 301 到各自"问题—方案"主文（Focus One / Flip Timer / MeowTalkie 每款保留 1 篇主文；清单整理后按你的选择执行）。✅ 用户已拍板：三款均保留 user-story 为主文。已创建 `public/_redirects`，7 条 301：focus-one-team-notes / why-i-built-focus-timer-screen-addiction → focus-one-user-story；flip-timer-sensor-story / flip-timer-team-notes → flip-timer-user-story；meowtalkie-team-notes / meowtalkie-shy-cat-story / meowtalkie-update-real-cat-sounds → meowtalkie-user-story。部署后按"第 1 周末"验收节奏复验。
- [x] frontmatter tags 以「ASO 数据.xlsx」为词源重建（用户拍板，替代原"机械削减"思路）：每款产品的核心关键词栏 + iOS 100 字符关键词栏为首选词，关键词库（月搜索量/竞争度）做补充；每篇 3–5 个、优先复用同产品多篇共用的有搜索量关键词；tag 归档页至少覆盖 2 篇文章，否则不建。⛔ 2026-11-17 用户最终决定：**放弃重建，保留原 tags**（用户认为原 tags 更合适，已手动撤销重建，此条关闭不再执行）。

## A4. 王牌页 `/travel-china/` 翻新

- [x] [L233](../src/pages/travel-china.astro#L233)：`72/144-hour` → 按国家移民管理局官方公告核验 240 小时过境免签（适用国家数、口岸数以官方来源为准）后修改，正文附来源与"以官方最新公告为准"提示。✅ 已改为 240 小时 / 57 国 / 10 天，NIA 链接更新为官方公告页。
- [x] [L165](../src/pages/travel-china.astro#L165)：`alt="Banner Background"` 改语义化描述。✅ 已改。
- [x] [L388-421](../src/pages/travel-china.astro#L388-L421)：`WeChat PayTest` / `WeChat mniAppPayTest` / `Alipay PayTest` / `Auth A/B` 改写为面向游客的说明（如 _1 RMB test payment to verify your foreign card works_）。✅ 已改。
- [x] [L376](../src/pages/travel-china.astro#L376)：删除硬编码"Live Rate: 1 CNY = 0.14 USD"徽章，或改为不带"实时"字样的中性说明。✅ 已改为中性说明。
- [x] Translation 板块（L428-450）：在 DeepL/UDictionary 之前用 [AppDownload](../src/components/widgets/AppDownload.astro) 组件接入 `AiTrans`（离线中英语音翻译）与 `VocalTrans`（中日韩粤多语种实时对话）——两款独立推荐、不合并、不互指。✅ 已接入（均带可点击 Google Play 链接）。
- [x] Dining 板块（L452-474）：在 Meituan/Dianping 之前接入 `DeliSeek`（英文菜单翻译 + 本地美食）。✅ 已接入（带可点击 Google Play 链接）。
- [x] 移动端断层（对应基线 F06 待办）：AppDownload 卡片手机端提供可点击的 App Store / Google Play `<a>` 按钮，二维码仅桌面端补充；并核实旅行页第三方 App（Meituan/Dianping/DeepL 等）商店 URL 真实可达。✅ 第三方 App 中 Alipay/WeChat/DeepL/UDictionary/Meituan/Dianping/Amap/Didi/Trip.com 共 9 款已换可点击链接，全部经 iTunes Lookup API / Google Play 页面 / 多来源交叉核验（纠正了两处凭记忆的错误包名：Meituan 实为 `com.sankuai.meituan`、DeepL 实为 `com.deepl.mobiletranslator`、Trip.com 实为 `ctrip.english`）；12306 的 Google Play 正式上架无法核实，保留 QR-only。
- [x] 外链图片本地化：~~诊断点名 VocalTrans 页~~ → **用户决策（2026-11-17）：unsplash 外链全部保留原样，不做本地化**。已完成的 2 张（vocaltrans / deliseek banner）保留本地化结果，其余 ~30 处不再处理。
- [x] ~~12306 Google Play 上架无法核实~~ → **用户决策（2026-11-17）：travel-china 页所有 App 均为开发者手动确认后生成的二维码，无需修改**。该页 App 部分保持现状，不再改动。
- [x] `travel-china.astro` 3 张 `lh3.googleusercontent.com/aida-public/*` 外链（OG 图 L44、头部 banner L152、签证卡 L183/L196/L212）本地网络无法下载（Google 域被阻断），需手动用浏览器保存原图到 `src/assets/images/travel-china-*.jpg` 后由 IDE 接线。✅ 2026-11-17 本地网络恢复可达，已用 curl 直接下载 3 张原图（travel-china-banner.jpg / travel-china-visa-business.jpg / travel-china-visa-transit.jpg，均人工核验内容匹配：长城 banner / 商务会议 / 舷窗云海），并在 [travel-china.astro](../src/pages/travel-china.astro) 中接线：OG 图按产品页既有模式传 ImageMetadata，banner `<img>` 与 3 张签证卡 background-image 改为本地 import。`astro check` 0 错误 + ESLint + Prettier 通过。全文件已无 lh3 外链。

## A5. 内容生产（长尾矩阵，按 AGENTS.md 既定链路）

- [ ] 每篇文章 = 1 个真实搜索问题 + 1 个对应 App + FAQPage schema + 移动端可点下载按钮；标题/H1 铁律：`具体产品名/场景词 + 解决什么问题`，不写文艺标题。
- [ ] **A 组（China Travel 主赛道，优先）**：
  1. How to Test Alipay and WeChat Pay Before Flying to China (1 RMB Check Guide)
  2. 240-Hour Visa-Free Transit in China (2026): Eligible Countries, Ports & App Checklist
  3. Using Alipay with Dual Passports: Verification Fixes & Common Errors
  4. How to Use Dianping & Meituan in English Without Speaking Chinese（→ DeliSeek）
  5. Best Offline Chinese Translator Apps for Subways & Rural Travel（→ AiTrans）
  6. How to Order Food in China with Dietary Restrictions (Allergies/Halal/Vegan)（→ DeliSeek）
- [ ] **B 组（工具副赛道，挑竞争低的做）**：7. Best Local-First Day One Alternative (No Subscription or Cloud Lock-in)（→ Chronicle）8. How to Clean Up 10,000 Photos on iPhone Without Losing Memories（→ Photo Swipe Cleaner）9. Minimalist ADHD Visual Timer: Single-Tasking vs Complex To-Do Apps（→ Focus One）10. Best Hands-Free Interval Timer for Kitchen & HIIT（→ Flip Timer）
- [ ] 链路：CONTENT-TRACKER 看进度 → 素材模板收真实素材（E-E-A-T 来源，不 AI 编造）→ 组织成英文博文 → [BLOG-CHECKLIST.md](./BLOG-CHECKLIST.md) 质量门 → CONTENT-TRACKER 打勾。
- [ ] 内链：所有旅行/工具类新文 Hub-Spoke 内链到 `/travel-china/` 与对应产品落地页。

## A6. 验证与准备（为第二部分供弹药）

- [x] 构建/部署后执行本地 Googlebot 模拟（结果反馈给你操作 GSC 时对照）：✅ 已对**当前线上**执行：robots.txt / sitemap-index.xml / sitemap-0.xml / `/` / `/travel-china/` 以 Googlebot UA 全部返回 200（robots 与 sitemap 均为正确 Content-Type）。⚠️ 本次改动部署后需再复跑一轮。
  ```
  curl -I -A "Googlebot" https://winki.win/sitemap-index.xml
  curl -I -A "Googlebot" https://winki.win/sitemap-0.xml
  curl -i https://winki.win/robots.txt
  ```
- [ ] 全量 HTML grep 抽查若干 `<loc>` 与页面 `<link rel="canonical">` 逐字一致（基线 F07/F08 已验，部署后复验）。
- [x] 核对首页 Organization / 站点实体 JSON-LD：补/核对 `sameAs`（GitHub、App Store 开发者页、Google Play 开发者页等**真实存在**的主页，不虚构）。✅ 已在 [SiteSchema.astro](../src/components/common/SiteSchema.astro) 补入两个真实开发者主页（App Store `id1798120294`、Google Play `developer?id=雲集`，来源均为站内在用的 Announcement 链接）；GitHub 个人主页因无法确认与开发者实体的关联，未列入。
- [ ] 起草 Product Hunt / AlternativeTo / SaaSHub 产品条目文案（Chronicle 挂 Day One 替代、Focus One 挂 Forest 替代），交你提交。
- [ ] 技术故事（传感器踩坑、重构复盘）改写为 Indie Hackers / Show HN / DEV Community 版本草稿，文末规范回链产品页。

---

# 第二部分：需要你做（后台 / 账号权限，我无法代操作）

## B1. Cloudflare / DNS（第 1–2 天，最高优先）

- [ ] 核查并清理四条记录：`winki.win A / AAAA`、`www.winki.win A / AAAA`，删除一切不属于当前托管商的历史记录（**尤其残留 AAAA**——Googlebot 优先走 IPv6，打到旧停放 IP 就会 403/404，这是"浏览器打得开、GSC 抓不到"的最典型成因）。可用 `nslookup -type=AAAA winki.win` 自查。
- [ ] `www` 配置 301 永久重定向 → `https://winki.win/`（Pages 自定义域 + Redirect Rule）。
- [ ] SSL/TLS 模式设 Full (strict)，证书覆盖 `winki.win` 与 `www.winki.win`（F09 记录过 www 525 握手问题）。
- [ ] Security → Bots：确认 Bot Fight Mode 关闭、"AI Scrapers and Crawlers"等策略不拦普通搜索引擎爬虫；查 WAF 事件日志确认 Googlebot 未被挑战（403/429 会直接导致 sitemap"无法抓取"）。
- [ ] 对 `www` 旧停放页提交 GSC 移除请求或等待重抓覆盖。

## B2. Google Search Console（第 1–2 天）

- [ ] 使用**网域属性（Domain Property: `winki.win`）**，与实际站点版本完全一致。
- [ ] 删除单独提交的 `sitemap-0.xml` 报错记录，改提交 `https://winki.win/sitemap-index.xml`；若界面状态卡死，先"网址检查 → 测试实际网址"确认能抓通再重交（GSC 有已知缓存 bug）。
- [x] `robots.txt` 内 Sitemap 行确认为 `sitemap-index.xml`（我可先在代码侧核对，提交动作由你）。✅ 代码侧已改：`public/robots.txt` 改为 `sitemap-index.xml`，并同步修改 [vendor/integration/index.ts](../vendor/integration/index.ts) 构建逻辑（原逻辑会在构建时把该行硬编码回 `sitemap-0.xml`，会覆盖 public 修改）；部署后线上生效，GSC 重新提交动作仍由你。
- [ ] 用"网址检查"测试 `https://winki.win/homes/chronicle/`：确认是 404、noindex 还是仅未被抓取；修正后"请求编入索引"（对应 A 组第 1、7 篇文的内链目标）。
- [ ] 部署后对 `/travel-china/` 与新发长尾文逐个"请求编入索引"。

## B3. App Store Connect + Google Play Console（第 1–2 周）

- [ ] 9 款 App 的 Developer Website / Marketing URL / Support URL / Privacy Policy URL 全部填 `https://winki.win/` 对应路径（不带 www）。
- [ ] 商店支持邮箱统一为域名邮箱，清除"雲集 + winkiwiki@QQ.com"类残留（诊断在商店页面发现，代码侧已无）。
- [ ] Play 开发者资料联系信息与官网品牌（Winki / Zhou Longwei）一致。
- [ ] 这是新站最容易拿到的 DR 95+ 实体信号，**优先级高于一切站外发链**。

## B4. 站外账号与提交（第 2–4 周）

- [ ] 用 A6 我起草的文案提交 Product Hunt、AlternativeTo、SaaSHub、Toolify/AppAgg 条目。
- [ ] Devlog 类技术故事发布到 Indie Hackers / Show HN / DEV Community。
- [ ] r/travelchina 回答具体问题时贴对应长尾专篇（非总览页），降低被当广告删帖概率。
- [ ] 所有外链动作与效果数据记录到 CONTENT-TRACKER。

## B5. 决策类（需要你拍板）

- [x] 各 App "主文"选择：A3 的 301 收口清单需要你确认保留哪篇、301 哪些。✅ 已拍板（2026-11-17）：Focus One / Flip Timer / MeowTalkie 均保留 user-story 为主文，`public/_redirects` 已创建。
- [x] Twitter/X 账号：注册并告知 handle（A1 用），或决定删除字段。✅ 用户已提供 handle：`@winki2wiki`，已写入 [config.yaml L25-27](../src/config.yaml#L25-L27)（handle/site 两处均为 `@winki2wiki`，cardType 保留）。
- [x] `/homes/` → `/apps/` 路径迁移：可选长期项，收益是 URL 语义，成本是全站 301 + 索引重置；**建议 P0–P2 验收后再评估**，本轮不动。✅ 已拍板：暂缓，P0–P2 验收后再评估。
- [ ] 战略聚焦确认：未来 1–2 个月 80% 内容精力押注 `/travel-china/` + `DeliSeek` + `AiTrans` 生态（r/travelchina 真实痛点 + 转化路径最短），效率工具类内容降频维持。

---

## 验收节奏（用 GSC 数据说话）

| 时点      | 验收标准                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 第 1 周末 | `curl -A Googlebot` sitemap 两文件 200；GSC sitemap"成功"且 URL 数为干净的 20–30 核心页；`www` 301 生效；Chronicle 页可抓取；全站无 arthelokyo/公告条/博客标题导航 |
| 第 2–3 周 | GSC"网页索引编制"有效页上升、排除/异常下降；新版 `/travel-china/` 与前 3 篇长尾文被抓取；商店后台回链全部生效                                                      |
| 第 4–6 周 | GSC"效果"出现非品牌长尾词展现（如 `test alipay before china`、`240 hour visa free china`、`local first journal app`），排名 15–30 位即视为出沙盒进入正向轨道       |

## 明确不做 / 已验收不重复项

- 不重复执行 2026-10-23 已验收项（F01/F02/F03\*/F05/F07/F08/F10/F12/F13/F14/F15/F17/F20），仅在交叉处引用。
- \*F03"旅行页政策"需按 A4 重新核验（页面现存 `72/144-hour` 与基线"官方公告核验"结论矛盾，属回退或核验遗漏）。
- `Price`/`/pricing/` 保留，不删除。
- 6 篇 AstroWind 模板演示博文均 `draft: true`，不渲染不入 sitemap，无需处理（复核确认）。
- 不虚构评分、价格、社媒账号、政策数字；AiTrans 与 VocalTrans 保持独立定位。
- 第二部分所有后台操作须由你或你授权后执行，我只做本地验证与文案准备。
