type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  // Use 'h2' when the label is the section's title, so search engines and
  // screen readers see the page structure. Looks the same either way.
  as?: 'p' | 'h2';
};

export default function SectionLabel({ children, className = '', as: Tag = 'p' }: SectionLabelProps) {
  return (
    <Tag className={`font-body text-xs font-semibold uppercase tracking-widest2 text-stone ${className}`}>
      {children}
    </Tag>
  );
}
