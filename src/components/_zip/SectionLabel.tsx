interface SectionLabelProps {
  label: string;
}

const SectionLabel = ({ label }: SectionLabelProps) => (
  <div className="flex justify-center mb-6">
    <span className="inline-block px-5 py-1.5 text-xs font-medium rounded-full border border-primary/30 bg-primary/5 text-primary">
      {label}
    </span>
  </div>
);

export default SectionLabel;
