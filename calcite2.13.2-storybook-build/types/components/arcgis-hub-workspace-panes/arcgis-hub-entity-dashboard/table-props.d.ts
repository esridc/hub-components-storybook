export declare const errorTableColumns: (intl: any) => ({
  key: string;
  header: any;
  cellWidth: string;
  multilineCellEllipsis?: undefined;
} | {
  key: string;
  header: any;
  multilineCellEllipsis: {
    collapseEnabled: boolean;
    collapseIcon: any;
    collapseText: any;
    expandEnabled: boolean;
    expandIcon: any;
    expandText: any;
    lines: number;
    tooltipEnabled: boolean;
    tooltipPlacement: any;
    tooltipText: any;
  };
  cellWidth?: undefined;
})[];
export declare const errorTableHelpState: (intl: any) => {
  heading: any;
  icon: string;
};
export declare const ERROR_TABLE_PAGE_SIZE = 10;
