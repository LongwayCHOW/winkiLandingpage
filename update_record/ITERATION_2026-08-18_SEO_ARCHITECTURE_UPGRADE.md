在项目根目录创建一个迭代记录吧，按日期，先把以下迭代进行落盘：## 1. High-Level Summary (TL;DR) 
 
 * **Impact:** **High** - 本次更新实现了完整的 SEO 自然获客架构升级，规范了所有 App 落地页的元数据（Metadata）与结构化数据（JSON-LD），同时新增了两款新产品的专属展示页，为长期的自然流量增长打下坚实基础。 
 
 * **Key Changes:** 
 
   * ✨ **引入 SEO Schema 组件**：新增 `AppSchema.astro`，为各个落地页统一注入 `SoftwareApplication` 和 `FAQPage` 的结构化数据，提升搜索引擎富摘要展示率。 
 
   * 🚀 **新应用上线**：新增了 `DeliSeek`（美食旅游指南）与 `VocalTrans`（离线语音翻译）的独立落地页，并将其集成到首页与全局导航中。 
 
   * ♻️ **下载组件重构**：重构了 `AppDownload.astro`，支持“直接跳转应用商店”与“点击/悬停扫码下载”双模式自动切换。 
 
   * 🐛 **修复图片加载**：修复了 Astro 5.x 开发模式下，因 `trailingSlash` 配置导致的 `/_image` 本地图片 404 错误。 
 
   * 📝 **全面优化 TDK**：优化了原有应用（Chronicle, Flip Timer 等）的 SEO 标题、描述和 H1，移除了中文冒号，并根据关键词金字塔策略进行了重写。 
 
 ## 2. Visual Overview (Code & Logic Map) 
 
 ```mermaid 
 graph TD 
     %% Define Styles with high contrast for readability 
     classDef business fill:#e3f2fd,color:#0d47a1,stroke:#0d47a1,stroke-width:2px; 
     classDef module fill:#e8f5e9,color:#1b5e20,stroke:#1b5e20,stroke-width:1px; 
     classDef method fill:#fff3e0,color:#e65100,stroke:#e65100,stroke-width:1px; 
 
     %% Nodes 
     B1("📈 业务目标: 提升SEO流量与应用下载转化"):::business 
     
     M1("📄 src/components/common/AppSchema.astro"):::module 
     M2("📄 src/components/widgets/AppDownload.astro"):::module 
     M3("📄 src/pages/homes/*.astro (应用落地页)"):::module 
     M4("📄 astro.config.ts"):::module 
 
     F1("JSON.stringify(schema)"):::method 
     F2("toAbsolute(url)"):::method 
     F3("setupAppCards()"):::method 
     F4("getPermalink()"):::method 
 
     %% Edges 
     B1 -->|"提供 JSON-LD 富摘要"| M1 
     B1 -->|"优化下载卡片交互"| M2 
     B1 -->|"规范 TDK 与产品拓展"| M3 
     
     M1 -->|"生成结构化数据"| F1 
     M1 -->|"相对路径转绝对路径"| F2 
     M2 -->|"处理双模点击/悬停逻辑"| F3 
     M3 -->|"绑定应用配置与商店链接"| F4 
     
     B1 -->|"修复开发环境图片 404"| M4 
 ``` 
 
 ## 3. Detailed Change Analysis 
 
 ### 🎯 SEO 结构化数据与组件支持 
 
 * **What Changed:** 
 
   * **AppSchema 注入**: 新增组件 `AppSchema.astro`，用于生成搜索引擎友好的 JSON-LD 数据。它能将应用评分、价格、适用平台等转化为 `SoftwareApplication` 标签，并将常见问题转化为 `FAQPage` 标签。（来源: `AppSchema.astro`） 
 
   * **智能下载卡片**: 以前 `AppDownload.astro` 仅支持扫码模式。现在对其进行了改造，通过判断是否传入了 `appStoreLink` 决定将其渲染为 `<a>` 标签（直接新窗口跳转商店）还是 `<button>`（触发客户端脚本切换展示二维码）。（来源: `AppDownload.astro`） 
 
 ### ⚙️ 全局配置与框架修正 
 
 * **What Changed:** 在 Astro 的配置文件中，显式指定了 Image endpoint 的路由，修复了开发环境中的路由匹配 BUG。 
 
 * **配置变更 (Config Updates):** 
   \| 配置路径 | Old Value | New Value | Description | 
   \|---|---|---|---| 
   \| `image.endpoint.route` | `undefined` | `"/_image/"` | 修复开启 `trailingSlash:'always'` 时，图片组件生成的 src 不带尾斜杠从而引发的开发模式 404 问题。 | 
 
 ### 📱 落地页 SEO 规范化与新产品拓展 
 
 * **What Changed:** 
 
   * **页面大重构**: 为 `chronicle`, `flip-timer`, `focus-one` 等历史页面去除了 Title 中的中文冒号（如 `Focus One：ADHD Focus Timer` -> `Focus One: ADHD Focus Timer for Deep Work`），重写了元数据描述，并全部接入了 `<AppSchema />` 标签及整理后的 FAQ 数据源。 
 
   * **新页面加入**: 按照最新的 SEO 最佳实践，创建了 `deliseek.astro` 与 `vocaltrans.astro` 两个新页面，并在 `src/navigation.ts` 导航栏和 `src/pages/index.astro` 首页中补充了这两个产品的入口。 
 
 ### 📚 SEO 战略与文档体系 
 
 * **What Changed:** 新建了 `docs/seo-growth-architecture.md`，确立了以应用落地页为“支柱页（Pillar Page）”，博客文章为“支撑文章（Cluster Content）”的内容金字塔架构。同步添加了博客检查清单和内容追踪器，规范化后续的获客流程。 
 
 ## 4. Impact & Risk Assessment 
 
 * **⚠️ Breaking Changes:** 
 
   * 无代码层面的破坏性错误，但所有落地页的 `<title>` 和 `<meta description>` 均发生了显著变化。短期内 Google 等搜索引擎重新抓取时，**可能会引起排名的剧烈波动**。 
 
 * **🧪 Testing Suggestions:** 
 
   1. **SEO 标签验证**: 任意选取一个本地的落地页（如 `/homes/chronicle`），将其渲染后的 HTML 源码放入 `https://search.google.com/test/rich-results`  工具，确保 JSON-LD 解析成功且无警告。 
   2. **AppDownload 组件交互**: 
 
      * 测试传入 URL 的 App（应直接打开新标签页）。 
 
      * 测试仅传入二维码的 App（悬停或点击 Apple/Android 按钮应能顺滑切换下方的二维码图片，原 Icon 隐藏）。 
   3. **开发环境图片加载**: 在本地运行 `npm run dev`，检查页面中的图片是否可以正常显示，不再出现 404 错误。 
   4. **移动端排版检查**: 检查新增的 `DeliSeek` 和 `VocalTrans` 落地页在手机视图下间距与按钮对齐是否正常。