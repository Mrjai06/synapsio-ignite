"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerIcon?: React.ElementType;
  centerLabel?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerIcon: CenterIcon = Brain,
  centerLabel = "AI Core",
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 140;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-primary-foreground bg-primary border-primary";
      case "in-progress":
        return "text-secondary-foreground bg-secondary border-secondary";
      case "pending":
        return "text-muted-foreground bg-muted border-border";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const activeItem = activeNodeId ? timelineData.find(item => item.id === activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full flex flex-col items-center justify-center"
    >
      {/* Orbital visualization - centered */}
      <div
        ref={orbitRef}
        className="relative w-[320px] h-[400px] flex items-center justify-center"
      >
        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[280px] h-[280px] rounded-full border border-border/30 animate-[spin_30s_linear_infinite]" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-border/20" />
          <div className="absolute w-[120px] h-[120px] rounded-full border border-border/10" />
        </div>

        {/* Center element - Brain AI Core */}
        <div className="absolute z-50 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center shadow-lg">
              <CenterIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
          <span className="mt-2 text-xs font-semibold text-foreground tracking-wider">
            {centerLabel}
          </span>
        </div>

        {/* Orbital nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          const nodeStyle = {
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: isExpanded ? 200 : position.zIndex,
            opacity: isExpanded ? 1 : position.opacity,
          };

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="absolute transition-all duration-700 cursor-pointer"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Connection line to center */}
              <div
                className={`absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-border/50 to-transparent origin-left transition-all duration-500 ${
                  isRelated ? "opacity-100 from-primary/50" : "opacity-30"
                }`}
                style={{
                  width: "140px",
                  transform: `rotate(${180 + position.angle}deg)`,
                }}
              />

              {/* Node circle */}
              <div
                className={`relative w-10 h-10 -ml-5 -mt-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isExpanded
                    ? "scale-125 bg-primary border-primary"
                    : isRelated
                    ? "scale-110 bg-secondary border-secondary"
                    : "bg-card border-border hover:border-primary/50"
                } ${isPulsing ? "animate-pulse" : ""}`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isExpanded
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }`}
                />
              </div>

              {/* Node label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                  isExpanded ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Panel below the orbital - slides down when active */}
      <div 
        className={`w-full max-w-md mt-6 transition-all duration-500 ${
          activeItem 
            ? 'opacity-100 translate-y-0 max-h-[400px]' 
            : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        {activeItem && (
          <Card className="bg-card/95 backdrop-blur-lg border-border shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    activeItem.status === "completed"
                      ? "default"
                      : activeItem.status === "in-progress"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-[10px]"
                >
                  {activeItem.status === "completed"
                    ? "COMPLETE"
                    : activeItem.status === "in-progress"
                    ? "IN PROGRESS"
                    : "PENDING"}
                </Badge>
                <span className="text-[10px] text-muted-foreground">
                  {activeItem.date}
                </span>
              </div>
              <CardTitle className="text-sm mt-2">
                {activeItem.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeItem.content}
              </p>

              {activeItem.relatedIds.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 mb-2">
                    <Link className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      Connected Nodes
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeItem.relatedIds.map((relatedId) => {
                      const relatedItem = timelineData.find(
                        (i) => i.id === relatedId
                      );
                      return (
                        <Button
                          key={relatedId}
                          variant="outline"
                          size="sm"
                          className="h-6 text-[10px] px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(relatedId);
                          }}
                        >
                          {relatedItem?.title}
                          <ArrowRight className="w-2 h-2 ml-1" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
