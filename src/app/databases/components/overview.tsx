'use client'

import Dagre from '@dagrejs/dagre';
import { Table, TableSchemaNode } from "@/components/TableSchemaNode";
import { Background, Panel, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"
import { useCallback, useMemo } from "react";

type Props = {
  data: Record<string, string[]>;
  relations: { source: string, target: string }[];
}

const nodeTypes = {
  tableSchema: TableSchemaNode,
};

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export const Overview: React.FC<Props> = ({ data, relations }) => {

  const { fitView } = useReactFlow();

  const _nodes = useMemo(() => {
    const nodeData = Object.entries(data).map(([tableName, columns]) => ({
      title: tableName,
      columns: columns
    }))

    return nodeData.map((item, index) => {
      return {
        id: `table-${item.title}`,
        type: 'tableSchema',
        data: item,
        position: { x: 100 * index, y: 100 },
      }
    })
  }, [data])

  const _relations = useMemo(() => {
    return relations.map((relation, index) => ({
      ...relation,
      id: `relation-${index}`,
      source: `table-${relation.source.split('.')[0]}`,
      target: `table-${relation.target.split('.')[0]}`,
      sourceHandle: `${relation.source}`,
      targetHandle: `${relation.target}`,
      animated: true,
      style: { stroke: '#000' }
    }))
  }, [relations])
  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_relations);

  const onLayout = useCallback(
    (direction: string) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      fitView();
    },
    [nodes, edges],
  );

  return <div className="flex-1">
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edges={edges}
      fitView>
      <Background />
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')} className="btn">vertical layout</button>
        <button onClick={() => onLayout('LR')} className="btn">horizontal layout</button>
      </Panel>
    </ReactFlow >
  </div >
}
