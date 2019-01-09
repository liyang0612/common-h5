import { getManagerGoodsList, managerGoodsOpr } from '../../services/'
import {ListView} from "antd-mobile"

export default {

  namespace: 'manageGoodsList',

  state: {
    sectionIDs: [],     //listView需要的sectionIDs
    rowIDs: [],         //listView需要的rowIDs
    dataBlobs: {},      //listView的Row的数据
    pageIndex: 0,       //当前页
    activeStatus: 2,
    loading: true,
    goodsData: [],
    dataSource: new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname, search }) => {
        if(pathname === '/managerGoodsList') {
          dispatch({ type: 'save', payload: { pageIndex: 0, sectionIDs: [], rowIDs: [], dataBlobs: {}, }})
          dispatch({ type: 'goodsList', payload: { page: 1, pageSize: 10, status: 2}})
        }
      });
    },
  },

  effects: {
    //获取商品列表
    *goodsList({ payload, callback }, { call, put, select }) {  // eslint-disable-line
      const data = yield call(getManagerGoodsList, payload)
      yield put({type: 'save', payload: { goodsData: data.data.list } })
      callback && callback(data)

      const stateSelect = yield select( ({ manageGoodsList: { goodsData, sectionIDs, rowIDs, dataBlobs, dataSource, pageIndex } }) => ({ goodsData, sectionIDs, rowIDs, dataBlobs, dataSource, pageIndex  }) );
      const { sectionIDs, rowIDs } = yield call(genData, stateSelect);
      yield put({type: 'save',
        payload: {
          sectionIDs, rowIDs, pageIndex: stateSelect.pageIndex + 1, dataSource: stateSelect.dataSource.cloneWithRowsAndSections(stateSelect.dataBlobs, sectionIDs, rowIDs) }
      })
    },
    //上下架商品
    *goodsOpr({ payload, callback }, { call, put }) {
      const data = yield call(managerGoodsOpr, payload)
      callback(data)
    }
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


