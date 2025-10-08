// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint','@nuxt/image','@vesp/nuxt-fontawesome'],
  fontawesome: {
    icons: {
      solid: ['unlock','address-card','circle-info','cash-register','map-location'],
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false, 
    },
  },    
  image: {
    domains: ['https://localhost:7100', 'https://localhost:7292'], // Replace with your image domains
    provider: 'ipx', // Or another provider like 'cloudinary', 'static' etc.
  },  
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/scss/main.scss',
  ],  
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', tagPosition: 'bodyClose' },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js',
          crossorigin: 'anonymous'
        }        
      ]
    }
  }  
})