'use client';

export interface FAQItem {
  keywords: string[];
  response: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const productFAQ: FAQItem[] = [
  {
    keywords: ['18650', '21700', 'cylindrical', 'cell', '圓柱', '電芯'],
    response: `我們可協助採購主流 18650 / 21700 圓柱電芯，例如 Samsung、LG、Molicel、EVE 等品牌或同級替代方案。

常見用途：
• 電動工具
• 電動自行車
• FPV / 高倍率設備
• 移動電源與電子產品

請提供目標型號、數量、用途與目的地國家，我們會確認庫存、起訂量、認證與出口方式。`,
  },
  {
    keywords: ['lifepo4', 'life po4', 'lithium iron', '磷酸鐵鋰', '儲能', '方形'],
    response: `磷酸鐵鋰產品適合家用儲能、工商業儲能、太陽能系統、房車與備電項目。

採購時建議提供：
• 容量與電壓需求
• 目標循環壽命
• 是否需要 UN38.3 / CE / UL / IEC62619 / MSDS
• 目的地國家與運輸方式

我們可按電芯、模組或完整系統協助整理報價。`,
  },
  {
    keywords: ['ebike', 'e-bike', 'electric bike', '電動自行車', '電動車', '滑板車'],
    response: `電動自行車電池常見規格包括 36V、48V、52V，容量可依續航需求選擇 10Ah、15Ah、20Ah 或更高。

請提供車型、電壓、容量、外殼形式、接頭、BMS 電流、數量與目的地，我們會協助確認可供方案。`,
  },
  {
    keywords: ['quote', 'price', 'rfq', '報價', '價格', '詢價', '批發'],
    response: `可以，請提供以下資料以便準確報價：

• 產品型號或應用場景
• 採購數量
• 目的地國家 / 地區
• 認證需求，例如 UN38.3、CE、UL、MSDS
• 是否需要樣品、批量訂單或 OEM

收到資料後，銷售會確認庫存、起訂量、交期、運輸與報價。`,
  },
  {
    keywords: ['certification', 'cert', 'ul', 'ce', 'msds', 'un38.3', '認證', '文件'],
    response: `常見可配合的文件包括 UN38.3、CE、UL、IEC62619、MSDS、RoHS 等，具體取決於產品型號與供應批次。

如果您的市場在香港、台灣、新加坡、歐美或東南亞，建議在詢價時先說明目的地與平台/清關要求。`,
  },
  {
    keywords: ['moq', 'minimum', 'quantity', '起訂', '最小訂購', '數量'],
    response: `不同產品的起訂量不同：

• 圓柱電芯：通常 50 至 200 pcs 起
• 方形磷酸鐵鋰：通常按箱或模組起訂
• 電動自行車 / 工具電池：通常 5 至 20 套起
• 客製化 OEM：依結構與開模需求確認

請告訴我們目標數量，我們會按產品線回覆實際 MOQ。`,
  },
  {
    keywords: ['shipping', 'delivery', 'logistics', '運輸', '出貨', '物流', '香港', '台灣', '新加坡'],
    response: `鋰電池運輸需要依產品類型、瓦時、數量、包裝與目的地確認。

常見方式包括海運、空運、專線或快遞。若目的地是香港、台灣、新加坡或其他海外華人市場，請提供地址國家/地區與預計數量，我們會評估可行運輸方案。`,
  },
  {
    keywords: ['custom', 'oem', 'odm', '客製', '定製', '訂製'],
    response: `可以評估 OEM / ODM 電池包項目。請提供：

• 電壓與容量
• 尺寸與外殼要求
• 最大放電電流
• BMS、接頭與線材
• 目標應用與認證需求

我們會先確認技術可行性、樣品週期與批量起訂量。`,
  },
  {
    keywords: ['contact', 'phone', 'email', 'whatsapp', '聯絡', '電話', '電郵'],
    response: `您可以直接聯絡 Batlienergy 銷售：

WhatsApp：+86 138 0013 8000
Email：julian@batelithium.com
地點：中國深圳

建議同時提供產品型號、數量、目的地與認證需求，方便更快回覆。`,
  },
];

export const quickReplies = [
  {
    id: 'product-inquiry',
    label: '產品諮詢',
    icon: 'box',
    placeholder: '我想了解 18650 / 21700 電芯產品',
  },
  {
    id: 'get-quote',
    label: '索取報價',
    icon: 'quote',
    placeholder: '請提供 48V 100Ah 電池的批發報價',
  },
  {
    id: 'order-status',
    label: '詢價狀態',
    icon: 'list',
    placeholder: '我想跟進我的詢價狀態',
  },
  {
    id: 'contact-agent',
    label: '聯絡銷售',
    icon: 'contact',
    placeholder: '我想與銷售人員聯絡',
  },
];

export function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  for (const faq of productFAQ) {
    if (faq.keywords.some((keyword) => lowerMessage.includes(keyword.toLowerCase()))) {
      return faq.response;
    }
  }

  return `感謝您的諮詢。為了給您更準確的電池報價，請提供以下資料：

• 產品型號或應用場景
• 電壓、容量或尺寸需求
• 採購數量
• 目的地國家 / 地區
• 認證需求，例如 UN38.3、CE、UL、MSDS

您也可以直接聯絡：
WhatsApp：+86 138 0013 8000
Email：julian@batelithium.com`;
}

export const welcomeMessage = `您好，歡迎來到 Batlienergy。

我可以協助您了解鋰電池產品、起訂量、認證文件、運輸方式與批發詢價流程。

請告訴我您的產品用途、目標型號或採購數量。`;
