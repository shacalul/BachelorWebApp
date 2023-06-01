const BalanceCard = ({ balance, text }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="text-sm font-medium text-gray-500">{text}:</div>
      <div className="text-lg font-bold">{balance}</div>
    </div>
  );
};

export default BalanceCard;
