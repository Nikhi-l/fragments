import Logo from './logo'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { Session } from '@supabase/supabase-js'
import { ArrowRight, LogOut, Trash, Undo } from 'lucide-react'

export function NavBar({
  session,
  showLogin,
  signOut,
  onClear,
  canClear,
  onSocialClick,
  onUndo,
  canUndo,
}: {
  session: Session | null
  showLogin: () => void
  signOut: () => void
  onClear: () => void
  canClear: boolean
  onSocialClick: (target: 'github' | 'x' | 'discord') => void
  onUndo: () => void
  canUndo: boolean
}) {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <Logo width={20} height={20} />
        <h1 className="text-lg font-semibold">
          Retail<span className="text-[#ff8800]">X</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {canUndo && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="h-8 w-8 p-0"
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {canClear && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  disabled={!canClear}
                  className="h-8 w-8 p-0"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <ThemeToggle />
        
        {session ? (
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8 cursor-pointer">
                      <AvatarImage
                        src={
                          session.user.user_metadata?.avatar_url ||
                          'https://avatar.vercel.sh/' + session.user.email
                        }
                        alt={session.user.email}
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>My Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="flex flex-col">
                <span className="text-sm">My Account</span>
                <span className="text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSocialClick('discord')}>
                <DiscordLogoIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Join us on Discord
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSocialClick('x')}>
                <TwitterLogoIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Follow us on X
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSocialClick('github')}>
                <GitHubLogoIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Star on GitHub
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="default" onClick={showLogin} size="sm">
            Sign in
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  )
}