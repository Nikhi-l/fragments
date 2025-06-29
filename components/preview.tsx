import { DeployDialog } from './deploy-dialog'
import { FragmentCode } from './fragment-code'
import { FragmentPreview } from './fragment-preview'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { ChevronsRight, LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function Preview({
  teamID,
  accessToken,
  selectedTab,
  onSelectedTabChange,
  isChatLoading,
  isPreviewLoading,
  fragment,
  result,
  onClose,
}: {
  teamID: string | undefined
  accessToken: string | undefined
  selectedTab: 'code' | 'fragment'
  onSelectedTabChange: Dispatch<SetStateAction<'code' | 'fragment'>>
  isChatLoading: boolean
  isPreviewLoading: boolean
  fragment?: DeepPartial<FragmentSchema>
  result?: ExecutionResult
  onClose: () => void
}) {
  if (!fragment) {
    return null
  }

  const isLinkAvailable = result?.template !== 'code-interpreter-v1'
  const isCodeFragment = fragment.type === 'code'
  const hasExecutableCode = isCodeFragment && fragment.code && fragment.file_path

  // Get the appropriate tab label based on fragment type
  const getFragmentTabLabel = () => {
    switch (fragment.type) {
      case 'camera_feed': return 'Camera Feed'
      case 'dashboard': return 'Dashboard'
      case 'sales_data': return 'Sales Data'
      default: return 'Preview'
    }
  }

  return (
    <div className="absolute md:relative z-10 top-0 left-0 shadow-2xl md:rounded-tl-3xl md:rounded-bl-3xl md:border-l md:border-y bg-popover h-full w-full overflow-auto">
      <Tabs
        value={selectedTab}
        onValueChange={(value) =>
          onSelectedTabChange(value as 'code' | 'fragment')
        }
        className="h-full flex flex-col items-start justify-start"
      >
        <div className="w-full p-2 grid grid-cols-3 items-center border-b">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={onClose}
                >
                  <ChevronsRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close sidebar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-center">
            <TabsList className="px-1 py-0 border h-8">
              {hasExecutableCode && (
                <TabsTrigger
                  className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                  value="code"
                >
                  {isChatLoading && (
                    <LoaderCircle
                      strokeWidth={3}
                      className="h-3 w-3 animate-spin"
                    />
                  )}
                  Code
                </TabsTrigger>
              )}
              <TabsTrigger
                disabled={!fragment}
                className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                value="fragment"
              >
                {getFragmentTabLabel()}
                {isPreviewLoading && (
                  <LoaderCircle
                    strokeWidth={3}
                    className="h-3 w-3 animate-spin"
                  />
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          {result && isLinkAvailable && (
            <div className="flex items-center justify-end gap-2">
              <DeployDialog
                url={result.url!}
                sbxId={result.sbxId!}
                teamID={teamID}
                accessToken={accessToken}
              />
            </div>
          )}
        </div>
        {fragment && (
          <div className="overflow-y-auto w-full h-full">
            {hasExecutableCode && (
              <TabsContent value="code" className="h-full">
                <FragmentCode
                  files={[
                    {
                      name: fragment.file_path!,
                      content: fragment.code!,
                    },
                  ]}
                />
              </TabsContent>
            )}
            <TabsContent value="fragment" className="h-full">
              <FragmentPreview result={result as ExecutionResult} fragment={fragment} />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  )
}