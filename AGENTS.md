# AGENTS.md — Winki Landing Page

Winki 的小而美产品营销站点。基于 **AstroWind** 模板演化而来，使用 **Astro 5 + Tailwind CSS 3** 构建的静态展示站。

---

## 项目定位

- 产品：Winki（Chronicle、MeowTalkie、Photo Swipe Cleaner、Aesthetic Calculator、Focus One、Flip Timer 等）
- 站点用途：品牌落地页、产品二级页、博客、Privacy / Terms / Contact 等辅助页面
- 部署目标：`winki.win`，`output: 'static'`

---

## 技术栈

| 层级     | 主要依赖                                                 |
| -------- | -------------------------------------------------------- |
| 框架     | Astro 5.x                                                |
| 样式     | Tailwind CSS 3.4、@tailwindcss/typography                |
| 内容     | Markdown / MDX、Astro Content Collections                |
| 图标     | astro-icon（Iconify: tabler / flat-color-icons）         |
| SEO      | @astrolib/seo                                            |
| 分析     | @astrolib/analytics（GA / Splitbee，当前未启用外部脚本） |
| 字体     | @fontsource-variable/inter                               |
| 构建增强 | astro-compress、sitemap、partytown（按需）               |

---

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # http://localhost:4321
npm run build        # 构建到 ./dist
npm run preview      # 预览生产构建
npm run check        # astro check + eslint + prettier
npm run fix          # eslint --fix + prettier -w
```

## 部署流程

1. 本地修改代码，`git push` 到 GitHub（main 分支）
2. Cloudflare Pages 自动检测到推送，拉取代码
3. Cloudflare 自动执行 `npm run build`，产出 `./dist/`
4. 构建产物自动部署到 `https://winki.win`

---

## 项目结构

```
/
├── public/                     # 静态资源（favicon、robots.txt 等）
├── src/
│   ├── assets/                 # 图片、样式（tailwind.css）
│   ├── components/
│   │   ├── widgets/            # 页面级区块组件（Hero/Features/Content/FAQs...）
│   │   ├── common/             # 通用组件（Header/Footer/Image/Metadata...）
│   │   └── blog/               # 博客组件
│   ├── content/config.ts       # Content collection schema
│   ├── data/post/              # 博客文章（.md / .mdx）
│   ├── layouts/                # PageLayout / Layout / MarkdownLayout
│   ├── pages/                  # Astro 路由
│   │   ├── index.astro         # 首页
│   │   ├── homes/*.astro       # 各产品落地页
│   │   ├── [...blog]/          # 博客列表/分类/标签/分页
│   │   ├── contact.astro
│   │   ├── travel-china.astro
│   │   ├── terms.md / privacy.md
│   │   └── 404.astro
│   ├── utils/                  # 工具函数
│   ├── config.yaml             # 站点全局配置
│   └── navigation.ts           # 顶部导航 & 页脚配置
├── vendor/integration/         # Astrowind 自定义集成，不要把这里的逻辑当普通业务代码修改
├── astro.config.ts
├── tailwind.config.js
├── eslint.config.js
└── .prettierrc.cjs
```

---

## 关键约定

### 1. 路径别名

项目使用 `~/*` 映射到 `src/*`：

```astro
import Layout from '~/layouts/PageLayout.astro'; import {getPermalink} from '~/utils/permalinks';
```

不要改动 `tsconfig.json` 中的 `paths`，也不要新增与 `~/` 冲突的别名。

### 2. 配置驱动

全局配置集中在 `src/config.yaml`，并通过 `vendor/integration` 在构建时注入为虚拟模块 `astrowind:config`：

```ts
import { SITE, APP_BLOG, I18N, METADATA, UI, ANALYTICS } from 'astrowind:config';
```

修改站点名称、SEO 默认值、博客路径、主题模式等，优先改 `src/config.yaml`，而不是到处硬编码。

### 3. 路由与链接

- 页面级组件在 `src/pages/` 中按文件路径生成路由。
- 内部链接使用 `~/utils/permalinks`：
  - `getPermalink('/homes/chronicle')` → 页面
  - `getBlogPermalink()` → 博客首页
  - `getAsset('/rss.xml')` → 资源链接
- `src/navigation.ts` 中的 `headerData` / `footerData` 会自动处理链接生成。

### 4. 页面编写

典型页面结构：

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero2 from '~/components/widgets/Hero2.astro';
import Features3 from '~/components/widgets/Features3.astro';

const metadata = {
  title: 'Page Title',
  description: 'Page description for SEO.',
};
---

<Layout metadata={metadata}>
  <Hero2 ... />
  <Features3 ... />
</Layout>
```

- `PageLayout` 会自动注入 `Header` 和 `Footer`；如需自定义 `Header`，使用 `<Fragment slot="header">` 覆盖。
- 各 widget 组件接受 `items`、`title`、`subtitle`、`tagline` 等 props，优先用数据驱动，不要在里面写死业务文案。

### 5. 博客

- 博客目录：`src/data/post/`
- Schema：`src/content/config.ts`
- Frontmatter 字段：`title`、`excerpt`、`image`、`category`、`tags`、`author`、`publishDate`、`updateDate`、`draft`、`metadata`
- 构建时会自动计算 readingTime。
- 博客路由相关逻辑放在 `src/utils/blog.ts` / `src/pages/[...blog]/` 中。

### 6. 图标

使用 `astro-icon`，通过 `tabler:*` 或 `flat-color-icons:*`：

```astro
<Icon name="tabler:calendar" class="w-5 h-5" />
```

如需新增图标集，修改 `astro.config.ts` 中 `icon.include`。

### 7. 图片

- 项目内图片：`~/assets/images/...`，通过 `src/components/common/Image.astro` 引入。
- 外部图片：`https://cdn.pixabay.com` 与 `images.unsplash.com` 已放行。
- 使用 `unpic` + `sharp` 处理优化。

### 8. 样式

- Tailwind 配置：`tailwind.config.js`
- 自定义 CSS 变量：`src/components/CustomStyles.astro`
- 主题模式：`ui.theme: 'system'`（默认跟随系统），支持 `dark:` 变体。
- 颜色通过 CSS 变量 `--aw-color-*` 注入，避免在业务代码中直接写死品牌色。

### 9. Sitemap & SEO

- 构建时自动生成 `dist/sitemap-index.xml` 和 `dist/sitemap-0.xml`（通过 `@astrojs/sitemap` 插件）。
- sitemap 配置在 `astro.config.ts` 中，过滤规则也在那里：
  - 排除了 `/tag/*`、`/landing/*` 等薄内容页面
- `public/robots.txt` 中声明了 `Sitemap: https://winki.win/sitemap-index.xml`
- Google Search Console 中提交该 URL 即可触发收录
- `src/config.yaml` 中的 `trailingSlash` 必须为 `true`，否则 sitemap URL 与 Cloudflare 实际路径不一致，导致 308 重定向，Google 无法读取

---

## 代码规范

- Prettier：`printWidth: 120`，`singleQuote: true`，`semi: true`，`trailingComma: 'es5'`
- ESLint：@eslint/js + typescript-eslint + eslint-plugin-astro
- 提交前运行 `npm run check`，确认无类型 / lint / 格式问题
- Astro 组件中避免混入非必要客户端 JS；站点以静态内容为主

---

## 注意事项

- `vendor/integration/` 是 Astrowind 的核心集成逻辑（配置加载、虚拟模块、robots.txt 自动化）。如非必要，不要改动。
- 站点 `site` 配置在 `astro.config.ts` 和 `src/config.yaml` 中都有定义；以 `src/config.yaml` 为准（由 integration 最终注入到 Astro 配置中）。
- 博客 permalink 为 `/%slug%`，即文章直接挂在根路径下，修改前请评估对 SEO 的影响。
- 外部脚本开关在 `astro.config.ts` 的 `hasExternalScripts`；当前为 `false`，GA 等第三方脚本不会注入。

---

## 扩展建议

- 新增产品落地页：在 `src/pages/homes/` 下新建 `.astro`，参考 `chronicle.astro` 结构，随后在 `src/navigation.ts` 中注册。
- 新增博客文章：在 `src/data/post/` 下新建 `.mdx` 或 `.md`，填写 frontmatter 即可自动生成路由。
- 调整站点信息：编辑 `src/config.yaml`，必要时同步 `src/layouts/Layout.astro` 和 SEO metadata。
