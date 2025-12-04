export const downloads = [
  // --- 分类 1: 文档资料 ---
  {
    category: 'Documents',
    items: [
      {
        title: 'C6 User Manual (En)',
        fileUrl: '/downloads/c6-user-manual-en.pdf',
        date: '2024.11.15',
        releaseNotes:
          'Updated instructions for NDI 5.5 settings and KVM configuration.',
      },
      {
        title: 'C6 Quick Start Guide',
        fileUrl: '/downloads/c6-quick-start.pdf',
        date: '2024.08.01',
      },
      {
        title: 'C6 Datasheet',
        fileUrl: '/downloads/c6-datasheet.pdf',
        date: '2024.05.20',
      },
    ],
  },

  // --- 分类 2: 固件更新 (带详细日志) ---
  {
    category: 'Firmware',
    items: [
      {
        title: 'Firmware v2.0.1 (Latest)',
        fileUrl: '/downloads/c6-fw-v2.0.1.zip',
        date: '2025.01.10',
        // 使用反引号 (`) 来支持多行文本和简单的 Markdown
        releaseNotes: `**New Features:**
1. Added support for NDI Tools 6.0 compatibility.
2. Introduced "Low Latency Mode" for aggressive network environments.
3. Added custom EDID management in the Web UI.

**Bug Fixes:**
- Fixed an issue where audio might drift out of sync after 48 hours of continuous streaming.
- Resolved a DHCP IP allocation delay issue.`,
      },
      {
        title: 'Firmware v1.5.4',
        fileUrl: '/downloads/c6-fw-v1.5.4.zip',
        date: '2024.09.05',
        releaseNotes: `1. Optimized SRT caller stability.
2. Fixed the issue of Tally light color display error in some specific switchers.
3. Improved web management interface response speed.`,
      },
    ],
  },

  // --- 分类 3: 实用工具 ---
  {
    category: 'Software Tools',
    items: [
      {
        title: 'CNDLive Device Search Tool (Windows)',
        fileUrl: '/downloads/device-search-tool-win.zip',
        date: '2024.03.12',
        releaseNotes:
          'Utility tool to find CNDLive devices on the local network and modify IP addresses.',
      },
      {
        title: 'CNDLive Device Search Tool (Mac)',
        fileUrl: '/downloads/device-search-tool-mac.zip',
        date: '2024.03.12',
      },
    ],
  },
];
