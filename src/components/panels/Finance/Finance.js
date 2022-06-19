import React from 'react';
import { Button } from '../../elements';
import { useFinanceModel } from './Model';

const Finance = ({defaults, finance}) => {
  const {
    // Actions
    increaseSalePrice,
    decreaseSalePrice,
    sellNotebook,

    // Data
    salePrice,
    notebooksResearched,
    stock,
    money,
    interest 
  } = useFinanceModel({defaults, finance});

  const renderSaleButtons = () => {
    const smallestValue = salePrice >= 0.01;
    return (
      <div className='saleButtons'>
        <Button
          text={'Decrease Price'}
          disabled={!smallestValue}
          onClick={() => decreaseSalePrice()}
        />
        <Button
          text={'Increase Price'}
          onClick={() => increaseSalePrice()}
        />
      </div>
      )
    }

  const renderSellNotebook = () => {
    return <Button
      text={'Sell Notebook (£2 - uses 20 Paper)'}
      disabled={money < 2 || stock < 20}
      onClick={() => sellNotebook()}
    />
  }

  return (
    <div>
      <p>Stock: {stock}</p>
      <p>Money: £{money.toFixed(2)}</p>
      <p>Public Interest: {(interest*100).toFixed(2)}%</p>
      <p>Selling Price: £{salePrice.toFixed(2)}</p>
      {renderSaleButtons()}
      {notebooksResearched ? renderSellNotebook() : ''}
    </div>  
  )
}

export default Finance;
