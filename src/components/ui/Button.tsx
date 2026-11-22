import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "accent-outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_8px_24px_-12px_var(--accent)] hover:brightness-110 hover:shadow-[0_12px_30px_-12px_var(--accent)]",
  secondary:
    "border border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-2",
  "accent-outline":
    "border border-accent/40 bg-accent-soft text-accent-text hover:border-accent hover:bg-accent/15",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ActionProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: LinkProps | ActionProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkProps;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...anchorRest}
      >
        {icon}
        {children}
        {iconRight}
      </a>
    );
  }

  const buttonRest = rest as ActionProps;
  return (
    <button className={classes} {...buttonRest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
