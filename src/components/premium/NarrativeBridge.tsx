interface NarrativeBridgeProps {
  from: string;
  to: string;
  children?: React.ReactNode;
}

const NarrativeBridge = ({ from, to, children }: NarrativeBridgeProps) => {
  return (
    <div className="relative py-24 md:py-32">
      {/* Gradient blend */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      {/* Narrative content */}
      {children && (
        <div className="relative container mx-auto px-8 lg:px-16">
          <div className="max-w-xl mx-auto text-center">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default NarrativeBridge;