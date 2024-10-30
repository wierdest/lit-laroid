/* eslint-disable no-unused-expressions */
import { html } from 'lit'
import { fixture, expect } from '@open-wc/testing'
import '../lit-laroid.js'

describe('LitLaroid', () => {
  let el
  beforeEach(async () => {
    el = await fixture(html`<lit-laroid></lit-laroid>`)
  })
  it('has a default placeholder imageUrl and a default caption "A default caption"', async () => {
    expect(el.caption).to.equal('A default caption')
    expect(el.imageUrl).to.equal('https://picsum.photos/400')
  })

  it('can override the caption via attribute', async () => {
    const override = await fixture(html`<lit-laroid caption='overridden caption'></lit-laroid>`)
    expect(override.caption).to.equal('overridden caption')
  })

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible()
  })

  it('a flip wrapper should exist', async () => {
    const wrapper = el.shadowRoot.querySelector('.polaroid-wrapper')
    expect(wrapper).to.exist
  })

  it('it flips when clicked', async () => {
    const wrapper = el.shadowRoot.querySelector('.polaroid-wrapper')
    wrapper.click()
    expect(el.flipped).to.be.true
  })

  it('it flips when Enter or Space is pressed on the wrapper', async () => {
    const wrapper = el.shadowRoot.querySelector('.polaroid-wrapper')
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    wrapper.dispatchEvent(enterEvent)
    expect(el.flipped).to.be.true
    const spaceEvent = new KeyboardEvent('keydown', { key: 'Space' })
    wrapper.dispatchEvent(spaceEvent)
    expect(el.flipped).to.be.true
  })
})
