import { useCallback, useEffect, useState } from 'react';

export const useFinanceModel = ({defaults, finance}) => {
  let {
    updateMoney,
    updateStock,
    updateSalePrice,
    salePrice,
    notebooksResearched,
    stock,
    money
  } = finance

  const [interest, updateInterest] = useState(0.08 / salePrice);

  const sellPaper = useCallback(() => {
    const selling = Math.floor( Math.random() / salePrice )
    const toBeSold = selling > 10 ? 10 : selling
    if (stock > 0) {
      const enoughStock = toBeSold < stock;
      updateMoney(enoughStock ? money + (salePrice * toBeSold) : money + (salePrice * toBeSold - (((stock - toBeSold) * -1) * salePrice)))
      updateStock(enoughStock ? stock - toBeSold : 0);
    }
  }, [salePrice, money, stock, updateStock, updateMoney])

  useEffect(() => {
    const interval = setInterval(() => {
      calculateInterest(salePrice)
      if (stock > 0 && Math.random() < 0.08/salePrice) {
        sellPaper()
      }
    }, 100);
    return () => {
      clearInterval(interval);
    }
  }, [salePrice, stock, sellPaper, updateStock, updateMoney]);

  // Interest in paper, more things can be added to this when we add more boosts and marketing etc.
  const calculateInterest = (salePrice) => {
    updateInterest(0.08 / salePrice);
  }

  // Increase sale price
  const increaseSalePrice = () => {
    updateSalePrice(salePrice + 0.01);
  }

  // Decrease Sale Price
  const decreaseSalePrice = () => {
    updateSalePrice(salePrice - 0.01);
  }

  const sellNotebook = () => {
    updateStock(stock - 20);
    updateMoney(money + 2);
  }

  return {
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
  }
}
