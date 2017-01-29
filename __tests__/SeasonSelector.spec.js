import Vue from 'vue'
import SeasonSelector from '../app/src/components/MainView/SeasonSelector'

test('The SeasonSelector Component', () => {
  expect(typeof SeasonSelector.data).toBe('function')
  const defaultData = SeasonSelector.data()
  expect(defaultData.showpanelIsActive).toBe(false)
});
