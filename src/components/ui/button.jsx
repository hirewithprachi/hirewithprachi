import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
  const rippleRef = useRef(null);
  const controls = useAnimation();

  function handleClick(e) {
    if (props.onClick) props.onClick(e);
    // Pulse animation
    controls.start({ scale: [1, 1.08, 1], transition: { duration: 0.32 } });
    // Ripple animation
    const btn = e.currentTarget;
    const ripple = rippleRef.current;
    if (ripple) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.classList.remove('animate-ripple');
      // Force reflow
      void ripple.offsetWidth;
      ripple.classList.add('animate-ripple');
    }
  }

	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }), 'relative overflow-hidden')}
			ref={ref}
      onClick={handleClick}
			{...props}
		>
      <motion.span animate={controls} className="inline-flex w-full h-full items-center justify-center">
        {props.children}
      </motion.span>
      {/* Ripple effect */}
      <span
        ref={rippleRef}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-white/40 opacity-70 scale-0 animate-none"
        style={{ zIndex: 1 }}
      />
      <style>{`
        .animate-ripple {
          animation: ripple-effect 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes ripple-effect {
          0% { opacity: 0.7; transform: scale(0); }
          60% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.2); }
        }
      `}</style>
		</Comp>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };