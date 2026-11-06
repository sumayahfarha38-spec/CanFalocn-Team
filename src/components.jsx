import { motion } from 'framer-motion'

export const Reveal = ({ children, d = 0, x = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 40, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.9, delay: d, ease: [0.2, 0.7, 0.2, 1] }}>
    {children}
  </motion.div>
)

export const Sec = ({ id, children, tag, title, cls = '' }) => (
  <section id={id} className={'sec ' + cls}>
    <div className="max-w-xl">
      <Reveal><div className="tag mb-5">{tag}</div><h2 className="h2 mb-6">{title}</h2></Reveal>
      {children}
    </div>
  </section>
)

export const Chart = ({ k, label, unit, pts }) => (
  <div className="line pt-3">
    <div className="flex justify-between text-xs d tracking-widest text-slate-400"><span>{label}</span><span>{unit}</span></div>
    <svg viewBox="0 0 200 50" className="w-full h-12">
      <motion.path d={pts} fill="none" stroke={k} strokeWidth="1.6" initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: 'easeOut' }} />
    </svg>
  </div>
)

export const CanSat = () => (
  <svg viewBox="0 0 120 270" width="100%" style={{ overflow: 'visible', filter: 'drop-shadow(0 18px 24px rgba(0,0,0,.55))' }}>
    <defs>
      <linearGradient id="al" x1="0" x2="1"><stop offset="0" stopColor="#6d7b8b" /><stop offset=".35" stopColor="#f1f5f9" /><stop offset=".7" stopColor="#9fb0c1" /><stop offset="1" stopColor="#4b5866" /></linearGradient>
      <linearGradient id="gd" x1="0" x2="1"><stop offset="0" stopColor="#8a6a36" /><stop offset=".4" stopColor="#f3d9a4" /><stop offset="1" stopColor="#8a6a36" /></linearGradient>
      <linearGradient id="gl" x1="0" x2="1"><stop offset="0" stopColor="#1b3b63" stopOpacity=".9" /><stop offset=".4" stopColor="#6fa0d8" stopOpacity=".45" /><stop offset="1" stopColor="#0c1c33" stopOpacity=".9" /></linearGradient>
    </defs>
    <line x1="42" y1="2" x2="42" y2="38" stroke="#D5AD70" strokeWidth="1.5" />
    <circle cx="60" cy="42" r="6" fill="none" stroke="url(#gd)" strokeWidth="3" />
    <rect x="8" y="50" width="104" height="14" rx="5" fill="url(#al)" />
    <rect x="10" y="64" width="100" height="96" fill="url(#gl)" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="18" y={74 + i * 20} width="84" height="5" rx="2" fill="#0d4a38" />
        <rect x="26" y={70 + i * 20} width="10" height="4" fill="#D5AD70" />
        <rect x="50" y={70 + i * 20} width="14" height="4" fill="#10151c" />
        <rect x="78" y={70 + i * 20} width="8" height="4" fill="#D5AD70" />
      </g>
    ))}
    <rect x="88" y="66" width="8" height="90" rx="3" fill="#2a3340" />
    <rect x="8" y="160" width="104" height="8" fill="url(#gd)" />
    <rect x="8" y="168" width="104" height="14" fill="#C8102E" />
    <rect x="8" y="182" width="104" height="82" rx="6" fill="url(#al)" />
    <circle cx="60" cy="214" r="13" fill="#10151c" />
    <circle cx="60" cy="214" r="8" fill="#0a1b33" stroke="#4f86ff" strokeWidth="1.5" />
    <circle cx="57" cy="211" r="2" fill="#bcd4ff" />
    <rect x="8" y="256" width="104" height="8" rx="4" fill="#10151c" />
  </svg>
)

export const Chute = () => (
  <svg viewBox="0 0 400 330" width="100%" style={{ overflow: 'visible' }}>
    <defs><clipPath id="cp"><path d="M10 150 Q200 -90 390 150 Q330 118 300 150 Q250 112 200 150 Q150 112 100 150 Q70 118 10 150Z" /></clipPath></defs>
    <g clipPath="url(#cp)">
      {[...Array(10)].map((_, i) => <rect key={i} x={i * 40} y="-40" width="40" height="200" fill={i % 2 ? '#EAF0F5' : '#C8102E'} />)}
    </g>
    <path d="M10 150 Q200 -90 390 150" fill="none" stroke="#D5AD70" strokeWidth="3" />
    {[10, 100, 200, 300, 390].map((x, i) => <line key={i} x1={x} y1="150" x2="200" y2="328" stroke="#EAF0F5" strokeOpacity=".75" strokeWidth="1.6" />)}
  </svg>
)
