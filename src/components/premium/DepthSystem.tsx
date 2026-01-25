import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface FloatingSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "low" | "medium" | "high" | "floating";
  blur?: boolean;
  glow?: boolean;
  glowColor?: "primary" | "secondary" | "accent";
}

/**
 * FloatingSurface - A reusable component for creating depth and layering
 * Uses soft shadows, subtle blur, and scale to create spatial hierarchy
 */
export const FloatingSurface = forwardRef<HTMLDivElement, FloatingSurfaceProps>(
  ({ 
    className, 
    elevation = "medium", 
    blur = false,
    glow = false,
    glowColor = "primary",
    children, 
    ...props 
  }, ref) => {
    const elevationStyles = {
      low: "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),0_1px_3px_-1px_rgba(0,0,0,0.1)]",
      medium: "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25),0_4px_12px_-4px_rgba(0,0,0,0.15)]",
      high: "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.35),0_8px_24px_-8px_rgba(0,0,0,0.2)]",
      floating: "shadow-[0_24px_64px_-16px_rgba(0,0,0,0.4),0_12px_32px_-8px_rgba(0,0,0,0.25)]",
    };

    const glowStyles = {
      primary: "before:bg-primary/5",
      secondary: "before:bg-secondary/8",
      accent: "before:bg-accent/6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          elevationStyles[elevation],
          blur && "backdrop-blur-sm",
          glow && [
            "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none",
            "before:blur-2xl before:-z-10",
            glowStyles[glowColor]
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FloatingSurface.displayName = "FloatingSurface";

interface DepthLayerProps extends HTMLAttributes<HTMLDivElement> {
  layer?: "background" | "midground" | "foreground";
}

/**
 * DepthLayer - Wrapper for positioning content at different depth levels
 */
export const DepthLayer = forwardRef<HTMLDivElement, DepthLayerProps>(
  ({ className, layer = "midground", children, ...props }, ref) => {
    const layerStyles = {
      background: "z-0 opacity-60 scale-[0.98]",
      midground: "z-10 opacity-100 scale-100",
      foreground: "z-20 opacity-100 scale-[1.01]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          layerStyles[layer],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DepthLayer.displayName = "DepthLayer";

/**
 * GlassPanel - A glassmorphic surface with subtle blur and border
 */
interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium" | "strong";
  bordered?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = "medium", bordered = true, children, ...props }, ref) => {
    const intensityStyles = {
      subtle: "bg-card/10 backdrop-blur-sm",
      medium: "bg-card/20 backdrop-blur-md",
      strong: "bg-card/35 backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          intensityStyles[intensity],
          bordered && "border border-border/10",
          "transition-all duration-500",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

/**
 * AmbientGlow - Soft background glow for atmosphere
 */
interface AmbientGlowProps extends HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary" | "accent" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: "subtle" | "medium" | "strong";
  position?: "center" | "top" | "bottom" | "left" | "right";
}

export const AmbientGlow = forwardRef<HTMLDivElement, AmbientGlowProps>(
  ({ 
    className, 
    color = "primary", 
    size = "md",
    intensity = "subtle",
    position = "center",
    ...props 
  }, ref) => {
    const colorStyles = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      neutral: "bg-foreground",
    };

    const sizeStyles = {
      sm: "w-[200px] h-[200px]",
      md: "w-[400px] h-[400px]",
      lg: "w-[600px] h-[600px]",
      xl: "w-[900px] h-[900px]",
    };

    const intensityStyles = {
      subtle: "opacity-[0.03]",
      medium: "opacity-[0.06]",
      strong: "opacity-[0.1]",
    };

    const positionStyles = {
      center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      top: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
      bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
      left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
      right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute rounded-full blur-[120px] pointer-events-none",
          colorStyles[color],
          sizeStyles[size],
          intensityStyles[intensity],
          positionStyles[position],
          className
        )}
        {...props}
      />
    );
  }
);

AmbientGlow.displayName = "AmbientGlow";
