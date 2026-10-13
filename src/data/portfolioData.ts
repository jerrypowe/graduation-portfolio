import { GraduateProfile, Project, SkillCategory } from '../types';

export const defaultProfile: GraduateProfile = {
  name: 'Thanh Tú',
  handwrittenName: 'Thanh Tú',
  role: 'Software Engineer',
  university: 'Đại Học FPT Cần Thơ',
  universityShort: 'FPT University, Can Tho',
  address: 'Số 600, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP Cần Thơ',
  degree: 'Bachelor of Software Engineering',
  gradYear: '2026',
  date: '24 Tháng 10, 2026',
  time: '10:00 AM',
  phone: '0939 303 600',
  email: 'thanhtu.swe@gmail.com',
  github: 'https://github.com/thanhtu-dev',
  linkedin: 'https://linkedin.com/in/thanhtu-swe',
  facebook: 'https://facebook.com/thanhtu',
  bioShort: 'A passionate Software Engineering graduate blending robust backend engineering with creative, human-centric frontend experiences.',
  bioLong: [
    'Studied Software Engineering at FPT University Can Tho, focusing on modern web distributed systems, clean software architecture, and interactive web graphics.',
    'Constantly experimenting with developer tooling, building intuitive user interfaces, and automating workflows with TypeScript and modern cloud stacks.',
    'Passionate about crafting code that feels as handcrafted and thoughtful as this graduation scrapbook.'
  ],
  goals: [
    'Join an agile engineering team building high-impact web and mobile applications',
    'Deepen expertise in cloud-native microservices and developer platform tooling',
    'Contribute actively to open-source software and local developer communities'
  ],
  interests: [
    'Frontend Engineering (React, TypeScript, CSS Art)',
    'Distributed Systems & Cloud Backend (Go, Node.js, PostgreSQL)',
    'UI/UX Prototyping & Creative Web Interactions',
    'Continuous Integration & Developer Experience'
  ]
};

export const sampleProjects: Project[] = [
  {
    id: 'campus-pulse',
    title: 'CampusPulse',
    tagline: 'Real-time university event & attendance tracking platform',
    description: 'An automated check-in and attendee engagement suite for campus hackathons and graduation events with instant QR verification and live attendee dashboards.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'WebSockets'],
    githubUrl: 'https://github.com/thanhtu-dev/campus-pulse',
    demoUrl: 'https://campuspulse-demo.dev',
    featured: true,
    paperColor: 'white',
    tapeColor: 'yellow',
    rotation: '-rotate-1'
  },
  {
    id: 'edugraph',
    title: 'EduGraph',
    tagline: 'Interactive university curriculum & prerequisite visualizer',
    description: 'Visual graph explorer helping engineering undergraduates map prerequisite courses, calculate GPA scenarios, and plan semester credit pathways dynamically.',
    technologies: ['React', 'D3.js', 'FastAPI', 'Python', 'Tailwind CSS'],
    githubUrl: 'https://github.com/thanhtu-dev/edugraph',
    demoUrl: 'https://edugraph-demo.dev',
    featured: true,
    paperColor: 'yellow',
    tapeColor: 'blue',
    rotation: 'rotate-1'
  },
  {
    id: 'algorunner',
    title: 'AlgoRunner Sandbox',
    tagline: 'Isolated browser-based code execution sandbox',
    description: 'Lightweight web IDE and benchmarking tool for students practicing data structures and algorithms, featuring real-time test case visualization.',
    technologies: ['TypeScript', 'React', 'Docker', 'Web Workers', 'Monaco Editor'],
    githubUrl: 'https://github.com/thanhtu-dev/algorunner',
    demoUrl: 'https://algorunner-sandbox.dev',
    featured: true,
    paperColor: 'white',
    tapeColor: 'red',
    rotation: '-rotate-2'
  },
  {
    id: 'mekong-eco',
    title: 'MekongEco Sense',
    tagline: 'IoT environmental monitoring dashboard for aquaculture',
    description: 'Telemetry dashboard visualizing water salinity, pH, and temperature metrics from ESP32 sensors across the Mekong Delta river network.',
    technologies: ['React', 'Chart.js', 'MQTT', 'Go', 'TimescaleDB'],
    githubUrl: 'https://github.com/thanhtu-dev/mekong-eco',
    demoUrl: 'https://mekong-eco-demo.dev',
    featured: false,
    paperColor: 'pink',
    tapeColor: 'dark',
    rotation: 'rotate-2'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    badge: 'Core Tools',
    skills: [
      { name: 'TypeScript', tag: 'Primary', note: 'Daily driver for web & full-stack apps' },
      { name: 'JavaScript (ESNext)', tag: 'Core', note: 'Deep DOM & async event loop' },
      { name: 'Java', tag: 'Academic', note: 'OOP, Spring Boot fundamentals' },
      { name: 'Go (Golang)', tag: 'Backend', note: 'Concurrent services & REST APIs' },
      { name: 'Python', tag: 'Scripting', note: 'Automation, data exploration' },
      { name: 'C# / .NET', tag: 'Academic', note: 'Enterprise coursework' }
    ]
  },
  {
    title: 'Frontend Development',
    badge: 'UI & Interactivity',
    skills: [
      { name: 'React 18+', tag: 'Favorite', note: 'Hooks, Context, component architecture' },
      { name: 'Tailwind CSS', tag: 'Styling', note: 'Responsive design & design systems' },
      { name: 'Next.js', tag: 'SSR', note: 'App router & server actions' },
      { name: 'HTML5 & Semantic Web', tag: 'Accessibility', note: 'WCAG standards' },
      { name: 'CSS Animation & SVG', tag: 'Creative', note: 'Micro-interactions & vector art' },
      { name: 'Vite & Webpack', tag: 'Bundlers', note: 'Fast dev environments' }
    ]
  },
  {
    title: 'Backend & APIs',
    badge: 'Services',
    skills: [
      { name: 'Node.js & Express', tag: 'Runtime', note: 'REST APIs & middleware' },
      { name: 'Go Gin / Fiber', tag: 'High-Perf', note: 'Fast microservices' },
      { name: 'RESTful API Design', tag: 'Architecture', note: 'Clean endpoint specifications' },
      { name: 'WebSockets', tag: 'Realtime', note: 'Bi-directional live event streaming' },
      { name: 'JWT & OAuth2', tag: 'Auth', note: 'Secure role-based authentication' }
    ]
  },
  {
    title: 'Databases & Storage',
    badge: 'Persistence',
    skills: [
      { name: 'PostgreSQL', tag: 'Relational', note: 'Complex queries, indexes, migrations' },
      { name: 'MySQL', tag: 'Relational', note: 'Schema design & normalization' },
      { name: 'MongoDB', tag: 'Document', note: 'Flexible document modeling' },
      { name: 'Redis', tag: 'Caching', note: 'In-memory pub/sub & session store' },
      { name: 'Prisma / TypeORM', tag: 'ORM', note: 'Type-safe data modeling' }
    ]
  },
  {
    title: 'DevOps & Developer Tools',
    badge: 'Workflow',
    skills: [
      { name: 'Git & GitHub', tag: 'VCS', note: 'Branching, PRs, and code review' },
      { name: 'Docker & Compose', tag: 'Containers', note: 'Consistent local & cloud environments' },
      { name: 'GitHub Actions', tag: 'CI/CD', note: 'Automated test & build pipelines' },
      { name: 'Linux / Bash', tag: 'OS', note: 'Server management & shell scripting' },
      { name: 'Postman & Swagger', tag: 'API Docs', note: 'Testing & contract documentation' },
      { name: 'Figma', tag: 'Design', note: 'Wireframing, UI prototyping' }
    ]
  }
];
