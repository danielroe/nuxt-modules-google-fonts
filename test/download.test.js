const { join } = require('path')
const del = require('del')
const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('download', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = (await setup(loadConfig(__dirname, 'download'))))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
    await del(join(nuxt.options.srcDir, nuxt.options.dir.assets))
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).not.toContain('<link data-n-head="ssr" rel="dns-prefetch" href="https://fonts.gstatic.com/">')
    expect(html).not.toContain('<link data-n-head="ssr" rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="true">')
    expect(html).not.toContain('<link data-n-head="ssr" rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto">')
    expect(html).not.toContain('<link data-n-head="ssr" vmid="google-fonts" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto" media="print" onload="this.onload=null;this.removeAttribute')
    expect(html).not.toContain('<noscript data-n-head="ssr"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto"></noscript>')
  })

  test('css inject', () => {
    expect(nuxt.options.css).toHaveLength(1)
    expect(nuxt.options.css[0]).toContain('fonts.css')
  })
})
