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
  Settings,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Zap,
  Wifi,
  WifiOff,
  RefreshCw,
  Radio,
  Eye,
  Grid3X3,
  Layers
} from 'lucide-react'
import { useState, useEffect, useRef, useMemo } from 'react'

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
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single')
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const youtubeVideos = [
    'https://www.youtube.com/embed/lEddHr7oq98?autoplay=1&mute=1&loop=1&playlist=lEddHr7oq98',
    'https://www.youtube.com/embed/9BTrF3YiqTI?autoplay=1&mute=1&loop=1&playlist=9BTrF3YiqTI',
    'https://www.youtube.com/embed/eSuGpBjRaxw?autoplay=1&mute=1&loop=1&playlist=eSuGpBjRaxw',
    'https://www.youtube.com/embed/E_2esIdzQxw?autoplay=1&mute=1&loop=1&playlist=E_2esIdzQxw',
    'https://www.youtube.com/embed/R_2IAJOYdQE?autoplay=1&mute=1&loop=1&playlist=R_2IAJOYdQE',
    'https://www.youtube.com/embed/KOVd1IwZoMk?autoplay=1&mute=1&loop=1&playlist=KOVd1IwZoMk',
    'https://www.youtube.com/embed/k5enOLJbjgQ?autoplay=1&mute=1&loop=1&playlist=k5enOLJbjgQ'
  ]

  const stores: Store[] = useMemo(() => [
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
    }
  ], [fragment.store_name])

  useEffect(() => {
    if (!selectedStore && stores.length > 0) {
      setSelectedStore(stores[0].id)
    }
  }, [stores, selectedStore])

  const currentStore = stores.find(store => store.id === selectedStore) || stores[0]

  const generateCameraFeeds = (store: Store): CameraFeed[] => {
    const baseLocations = [
      'Main Entrance', 'Checkout Counter 1', 'Checkout Counter 2', 'Aisle 1-3',
      'Aisle 4-6', 'Storage Room', 'Employee Break Room', 'Parking Lot',
      'Loading Dock', 'Customer Service', 'Electronics Section', 'Pharmacy'
    ]

    return Array.from({ length: store.cameras }, (_, index) => ({
      id: `cam-${store.id}-${index + 1}`,
      location: baseLocations[index] || `Camera ${index + 1}`,
      url: youtubeVideos[index % youtubeVideos.length],
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
      case 'online': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'recording': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'maintenance': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
    }
  }

  const getStoreStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500'
      case 'offline': return 'bg-red-500'
      case 'maintenance': return 'bg-amber-500'
      default: return 'bg-zinc-500'
    }
  }

  // Fullscreen component
  if (isFullscreen) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 bg-zinc-950 z-50 flex flex-col"
        style={{ zIndex: 9999 }}
      >
        {/* Fullscreen Header */}
        <div className="bg-zinc-900/95 backdrop-blur-xl text-white p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">{currentStore.name} - {currentCamera?.location}</span>
            </div>
            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">
              {currentCamera?.resolution} • {currentCamera?.fps}fps
            </Badge>
            {currentCamera?.status === 'recording' && (
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-red-400 font-medium">LIVE</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="ghost"
              size="sm"
              className="text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="ghost"
              size="sm"
              disabled={!currentCamera?.hasAudio}
              className="text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Fullscreen Video */}
        <div className="flex-1 relative bg-black">
          {currentCamera?.status === 'offline' ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center">
                  <WifiOff className="h-10 w-10 text-red-500" />
                </div>
                <div className="text-2xl font-medium text-white">Camera Offline</div>
                <div className="text-lg text-zinc-500">Unable to connect to camera feed</div>
              </div>
            </div>
          ) : currentCamera?.status === 'maintenance' ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center">
                  <Settings className="h-10 w-10 text-amber-500 animate-spin" />
                </div>
                <div className="text-2xl font-medium text-white">Under Maintenance</div>
                <div className="text-lg text-zinc-500">Camera is being serviced</div>
              </div>
            </div>
          ) : (
            <iframe
              key={`${selectedStore}-${selectedCamera}-fullscreen`}
              className="w-full h-full"
              src={currentCamera?.url}
              title="Camera Feed"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Fullscreen Camera Thumbnails */}
        <div className="bg-zinc-900/95 backdrop-blur-xl p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {cameraFeeds.map((camera, index) => (
              <button
                key={camera.id}
                className={`flex-shrink-0 transition-all duration-200 rounded-xl overflow-hidden ${
                  selectedCamera === index
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-900 scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setSelectedCamera(index)}
              >
                <div className="relative w-28 h-16 bg-zinc-800">
                  {camera.status === 'offline' || camera.status === 'maintenance' ? (
                    <div className="w-full h-full flex items-center justify-center">
                      {camera.status === 'offline' ? (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Settings className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full object-cover scale-150 pointer-events-none"
                      src={camera.url}
                      title={camera.location}
                      frameBorder="0"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
                    <div className="text-xs text-white truncate">{camera.location}</div>
                  </div>
                  {camera.status === 'recording' && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Security Cameras</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Real-time surveillance monitoring</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-56 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStoreStatusColor(store.status)}`} />
                    <span>{store.name}</span>
                    {store.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs ml-1">
                        {store.alerts}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
            <Button
              onClick={() => setViewMode('single')}
              variant="ghost"
              size="sm"
              className={`rounded-lg ${viewMode === 'single' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setViewMode('grid')}
              variant="ghost"
              size="sm"
              className={`rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={refreshFeeds} variant="outline" size="sm" className="rounded-xl">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Store Info Bar */}
      <div className="p-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-sm">
          <div className="grid grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700">
                <MapPin className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{currentStore.name}</div>
                <div className="text-xs text-zinc-500">{currentStore.location}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-500/20">
                <Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{currentStore.cameras} Cameras</div>
                <div className="text-xs text-zinc-500">Active monitoring</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{currentStore.alerts} Alerts</div>
                <div className="text-xs text-zinc-500">Require attention</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
                <Radio className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Live Feed</div>
                <div className="text-xs text-zinc-500">{currentStore.lastUpdate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex p-4 pt-0 gap-4 overflow-hidden">
        {/* Camera List */}
        <div className="w-72 flex-shrink-0 overflow-y-auto space-y-2 pr-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Camera Locations</h3>
            <Badge variant="secondary" className="text-xs rounded-lg">{cameraFeeds.length}</Badge>
          </div>

          {cameraFeeds.map((camera, index) => (
            <button
              key={camera.id}
              onClick={() => setSelectedCamera(index)}
              className={`w-full p-3 rounded-xl border transition-all duration-200 text-left ${
                selectedCamera === index
                  ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 shadow-sm'
                  : 'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedCamera === index
                      ? 'bg-blue-100 dark:bg-blue-500/20'
                      : 'bg-zinc-100 dark:bg-zinc-700'
                  }`}>
                    <MapPin className={`h-3.5 w-3.5 ${
                      selectedCamera === index
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{camera.location}</div>
                    <div className="text-xs text-zinc-500">{camera.resolution} • {camera.fps}fps</div>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(camera.status)}`}>
                  {camera.status}
                </Badge>
              </div>

              <div className="flex items-center space-x-3 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-700/50">
                {camera.hasAudio && <Volume2 className="h-3 w-3 text-emerald-500" />}
                {camera.hasMotionDetection && <Zap className="h-3 w-3 text-blue-500" />}
                {camera.status === 'recording' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                {camera.lastMotion && (
                  <span className="text-xs text-amber-600 dark:text-amber-400">Motion: {camera.lastMotion}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Main Video Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl relative">
            {/* Video Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-white/80" />
                    <span className="text-white font-medium">{currentCamera?.location}</span>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(currentCamera?.status || 'offline')}`}>
                    {currentCamera?.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button onClick={() => setIsPlaying(!isPlaying)} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-xl">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button onClick={() => setIsMuted(!isMuted)} variant="ghost" size="sm" disabled={!currentCamera?.hasAudio} className="text-white hover:bg-white/20 rounded-xl">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button onClick={toggleFullscreen} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-xl">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-xl">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Content */}
            {currentCamera?.status === 'offline' ? (
              <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <WifiOff className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="text-lg font-medium text-white">Camera Offline</div>
                  <div className="text-sm text-zinc-500">Unable to connect to camera feed</div>
                </div>
              </div>
            ) : currentCamera?.status === 'maintenance' ? (
              <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <Settings className="h-8 w-8 text-amber-500 animate-spin" />
                  </div>
                  <div className="text-lg font-medium text-white">Under Maintenance</div>
                  <div className="text-sm text-zinc-500">Camera is being serviced</div>
                </div>
              </div>
            ) : (
              <iframe
                key={`${selectedStore}-${selectedCamera}`}
                className="w-full h-full min-h-[400px]"
                src={currentCamera?.url}
                title="Camera Feed"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Video Footer */}
            {currentCamera?.status !== 'offline' && currentCamera?.status !== 'maintenance' && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {currentCamera?.status === 'recording' && (
                      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm text-white font-medium">LIVE</span>
                      </div>
                    )}
                    <span className="text-sm text-white/80">{currentCamera?.resolution} • {currentCamera?.fps}fps</span>
                    <span className="text-sm text-white/60">Rec: {currentCamera?.recordingTime}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-white/80">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{currentCamera?.viewerCount} viewing</span>
                    </div>
                    {currentCamera?.lastMotion && (
                      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                        <Zap className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-sm text-amber-400">Motion {currentCamera.lastMotion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Camera Navigation */}
          <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setSelectedCamera(Math.max(0, selectedCamera - 1))}
                  variant="outline"
                  size="sm"
                  disabled={selectedCamera === 0}
                  className="rounded-xl"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Camera {selectedCamera + 1} of {cameraFeeds.length}
                </span>
                <Button
                  onClick={() => setSelectedCamera(Math.min(cameraFeeds.length - 1, selectedCamera + 1))}
                  variant="outline"
                  size="sm"
                  disabled={selectedCamera === cameraFeeds.length - 1}
                  className="rounded-xl"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{lastRefresh.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid View - Camera Thumbnails */}
      <div className="p-4 pt-0">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">All Cameras - {currentStore.name}</h3>
            <Badge variant="secondary" className="text-xs rounded-lg">{cameraFeeds.filter(c => c.status === 'recording').length} Recording</Badge>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
            {cameraFeeds.map((camera, index) => (
              <button
                key={camera.id}
                onClick={() => setSelectedCamera(index)}
                className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                  selectedCamera === index
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 scale-105 z-10'
                    : 'hover:scale-105'
                }`}
              >
                <div className="aspect-video bg-zinc-900">
                  {camera.status === 'offline' || camera.status === 'maintenance' ? (
                    <div className="w-full h-full flex items-center justify-center">
                      {camera.status === 'offline' ? (
                        <WifiOff className="h-6 w-6 text-red-500" />
                      ) : (
                        <Settings className="h-6 w-6 text-amber-500" />
                      )}
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full object-cover pointer-events-none"
                      src={camera.url}
                      title={camera.location}
                      frameBorder="0"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <div className="text-xs text-white truncate">{camera.location}</div>
                  </div>
                  {camera.status === 'recording' && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
