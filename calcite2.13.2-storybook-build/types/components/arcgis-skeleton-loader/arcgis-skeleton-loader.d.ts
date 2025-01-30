/**
 * @slot default - A slot for adding additional content. It is the responsibility of the consumer to style this content, likely with \@apply hub-loading;
 */
export declare class ArcgisSkeletonLoader {
  /**
   * Should the component be rendered
   *
   * @memberof ArcgisSkeletonLoader
   */
  active: boolean;
  /**
   * Should the thumbnail placeholder be rendered
   *
   * @memberof ArcgisSkeletonLoader
   */
  showThumbnail: boolean;
  /**
   * Should the heading placeholder be rendered
   *
   * @memberof ArcgisSkeletonLoader
   */
  showHeading: boolean;
  /**
   * How many heading rows to render
   *
   * @memberof ArcgisSkeletonLoader
   */
  headingRows: number;
  /**
   * The number of row placeholders to be rendered
   *
   * @memberof ArcgisSkeletonLoader
   */
  rows: number;
  /**
   * Should the footer placeholder be rendered
   *
   * @memberof ArcgisSkeletonLoader
   */
  showFooter: boolean;
  renderRows(rows: number, className: any): any[];
  render(): any;
}
