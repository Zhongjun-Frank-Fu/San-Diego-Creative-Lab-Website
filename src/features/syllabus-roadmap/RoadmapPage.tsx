import { useState, useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from '@dagrejs/dagre'
import { chatCompletion, type Message } from '@/lib/llm'
import { ROADMAP_SYSTEM_PROMPT } from '@/lib/prompts'

type RoadmapNodeData = {
  label: string
  description: string
  estimatedHours: number
  resources: string[]
  relatedConcepts: string[]
}

type RoadmapData = {
  nodes: Array<{
    id: string
    label: string
    description: string
    estimatedHours: number
    resources: string[]
    relatedConcepts: string[]
  }>
  edges: Array<{ source: string; target: string }>
}

const nodeColors = [
  'from-emerald-500/20 to-green-500/20 border-emerald-500/40',
  'from-cyan-500/20 to-blue-500/20 border-cyan-500/40',
  'from-violet-500/20 to-purple-500/20 border-violet-500/40',
  'from-amber-500/20 to-orange-500/20 border-amber-500/40',
  'from-pink-500/20 to-rose-500/20 border-pink-500/40',
  'from-teal-500/20 to-emerald-500/20 border-teal-500/40',
]

function RoadmapNodeCard({ data }: { data: RoadmapNodeData & { colorIndex: number } }) {
  const [expanded, setExpanded] = useState(false)
  const color = nodeColors[data.colorIndex % nodeColors.length]

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`bg-gradient-to-br ${color} border rounded-xl p-4 min-w-[200px] max-w-[260px] cursor-pointer hover:scale-105 transition-transform shadow-lg`}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-2 !h-2" />

      <h3 className="text-white font-bold text-sm mb-1">{data.label}</h3>
      <p className="text-slate-400 text-xs mb-2 line-clamp-2">{data.description}</p>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">⏱ {data.estimatedHours}h</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">📚 {data.resources.length} resources</span>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
          {data.resources.length > 0 && (
            <div>
              <p className="text-xs font-medium text-slate-300 mb-1">Resources:</p>
              <ul className="text-xs text-slate-400 space-y-0.5">
                {data.resources.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
            </div>
          )}
          {data.relatedConcepts.length > 0 && (
            <div>
              <p className="text-xs font-medium text-slate-300 mb-1">Related:</p>
              <div className="flex flex-wrap gap-1">
                {data.relatedConcepts.map((c, i) => (
                  <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-2 !h-2" />
    </div>
  )
}

function layoutGraph(nodes: Node[], edges: Edge[]): Node[] {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'TB', nodesep: 60, ranksep: 80 })

  nodes.forEach(node => {
    g.setNode(node.id, { width: 240, height: 120 })
  })
  edges.forEach(edge => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  return nodes.map(node => {
    const pos = g.node(node.id)
    return {
      ...node,
      position: { x: pos.x - 120, y: pos.y - 60 },
    }
  })
}

const EXAMPLE_SYLLABUS = `CS 101: Introduction to Computer Science

Week 1-2: Introduction to Programming
- Variables, data types, operators
- Input/output, basic I/O operations
- Prerequisites: None

Week 3-4: Control Flow
- Conditional statements (if/else)
- Loops (for, while)
- Prerequisites: Introduction to Programming

Week 5-6: Functions and Modules
- Function definition and calling
- Parameters and return values
- Code organization
- Prerequisites: Control Flow

Week 7-8: Data Structures
- Lists, arrays, tuples
- Dictionaries and sets
- Iteration over collections
- Prerequisites: Functions and Modules

Week 9-10: Object-Oriented Programming
- Classes and objects
- Inheritance and polymorphism
- Encapsulation
- Prerequisites: Data Structures, Functions

Week 11-12: Algorithms
- Searching (linear, binary)
- Sorting (bubble, merge, quick)
- Time complexity basics (Big O)
- Prerequisites: Data Structures

Week 13-14: File I/O and Error Handling
- Reading/writing files
- Exception handling
- Prerequisites: Functions and Modules

Week 15-16: Final Project
- Integration of all concepts
- Prerequisites: All previous modules`

export default function RoadmapPage() {
  const [syllabus, setSyllabus] = useState('')
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [generated, setGenerated] = useState(false)

  const nodeTypes: NodeTypes = useMemo(() => ({
    roadmapNode: RoadmapNodeCard,
  }), [])

  const handleGenerate = useCallback(async (text?: string) => {
    const input = text || syllabus
    if (!input.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const messages: Message[] = [
        { role: 'system', content: ROADMAP_SYSTEM_PROMPT },
        { role: 'user', content: input },
      ]

      const response = await chatCompletion(messages, { jsonMode: true, maxTokens: 3000 })

      let data: RoadmapData
      try {
        data = JSON.parse(response)
      } catch {
        const match = response.match(/\{[\s\S]*\}/)
        if (match) {
          data = JSON.parse(match[0])
        } else {
          throw new Error('Failed to parse roadmap data')
        }
      }

      // Convert to React Flow nodes/edges
      const rfNodes: Node[] = data.nodes.map((n, i) => ({
        id: n.id,
        type: 'roadmapNode',
        position: { x: 0, y: 0 },
        data: {
          label: n.label,
          description: n.description,
          estimatedHours: n.estimatedHours,
          resources: n.resources || [],
          relatedConcepts: n.relatedConcepts || [],
          colorIndex: i,
        },
      }))

      const rfEdges: Edge[] = data.edges.map((e, i) => ({
        id: `e${i}`,
        source: e.source,
        target: e.target,
        animated: true,
        style: { stroke: '#4ade80', strokeWidth: 2 },
      }))

      // Auto-layout with dagre
      const layoutedNodes = layoutGraph(rfNodes, rfEdges)
      setNodes(layoutedNodes)
      setEdges(rfEdges)
      setGenerated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [syllabus])

  if (!generated && !isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">🗺️</span>
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">Syllabus → Roadmap</h1>
            <p className="text-slate-400">Paste a course syllabus and generate a visual learning roadmap</p>
          </div>

          <div className="space-y-4">
            <textarea
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
              placeholder="Paste your course syllabus here..."
              rows={10}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none font-mono text-sm"
            />

            <div className="flex gap-3">
              <button
                onClick={() => handleGenerate()}
                disabled={!syllabus.trim()}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀 Generate Roadmap
              </button>
              <button
                onClick={() => {
                  setSyllabus(EXAMPLE_SYLLABUS)
                  handleGenerate(EXAMPLE_SYLLABUS)
                }}
                className="px-5 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-sm"
              >
                ✨ Try Example
              </button>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400 mb-4" />
        <p className="text-slate-400">Analyzing syllabus and generating roadmap...</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xl">🗺️</span>
          <span className="text-emerald-400 font-medium">Learning Roadmap</span>
          <span className="text-slate-500 text-sm">• {nodes.length} modules</span>
        </div>
        <button
          onClick={() => { setGenerated(false); setNodes([]); setEdges([]) }}
          className="px-4 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm transition-colors"
        >
          New Roadmap
        </button>
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.3}
          maxZoom={1.5}
          className="bg-slate-950"
        >
          <Background color="#1e293b" gap={20} />
          <Controls className="!bg-slate-800 !border-slate-700 !rounded-lg [&>button]:!bg-slate-800 [&>button]:!border-slate-700 [&>button]:!text-slate-400 [&>button:hover]:!bg-slate-700" />
        </ReactFlow>
      </div>
    </div>
  )
}
