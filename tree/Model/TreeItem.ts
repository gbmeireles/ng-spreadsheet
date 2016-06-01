interface TreeItem {
    isExpanded: boolean;
    childList?: TreeItem[];
    isParent: boolean;
}