export const url =
  'https://test-backend.celine.cn/admin_142upl/page_design/manager/getgoogleconfig?identifier=page-designer-admin-config&isAjax=true'

export default {
  code: 1,
  message: 'success',
  data: {
    cached: 1,
    contentType: 'json',
    title: 'cmstoolconfig',
    content: {
      sections: [
        {
          name: '\u57fa\u7840\u7ec4\u4ef6',
          code: 'general',
          active: true,
          position: 1,
          components: [
            {
              code: 'private-button-mini',
              icon: '',
              name: '\u6309\u94ae',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'public-image-mini',
              icon: '',
              name: '\u56fe\u7247',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'public-video-mini',
              icon: '',
              name: '\u89c6\u9891',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'public-split-mini',
              icon: '',
              name: '\u5206\u9694',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'public-rich-text-mini',
              icon: '',
              name: '\u5bcc\u6587\u672c',
              viewports: ['tablet', 'mobile'],
            },
          ],
        },
        {
          name: '\u6807\u51c6\u7ec4\u4ef6',
          code: 'standard',
          active: true,
          position: 2,
          components: [
            {
              code: 'private-image-banner-mini',
              icon: '',
              name: '\u56fe\u6587banner',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-lattice-mini',
              icon: '',
              name: '\u4e5d\u5bab\u683c',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'public-image-swiper-mini',
              icon: '',
              name: '\u56fe\u6587\u8f6e\u64ad',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'public-product-swiper-mini',
              icon: '',
              name: '\u5546\u54c1\u8f6e\u64ad',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-carousel2-mini',
              icon: '',
              name: '\u5546\u54c1\u8f6e\u64ad2',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-product-unit-mini',
              icon: '',
              name: '\u5546\u54c1UNIT',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-product-list-mini',
              icon: '',
              name: '\u5546\u54c1\u7011\u5e03\u6d41',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-product-navigation-mini',
              icon: '',
              name: '\u6c34\u5e73\u5bfc\u822a\u680f',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-product-tab-mini',
              icon: '',
              name: '\u53cctab\u5207\u6362',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-carousel3-mini',
              icon: '',
              name: '\u5546\u54c1\u8f6e\u64ad3',
              viewports: ['tablet', 'mobile'],
            },
            {
              code: 'private-product-single-swiper-mini',
              icon: '',
              name: '\u5546\u54c1\u7ec6\u8282\u8f6e\u64ad',
              viewports: ['tablet', 'mobile'],
            },
          ],
        },
      ],
      channels: [
        {
          code: 'wechat-mini-program',
          name: '\u5fae\u4fe1\u5c0f\u7a0b\u5e8f',
          storeCode: 'default',
          appId: 'xxxxxxxxxxxxxxx',
          previewPageUrl: '/pages/preview/preview?id=${pageId}',
        },
        {
          code: 'jd-mini-program',
          name: '\u4eac\u4e1c\u5c0f\u7a0b\u5e8f',
          storeCode: 'jd',
          appId: 'xxxxxxxxxxxxxxx',
          previewPageUrl: '/pages/preview/preview?id=${pageId}',
        },
      ],
      viewports: [
        {
          code: 'mobile',
          name: 'phone',
          icon: 'phone-icon',
          breakpoint: {
            width: 375,
            height: 814,
          },
          channels: ['wechat-mini-program', 'jd-mini-program', 'web'],
        },
      ],
    },
  },
}
