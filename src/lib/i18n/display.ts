import { Category, Product } from "@/data/products";

export function isZhHant(locale: string) {
  return locale === "zh";
}

export function tx(locale: string, english: string, traditional: string) {
  return isZhHant(locale) ? traditional : english;
}

const categoryZh: Record<string, { name: string; description: string }> = {
  cylindrical: {
    name: "圓柱電芯（18650 / 21700）",
    description: "Samsung、LG、Molicel、EVE 等主流高倍率電芯，適用於電動工具、電動自行車與電子產品。",
  },
  lifepo4: {
    name: "磷酸鐵鋰方形電芯",
    description: "CATL、BYD、EVE 等儲能系統常用方形磷酸鐵鋰電芯。",
  },
  ebike: {
    name: "電動自行車電池",
    description: "36V 至 52V 電池組，適用於電動自行車、滑板車與維修更換市場。",
  },
  tricycle: {
    name: "電動三輪車電池",
    description: "48V 至 72V 電池組，適用於貨運三輪車、客運三輪車與海外代步車市場。",
  },
  fpv: {
    name: "FPV 無人機電池",
    description: "FPV 穿越機、競速機與航拍用途的高倍率 LiPo 電池。",
  },
  powertool: {
    name: "電動工具電池",
    description: "Milwaukee、DeWalt、Makita 等相容替換電池與通用工具電池。",
  },
  portable: {
    name: "戶外便攜電源",
    description: "300W 至 3000W 便攜式儲能電源，適合露營、備電與戶外作業。",
  },
  "large-cylindrical": {
    name: "32650 / 32700 磷酸鐵鋰",
    description: "大型圓柱磷酸鐵鋰電芯，適用於太陽能路燈、小型儲能與備用電源。",
  },
  lipo: {
    name: "聚合物鋰電池包",
    description: "穿戴裝置、藍牙音箱、遙控模型與小型電子產品用 LiPo 電池。",
  },
  "4680": {
    name: "4680 大圓柱電芯",
    description: "新一代大尺寸圓柱電芯，面向電動車、儲能與高能量密度應用。",
  },
  "home-storage": {
    name: "家用儲能系統",
    description: "完整磷酸鐵鋰儲能系統，適用於住宅太陽能、備電與海外安裝項目。",
  },
};

const specZh: Record<string, string> = {
  Capacity: "容量",
  Voltage: "電壓",
  "Max Discharge": "最大放電",
  Chemistry: "化學體系",
  Weight: "重量",
  Dimensions: "尺寸",
  "Cycle Life": "循環壽命",
  Energy: "能量",
  Range: "續航",
  "C-Rate": "放電倍率",
  Cells: "電芯配置",
  "AC Output": "交流輸出",
  "Peak Power": "峰值功率",
  Ports: "接口",
};

const badgeZh: Record<string, string> = {
  "Best Seller": "熱銷款",
  Hot: "熱門",
  "Top Rated": "高評價",
  New: "新品",
  Popular: "受歡迎",
  Premium: "高端款",
};

const productDescriptionZh: Record<string, string> = {
  "samsung-25r": "主流 18650 動力電芯，常用於電動工具與電動自行車，容量與放電能力平衡。",
  "samsung-30q": "高容量 18650 電芯，適合手電筒、電子設備與移動電源等應用。",
  "samsung-35e": "超高容量 18650 電芯，適合低耗電設備、醫療設備與筆電類應用。",
  "samsung-50e": "高容量 21700 電芯，適合儲能、電動車與高性能電池組。",
  "lg-hg2": "可靠高倍率 18650 電芯，適合電動工具、電動自行車與高電流應用。",
  "molicel-p28a": "超高放電 18650 電芯，適合 FPV、電子煙及高功率設備。",
  "molicel-p42a": "高端 21700 高倍率電芯，適合對可靠性要求高的 OEM 項目。",
  "lifepo4-100ah": "小型儲能與太陽能系統常用的緊湊型磷酸鐵鋰方形電芯。",
  "catl-200ah": "住宅與工商業儲能常用的中容量磷酸鐵鋰方形電芯。",
  "catl-280ah": "商業儲能與大型儲能項目常見的大容量標準方形電芯。",
  "eve-314ah": "新一代超大容量磷酸鐵鋰電芯，適合工商業及大型儲能。",
  "ebike-36v10ah": "輕量電動自行車電池，適合城市通勤與日常代步。",
  "ebike-48v15ah": "主流電動自行車電池包，在續航、重量與成本之間平衡。",
  "ebike-48v20ah": "長續航電動自行車電池，適合長距離通勤與山地車。",
  "ebike-52v175ah": "高性能電動自行車電池，適合高速車型與大功率車型。",
  "trike-48v30ah": "標準電動三輪車電池，適合載貨與載客三輪車。",
  "trike-60v40ah": "高容量三輪車電池，適合重載電動三輪車與海外營運車型。",
  "trike-72v50ah": "長續航高容量三輪車電池，適合印度、東南亞等市場。",
  "lipo-1s-650": "室內 FPV 小機常用輕量 LiPo 電池。",
  "lipo-4s-1550": "FPV 花飛主流電池，兼顧動力與飛行時間。",
  "lipo-6s-1300": "6S 高電壓 FPV 競速與花飛電池。",
  "lipo-6s-4000": "大容量航拍 FPV 電池，適合更長飛行時間與掛載設備。",
  "milwaukee-m18-5ah": "Milwaukee M18 相容高容量替換電池。",
  "dewalt-20v-5ah": "DeWalt 20V Max 相容替換電池，適合維修與批發市場。",
  "makita-18v-5ah": "Makita 18V 相容替換電池，適合工具電池批發與維修。",
  "generic-18v-5ah": "通用 18V 工具電池，適合多品牌替換與價格敏感市場。",
  "pps-300w": "小型便攜電源，適合露營、戶外活動與緊急備電。",
  "pps-1000w": "中功率便攜電源，適合家庭備電、露營與戶外作業。",
  "pps-2000w": "高功率便攜電源，適合家庭備電、工地與離網生活。",
  "32650-6000": "32650 磷酸鐵鋰電芯，適合太陽能路燈與小型儲能。",
  "32700-7000": "32700 高容量磷酸鐵鋰電芯，適合太陽能與儲能應用。",
  "lipo-wearable-500": "超薄 LiPo 電池，適合智慧手錶、手環與穿戴設備。",
  "lipo-speaker-3000": "標準 LiPo 電池包，適合藍牙音箱、移動電源與小型設備。",
  "lipo-2s-2200": "2S LiPo 電池包，適合遙控車、船與航模。",
  "4680-tesla": "新一代 4680 大圓柱電芯，適合電動車與儲能。",
  "home-12v100ah": "12.8V 磷酸鐵鋰電池，可替代鉛酸電池，適合房車、船舶與太陽能。",
  "home-48v100ah": "48V 家用儲能系統，適合住宅太陽能與備用電源。",
  "home-48v200ah": "10kWh 大容量住宅儲能系統，適合全屋備電與太陽能項目。",
};

export function categoryName(locale: string, category?: Category | null) {
  if (!category) return "";
  return isZhHant(locale) ? categoryZh[category.id]?.name || category.name : category.name;
}

export function categoryDescription(locale: string, category?: Category | null) {
  if (!category) return "";
  return isZhHant(locale)
    ? categoryZh[category.id]?.description || category.description
    : category.description;
}

export function specLabel(locale: string, key: string) {
  return isZhHant(locale) ? specZh[key] || key : key;
}

export function badgeLabel(locale: string, badge?: string) {
  if (!badge) return "";
  return isZhHant(locale) ? badgeZh[badge] || badge : badge;
}

export function productDescription(locale: string, product: Product) {
  return isZhHant(locale)
    ? productDescriptionZh[product.id] || product.description
    : product.description;
}
