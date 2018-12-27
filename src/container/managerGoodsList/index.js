import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import ListPage from './ListPage'
import Row from './Row'
import styles from '../style.less'

function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '进行中' },
  { title: '未开始' },
  { title: '已结束' },
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

function Index() {
  return (
    <div>
      <StickyContainer>
        <Tabs tabs={tabs}
              initalPage={'t2'}
              renderTabBar={renderTabBar}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <ListPage row={Row} separator={separator}/>
          </div>
          {/*<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '800px', backgroundColor: '#fff' }}>*/}
            {/*Content of second tab*/}
          {/*</div>*/}
          {/*<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '800px', backgroundColor: '#fff' }}>*/}
            {/*Content of third tab*/}
          {/*</div>*/}
        </Tabs>
      </StickyContainer>
      <WhiteSpace />
    </div>
  )
}

export default Index
