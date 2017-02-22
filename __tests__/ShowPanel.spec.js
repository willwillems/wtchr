import Vue from 'vue'
import ShowPanel from '../app/src/renderer/components/mainView/ShowPanel'

describe('The ShowPanel component', () => {
  it('Should contain an object by default', () => {
    const defaultData = ShowPanel.data()
    expect(defaultData.selectedEpisode.season).toBeDefined();
    expect(defaultData.selectedEpisode.episode).toBeDefined();
  });
});
