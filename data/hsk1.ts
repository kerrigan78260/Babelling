export type Phrase = {
  id: number;
  hanzi: string;
  pinyin: string;
  translation: string;
};

export const hsk1: Phrase[] = [
  {
    id: 1,
    hanzi: '你好',
    pinyin: 'Nǐ hǎo',
    translation: 'Bonjour',
  },
  {
    id: 2,
    hanzi: '你好吗？',
    pinyin: 'Nǐ hǎo ma?',
    translation: 'Comment vas-tu ?',
  },
  {
    id: 3,
    hanzi: '我很好。',
    pinyin: 'Wǒ hěn hǎo.',
    translation: 'Je vais très bien.',
  },
  {
    id: 4,
    hanzi: '谢谢。',
    pinyin: 'Xièxie.',
    translation: 'Merci.',
  },
  {
    id: 5,
    hanzi: '不客气。',
    pinyin: 'Bú kèqi.',
    translation: 'De rien.',
  },
  {
    id: 6,
    hanzi: '再见。',
    pinyin: 'Zàijiàn.',
    translation: 'Au revoir.',
  },
  {
    id: 7,
    hanzi: '你叫什么名字？',
    pinyin: 'Nǐ jiào shénme míngzi?',
    translation: 'Comment t’appelles-tu ?',
  },
  {
    id: 8,
    hanzi: '我叫亚历山大。',
    pinyin: 'Wǒ jiào Yàlìshāndà.',
    translation: 'Je m’appelle Alexandre.',
  },
  {
    id: 9,
    hanzi: '你是哪国人？',
    pinyin: 'Nǐ shì nǎ guó rén?',
    translation: 'De quel pays es-tu ?',
  },
  {
    id: 10,
    hanzi: '我是法国人。',
    pinyin: 'Wǒ shì Fǎguó rén.',
    translation: 'Je suis français.',
  },
  {
    id: 11,
    hanzi: '你会说中文吗？',
    pinyin: 'Nǐ huì shuō Zhōngwén ma?',
    translation: 'Sais-tu parler chinois ?',
  },
  {
    id: 12,
    hanzi: '我会说一点中文。',
    pinyin: 'Wǒ huì shuō yìdiǎn Zhōngwén.',
    translation: 'Je parle un peu chinois.',
  },
  {
    id: 13,
    hanzi: '我听不懂。',
    pinyin: 'Wǒ tīng bù dǒng.',
    translation: 'Je ne comprends pas ce que j’entends.',
  },
  {
    id: 14,
    hanzi: '请再说一遍。',
    pinyin: 'Qǐng zài shuō yí biàn.',
    translation: 'Veuillez répéter.',
  },
  {
    id: 15,
    hanzi: '请慢一点说。',
    pinyin: 'Qǐng màn yìdiǎn shuō.',
    translation: 'Parlez un peu plus lentement, s’il vous plaît.',
  },
  {
    id: 16,
    hanzi: '这是什么？',
    pinyin: 'Zhè shì shénme?',
    translation: 'Qu’est-ce que c’est ?',
  },
  {
    id: 17,
    hanzi: '这是什么东西？',
    pinyin: 'Zhè shì shénme dōngxi?',
    translation: 'C’est quoi, cette chose ?',
  },
  {
    id: 18,
    hanzi: '我喜欢喝茶。',
    pinyin: 'Wǒ xǐhuan hē chá.',
    translation: 'J’aime boire du thé.',
  },
  {
    id: 19,
    hanzi: '我想喝水。',
    pinyin: 'Wǒ xiǎng hē shuǐ.',
    translation: 'Je voudrais boire de l’eau.',
  },
  {
    id: 20,
    hanzi: '多少钱？',
    pinyin: 'Duōshao qián?',
    translation: 'Combien ça coûte ?',
  },
];