import * as React from "react";

import cn from "classnames";

const CardBook = React.forwardRef<
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
CardBook.displayName = "Card";

const CardBookHeader = React.forwardRef<
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
CardBookHeader.displayName = "CardHeader";

const CardBookTitle = React.forwardRef<
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
CardBookTitle.displayName = "CardTitle";

const CardBookDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground text-black", className)}
    {...props}
  />
));
CardBookDescription.displayName = "CardDescription";

const CardBookContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardBookContent.displayName = "CardContent";

const CardBookFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardBookFooter.displayName = "CardFooter";

export {
  CardBook,
  CardBookHeader,
  CardBookFooter,
  CardBookTitle,
  CardBookDescription,
  CardBookContent,
};
