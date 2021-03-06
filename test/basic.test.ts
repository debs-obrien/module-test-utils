import { setupTest, get, expectModuleToBeCalledWith } from '../src'

describe('basic', () => {
  setupTest({
    testDir: __dirname,
    build: true,
    server: true,
    fixture: 'fixtures/basic'
  })

  test('request page', async () => {
    const { body } = await get('/')
    expect(body).toContain('Works!')
  })

  test('module container call assertions', () => {
    expectModuleToBeCalledWith('addLayout', expect.stringContaining('layout.vue'))
    expectModuleToBeCalledWith('addLayout', expect.stringContaining('layout.vue'), 'name-layout')
    expectModuleToBeCalledWith('addErrorLayout', expect.stringContaining('error'))
    expectModuleToBeCalledWith('addServerMiddleware', expect.stringContaining('middleware.js'))
    expectModuleToBeCalledWith('requireModule', '~/modules/module-b')
    expectModuleToBeCalledWith('addPlugin', {
      src: expect.stringContaining('plugin.js'),
      fileName: 'plugin-a.js',
      options: {}
    })
  })
})

describe('second describe', () => {
  setupTest({
    testDir: __dirname,
    build: true,
    fixture: 'fixtures/basic'
  })
})
