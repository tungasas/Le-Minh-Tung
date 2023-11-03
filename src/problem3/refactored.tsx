/*
Computational Inefficiencies and anti-patterns
1.  The getPriority() function is inefficient because it uses a nested switch statement. A more efficient implementation would use 
    a dictionary or a hash table to store the priority for each blockchain.

2.  The sortedBalances function is inefficient. It should sort the balances array by priority and then 
    filtering out the balances with a priority of -99 and amount > 0.

3.  The formattedBalances will be re-initialized each render which in turn will rerender rows. We should format the balances inside useMemo
*/

interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

const priorityDict = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    return balances
      .sort((lhs, rhs) => {
        const leftPriority = priorityDict[lhs.blockchain] ?? -99;
        const rightPriority = priorityDict[rhs.blockchain] ?? -99;
        return leftPriority - rightPriority;
      })
      .filter(
        (balance) => priorityDict[balance.blockchain] > 99 && balance.amount > 0
      )
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        };
      });
  }, [balances, prices]);

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
