import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import ListPage from '../../component/ListPage'
import {connect} from "dva";
import Row from './Row'

function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '进行中', status: 2 },
  { title: '未开始', status: 3 },
  { title: '已结束', status: 4 },
];

const separator = (sectionID, rowID) => (
    <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: 'rgba(245,245,245,1)',
          height: 10,
        }}
    />
)

const load = (dispatch, manageGoodsList) => {
  const { pageIndex, activeStatus } = manageGoodsList
  dispatch({ type: 'manageGoodsList', payload: { loading: true } })
  dispatch({ 
    type: 'manageGoodsList/goodsList',
    payload: { page: pageIndex + 1, pageSize: 10, status: activeStatus },
    callback(res) {
      if(res.status === 'T') {
        dispatch({ type: 'manageGoodsList', payload: { loading: false } })
      }
    }
  })
}

function ManagerGoodsList({ manageGoodsList, dispatch }) {
  const { dataSource, activeStatus, loading } = manageGoodsList
  //tabs切换事件
  const handleTabsChange = (tab, index) => {
    dispatch({ type: 'manageGoodsList/save', payload: { activeStatus: tab.status, pageIndex: 0, sectionIDs: [], rowIDs: [], dataBlobs: {} }})
    dispatch({ type: 'manageGoodsList/goodsList', payload: { page: 1, pageSize: 10, status: tab.status }})
  }
  return (
    <div>
      <StickyContainer>
        <Tabs 
          tabs={tabs}
          onChange={handleTabsChange}
          renderTabBar={renderTabBar}
        >
        </Tabs>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <ListPage 
            row={Row(activeStatus, dispatch)} 
            separator={separator} 
            dataSource={dataSource}
            load={() => load(dispatch, manageGoodsList)}
            loading={loading}
            />
        </div>
      </StickyContainer>
      <WhiteSpace />
    </div>
  )
}

const mapStateToProps = ({ manageGoodsList }) => ({ manageGoodsList })

export default connect(mapStateToProps)(ManagerGoodsList)
