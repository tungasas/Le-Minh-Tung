import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import CurrencyList from './CurrencyList';
import { Currency, useCurrencies } from '../hooks/useCurrencies';
import { mockSwap } from '../api/swap';

type Inputs = {
  amount: number;
};

const SwapForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>();
  const currencies = useCurrencies();
  const [fromCurrency, setFromCurrency] = useState<Currency>();
  const [toCurrencry, setToCurrencry] = useState<Currency>();
  const [isLoading, setIsLoading] = useState(false);

  const exchangeRate =
    fromCurrency && toCurrencry ? fromCurrency.price / toCurrencry.price : 0;

  useEffect(() => {
    if (currencies) {
      if (!fromCurrency)
        setFromCurrency(
          currencies.find((c) => c.currency === 'ETH') || currencies[0]
        );

      if (!toCurrencry) {
        setToCurrencry(
          currencies.find((c) => c.currency === 'USD') || currencies[0]
        );
      }
    }
  }, [currencies, fromCurrency, toCurrencry]);

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault();
    setIsLoading(true);
    const res = await mockSwap(
      fromCurrency!.currency,
      toCurrencry!.currency,
      data.amount
    );
    if (res.ok) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    reset();
    setIsLoading(false);
  };

  return (
    <div className='w-[425px] bg-[#1c1c1c] rounded-2xl p-4'>
      <form>
        <div className='bg-primary rounded-xl p-3'>
          <div className='text-primary text-xs mb-3'>Amount to send</div>
          <div className='flex justify-between items-center'>
            <div>
              <input
                className='bg-transparent font-medium text-xl text-white focus:outline-none'
                type='text'
                pattern='^[0-9]*[.,]?[0-9]*$'
                placeholder='0.0'
                {...register('amount', { required: true })}
              />
              {errors.amount && (
                <p className='text-error text-xs mt-1'>
                  This field is required
                </p>
              )}
            </div>
            {currencies && fromCurrency && (
              <CurrencyList
                currencies={currencies}
                label={fromCurrency.currency}
                onChange={setFromCurrency}
              />
            )}
          </div>
        </div>
        {fromCurrency && toCurrencry && (
          <div className='text-primary text-xs my-3 pl-2 font-medium'>{`1 ${
            fromCurrency.currency
          } = ${exchangeRate.toFixed(4)} ${toCurrencry.currency}`}</div>
        )}
        <div className='bg-primary rounded-xl p-3'>
          <div className='text-primary text-xs mb-3'>Amount to receive</div>
          <div className='flex justify-between items-center'>
            <div>
              <input
                className='bg-transparent font-medium text-xl text-disabled placeholder:text-disabled focus:outline-none cursor-not-allowed'
                type='text'
                disabled
                value={
                  watch('amount')
                    ? (watch('amount') * exchangeRate).toFixed(6)
                    : '0.0'
                }
              />
            </div>
            {currencies && toCurrencry && (
              <CurrencyList
                currencies={currencies}
                label={toCurrencry.currency}
                onChange={setToCurrencry}
              />
            )}
          </div>
        </div>
        <button
          className='text-button bg-button hover:bg-button-hover disabled:cursor-not-allowed w-full rounded-full p-3 text-sm font-medium mt-5 flex justify-center items-center h-11'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <TbFidgetSpinner className='animate-spin' />
          ) : (
            'Confirm swap'
          )}
        </button>
      </form>
    </div>
  );
};

export default SwapForm;
