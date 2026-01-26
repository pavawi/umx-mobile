// Mock 数据

// 系统通知 - 用于顶部小喇叭（平台通知：系统更新、规则通知等）
export const systemNotices = [
  { id: '8acb83269bcf72c6019be8d49aac6c81', type: 'system', title: '第23期珍珠宝箱奖励公布', content: '第23期珍珠宝箱内含藏品奖励公布...', createTime: '2026-01-23', isRead: false },
  { id: '8acb83259bcf72c6019be8bb7673572b', type: 'swap', title: '经典重铸计划 |《勇往直前》', content: '本期"经典重铸计划"——许力《勇往直前》...', createTime: '2026-01-23', isRead: false },
  { id: '8acb83259bcf72c6019be48637016f4b', type: 'decompose', title: '仙人掌故事|陈培芳《棋盘人生》分解', content: '华之衣裹旧日之魂，于棋盘之上跳当代之舞...', createTime: '2026-01-22', isRead: true },
];

// 活动通知 - 用于轮播下方的通知条（活动公告）
export const activityNotices = [
  { id: '1', type: 'activity', title: '仙人掌故事陈培芳《棋盘人生》分解', link: '/activity/1' },
  { id: '2', type: 'activity', title: '华夏珍藏：实物及付相关公告', link: '/activity/2' },
  { id: '3', type: 'activity', title: '新春特惠活动火热进行中，限量藏品等你来抢', link: '/activity/3' },
];

// 运营推荐位 - 首页宫格入口（热门推荐，可配置售卖链接）
export const featureGridItems = [
  { id: '1', image: 'https://picsum.photos/400/300?random=50', title: 'U卡限时特惠', subtitle: '新用户专享', badge: '热门', link: '/ucard' },
  { id: '2', title: '市场', subtitle: '美妙的香槟样泡泡...', iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', link: '/market' },
  { id: '3', title: '今日热榜', subtitle: '每天24点更新', iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', link: '/hot' },
  { id: '4', title: '加入社群', subtitle: '好友相伴，共创新纪元', iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', link: '/community' },
];

// 活动轮播
export const banners = [
  { id: '1', image: 'https://oss.umxverse.com/image/origin/dpn5wAxsNksGApepG88.jpg', title: '活动公告', link: 'https://umxverse.com/#/notification/details?id=8acb83209bb2e21a019bb5fb6f9d1b95' },
  { id: '2', image: 'https://oss.umxverse.com/image/origin/23Fr5J368eW6MbXWeQG.jpeg', title: '平台公告', link: 'https://umxverse.com/#/notification/details?id=8acb817496569d0e0196854f44195d88' },
  { id: '3', image: 'https://oss.umxverse.com/image/origin/SDSc2w8WwF6i3Hcbd2T.png', title: '精选推荐', link: 'https://umxverse.com/#/notification/details?id=8acb833095db9d940195dba8c5aa000d' },
];

// 活动入口
export const quickEntries = [
  { id: '1', icon: '🎁', title: 'U卡商城', link: '/ucard' },
  { id: '2', icon: '💎', title: 'U豆兑换', link: '/udou' },
  { id: '3', icon: '🔥', title: '热门合成', link: '/compose' },
  { id: '4', icon: '📢', title: '官方公告', link: '/notice' },
];

// 活动中心入口
export const activityEntries = [
  { id: '1', type: 'competition', title: 'UMX 艺术公开赛', status: 'ended', statusText: '已结束', link: '/activity/competition' },
  { id: '2', type: 'treasure', title: '寻宝岛', status: 'active', link: '/activity/treasure' },
  { id: '3', type: 'chest', title: '深海宝箱', status: 'active', link: '/activity/chest' },
  { id: '4', type: 'pearl', title: '珍珠宝箱', status: 'active', link: '/activity/pearl' },
  { id: '5', type: 'library', title: '藏品库', status: 'active', link: '/collection-library' },
  { id: '6', type: 'upool', title: 'U贝池', status: 'active', link: '/activity/upool' },
];

// 推荐位
export const recommendBanners = [
  { id: '1', image: 'https://picsum.photos/686/386?random=10', title: 'U卡限时特惠', badge: '限时', link: '/ucard' },
  { id: '2', image: 'https://picsum.photos/686/386?random=11', title: 'U豆双倍返', badge: '热门', link: '/udou' },
];

// 首页Tab
export const homeTabs = [
  { value: 'hot', label: '首发热卖' },
  { value: 'original', label: '原作版画' },
  { value: 'custom', label: '私人高定' },
];

// 热卖分类
export const hotCategories = [
  { value: 'all', label: '全部' },
  { value: 'ushare', label: 'U享区' },
  { value: 'new', label: '新品区' },
  { value: 'select', label: '精选区' },
  { value: 'limited', label: '限量区' },
];

// 藏品库分类
export const marketCategories = [
  { value: 'all', label: '全部' },
  { value: 'art', label: '艺术视界' },
  { value: 'meta', label: 'Meta Zone' },
  { value: 'music', label: '音浪聚场' },
  { value: 'game', label: '游戏世界' },
  { value: 'sports', label: '体育竞技' },
];

// 排序选项
export const sortOptions = [
  { value: 'latest', label: '最新' },
  { value: 'price_asc', label: '价格升序' },
  { value: 'price_desc', label: '价格降序' },
];

// 年份筛选
export const yearFilters = [
  { value: 'all', label: '全部' },
  { value: '2026', label: '2026年' },
  { value: '2025', label: '2025年' },
  { value: '2024', label: '2024年' },
  { value: '2023', label: '2023年' },
];

// 藏品列表 - 热卖
export const hotCollections = [
  {
    id: '8acb83269bcf72c6019be8bddc026c0e',
    name: '勇往直前',
    image: 'https://oss.umxverse.com/image/origin/P7zyGM3SKdJ6EmxSY6w.png',
    imageRatio: '1:1',
    creator: '许力',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'selling',
    type: '琢贝区',
    typeLabel: '琢贝区',
    issueCount: 1800,
    price: 2000,
    onSale: 106,
    description: '本期"经典重铸计划"——许力《勇往直前》。目标藏品：许力《勇往直前》（绢本综合材料，40cm×88cm，2019年）',
    blockchain: 'BSN',
    contractAddress: '(售卖结束后上链)',
    tokenId: 'U00P463',
  },
  {
    id: '8acb83259bcf72c6019be466c0e8671a',
    name: '街角',
    image: 'https://oss.umxverse.com/image/origin/GibS3EtQrWnK52zmCsD.png',
    imageRatio: '1:1',
    creator: '许力',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'selling',
    type: '合成',
    typeLabel: '合成藏品',
    issueCount: 1505,
    price: 990,
    onSale: 6,
    description: '目标藏品：许力《街角》（布面油画， 66cm×40cm ，2022年）',
    blockchain: 'BSN',
    contractAddress: '106701',
    tokenId: 'U00P461',
  },
  {
    id: '8acb83269bcf72c6019be489ae7a7eab',
    name: '棋盘人生',
    image: 'https://oss.umxverse.com/image/origin/BKKYAj8Dhk6Kj4Y784N.jpg',
    imageRatio: '4:3',
    creator: '陈培芳',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'soldout',
    type: '琢贝区',
    typeLabel: '琢贝区',
    issueCount: 3520,
    price: 990,
    onSale: 0,
    description: '目标藏品：陈培芳《棋盘人生》（120X100cm，布面油画，2019年）',
    blockchain: 'BSN',
    contractAddress: '106702',
    tokenId: 'U00P462',
  },
  {
    id: '8acb83259bcf72c6019bdefb76506fe4',
    name: '气息',
    image: 'https://oss.umxverse.com/image/origin/kGY22AYNX63Thn7jG5J.jpg',
    imageRatio: '4:3',
    creator: '胡山山',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'soldout',
    type: '琢贝区',
    typeLabel: '琢贝区',
    issueCount: 3000,
    price: 1500,
    onSale: 0,
    description: '目标藏品：胡山山《气息》（80x100 cm，布面油画，2022年创）',
    blockchain: 'BSN',
    contractAddress: '106700',
    tokenId: 'U00P460',
  },
  {
    id: '8acb83259bcf72c6019bdee03b526d0c',
    name: '四月飞花',
    image: 'https://oss.umxverse.com/image/origin/a8nncd7fX2kJAz2YPdT.jpg',
    imageRatio: '4:3',
    creator: '冯戈',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'selling',
    type: '琢贝区',
    typeLabel: '琢贝区',
    issueCount: 2500,
    price: 1800,
    onSale: 63,
    description: '本期"经典重铸计划"—— 冯戈《四月飞花》。',
    blockchain: 'BSN',
    contractAddress: '106699',
    tokenId: 'U00P459',
  },
  {
    id: '8acb83239bc0ec81019bc4bd52222da4',
    name: '起舞',
    image: 'https://oss.umxverse.com/image/origin/PWChnePBmsxjrX4AP2k.jpg',
    imageRatio: '4:3',
    creator: '雷双',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'selling',
    type: '精选区',
    typeLabel: '精选区',
    issueCount: 3200,
    price: 8800,
    onSale: 21,
    description: '藏品名称：雷双《起舞》2024年，麻布油彩，80x60cm',
    blockchain: 'BSN',
    contractAddress: '106697',
    tokenId: 'U00P458',
  },
  {
    id: '8acb83209bb2e21a019bc0706bcc4425',
    name: '采蓝·芙蓉花',
    image: 'https://oss.umxverse.com/image/origin/tctEne76Hykk3ihKrtE.png',
    imageRatio: '1:1',
    creator: '庄子',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'soldout',
    type: '新品区',
    typeLabel: '新品区',
    issueCount: 300,
    price: 88800,
    onSale: 0,
    description: '目标藏品：庄子《采蓝·芙蓉花》（80+160cm×2 ，布面油画 ，2025年）',
    blockchain: 'BSN',
    contractAddress: '106695',
    tokenId: 'U00P457',
  },
  {
    id: '8acb83209bb2e21a019bbb6e496220da',
    name: '梦症盲盒',
    image: 'https://oss.umxverse.com/image/origin/Yaye8i2AyayWsYjA2dx.jpg',
    imageRatio: '1:1',
    creator: 'umx.art',
    creatorAvatar: 'https://oss.umxverse.com/image/2021-07-21/aCUxhdImg_835b5a1b8b3be9cf05cd63f4a7446e271626831574249.jpg',
    status: 'selling',
    type: '新品区',
    typeLabel: '新品区',
    issueCount: 10000,
    price: 6800,
    onSale: 278,
    description: '盲盒内含10000份数字艺术藏品，包含SSR、SR、N级藏品',
    blockchain: 'BSN',
    contractAddress: '106689',
    tokenId: 'U00P450',
  },
  {
    id: '8acb83209bb2e21a019bbaa7d1186b8a',
    name: '三棵树',
    image: 'https://oss.umxverse.com/image/origin/5yZYGBT8xWTxbNk5N3G.png',
    imageRatio: '1:1',
    creator: '许力',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    status: 'selling',
    type: '琢贝区',
    typeLabel: '琢贝区',
    issueCount: 2885,
    price: 666600,
    onSale: 462,
    description: '藏品名称：许力——《三棵树》 绢本综合材料 88cm×120cm 2024年',
    blockchain: 'BSN',
    contractAddress: '106688',
    tokenId: 'U00P449',
  },
];

// 藏品列表 - 市场/藏品库
export const marketCollections = [
  {
    id: '8acb83269bcf72c6019be8bddc026c0e',
    name: '勇往直前',
    image: 'https://oss.umxverse.com/image/origin/P7zyGM3SKdJ6EmxSY6w.png',
    imageRatio: '1:1',
    creator: '许力',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 2000,
    onSale: 106,
    total: 1800,
    platform: true,
    description: '许力《勇往直前》（绢本综合材料，40cm×88cm，2019年）',
    blockchain: 'BSN',
    contractAddress: '(售卖结束后上链)',
    tokenId: 'U00P463',
  },
  {
    id: '8acb83259bcf72c6019be466c0e8671a',
    name: '街角',
    image: 'https://oss.umxverse.com/image/origin/GibS3EtQrWnK52zmCsD.png',
    imageRatio: '1:1',
    creator: '许力',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 990,
    onSale: 6,
    total: 1505,
    platform: true,
    description: '许力《街角》（布面油画， 66cm×40cm ，2022年）',
    blockchain: 'BSN',
    contractAddress: '106701',
    tokenId: 'U00P461',
  },
  {
    id: '8acb83269bcf72c6019be489ae7a7eab',
    name: '棋盘人生',
    image: 'https://oss.umxverse.com/image/origin/BKKYAj8Dhk6Kj4Y784N.jpg',
    imageRatio: '4:3',
    creator: '陈培芳',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 990,
    onSale: 0,
    total: 3520,
    platform: true,
    description: '陈培芳《棋盘人生》（120X100cm，布面油画，2019年）',
    blockchain: 'BSN',
    contractAddress: '106702',
    tokenId: 'U00P462',
  },
  {
    id: '8acb83259bcf72c6019bdefb76506fe4',
    name: '气息',
    image: 'https://oss.umxverse.com/image/origin/kGY22AYNX63Thn7jG5J.jpg',
    imageRatio: '4:3',
    creator: '胡山山',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 1500,
    onSale: 0,
    total: 3000,
    platform: true,
    description: '胡山山《气息》（80x100 cm，布面油画，2022年创）',
    blockchain: 'BSN',
    contractAddress: '106700',
    tokenId: 'U00P460',
  },
  {
    id: '8acb83259bcf72c6019bdee03b526d0c',
    name: '四月飞花',
    image: 'https://oss.umxverse.com/image/origin/a8nncd7fX2kJAz2YPdT.jpg',
    imageRatio: '4:3',
    creator: '冯戈',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 1800,
    onSale: 63,
    total: 2500,
    platform: true,
    description: '冯戈《四月飞花》经典重铸计划',
    blockchain: 'BSN',
    contractAddress: '106699',
    tokenId: 'U00P459',
  },
  {
    id: '8acb83239bc0ec81019bc4bd52222da4',
    name: '起舞',
    image: 'https://oss.umxverse.com/image/origin/PWChnePBmsxjrX4AP2k.jpg',
    imageRatio: '4:3',
    creator: '雷双',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 8800,
    onSale: 21,
    total: 3200,
    platform: true,
    description: '雷双《起舞》2024年，麻布油彩，80x60cm',
    blockchain: 'BSN',
    contractAddress: '106697',
    tokenId: 'U00P458',
  },
  {
    id: '8acb83209bb2e21a019bc0706bcc4425',
    name: '采蓝·芙蓉花',
    image: 'https://oss.umxverse.com/image/origin/tctEne76Hykk3ihKrtE.png',
    imageRatio: '1:1',
    creator: '庄子',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 88800,
    onSale: 0,
    total: 300,
    platform: true,
    description: '庄子《采蓝·芙蓉花》（80+160cm×2 ，布面油画 ，2025年）',
    blockchain: 'BSN',
    contractAddress: '106695',
    tokenId: 'U00P457',
  },
  {
    id: '8acb83209bb2e21a019bbb6e496220da',
    name: '梦症盲盒',
    image: 'https://oss.umxverse.com/image/origin/Yaye8i2AyayWsYjA2dx.jpg',
    imageRatio: '1:1',
    creator: 'umx.art',
    creatorAvatar: 'https://oss.umxverse.com/image/2021-07-21/aCUxhdImg_835b5a1b8b3be9cf05cd63f4a7446e271626831574249.jpg',
    price: 6800,
    onSale: 278,
    total: 10000,
    platform: true,
    description: '盲盒内含10000份数字艺术藏品',
    blockchain: 'BSN',
    contractAddress: '106689',
    tokenId: 'U00P450',
  },
  {
    id: '8acb83209bb2e21a019bbaa7d1186b8a',
    name: '三棵树',
    image: 'https://oss.umxverse.com/image/origin/5yZYGBT8xWTxbNk5N3G.png',
    imageRatio: '1:1',
    creator: '许力',
    creatorAvatar: 'https://oss.umxverse.com/image/origin/WGHR24PZDtHHJtbRxj2.png',
    price: 1200,
    onSale: 462,
    total: 2885,
    platform: true,
    description: '许力《三棵树》绢本综合材料 88cm×120cm 2024年',
    blockchain: 'BSN',
    contractAddress: '106688',
    tokenId: 'U00P449',
  },
];

// 首页藏品 - 简洁版
export const homeCollections = [
  { id: '8acb83269bcf72c6019be8bddc026c0e', name: '勇往直前', image: 'https://oss.umxverse.com/image/origin/P7zyGM3SKdJ6EmxSY6w.png', imageRatio: '1:1', total: 1800, description: '许力《勇往直前》绢本综合材料', blockchain: 'BSN', contractAddress: '(售卖结束后上链)', tokenId: 'U00P463' },
  { id: '8acb83259bcf72c6019be466c0e8671a', name: '街角', image: 'https://oss.umxverse.com/image/origin/GibS3EtQrWnK52zmCsD.png', imageRatio: '1:1', total: 1505, description: '许力《街角》布面油画', blockchain: 'BSN', contractAddress: '106701', tokenId: 'U00P461' },
  { id: '8acb83269bcf72c6019be489ae7a7eab', name: '棋盘人生', image: 'https://oss.umxverse.com/image/origin/BKKYAj8Dhk6Kj4Y784N.jpg', imageRatio: '4:3', total: 3520, description: '陈培芳《棋盘人生》布面油画', blockchain: 'BSN', contractAddress: '106702', tokenId: 'U00P462' },
  { id: '8acb83259bcf72c6019bdefb76506fe4', name: '气息', image: 'https://oss.umxverse.com/image/origin/kGY22AYNX63Thn7jG5J.jpg', imageRatio: '4:3', total: 3000, description: '胡山山《气息》布面油画', blockchain: 'BSN', contractAddress: '106700', tokenId: 'U00P460' },
];

// 用户信息
export const userInfo = {
  uid: '123456789',
  nickname: '数字藏家',
  avatar: 'https://i.pravatar.cc/200?img=10',
  verified: true,
  chainAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e912',
  assetValue: 12580.00,
  collectionCount: 28,
  delistedCount: 3,
};

// 个人中心菜单
export const profileMenus = [
  {
    title: '',
    items: [
      { icon: 'wallet', label: '钱包', path: '/wallet' },
      { icon: 'history', label: '交易历史', path: '/history' },
      { icon: 'sell', label: '出售签发', path: '/sell' },
      { icon: 'invite', label: '邀请好友', path: '/invite' },
    ],
  },
  {
    title: '',
    items: [
      { icon: 'collection', label: '作品清单', path: '/collections' },
      { icon: 'asset', label: '资产记录', path: '/assets' },
      { icon: 'badge', label: 'UMX资质', path: '/qualification' },
      { icon: 'contact', label: '联系我们', path: '/contact' },
    ],
  },
  {
    title: '',
    items: [
      { icon: 'notice', label: '官方公告', path: '/announcement' },
      { icon: 'community', label: '社区', path: '/community' },
      { icon: 'yuanyu', label: '圆域', path: '/yuanyu' },
    ],
  },
];

// 搜索历史
export const searchHistory = ['星际漫游者', '数字山水', '赛博朋克', '限量版'];

// 热门搜索
export const hotSearches = ['新春限定', 'VIP专属', '合成材料', '稀有藏品'];

// 我的关注列表
export const myFollowList = [
  {
    id: '8acb83269bcf72c6019be8bddc026c0e',
    name: '梅园启春',
    image: 'https://oss.umxverse.com/image/origin/P7zyGM3SKdJ6EmxSY6w.png',
    code: 'S/120000000/元宝M53A',
    onSale: 4,
    total: 843,
  },
  {
    id: '8acb83259bcf72c6019be466c0e8671a',
    name: '拾光者-四叠景',
    image: 'https://oss.umxverse.com/image/origin/GibS3EtQrWnK52zmCsD.png',
    code: 'S/149999/元宝M3663',
    onSale: null,
    total: null,
  },
  {
    id: '8acb83269bcf72c6019be489ae7a7eab',
    name: '只看好运（至福限定）',
    image: 'https://oss.umxverse.com/image/origin/BKKYAj8Dhk6Kj4Y784N.jpg',
    code: 'S/119999/元宝v0123',
    onSale: 13,
    total: 0,
  },
  {
    id: '8acb83259bcf72c6019bdefb76506fe4',
    name: 'iBox次仲春',
    image: 'https://oss.umxverse.com/image/origin/kGY22AYNX63Thn7jG5J.jpg',
    code: 'S/1000000/元宝e727',
    onSale: 21,
    total: 10,
  },
  {
    id: '8acb83259bcf72c6019bdee03b526d0c',
    name: '毛场·阿贝斯',
    image: 'https://oss.umxverse.com/image/origin/a8nncd7fX2kJAz2YPdT.jpg',
    code: 'S/1000000/元宝9767',
    onSale: null,
    total: 2242,
  },
  {
    id: '8acb83239bc0ec81019bc4bd52222da4',
    name: '大美瑶族',
    image: 'https://oss.umxverse.com/image/origin/PWChnePBmsxjrX4AP2k.jpg',
    code: 'S/118888/元宝9488',
    onSale: 29,
    total: 0,
  },
  {
    id: '8acb83209bb2e21a019bc0706bcc4425',
    name: 'iBox招福猫',
    image: 'https://oss.umxverse.com/image/origin/tctEne76Hykk3ihKrtE.png',
    code: 'S/1000000/元宝v122',
    onSale: 54,
    total: 0,
  },
];
