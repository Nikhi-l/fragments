'use client'

export function LandingPage() {
  return (
    <div className="flex flex-col justify-center min-h-[60vh] px-4 py-8">
      {/* Left-aligned Welcome Text */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground">
          Hello there!
        </h1>
        
        <p className="text-xl text-muted-foreground">
          How can I help you today?
        </p>
      </div>
    </div>
  )
}