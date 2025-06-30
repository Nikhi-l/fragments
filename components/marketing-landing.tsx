'use client'

import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'
import { Zap, Play, Link, Eye, TrendingUp, Camera, BarChart3, CheckCircle } from 'lucide-react'
import NextLink from 'next/link'

export function MarketingLanding() {
  const steps = [
    {
      icon: Link,
      title: 'CONNECT',
      description: 'We securely link to your existing camera system in minutes. Our platform is compatible with 99% of modern IP cameras.',
      color: 'orange-400'
    },
    {
      icon: Eye,
      title: 'ANALYZE',
      description: 'Our AI anonymously analyzes video feeds in real-time, identifying shopper behavior patterns without collecting any personal data.',
      color: 'orange-500'
    },
    {
      icon: TrendingUp,
      title: 'OPTIMIZE',
      description: 'Access your intuitive dashboard. Visualize heatmaps, analyze departmental performance, and get clear recommendations to improve your store\'s performance.',
      color: 'orange-600'
    }
  ];

  const features = [
    {
      icon: Camera,
      title: 'Full-Store Intelligence',
      description: 'Go beyond door counters. Our AI analyzes your entire floor space to understand customer paths, dwell times, and bottlenecks.',
      gradient: 'from-orange-400 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'The Physical Store Funnel',
      description: 'For the first time, measure your physical funnel: Walk-Bys → Views → Engagements → Sales. Pinpoint exactly where to focus your efforts.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Drive Real ROI',
      description: 'Make data-backed decisions on layout, merchandising, and staffing to increase conversion rates and boost average transaction value.',
      gradient: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-orange-50 to-orange-100 dark:from-gray-900 dark:via-orange-950 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-500/20 dark:bg-orange-400/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 w-full px-6 py-6 z-10">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-md bg-orange-500 p-2">
                <Logo className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Retail<span className="text-orange-500">X</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#solution" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Solution
              </a>
              <a href="https://calendly.com/gnikhil335/30min" target="_blank" rel="noopener noreferrer">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold">
                  Book Demo
                </Button>
              </a>
            </div>
          </nav>
        </header>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Unlock the{' '}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Hidden Revenue
                </span>{' '}
                in Your Store
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Transform your physical store into an intelligent, data-driven space. RetailX uses your existing security cameras and advanced AI to give you eCommerce-level analytics for your brick-and-mortar locations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a href="https://calendly.com/gnikhil335/30min" target="_blank" rel="noopener noreferrer">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl animate-pulse-glow">
                    Book a Demo
                  </button>
                </a>
                <NextLink href="/chat">
                  <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg">
                    <Play className="h-5 w-5" />
                    Try Demo
                  </button>
                </NextLink>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 text-gray-500 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <span>No new hardware required</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
              {/* Dashboard Preview */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-4 border border-orange-100 dark:border-orange-900/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                    alt="RetailX Dashboard - Staff Performance and Store Analytics"
                    className="w-full h-auto object-cover rounded-2xl shadow-lg"
                    style={{ aspectRatio: '16/10' }}
                  />
                  
                  {/* Overlay with dashboard elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-2xl"></div>
                  
                  {/* Floating metrics */}
                  <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-200/50 dark:border-orange-800/50 animate-bounce-gentle">
                    <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">Live Analytics</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Real-time insights</div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-200/50 dark:border-orange-800/50 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
                    <div className="text-sm font-semibold text-green-600">+27% Revenue</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">This month</div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-200/50 dark:border-orange-800/50 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                    <div className="text-sm font-semibold text-blue-600">Staff Performance</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">95% efficiency</div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-200/50 dark:border-orange-800/50 animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>
                    <div className="text-sm font-semibold text-purple-600">Store Comparison</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">4 locations</div>
                  </div>
                </div>
                
                {/* Dashboard label */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  Live Dashboard Preview
                </div>
              </div>

              {/* Additional stats below */}
              <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 text-center backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 animate-bounce-gentle">84%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Conversion Rate</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 text-center backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.1s' }}>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 animate-bounce-gentle">+27%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Revenue Lift</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 text-center backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 animate-bounce-gentle">48hrs</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Setup Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-orange-200/50 dark:border-orange-800/50 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Store?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of retailers who have unlocked hidden revenue with RetailX&apos;s AI-powered analytics platform.
            </p>
            <NextLink href="/chat">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                Try Demo
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get Actionable Insights in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              No disruption, no expensive installation. We integrate seamlessly with what you already have.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-orange-200 dark:from-orange-700 dark:to-orange-800 transform translate-x-4 animate-pulse"></div>
                )}
                <div className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up group" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className={`bg-${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg group-hover:shadow-xl transition-all duration-300 animate-bounce-gentle`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center lg:text-left group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center lg:text-left">
                    {step.description}
                  </p>
                </div>
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

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Introducing RetailX: The Eyes and Brains of Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Retail Space
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stop guessing. Start knowing. RetailX transforms your standard camera feeds into a powerful stream of actionable intelligence, revealing the complete customer journey from the sidewalk to the sale.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-orange-100 dark:border-orange-900/30 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 animate-bounce-gentle`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-800 dark:via-orange-900 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to See Your Store in a{' '}
            <span className="bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent animate-pulse">
              New Light?
            </span>
          </h2>
          
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your physical space is your biggest asset. It&apos;s time to manage it with the same level of data and precision as your website. Schedule a personalized demo today and see the powerful insights hiding in plain sight.
          </p>

          <a href="https://calendly.com/gnikhil335/30min" target="_blank" rel="noopener noreferrer">
            <button className="bg-white hover:bg-orange-50 text-orange-600 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl mb-8 animate-pulse-glow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Book My Free Demo Now
            </button>
          </a>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-orange-200 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-300 animate-bounce-gentle" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <CheckCircle className="h-5 w-5 text-green-300 animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
              <span>100% confidential</span>
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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.6); }
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
      `}</style>
    </div>
  )
}