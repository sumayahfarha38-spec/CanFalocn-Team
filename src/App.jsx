import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Reveal, Sec, Chart, CanSat, Chute } from './components.jsx'
import { parts, team, nav, LOGO, PHOTO } from './data.js'

export default function App() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 })
  const T = (a, b) => useTransform(p, a, b)

  const sky = T([0, .22, .31, .5, .75, .9, 1], ['#1a1840', '#10142e', '#2a2054', '#17325a', '#2b6a8c', '#8fb5c4', '#c9b48e'])
  // camera on the real skyline photo: aerial -> approach -> climb the tower
  const ps = T([0, .085, .17, .25], [1.02, 2.1, 4, 6.2])
  const py = T([0, .085, .17, .25], ['0vh', '14vh', '40vh', '78vh'])
  const po = T([0, .2, .27], [1, 1, 0])
  // rooftop scene + tower face tracking past during the fall
  const roof = T([.19, .24, .31, .34, .40], [0, 1, 1, 1, 0])
  const roofY = T([.31, .34, .37, .40], ['0vh', '-12vh', '-50vh', '-135vh'])
  const faceO = T([.3, .33, .42, .5], [0, 1, 1, 0])
  const faceY = T([.31, .36, .42, .5], ['0vh', '-30vh', '-120vh', '-220vh'])
  // CanSat: rooftop, close-up, release, camera tracking
  const cy = T([.19, .25, .31, .335, .36, .39, .45], ['70vh', '68vh', '60vh', '61vh', '56vh', '48vh', '45vh'])
  const cs = T([.19, .25, .28, .32, .4, .8, .97], [.1, .9, 1.5, .95, .78, .7, .5])
  const sway = useTransform(p, (v) => (v < .31 ? 0 : Math.sin(v * 70) * (v > .78 ? 4 : 2) + (v > .31 && v < .4 ? (v - .31) * 160 : 0)))
  const cx = T([.9, .98], ['var(--cx)', '50%'])
  const co = T([.17, .21], [0, 1])
  const cloudY = T([.4, 1], ['40vh', '-90vh'])
  const cloudO = T([.38, .5, .85, .95], [0, .5, .5, 0])
  const chS = T([.76, .86], [0, 1])
  const chY = T([.9, .97], ['0vh', '2vh'])
  const chCol = T([.93, .98], [1, .35])
  const gnd = T([.86, .97], ['62vh', '0vh'])
  const hudO = T([.3, .36, .96, 1], [0, 1, 1, 0])
  const bar = T([.3, .97], ['0%', '100%'])
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div>
      <div className="stage">
        <motion.div style={{ background: sky }} />
        <motion.div style={{ opacity: po, overflow: 'hidden' }}>
          <motion.img src={PHOTO} alt="Bahrain Bay and the Four Seasons Hotel tower"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 12%', scale: ps, y: py, transformOrigin: '54.5% 13%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%,transparent 40%,rgba(6,19,35,.8))' }} />
        </motion.div>
        <motion.div style={{ opacity: roof, y: roofY }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: '74vh', height: '60vh', background: 'linear-gradient(90deg,#3b2c18,#a98550 30%,#e2c48a 52%,#8a6a36 78%,#2d2112)', boxShadow: '0 -2px 40px rgba(213,173,112,.35)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '74vh', height: 2, background: '#f3d9a4' }} />
          <div className="tag hidem" style={{ position: 'absolute', left: '7vw', top: '80vh', color: '#f3d9a4' }}>Release point · illustrative</div>
        </motion.div>
        <motion.div style={{ opacity: faceO, y: faceY }}>
          <div style={{ position: 'absolute', left: '72%', width: '18%', top: '72vh', height: '260vh', background: 'repeating-linear-gradient(180deg,rgba(0,0,0,.35) 0 2px,transparent 2px 38px),linear-gradient(90deg,#4a3820,#c9a465 50%,#5c4426)', boxShadow: '0 0 60px rgba(213,173,112,.3)' }} />
        </motion.div>
        <motion.div style={{ opacity: cloudO, y: cloudY }}>
          {[10, 45, 75].map((l, i) => (
            <div key={i} style={{ position: 'absolute', left: l + '%', top: i * 45 + 'vh', width: '38vw', height: '14vh', borderRadius: '50%', background: 'rgba(235,242,248,.35)', filter: 'blur(30px)' }} />
          ))}
        </motion.div>
        <motion.div style={{ y: gnd }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: '78vh', height: '60vh', background: 'linear-gradient(#d9c08f,#a98550)', boxShadow: '0 -20px 80px rgba(255,235,190,.5)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '74vh', height: '4vh', background: 'linear-gradient(transparent,#2b7a8c)' }} />
        </motion.div>
        <motion.div style={{ opacity: co }}>
          <motion.div style={{ position: 'absolute', left: cx, top: cy, x: '-50%', y: '-50%', width: 'clamp(70px,9vw,120px)', scale: cs, rotate: sway }}>
            <motion.div style={{ position: 'absolute', bottom: '96%', left: '50%', width: '340%', x: '-50%', scale: chS, y: chY, opacity: chCol, transformOrigin: '50% 100%' }}>
              <Chute />
            </motion.div>
            <CanSat />
          </motion.div>
        </motion.div>
        <div style={{ background: 'radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(2,8,16,.6))' }} />
      </div>

      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-[5vw] py-4"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top,0px))', background: 'linear-gradient(rgba(6,19,35,.75),transparent)' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <img src={LOGO} alt="CanFalcon" className="h-9" />
          <span className="d font-bold tracking-[.25em] text-sm">CAN<span style={{ color: '#C8102E' }}>FALCON</span></span>
        </button>
        <nav className="hidden md:flex gap-8">
          {nav.map(([n, id]) => <button key={id} onClick={() => go(id)} className="tag hover:text-white transition">{n}</button>)}
        </nav>
        <div className="tag" style={{ border: '1px solid rgba(213,173,112,.5)', padding: '6px 10px' }}>Placeholder data</div>
      </header>
      <motion.div className="fixed top-0 left-0 h-[2px] z-50" style={{ width: bar, background: 'linear-gradient(90deg,#C8102E,#D5AD70)' }} />

      <motion.div className="fixed z-40 left-[5vw] right-[5vw] flex justify-between tag"
        style={{ opacity: hudO, bottom: 'calc(20px + env(safe-area-inset-bottom,0px))', borderTop: '1px solid rgba(180,200,220,.25)', paddingTop: 12, color: '#9fb4c8' }}>
        <span>Descent<br /><b className="text-white d">—</b></span>
        <span>Sampling<br /><b className="text-white d">0.5 s</b></span>
        <span className="hidem">Images target<br /><b className="text-white d">≥ 15</b></span>
        <span>Data<br /><b style={{ color: '#D5AD70' }} className="d">Awaiting flight</b></span>
      </motion.div>

      <main>
        <section className="sec"><div><Reveal>
          <div className="tag mb-6">A Bahrain-based atmospheric exploration mission</div>
          <h1 className="d font-bold" style={{ fontSize: 'clamp(58px,11vw,150px)', lineHeight: .9, letterSpacing: '-.035em' }}>CAN<span style={{ color: '#C8102E' }}>FALCON</span></h1>
          <p className="p mt-8">From Manama's skyline to the ground below, one can-sized satellite measures the air as it falls.</p>
          <button onClick={() => go('intro')} className="mt-10 d tracking-[.3em] text-xs px-8 py-4" style={{ background: '#C8102E' }}>EXPLORE MISSION</button>
        </Reveal></div></section>
        <section className="sec"><Reveal><div className="tag">Bahrain Bay · Manama</div><h2 className="h2 mt-4">The approach.</h2><p className="p mt-4">Our release site is the Four Seasons Hotel Bahrain Bay tower.</p></Reveal></section>
        <section className="sec"><Reveal><div className="tag">Ascending the tower</div><h2 className="h2 mt-4">Up the golden face.</h2></Reveal></section>
        <section className="sec"><Reveal><div className="tag">Release point · illustrative</div><h2 className="h2 mt-4">CanFalcon, ready.</h2><p className="p mt-4">A visual representation of the mission, not a claim about flight conditions.</p></Reveal></section>
        <section className="sec"><Reveal><div className="tag">Release</div><h2 className="h2 mt-4">Gravity takes over.</h2></Reveal></section>

        <Sec id="intro" tag="01 · Introduction" title="Named for a falcon.">
          <Reveal d={.1}><p className="p">CanFalcon is our CanSat: a full satellite in a soda-can volume. It takes its spirit from Al Munther, the falcon whose speed and sharp vision guide how we descend, sense and see.</p></Reveal>
        </Sec>
        <Sec id="obj" tag="02 · Mission Objectives" title="Understand the air we fall through.">
          <Reveal d={.1}><ul className="p">
            {['Measure atmospheric conditions during descent', 'Capture imagery of the descent', 'Compare images with sensor readings', 'Return clean telemetry to the ground station'].map((t) => <li key={t} className="line py-3">{t}</li>)}
          </ul></Reveal>
        </Sec>
        <Sec id="primary" tag="03 · Primary Mission" title="Three measurements. Every 0.5 seconds.">
          <Reveal d={.1}><div className="space-y-2" style={{ width: 'min(420px,80vw)' }}>
            <Chart k="#C8102E" label="TEMPERATURE" unit="°C" pts="M0 30 C40 22 70 36 110 18 S170 24 200 10" />
            <Chart k="#D5AD70" label="PRESSURE" unit="hPa" pts="M0 42 C50 38 90 28 130 22 S180 10 200 6" />
            <Chart k="#7cb4e8" label="HUMIDITY" unit="%" pts="M0 12 C40 20 80 14 120 30 S170 34 200 40" />
            <div className="tag" style={{ color: '#9fb4c8' }}>Placeholder curves · not flight data</div>
          </div></Reveal>
        </Sec>
        <Sec id="secondary" tag="04 · Secondary Mission" title="The falcon's eye.">
          <Reveal d={.1}>
            <p className="p mb-5">At least 15 images during descent, at least 5 of them clear, then compared with the sensor data.</p>
            <div className="grid grid-cols-5 gap-2" style={{ width: 'min(300px,70vw)' }}>
              {[...Array(15)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: .6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .07 }}
                  style={{ aspectRatio: '4/3', background: i % 3 === 0 ? '#D5AD70' : 'rgba(180,200,220,.18)' }} />
              ))}
            </div>
            <div className="tag mt-3" style={{ color: '#9fb4c8' }}>Gold = target for clear images</div>
          </Reveal>
        </Sec>
        <Sec id="eng" tag="05 · Engineering" title="Seven parts. One can.">
          <Reveal d={.1}><div style={{ width: 'min(420px,85vw)' }}>
            {parts.map(([a, b], i) => (
              <motion.div key={a} className="line py-3 flex justify-between" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}>
                <span className="d">{a}</span><span className="text-slate-400 text-sm">{b}</span>
              </motion.div>
            ))}
          </div></Reveal>
        </Sec>
        <Sec id="descent" tag="06 · Descent" title="The parachute opens.">
          <Reveal d={.1}><p className="p">The parachute slows the fall, steadies the can and gives the sensors and camera clean measurements until touchdown.</p></Reveal>
        </Sec>
        <Sec id="team" tag="07 · The Team" title="Team CanFalcon.">
          <div style={{ width: 'min(380px,85vw)' }}>
            {team.map(([n, r], i) => (
              <Reveal key={n} d={i * .05}><div className="line py-3"><div className="d text-lg">{n}</div><div className="text-slate-400 text-sm">{r}</div></div></Reveal>
            ))}
          </div>
        </Sec>
        <section className="sec" style={{ justifyContent: 'center', textAlign: 'center' }}><Reveal>
          <img src={LOGO} alt="" className="mx-auto mb-8" style={{ height: 'clamp(90px,16vh,160px)' }} />
          <h2 className="h2" style={{ color: '#1a2a3a' }}>Mission CanFalcon.</h2>
          <p className="mt-4 d tracking-[.3em] text-xs" style={{ color: '#3a4a5a' }}>BAHRAIN · CANSAT 2026</p>
        </Reveal></section>
      </main>
    </div>
  )
}
