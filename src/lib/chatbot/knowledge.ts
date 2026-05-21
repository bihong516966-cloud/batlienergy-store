'use client';

// 产品知识库 - 为AI聊天机器人提供锂电池专业知识

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

// B2B锂电池产品常见问答
export const productFAQ: FAQItem[] = [
  // 18650圆柱形电池
  {
    keywords: ['18650', 'cylindrical', 'cell', '圆柱', '圆柱形'],
    response: `我们提供来自三星SDI、LG、松下和三洋等顶级品牌的高品质18650圆柱形电芯。我们的B2B批发价从$0.80/只起（订购1000只以上）。

🔥 热门型号：
• 三星 25R - 2500mAh, 25A持续放电
• 三星 30Q - 3000mAh, 15A持续放电  
• LG HG2 - 3000mAh, 20A持续放电
• 松下 NCR18650B - 3400mAh, 容量型

批量采购可享阶梯价格优惠，欢迎询价！`,
  },

  // LiFePO4磷酸铁锂电池
  {
    keywords: ['lifepo4', 'life po4', 'lithium iron', '磷酸铁', '铁锂'],
    response: `我们的LiFePO4磷酸铁锂电池非常适合储能系统、电动汽车和太阳能应用。

✨ 产品优势：
• 卓越的热稳定性，安全性高
• 超长循环寿命（2000+次循环）
• 容量范围：50Ah - 400Ah
• 可定制电压和容量配置
• 支持OEM/ODM服务

典型应用：太阳能储能、家庭储能柜、UPS备用电源、房车电池等。`,
  },

  // 电动车电池
  {
    keywords: ['ebike', 'e-bike', 'electric bike', '电动车', '电单车', '电动自行车'],
    response: `我们专业生产电动车电池组，容量从10Ah到30Ah不等。

🛵 产品规格：
• 电压选项：36V, 48V, 72V
• 容量范围：10Ah - 30Ah
• 所有电池组均配备BMS保护板
• IP67防水等级
• CE/UL认证

🔥 热销型号：48V 15Ah 隐形电动车电池 - $189/套起（10套起订）`,
  },

  // 太阳能储能
  {
    keywords: ['solar', '储能', 'storage', 'solar storage', '太阳能', '家庭储能'],
    response: `我们的太阳能储能系统解决方案涵盖从小型家用到大型工业应用。

☀️ 推荐配置：
• 家用储能：堆叠式LiFePO4电池（5-20kWh）
• 壁挂式设计，节省空间
• 兼容主流逆变器品牌（Victron, SMA, Solis等）
• 10年质保，循环寿命6000+次

🔥 热销：48V 100Ah 壁挂式储能电池 - $899/套起`,
  },

  // 询价和报价
  {
    keywords: ['quote', 'price', '报价', '价格', '询价', 'cost'],
    response: `感谢您对BatlieEnergy产品的关注！

📋 我们的报价流程：
1. 提供您的具体需求（型号/容量/电压/数量）
2. 24小时内给出详细报价
3. 确认后3-5天内发货
4. 提供FOB/CIF/DDP等多种贸易条款

💰 付款方式：T/T, L/C, PayPal, Alibaba Trade Assurance

批量订单可享受更优惠的价格，请告诉我们您的需求！`,
  },

  // 认证和资质
  {
    keywords: ['certification', 'cert', 'ul', 'ce', '认证', '资质', '证书'],
    response: `我们产品已通过多项国际认证：

✅ 电池认证：
• CE认证（欧盟）
• UL1642 / UL2054（美国）
• UN38.3（运输安全）
• RoHS合规
• MSDS报告

✅ 工厂认证：
• ISO9001质量管理体系
• ISO14001环境管理体系
• BSCI社会责任感审核

如需特定认证文件，请联系我们的销售团队。`,
  },

  // 最小订购量
  {
    keywords: ['moq', 'minimum', 'quantity', '起订', '最小订购', '批量', '数量'],
    response: `我们的最小订购量（MOQ）根据产品类型而定：

📦 标准MOQ：
• 18650电芯：1000只/型号
• LiFePO4电池组：10套
• 电动车电池：10套
• 定制产品：50套起

💡 大批量订单（10000+）可享额外折扣，欢迎洽谈长期合作协议！`,
  },

  // 样品政策
  {
    keywords: ['sample', '样品', '试用'],
    response: `我们提供样品服务：

📦 样品政策：
• 大部分产品支持样品订购
• 样品价格：零售价的1.5-2倍
• 样品运费到付
• 批量订单可抵扣样品费用

⏱️ 样品准备时间：3-5个工作日

部分产品有库存，可快速发货！`,
  },

  // 运输和物流
  {
    keywords: ['shipping', 'delivery', 'logistics', '运输', '发货', '物流', '快递'],
    response: `我们提供灵活的运输方案：

🚢 运输方式：
• 空运：5-7个工作日（急单）
• 海运：25-35个工作日（大批量）
• 快递（DHL/FedEx/UPS）：3-5个工作日

📍 发货港口：中国深圳/广州/香港

我们可协助处理出口文件、清关手续，提供FOB/CIF/DDP等贸易条款。`,
  },

  // 质量和保修
  {
    keywords: ['warranty', 'guarantee', 'quality', '保修', '质保', '质量'],
    response: `我们严格把控产品质量：

✅ 质量保证：
• 100%出厂测试，包括容量、内阻、安全测试
• 全程质量追溯
• 不良率<0.1%

🛡️ 保修政策：
• 电芯：12个月
• 电池组（含BMS）：24个月
• 定制产品：根据协议

如出现质量问题，我们提供退换货服务。`,
  },

  // BMS和保护功能
  {
    keywords: ['bms', 'protection', 'management system', '保护板', '保护', '管理系统'],
    response: `所有电池组均配备高品质BMS保护系统：

🔧 BMS功能：
• 过充保护（OVP）
• 过放保护（UVP）
• 短路保护（SCP）
• 过流保护（OCP）
• 温度保护（OTP/UTP）
• 均衡功能（被动均衡/主动均衡）

可选功能：
• 蓝牙/App监控
• GPS定位
• 远程锁机
• CAN总线通信`,
  },

  // 定制服务
  {
    keywords: ['custom', 'oem', 'odm', '定制', '贴牌', '定制化'],
    response: `我们提供全面的OEM/ODM定制服务：

🔧 定制选项：
• 容量定制（从几Ah到上千Ah）
• 电压定制（3.2V-800V）
• 尺寸和形状定制
• 品牌LOGO印刷
• 包装定制
• 功能定制（蓝牙、GPS等）

📋 定制流程：
1. 需求沟通 → 2. 方案确认 → 3. 样品制作 → 4. 确认订单 → 5. 批量生产

定制产品MOQ通常为50套起。`,
  },

  // 付款条款
  {
    keywords: ['payment', 'pay', '付款', '支付', 'terms'],
    response: `我们接受多种付款方式：

💳 付款选项：
• T/T 电汇（30%预付，70%发货前付清）
• L/C 信用证（适合大额订单）
• PayPal（适合小额样品订单）
• Alibaba Trade Assurance（交易保障）
• 西联汇款

💡 信用付款：长期合作客户可申请赊账额度。`,
  },

  // 联系方式
  {
    keywords: ['contact', 'phone', 'email', 'whatsapp', '联系', '电话', '邮箱'],
    response: `联系我们：

📞 WhatsApp/电话：+86 138 0013 8000
📧 邮箱：julian@batelithium.com
🏢 公司：深圳巴特能源有限公司

⏰ 服务时间：周一至周六 9:00-18:00（中国时间）

我们会尽快回复您的咨询！`,
  },
];

// 快速回复模板
export const quickReplies = [
  {
    id: 'product-inquiry',
    label: '📦 产品咨询',
    icon: '📦',
    placeholder: '我想了解你们的18650电池产品',
  },
  {
    id: 'get-quote',
    label: '💰 获取报价',
    icon: '💰',
    placeholder: '请给我一份48V 100Ah电池的报价',
  },
  {
    id: 'order-status',
    label: '📋 订单状态',
    icon: '📋',
    placeholder: '查询我的订单状态',
  },
  {
    id: 'contact-agent',
    label: '📞 联系客服',
    icon: '📞',
    placeholder: '我想和人工客服沟通',
  },
];

// 生成AI回复
export function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // 遍历FAQ查找匹配
  for (const faq of productFAQ) {
    if (faq.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return faq.response;
    }
  }

  // 默认回复
  return `感谢您的咨询！我们的锂电池专家团队随时为您服务。

为了给您更准确的报价，请提供以下信息：

• 📍 应用场景（电动车、太阳能储能、电动工具等）
• ⚡ 所需容量和电压
• 📦 订购数量
• 💰 目标价格（如有）

您也可以直接联系我们：
📞 WhatsApp: +86 138 0013 8000
📧 邮箱: julian@batelithium.com

我们将尽快回复您！`;
}

// 欢迎消息
export const welcomeMessage = `👋 您好！欢迎来到BatlieEnergy！

我是您的AI智能助手，专门为您提供锂电池产品咨询和报价服务。

我可以帮您：

🔋 **产品推荐** - 根据您的需求推荐合适的电池产品
💰 **获取报价** - 快速获取B2B批发价格
📋 **订单查询** - 查询订单状态和物流信息
❓ **技术咨询** - 解答电池技术相关问题

请告诉我您的需求，或选择以下快捷操作：`;
