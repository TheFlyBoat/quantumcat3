
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
<<<<<<< HEAD
        body: ['"Nunito"', 'sans-serif'],
        headline: ['"Patrick Hand"', 'sans-serif'],
        fortune: ['"Quicksand"', 'sans-serif'],
=======
        body: ['"Patrick Hand"', 'sans-serif'],
        headline: ['"Patrick Hand"', 'sans-serif'],
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          border: 'hsl(var(--border))',
          accent: 'hsl(var(--accent))',
          'accent-foreground': 'hsl(var(--accent-foreground))',
          ring: 'hsl(var(--ring))',
        },
        'magenta': {
            '500': '#ec4899',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glitch': {
          '0%, 100%': { opacity: '1', transform: 'none', filter: 'none' },
          '25%': { transform: 'translate(2px, -2px)', filter: 'hue-rotate(90deg)' },
          '50%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(180deg)' },
          '75%': { transform: 'translate(2px, 2px) skewX(-10deg)', filter: 'hue-rotate(270deg)' },
        },
        'glitch-layer-1': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px) skewX(5deg)' },
          '80%': { transform: 'translate(1px, -1px) skewX(-5deg)' },
        },
        'glitch-layer-2': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '25%': { transform: 'translate(3px, -1px)' },
            '50%': { transform: 'translate(-3px, 1px)' },
            '75%': { transform: 'translate(2px, -2px) skewY(3deg)' },
        },
        'glitch-layer-3': {
            '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.8' },
            '15%': { transform: 'translate(-1px, -2px)', opacity: '0.5' },
            '35%': { transform: 'translate(0, 0)', opacity: '0.8' },
            '55%': { transform: 'translate(2px, 1px)', opacity: '0.5' },
            '75%': { transform: 'translate(-2px, -1px)', opacity: '0.8' },
        },
        'blink': {
          '0%, 95%, 100%': { transform: 'scaleY(1)' },
          '97.5%': { transform: 'scaleY(0.1)' },
        },
        'wag-tail': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'ear-twitch': {
          '0%, 10%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-10deg)' },
        },
        'boo-haunt': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'boo-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'boo-fade': {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.6' },
        },
        'face-turn': {
          '0%': { transform: 'translateX(1500px)' },
          '45%': { transform: 'translateX(1500px)' },
          '55%': { transform: 'translateX(-1500px)' },
          '95%': { transform: 'translateX(-1500px)' },
          '100%': { transform: 'translateX(1500px)' },
        },
        'blink-boo': {
          '0%, 96%, 100%': { transform: 'scaleY(1)' },
          '98%': { transform: 'scaleY(0.1)' },
        },
        'ear-twitch-left-boo': {
          '0%, 10%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-5deg)' },
        },
        'ear-twitch-right-boo': {
          '0%, 10%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(5deg)' },
        },
        'whisker-twitch-left-boo': {
          '0%, 45%, 55%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(8deg)' },
          '95%': { transform: 'rotate(8deg)' },
        },
        'whisker-twitch-right-boo': {
          '0%, 45%, 55%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-8deg)' },
          '95%': { transform: 'rotate(-8deg)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'subtle-shake': {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(-1px) rotate(-0.2deg)' },
          '75%': { transform: 'translateX(1px) rotate(0.2deg)' },
        },
        'slow-look-around': {
          '0%, 100%': { transform: 'translateX(0)' },
          '30%': { transform: 'translateX(-10px)' },
          '60%': { transform: 'translateX(10px)' },
          '80%': { transform: 'translateX(0px)' },
        },
        'twitch-left-shadow': {
          '0%, 15%, 100%': { transform: 'rotate(0)' },
          '7%': { transform: 'rotate(-8deg)' },
        },
        'twitch-right-shadow': {
          '0%, 15%, 100%': { transform: 'rotate(0)' },
          '7%': { transform: 'rotate(8deg)' },
        },
        'blink-shadow': {
          '0%, 97%, 100%': { transform: 'scaleY(1)' },
          '98.5%': { transform: 'scaleY(0.1)' },
        },
        'skeleton-rattle': {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(-1px) rotate(-0.5deg)' },
          '75%': { transform: 'translateX(1px) rotate(0.5deg)' },
        },
        'alt-shake': {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '50%': { transform: 'rotate(0.5deg)' },
        },
        'alt-main-fade': {
          '0%, 19.9%, 80.1%, 100%': { opacity: '1' },
          '20%, 80%': { opacity: '0.5' },
        },
        'alt-split-2': {
          '0%, 19.9%, 80.1%, 100%': { transform: 'translateX(0) scale(1)', opacity: '0', filter: 'none' },
          '20%, 80%': { opacity: '0.7' },
          '30%, 70%': { transform: 'translateX(-90%) scale(0.9)', filter: 'hue-rotate(180deg) saturate(2)' },
        },
        'alt-split-3': {
            '0%, 19.9%, 80.1%, 100%': { transform: 'translateX(0) scale(1)', opacity: '0', filter: 'none' },
            '20%, 80%': { opacity: '0.7' },
            '30%, 70%': { transform: 'translateX(90%) scale(0.9)', filter: 'hue-rotate(90deg) saturate(2)' },
        },
        'alt-split-4': {
            '0%, 19.9%, 80.1%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0', filter: 'none' },
            '20%, 80%': { opacity: '0.7' },
            '30%, 70%': { transform: 'translateY(-25%) scale(0.9)', filter: 'hue-rotate(270deg) saturate(2)' },
        },
        'wag-fast': {
          '0%, 100%': { transform: 'rotate(20deg)' },
          '50%': { transform: 'rotate(-20deg)' },
        },
        'twitch-fast-left': {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(-15deg)' },
        },
        'twitch-fast-right': {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        'look-around-alt': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(400px, 100px)' },
          '50%': { transform: 'translate(-400px, -100px)' },
          '75%': { transform: 'translate(0, 200px)' },
        },
        'pan-bg': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'spin-reveal': {
          '0%': { transform: 'rotateY(90deg) scale(0.8)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
        },
        'cartoon-bounce': {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '15%': { transform: 'scale(0.8)', opacity: '1' },
            '30%': { transform: 'scale(1.2)', opacity: '1' },
            '50%': { transform: 'scale(0.9)', opacity: '1' },
            '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'celebration-in': {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'celebration-out': {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.5) translateY(20px)' },
        },
<<<<<<< HEAD
        'celebration-glow': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.96)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        'celebration-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'celebration-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.95)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        'quantum-field': {
          '0%': { transform: 'rotate(0deg) scale(1)', filter: 'hue-rotate(0deg)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)', filter: 'hue-rotate(90deg)' },
          '100%': { transform: 'rotate(360deg) scale(1)', filter: 'hue-rotate(0deg)' },
        },
        'quantum-glitter': {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.7' },
        },
        'quantum-collapse': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.3)' },
        },
        'quantum-core': {
          '0%, 100%': { transform: 'scale(1)', 'box-shadow': '0 0 22px rgba(94,234,212,0.35)' },
          '50%': { transform: 'scale(1.08)', 'box-shadow': '0 0 48px rgba(129,140,248,0.55)' },
        },
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        'hue-rotate': {
            '0%': { filter: 'hue-rotate(0deg)' },
            '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-in': 'bounce-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'glitch': 'glitch 1.5s infinite steps(2, end)',
        'glitch-layer-1': 'glitch-layer-1 1s infinite steps(2, end)',
        'glitch-layer-2': 'glitch-layer-2 1.2s infinite steps(2, end) 0.2s',
        'glitch-layer-3': 'glitch-layer-3 0.8s infinite steps(2, end) 0.1s',
        'blink': 'blink 4s infinite ease-in-out',
        'wag-tail': 'wag-tail 3s infinite ease-in-out',
        'ear-twitch': 'ear-twitch 6s infinite ease-in-out',
        'boo-haunt': 'boo-haunt 8s infinite ease-in-out',
        'boo-float': 'boo-float 3s infinite ease-in-out',
        'boo-fade': 'boo-fade 3s infinite ease-in-out',
        'face-turn': 'face-turn 16s infinite ease-in-out',
        'blink-boo': 'blink-boo 6s infinite ease-in-out 1s',
        'ear-twitch-left-boo': 'ear-twitch-left-boo 8s infinite ease-in-out',
        'ear-twitch-right-boo': 'ear-twitch-right-boo 8s infinite ease-in-out 0.5s',
        'whisker-twitch-left-boo': 'whisker-twitch-left-boo 16s infinite ease-in-out',
        'whisker-twitch-right-boo': 'whisker-twitch-right-boo 16s infinite ease-in-out',
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        'subtle-shake': 'subtle-shake 1.5s infinite ease-in-out',
        'slow-look-around': 'slow-look-around 9s infinite ease-in-out',
        'twitch-left-shadow': 'twitch-left-shadow 4s infinite ease-in-out',
        'twitch-right-shadow': 'twitch-right-shadow 4.2s infinite ease-in-out 0.3s',
        'blink-shadow': 'blink-shadow 8s infinite ease-in-out',
        'skeleton-rattle': 'skeleton-rattle 1.5s infinite ease-in-out',
        'alt-shake': 'alt-shake 6s infinite ease-in-out',
        'alt-main-fade': 'alt-main-fade 6s infinite ease-in-out',
        'alt-split-2': 'alt-split-2 6s infinite ease-in-out',
        'alt-split-3': 'alt-split-3 6s infinite ease-in-out',
        'alt-split-4': 'alt-split-4 6s infinite ease-in-out',
        'wag-fast': 'wag-fast 1s infinite ease-in-out',
        'twitch-fast-left': 'twitch-fast-left 0.8s infinite ease-in-out',
        'twitch-fast-right': 'twitch-fast-right 0.8s infinite ease-in-out 0.1s',
        'look-around-alt': 'look-around-alt 3s infinite ease-in-out',
        'pan-bg': 'pan-bg 30s linear infinite',
        'spin-reveal': 'spin-reveal 0.5s ease-out forwards',
        'cartoon-bounce': 'cartoon-bounce 0.4s ease-out forwards',
        'celebration-in': 'celebration-in 0.5s ease-out forwards',
        'celebration-out': 'celebration-out 0.5s ease-in forwards',
<<<<<<< HEAD
        'celebration-glow': 'celebration-glow 4s ease-in-out infinite',
        'celebration-float': 'celebration-float 6s ease-in-out infinite',
        'celebration-pulse': 'celebration-pulse 3s ease-in-out infinite',
        'quantum-field': 'quantum-field 22s ease-in-out infinite',
        'quantum-glitter': 'quantum-glitter 4s ease-in-out infinite',
        'quantum-collapse': 'quantum-collapse 0.7s ease-in forwards',
        'quantum-core': 'quantum-core 3s ease-in-out infinite',
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        'hue-rotate': 'hue-rotate 5s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
