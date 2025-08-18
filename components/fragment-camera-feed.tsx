'use client'

import { CameraFeedFragmentSchema } from '@/lib/schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Camera,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useRef, useState } from 'react'

export function FragmentCameraFeed({
  fragment,
}: {
  fragment: CameraFeedFragmentSchema
}) {
  const [current, setCurrent] = useState(0)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  const cameras = fragment.camera_locations.map((location, i) => ({
    location,
    url: fragment.camera_feed_url.replace('{id}', String(i + 1)),
  }))

  const main = cameras[current]

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='flex items-center space-x-2 text-lg'>
          <Camera className='h-4 w-4' />
          <span>{fragment.store_name}</span>
        </CardTitle>
        <Select value={String(current)} onValueChange={(v) => setCurrent(Number(v))}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Camera' />
          </SelectTrigger>
          <SelectContent>
            {cameras.map((cam, i) => (
              <SelectItem key={cam.location} value={String(i)}>
                {cam.location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col space-y-4'>
        <div className='relative aspect-video w-full overflow-hidden rounded bg-black'>
          <iframe
            key={current}
            ref={frameRef}
            src={main.url}
            className='h-full w-full'
            allow='autoplay'
            allowFullScreen
          />
          <div className='absolute bottom-2 right-2 flex space-x-2'>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
            </Button>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => setMuted((m) => !m)}
            >
              {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
            </Button>
            <Button
              size='sm'
              variant='secondary'
              onClick={() => setFullscreen((f) => !f)}
            >
              {fullscreen ? (
                <Minimize2 className='h-4 w-4' />
              ) : (
                <Maximize2 className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
          {cameras.map((cam, i) => (
            <button
              key={cam.location}
              onClick={() => setCurrent(i)}
              className={`relative aspect-video overflow-hidden rounded border ${
                current === i ? 'ring-2 ring-primary' : ''
              }`}
            >
              <iframe src={cam.url} className='h-full w-full' allow='autoplay' />
              <Badge className='absolute left-1 top-1'>{cam.location}</Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

