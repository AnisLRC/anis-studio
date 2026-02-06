import { motion } from 'framer-motion'

interface UploadProgressProps {
  progress: number
  currentFile?: string
  totalFiles?: number
  currentFileIndex?: number
}

export const UploadProgress = ({ 
  progress, 
  currentFile,
  totalFiles = 1,
  currentFileIndex = 1 
}: UploadProgressProps) => {
  return (
    <div className="space-y-2">
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6E44FF] to-[#BDA6FF]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Status Text */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-300">
          {currentFile ? (
            <>
              Uploading {currentFile} ({currentFileIndex}/{totalFiles})
            </>
          ) : (
            'Uploading...'
          )}
        </span>
        <span className="font-semibold text-[#6E44FF]">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}
