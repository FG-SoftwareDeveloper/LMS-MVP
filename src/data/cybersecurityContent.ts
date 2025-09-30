// Cybersecurity Foundations & Applied Defense course content
export const cybersecurityContent: { [key: string]: any } = {
  'why-cybersecurity-matters': {
    id: 'why-cybersecurity-matters',
    title: 'Why Cybersecurity Matters',
    type: 'text',
    duration: 20,
    content: [
      {
        id: 'modern-landscape',
        type: 'text',
        title: 'The Modern Threat Landscape',
        content: 'Explore headline breaches such as Equifax, Colonial Pipeline, and SolarWinds to understand the economic and societal impact of cyber attacks. Discuss how digital transformation, remote work, and AI-assisted adversaries expand the attack surface for both startups and enterprises.'
      },
      {
        id: 'innovation-vs-security',
        type: 'text',
        title: 'Innovation vs. Security in the U.S.',
        content: 'Analyze the tension between rapid innovation and robust security controls. Review case studies where security debt accumulated during high-growth phases and later resulted in breaches. Provide guidance on advocating for security budgets using risk-based ROI.'
      }
    ]
  },
  'cyber-terminology': {
    id: 'cyber-terminology',
    title: 'Threats, Vulnerabilities, Exploits & Risk',
    type: 'text',
    duration: 20,
    content: [
      {
        id: 'core-terms',
        type: 'text',
        title: 'Core Terminology',
        content: 'Define key vocabulary: **asset**, **threat**, **vulnerability**, **exploit**, **exposure**, **likelihood**, and **impact**. Provide mnemonic devices to distinguish threat (actor or event) versus vulnerability (weakness) and exploit (method used by a threat).' 
      },
      {
        id: 'risk-formula',
        type: 'code',
        title: 'Risk Calculation Cheat Sheet',
        language: 'python',
    content: `def calculate_risk(likelihood: float, impact: float) -> float:
  """Return a simple risk score (0-100)."""
  return max(0, min(100, likelihood * impact))

examples = [
  ('Patchable VPN flaw', 0.4, 80),
  ('Legacy server with admin defaults', 0.7, 60),
  ('Public marketing site', 0.2, 20),
]

for name, likelihood, impact in examples:
  score = calculate_risk(likelihood, impact)
  print(f"{name:<40} risk score: {score:>5.1f}")`
      }
    ]
  },
  'security-mindsets': {
    id: 'security-mindsets',
    title: 'Security Mindsets: Attacker vs. Defender',
    type: 'text',
    duration: 20,
    content: [
      {
        id: 'red-vs-blue',
        type: 'text',
        title: 'Red Team Curiosity vs. Blue Team Rigor',
        content: 'Contrast offensive curiosity (enumerate, weaponize, exploit, persist) with defensive discipline (prevent, detect, respond, recover). Present a shared vocabulary for collaboration: kill-chain stages, MITRE ATT&CK tactics, and defensive detection categories.'
      },
      {
        id: 'mindset-drills',
        type: 'text',
        title: 'Mindset Swap Drills',
        content: 'Practice switching roles by reviewing an incident from both perspectives. Prompt: “As Red, how would you escalate privileges?” followed by “As Blue, which telemetry or control stops that move?”'
      }
    ]
  },
  'lab-setup-basics': {
    id: 'lab-setup-basics',
    title: 'Lab Setup: Building a Safe Testing Environment',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'lab-architecture',
        type: 'text',
        title: 'Recommended Lab Architecture',
        content: 'Design an isolated network using VirtualBox, VMware, or Proxmox. Provision at least three VMs: (1) Attacker box (Kali Linux), (2) Target server (Ubuntu + DVWA/Juice Shop), (3) Monitoring node (Security Onion or ELK stack). Ensure host-only networking and snapshots before each exercise.'
      },
      {
        id: 'safety-checklist',
        type: 'text',
        title: 'Safety Checklist',
        content: '✔️ Use non-routable IP ranges (e.g., 10.0.0.x). ✔️ Disable shared clipboard and drag-and-drop between host and guest. ✔️ Document written permission (or use self-owned assets). ✔️ Read the Acceptable Use policy for all tools. ✔️ Maintain a “panic snapshot” to restore clean state quickly.'
      }
    ]
  },
  'module1-extra-credit': {
    id: 'module1-extra-credit',
    title: 'Security+ Companion: CIA Triad & NIST Overview',
    type: 'text',
    duration: 20,
    content: [
      {
        id: 'cia-triad',
        type: 'text',
        title: 'CIA Triad Quick Review',
        content: 'Confidentiality, Integrity, Availability: provide exam-style scenarios for each (e.g., encryption at rest for confidentiality, hashing for integrity, load balancing for availability). Include practice questions formatted like CompTIA Security+.'
      },
      {
        id: 'nist-csf',
        type: 'text',
        title: 'NIST Cybersecurity Framework Functions',
        content: 'Summarize Identify, Protect, Detect, Respond, Recover with course mapping: labs that surface in Identify (asset inventories), Protect (hardening), Detect (SIEM), Respond (IR playbooks), Recover (post-incident retrospectives).'
      }
    ]
  },
  'phishing-social-engineering': {
    id: 'phishing-social-engineering',
    title: 'Phishing & Social Engineering Labs',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'payload-design',
        type: 'text',
        title: 'Crafting Simulated Payloads',
        content: 'Use tools such as GoPhish or custom HTML emails to build safe, non-malicious payloads. Highlight pretexting, urgency cues, and brand spoofing. Provide templates for internal awareness campaigns.'
      },
      {
        id: 'analysis',
        type: 'text',
        title: 'Analyzing Responses & Metrics',
        content: 'Track click-through rates, credential submission attempts, and report rates. Discuss how to run awareness retro meetings without blame and convert findings into policy updates.'
      }
    ]
  },
  'password-attacks': {
    id: 'password-attacks',
    title: 'Password Attacks with Hydra & Hashcat',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'attack-techniques',
        type: 'text',
        title: 'Attack Techniques Overview',
        content: 'Compare brute force, dictionary, hybrid, and credential stuffing attacks. Map each to required tooling (Hydra, Hashcat, Medusa) and data sources (password dumps, rockyou.txt).' 
      },
      {
        id: 'defensive-controls',
        type: 'text',
        title: 'Defensive Countermeasures',
        content: 'Implement rate limiting, MFA, passwordless flows, and breached password checks. Provide code snippet for integrating Have I Been Pwned API into account registration flows.'
      }
    ]
  },
  'web-attack-simulations': {
    id: 'web-attack-simulations',
    title: 'Web Attack Simulations (SQLi, XSS, CSRF)',
    type: 'text',
    duration: 35,
    content: [
      {
        id: 'juice-shop',
        type: 'text',
        title: 'Running OWASP Juice Shop Safely',
        content: 'Deploy Juice Shop via Docker (`docker run --rm -p 3000:3000 bkimminich/juice-shop`). Walk through SQL injection and reflected XSS challenges while capturing HTTP requests with Burp Suite Community Edition.'
      },
      {
        id: 'mitigation',
        type: 'text',
        title: 'Mitigation Patterns',
        content: 'Introduce parameterized queries, output encoding, CSP headers, CSRF tokens, and SameSite cookies. Link each mitigation back to explicit Juice Shop challenges for reinforcement.'
      }
    ]
  },
  'network-attack-simulations': {
    id: 'network-attack-simulations',
    title: 'Network Attacks & Packet Analysis',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'wireshark-lab',
        type: 'text',
        title: 'Wireshark Traffic Scavenger Hunt',
        content: 'Capture packets on a lab switch while generating HTTP, HTTPS, and SSH traffic. Task students with identifying plaintext credentials versus encrypted sessions.'
      },
      {
        id: 'arp-spoofing',
        type: 'code',
        title: 'ARP Spoofing Walkthrough',
        language: 'bash',
        content: '# Enable IP forwarding\necho 1 | sudo tee /proc/sys/net/ipv4/ip_forward\n\n# Launch arpspoof (part of dsniff)\nsudo arpspoof -t 10.0.0.20 10.0.0.1\n\n# Observe victim traffic in Wireshark (filter: arp or ip.addr == 10.0.0.20)\n\n# Clean up\nkillall arpspoof\necho 0 | sudo tee /proc/sys/net/ipv4/ip_forward'
      }
    ]
  },
  'project1-simulated-attacks': {
    id: 'project1-simulated-attacks',
    title: 'Project 1: Document Simulated Attacks',
    type: 'text',
    duration: 45,
    content: [
      {
        id: 'project-brief',
        type: 'text',
        title: 'Project Brief',
        content: 'Execute at least two attack vectors (e.g., phishing payload + SQL injection) inside the lab. Record tooling used, target configuration, attack steps, and screenshots or packet captures. Emphasize ethical guidelines and lab containment.'
      },
      {
        id: 'deliverables',
        type: 'text',
        title: 'Deliverables',
        content: 'Submit a report with executive summary, detailed attack steps, indicators of compromise (IOCs), and preliminary defensive recommendations. Provide a short video (≤5 minutes) walking through one attack demo.'
      }
    ]
  },
  'module2-extra-credit': {
    id: 'module2-extra-credit',
    title: 'Security+ Companion: Attack Types & Threat Actors',
    type: 'text',
    duration: 20,
    content: [
      {
        id: 'attack-type-mapping',
        type: 'text',
        title: 'Mapping Labs to Exam Domains',
        content: 'Associate phishing with Social Engineering (1.1), password attacks with Brute Force (1.2), and ARP poisoning with On-path attacks (1.6). Provide flashcards and quiz prompts mirrored from the Security+ objectives.'
      },
      {
        id: 'threat-profiles',
        type: 'text',
        title: 'Threat Actor Profiles',
        content: 'Summarize characteristics of nation-states, hacktivists, cybercriminals, and insiders. Include motivation, resources, and common TTPs for each.'
      }
    ]
  },
  'network-segmentation': {
    id: 'network-segmentation',
    title: 'Network Segmentation & Firewalls',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'segmentation-strategies',
        type: 'text',
        title: 'Segmentation Strategies',
        content: 'Compare physical segmentation, VLANs, microsegmentation, and SDP/ZTNA approaches. Provide architectural diagrams for a three-tier web app with DMZ, application, and database segments.'
      },
      {
        id: 'firewall-policies',
        type: 'text',
        title: 'Firewall Policy Design',
        content: 'Walk through the creation of default-deny rules, explicit allowlists, and egress controls. Include sample `iptables` and cloud security group policies with annotations.'
      }
    ]
  },
  'system-hardening': {
    id: 'system-hardening',
    title: 'Hardening Operating Systems & Applications',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'baseline-guides',
        type: 'text',
        title: 'Baseline Guides',
        content: 'Introduce CIS Benchmarks, DISA STIGs, and automated configuration tools (Ansible, Chef, PowerShell DSC). Provide checklists for disabling unnecessary services and enforcing secure defaults.'
      },
      {
        id: 'patch-management',
        type: 'text',
        title: 'Patch & Vulnerability Management',
        content: 'Discuss patch prioritization using CVSS, vendor advisories, and exploit availability. Highlight vulnerability scanning cadence and virtual patching when downtime is limited.'
      }
    ]
  },
  'auth-access-controls': {
    id: 'auth-access-controls',
    title: 'Authentication & Access Controls',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'mfa-patterns',
        type: 'text',
        title: 'Modern MFA Patterns',
        content: 'Compare OTP, push-based, FIDO2/WebAuthn, and hardware token approaches. Provide pros, cons, and threat coverage for each.'
      },
      {
        id: 'least-privilege',
        type: 'text',
        title: 'Implementing Least Privilege',
        content: 'Explain role-based access control (RBAC), attribute-based access control (ABAC), and privileged access management (PAM). Include sample IAM policies for AWS and Azure.'
      }
    ]
  },
  'encryption-basics': {
    id: 'encryption-basics',
    title: 'Encryption Fundamentals',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'crypto-overview',
        type: 'text',
        title: 'Symmetric vs. Asymmetric Cryptography',
        content: 'Outline AES, ChaCha20, RSA, ECC, and hybrid protocols like TLS. Discuss key management challenges and hardware security modules (HSMs).' 
      },
      {
        id: 'hands-on',
        type: 'code',
        title: 'Hands-on Encryption Demo',
        language: 'bash',
        content: '# Generate a private key\nopenssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048\n\n# Derive public key\nopenssl rsa -pubout -in private.pem -out public.pem\n\n# Encrypt and decrypt a message\nopenssl pkeyutl -encrypt -pubin -inkey public.pem -in secret.txt -out secret.enc\nopenssl pkeyutl -decrypt -inkey private.pem -in secret.enc -out secret.dec\n\n# Verify integrity with SHA-256\nsha256sum secret.txt secret.dec'
      }
    ]
  },
  'project2-defensive-build': {
    id: 'project2-defensive-build',
    title: 'Project 2: Secure a Sample Web App',
    type: 'text',
    duration: 50,
    content: [
      {
        id: 'project-brief',
        type: 'text',
        title: 'Project Brief',
        content: 'Fork the provided vulnerable web app template (or reuse Juice Shop). Implement the following: bcrypt password hashing, server-side input validation, secure session cookies, TLS termination, and security headers. Document before/after vulnerability scans.'
      },
      {
        id: 'acceptance-criteria',
        type: 'text',
        title: 'Acceptance Criteria',
        content: 'All high/critical findings from Project 1 must be mitigated. Provide a configuration appendix (firewall rules, SSL certificate steps) and automated tests that validate input sanitization.'
      }
    ]
  },
  'log-analysis': {
    id: 'log-analysis',
    title: 'Log Analysis with Splunk/ELK',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'ingestion',
        type: 'text',
        title: 'Collecting & Parsing Logs',
        content: 'Configure Filebeat/Winlogbeat or Splunk forwarders to send logs from lab systems. Normalize fields using Elastic Common Schema (ECS) or Splunk CIM. Demonstrate index creation and data retention policies.'
      },
      {
        id: 'querying',
        type: 'code',
        title: 'Sample Queries',
        language: 'sql',
        content: '-- Elastic Query DSL (via Kibana)\nGET /logs-*/_search\n{\n  "query": {\n    "bool": {\n      "must": [\n        { "match_phrase": { "event.action": "authentication_failure" } },\n        { "range": { "@timestamp": { "gte": "now-15m" } } }\n      ]\n    }\n  },\n  "aggs": {\n    "by_user": { "terms": { "field": "user.name.keyword", "size": 10 } }\n  }\n}\n\n-- Splunk SPL\nindex=lab host=web01 action=failure | stats count by user, src_ip | where count > 5'
      }
    ]
  },
  'siem-basics': {
    id: 'siem-basics',
    title: 'SIEM Use Cases & Detection Engineering',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'use-cases',
        type: 'text',
        title: 'Foundational SIEM Use Cases',
        content: 'Login anomalies, privilege escalation, lateral movement, malware execution, and data exfiltration detection. Map each to MITRE ATT&CK tactics.'
      },
      {
        id: 'rule-tuning',
        type: 'text',
        title: 'Rule Tuning & Maintenance',
        content: 'Discuss suppression lists, noise reduction, and feedback loops with incident responders. Provide a sample detection engineering workflow board (ticketing template).' 
      }
    ]
  },
  'incident-response-workflow': {
    id: 'incident-response-workflow',
    title: 'Incident Response Lifecycle',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'ir-phases',
        type: 'text',
        title: 'Six Phases Explained',
        content: 'Detail the steps: Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Lessons Learned. Provide RACI matrix templates for cross-functional coordination.'
      },
      {
        id: 'communication',
        type: 'text',
        title: 'Communication Plans',
        content: 'Outline stakeholder communication paths (executives, legal, PR) and regulatory reporting timelines (GDPR, HIPAA, state breach laws).'
      }
    ]
  },
  'simulated-breach': {
    id: 'simulated-breach',
    title: 'Simulated Breach Scenario',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'scenario-setup',
        type: 'text',
        title: 'Scenario Setup',
        content: 'Students receive a timeline of alerts, PCAP snippets, and compromised host artifacts. They must triage severity, identify patient zero, and determine propagation path.'
      },
      {
        id: 'tabletop',
        type: 'text',
        title: 'Tabletop Exercise Guidance',
        content: 'Facilitate a tabletop discussion where each learner plays a role (SOC analyst, IR lead, communicator). Document decisions and evaluate containment strategies.'
      }
    ]
  },
  'project3-detect-respond': {
    id: 'project3-detect-respond',
    title: 'Project 3: Detect & Respond in the Lab',
    type: 'text',
    duration: 45,
    content: [
      {
        id: 'project-brief',
        type: 'text',
        title: 'Project Brief',
        content: 'Run Infection Monkey or CALDERA in the lab. Capture log evidence from SIEM/ELK and endpoint telemetry. Produce an incident report summarizing timeline, scope, root cause, and remediation steps.'
      },
      {
        id: 'evidence-package',
        type: 'text',
        title: 'Evidence Package',
        content: 'Provide annotated screenshots of detections, extracted indicators, and a containment checklist. Include automation ideas (detector tuning, SOAR playbooks) in a “future work” section.'
      }
    ]
  },
  'module4-extra-credit': {
    id: 'module4-extra-credit',
    title: 'Security+ Companion: IR Roles & Playbooks',
    type: 'text',
    duration: 20,
    content: [
      {
        id: 'ir-roles',
        type: 'text',
        title: 'Incident Response Roles',
        content: 'Security analyst, incident commander, legal counsel, communications lead, forensic specialist. Provide Security+ exam comparison table and responsibilities.'
      },
      {
        id: 'playbook-elements',
        type: 'text',
        title: 'Playbook Building Blocks',
        content: 'Triggers, prerequisites, detailed procedures, validation steps, and post-incident tasks. Provide a downloadable template for learners to adapt.'
      }
    ]
  },
  'zero-trust-model': {
    id: 'zero-trust-model',
    title: 'Zero Trust Architecture',
    type: 'text',
    duration: 25,
    content: [
      {
        id: 'principles',
        type: 'text',
        title: 'Core Principles',
        content: 'Never trust, always verify; assume breach; enforce least privilege; verify explicitly. Map principles to NIST SP 800-207 guidance and real-world implementations (Google BeyondCorp).' 
      },
      {
        id: 'adoption',
        type: 'text',
        title: 'Adoption Roadmap',
        content: 'Assess current state, define protect surfaces, build policy engine, deploy enforcement points, and continuously monitor. Include quick wins for SMBs and enterprises.'
      }
    ]
  },
  'secure-coding-practices': {
    id: 'secure-coding-practices',
    title: 'Secure Coding & Secret Management',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'secure-patterns',
        type: 'text',
        title: 'Secure Coding Patterns',
        content: 'Input validation, output encoding, parameterized queries, and security testing in CI pipelines. Reference OWASP ASVS and Top 10.'
      },
      {
        id: 'secret-management',
        type: 'text',
        title: 'Secret Management',
        content: 'Use environment variables, vaults (HashiCorp Vault, AWS Secrets Manager), secret rotation, and audit logging. Provide sample GitHub Actions secret scanning configuration.'
      }
    ]
  },
  'threat-modeling-frameworks': {
    id: 'threat-modeling-frameworks',
    title: 'Threat Modeling (STRIDE, DREAD, MITRE ATT&CK)',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'framework-overview',
        type: 'text',
        title: 'Framework Overview',
        content: 'STRIDE (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege), DREAD scoring, and mapping to MITRE ATT&CK technique catalog.'
      },
      {
        id: 'workshop',
        type: 'text',
        title: 'Workshop Facilitation',
        content: 'Provide a step-by-step playbook for running a 60-minute threat modeling session with cross-functional teams, including whiteboard templates and prioritization matrix.'
      }
    ]
  },
  'cloud-container-security': {
    id: 'cloud-container-security',
    title: 'Cloud & Container Security Basics',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'shared-responsibility',
        type: 'text',
        title: 'Shared Responsibility Model',
        content: 'Clarify cloud provider vs. customer responsibilities across IaaS, PaaS, SaaS. Highlight misconfiguration risks (public S3 buckets, overly permissive IAM roles).' 
      },
      {
        id: 'container-hardening',
        type: 'text',
        title: 'Container Hardening Checklist',
        content: 'Use minimal base images, apply image scanning (Trivy, Grype), enforce runtime policies (Falco, AppArmor), and manage secrets via Kubernetes secrets or sealed secrets.'
      }
    ]
  },
  'project4-advanced-security': {
    id: 'project4-advanced-security',
    title: 'Project 4: Advanced Defenses',
    type: 'text',
    duration: 55,
    content: [
      {
        id: 'project-brief',
        type: 'text',
        title: 'Project Brief',
        content: 'Extend your secured web app with JWT authentication (short-lived access tokens + refresh tokens), global rate limiting, and dependency scanning (npm audit, Snyk CLI). Document pipeline updates and monitoring hooks.'
      },
      {
        id: 'evaluation',
        type: 'text',
        title: 'Evaluation Checklist',
        content: 'Demonstrate blocked brute force attempts, token invalidation, and automated dependency reports. Provide diagrams showing Zero Trust-inspired request flows.'
      }
    ]
  },
  'capstone-build-system': {
    id: 'capstone-build-system',
    title: 'Capstone Build & Scope',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'planning',
        type: 'text',
        title: 'Planning the Capstone',
        content: 'Define scope, success criteria, and lab resources. Choose an application pattern (REST API, IoT simulation, cloud microservice). Establish baseline architecture diagrams and data flows.'
      },
      {
        id: 'deliverables',
        type: 'text',
        title: 'Deliverables',
        content: 'Submit architecture diagrams, asset inventory, and an initial threat model before launching attacks.'
      }
    ]
  },
  'capstone-red-team': {
    id: 'capstone-red-team',
    title: 'Red Team Simulation',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'attack-plan',
        type: 'text',
        title: 'Attack Plan',
        content: 'Select at least three ATT&CK techniques relevant to your system (e.g., Initial Access via phishing, Execution via command and control). Document rules of engagement and rollback strategy.'
      },
      {
        id: 'evidence',
        type: 'text',
        title: 'Evidence Collection',
        content: 'Capture logs, screenshots, and payload artifacts. Tag each with MITRE technique IDs and severity for Blue Team handoff.'
      }
    ]
  },
  'capstone-blue-team': {
    id: 'capstone-blue-team',
    title: 'Blue Team Hardening',
    type: 'text',
    duration: 35,
    content: [
      {
        id: 'defense-plan',
        type: 'text',
        title: 'Defense Plan',
        content: 'Translate red findings into remediation tasks: patching, segmentation, detection rules, and policy updates. Implement automated tests to validate fixes.'
      },
      {
        id: 'validation',
        type: 'text',
        title: 'Validation Runs',
        content: 'Re-run select attacks to demonstrate improved resilience. Summarize delta in attack success probability and detection latency.'
      }
    ]
  },
  'capstone-presentation': {
    id: 'capstone-presentation',
    title: 'Presenting Red vs. Blue Findings',
    type: 'text',
    duration: 45,
    content: [
      {
        id: 'presentation-structure',
        type: 'text',
        title: 'Presentation Structure',
        content: 'Recommended format: Executive summary, attack timeline, defense timeline, metrics (MTTD/MTTR), lessons learned, next steps. Provide slide template and demo tips.'
      },
      {
        id: 'stakeholder-communication',
        type: 'text',
        title: 'Stakeholder Communication',
        content: 'Tailor language for technical peers vs. executives. Incorporate risk rankings and business impact to secure buy-in for future improvements.'
      }
    ]
  },
  'security-plus-track': {
    id: 'security-plus-track',
    title: 'Security+ Companion Track',
    type: 'text',
    duration: 30,
    content: [
      {
        id: 'domain-mapping',
        type: 'text',
        title: 'Domain Mapping',
        content: 'Map each course module to Security+ domains: Threats, Attacks, and Vulnerabilities; Technologies and Tools; Architecture and Design; Identity and Access Management; Risk Management; Cryptography and PKI.'
      },
      {
        id: 'study-plan',
        type: 'text',
        title: 'Self-Study Plan',
        content: 'Offer a 6-week companion plan with practice question sets, flashcards, and recommended lab tie-ins. Include tips for scheduling the exam and leveraging Pearson VUE testing centers.'
      }
    ]
  }
};

// Function to get Cybersecurity course content
export const getCybersecurityContent = () => cybersecurityContent;