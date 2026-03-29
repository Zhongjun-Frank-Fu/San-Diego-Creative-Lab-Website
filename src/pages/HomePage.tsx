import ApiKeyModal from '@/components/shared/ApiKeyModal'

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD_3m08Ff7f9sqo3lVpiM80xlllH0-iTlBkERZtIkQqci_cBoZA5DUjcZSoD1Q7XxKhz-EjEUc7jDFWtA5_wWZn4etwDDGGtdIIL8-6QQZ4H-NFW20L4A3DXkt1cjYb2wxWKHUyaiNe0pE1R5JZLrjzZcAtKiAd0aKnm3NF9bsJt-11NHLYCFOV8hK57np11WQpEqS_yqLoZwII2B42kBJwnAEX7yqk3hBTd6csLqtywUOSzAwSJaHpq8JA7lCdXQQ7Hjsy-FJTzvg'

const projects = [
  {
    path: '/code-tutor',
    title: 'CodeTutor',
    desc: 'Socratic coding mentor that guides you through logic without giving away the answers. Built for mastery.',
    icon: 'school',
    hoverBorder: 'hover:border-secondary/50',
    orbBg: 'bg-secondary/10',
    orbHover: 'group-hover:bg-secondary/20',
    iconBg: 'bg-secondary/20',
    textColor: 'text-secondary',
    borderColor: 'border-secondary/20',
    tags: ['Monaco Editor', 'AST Analysis'],
  },
  {
    path: '/flashcards',
    title: 'SmartFlashcard',
    desc: 'Automated flashcard generation from your workspace documentation using advanced spaced-repetition logic.',
    icon: 'psychology',
    hoverBorder: 'hover:border-amber-400/50',
    orbBg: 'bg-amber-400/10',
    orbHover: 'group-hover:bg-amber-400/20',
    iconBg: 'bg-amber-400/20',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-400/20',
    tags: ['SM-2 Algorithm', 'NLP'],
  },
  {
    path: '/paper-chat',
    title: 'PaperChat',
    desc: 'Full-context document Q&A. Upload whitepapers or legal docs and query them with semantic precision.',
    icon: 'description',
    hoverBorder: 'hover:border-primary/50',
    orbBg: 'bg-primary/10',
    orbHover: 'group-hover:bg-primary/20',
    iconBg: 'bg-primary/20',
    textColor: 'text-primary',
    borderColor: 'border-primary/20',
    tags: ['RAG', 'Vector DB'],
  },
  {
    path: '/roadmap',
    title: 'SyllabusRoadmap',
    desc: 'Visual learning path generator that scrapes prerequisites and dependencies for any complex skill.',
    icon: 'map',
    hoverBorder: 'hover:border-tertiary/50',
    orbBg: 'bg-tertiary/10',
    orbHover: 'group-hover:bg-tertiary/20',
    iconBg: 'bg-tertiary/20',
    textColor: 'text-tertiary',
    borderColor: 'border-tertiary/20',
    tags: ['Canvas API', 'Graph Theory'],
  },
]

const connectivity = [
  { icon: 'terminal', title: 'Devpost', desc: 'Official hackathon portal and project submissions.', hoverBorder: 'hover:border-primary/40', iconBg: 'bg-primary/10', iconColor: 'text-primary', linkColor: 'text-primary', label: 'Connect Node' },
  { icon: 'database', title: 'Notion', desc: 'Documentation, schedules, and team coordination.', hoverBorder: 'hover:border-secondary/40', iconBg: 'bg-secondary/10', iconColor: 'text-secondary', linkColor: 'text-secondary', label: 'Access Docs' },
  { icon: 'code', title: 'TRAE IDE', desc: 'The core development environment for vibe coding.', hoverBorder: 'hover:border-amber-400/40', iconBg: 'bg-amber-400/10', iconColor: 'text-amber-400', linkColor: 'text-amber-400', label: 'Download Tool' },
  { icon: 'api', title: 'Z.ai API', desc: 'Global Language Model 5 documentation and keys.', hoverBorder: 'hover:border-emerald-400/40', iconBg: 'bg-emerald-400/10', iconColor: 'text-emerald-400', linkColor: 'text-emerald-400', label: 'Fetch Schema' },
  { icon: 'account_tree', title: 'GitHub', desc: 'Open source repositories and template engines.', hoverBorder: 'hover:border-blue-400/40', iconBg: 'bg-blue-400/10', iconColor: 'text-blue-400', linkColor: 'text-blue-400', label: 'Clone Repo' },
  { icon: 'rocket_launch', title: 'Quick Start', desc: 'Go from 0 to 1 in under five minutes.', hoverBorder: 'hover:border-red-400/40', iconBg: 'bg-red-400/10', iconColor: 'text-red-400', linkColor: 'text-red-400', label: 'Execute Setup' },
]

export default function HomePage() {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-sans selection:bg-primary/30 min-h-screen">
      {/* ===== Top NavBar ===== */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(173,198,255,0.06)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-blue-200 font-headline uppercase">
            BUILD_SD
          </div>
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm uppercase">
            <a className="text-neutral-400 hover:text-blue-100 transition-colors" href="#about">Event Info</a>
            <a className="text-blue-200 border-b-2 border-blue-400 pb-1" href="#projects">Projects</a>
            <a className="text-neutral-400 hover:text-blue-100 transition-colors" href="#stack">Stack</a>
            <a className="text-neutral-400 hover:text-blue-100 transition-colors" href="#resources">Resources</a>
            <a className="text-tertiary border-b-2 border-tertiary pb-1" href="#join">Join Us</a>
          </div>
        </div>
      </nav>

      <main className="relative overflow-hidden pt-20">
        {/* Floating Orbs */}
        <div className="orb bg-primary w-[500px] h-[500px] -top-48 -left-24" />
        <div className="orb bg-secondary w-[400px] h-[400px] top-1/2 -right-24" />
        <div className="orb bg-tertiary w-[300px] h-[300px] bottom-0 left-1/4" />

        {/* ===== Hero Section ===== */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 grid-bg">
          <div className="digital-rain-overlay" />
          <div className="max-w-5xl text-center z-10">
            {/* Pulse Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8 animate-breathe">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
              </span>
              <span className="text-xs font-mono tracking-widest text-on-surface-variant uppercase">
                Vibe Coding Protocol Active
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter text-on-surface mb-6 leading-[0.9]">
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>Build</span>{' '}
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.2s' }}>with</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container inline-block animate-slide-up" style={{ animationDelay: '0.3s' }}>
                TRAE x Z.ai
              </span>{' '}
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.4s' }}>@</span>{' '}
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.5s' }}>San Diego</span>
            </h1>

            {/* Typing Subtitle */}
            <div className="flex justify-center mb-8">
              <h2 className="text-2xl md:text-4xl font-headline font-light text-secondary tracking-tight animate-typing w-fit">
                The Era of Vibe Coding
              </h2>
            </div>

            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light mb-12 leading-relaxed">
              Stop dreaming. Start shipping. Close the gap between imagination and a working product with high-frequency AI collaboration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-2xl font-headline font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(77,142,255,0.3)] animate-pulse-glow"
              >
                Explore Projects
              </a>
              <a
                href="#resources"
                className="w-full sm:w-auto px-8 py-4 glass-panel border border-outline-variant/30 text-on-surface rounded-2xl font-headline font-semibold text-lg hover:bg-surface-variant transition-colors"
              >
                Resources &amp; Links
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-20 w-full max-w-6xl rounded-2xl overflow-hidden border border-outline-variant/10 shadow-2xl">
            <img
              className="w-full h-[400px] object-cover opacity-60"
              src={HERO_IMAGE}
              alt="Futuristic 3D abstract visualization of glowing blue and purple data strands flowing through a dark digital void"
            />
          </div>
        </section>

        {/* ===== Event About ===== */}
        <section className="py-32 bg-surface-container-low relative" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="font-mono text-tertiary text-sm tracking-[0.3em] uppercase mb-4">
                // Event_Overview
              </h3>
              <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-6">
                What is BUILD_SD?
              </h2>
              <p className="text-on-surface-variant text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
                BUILD_SD is a 3-hour AI hackathon powered by TRAE IDE and Z.ai, hosted in San Diego.
                Teams of 1-4 builders will ship real products from scratch using the latest AI-assisted development tools.
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { icon: 'calendar_month', label: 'Date', value: 'June 28, 2025', sub: 'Saturday', color: 'primary' },
                { icon: 'schedule', label: 'Time', value: '1:00 PM - 4:00 PM', sub: 'Pacific Time (PT)', color: 'secondary' },
                { icon: 'location_on', label: 'Location', value: 'San Diego, CA', sub: 'Venue TBA', color: 'tertiary' },
                { icon: 'group', label: 'Team Size', value: '1 - 4 People', sub: 'Solo or Squad', color: 'amber-400' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative p-6 rounded-2xl glass-panel border border-outline-variant/20 text-center overflow-hidden"
                >
                  <div className={`absolute -right-8 -top-8 w-32 h-32 bg-${item.color}/10 blur-[50px]`} />
                  <div className="relative z-10">
                    <span className={`material-symbols-outlined text-${item.color} text-3xl mb-3 block`}>{item.icon}</span>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant mb-2">{item.label}</div>
                    <div className="text-xl font-headline font-bold text-on-surface mb-1">{item.value}</div>
                    <div className="text-sm text-on-surface-variant font-light">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* What to Expect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: 'auto_awesome',
                  title: 'AI-First Development',
                  desc: 'Use TRAE IDE with Z.ai to write code at 10x speed. From idea to working prototype in 3 hours.',
                  color: 'primary',
                },
                {
                  icon: 'waving_hand',
                  title: 'Zero Experience Friendly',
                  desc: 'Never written a line of code? No problem. AI does the heavy lifting — you bring the ideas. All backgrounds welcome.',
                  color: 'amber-400',
                },
                {
                  icon: 'emoji_events',
                  title: 'Prizes & Judging',
                  desc: 'Projects judged on creativity, technical execution, and real-world impact. Top teams win prizes and recognition.',
                  color: 'secondary',
                },
                {
                  icon: 'diversity_3',
                  title: 'Community & Networking',
                  desc: 'Connect with San Diego\'s best developers, designers, and AI enthusiasts. All skill levels welcome.',
                  color: 'tertiary',
                },
              ].map((item) => (
                <div key={item.title} className="p-8 rounded-2xl glass-panel border border-outline-variant/20">
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}/20 flex items-center justify-center mb-6`}>
                    <span className={`material-symbols-outlined text-${item.color}`}>{item.icon}</span>
                  </div>
                  <h4 className="text-xl font-headline font-bold mb-3 text-on-surface">{item.title}</h4>
                  <p className="text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-20">
              <h3 className="text-2xl font-headline font-bold text-center mb-12 tracking-tight">Event Timeline</h3>
              <div className="max-w-2xl mx-auto space-y-0">
                {[
                  { time: '1:00 PM', event: 'Doors Open & Check-in', desc: 'Grab your badge, meet your team, settle in.' },
                  { time: '1:15 PM', event: 'Opening Keynote', desc: 'Intro to TRAE IDE, Z.ai API, and the theme reveal.' },
                  { time: '1:30 PM', event: 'Hacking Begins', desc: '3 hours on the clock. Build something incredible.' },
                  { time: '3:30 PM', event: 'Submissions Due', desc: 'Push your code, record a demo, submit on Devpost.' },
                  { time: '3:45 PM', event: 'Demos & Judging', desc: 'Top teams present. Judges deliberate.' },
                  { time: '4:00 PM', event: 'Awards & Wrap-up', desc: 'Winners announced. Networking continues.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary-container border-2 border-primary shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                      {i < 5 && <div className="w-px flex-1 bg-outline-variant/30 min-h-[40px]" />}
                    </div>
                    {/* Content */}
                    <div className="pb-8">
                      <div className="font-mono text-xs text-primary tracking-widest uppercase mb-1">{item.time}</div>
                      <div className="text-on-surface font-semibold mb-1">{item.event}</div>
                      <div className="text-sm text-on-surface-variant font-light">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Project Gallery ===== */}
        <section className="py-32 px-6 max-w-7xl mx-auto" id="projects">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h3 className="font-mono text-tertiary text-sm tracking-[0.3em] uppercase mb-4">
                // Project_Gallery
              </h3>
              <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
                AI-Native Instruments
              </h2>
            </div>
            <p className="text-on-surface-variant max-w-sm text-right font-light">
              Proprietary modules built for the San Diego developer ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div
                key={p.path}
                className="group relative p-8 rounded-2xl glass-panel border border-outline-variant/20 transition-all duration-500 overflow-hidden opacity-60 cursor-not-allowed"
              >
                {/* Glow orb */}
                <div className={`absolute -right-12 -top-12 w-48 h-48 ${p.orbBg} blur-[60px] transition-colors`} />

                {/* "暂未开放" badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest/80 backdrop-blur-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-amber-400 text-sm">lock</span>
                  <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest">Opens on Event Day</span>
                </div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center mb-6`}>
                    <span className={`material-symbols-outlined ${p.textColor}`}>{p.icon}</span>
                  </div>

                  <h4 className="text-2xl font-headline font-bold mb-3 text-on-surface">
                    {p.title}
                  </h4>
                  <p className="text-on-surface-variant mb-6 font-light leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full bg-surface-container-highest text-[10px] font-mono uppercase tracking-widest ${p.textColor} border ${p.borderColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="flex items-center gap-2 text-on-surface-variant/50 font-mono text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Available June 28, 2025
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Tech Stack ===== */}
        <section className="py-32 bg-surface-container-low relative" id="stack">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
                  // System_Architecture
                </h3>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 tracking-tight">
                  Modern Client-Side Hegemony
                </h2>
                <p className="text-on-surface-variant text-lg mb-12 font-light max-w-lg leading-relaxed">
                  Our architecture prioritizes speed and privacy by executing all core logic within the browser's sandbox. Zero-latency UI powered by the next generation of web tech.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">bolt</span>
                    </div>
                    <div>
                      <h5 className="text-on-surface font-semibold mb-1">Instant Deployment</h5>
                      <p className="text-sm text-on-surface-variant">Built with Vite 8 for near-instant cold starts and HMR.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary text-xl">database</span>
                    </div>
                    <div>
                      <h5 className="text-on-surface font-semibold mb-1">Edge Persistence</h5>
                      <p className="text-sm text-on-surface-variant">IndexedDB and Zustand state synchronization for offline-first resilience.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Code Block */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10" />
                <div className="rounded-2xl bg-[#0e0e10] border border-outline-variant/30 overflow-hidden shadow-2xl">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high border-b border-outline-variant/30">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
                      stack_config.json
                    </div>
                    <div className="w-4 h-4" />
                  </div>
                  {/* Code Content */}
                  <div className="p-8 font-mono text-sm space-y-2 text-on-surface-variant">
                    <div><span className="text-secondary">const</span> <span className="text-primary">stack</span> = {'{'}</div>
                    <div className="pl-4"><span className="text-tertiary">framework</span>: <span className="text-amber-200">"React 19"</span>,</div>
                    <div className="pl-4"><span className="text-tertiary">language</span>: <span className="text-amber-200">"TypeScript 5.9"</span>,</div>
                    <div className="pl-4"><span className="text-tertiary">bundler</span>: <span className="text-amber-200">"Vite 8"</span>,</div>
                    <div className="pl-4"><span className="text-tertiary">styles</span>: <span className="text-amber-200">"Tailwind CSS v4"</span>,</div>
                    <div className="pl-4"><span className="text-tertiary">state</span>: <span className="text-amber-200">"Zustand"</span>,</div>
                    <div className="pl-4"><span className="text-tertiary">storage</span>: <span className="text-amber-200">"IndexedDB"</span>,</div>
                    <div className="pl-4"><span className="text-tertiary">brain</span>: <span className="text-amber-200">"Z.ai GLM-5"</span></div>
                    <div>{'};'}</div>
                    <div className="pt-6 text-emerald-400/60 font-bold">&gt;&gt; SYSTEM_CHECK: OPTIMAL</div>
                    <div className="text-emerald-400/40">&gt;&gt; STATUS: CLIENT_SIDE_ONLY_ACTIVE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Connectivity Hub ===== */}
        <section className="py-32 px-6 max-w-7xl mx-auto" id="resources">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">
              Connectivity Hub
            </h2>
            <p className="text-on-surface-variant font-light">
              Essential nodes for the build experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectivity.map((r) => (
              <a
                key={r.title}
                href="#"
                className={`group p-6 rounded-2xl glass-panel border border-outline-variant/10 ${r.hoverBorder} transition-all`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${r.iconBg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${r.iconColor}`}>{r.icon}</span>
                  </div>
                  <h5 className="font-headline font-bold text-lg">{r.title}</h5>
                </div>
                <p className="text-sm text-on-surface-variant font-light mb-4">{r.desc}</p>
                <div className={`${r.linkColor} text-[10px] font-mono tracking-widest uppercase group-hover:translate-x-1 transition-transform`}>
                  {r.label} &rarr;
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ===== Join & Register CTA ===== */}
      <section className="relative py-32 bg-surface-container-low overflow-hidden" id="join">
        {/* Background orbs */}
        <div className="orb bg-[#5865F2] w-[600px] h-[600px] -left-48 top-0" style={{ opacity: 0.12 }} />
        <div className="orb bg-[#FF5F3B] w-[500px] h-[500px] -right-32 bottom-0" style={{ opacity: 0.1 }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h3 className="font-mono text-tertiary text-sm tracking-[0.3em] uppercase mb-4">
              // Join_The_Movement
            </h3>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-6">
              Ready to Build?
            </h2>
            <p className="text-on-surface-variant text-lg font-light max-w-2xl mx-auto">
              Secure your spot and join the community. Two steps to launch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Discord Card */}
            <a
              href="https://discord.gg/YOUR_INVITE_CODE"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-10 rounded-2xl border border-[#5865F2]/30 hover:border-[#5865F2]/60 transition-all duration-500 overflow-hidden block"
              style={{ background: 'linear-gradient(135deg, rgba(88,101,242,0.15) 0%, rgba(88,101,242,0.05) 100%)' }}
            >
              {/* Glow */}
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#5865F2]/15 blur-[80px] group-hover:bg-[#5865F2]/25 transition-colors" />

              <div className="relative z-10">
                {/* Discord logo SVG */}
                <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/20 flex items-center justify-center mb-8">
                  <svg width="32" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3## 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#5865F2"/>
                  </svg>
                </div>

                <h3 className="text-3xl font-headline font-bold mb-3 text-on-surface">Join the Discord</h3>
                <p className="text-on-surface-variant font-light mb-8 leading-relaxed">
                  Find teammates, ask questions, get announcements, and stay connected with the BUILD_SD community before, during, and after the event.
                </p>

                <div className="flex items-center gap-3">
                  <span className="px-6 py-3 rounded-xl bg-[#5865F2] text-white font-headline font-bold text-sm hover:bg-[#4752C4] transition-colors inline-flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Join Server
                  </span>
                  <span className="text-on-surface-variant text-sm font-light">500+ builders already inside</span>
                </div>
              </div>
            </a>

            {/* Luma Registration Card */}
            <a
              href="https://lu.ma/YOUR_EVENT_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-10 rounded-2xl border border-[#FF5F3B]/30 hover:border-[#FF5F3B]/60 transition-all duration-500 overflow-hidden block"
              style={{ background: 'linear-gradient(135deg, rgba(255,95,59,0.15) 0%, rgba(255,95,59,0.05) 100%)' }}
            >
              {/* Glow */}
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FF5F3B]/15 blur-[80px] group-hover:bg-[#FF5F3B]/25 transition-colors" />

              <div className="relative z-10">
                {/* Luma icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#FF5F3B]/20 flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-[#FF5F3B] text-4xl">confirmation_number</span>
                </div>

                <h3 className="text-3xl font-headline font-bold mb-3 text-on-surface">Register on Luma</h3>
                <p className="text-on-surface-variant font-light mb-8 leading-relaxed">
                  Claim your free ticket now. Limited spots available. Registration includes venue access, food, swag, and API credits for the hackathon.
                </p>

                <div className="flex items-center gap-3">
                  <span className="px-6 py-3 rounded-xl bg-[#FF5F3B] text-white font-headline font-bold text-sm hover:bg-[#E5543A] transition-colors inline-flex items-center gap-2 animate-pulse-glow" style={{ animationDuration: '4s', '--tw-shadow-color': 'rgba(255,95,59,0.3)' } as React.CSSProperties}>
                    <span className="material-symbols-outlined text-lg">event_available</span>
                    RSVP Now — Free
                  </span>
                  <span className="text-on-surface-variant text-sm font-light">Spots filling fast</span>
                </div>
              </div>
            </a>
          </div>

          {/* Urgency banner */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel border border-outline-variant/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5F3B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5F3B]" />
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-on-surface-variant">
                Registration closes June 25 &bull; Limited to 100 participants
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-neutral-950 w-full border-t border-neutral-800/30 pt-16 pb-8">
        <div className="w-full max-w-7xl mx-auto px-8">
          {/* Join Us Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl mb-16 border border-outline-variant/20" style={{ background: 'linear-gradient(135deg, rgba(88,101,242,0.12) 0%, rgba(255,95,59,0.12) 100%)' }}>
            <div>
              <h4 className="text-2xl font-headline font-bold text-on-surface mb-2">Join Us &mdash; Build Something Amazing</h4>
              <p className="text-on-surface-variant font-light text-sm">Get your free ticket and join 500+ builders in the Discord community.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <a
                href="https://discord.gg/YOUR_INVITE_CODE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#5865F2] text-white font-headline font-bold text-sm hover:bg-[#4752C4] transition-colors inline-flex items-center gap-2"
              >
                <svg width="20" height="15" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                </svg>
                Discord
              </a>
              <a
                href="https://lu.ma/YOUR_EVENT_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#FF5F3B] text-white font-headline font-bold text-sm hover:bg-[#E5543A] transition-colors inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">confirmation_number</span>
                RSVP on Luma
              </a>
            </div>
          </div>

          {/* Footer links */}
          <div className="flex flex-col items-center gap-6">
            <div className="text-lg font-black text-neutral-100 font-headline tracking-tighter uppercase">
              BUILD_SD
            </div>
            <div className="flex gap-8 font-mono text-xs tracking-widest uppercase">
              <a className="text-neutral-500 hover:text-emerald-300 transition-colors hover:translate-x-1 duration-300" href="#about">Event Info</a>
              <a className="text-neutral-500 hover:text-emerald-300 transition-colors hover:translate-x-1 duration-300" href="#projects">Projects</a>
              <a className="text-neutral-500 hover:text-emerald-300 transition-colors hover:translate-x-1 duration-300" href="#resources">Resources</a>
              <a className="text-neutral-500 hover:text-emerald-300 transition-colors hover:translate-x-1 duration-300" href="#join">Join Us</a>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">mail</span>
              <a href="mailto:z4fu@usd.edu" className="font-mono text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                z4fu@usd.edu
              </a>
            </div>
            <p className="font-mono text-xs tracking-widest uppercase text-tertiary mt-3">
              &copy; 2024 TRAE x Z.ai &bull; San Diego. Vibe Coding Protocol Active.
            </p>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal />
    </div>
  )
}
