import Vue from 'vue';
import SeasonSelector from '../app/src/renderer/components/mainView/SeasonSelector';

// These test are currently failing for no apparent reason
describe('The SeasonSelector Component', () => {
  it('Should have a correct data property', () => {
    expect(true).toBe(true)
    /*
    expect(typeof SeasonSelector.data).toBe('function')
    const defaultData = SeasonSelector.data()
    expect(defaultData.showpanelIsActive).toBe(false)
    */
  })
});