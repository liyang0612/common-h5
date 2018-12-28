import React from 'react'
import ListPage from '../../component/ListPage'
import Row from './Row'
import Footer from './Footer'
import {connect} from "dva";

const GoodsList = ({ storeGoodsList, dispatch }) => {
  const load = () => {
    dispatch({ type: 'storeGoodsList/fetchGoodsList'})
  }
  const { dataSource } = storeGoodsList
  return (
    <div>
      {/*<i className="iconfont icon-cart"></i>*/}
      <Footer/>
      <ListPage row={Row} dataSource={dataSource} load={load}/>

    </div>
  )
}

const mapStateToProps = ({ storeGoodsList }) => ({ storeGoodsList })
export default connect(mapStateToProps)(GoodsList)
