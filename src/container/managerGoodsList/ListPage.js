import React from 'react'
import ReactDOM from 'react-dom'
import { ListView } from 'antd-mobile'
import styles from '../style.less'


const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    // title: 'Meet hotel',
    des: '【游戏手机】幻影黑移动联通电信双卡双待全面屏 4G',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    // title: 'Eat the week',
    des: '【畅享7S】华为全面屏双摄 4黑色 移动联通电信4G手机',
  },
]
const NUM_SECTIONS = 1
let pageIndex = 0

const dataBlobs = {}
let sectionIDs = []
let rowIDs = []
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i
    const sectionName = `Section ${ii}`
    sectionIDs[ii] = sectionName
    dataBlobs[sectionName] = sectionName
    rowIDs[ii] = []
    for (let jj = 0; jj < data.length; jj++) {
      const rowName = `S${ii}, R${jj}`
      rowIDs[ii].push(rowName)
      dataBlobs[rowName] = data[jj]
    }
  }
  sectionIDs = [...sectionIDs]
  rowIDs = [...rowIDs]
}


class Demo extends React.Component {
  constructor(props) {
    super(props)
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID]
    }

    const dataSource = new ListView.DataSource({
      getRowData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight,
    }
  }

  componentDidMount() {
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop
    // simulate initial Ajax
    setTimeout(() => {
      genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      })
    }, 600)
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      genData(++pageIndex)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      })
    }, 1000)
  }

  render() {
    return (
        <ListView
            className={styles.listPage}
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            // renderHeader={() => <span>header</span>}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : '没有更多了'}
            </div>)}
            // renderSectionHeader={sectionData => (
            //     <div>{`Task ${sectionData.split(' ')[1]}`}</div>
            // )}
            // renderBodyComponent={() => <MyBody />}
            renderRow={this.props.row}
            renderSeparator={this.props.separator}
            style={{
              height: this.state.height,
              width: '100%',
              overflow: 'auto',
            }}
            pageSize={1}
            onScroll={() => { console.log('scroll') }}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
        />
    )
  }
}



export default Demo
