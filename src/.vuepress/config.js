const { description } = require('../../package')

module.exports = {
    dest: './docs',
    base: '/fed-snippets/',

    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'FED Code Snippets',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        nav: [
            {
                text: 'Snippets',
                link: '/snippets/',
            },
            {
                text: 'Contribute',
                link: '/contribute/'
            }
        ],
        sidebar: {
            '/snippets/': [
                {
                    title: 'Accessibility',
                    collapsable: false,
                    children: [
                        'accessibility/screen-reader-only-text',
                        'accessibility/keyboard-focus-trap',
                    ]
                },
                {
                    title: 'HTML',
                    collapsable: false,
                    children: [
                        'html/favicon',
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: [
                        'css/animated-mobile-menu-button',
                    ]
                },
                {
                    title: 'SASS',
                    collapsable: false,
                    children: [
                        'sass/px-to-rem',
                        'sass/aspect-ratio',
                        'sass/style-based-on-element-count',
                    ]
                },
                {
                    title: 'JavaScript',
                    collapsable: false,
                    children: [
                        'javascript/deep-clone-object',
                        'javascript/get-set-cookies',
                        'javascript/nested-object-loop',
                    ]
                },
                {
                    title: 'Vue',
                    collapsable: false,
                    children: [
                        'vue/paste-plain-text',
                    ]
                },
                {
                    title: 'React',
                    collapsable: false,
                    children: [
                        'react/custom-hook',
                    ]
                },
                {
                    title: 'Angular',
                    collapsable: false,
                    children: [
                        'angular/keyboard-focus-trap',
                        'angular/loading-animation',
                    ]
                },
            ],
        }
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ],
}
