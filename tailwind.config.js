/* ═══════════════════════════════════════════════
   Cyber Dark Portfolio — Tailwind Configuration
   ═══════════════════════════════════════════════ */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0B1120',
          card: '#1E293B',
          text: '#F8FAFC',
          muted: '#94A3B8',
          accent: '#38BDF8',
          border: '#334155',
          'card-hover': '#263548',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' },
        },
      },
    },
  },
};
