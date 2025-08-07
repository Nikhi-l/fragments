'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'
import NextLink from 'next/link'
import Image from 'next/image'
import {
  Zap,
  Play,
  Command,
  Sparkles,
  Camera,
  BarChart3,
  CheckCircle,
  ShieldCheck,
  Cpu,
  Plug,
  Store,
  ShoppingCart,
  Users,
  Clock
} from 'lucide-react'

export function MarketingLanding() {
  // Command palette demo items
  const commandItems = useMemo(
    () => [
      { icon: Camera, label: 'Show live view of Aisle 3 (Cam-07)' },
      { icon: BarChart3, label: 'Compare conversion: Today vs Last Friday' },
      { icon: Users, label: 'Analyze queue length at checkout (real-time)' },
      { icon: ShoppingCart, label: 'Correlate dwell time near promo with POS sales' },
      { icon: Clock, label: 'Alert when wait time > 4m; auto-ping floor manager' },
      { icon: ShieldCheck, label: 'Detect misplaced high-value items and notify' },
      { icon: Sparkles, label: 'Suggest optimal end-cap placement this weekend' }
    ],
    []
  )

  const [activeCmdIndex, setActiveCmdIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveCmdIndex((i) => (i + 1) % commandItems.length)
    }, 2600)
    return () => clearInterval(id)
  }, [commandItems.length])

  // Feature highlights
  const features = [
    {
      icon: Command,
      title: 'Command-Native Interface',
      description:
        'Run your store like you run code. Open the command palette, ask for anything, act instantly.'
    },
    {
      icon: Camera,
      title: 'Understands Video & Context',
      description:
        'RetailX ingests your cameras and store data to understand traffic, dwell, queues, and intent in real time.'
    },
    {
      icon: Cpu,
      title: 'Decision Intelligence',
      description:
        'Not just charts. RetailX turns signals into clear recommendations and automations that move KPIs.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacy-First by Design',
      description:
        'On-device redaction, no PII storage, strict retention. Security that your legal team will love.'
    }
  ]

  // Use cases
  const useCases = [
    {
      icon: ShoppingCart,
      title: 'Merchandising',
      copy:
        'Test end-caps, optimize planograms, and link dwell time to real sales lift.'
    },
    {
      icon: Users,
      title: 'Staffing',
      copy: 'Forecast foot traffic, balance lanes, and cut queue times without guesswork.'
    },
    {
      icon: ShieldCheck,
      title: 'Loss Prevention',
      copy:
        'Spot suspicious patterns, track misplaced items, and notify associates in the moment.'
    },
    {
      icon: Store,
      title: 'Ops & Experience',
      copy:
        'Measure walk-bys → views → engagements → purchases. Improve conversion where it counts.'
    }
  ]

  // Simple stat cards
  const stats = [
    { label: 'Faster decisions', value: 'x10' },
    { label: 'Queue time reduction', value: '-38%' },
    { label: 'Setup time', value: '48 hrs' }
  ]

  // Scrolling tiles used around the video mock
  const scrollingTiles = [
    'Command Palette',
    'Real-time Cameras',
    'POS Correlation',
    'Heatmaps',
    'Queue Analytics',
    'Planogram Testing',
    'Loss Prevention',
    'Staff Optimization',
    'Revenue Uplift',
    'Operational KPIs'
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Floating Bolt Badge */}
      <div className="fixed z-50 bottom-6 right-6 animate-float pointer-events-none select-none">
        <Image
          src="/bolt_badge.svg"
          alt="Bolt Badge"
          width={80}
          height={80}
          className="drop-shadow-xl"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 left-0 right-0 w-full px-6 py-5 z-30 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-b border-orange-200/40 dark:border-orange-800/30">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-orange-500 p-2">
              <Logo className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Retail<span className="text-orange-500">X</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#use-cases" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Use Cases
            </a>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="https://calendly.com/gnikhil335/30min" target="_blank" rel="noopener noreferrer">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold">
                Book Demo
              </Button>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-gray-50 via-orange-50 to-orange-100 dark:from-gray-900 dark:via-orange-950 dark:to-gray-900 overflow-hidden">
        {/* Animated backdrop bubbles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-500/20 dark:bg-orange-400/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
                <Command className="h-4 w-4" /> The Cursor for Retail Stores
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Run Your Store
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  From a Command Palette
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                RetailX turns your cameras and store data into an intelligent, command-native workspace.
                Ask for anything—see, analyze, and act—in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <NextLink href="/chat">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2">
                    <Play className="h-5 w-5" /> Try Interactive Demo
                  </button>
                </NextLink>
                <a href="https://calendly.com/gnikhil335/30min" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg">
                    Book a Demo
                  </button>
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <span>No new hardware</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span>Privacy-first</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Command className="h-5 w-5 text-gray-400" />
                  <span>Press ⌘K in demo</span>
                </div>
              </div>
            </div>

            {/* Command Palette / Video Mock */}
            <div className="relative animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-5 border border-orange-100 dark:border-orange-900/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                {/* Fake window chrome */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>

                {/* Video pane */}
                <div className="relative overflow-hidden rounded-2xl border border-orange-100/60 dark:border-orange-900/40">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      className="w-full h-full rounded-2xl"
                      src="https://www.youtube.com/embed/ptjzZ4e0FnA?autoplay=0&mute=1&controls=1&rel=0&modestbranding=1"
                      title="RetailX Demo Video"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />

                    {/* Animated tags around video */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {/* Top tiles */}
                      <div className="absolute top-4 left-0 right-0 flex animate-scroll-right">
                        {[...scrollingTiles, ...scrollingTiles].map((tile, index) => (
                          <div key={`top-${index}`} className="flex-shrink-0 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium mx-1 shadow-lg backdrop-blur-sm">
                            {tile}
                          </div>
                        ))}
                      </div>
                      {/* Bottom tiles */}
                      <div className="absolute bottom-4 left-0 right-0 flex animate-scroll-left">
                        {[...scrollingTiles.slice().reverse(), ...scrollingTiles.slice().reverse()].map((tile, index) => (
                          <div key={`bottom-${index}`} className="flex-shrink-0 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium mx-1 shadow-lg backdrop-blur-sm">
                            {tile}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Command palette bar */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-orange-200/50 dark:border-orange-800/50 rounded-2xl px-4 py-3 shadow-lg">
                    <Command className="h-5 w-5 text-orange-500" />
                    <div className="relative flex-1">
                      {commandItems.map((item, idx) => (
                        <div
                          key={item.label}
                          className={`absolute inset-0 flex items-center gap-2 transition-opacity duration-500 ${idx === activeCmdIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-200 text-sm">{item.label}</span>
                        </div>
                      ))}
                      {/* Spacer to keep height */}
                      <div className="opacity-0 h-5">&nbsp;</div>
                    </div>
                    <kbd className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">⌘K</kbd>
                  </div>
                </div>

                {/* Label */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  See • Analyze • Act
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 animate-bounce-gentle">{s.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-orange-200/50 dark:border-orange-800/50 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-3 font-medium">Connect cameras. Open the palette. Improve KPIs.</p>
            <NextLink href="/chat">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-base rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                Try the Command Palette
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              From Cameras to Actions—In Minutes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              RetailX plugs into what you already have. Turn your floor into a living dataset and act with one command.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {[{
              icon: Plug,
              title: 'Connect',
              description: 'Link IP cameras and POS in minutes. Works with 99% of modern systems.'
            }, {
              icon: Sparkles,
              title: 'Analyze',
              description: 'Anonymous computer vision turns traffic and behavior into KPIs—no PII.'
            }, {
              icon: Zap,
              title: 'Act',
              description: 'Trigger alerts and automations, or just ask RetailX to do it for you.'
            }].map((step, index) => (
              <div key={step.title} className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 animate-bounce-gentle bg-gradient-to-r from-orange-400 to-orange-600">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <NextLink href="/chat">
              <button className="bg-white dark:bg-gray-900 border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                See a Sample Dashboard
              </button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Makes RetailX Different
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              It feels like your store finally has a keyboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {features.map((f, index) => (
              <div key={f.title} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-orange-100 dark:border-orange-900/30 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                  <f.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Retail Operators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ask questions in plain language. Turn insights into impact in the same pane.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {useCases.map((u, idx) => (
              <div key={u.title} className="rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border bg-white dark:bg-gray-900 border-orange-100 dark:border-orange-900/30 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center mb-4">
                  <u.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{u.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{u.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-800 dark:via-orange-900 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Make Your Store Operate at the Speed of Thought
          </h2>

          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Open the palette. Ask for what you want. RetailX handles the rest.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <NextLink href="/chat">
              <button className="bg-white hover:bg-orange-50 text-orange-600 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                Try the Interactive Demo
              </button>
            </NextLink>
            <a href="https://calendly.com/gnikhil335/30min" target="_blank" rel="noopener noreferrer">
              <button className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
                Book a Live Walkthrough
              </button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-orange-200 mt-8 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-300 animate-bounce-gentle" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-300 animate-bounce-gentle" />
              <span>Privacy-forward</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); } 50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.6); } }
        @keyframes scroll-right { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes scroll-left { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.8s ease-out forwards; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-scroll-right { animation: scroll-right 20s linear infinite; }
        .animate-scroll-left { animation: scroll-left 25s linear infinite; }
      `}</style>
    </div>
  )
}