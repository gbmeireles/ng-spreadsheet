export class TreeToListConverter {
    convert(treeItemList: TreeItem[], depth?: number) {
        if (!depth) {
            depth = 0;
        }
        var result: TreeItem[] = [];
        treeItemList.forEach(ti => {
            result.push(ti);
            if (ti.childList && ti.isExpanded) {
                result = result.concat(this.convert(ti.childList, depth + 1));
            }
        });
        return result;
    }
}