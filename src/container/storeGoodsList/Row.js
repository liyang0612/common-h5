import React from 'react'
import styles from "../style.less"
import {Button} from "antd-mobile"
import TimeDown from '../../component/TimeDown'

const goDetail = (promotion_id, price_id) => {
  console.log(`/pages/goods-details-group/goods-details-group?promotion_id=${promotion_id}&price_id=${price_id}`)
  window.wx.miniProgram.navigateTo({
    url: `/pages/goods-details-group/goods-details-group?promotion_id=${promotion_id}&price_id=${price_id}`
  })
}
function Row(rowData, sectionID, rowID) {
  return (
      <div key={rowID} className={styles.listRow + ' ' + styles.storeList} onClick={() => goDetail(rowData.promotion_id, rowData.price_id)}>
        <div className={styles.goodsInfo}>
          <img className={styles.infoLeft} src={rowData.img} alt="" />
          <div className={styles.infoRight}>
            <div className={styles.goodsName}>【{rowData.title}】{rowData.goods_name}</div>
            <div className={styles.goodsPriceCount}>红色 公开版 64GB</div>
            <div className={styles.activeTime}>
              <div className={styles.time}><span className={styles.timeTxt}>距结束仅剩</span><span className={styles.timeNum}><TimeDown endTime={rowData.end_time}/></span></div>
              <div className={styles.inventory}>已售 {rowData.stock_num} 件</div>
            </div>
            <div className={styles.activeOpr}>
              <div className={styles.priceStore}>
                <span className={styles.priceSymbol}>¥</span><span className={styles.price}>{rowData.promotion_price}</span>
                <span className={styles.oldPrice}>¥ {rowData.whole_price}</span>
              </div>
              <div className={styles.btnWrap}>
                <Button className={styles.h5Btn + ' ' + styles.h5BtnGradient}>去抢购</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
  )
}

export default Row
