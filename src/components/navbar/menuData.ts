// src/consts/navigation.ts (或者是你定义这个文件的地方)

export interface SubLink {
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
}

export interface MenuGroup {
  title?: string;
  items: SubLink[];
}

export interface NavItem {
  label: string;
  href?: string;
  type: 'link' | 'mega' | 'dropdown';
  groups?: MenuGroup[];
  items?: SubLink[];
}

export const MENU_DATA: NavItem[] = [
  {
    label: 'Product',
    type: 'mega',
    groups: [
      {
        title: 'Video Encoder',
        items: [
          { label: 'C6 4K HDMI/3G-SDI Encoder', href: '/products/encoder-c6' },
          { label: 'X1 4G Bonding Encoder', href: '#' },
        ],
      },
      {
        title: 'Video Decoder',
        items: [
          {
            label: 'D1 4K HDMI/3G-SDI Decoder',
            href: '/products/decoder-d1',
            badge: 'New',
            active: true,
          },
        ],
      },
      {
        title: 'NDI Converter',
        items: [
          { label: 'A1 Bi-Directional NDIConverter', href: '#' },
          { label: 'NDI Go NDI to HDMI Decoder', href: '#' },
        ],
      },
      {
        title: 'Manage & IP Gateway',
        items: [
          { label: 'CNDLive Manager Software', href: '#' },
          { label: 'CNDLive Manager Max', href: '#' },
        ],
      },
    ],
  },

  { label: 'Solutions', type: 'link', href: '/solutions' },
  { label: 'Support', type: 'link', href: '/support' },
  {
    label: 'Resources',
    type: 'dropdown', // 🔥 新增：普通下拉菜单
    items: [
      { label: 'News', href: '/news' },
      { label: 'Case Studies', href: '/cases' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Learning Hub', href: '/learning' },
    ],
  },
  { label: 'About US', type: 'link', href: '/about' },
];
