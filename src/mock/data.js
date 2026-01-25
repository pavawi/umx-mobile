// Mock 数据

// 系统通知 - 用于顶部小喇叭（平台通知：系统更新、规则通知等）
export const systemNotices = [
  { id: '1', type: 'system_update', title: '系统更新：v2.5.0版本已发布，新增藏品合成功能', content: '新版本新增藏品合成功能...', createTime: '2026-01-25', isRead: false },
  { id: '2', type: 'rule_change', title: '交易规则调整：寄售手续费降至1%', content: '为回馈用户...', createTime: '2026-01-24', isRead: false },
  { id: '3', type: 'maintenance', title: '系统维护通知：1月26日凌晨2:00-4:00', content: '届时将暂停服务...', createTime: '2026-01-23', isRead: true },
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
  { id: '1', image: 'https://picsum.photos/750/400?random=1', title: '新春特惠活动', link: '/activity/1' },
  { id: '2', image: 'https://picsum.photos/750/400?random=2', title: '限量首发预告', link: '/activity/2' },
  { id: '3', image: 'https://picsum.photos/750/400?random=3', title: 'VIP会员福利', link: '/activity/3' },
];

// 活动入口
export const quickEntries = [
  { id: '1', icon: '🎁', title: 'U卡商城', link: '/ucard' },
  { id: '2', icon: '💎', title: 'U豆兑换', link: '/udou' },
  { id: '3', icon: '🔥', title: '热门合成', link: '/compose' },
  { id: '4', icon: '📢', title: '官方公告', link: '/notice' },
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
    id: '1',
    name: '星际漫游者 #001',
    image: 'https://picsum.photos/400/400?random=21',
    imageRatio: '1:1',
    creator: '艺术家小明',
    creatorAvatar: 'https://i.pravatar.cc/100?img=1',
    status: 'selling',
    type: '合成',
    typeLabel: '合成藏品',
    issueCount: 1000,
    price: 299,
    description: '星际漫游者系列是一组探索宇宙边界的数字艺术作品，融合了科幻与梦幻元素，展现人类对未知宇宙的无限想象。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e912',
    tokenId: '1001',
  },
  {
    id: '2',
    name: '数字山水·春',
    image: 'https://picsum.photos/300/400?random=22',
    imageRatio: '3:4',
    creator: '水墨大师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=2',
    status: 'presale',
    type: 'VIP',
    typeLabel: 'VIP版税惠品',
    issueCount: 500,
    price: 599,
    description: '传统水墨画与现代数字技术的完美融合，将中国传统山水意境以全新方式呈现，春意盎然，生机勃勃。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e913',
    tokenId: '1002',
  },
  {
    id: '3',
    name: '赛博朋克城市',
    image: 'https://picsum.photos/400/225?random=23',
    imageRatio: '16:9',
    creator: '未来设计师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=3',
    status: 'selling',
    type: '限量',
    typeLabel: '限量藏品',
    issueCount: 200,
    price: 999,
    description: '霓虹闪烁的未来都市，高科技与低生活的碰撞，描绘了一个充满科技感与赛博朋克风格的城市景象。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e914',
    tokenId: '1003',
  },
  {
    id: '4',
    name: '东方神韵',
    image: 'https://picsum.photos/400/300?random=24',
    imageRatio: '4:3',
    creator: '国风画师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=4',
    status: 'soldout',
    type: '首发',
    typeLabel: '首发藏品',
    issueCount: 888,
    price: 388,
    description: '融合中国传统文化精髓，将东方美学以数字艺术形式传承发扬，每一笔都蕴含着深厚的文化底蕴。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e915',
    tokenId: '1004',
  },
  {
    id: '5',
    name: '抽象几何 #12',
    image: 'https://picsum.photos/400/400?random=25',
    imageRatio: '1:1',
    creator: '几何艺术家',
    creatorAvatar: 'https://i.pravatar.cc/100?img=5',
    status: 'selling',
    type: '合成',
    typeLabel: '合成藏品',
    issueCount: 666,
    price: 199,
    description: '几何与色彩的交响曲，用最纯粹的形状和颜色构建出独特的视觉语言，每一个角度都有新的发现。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e916',
    tokenId: '1005',
  },
  {
    id: '6',
    name: '梦幻星球',
    image: 'https://picsum.photos/300/400?random=26',
    imageRatio: '3:4',
    creator: '星空创作者',
    creatorAvatar: 'https://i.pravatar.cc/100?img=6',
    status: 'presale',
    type: '限量',
    typeLabel: '限量藏品',
    issueCount: 300,
    price: 799,
    description: '探索未知星系的奇幻之旅，每一颗星球都有独特的故事，带你穿越银河，寻找梦想中的家园。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e917',
    tokenId: '1006',
  },
];

// 藏品列表 - 市场/藏品库
export const marketCollections = [
  {
    id: '1',
    name: '星际漫游者 #001',
    image: 'https://picsum.photos/400/400?random=31',
    imageRatio: '1:1',
    creator: '艺术家小明',
    creatorAvatar: 'https://i.pravatar.cc/100?img=1',
    price: 328,
    onSale: 156,
    total: 1000,
    platform: true,
    description: '星际漫游者系列是一组探索宇宙边界的数字艺术作品，融合了科幻与梦幻元素。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e912',
    tokenId: '2001',
  },
  {
    id: '2',
    name: '数字山水·春',
    image: 'https://picsum.photos/300/400?random=32',
    imageRatio: '3:4',
    creator: '水墨大师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=2',
    price: 688,
    onSale: 89,
    total: 500,
    platform: true,
    description: '传统水墨画与现代数字技术的完美融合，将中国传统山水意境以全新方式呈现。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e913',
    tokenId: '2002',
  },
  {
    id: '3',
    name: '赛博朋克城市',
    image: 'https://picsum.photos/400/225?random=33',
    imageRatio: '16:9',
    creator: '未来设计师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=3',
    price: 1299,
    onSale: 23,
    total: 200,
    platform: true,
    description: '霓虹闪烁的未来都市，高科技与低生活的碰撞，描绘了赛博朋克风格的城市景象。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e914',
    tokenId: '2003',
  },
  {
    id: '4',
    name: '东方神韵',
    image: 'https://picsum.photos/400/300?random=34',
    imageRatio: '4:3',
    creator: '国风画师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=4',
    price: 458,
    onSale: 234,
    total: 888,
    platform: true,
    description: '融合中国传统文化精髓，将东方美学以数字艺术形式传承发扬。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e915',
    tokenId: '2004',
  },
  {
    id: '5',
    name: '抽象几何 #12',
    image: 'https://picsum.photos/400/400?random=35',
    imageRatio: '1:1',
    creator: '几何艺术家',
    creatorAvatar: 'https://i.pravatar.cc/100?img=5',
    price: 228,
    onSale: 312,
    total: 666,
    platform: true,
    description: '几何与色彩的交响曲，用最纯粹的形状和颜色构建出独特的视觉语言。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e916',
    tokenId: '2005',
  },
  {
    id: '6',
    name: '梦幻星球',
    image: 'https://picsum.photos/300/400?random=36',
    imageRatio: '3:4',
    creator: '星空创作者',
    creatorAvatar: 'https://i.pravatar.cc/100?img=6',
    price: 899,
    onSale: 67,
    total: 300,
    platform: true,
    description: '探索未知星系的奇幻之旅，每一颗星球都有独特的故事。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e917',
    tokenId: '2006',
  },
  {
    id: '7',
    name: '像素冒险家',
    image: 'https://picsum.photos/400/225?random=37',
    imageRatio: '16:9',
    creator: '像素大师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=7',
    price: 168,
    onSale: 445,
    total: 999,
    platform: true,
    description: '复古像素风格的冒险者形象，致敬经典游戏时代的美好回忆。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e918',
    tokenId: '2007',
  },
  {
    id: '8',
    name: '流光溢彩',
    image: 'https://picsum.photos/400/300?random=38',
    imageRatio: '4:3',
    creator: '光影艺术家',
    creatorAvatar: 'https://i.pravatar.cc/100?img=8',
    price: 528,
    onSale: 178,
    total: 600,
    platform: true,
    description: '光与影的艺术表达，捕捉瞬间的绚丽色彩，呈现视觉的极致享受。',
    blockchain: 'BSN',
    contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e919',
    tokenId: '2008',
  },
];

// 首页藏品 - 简洁版
export const homeCollections = [
  { id: '1', name: '星际漫游者', image: 'https://picsum.photos/400/400?random=41', imageRatio: '1:1', total: 1000, description: '探索宇宙边界的数字艺术作品', blockchain: 'BSN', contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e912', tokenId: '3001' },
  { id: '2', name: '数字山水', image: 'https://picsum.photos/300/400?random=42', imageRatio: '3:4', total: 500, description: '传统水墨画与现代数字技术的融合', blockchain: 'BSN', contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e913', tokenId: '3002' },
  { id: '3', name: '赛博朋克', image: 'https://picsum.photos/400/225?random=43', imageRatio: '16:9', total: 200, description: '霓虹闪烁的未来都市景象', blockchain: 'BSN', contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e914', tokenId: '3003' },
  { id: '4', name: '东方神韵', image: 'https://picsum.photos/400/300?random=44', imageRatio: '4:3', total: 888, description: '东方美学的数字艺术传承', blockchain: 'BSN', contractAddress: '0x991481b491e1e1642c430b932572e4f1a8d5e915', tokenId: '3004' },
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
    ],
  },
];

// 搜索历史
export const searchHistory = ['星际漫游者', '数字山水', '赛博朋克', '限量版'];

// 热门搜索
export const hotSearches = ['新春限定', 'VIP专属', '合成材料', '稀有藏品'];
