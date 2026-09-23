type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`font-body text-xs font-semibold uppercase tracking-widest2 text-stone ${className}`}>
      {children}
    </p>
  );
}
