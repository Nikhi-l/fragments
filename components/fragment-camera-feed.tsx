'use client'

import { CameraFeedFragmentSchema } from '@/lib/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Camera, MapPin } from 'lucide-react'
import { useState } from 'react'

export function FragmentCameraFeed({ fragment }: { fragment: CameraFeedFragmentSchema }) {
  const [selectedCamera, setSelectedCamera] = useState(0)

  // Mock multiple camera feeds for the store
  const cameraFeeds = fragment.camera_locations.map((location, index) => ({
    location,
    url: getCameraFeedUrl(index),
    status: 'online'
  }))

  function getCameraFeedUrl(index: number) {
    const urls = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    ]
    return urls[index % urls.length]
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">{fragment.store_name} - Camera Feeds</h2>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          {cameraFeeds.length} Cameras Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
        {/* Camera Selection Panel */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-3">Camera Locations</h3>
          {cameraFeeds.map((camera, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCamera === index ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' : ''
              }`}
              onClick={() => setSelectedCamera(index)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{camera.location}</span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">{camera.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Camera Feed */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{cameraFeeds[selectedCamera]?.location}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black rounded-b-lg overflow-hidden">
                <video
                  key={selectedCamera}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  src={cameraFeeds[selectedCamera]?.url}
                >
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay with camera info */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                  {fragment.store_name} - {cameraFeeds[selectedCamera]?.location}
                </div>
                
                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Camera Grid View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {cameraFeeds.slice(0, 4).map((camera, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                src={camera.url}
              />
              <div className="absolute bottom-1 left-1 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
                {camera.location}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}