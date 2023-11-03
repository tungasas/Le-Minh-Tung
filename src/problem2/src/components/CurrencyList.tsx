import React, { useState } from 'react';
import { Currency } from '../hooks/useCurrencies';
import { GoTriangleDown } from 'react-icons/go';

type CurrencyListProps = {
  currencies: Currency[];
  label: string;
  onChange: Function;
};

const CurrencyList = ({ currencies, label, onChange }: CurrencyListProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: any) => {
    setOpen(!open);
  };

  const handleChange = (currency: Currency) => {
    onChange(currency);
    setOpen(false);
  };

  return (
    <div className='rounded-full relative bg-[#1c1c1c] text-[#a6a6a6]'>
      <button
        className='px-2 py-1.5 flex items-center'
        onClick={handleOpen}
        type='button'
      >
        <img
          className='inline'
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${label}.svg`}
          alt={label}
        />
        <span className='inline font-medium ml-3'>{label}</span>
        <GoTriangleDown className='inline ml-2' />
      </button>
      {open ? (
        <ul className='absolute left-0 bg-[#1c1c1c] mt-1 rounded-lg w-[145px] h-[430px] overflow-auto z-10'>
          {currencies.map((c) => (
            <li className='' key={c.currency} value={c.currency}>
              <button
                className='w-full px-3 py-3 rounded-lg flex hover:bg-[#3a3a3a]'
                type='button'
                onClick={() => handleChange(c)}
              >
                <img
                  className='inline'
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${c.currency}.svg`}
                  alt={c.currency}
                />
                <span className='font-medium ml-3'>{c.currency}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default CurrencyList;
