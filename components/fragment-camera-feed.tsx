'use client'

import { CameraFeedFragmentSchema } from '@/lib/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Camera, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Shield, 
  Clock,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Settings,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Zap,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  RefreshCw,
  X,
  Grid3X3,
  Monitor,
  Smartphone
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface Store {
  id: string
  name: string
  location: string
  status: 'online' | 'offline' | 'maintenance'
  cameras: number
  alerts: number
  lastUpdate: string
}

interface CameraFeed {
  id: string
  location: string
  url: string
  status: 'online' | 'offline' | 'recording' | 'maintenance'
  resolution: string
  fps: number
  hasAudio: boolean
  hasMotionDetection: boolean
  lastMotion?: string
  viewerCount: number
  recordingTime: string
}

export function FragmentCameraFeed({ fragment }: { fragment: CameraFeedFragmentSchema }) {
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [selectedCamera, setSelectedCamera] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid')
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-switch to grid mode on mobile
      if (window.innerWidth < 768) {
        setViewMode('grid')
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mock store data
  const stores: Store[] = [
    {
      id: 'main',
      name: fragment.store_name || 'Main Store',
      location: '123 Main Street, Downtown',
      status: 'online',
      cameras: 8,
      alerts: 2,
      lastUpdate: '2 minutes ago'
    },
    {
      id: 'mall',
      name: 'Mall Location',
      location: 'Westfield Shopping Center',
      status: 'online',
      cameras: 12,
      alerts: 0,
      lastUpdate: '1 minute ago'
    },
    {
      id: 'suburban',
      name: 'Suburban Branch',
      location: '456 Oak Avenue, Suburbs',
      status: 'online',
      cameras: 6,
      alerts: 1,
      lastUpdate: '3 minutes ago'
    },
    {
      id: 'airport',
      name: 'Airport Terminal',
      location: 'Terminal 2, Gate Area',
      status: 'maintenance',
      cameras: 4,
      alerts: 3,
      lastUpdate: '15 minutes ago'
    },
    {
      id: 'downtown',
      name: 'Downtown Express',
      location: '789 Business District',
      status: 'offline',
      cameras: 5,
      alerts: 5,
      lastUpdate: '1 hour ago'
    }
  ]

  // Set initial store selection
  useEffect(() => {
    if (!selectedStore && stores.length > 0) {
      setSelectedStore(stores[0].id)
    }
  }, [stores, selectedStore])

  const currentStore = stores.find(store => store.id === selectedStore) || stores[0]

  // Generate enhanced camera feeds based on selected store
  const generateCameraFeeds = (store: Store): CameraFeed[] => {
    const baseLocations = [
      'Main Entrance', 'Checkout Counter 1', 'Checkout Counter 2', 'Aisle 1-3', 
      'Aisle 4-6', 'Storage Room', 'Employee Break Room', 'Parking Lot',
      'Loading Dock', 'Customer Service', 'Electronics Section', 'Pharmacy'
    ]
    
    const videoUrls = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
    ]

    return Array.from({ length: store.cameras }, (_, index) => ({
      id: `cam-${store.id}-${index + 1}`,
      location: baseLocations[index] || `Camera ${index + 1}`,
      url: videoUrls[index % videoUrls.length],
      status: store.status === 'offline' ? 'offline' : 
              store.status === 'maintenance' ? 'maintenance' :
              Math.random() > 0.1 ? 'recording' : 'online',
      resolution: ['1080p', '720p', '4K'][Math.floor(Math.random() * 3)],
      fps: [30, 60][Math.floor(Math.random() * 2)],
      hasAudio: Math.random() > 0.3,
      hasMotionDetection: Math.random() > 0.2,
      lastMotion: Math.random() > 0.5 ? `${Math.floor(Math.random() * 30) + 1} min ago` : undefined,
      viewerCount: Math.floor(Math.random() * 5) + 1,
      recordingTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
    }))
  }

  const cameraFeeds = generateCameraFeeds(currentStore)
  const currentCamera = cameraFeeds[selectedCamera] || cameraFeeds[0]

  const refreshFeeds = () => {
    setLastRefresh(new Date())
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 border-green-600'
      case 'recording': return 'text-blue-600 border-blue-600'
      case 'offline': return 'text-red-600 border-red-600'
      case 'maintenance': return 'text-yellow-600 border-yellow-600'
      default: return 'text-gray-600 border-gray-600'
    }
  }

  const getStoreStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-red-500'
      case 'maintenance': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  // Fullscreen component
  if (isFullscreen) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 bg-black z-50 flex flex-col"
        style={{ zIndex: 9999 }}
      >
        {/* Fullscreen Header */}
        <div className="bg-black/90 text-white p-2 md:p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium text-sm md:text-base">{currentStore.name} - {currentCamera?.location}</span>
            </div>
            <Badge variant="outline" className="text-white border-white text-xs">
              {currentCamera?.resolution} • {currentCamera?.fps}fps
            </Badge>
            {currentCamera?.status === 'recording' && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs md:text-sm">LIVE</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isPlaying ? <Pause className="h-3 w-3 md:h-4 md:w-4" /> : <Play className="h-3 w-3 md:h-4 md:w-4" />}
            </Button>
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              size="sm"
              disabled={!currentCamera?.hasAudio}
              className="text-white border-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMuted ? <VolumeX className="h-3 w-3 md:h-4 md:w-4" /> : <Volume2 className="h-3 w-3 md:h-4 md:w-4" />}
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Minimize2 className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>

        {/* Fullscreen Video */}
        <div className="flex-1 relative bg-black">
          {currentCamera?.status === 'offline' ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <WifiOff className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-red-500" />
                <div className="text-lg md:text-2xl font-medium">Camera Offline</div>
                <div className="text-sm md:text-lg text-gray-400">Unable to connect to camera feed</div>
              </div>
            </div>
          ) : currentCamera?.status === 'maintenance' ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Settings className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-yellow-500 animate-spin" />
                <div className="text-lg md:text-2xl font-medium">Under Maintenance</div>
                <div className="text-sm md:text-lg text-gray-400">Camera is being serviced</div>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              key={`${selectedStore}-${selectedCamera}-fullscreen`}
              className="w-full h-full object-contain"
              controls={false}
              autoPlay={isPlaying}
              muted={isMuted}
              loop
              src={currentCamera?.url}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {/* Fullscreen Overlays */}
          {currentCamera?.status !== 'offline' && currentCamera?.status !== 'maintenance' && (
            <>
              {/* Camera Info Overlay */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/70 text-white px-2 py-1 md:px-4 md:py-3 rounded-md space-y-1">
                <div className="font-medium text-sm md:text-lg">{currentStore.name}</div>
                <div className="text-xs md:text-sm opacity-80">{currentCamera?.location}</div>
                <div className="text-xs opacity-60">
                  Recording: {currentCamera?.recordingTime} • {currentCamera?.viewerCount} viewers
                </div>
              </div>
              
              {/* Motion Detection Alert */}
              {currentCamera?.lastMotion && (
                <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-orange-600 text-white px-2 py-1 md:px-4 md:py-3 rounded-md flex items-center space-x-2">
                  <Zap className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Motion detected {currentCamera.lastMotion}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Fullscreen Camera Grid */}
        <div className="bg-black/90 p-2 md:p-4">
          <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto">
            {cameraFeeds.map((camera, index) => (
              <div
                key={camera.id}
                className={`flex-shrink-0 cursor-pointer transition-all ${
                  selectedCamera === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCamera(index)}
              >
                <div className="relative w-16 h-12 md:w-24 md:h-16 bg-gray-800 rounded overflow-hidden">
                  {camera.status === 'offline' || camera.status === 'maintenance' ? (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      {camera.status === 'offline' ? (
                        <WifiOff className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                      ) : (
                        <Settings className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
                      )}
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      muted
                      autoPlay
                      loop
                      src={camera.url}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-1 py-0.5">
                    <div className="text-xs truncate">{camera.location}</div>
                  </div>
                  {camera.status === 'recording' && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mobile Grid View (Social Media Style)
  if (isMobile || viewMode === 'grid') {
    return (
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="p-3 border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Security Cameras</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setViewMode(viewMode === 'grid' ? 'single' : 'grid')}
                variant="outline"
                size="sm"
                className="h-8"
              >
                {viewMode === 'grid' ? <Monitor className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
              <Button onClick={refreshFeeds} variant="outline" size="sm" className="h-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Store Selector */}
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStoreStatusColor(store.status)}`} />
                    <span>{store.name}</span>
                    {store.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {store.alerts}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Store Info */}
          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">{currentStore.cameras} cameras</span>
              <Badge variant="outline" className={getStatusColor(currentStore.status)}>
                {currentStore.status}
              </Badge>
            </div>
            <span className="text-muted-foreground text-xs">{currentStore.lastUpdate}</span>
          </div>
        </div>

        {/* Social Media Style Video Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-0">
            {cameraFeeds.map((camera, index) => (
              <div key={camera.id} className="relative bg-black border-b border-gray-200 dark:border-gray-700">
                {/* Video Container */}
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  {camera.status === 'offline' || camera.status === 'maintenance' ? (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        {camera.status === 'offline' ? (
                          <>
                            <WifiOff className="h-12 w-12 mx-auto mb-4 text-red-500" />
                            <div className="text-lg font-medium">Camera Offline</div>
                            <div className="text-sm text-gray-400">Unable to connect</div>
                          </>
                        ) : (
                          <>
                            <Settings className="h-12 w-12 mx-auto mb-4 text-yellow-500 animate-spin" />
                            <div className="text-lg font-medium">Under Maintenance</div>
                            <div className="text-sm text-gray-400">Being serviced</div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      controls={false}
                      autoPlay
                      muted={isMuted}
                      loop
                      src={camera.url}
                      onClick={() => {
                        setSelectedCamera(index)
                        setIsFullscreen(true)
                      }}
                    />
                  )}

                  {/* Video Overlays */}
                  {camera.status !== 'offline' && camera.status !== 'maintenance' && (
                    <>
                      {/* Top Overlay - Camera Info */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <div className="bg-black/70 text-white px-3 py-2 rounded-lg">
                          <div className="font-medium text-sm">{camera.location}</div>
                          <div className="text-xs opacity-80">{camera.resolution} • {camera.fps}fps</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {camera.status === 'recording' && (
                            <div className="bg-red-600 text-white px-2 py-1 rounded-lg flex items-center space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              <span className="text-xs font-medium">LIVE</span>
                            </div>
                          )}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCamera(index)
                              setIsFullscreen(true)
                            }}
                            variant="outline"
                            size="sm"
                            className="bg-black/70 border-white/30 text-white hover:bg-black/90 h-8 w-8 p-0"
                          >
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Bottom Overlay - Controls and Info */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/70 text-white px-3 py-2 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">{camera.viewerCount}</span>
                              </div>
                              {camera.hasAudio && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setIsMuted(!isMuted)
                                  }}
                                  variant="ghost"
                                  size="sm"
                                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                                >
                                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                </Button>
                              )}
                              {camera.hasMotionDetection && (
                                <div className="flex items-center space-x-1">
                                  <Zap className="h-4 w-4 text-blue-400" />
                                  {camera.lastMotion && (
                                    <span className="text-xs text-orange-400">{camera.lastMotion}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text-xs opacity-80">
                              {camera.recordingTime}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Side Overlay - Status Indicators */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
                        {camera.hasAudio && !isMuted && (
                          <div className="bg-green-600 p-2 rounded-full">
                            <Volume2 className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {camera.hasMotionDetection && (
                          <div className="bg-blue-600 p-2 rounded-full">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {camera.lastMotion && (
                          <div className="bg-orange-600 p-2 rounded-full animate-pulse">
                            <AlertTriangle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Camera Details Card */}
                <div className="p-3 bg-white dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{camera.location}</h3>
                      <p className="text-xs text-muted-foreground">
                        {currentStore.name} • {camera.resolution} • {camera.fps}fps
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(camera.status)}`}>
                        {camera.status}
                      </Badge>
                      <Button
                        onClick={() => {
                          setSelectedCamera(index)
                          setIsFullscreen(true)
                        }}
                        variant="outline"
                        size="sm"
                        className="h-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="flex items-center space-x-3 mt-2">
                    {camera.hasAudio && (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <Volume2 className="h-3 w-3" />
                        <span>Audio</span>
                      </div>
                    )}
                    {camera.hasMotionDetection && (
                      <div className="flex items-center space-x-1 text-xs text-blue-600">
                        <Zap className="h-3 w-3" />
                        <span>Motion</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{camera.viewerCount} viewing</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t bg-white dark:bg-gray-900 sticky bottom-0">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>System Online</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Secure</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{lastRefresh.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop view (original layout)
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Header with Store Selection */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Security Camera System</h2>
          </div>
          
          {/* Store Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Store:</span>
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStoreStatusColor(store.status)}`} />
                      <span>{store.name}</span>
                      {store.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {store.alerts}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setViewMode(viewMode === 'grid' ? 'single' : 'grid')}
            variant="outline"
            size="sm"
          >
            {viewMode === 'grid' ? <Monitor className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Badge variant="outline" className={getStatusColor(currentStore.status)}>
            {currentStore.cameras} Cameras • {currentStore.status}
          </Badge>
          <Button onClick={refreshFeeds} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Store Information Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{currentStore.name}</div>
                <div className="text-xs text-muted-foreground">{currentStore.location}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{currentStore.cameras} Cameras</div>
                <div className="text-xs text-muted-foreground">Active monitoring</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{currentStore.alerts} Alerts</div>
                <div className="text-xs text-muted-foreground">Require attention</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">Last Update</div>
                <div className="text-xs text-muted-foreground">{currentStore.lastUpdate}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 flex-1">
        {/* Camera Selection Panel - Full Height */}
        <div className="w-80 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-muted-foreground">Camera Locations</h3>
            <Badge variant="outline" className="text-xs">
              {cameraFeeds.length} cameras
            </Badge>
          </div>
          
          <div className="flex-1 space-y-2 overflow-y-auto">
            {cameraFeeds.map((camera, index) => (
              <Card 
                key={camera.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCamera === index ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' : ''
                }`}
                onClick={() => setSelectedCamera(index)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{camera.location}</div>
                        <div className="text-xs text-muted-foreground">
                          {camera.resolution} • {camera.fps}fps
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(camera.status)}`}>
                        {camera.status}
                      </Badge>
                      {camera.viewerCount > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{camera.viewerCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Camera Features */}
                  <div className="flex items-center space-x-2 mt-2">
                    {camera.hasAudio && <Volume2 className="h-3 w-3 text-green-600" />}
                    {camera.hasMotionDetection && <Zap className="h-3 w-3 text-blue-600" />}
                    {camera.status === 'recording' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                    {camera.lastMotion && (
                      <span className="text-xs text-orange-600">Motion: {camera.lastMotion}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Camera Feed */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{currentCamera?.location}</span>
                  <Badge variant="outline" className={getStatusColor(currentCamera?.status || 'offline')}>
                    {currentCamera?.status}
                  </Badge>
                </CardTitle>
                
                {/* Camera Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant="outline"
                    size="sm"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="outline"
                    size="sm"
                    disabled={!currentCamera?.hasAudio}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={toggleFullscreen}
                    variant="outline"
                    size="sm"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="relative bg-black rounded-b-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {currentCamera?.status === 'offline' ? (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <WifiOff className="h-12 w-12 mx-auto mb-4 text-red-500" />
                      <div className="text-lg font-medium">Camera Offline</div>
                      <div className="text-sm text-gray-400">Unable to connect to camera feed</div>
                    </div>
                  </div>
                ) : currentCamera?.status === 'maintenance' ? (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Settings className="h-12 w-12 mx-auto mb-4 text-yellow-500 animate-spin" />
                      <div className="text-lg font-medium">Under Maintenance</div>
                      <div className="text-sm text-gray-400">Camera is being serviced</div>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    key={`${selectedStore}-${selectedCamera}`}
                    className="w-full h-full object-cover"
                    controls={false}
                    autoPlay={isPlaying}
                    muted={isMuted}
                    loop
                    src={currentCamera?.url}
                    style={{ aspectRatio: '16/9' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                
                {/* Video Overlays */}
                {currentCamera?.status !== 'offline' && currentCamera?.status !== 'maintenance' && (
                  <>
                    {/* Camera Info Overlay */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-md text-sm space-y-1">
                      <div className="font-medium">{currentStore.name} - {currentCamera?.location}</div>
                      <div className="text-xs opacity-80">
                        {currentCamera?.resolution} • {currentCamera?.fps}fps • Recording: {currentCamera?.recordingTime}
                      </div>
                    </div>
                    
                    {/* Live Indicator */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-md text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>

                    {/* Motion Detection Alert */}
                    {currentCamera?.lastMotion && (
                      <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-3 py-2 rounded-md text-sm flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span>Motion detected {currentCamera.lastMotion}</span>
                      </div>
                    )}

                    {/* Viewer Count */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-md text-sm flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{currentCamera?.viewerCount} viewing</span>
                    </div>

                    {/* Audio Indicator */}
                    {currentCamera?.hasAudio && !isMuted && (
                      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 4 }, (_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-green-500 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 20 + 10}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Camera Navigation */}
              <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setSelectedCamera(Math.max(0, selectedCamera - 1))}
                      variant="outline"
                      size="sm"
                      disabled={selectedCamera === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Camera {selectedCamera + 1} of {cameraFeeds.length}
                    </span>
                    <Button
                      onClick={() => setSelectedCamera(Math.min(cameraFeeds.length - 1, selectedCamera + 1))}
                      variant="outline"
                      size="sm"
                      disabled={selectedCamera === cameraFeeds.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Wifi className="h-4 w-4" />
                      <span>Connected</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>Encrypted</span>
                    </div>
                    <span>Last refresh: {lastRefresh.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Camera Grid View - Always Visible on Desktop */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Cameras - {currentStore.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {cameraFeeds.map((camera, index) => (
              <Card 
                key={camera.id} 
                className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => setSelectedCamera(index)}
              >
                <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
                  {camera.status === 'offline' || camera.status === 'maintenance' ? (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        {camera.status === 'offline' ? (
                          <WifiOff className="h-6 w-6 mx-auto text-red-500" />
                        ) : (
                          <Settings className="h-6 w-6 mx-auto text-yellow-500" />
                        )}
                        <div className="text-xs mt-1">{camera.status}</div>
                      </div>
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      muted
                      autoPlay
                      loop
                      src={camera.url}
                      style={{ aspectRatio: '16/9' }}
                    />
                  )}
                  <div className="absolute bottom-1 left-1 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
                    {camera.location}
                  </div>
                  {camera.status === 'recording' && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                  {camera.lastMotion && (
                    <div className="absolute top-1 left-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  )}
                  {selectedCamera === index && (
                    <div className="absolute inset-0 ring-2 ring-blue-500 ring-inset" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status Footer */}
      <Card className="bg-gray-50 dark:bg-gray-900">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Secure Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4 text-green-600" />
              <span>{cameraFeeds.filter(c => c.status === 'recording').length} Recording</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span>{currentStore.alerts} Active Alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}