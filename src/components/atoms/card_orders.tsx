import * as React from "react";

import cn from "classnames";

const CardOrder = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
CardOrder.displayName = "Card";

const CardOrderHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-2 text-lime-400 underline",
      className
    )}
    {...props}
  />
));
CardOrderHeader.displayName = "CardHeader";

const CardOrderTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight text-black",
      className
    )}
    {...props}
  />
));
CardOrderTitle.displayName = "CardTitle";

const CardOrderDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground text-black", className)}
    {...props}
  />
));
CardOrderDescription.displayName = "CardDescription";

const CardOrderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardOrderContent.displayName = "CardContent";

const CardOrderFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardOrderFooter.displayName = "CardFooter";

export {
  CardOrder,
  CardOrderHeader,
  CardOrderFooter,
  CardOrderTitle,
  CardOrderDescription,
  CardOrderContent,
};
