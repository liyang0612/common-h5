import { getList, getCustomerGallery } from '../../services/'
import {ListView} from "antd-mobile"

export default {

  namespace: 'storeGoodsList',

  state: {
    sectionIDs: [],   //listView需要的sectionIDs
    rowIDs: [],       //listView需要的每行的rowIDS
    dataBlobs: {},    //listView的数据
    pageIndex: 0,     //当前页面的index
    loading: true,
    goodsData: [],    //列表数据
    dataSource: new ListView.DataSource({ //listView的数据源
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    isShowCarousel: true,
    carouselList: [1, 2], //走马灯的数据
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname, search }) => {
        if(pathname === '/storeGoodsList') {
          dispatch({ type: 'save', payload: { pageIndex: 0, sectionIDs: [], rowIDs: [], dataBlobs: {}, }})
          dispatch({ type: 'fetch' })
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'customerGallery' })
      yield put({ type: 'goodsList', payload: { page: 1, pageSize: 10 }})
    },
    *customerGallery({ payload }, { call, put }) {
      const { data } = yield call(getCustomerGallery, payload)
      yield put({ type: 'save', payload: { carouselList: data, isShowCarousel: true }})
    },
    *goodsList({ payload }, { call, put, select }) {  // eslint-disable-line
      const { data } = yield call(getList, payload)
      yield put({type: 'save', payload: { goodsData: data.list }})

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


