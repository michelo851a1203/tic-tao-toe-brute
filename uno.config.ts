import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives';

// ----- main.ts
// import 'uno.css';
// import '@unocss/reset/tailwind-compat.css';
// ----- nuxt.config.ts
// css: ['@unocss/reset/tailwind-compat.css']
// -----
export default defineConfig({
  presets:[
    presetUno(),
    presetIcons({ scale: 1.2 }),
    presetAttributify(),
  ],
  rules: [
    [
      /^bgi-\[(.+)\]$/,
      ([_, s]) => {
        return {
          'background-image': s
        };
      }
    ],
    [
      /^bg-radial-\[(.+)\]$/,
      ([_, s]) => {
        return {
          background: `radial-gradient(${s.replace(/_/g, ' ')})`
        };
      }
    ],
    [
      /^box-shadow-\[(.+)\]$/,
      ([_, s]) => {
        return {
          'box-shadow': `${s.replace(/_/g, ' ')}`
        };
      }
    ],
  ],
  shortcuts: {
    'text-bg': 'text-transparent bg-clip-text',
  },
  theme: {
    breakpoints: {
      xs: '376px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
  },
  transformers: [
    transformerDirectives(),
  ]
})
