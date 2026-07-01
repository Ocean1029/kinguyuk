/* ============================================================
   KINGYUK — bilingual content data (products, ODM cases, team, culture)
   Ported from the original data-driven showcase / about scripts.
   ============================================================ */
import type { Lang } from "./dictionary";

/** A localized string. */
export type L = { en: string; zh: string };

/** Pick the active language for a localized value. */
export function tl(value: L, lang: Lang): string {
  return value[lang] ?? value.en;
}

/* ---------- shared labels ---------- */
export const LABELS = {
  view: { en: "View craft", zh: "查看工艺" },
  material: { en: "Material", zh: "材质" },
  construction: { en: "Construction", zh: "结构工艺" },
  weight: { en: "Weight", zh: "重量" },
  cutout: { en: "Cutout precision", zh: "开孔精度" },
  charging: { en: "Charging", zh: "充电规格" },
  compat: { en: "Compatibility", zh: "适配机型" },
  challenge: { en: "Challenge", zh: "挑战" },
  did: { en: "What we did", zh: "我们的做法" },
  result: { en: "Result", zh: "成果" },
  caseword: { en: "Case", zh: "案例" },
  confidential: { en: "Confidential brand", zh: "保密客户" },
} satisfies Record<string, L>;

export type SpecKey =
  | "material"
  | "construction"
  | "weight"
  | "cutout"
  | "charging"
  | "compat";

export type ProductItem = {
  id: string;
  name: string;
  tag: L;
  blurb: L;
  image?: string;
  specs: Partial<Record<SpecKey, L>>;
};

export type ProductCategory = {
  key: "phone" | "ipad" | "macbook";
  idx: string;
  name: L;
  statement: L;
  items: ProductItem[];
};

export const PRODUCTS: ProductCategory[] = [
  {
    key: "phone",
    idx: "01",
    name: { en: "Phone cases", zh: "手机保护壳" },
    statement: {
      en: "Full-grain leather wrapped as a single piece — every edge folded by hand, never cut and glued.",
      zh: "全粒面真皮一体包裹——每道边都手工折收，绝不裁切拼贴。",
    },
    items: [
      {
        id: "meridian",
        name: "Meridian",
        image: "/assets/products/meridian.png",
        tag: { en: "Full-grain leather", zh: "全粒面真皮" },
        blurb: {
          en: "Vegetable-tanned hide that deepens with the light it catches.",
          zh: "植鞣真皮，会随光阴沉淀出更深的色泽。",
        },
        specs: {
          material: { en: "Full-grain vegetable-tanned leather, 1.2 mm", zh: "植鞣全粒面真皮，1.2mm" },
          construction: { en: "Unibody wrap · hand-folded edge · no exposed seam", zh: "一体包裹 · 手工折边 · 无外露拼缝" },
          weight: { en: "32 g", zh: "32 克" },
          cutout: { en: "±0.1 mm CNC-matched ports & buttons", zh: "±0.1mm CNC 精准对位接口与按键" },
          charging: { en: "MagSafe-compatible · up to 100W passthrough", zh: "兼容 MagSafe · 最高 100W 隔壳快充" },
          compat: { en: "iPhone 15 / 16 · Pro · Pro Max", zh: "iPhone 15 / 16 · Pro · Pro Max" },
        },
      },
      {
        id: "halden",
        name: "Halden",
        image: "/assets/璟昱产品/A05-多功能腕带手机壳/外觀圖/橘色.png",
        tag: { en: "Nubuck suede", zh: "磨砂绒面" },
        blurb: { en: "A brushed nap that asks to be held.", zh: "细绒手感，让人忍不住握在掌心。" },
        specs: {
          material: { en: "Brushed nubuck suede over a microfiber core", zh: "磨砂绒面 + 超纤内芯" },
          construction: { en: "Unibody wrap · folded edge · soft-touch lining", zh: "一体包裹 · 折边收口 · 亲肤内衬" },
          weight: { en: "30 g", zh: "30 克" },
          cutout: { en: "±0.1 mm CNC-matched", zh: "±0.1mm CNC 精准对位" },
          charging: { en: "MagSafe array · 15W", zh: "MagSafe 磁吸 · 15W" },
          compat: { en: "iPhone 15 / 16 series", zh: "iPhone 15 / 16 系列" },
        },
      },
      {
        id: "arc",
        name: "Arc",
        image: "/assets/璟昱产品/肤感360支架壳(简肤精孔)/外觀圖/肤感360支架壳(简肤精孔)-1.png",
        tag: { en: "Liquid silicone", zh: "液态硅胶" },
        blurb: { en: "Soft-touch that shrugs off a whole day's smudges.", zh: "亲肤手感，一整天也不留指痕。" },
        specs: {
          material: { en: "Liquid silicone over a hardshell frame", zh: "液态硅胶 + 硬壳骨架" },
          construction: { en: "Dual-shot · raised camera lip · flocked interior", zh: "双色注塑 · 高出镜头唇边 · 内壁植绒" },
          weight: { en: "28 g", zh: "28 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe · 15W", zh: "MagSafe · 15W" },
          compat: { en: "iPhone 15 / 16 series", zh: "iPhone 15 / 16 系列" },
        },
      },
      {
        id: "folio",
        name: "Folio",
        image: "/assets/璟昱产品/K01-二合一卡包保护壳/外觀圖/蓝.png",
        tag: { en: "Leather + card", zh: "真皮 · 卡槽" },
        blurb: { en: "One card, kept exactly where your hand already is.", zh: "一张卡，正好收在掌心顺手之处。" },
        specs: {
          material: { en: "Full-grain leather · RFID-shielded pocket", zh: "全粒面真皮 · RFID 防护卡袋" },
          construction: { en: "Unibody wrap · folded edge · single-card slot", zh: "一体包裹 · 折边收口 · 单卡槽" },
          weight: { en: "38 g", zh: "38 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe-compatible (cards out) · 15W", zh: "兼容 MagSafe（取卡后）· 15W" },
          compat: { en: "iPhone 15 / 16 · Pro · Pro Max", zh: "iPhone 15 / 16 · Pro · Pro Max" },
        },
      },
      {
        id: "band",
        name: "Band",
        image: "/assets/璟昱产品/A02-diy表带手机壳/外觀圖/换接腕带壳-新版-蓝色.png",
        tag: { en: "Wristband case", zh: "腕带支架壳" },
        blurb: { en: "A strap that clips on, a kickstand that clicks out.", zh: "腕带一扣即合，支架一拨即出。" },
        specs: {
          material: { en: "Frosted PC + flexible TPU strap", zh: "磨砂 PC + 弹性 TPU 腕带" },
          construction: { en: "Modular strap system · integrated kickstand", zh: "模块化腕带系统 · 一体式支架" },
          weight: { en: "42 g", zh: "42 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe · 15W", zh: "MagSafe · 15W" },
          compat: { en: "iPhone 15 / 16 series", zh: "iPhone 15 / 16 系列" },
        },
      },
      {
        id: "aero",
        name: "Aero",
        image: "/assets/璟昱产品/A06-超薄PP手机壳/外觀圖/橘色.png",
        tag: { en: "Ultra-thin PP", zh: "超薄 PP" },
        blurb: { en: "Barely there — 0.4 mm between you and the aluminium.", zh: "几乎无感——仅 0.4mm 隔在你与铝壳之间。" },
        specs: {
          material: { en: "Polypropylene · 0.4 mm wall", zh: "聚丙烯 · 0.4mm 壁厚" },
          construction: { en: "Single-piece moulding · anti-fingerprint coating", zh: "一体成型 · 抗指纹涂层" },
          weight: { en: "12 g", zh: "12 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe-compatible · up to 15W", zh: "兼容 MagSafe · 最高 15W" },
          compat: { en: "iPhone 15 / 16 · Pro · Pro Max", zh: "iPhone 15 / 16 · Pro · Pro Max" },
        },
      },
      {
        id: "prism",
        name: "Prism",
        image: "/assets/璟昱产品/支架保护手机壳(透彩渐变)/外觀圖/2.png",
        tag: { en: "Gradient translucent", zh: "透彩渐变" },
        blurb: { en: "Colour that shifts as the light moves across the room.", zh: "色彩随光线穿过房间而流转。" },
        specs: {
          material: { en: "Translucent PC with gradient tint", zh: "透明 PC + 渐变色层" },
          construction: { en: "Dual-shot moulding · MagSafe ring · integrated kickstand", zh: "双色注塑 · MagSafe 磁环 · 一体式支架" },
          weight: { en: "34 g", zh: "34 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe · 15W", zh: "MagSafe · 15W" },
          compat: { en: "iPhone 15 / 16 series", zh: "iPhone 15 / 16 系列" },
        },
      },
      {
        id: "loop",
        name: "Loop",
        image: "/assets/璟昱产品/果冻支架腕带保护壳/外觀圖/果冻壳-20260522-11.png",
        tag: { en: "Jelly + ring grip", zh: "果冻 · 指环" },
        blurb: { en: "Soft enough to squeeze, with a ring that keeps it close.", zh: "软到想捏，指环又让它离不开掌心。" },
        specs: {
          material: { en: "Soft TPU jelly body · alloy ring grip", zh: "柔软 TPU 果冻壳体 · 合金指环" },
          construction: { en: "Single-piece moulding · retractable ring stand", zh: "一体成型 · 可收纳指环支架" },
          weight: { en: "36 g", zh: "36 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe · 15W", zh: "MagSafe · 15W" },
          compat: { en: "iPhone 15 / 16 series", zh: "iPhone 15 / 16 系列" },
        },
      },
      {
        id: "terra",
        name: "Terra",
        image: "/assets/璟昱产品/支架保护手机壳(实色)/外觀圖/1.png",
        tag: { en: "Solid colour kickstand", zh: "实色支架壳" },
        blurb: { en: "One colour, clean through — nothing to chip, nothing to fade.", zh: "通体一色——不会掉漆，不会褪色。" },
        specs: {
          material: { en: "Tinted PC body · clear bumper frame", zh: "彩色 PC 壳体 · 透明边框" },
          construction: { en: "Dual-shot moulding · hidden kickstand · MagSafe ring", zh: "双色注塑 · 隐藏式支架 · MagSafe 磁环" },
          weight: { en: "33 g", zh: "33 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "MagSafe · 15W", zh: "MagSafe · 15W" },
          compat: { en: "iPhone 15 / 16 series", zh: "iPhone 15 / 16 系列" },
        },
      },
    ],
  },
  {
    key: "ipad",
    idx: "02",
    name: { en: "iPad cases", zh: "iPad 保护套" },
    statement: {
      en: "Featherweight folios engineered around the device, not bolted onto it.",
      zh: "为设备量身打造的轻量折套——是贴身包裹，而非外挂附件。",
    },
    items: [
      {
        id: "atlas",
        name: "Atlas",
        image: "/assets/璟昱产品/KY-A1-iPad妙控键盘适配壳/外觀圖/ipad-皮革0000.png",
        tag: { en: "Leather + alloy", zh: "真皮 · 铝合金" },
        blurb: { en: "A desk that folds down to the size of the screen.", zh: "一张能折到屏幕大小的桌面。" },
        specs: {
          material: { en: "Full-grain leather over an aluminum backbone", zh: "全粒面真皮 + 铝合金中骨" },
          construction: { en: "Unibody tray · folded edge · magnetic keyboard deck", zh: "一体托盘 · 折边收口 · 磁吸键盘面" },
          weight: { en: "210 g (case only)", zh: "210 克（仅保护套）" },
          cutout: { en: "±0.1 mm · ports, speakers, Pencil dock", zh: "±0.1mm · 接口、扬声器、Pencil 槽位" },
          charging: { en: "100W gold-plated pins to keyboard & Pencil", zh: "100W 镀金弹针，为键盘与 Pencil 供电" },
          compat: { en: "iPad Pro 11″ / 13″ (M4)", zh: "iPad Pro 11″ / 13″（M4）" },
        },
      },
      {
        id: "plein",
        name: "Plein",
        image: "/assets/璟昱产品/066-IPAD超轻!超薄双面皮套/外觀圖/白色.png",
        tag: { en: "Full-grain leather", zh: "全粒面真皮" },
        blurb: { en: "It closes with a sound you'll quietly come to like.", zh: "合盖那一声轻响，会让人悄悄上瘾。" },
        specs: {
          material: { en: "Full-grain leather · felt-lined interior", zh: "全粒面真皮 · 绒毡内衬" },
          construction: { en: "Unibody wrap · folded edge · multi-angle magnetic stand", zh: "一体包裹 · 折边收口 · 多角度磁吸支撑" },
          weight: { en: "190 g", zh: "190 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "Apple Pencil pass-through charging", zh: "支持 Apple Pencil 隔套充电" },
          compat: { en: "iPad Air 11″ / 13″", zh: "iPad Air 11″ / 13″" },
        },
      },
      {
        id: "loom",
        name: "Loom",
        image: "/assets/璟昱产品/KY-Apro/外觀圖/蓝色.png",
        tag: { en: "Woven textile", zh: "再生织物" },
        blurb: { en: "A textile that holds its shape and keeps its color.", zh: "一种能定型、也守得住色彩的织物。" },
        specs: {
          material: { en: "Recycled woven textile over a PC frame", zh: "再生编织面料 + PC 骨架" },
          construction: { en: "Bonded weave · folded edge · 3-angle stand", zh: "复合编织 · 折边收口 · 三档支撑" },
          weight: { en: "185 g", zh: "185 克" },
          cutout: { en: "±0.1 mm", zh: "±0.1mm" },
          charging: { en: "Apple Pencil pass-through", zh: "支持 Apple Pencil 隔套充电" },
          compat: { en: "iPad 10th gen · Air", zh: "iPad 第十代 · Air" },
        },
      },
      {
        id: "sketch",
        name: "Sketch",
        image: "/assets/璟昱产品/066-IPAD超轻!超薄双面皮套/外觀圖/橙色.png",
        tag: { en: "Saffiano leather", zh: "十字纹真皮" },
        blurb: { en: "Built around the Pencil, not in spite of it.", zh: "为 Pencil 而生，而非将就。" },
        specs: {
          material: { en: "Saffiano cross-grain leather", zh: "十字纹（Saffiano）真皮" },
          construction: { en: "Unibody wrap · folded edge · full-length Pencil channel", zh: "一体包裹 · 折边收口 · 全长 Pencil 笔槽" },
          weight: { en: "200 g", zh: "200 克" },
          cutout: { en: "±0.1 mm · enclosed Pencil channel", zh: "±0.1mm · 封闭式 Pencil 笔槽" },
          charging: { en: "Apple Pencil pass-through", zh: "支持 Apple Pencil 隔套充电" },
          compat: { en: "iPad Pro 11″ / 13″", zh: "iPad Pro 11″ / 13″" },
        },
      },
    ],
  },
  {
    key: "macbook",
    idx: "03",
    name: { en: "MacBook cases", zh: "MacBook 保护套" },
    statement: {
      en: "Hardshells and sleeves milled to the millimetre, with vents that vanish into the form.",
      zh: "按毫米打磨的硬壳与内胆，散热孔隐入造型之中。",
    },
    items: [
      {
        id: "skin",
        name: "Skin",
        image: "/assets/璟昱产品/MacBook Neo 高透款/外觀圖/13寸Macbook-neo电脑壳渲染图-20260415-1.343.png",
        tag: { en: "Polycarbonate", zh: "聚碳酸酯" },
        blurb: { en: "A second surface, just 1.3 mm thin.", zh: "第二层表面，仅 1.3mm 之薄。" },
        specs: {
          material: { en: "Frosted polycarbonate · 1.3 mm wall", zh: "磨砂聚碳酸酯 · 1.3mm 壁厚" },
          construction: { en: "Snap-on two-piece · vented base · precision feet", zh: "上下扣合两件式 · 散热底面 · 精密脚垫" },
          weight: { en: "150 g (13″)", zh: "150 克（13″）" },
          cutout: { en: "±0.1 mm · ports, hinge & vents", zh: "±0.1mm · 接口、转轴与散热孔" },
          compat: { en: "MacBook Air / Pro · 13″–16″", zh: "MacBook Air / Pro · 13″–16″" },
        },
      },
      {
        id: "carry",
        name: "Carry",
        image: "/assets/璟昱产品/MacBook Neo 贴布款/外觀圖/贴布-1、.364.png",
        tag: { en: "Full-grain leather", zh: "全粒面真皮" },
        blurb: { en: "Slides in as if it were always part of the bag.", zh: "滑入包中，仿佛本就是包的一部分。" },
        specs: {
          material: { en: "Full-grain leather · wool-felt lining", zh: "全粒面真皮 · 羊毛毡内衬" },
          construction: { en: "Folded edge · magnetic flap · zipper-free", zh: "折边收口 · 磁吸翻盖 · 无拉链" },
          weight: { en: "180 g", zh: "180 克" },
          compat: { en: "13″ / 14″ / 15″ / 16″", zh: "13″ / 14″ / 15″ / 16″" },
        },
      },
      {
        id: "vellum",
        name: "Vellum",
        image: "/assets/璟昱产品/MacBook Neo 磨砂款/外觀圖/黑.png",
        tag: { en: "Wool felt", zh: "羊毛毡" },
        blurb: { en: "Dense merino felt that holds a clean, square edge.", zh: "致密美利奴羊毛毡，棱角干净利落。" },
        specs: {
          material: { en: "100% merino wool felt · 3 mm", zh: "100% 美利奴羊毛毡 · 3mm" },
          construction: { en: "Heat-pressed edge · hidden magnetic closure", zh: "热压封边 · 隐藏式磁吸开合" },
          weight: { en: "140 g", zh: "140 克" },
          compat: { en: "13″ / 14″ / 15″", zh: "13″ / 14″ / 15″" },
        },
      },
      {
        id: "duet",
        name: "Duet",
        image: "/assets/璟昱产品/MacBook Neo 双色壳/外觀圖/蓝.png",
        tag: { en: "Dual-colour PC", zh: "双色聚碳酸酯" },
        blurb: { en: "Two tones, one shell — the frame draws the line.", zh: "双色一壳——边框勾勒出分界。" },
        specs: {
          material: { en: "Clear polycarbonate body · coloured bumper frame", zh: "透明聚碳酸酯壳体 · 彩色边框" },
          construction: { en: "Snap-on two-piece · dual-colour injection", zh: "上下扣合两件式 · 双色注塑" },
          weight: { en: "160 g (13″)", zh: "160 克（13″）" },
          cutout: { en: "±0.1 mm · ports, hinge & vents", zh: "±0.1mm · 接口、转轴与散热孔" },
          compat: { en: "MacBook Air / Pro · 13″–16″", zh: "MacBook Air / Pro · 13″–16″" },
        },
      },
      {
        id: "prop",
        name: "Prop",
        image: "/assets/璟昱产品/MacBook Neo 贴布(支架)款/外觀圖/黑色.png",
        tag: { en: "Textile + kickstand", zh: "织物 · 支架" },
        blurb: { en: "Fabric-wrapped, with flip-out feet for a better typing angle.", zh: "织物包覆，翻折支脚带来更舒适的打字角度。" },
        specs: {
          material: { en: "Woven textile over a hardshell base", zh: "编织面料 + 硬壳底座" },
          construction: { en: "Snap-on · bonded textile · integrated flip-out kickstand", zh: "扣合式 · 贴合织物 · 一体式翻折支架" },
          weight: { en: "195 g (13″)", zh: "195 克（13″）" },
          cutout: { en: "±0.1 mm · ports, hinge & vents", zh: "±0.1mm · 接口、转轴与散热孔" },
          compat: { en: "MacBook Air / Pro · 13″–16″", zh: "MacBook Air / Pro · 13″–16″" },
        },
      },
    ],
  },
];

/* ---------- ODM case studies (one card, three states) ---------- */
export type CaseStudy = {
  state: "named" | "confidential";
  logo?: string;
  year?: string;
  sector: L;
  brand?: string;
  scope?: L;
  challenge: L;
  did: L;
  result: L;
};

export const CASES: CaseStudy[] = [
  {
    state: "named",
    logo: "V",
    year: "2025",
    sector: { en: "Italian leather goods", zh: "意大利皮具品牌" },
    brand: "Verso",
    scope: { en: "Phone case · full-grain leather", zh: "手机壳 · 全粒面真皮" },
    challenge: { en: "Carry a heritage bag's grain onto a phone, at scale.", zh: "将传世手袋的皮纹，规模化地搬到手机壳上。" },
    did: {
      en: "Matched their tannery's full-grain hide and tuned a folded edge to the bag's stitch line — then held that color across a full production run.",
      zh: "复刻其鞣制厂的全粒面皮料，将折边收口对齐手袋缝线，并在整批量产中守住同一皮色。",
    },
    result: { en: "3 hides color-matched · 4 markets · 1 finish", zh: "三色皮料精准匹配 · 四地首发 · 同一收口" },
  },
  {
    state: "confidential",
    sector: { en: "European outdoor brand", zh: "欧洲户外品牌" },
    challenge: { en: "A rugged iPad case that didn't feel like a brick.", zh: "一款够硬核、却不笨重的 iPad 保护套。" },
    did: { en: "Re-engineered the bumper into a single 200 g unibody with a vented spine.", zh: "将防撞结构重构为 200 克一体成型，并加入散热背脊。" },
    result: { en: "200 g unibody · 2.4 m drop-rated", zh: "200 克一体成型 · 2.4 米跌落认证" },
  },
  {
    state: "named",
    logo: "AN",
    year: "2024",
    sector: { en: "Scandinavian design studio", zh: "北欧设计工作室" },
    brand: "Atelier Nord",
    scope: { en: "MacBook sleeve · wool felt", zh: "MacBook 内胆 · 羊毛毡" },
    challenge: { en: "A MacBook sleeve as quiet as the rest of their line.", zh: "一只与其产品线同样克制的 MacBook 内胆。" },
    did: {
      en: "Milled a wool-felt shell to a 1.2 mm wall with a hidden magnetic closure — no visible hardware, no logo.",
      zh: "将羊毛毡内胆打磨至 1.2mm 壁厚，采用隐藏式磁吸开合——不露五金，不加 logo。",
    },
    result: { en: "1.2 mm wall · 100% wool felt · 0 visible hardware", zh: "1.2mm 壁厚 · 100% 羊毛毡 · 零外露五金" },
  },
  {
    state: "confidential",
    sector: { en: "North American audio brand", zh: "北美音频品牌" },
    challenge: { en: "A carry case that charges the earbuds through its shell.", zh: "一只能隔壳为耳机充电的收纳套。" },
    did: { en: "Routed 100W gold-plated pins beneath a seamless leather wrap.", zh: "在无缝真皮包裹之下，布设 100W 镀金弹针。" },
    result: { en: "100W passthrough · zero visible seams", zh: "100W 隔壳充电 · 无可见拼缝" },
  },
  {
    state: "named",
    logo: "K",
    year: "2025",
    sector: { en: "Japanese lifestyle brand", zh: "日本生活方式品牌" },
    brand: "Kasa",
    scope: { en: "Phone case · liquid silicone", zh: "手机壳 · 液态硅胶" },
    challenge: { en: "Pastel soft-touch cases with a precise, quiet finish.", zh: "一组马卡龙亲肤手机壳，要精准而内敛。" },
    did: {
      en: "Developed a 6-color liquid-silicone set with CNC-matched cutouts and a flocked, dust-free interior.",
      zh: "开发出六色液态硅胶系列，搭配 CNC 精准对位开孔与防尘植绒内壁。",
    },
    result: { en: "6 colorways · ±0.1 mm cutouts · 15W MagSafe", zh: "六款配色 · ±0.1mm 开孔 · 15W 磁吸" },
  },
  {
    state: "confidential",
    sector: { en: "Japanese stationery house", zh: "日本文具世家" },
    challenge: { en: "An iPad folio that doubles as a notebook cover.", zh: "一只兼作笔记本封套的 iPad 折套。" },
    did: { en: "Folded Saffiano leather around a Pencil channel and a multi-angle stand.", zh: "以十字纹真皮折包 Pencil 笔槽与多角度支撑。" },
    result: { en: "Pencil channel · 3-angle stand", zh: "Pencil 笔槽 · 三档支撑" },
  },
];

/* ---------- About: team grid ---------- */
export type TeamMember = { mono: string; role: L };
export type TeamGroup = { g: L; members: TeamMember[] };

export const TEAM: TeamGroup[] = [
  {
    g: { en: "Design", zh: "设计" },
    members: [
      { mono: "ID", role: { en: "Industrial design lead", zh: "工业设计主管" } },
      { mono: "ID", role: { en: "Senior industrial designer", zh: "资深工业设计" } },
      { mono: "CMF", role: { en: "CMF & materials", zh: "材料与色彩" } },
      { mono: "PT", role: { en: "Pattern & structure", zh: "纸格与结构" } },
      { mono: "GD", role: { en: "Brand & graphic", zh: "品牌与平面" } },
      { mono: "PR", role: { en: "Prototyping", zh: "手板打样" } },
    ],
  },
  {
    g: { en: "Engineering", zh: "工程" },
    members: [
      { mono: "SE", role: { en: "Structural engineer", zh: "结构工程师" } },
      { mono: "TL", role: { en: "Tooling lead", zh: "模具主管" } },
      { mono: "PE", role: { en: "Process engineer", zh: "工艺工程师" } },
      { mono: "TR", role: { en: "Test & reliability", zh: "测试与可靠性" } },
      { mono: "EE", role: { en: "Charge-pin electronics", zh: "弹针电子" } },
      { mono: "CN", role: { en: "CNC programming", zh: "CNC 编程" } },
    ],
  },
  {
    g: { en: "Operations & Quality", zh: "运营与品质" },
    members: [
      { mono: "PP", role: { en: "Production planning", zh: "生产计划" } },
      { mono: "QC", role: { en: "Quality control lead", zh: "品质主管" } },
      { mono: "SP", role: { en: "Sampling", zh: "打样对接" } },
      { mono: "SC", role: { en: "Sourcing", zh: "采购" } },
      { mono: "PS", role: { en: "Partner success", zh: "客户对接" } },
      { mono: "LG", role: { en: "Logistics & export", zh: "物流与出口" } },
    ],
  },
];

/* ---------- About: culture collage ---------- */
export type CultureItem = { ph: L; quote: L; cite: L };

export const CULTURE: CultureItem[] = [
  {
    ph: { en: "Monday, 7:40am — kettle on", zh: "周一早 7:40 — 水已烧上" },
    quote: { en: "First one in usually has the kettle on before the lights.", zh: "最早到的那个，多半在开灯前就把水烧上了。" },
    cite: { en: "— the cutting room", zh: "— 裁切车间" },
  },
  {
    ph: { en: "A 0.2 mm debate", zh: "0.2 毫米之争" },
    quote: { en: "We argue about a 0.2 mm radius like it's a typeface.", zh: "我们为 0.2 毫米的圆角争得像在争一款字体。" },
    cite: { en: "— design vs. tooling, again", zh: "— 设计与模具，又一次" },
  },
  {
    ph: { en: "Friday reject pile", zh: "周五退样堆" },
    quote: { en: "The reject pile from a Friday. Standards are standards.", zh: "周五的退样堆。标准就是标准。" },
    cite: { en: "— the QC bench", zh: "— 终检工位" },
  },
  {
    ph: { en: "The good samples", zh: "最好的样品" },
    quote: { en: "The best samples never quite make it home.", zh: "做得最好的样品，往往都没能带回家。" },
    cite: { en: "— everyone, guiltily", zh: "— 所有人，心虚地" },
  },
];
