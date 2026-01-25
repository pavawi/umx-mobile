// Mock 数据

// 系统通知
export const systemNotices = [
  { id: '1', type: 'system_update', title: '系统更新：v2.5.0版本已发布，新增藏品合成功能', content: '新版本新增藏品合成功能...', createTime: '2026-01-25', isRead: false },
  { id: '2', type: 'rule_change', title: '交易规则调整：寄售手续费降至1%', content: '为回馈用户...', createTime: '2026-01-24', isRead: false },
  { id: '3', type: 'maintenance', title: '系统维护通知：1月26日凌晨2:00-4:00', content: '届时将暂停服务...', createTime: '2026-01-23', isRead: true },
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
    creator: '艺术家小明',
    creatorAvatar: 'https://i.pravatar.cc/100?img=1',
    status: 'selling',
    type: '合成',
    typeLabel: '合成藏品',
    issueCount: 1000,
    price: 299,
  },
  {
    id: '2',
    name: '数字山水·春',
    image: 'https://picsum.photos/400/400?random=22',
    creator: '水墨大师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=2',
    status: 'presale',
    type: 'VIP',
    typeLabel: 'VIP版税惠品',
    issueCount: 500,
    price: 599,
  },
  {
    id: '3',
    name: '赛博朋克城市',
    image: 'https://picsum.photos/400/400?random=23',
    creator: '未来设计师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=3',
    status: 'selling',
    type: '限量',
    typeLabel: '限量藏品',
    issueCount: 200,
    price: 999,
  },
  {
    id: '4',
    name: '东方神韵',
    image: 'https://picsum.photos/400/400?random=24',
    creator: '国风画师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=4',
    status: 'soldout',
    type: '首发',
    typeLabel: '首发藏品',
    issueCount: 888,
    price: 388,
  },
  {
    id: '5',
    name: '抽象几何 #12',
    image: 'https://picsum.photos/400/400?random=25',
    creator: '几何艺术家',
    creatorAvatar: 'https://i.pravatar.cc/100?img=5',
    status: 'selling',
    type: '合成',
    typeLabel: '合成藏品',
    issueCount: 666,
    price: 199,
  },
  {
    id: '6',
    name: '梦幻星球',
    image: 'https://picsum.photos/400/400?random=26',
    creator: '星空创作者',
    creatorAvatar: 'https://i.pravatar.cc/100?img=6',
    status: 'presale',
    type: '限量',
    typeLabel: '限量藏品',
    issueCount: 300,
    price: 799,
  },
];

// 藏品列表 - 市场/藏品库
export const marketCollections = [
  {
    id: '1',
    name: '星际漫游者 #001',
    image: 'https://picsum.photos/400/400?random=31',
    creator: '艺术家小明',
    creatorAvatar: 'https://i.pravatar.cc/100?img=1',
    price: 328,
    onSale: 156,
    total: 1000,
    platform: true,
  },
  {
    id: '2',
    name: '数字山水·春',
    image: 'https://picsum.photos/400/400?random=32',
    creator: '水墨大师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=2',
    price: 688,
    onSale: 89,
    total: 500,
    platform: true,
  },
  {
    id: '3',
    name: '赛博朋克城市',
    image: 'https://picsum.photos/400/400?random=33',
    creator: '未来设计师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=3',
    price: 1299,
    onSale: 23,
    total: 200,
    platform: true,
  },
  {
    id: '4',
    name: '东方神韵',
    image: 'https://picsum.photos/400/400?random=34',
    creator: '国风画师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=4',
    price: 458,
    onSale: 234,
    total: 888,
    platform: true,
  },
  {
    id: '5',
    name: '抽象几何 #12',
    image: 'https://picsum.photos/400/400?random=35',
    creator: '几何艺术家',
    creatorAvatar: 'https://i.pravatar.cc/100?img=5',
    price: 228,
    onSale: 312,
    total: 666,
    platform: true,
  },
  {
    id: '6',
    name: '梦幻星球',
    image: 'https://picsum.photos/400/400?random=36',
    creator: '星空创作者',
    creatorAvatar: 'https://i.pravatar.cc/100?img=6',
    price: 899,
    onSale: 67,
    total: 300,
    platform: true,
  },
  {
    id: '7',
    name: '像素冒险家',
    image: 'https://picsum.photos/400/400?random=37',
    creator: '像素大师',
    creatorAvatar: 'https://i.pravatar.cc/100?img=7',
    price: 168,
    onSale: 445,
    total: 999,
    platform: true,
  },
  {
    id: '8',
    name: '流光溢彩',
    image: 'https://picsum.photos/400/400?random=38',
    creator: '光影艺术家',
    creatorAvatar: 'https://i.pravatar.cc/100?img=8',
    price: 528,
    onSale: 178,
    total: 600,
    platform: true,
  },
];

// 首页藏品 - 简洁版
export const homeCollections = [
  { id: '1', name: '星际漫游者', image: 'https://picsum.photos/400/400?random=41', total: 1000 },
  { id: '2', name: '数字山水', image: 'https://picsum.photos/400/400?random=42', total: 500 },
  { id: '3', name: '赛博朋克', image: 'https://picsum.photos/400/400?random=43', total: 200 },
  { id: '4', name: '东方神韵', image: 'https://picsum.photos/400/400?random=44', total: 888 },
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
      { icon: '💰', label: '钱包', path: '/wallet' },
      { icon: '📋', label: '交易历史', path: '/history' },
      { icon: '📤', label: '出售签发', path: '/sell' },
      { icon: '👥', label: '邀请好友', path: '/invite' },
    ],
  },
  {
    title: '',
    items: [
      { icon: '📚', label: '作品清单', path: '/collections' },
      { icon: '📊', label: '资产记录', path: '/assets' },
      { icon: '🏆', label: 'UMX资质', path: '/qualification' },
      { icon: '📞', label: '联系我们', path: '/contact' },
    ],
  },
  {
    title: '',
    items: [
      { icon: '📢', label: '官方公告', path: '/announcement' },
      { icon: '🌐', label: '社区', path: '/community' },
    ],
  },
];

// 搜索历史
export const searchHistory = ['星际漫游者', '数字山水', '赛博朋克', '限量版'];

// 热门搜索
export const hotSearches = ['新春限定', 'VIP专属', '合成材料', '稀有藏品'];
