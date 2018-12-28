// import { getTest } from '../services/'
import {ListView} from "antd-mobile"

export default {

  namespace: 'storeGoodsList',

  state: {
    sectionIDs: [],
    rowIDs: [],
    dataBlobs: {},
    pageIndex: 0,
    loading: true,
    goodsData: [
      {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        des: '【游戏手机】幻影黑移动联通电信双卡双待全面屏 4G',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        des: '【畅享7S】华为全面屏双摄 4黑色 移动联通电信4G手机',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        des: '【游戏手机】幻影黑移动联通电信双卡双待全面屏 4G',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        des: '【畅享7S】华为全面屏双摄 4黑色 移动联通电信4G手机',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        des: '【游戏手机】幻影黑移动联通电信双卡双待全面屏 4G',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        des: '【畅享7S】华为全面屏双摄 4黑色 移动联通电信4G手机',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        des: '【游戏手机】幻影黑移动联通电信双卡双待全面屏 4G',
      }
    ],
    dataSource: new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname, search }) => {
        if(pathname === '/storeGoodsList') {
          dispatch({ type: 'save', payload: { pageIndex: 0, sectionIDs: [], rowIDs: [], dataBlobs: {}, }})
          dispatch({ type: 'fetchGoodsList'})
        }
      });
    },
  },

  effects: {
    *fetchGoodsList({ payload }, { call, put, select }) {  // eslint-disable-line
      // const { data } = yield call(getTest, payload)
      const stateSelect = yield select( ({ storeGoodsList: { goodsData, sectionIDs, rowIDs, dataBlobs, dataSource, pageIndex } }) => ({ goodsData, sectionIDs, rowIDs, dataBlobs, dataSource, pageIndex  }) );
      const { sectionIDs, rowIDs } = yield call(genData, stateSelect);
      yield put({type: 'save',
        payload: {
          sectionIDs, rowIDs, pageIndex: stateSelect.pageIndex + 1, dataSource: stateSelect.dataSource.cloneWithRowsAndSections(stateSelect.dataBlobs, sectionIDs, rowIDs) }
      })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    },
  },
}

const NUM_SECTIONS = 1;
const genData = ({ goodsData, sectionIDs, rowIDs, dataBlobs, pageIndex = 0 }) => {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pageIndex * NUM_SECTIONS) + i
    const sectionName = `Section ${ii}`
    sectionIDs[ii] = sectionName
    dataBlobs[sectionName] = sectionName
    rowIDs[ii] = []
    for (let jj = 0; jj < goodsData.length; jj++) {
      const rowName = `S${ii}, R${jj}`
      rowIDs[ii].push(rowName)
      dataBlobs[rowName] = goodsData[jj]
    }
  }
  return {
    sectionIDs: [...sectionIDs],
    rowIDs: [...rowIDs]
  }
}


