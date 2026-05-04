import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Code2,
  GraduationCap,
  Briefcase,
  Building2,
  Building,
  HeartPulse,
} from "lucide-react";
import connecttlyMark from "@/assets/_zip/connecttly-mark.svg";

type IndustryData = { name: string; icon: React.ReactNode; side: "left" | "right" };

const IndustryNode = ({ data }: NodeProps<Node<IndustryData>>) => {
  const isLeft = data.side === "left";
  return (
    <div className="bg-background rounded-xl border border-border/60 shadow-[6px_8px_20px_-6px_hsl(var(--foreground)/0.15)] px-5 py-6 flex items-center gap-4 w-[260px]">
      {isLeft ? (
        <>
          <p className="text-sm font-heading font-semibold leading-tight flex-1">{data.name}</p>
          <div className="p-2 rounded-lg bg-ct-blue-light shrink-0">{data.icon}</div>
        </>
      ) : (
        <>
          <div className="p-2 rounded-lg bg-ct-blue-light shrink-0">{data.icon}</div>
          <p className="text-sm font-heading font-semibold leading-tight flex-1">{data.name}</p>
        </>
      )}
      <Handle
        type="source"
        position={isLeft ? Position.Right : Position.Left}
        className="!opacity-0 !pointer-events-none"
      />
    </div>
  );
};

const HubNode = () => (
  <div className="relative">
    <div className="relative w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.6)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(0 0% 100% / 0.45) 0%, hsl(0 0% 100% / 0.18) 35%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <img src={connecttlyMark} alt="Connecttly" className="relative w-10 h-auto" />
    </div>
    {(["left", "right"] as const).map((side) =>
      (["top", "middle", "bottom"] as const).map((row) => {
        const topPct = row === "top" ? "38%" : row === "middle" ? "50%" : "62%";
        return (
          <div key={`${side}-${row}`}>
            <Handle
              id={`${side}-${row}`}
              type="target"
              position={side === "left" ? Position.Left : Position.Right}
              className="!opacity-0 !pointer-events-none"
              style={{ top: topPct, [side]: "-12px" }}
            />
            <span
              aria-hidden
              className="absolute w-2 h-2 rounded-full bg-primary pointer-events-none"
              style={{
                top: topPct,
                [side]: "-12px",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        );
      })
    )}
  </div>
);

const nodeTypes = { industry: IndustryNode, hub: HubNode };

const leftItems: IndustryData[] = [
  { name: "SaaS & Technology", icon: <Code2 className="w-5 h-5 text-primary" />, side: "left" },
  { name: "EdTech & E-Learning", icon: <GraduationCap className="w-5 h-5 text-primary" />, side: "left" },
  { name: "Professional Services", icon: <Briefcase className="w-5 h-5 text-primary" />, side: "left" },
];
const rightItems: IndustryData[] = [
  { name: "Enterprise Automation", icon: <Building2 className="w-5 h-5 text-primary" />, side: "right" },
  { name: "Real Estate & Co-Working", icon: <Building className="w-5 h-5 text-primary" />, side: "right" },
  { name: "Healthcare & Wellness", icon: <HeartPulse className="w-5 h-5 text-primary" />, side: "right" },
];

const CARD_W = 260;
const CARD_H = 80;
const HUB_W = 96;
const HUB_H = 96;
const CANVAS_W = 1200;
const CANVAS_H = 380;
const ROW_YS = [40, (CANVAS_H - CARD_H) / 2, CANVAS_H - CARD_H - 40];

const IndustriesFlow = () => {
  const { nodes, edges } = useMemo(() => {
    const ns: Node[] = [];
    const es: Edge[] = [];

    leftItems.forEach((d, i) => {
      ns.push({
        id: `L${i}`,
        type: "industry",
        position: { x: 0, y: ROW_YS[i] },
        data: d,
        draggable: false,
        selectable: false,
      });
      const edgeBase = {
        source: `L${i}`,
        target: "hub",
        targetHandle: `left-${["top", "middle", "bottom"][i]}`,
        type: i === 1 ? "straight" : "smoothstep",
        animated: false,
        pathOptions: i === 1 ? undefined : { borderRadius: 80 },
      } as const;
      es.push({
        ...edgeBase,
        id: `e-L${i}`,
        style: { stroke: "hsl(var(--primary))", strokeWidth: 1.75 },
      } as Edge);
      es.push({
        ...edgeBase,
        id: `e-L${i}-pulse`,
        style: { stroke: "hsl(0 0% 100% / 0.95)", strokeWidth: 1.1 },
        className: "energy-line",
      } as Edge);
    });

    rightItems.forEach((d, i) => {
      ns.push({
        id: `R${i}`,
        type: "industry",
        position: { x: CANVAS_W - CARD_W, y: ROW_YS[i] },
        data: d,
        draggable: false,
        selectable: false,
      });
      const edgeBase = {
        source: `R${i}`,
        target: "hub",
        targetHandle: `right-${["top", "middle", "bottom"][i]}`,
        type: i === 1 ? "straight" : "smoothstep",
        animated: false,
        pathOptions: i === 1 ? undefined : { borderRadius: 80 },
      } as const;
      es.push({
        ...edgeBase,
        id: `e-R${i}`,
        style: { stroke: "hsl(var(--primary))", strokeWidth: 1.75 },
      } as Edge);
      es.push({
        ...edgeBase,
        id: `e-R${i}-pulse`,
        style: { stroke: "hsl(0 0% 100% / 0.95)", strokeWidth: 1.1 },
        className: "energy-line",
      } as Edge);
    });

    ns.push({
      id: "hub",
      type: "hub",
      position: { x: (CANVAS_W - HUB_W) / 2, y: (CANVAS_H - HUB_H) / 2 },
      data: {},
      draggable: false,
      selectable: false,
    });

    return { nodes: ns, edges: es };
  }, []);

  return (
    <div style={{ width: "100%", height: CANVAS_H }} className="[&_.react-flow__attribution]:hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.05 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} color="hsl(var(--border))" />
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <linearGradient id="energy-fade" x1="0" x2="1" y1="0" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.95" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </ReactFlow>
    </div>
  );
};

export default IndustriesFlow;
