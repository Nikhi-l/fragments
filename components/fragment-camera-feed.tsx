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

  // Group cameras into sets of 4 for 2x2 grids
  const groupCamerasIntoSets = (cameras: CameraFeed[]) => {
    const sets = []
    for (let i = 0; i < cameras.length; i += 4) {
      sets.push(cameras.slice(i, i + 4))
    }
    return sets
  }

  const cameraGroups = groupCamerasIntoSets(cameraFeeds)

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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Security Camera System</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={refreshFeeds} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Store Selector */}
        <div className="flex items-center space-x-4">
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
          <Badge variant="outline" className={getStatusColor(currentStore.status)}>
            {currentStore.cameras} Cameras • {currentStore.status}
          </Badge>
        </div>

        {/* Store Info */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{currentStore.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span>{currentStore.alerts} alerts</span>
            </div>
          </div>
          <span className="text-muted-foreground text-xs">Updated {currentStore.lastUpdate}</span>
        </div>
      </div>

      {/* 2x2 Camera Grid Cards */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {cameraGroups.map((cameraGroup, groupIndex) => (
          <Card key={groupIndex} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span>{currentStore.name} - Zone {groupIndex + 1}</span>
                  <Badge variant="outline" className="text-xs">
                    {cameraGroup.length} cameras
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{lastRefresh.toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-0">
                {Array.from({ length: 4 }, (_, index) => {
                  const camera = cameraGroup[index]
                  const cameraIndex = groupIndex * 4 + index
                  
                  if (!camera) {
                    // Empty slot
                    return (
                      <div 
                        key={`empty-${index}`} 
                        className="relative bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2" />
                            <div className="text-sm">No Camera</div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div 
                      key={camera.id} 
                      className="relative bg-black border border-gray-200 dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all group"
                      style={{ aspectRatio: '16/9' }}
                      onClick={() => {
                        setSelectedCamera(cameraIndex)
                        setIsFullscreen(true)
                      }}
                    >
                      {camera.status === 'offline' || camera.status === 'maintenance' ? (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <div className="text-center">
                            {camera.status === 'offline' ? (
                              <>
                                <WifiOff className="h-8 w-8 mx-auto mb-2 text-red-500" />
                                <div className="text-sm font-medium">Offline</div>
                                <div className="text-xs text-gray-400">No connection</div>
                              </>
                            ) : (
                              <>
                                <Settings className="h-8 w-8 mx-auto mb-2 text-yellow-500 animate-spin" />
                                <div className="text-sm font-medium">Maintenance</div>
                                <div className="text-xs text-gray-400">Being serviced</div>
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
                          style={{ aspectRatio: '16/9' }}
                        />
                      )}

                      {/* Video Overlays */}
                      {camera.status !== 'offline' && camera.status !== 'maintenance' && (
                        <>
                          {/* Top Left - Camera Info */}
                          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            <div className="font-medium">{camera.location}</div>
                            <div className="opacity-80">{camera.resolution}</div>
                          </div>

                          {/* Top Right - Status Indicators */}
                          <div className="absolute top-2 right-2 flex flex-col items-end space-y-1">
                            {camera.status === 'recording' && (
                              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                <span>LIVE</span>
                              </div>
                            )}
                            {camera.hasAudio && (
                              <div className="bg-green-600 p-1 rounded">
                                <Volume2 className="h-3 w-3 text-white" />
                              </div>
                            )}
                            {camera.hasMotionDetection && (
                              <div className="bg-blue-600 p-1 rounded">
                                <Zap className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Bottom Left - Motion Alert */}
                          {camera.lastMotion && (
                            <div className="absolute bottom-2 left-2 bg-orange-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                              <Zap className="h-3 w-3" />
                              <span>{camera.lastMotion}</span>
                            </div>
                          )}

                          {/* Bottom Right - Viewer Count & Controls */}
                          <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{camera.viewerCount}</span>
                            </div>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCamera(cameraIndex)
                                setIsFullscreen(true)
                              }}
                              variant="outline"
                              size="sm"
                              className="bg-black/70 border-white/30 text-white hover:bg-black/90 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Maximize2 className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Center - Play/Pause on Hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                setIsPlaying(!isPlaying)
                              }}
                              variant="outline"
                              size="sm"
                              className="bg-black/70 border-white/30 text-white hover:bg-black/90 h-10 w-10 p-0"
                            >
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Camera Details Footer */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t">
                <div className="grid grid-cols-2 gap-4">
                  {cameraGroup.map((camera, index) => (
                    <div key={camera.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          camera.status === 'recording' ? 'bg-red-500 animate-pulse' :
                          camera.status === 'online' ? 'bg-green-500' :
                          camera.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <span className="font-medium">{camera.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={`text-xs ${getStatusColor(camera.status)}`}>
                          {camera.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{camera.fps}fps</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

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
    </div>
  )
}