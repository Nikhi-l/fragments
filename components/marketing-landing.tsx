'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Logo from '@/components/logo'
import { BarChart3, Shield, Zap, Eye } from 'lucide-react'
import Link from 'next/link'

export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-orange-500 p-2">
              <Logo className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold">
              Retail<span className="text-orange-500">X</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors">
              Use Cases
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/chat">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Book Demo
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Unlock the{' '}
                <span className="text-orange-500">Hidden Revenue</span>
                <br />
                in Your Store
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Transform your physical store into an intelligent, data-driven space. 
                RetailX uses your existing security cameras and advanced AI to give you 
                eCommerce-level analytics for your brick-and-mortar locations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                >
                  Book a Demo
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 text-lg"
              >
                <span className="mr-2">▶</span>
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-orange-500" />
                <span>No new hardware required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-orange-500" />
                <span>GDPR & CCPA compliant</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Live Analytics
                    </div>
                    <div className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      +27% Revenue
                    </div>
                  </div>
                  <div className="text-white text-xs mt-2">Real-time insights</div>
                  <div className="text-white text-xs">This month</div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Analytics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-blue-600 text-sm font-medium mb-1">Staff Performance</div>
                      <div className="text-2xl font-bold text-blue-700">95%</div>
                      <div className="text-blue-600 text-xs">efficiency</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-purple-600 text-sm font-medium mb-1">Store Comparison</div>
                      <div className="text-2xl font-bold text-purple-700">4</div>
                      <div className="text-purple-600 text-xs">locations</div>
                    </div>
                  </div>

                  {/* Live Dashboard Preview Badge */}
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-center text-sm font-medium">
                    Live Dashboard Preview
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">84%</div>
                      <div className="text-xs text-gray-600">Conversion Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">+27%</div>
                      <div className="text-xs text-gray-600">Revenue Lift</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">48hrs</div>
                      <div className="text-xs text-gray-600">Setup Time</div>
                    </div>
                  </div>

                  {/* Chart Visualization */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-700">Customer Traffic</div>
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {Array.from({ length: 12 }, (_, i) => (
                        <div
                          key={i}
                          className="bg-orange-500 rounded-t-sm flex-1"
                          style={{ 
                            height: `${Math.random() * 60 + 20}%`,
                            opacity: 0.7 + Math.random() * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Transform Your Store?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of retailers who have unlocked hidden revenue with RetailX&apos;s 
            AI-powered analytics platform.
          </p>
          <Link href="/chat">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg"
            >
              Try Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}