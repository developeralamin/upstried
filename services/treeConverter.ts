import lodash from 'lodash';

const treeIterator = (container: any, nodeList: any, parent: string) => {
  nodeList.forEach((node: any, index: any) => {
    if ('children' in node) {
      treeIterator(container, node.children, node.uuid);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, expanded, ...rest } = node;
    container.push({
      ...rest,
      expanded: expanded ? true : false,
      parent,
      order: index,
    });
  });
};

// Get flat structure from tree structure

export const getFlatDataFromTree = (data: any) => {
  const container: any = [];
  treeIterator(container, data, '');
  return container;
};

const flatIterator = (data: any, parent: string) => {
  const tmpContainer = lodash.filter(data, { parent });
  const tree: any = [];
  if (tmpContainer.length === 0) {
    return tree;
  }
  tmpContainer.forEach((node: any) => {
    const children = flatIterator(data, node.uuid);
    if (children) {
      tree.push({ ...node, children: children, key: node.uuid });
    } else {
      tree.push({ ...node, key: node.uuid });
    }
  });

  return tree.map((node: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parent, order, ...rest } = node;
    return rest;
  });
};

// Get tree data from flat

export const getTreeDataFromFlat = (data: any) => {
  return flatIterator(data, '');
};
