'use client'

import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'
import { Zap, Play } from 'lucide-react'
import Link from 'next/link'

export function MarketingLanding() {
  return (
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
            <Link href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#use-cases" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Use Cases
            </Link>
            <Link href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              FAQ
            </Link>
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
              <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
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
          <Link href="/chat">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>

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
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}