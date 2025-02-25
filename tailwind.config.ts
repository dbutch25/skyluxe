import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '0.8rem',
  			sm: '1rem',
  			lg: '1rem',
  			xl: '2rem',
  			'2xl': '8rem'
  		}
  	},
  	extend: {
		screens: {
			'below-md': {
				max: '768px'
			},
			'below-lg': {
				max: '1024'
			}
		},
  		keyframes: {
			scroll: {
				to: {
					transform: "translate(calc(-50% - 0.5rem))",
				},
			},
  			scrollLeft: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			}
  		},
  		animation: {
  			scrollLeft: 'scrollLeft 8s linear infinite',
  			scrollLeftMedium: 'scrollLeft 12s linear infinite',
  			scrollLeftSlow: 'scrollLeft 16s linear infinite',
			scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
  		},
  		fontSize: {
  			sm: 'clamp(0.9rem, 0.17vw + 0.9rem, 1rem)',
  			base: 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
  			lg: 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
  			xl: 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
  			'2xl': 'clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)',
  			'3xl': 'clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)',
  			'4xl': 'clamp(3.05rem, 3.54vw + 2.17rem, 5rem)',
  			'5xl': 'clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)',
  			'6xl': 'clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)'
  		},
  		colors: {
  			primary: {
  				'50': '#f7f6f6',
  				'100': '#f0efef',
  				'200': '#e3e2e2',
  				'300': '#d2cfd1',
  				'400': '#bebbbc',
  				'500': '#aca8a9',
  				'600': '#908c8d',
  				'700': '#837f7f',
  				'800': '#6b6869',
  				'900': '#585757',
  				'950': '#343232',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f0faff',
  				'100': '#e0f3fe',
  				'200': '#b9e9fe',
  				'300': '#7cd8fd',
  				'400': '#36c6fa',
  				'500': '#0cafeb',
  				'600': '#0095d5',
  				'700': '#016fa3',
  				'800': '#065e86',
  				'900': '#0b4e6f',
  				'950': '#07324a',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			montserrat: ['Montserrat', 'sans-serif'],
  			julius: ['Julius Sans One', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default config;
