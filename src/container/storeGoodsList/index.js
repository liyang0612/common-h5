import React from 'react'
import ListPage from '../managerGoodsList/ListPage'
import Row from './Row'
import styles from '../style.less'

const GoodsList = () => (
    <div>
      <ListPage row={Row}/>
    </div>
);

export default GoodsList
