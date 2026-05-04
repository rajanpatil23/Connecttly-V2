import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        // size & layout
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
        // base (OFF) – white track with light border
        "bg-white border border-slate-300",
        // transition + focus
        "transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0074ED]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        // ON state – brand track
        "data-[state=checked]:bg-[#0074ED] data-[state=checked]:border-[#0074ED]",
        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm",
          // subtle ring to keep the knob crisp on white
          "ring-1 ring-slate-300",
          // motion
          "translate-x-0.5 transition-transform duration-200 ease-out",
          "data-[state=checked]:translate-x-5 data-[state=checked]:ring-white"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
