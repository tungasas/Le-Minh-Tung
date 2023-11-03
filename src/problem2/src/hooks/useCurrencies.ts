import { useState, useEffect } from 'react';

export type Currency = {
  currency: string;
  date: string;
  price: number;
};

const NO_IMAGE_LIST = ['STEVMOS', 'RATOM', 'STOSMO', 'STATOM', 'STLUNA'];

const removeDuplication = (currencies: Currency[]): Currency[] => {
  const currenciesDict: Record<string, Currency> = {};
  currencies.forEach((c) => {
    if (!NO_IMAGE_LIST.includes(c.currency)) {
      currenciesDict[c.currency] = c;
    }
  });

  return Object.values(currenciesDict);
};

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch('https://interview.switcheo.com/prices.json');

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const currencyList: Currency[] = await res.json();

        setCurrencies(removeDuplication(currencyList));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrencies();
  }, []);

  return currencies;
};
