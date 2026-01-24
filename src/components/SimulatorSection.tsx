import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Clock, Package } from "lucide-react";

const SimulatorSection = () => {
  const [volume, setVolume] = useState([50]);
  const [complexity, setComplexity] = useState([30]);
  const [suppliers, setSuppliers] = useState([25]);

  // Calculate ROI based on sliders
  const baselineSavings = 2.4; // millions
  const volumeMultiplier = volume[0] / 50;
  const complexityMultiplier = 1 + (complexity[0] / 100);
  const supplierMultiplier = 1 + (suppliers[0] / 100) * 0.5;
  
  const totalSavings = (baselineSavings * volumeMultiplier * complexityMultiplier * supplierMultiplier).toFixed(1);
  const timeReduction = Math.round(35 + (complexity[0] / 100) * 25);
  const accuracyImprovement = Math.round(25 + (volume[0] / 100) * 20);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">ROI Calculator</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Calculate Your <span className="text-gradient">Savings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Adjust the parameters below to estimate the impact of Synapsio on your operations.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Sliders */}
          <div className="glass rounded-2xl p-8 space-y-10">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-medium">Annual Procurement Volume</label>
                <span className="text-primary font-mono">${volume[0] * 10}M</span>
              </div>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-medium">Supply Chain Complexity</label>
                <span className="text-primary font-mono">{complexity[0]}%</span>
              </div>
              <Slider
                value={complexity}
                onValueChange={setComplexity}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-medium">Number of Suppliers</label>
                <span className="text-primary font-mono">{suppliers[0] * 10}+</span>
              </div>
              <Slider
                value={suppliers}
                onValueChange={setSuppliers}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          {/* Results */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Projected Annual Impact</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <span className="font-medium">Cost Savings</span>
                </div>
                <span className="text-3xl font-bold text-primary">${totalSavings}M</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Lead Time Reduction</span>
                </div>
                <span className="text-xl font-semibold">{timeReduction}%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Forecast Accuracy</span>
                </div>
                <span className="text-xl font-semibold">+{accuracyImprovement}%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Inventory Optimization</span>
                </div>
                <span className="text-xl font-semibold">-23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
