import { VocabularyList, VocabularyWord } from "@/types";

// 预定义场景词汇库
const SCENARIOS: Record<string, VocabularyList> = {
  超市: {
    core: [
      { pinyin: "shōu yín yuán", chinese: "收银员" },
      { pinyin: "huò jià", chinese: "货架" },
      { pinyin: "tuī chē", chinese: "推车" },
      { pinyin: "shāng pǐn", chinese: "商品" },
      { pinyin: "shōu yín tái", chinese: "收银台" },
    ],
    items: [
      { pinyin: "píng guǒ", chinese: "苹果" },
      { pinyin: "niú nǎi", chinese: "牛奶" },
      { pinyin: "miàn bāo", chinese: "面包" },
      { pinyin: "shuǐ guǒ", chinese: "水果" },
      { pinyin: "shū cài", chinese: "蔬菜" },
      { pinyin: "diàn shì", chinese: "电视" },
      { pinyin: "wán jù", chinese: "玩具" },
    ],
    environment: [
      { pinyin: "chū kǒu", chinese: "出口" },
      { pinyin: "rù kǒu", chinese: "入口" },
      { pinyin: "dēng", chinese: "灯" },
      { pinyin: "qiáng", chinese: "墙" },
      { pinyin: "zhǐ shì pái", chinese: "指示牌" },
    ],
  },
  医院: {
    core: [
      { pinyin: "yī shēng", chinese: "医生" },
      { pinyin: "hù shì", chinese: "护士" },
      { pinyin: "bing rén", chinese: "病人" },
      { pinyin: "yào", chinese: "药" },
      { pinyin: "zhěn suǒ", chinese: "诊所" },
    ],
    items: [
      { pinyin: "tǐ wēn ji", chinese: "体温计" },
      { pinyin: "tīng zhěn qì", chinese: "听诊器" },
      { pinyin: "yào píng", chinese: "药瓶" },
      { pinyin: "chuáng", chinese: "床" },
      { pinyin: "zhēn", chinese: "针" },
      { pinyin: "mián qiā", chinese: "棉签" },
      { pinyin: "kǒu zhào", chinese: "口罩" },
    ],
    environment: [
      { pinyin: "guà hào chù", chinese: "挂号处" },
      { pinyin: "yào fáng", chinese: "药房" },
      { pinyin: "zǒu láng", chinese: "走廊" },
      { pinyin: "dēng", chinese: "灯" },
      { pinyin: "bìng fáng", chinese: "病房" },
    ],
  },
  公园: {
    core: [
      { pinyin: "huā", chinese: "花" },
      { pinyin: "shù", chinese: "树" },
      { pinyin: "cǎo", chinese: "草" },
      { pinyin: "niǎo", chinese: "鸟" },
      { pinyin: "hú", chinese: "湖" },
    ],
    items: [
      { pinyin: "qiū qiān", chinese: "秋千" },
      { pinyin: "huá tǐ", chinese: "滑梯" },
      { pinyin: "bèi dèng", chinese: "板凳" },
      { pinyin: "lā jī tǒng", chinese: "垃圾桶" },
      { pinyin: "lu yíng", chinese: "露营" },
      { pinyin: "fēng zheng", chinese: "风筝" },
      { pinyin: "zi xíng chē", chinese: "自行车" },
    ],
    environment: [
      { pinyin: "xiǎo lù", chinese: "小路" },
      { pinyin: "qiáo", chinese: "桥" },
      { pinyin: "shān", chinese: "山" },
      { pinyin: "tiān", chinese: "天" },
      { pinyin: "yún", chinese: "云" },
    ],
  },
  学校: {
    core: [
      { pinyin: "lǎo shī", chinese: "老师" },
      { pinyin: "xué shēng", chinese: "学生" },
      { pinyin: "jiào shì", chinese: "教室" },
      { pinyin: "hēi bǎn", chinese: "黑板" },
      { pinyin: "zhuō zi", chinese: "桌子" },
    ],
    items: [
      { pinyin: "shū bāo", chinese: "书包" },
      { pinyin: "qiān bǐ", chinese: "铅笔" },
      { pinyin: "shū", chinese: "书" },
      { pinyin: "běn zi", chinese: "本子" },
      { pinyin: "chǐ zi", chinese: "尺子" },
      { pinyin: "xiàng pí", chinese: "橡皮" },
      { pinyin: "wén jù hé", chinese: "文具盒" },
    ],
    environment: [
      { pinyin: "xiào mén", chinese: "校门" },
      { pinyin: "cāo chǎng", chinese: "操场" },
      { pinyin: "tú shū guǎn", chinese: "图书馆" },
      { pinyin: "zǒu láng", chinese: "走廊" },
      { pinyin: "dēng", chinese: "灯" },
    ],
  },
  动物园: {
    core: [
      { pinyin: "lǎo hǔ", chinese: "老虎" },
      { pinyin: "shī zi", chinese: "狮子" },
      { pinyin: "hóu zi", chinese: "猴子" },
      { pinyin: "xiàng", chinese: "象" },
      { pinyin: "niǎo", chinese: "鸟" },
    ],
    items: [
      { pinyin: "píng zi", chinese: "瓶子" },
      { pinyin: "guǒ zi", chinese: "果子" },
      { pinyin: "ròu", chinese: "肉" },
      { pinyin: "cǎo", chinese: "草" },
      { pinyin: "shuǐ", chinese: "水" },
      { pinyin: "lóng zi", chinese: "笼子" },
      { pinyin: "qiáo", chinese: "桥" },
    ],
    environment: [
      { pinyin: "zhǐ shì pái", chinese: "指示牌" },
      { pinyin: "lù", chinese: "路" },
      { pinyin: "shù", chinese: "树" },
      { pinyin: "cǎo", chinese: "草" },
      { pinyin: "tiān", chinese: "天" },
    ],
  },
};

/**
 * 根据主题生成词汇列表
 * @param theme 主题/场景名称
 * @returns 词汇列表，如果主题不存在则返回通用词汇
 */
export function generateVocabulary(theme: string): VocabularyList {
  // 检查是否有预定义的词汇
  if (theme in SCENARIOS) {
    return SCENARIOS[theme];
  }

  // 返回通用默认词汇
  return {
    core: [
      { pinyin: "rén", chinese: "人" },
      { pinyin: "dōng xi", chinese: "东西" },
      { pinyin: "wù tǐ", chinese: "物体" },
    ],
    items: [
      { pinyin: "wù pǐn", chinese: "物品" },
      { pinyin: "gōng jù", chinese: "工具" },
      { pinyin: "cái liào", chinese: "材料" },
    ],
    environment: [
      { pinyin: "huán jìng", chinese: "环境" },
      { pinyin: "bèi jǐng", chinese: "背景" },
    ],
  };
}

/**
 * 将词汇列表格式化为提示词格式
 * @param vocabulary 词汇列表
 * @returns 格式化后的提示词字符串
 */
export function formatVocabularyForPrompt(vocabulary: VocabularyList): string {
  const formatWord = (word: VocabularyWord) => `${word.pinyin} ${word.chinese}`;

  let result = "";

  result += "**1. 核心角色与设施：**\n";
  result += vocabulary.core.map(formatWord).join(", ") + "\n\n";

  result += "**2. 常见物品/工具：**\n";
  result += vocabulary.items.map(formatWord).join(", ") + "\n\n";

  result += "**3. 环境与装饰：**\n";
  result += vocabulary.environment.map(formatWord).join(", ") + "\n";

  return result;
}

/**
 * 获取所有可用场景列表
 * @returns 场景名称数组
 */
export function getAvailableScenes(): string[] {
  return Object.keys(SCENARIOS);
}
