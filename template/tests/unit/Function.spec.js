const { yeah } = require('../..')
describe('<%= name.replace('-','_') %>-test', () => {
    it('The show yeah!', () => {
        expect(yeah()).to.equal("yeah!")
    })
})
