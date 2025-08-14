import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dim: 'hsl(var(--primary-dim))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'guiding-light': 'hsl(var(--guiding-light))',
				'guiding-light-glow': 'hsl(var(--guiding-light-glow))',
				'death-screen': 'hsl(var(--death-screen-bg))',
				'text-glow': 'hsl(var(--text-glow))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'guiding-light-pulse': {
					'0%, 100%': { 
						opacity: '0.6',
						transform: 'scale(1)',
						filter: 'blur(0px)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.1)',
						filter: 'blur(2px)'
					}
				},
				'text-glow': {
					'0%, 100%': { textShadow: 'var(--shadow-text)' },
					'50%': { textShadow: 'var(--shadow-intense-glow)' }
				},
				'float-swim': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-10px) rotate(2deg)' },
					'50%': { transform: 'translateY(-5px) rotate(0deg)' },
					'75%': { transform: 'translateY(-15px) rotate(-2deg)' }
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'typewriter': {
					from: { width: '0' },
					to: { width: '100%' }
				},
				'particles': {
					'0%': { transform: 'translateY(100vh) translateX(0px) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '0.8' },
					'90%': { opacity: '0.8' },
					'100%': { transform: 'translateY(-10vh) translateX(100px) rotate(360deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'guiding-light-pulse': 'guiding-light-pulse 3s ease-in-out infinite',
				'text-glow': 'text-glow 2s ease-in-out infinite',
				'float-swim': 'float-swim 4s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 1s ease-out forwards',
				'typewriter': 'typewriter 2s steps(30) forwards',
				'particles': 'particles 8s linear infinite'
			},
			backgroundImage: {
				'gradient-atmospheric': 'var(--gradient-atmospheric)',
				'gradient-guiding-light': 'var(--gradient-guiding-light)',
				'gradient-text-glow': 'var(--gradient-text-glow)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'intense-glow': 'var(--shadow-intense-glow)',
				'text': 'var(--shadow-text)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
