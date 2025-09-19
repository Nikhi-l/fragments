'use client'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Play,
  Command,
  Sparkles,
  BarChart3,
  CheckCircle,
  ShieldCheck,
  Clock,
  Glasses,
  MessagesSquare,
  BadgeCheck,
  GraduationCap,
  Navigation2,
} from 'lucide-react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'

export function MarketingLanding() {
  // Command palette demo items
  const commandItems = useMemo(
    () => [
      { icon: Glasses, label: 'Coach greeting for shopper comparing 65" TVs' },
      {
        icon: MessagesSquare,
        label: 'Summarize Priya × Store 12 price conversation',
      },
      {
        icon: ShieldCheck,
        label: 'Flag warranty script missed during checkout',
      },
      {
        icon: Navigation2,
        label: 'Guide to running shoes under $150 with stock check',
      },
      {
        icon: BarChart3,
        label: 'Trend weekend sentiment by department',
      },
      {
        icon: GraduationCap,
        label: 'Build training reel from top-scoring consults',
      },
      {
        icon: Clock,
        label: 'Alert manager when consult exceeds 6 minutes',
      },
    ],
    [],
  )

  const [activeCmdIndex, setActiveCmdIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveCmdIndex((i) => (i + 1) % commandItems.length)
    }, 2600)
    return () => clearInterval(id)
  }, [commandItems.length])

  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  // Feature highlights
  const features = [
    {
      icon: Glasses,
      title: 'Smart Glass Capture',
      description:
        'Record and transcribe every shopper conversation with lightweight, compliant hardware.',
    },
    {
      icon: MessagesSquare,
      title: 'Real-Time Coaching',
      description:
        'AI whispers greetings, discovery prompts, and next best actions while associates serve.',
    },
    {
      icon: BadgeCheck,
      title: 'Quality Assurance Scoring',
      description:
        'Auto-score compliance, tone, and product knowledge so every visit meets your standard.',
    },
    {
      icon: BarChart3,
      title: 'Insight-to-Training Loop',
      description:
        'Spot trends, create playbooks, and upskill teams from one source of truth.',
    },
  ]

  // Use cases
  const useCases = [
    {
      icon: GraduationCap,
      title: 'Onboard & Train',
      copy: 'Give new associates instant playbooks from real conversations.',
    },
    {
      icon: ShieldCheck,
      title: 'Service Compliance',
      copy: 'Verify greetings, disclosures, and SOPs without mystery shoppers.',
    },
    {
      icon: Navigation2,
      title: 'Guided Selling',
      copy: 'Surface AI prompts that steer shoppers to the right product fast.',
    },
    {
      icon: Sparkles,
      title: 'Experience Analytics',
      copy: 'Measure sentiment, follow-ups, and close rates to lift CSAT.',
    },
  ]

  // Simple stat cards
  const stats = [
    { label: "Conversations QA'd automatically", value: '96%' },
    { label: 'Associate ramp time', value: '-60%' },
    { label: 'NPS lift in pilot stores', value: '+18' },
  ]

  // Scrolling tiles used around the video mock
  const scrollingTiles = [
    'Smart Glass QA',
    'Real-time Coaching',
    'Conversation Insights',
    'AI Training Plans',
    'Compliance Scorecards',
    'Customer Sentiment',
    'Guided Selling',
    'Mystery Shop Replacement',
    'Store Playbooks',
    'Experience Score',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 w-full px-6 py-5 z-30 backdrop-blur-md bg-white/60 border-b border-orange-200/40">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-orange-500 p-2">
              <Logo className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Retail<span className="text-orange-500">X</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#use-cases"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Use Cases
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="https://calendly.com/gnikhil335/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold">
                Book Demo
              </Button>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        onMouseMove={handleMouseMove}
        className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-gray-50 via-orange-50 to-orange-100 overflow-hidden"
      >
        {/* Animated backdrop bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-float transition-transform duration-500"
            style={{ transform: `translate3d(${cursor.x / 50}px, ${cursor.y / 50}px, 0)` }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-float transition-transform duration-500"
            style={{ animationDelay: '2s', transform: `translate3d(${cursor.x / -60}px, ${cursor.y / -60}px, 0)` }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-pulse transition-transform duration-500"
            style={{ transform: `translate3d(${cursor.x / 80}px, ${cursor.y / -80}px, 0)` }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
                <BadgeCheck className="h-4 w-4" /> Quality Assurance for Retail Floors
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Every Shopper Interaction, Perfected.
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Smart Glass Coaching for Retail Teams
                </span>
              </h1>

              <p
                className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                Outfit associates with smart glasses that capture every conversation.
                Our AI agent guides greetings, product discovery, and follow-up so
                every shopper leaves confident, while managers get instant scorecards
                to coach the team.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <NextLink href="/chat">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2">
                    <Play className="h-5 w-5" /> Experience the AI Floor Coach
                  </button>
                </NextLink>
                <a
                  href="https://calendly.com/gnikhil335/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-white/80 backdrop-blur-sm border border-orange-200 text-orange-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg">
                    Talk to Our Team
                  </button>
                </a>
              </div>

              <div
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 animate-fade-in-up"
                style={{ animationDelay: '0.45s' }}
              >
                <div className="flex items-center gap-2">
                  <Glasses className="h-5 w-5 text-orange-500" />
                  <span>Smart glasses capture & transcribe</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-green-600" />
                  <span>QA on every conversation</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <span>Guided selling prompts</span>
                </div>
              </div>
            </div>

            {/* Command Palette / Video Mock */}
            <div
              className="relative animate-fade-in-right"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-orange-100 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                {/* Fake window chrome */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>

                {/* Video pane */}
                <div className="relative overflow-hidden rounded-2xl border border-orange-100/60">
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: '16/9' }}
                  >
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
                        {[...scrollingTiles, ...scrollingTiles].map(
                          (tile, index) => (
                            <div
                              key={`top-${index}`}
                              className="flex-shrink-0 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium mx-1 shadow-lg backdrop-blur-sm"
                            >
                              {tile}
                            </div>
                          ),
                        )}
                      </div>
                      {/* Bottom tiles */}
                      <div className="absolute bottom-4 left-0 right-0 flex animate-scroll-left">
                        {[
                          ...scrollingTiles.slice().reverse(),
                          ...scrollingTiles.slice().reverse(),
                        ].map((tile, index) => (
                          <div
                            key={`bottom-${index}`}
                            className="flex-shrink-0 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium mx-1 shadow-lg backdrop-blur-sm"
                          >
                            {tile}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Command palette bar */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 bg-white border border-orange-200/50 rounded-2xl px-4 py-3 shadow-lg">
                    <Command className="h-5 w-5 text-orange-500" />
                    <div className="relative flex-1">
                      {commandItems.map((item, idx) => (
                        <div
                          key={item.label}
                          className={`absolute inset-0 flex items-center gap-2 transition-opacity duration-500 ${idx === activeCmdIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700 text-sm">
                            {item.label}
                          </span>
                        </div>
                      ))}
                      {/* Spacer to keep height */}
                      <div className="opacity-0 h-5">&nbsp;</div>
                    </div>
                    <kbd className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                      ⌘K
                    </kbd>
                  </div>
                </div>

                {/* Label */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  Capture • Coach • Assure
                </div>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 mt-8 animate-fade-in-up"
                style={{ animationDelay: '0.6s' }}
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/70 rounded-xl p-4 text-center backdrop-blur-sm border border-orange-200/50 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-2xl font-bold text-orange-600 animate-bounce-gentle">
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-orange-200/50 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-700 mb-3 font-medium">
              Capture conversations. Coach teams in the moment. Delight every shopper.
            </p>
            <NextLink href="/chat">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-base rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                See Conversation Insights
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              From Glass Capture to Coached Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              RetailX turns every in-store conversation into an actionable coaching and quality assurance loop.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: Glasses,
                title: 'Capture & Transcribe',
                description:
                  'Smart glasses record shopper interactions and turn them into transcripts instantly.',
              },
              {
                icon: MessagesSquare,
                title: 'Coach in the Moment',
                description:
                  'The AI agent whispers greetings, discovery cues, and guided selling prompts while associates serve.',
              },
              {
                icon: ShieldCheck,
                title: 'Train & Assure',
                description:
                  'Score every conversation, assign micro-training, and prove compliance across stores.',
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="group bg-white border-2 border-orange-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 animate-bounce-gentle bg-gradient-to-r from-orange-400 to-orange-600 group-hover:scale-110">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>

          <div
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <NextLink href="/chat">
              <button className="bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Review a QA Scorecard
              </button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why RetailX for Smart Glass Quality Assurance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Capture live interactions, guide teams in real time, and prove every standard is met.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {features.map((f, index) => (
              <div
                key={f.title}
                className="group bg-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 border border-orange-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                  <f.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for Operators Obsessed with Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Close the loop between what guests say, how associates respond, and the training that follows.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {useCases.map((u, idx) => (
              <div
                key={u.title}
                className="group rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 border bg-white border-orange-100 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <u.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {u.title}
                </h3>
                <p className="text-gray-600">{u.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Guarantee Every Shopper Gets the Scripted Experience
          </h2>

          <p
            className="text-xl text-orange-100 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            See how smart glasses plus our AI coach deliver consistent greetings, guided selling, and flawless follow-through.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <NextLink href="/chat">
              <button className="bg-white hover:bg-orange-50 text-orange-600 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                Run a Glass Coaching Session
              </button>
            </NextLink>
            <a
              href="https://calendly.com/gnikhil335/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
                Schedule a Quality Review
              </button>
            </a>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 text-orange-200 mt-8 animate-fade-in-up"
            style={{ animationDelay: '0.45s' }}
          >
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-300 animate-bounce-gentle" />
              <span>No-obligation pilot</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-300 animate-bounce-gentle" />
              <span>Consent & privacy built in</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(249, 115, 22, 0.6);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }
      `}</style>
    </div>
  )
}
