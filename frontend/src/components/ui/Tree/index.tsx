import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree as AntTree } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface MenuItem {
  id: number;
  path: string;
  name: string;
  parentId: number | null;
}

interface TreeNode {
  key: string;
  title: React.ReactNode;
  children?: TreeNode[];
}

interface TreeComponentProps {
  selectNode: (nodeInfo: { depth: number; selectedId: string }) => void; // Define the prop type
}

const TreeComponent: React.FC<TreeComponentProps> = ({ selectNode }) => {
  const [treeDataN, setTreeData] = useState<TreeNode[] | null>(null);
  const { items, loading, error } = useSelector((state: RootState) => state.menu);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      const treeData = buildTreeData(items);
      setTreeData(treeData);
    }
  }, [items]);

  const buildTreeData = (items: MenuItem[]): TreeNode[] => {
    const map: { [key: string]: TreeNode } = {}; // Maps keys to tree nodes
    const roots: TreeNode[] = []; // Root nodes of the tree

    items.forEach((item) => {
      const key = item.path.split('.').join('-');
      map[key] = {
        key,
        title: (
          <div className="w-full flex items-center gap-x-2" id={item.id.toString()}>
            <div className="rounded-2xl text-[#101828] px-2 text-lg">
              {item.name}
            </div>
            <button className="rounded-full grid place-items-center h-6 aspect-square text-sm bg-[#253BFF] text-white">
              +
            </button>
          </div>
        ),
        children: [],
      };
    });
    items.forEach((item) => {
      const key = item.path.split('.').join('-');
      const parentKey = item.path
        .split('.')
        .slice(0, -1)
        .join('-');

      if (parentKey && map[parentKey]) {
        map[parentKey].children!.push(map[key]);
      } else {
        roots.push(map[key]);
      }
    });

    return roots;
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log(info)
    const depth = info.node.pos.split('-').length - 1; 
    const selectedId = info.node.title.props.id;
    selectNode({ depth, selectedId }); 
  };

  if (!treeDataN) return null;
  const getAllKeys = (data: TreeNode[]): string[] => {
    let keys: string[] = [];
    data.forEach((node) => {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(getAllKeys(node.children));
      }
    });
    return keys;
  };

  // Expand all nodes
  const handleExpandAll = () => {
    const allKeys = getAllKeys(treeDataN);
    setExpandedKeys(allKeys);
  };

  // Collapse all nodes
  const handleCollapseAll = () => {
    setExpandedKeys([]);
  };

  // Handle manual expand/collapse
  const handleExpand = (keys: React.Key[]) => {
    setExpandedKeys(keys as string[]); // Update the expandedKeys state
  };
  return (
    <div>
         <div className="flex gap-x-2 my-3">
              <button
              onClick={handleExpandAll}
               className="px-5 py-2 rounded-full bg-[#1D2939] text-white">
                Expand All
              </button>
              <button
              onClick={handleCollapseAll}
               className="px-5 py-2 rounded-full border border-[#D0D5DD] text-[#475467]">
                Collapse All
              </button>
            </div>
    <AntTree
      className="text-xl"
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0']}
      onSelect={onSelect}
      treeData={treeDataN}
      onExpand={handleExpand}
      expandedKeys={expandedKeys}
      
    />
    </div>
  );
};

export default TreeComponent;