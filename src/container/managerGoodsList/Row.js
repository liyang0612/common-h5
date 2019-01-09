import React from 'react'
import styles from "../style.less"
import { Button, Toast} from "antd-mobile"
import TimeDown from "../../component/TimeDown";

const handleGoodsOpr = (status, content_id, dispatch) => {
  let str = {
    "1": "上架",
    "2": "下架"
  }
  dispatch({ 
    type: 'manageGoodsList/goodsOpr', 
    payload: { status, content_id },
    callback: (res) => {
      console.log(res)
      if(res.status === 'T') {
        
        Toast.success(`${str[status]}成功`, 3)
      }
    }
  })
}

function Row(status, dispatch) {
  return (rowData, sectionID, rowID) => {
    return (
      <div key={rowID} className={styles.listRow}>
        <div className={styles.goodsInfo}>
          <img className={styles.infoLeft} src={rowData.goods_picture} alt="" />
          <div className={styles.infoRight}>
            <div className={styles.goodsName}>【{rowData.title}】{rowData.goods_name}</div>
            <div className={styles.goodsPriceCount}>{rowData.options_name}</div>
            <div className={styles.priceWrap}><span className={styles.goodsPriceSymbol}>¥</span><span className={styles.goodsPrice}>{rowData.pomotion_price}</span> <span className={styles.goodsProfits}>赚  ¥ {'-'}</span></div>
          </div>
        </div>
        {
          status === 3 ? null : <div className={styles.amountInfo}>
            <div className={styles.amountBlock + ' ' + styles.splitLine}>
              <div className={styles.num}><span className={styles.goodsPriceSymbol}>¥</span> {'-'}</div>
              <div className={styles.text}>实付金额</div>
            </div>
            <div className={styles.amountBlock}>
              <div className={styles.num}><span className={styles.goodsPriceSymbol}>¥</span> {rowData.commission}</div>
              <div className={styles.text}>分润金额</div>
            </div>
          </div>
        }
        {
          status === 4 ? null:
            <div className={styles.oprWrap}>
              <div className={styles.countDown}>
                <span className={styles.text}>
                  {status === 2 && '距结束仅剩'}
                  {status === 3 && '距开始仅剩'}
                </span>
                {status === 2 || status === 3 ? <TimeDown endTime={rowData.endTime} /> : null}
              </div>
              <div className={styles.oprBtns}>
                <Button className={styles.h5Btn} onClick={() => handleGoodsOpr(rowData.status, rowData.promotion_id, dispatch)}>上架{rowData.status_trans}</Button>
                <Button className={styles.h5Btn + ' ' + styles.h5BtnGradient}>分享</Button>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default Row
