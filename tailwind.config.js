/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"sopa-dark": "#0F111A",
				"sopa-panel": "#161825",
				"sopa-primary": "#6366F1",
				"sopa-primary-hover": "#818CF8",
				"sopa-muted": "#B4B9C7",
			},
			boxShadow: {
				"sopa-panel": "10px 0 30px rgba(0,0,0,0.2)",
				"sopa-glow": "0 4px 20px -5px rgba(99,102,241,0.6)",
				"sopa-glow-strong": "0 15px 30px -10px rgba(99,102,241,0.6)",
			},
			fontSize: {
				"fluid-title": "clamp(2.2rem,4vw,5rem)",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			animation: {
				"fade-in": "fadeIn 0.4s ease-out",
				"slide-in-right": "slideInRight 0.5s ease-out",
				shake: "shake 0.4s ease-in-out",
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				slideInRight: {
					from: { opacity: 0, transform: "translateX(20px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				shake: {
					"0%,100%": { transform: "translateX(0)" },
					"25%": { transform: "translateX(-4px)" },
					"75%": { transform: "translateX(4px)" },
				},
			},
		},
	},
	plugins: [],
};
