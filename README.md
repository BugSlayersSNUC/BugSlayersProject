# PulseLink — Squad-Based Altruism

> *"Don't just donate life—keep the heart of your squad beating."*
> *"Because your pulse is the rhythm someone else is waiting to live by."*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vercel-black?style=flat&logo=vercel)](https://bug-slayers-project-five.vercel.app/)
![Track](https://img.shields.io/badge/Track-Social%20Tech-blue?style=flat)
![Hackathon](https://img.shields.io/badge/SNUC%20Hacks-'26-red?style=flat)

A group-anchored life-support system that transforms the 90-day blood donation gap into a daily habit of collective readiness and micro-volunteering.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React (web), Flutter (mobile) |
| Backend | Supabase API / FastAPI |
| Database | PostgreSQL (Supabase) |
| Real-time | Supabase Realtime |
| Cloud | Google Cloud Run, Vercel |
| Auth | Supabase Authentication |
| Verification | GPS Geofencing + QR Scanning |

---

## Architecture

```
User → Daily Check-in (hydration/iron)
     → Squad Vitality Score updated (Supabase Realtime)
     → Action: Clinic Donation / Micro-task
          → Verified via GPS Geofence + Hospital QR Scan (Proof-of-Impact)
     → Rewards: Pulse Points, Badges
     → Missed task → Vitality Meter leaks → Flatline UI → Peer Nudge
```

---

## Core Features

- **Vitality Meter** — Shared real-time group score; flatlines (UI greyscale) on inactivity
- **Readiness Logs** — Daily iron/hydration tracking to reduce clinic rejection rates
- **Micro-Volunteer Hub** — 5-min tasks bridging the 90-day inter-donation gap
- **Proof-of-Impact (PoI)** — Mandatory GPS geofence + QR scan at clinics; eliminates fake logging
- **Relay Logic** — Automated scheduling to keep ≥1 squad member in a ready-to-donate window
- **Peer Nudges** — Social resuscitation alerts triggered on score drop
