import { useState, useRef, type DragEvent } from 'react'

type Props = {
  accept?: string
  onFileSelect: (file: File) => void
  label?: string
  description?: string
  accentColor?: string
}

export default function FileUpload({
  accept = '.pdf,.txt,.md',
  onFileSelect,
  label = 'Drop your file here',
  description = 'or click to browse (PDF, TXT, MD)',
  accentColor = 'violet',
}: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const colorMap: Record<string, string> = {
    amber: 'border-amber-500/50 bg-amber-500/5',
    cyan: 'border-cyan-500/50 bg-cyan-500/5',
    emerald: 'border-emerald-500/50 bg-emerald-500/5',
    violet: 'border-violet-500/50 bg-violet-500/5',
  }

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragOut = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
        isDragging ? colorMap[accentColor] || colorMap.violet : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/30'
      }`}
    >
      <div className="text-4xl mb-3">📁</div>
      <p className="text-slate-200 font-medium">{label}</p>
      <p className="text-slate-500 text-sm mt-1">{description}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelect(file)
        }}
        className="hidden"
      />
    </div>
  )
}
