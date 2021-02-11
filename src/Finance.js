import React, { useEffect, useState } from 'react';
import './App.scss';

const Finance = ({defaults, finance}) => {

  let {
    updateMoney,
    updateStock,
    updateSalePrice,
    salePrice,
    notebooksResearched,
    stock,
    money,
    // paper,
    // wood
  } = finance

  const [interest, updateInterest] = useState(0.08 / salePrice);  

  useEffect(() => {
    const interval = setInterval(() => {
      calculateInterest(salePrice)
      if (stock > 0 && Math.random() < 0.08/salePrice) {
        sellPaper(Math.floor( Math.random() / salePrice ))
      }
    }, 100);
    return () => {
      clearInterval(interval);
    }
  }, [salePrice, money, stock, updateStock, updateMoney]);

  // Interest in paper, more things can be added to this when we add more boosts and marketing etc.
  const calculateInterest = (salePrice) => {
    updateInterest(0.08 / salePrice);
  }

  // Increase sale price
  const increaseSalePrice = (updateSalePrice, salePrice) => {
    updateSalePrice(salePrice + 0.01);
  }

  // Decrease Sale Price
  const decreaseSalePrice = (updateSalePrice, salePrice) => {
    updateSalePrice(salePrice - 0.01);
  }

  const sellNotebook = () => {
    updateStock(stock - 20);
    updateMoney(money + 2);
  }

  // Sell paper
  const sellPaper = (selling) => {
    var toBeSold = selling > 10 ? 10 : selling
    if (stock > 0) {
      const enoughStock = toBeSold < stock;
      updateStock(enoughStock ? stock - toBeSold : 0);
      updateMoney(enoughStock ? money + (salePrice * toBeSold) : money + (salePrice * toBeSold - (((stock - toBeSold) * -1) * salePrice)))
    }
  }

  const renderSaleButtons = () => {
    const smallestValue = salePrice >= 0.01;
    return (
      <div className='saleButtons'>
        <div className={smallestValue ? 'clicker' : 'clicker disabled'} onClick={smallestValue ? () => decreaseSalePrice(updateSalePrice, salePrice) : ''}>
          Decrease Price
        </div>
        <div className='clicker' onClick={() => increaseSalePrice(updateSalePrice, salePrice)}>
          Increase Price
        </div>
      </div>
      )
    }

  const renderSellNotebook = () => {
    return (
      <div className={stock >= 20 ? 'clicker' : 'clicker disabled'} onClick={stock >= 20 ? () => sellNotebook() : ''}>
        Sell Notebook (£2 - 20 Paper)
      </div>
    )
  }

  return (
    <div>
      <p className='clicks'>
      Stock: {stock}
      </p>
      <p className='clicks'>
        Money: £{money.toFixed(2)}
      </p>
      <p className='clicks'>
        Public Interest: {(interest*100).toFixed(2)}%
      </p>
      <p className='clicks'>
        Selling Price: £{salePrice.toFixed(2)}
      </p>
      {renderSaleButtons()}
      {notebooksResearched ? renderSellNotebook() : ''}
    </div>  
  )
}

export default Finance;
