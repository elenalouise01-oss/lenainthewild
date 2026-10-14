// A price like "$777 AUD": the currency sits smaller beside the amount,
// lined up with the top of the numbers.
export default function Price({ price }: { price: string }) {
  const [amount, currency] = price.split(' ');
  return (
    <span className="inline-flex items-start leading-none">
      {amount}
      {currency && <span className="ml-[0.15em] mt-[0.12em] text-[0.5em] font-semibold tracking-wide">{currency}</span>}
    </span>
  );
}
