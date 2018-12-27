import React from 'react'
import styles from "../style.less";
import {Button} from "antd-mobile";

function Row(rowData, sectionID, rowID) {
  return (
      <div key={rowID} className={styles.listRow + ' ' + styles.storeList}>
        <div className={styles.goodsInfo}>
          <img className={styles.infoLeft} src={rowData.img} alt="" />
          <div className={styles.infoRight}>
            <div className={styles.goodsName}>{rowData.des}</div>
            <div className={styles.goodsPriceCount}>红色 公开版 64GB</div>
            <div className={styles.activeTime}>
              <div className={styles.time}><span>距结束仅剩</span><span>06:35:22</span></div>
              <div className={styles.inventory}>已售 2536 件</div>
            </div>
            <div className={styles.activeOpr}>
              <div className={styles.priceStore}>
                <span className={styles.priceSymbol}>¥</span><span className={styles.price}>2600.00</span>
                <span>¥ 8699</span>
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
