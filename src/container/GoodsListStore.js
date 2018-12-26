import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

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

function GoodsListStore() {
  return (
    <div>
      <WhiteSpace />
      <StickyContainer>
        <Tabs tabs={tabs}
              initalPage={'t2'}
              renderTabBar={renderTabBar}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '800px', backgroundColor: '#fff' }}>
            Content of first tab
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

export default GoodsListStore