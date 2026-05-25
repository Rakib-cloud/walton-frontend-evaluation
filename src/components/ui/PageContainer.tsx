import { cn } from "@/lib/cn";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function PageContainer({
  children,
  className,
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full container px-4 py-8 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
