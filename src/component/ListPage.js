import React from 'react'
import { ListView } from 'antd-mobile'
import styles from '../container/style.less'

class ListPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // simulate initial Ajax
  }

  onEndReached = (event) => {
    console.log('reach end', event)
    // this.setState({ isLoading: true })
    this.props.load && this.props.load()
  }

  render() {
    const { dataSource, row, separator } = this.props;
    return (
        <ListView
            className={styles.listPage}
            ref={el => this.lv = el}
            dataSource={dataSource}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.props.loading ? 'Loading...' : '没有更多了'}
            </div>)}
            renderRow={row}
            renderSeparator={separator}
            style={{
              height: document.documentElement.clientHeight,
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



export default ListPage
