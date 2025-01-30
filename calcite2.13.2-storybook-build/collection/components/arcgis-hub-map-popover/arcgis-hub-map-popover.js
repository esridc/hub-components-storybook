var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Host, h } from '@stencil/core';
import { getQuad, getExtentQuadCornerPoint, getClosestPoint } from './utils/popover';
import { intersects } from '@arcgis/core/geometry/geometryEngine';
import CallWhen from '../../decorators/call-when';
import Polygon from '@arcgis/core/geometry/Polygon';
export class ArcgisHubMapPopover {
  constructor() {
    this.target = undefined;
    this.unthemed = false;
    this.x = undefined;
    this.y = undefined;
    this.quadrant = undefined;
    this.content = undefined;
  }
  /**
   * Handles the event for a popover open request, opening the popup
   * at a best fit location in the view and rendering the content
   * @param event PopoverEventDetails
   */
  handlePopoverOpen(event) {
    event.stopPropagation();
    const { detail: popoverEventDetails } = event;
    const view = popoverEventDetails.view;
    const geometry = popoverEventDetails.geometry;
    const { left, top, height, width } = view.container.getBoundingClientRect();
    if (geometry.type === 'polygon' || geometry.type === 'polyline' || geometry.type === 'extent') {
      const extent = geometry.extent;
      const centerScreenPoint = view.toScreen(extent.center);
      this.quadrant = getQuad(centerScreenPoint, view);
      const cornerPoint = getExtentQuadCornerPoint(extent, this.quadrant);
      const lineOrPolygon = geometry.type === 'extent'
        ? Polygon.fromExtent(geometry)
        : geometry;
      const closestGeometryPoint = getClosestPoint(cornerPoint, lineOrPolygon);
      const closestGeometryScreenPoint = view.toScreen(closestGeometryPoint);
      if (closestGeometryScreenPoint.x < 0 ||
        closestGeometryScreenPoint.y < 0 ||
        closestGeometryScreenPoint.x > width ||
        closestGeometryScreenPoint.y > height) {
        // If closest geometry point is off screen
        // display pop in map center, assuming geometry is visible
        if (intersects(view.extent, geometry)) {
          const viewCenterScreenPoint = view.toScreen(view.center);
          this.quadrant = getQuad(viewCenterScreenPoint, view);
          this.x = viewCenterScreenPoint.x + left;
          this.y = viewCenterScreenPoint.y + top;
        }
        else {
          this.content = null;
          return;
        }
      }
      else {
        this.x = closestGeometryScreenPoint.x + left;
        this.y = closestGeometryScreenPoint.y + top;
      }
    }
    else if (geometry.type === 'point') {
      // Handle point
      const pointScreenPoint = view.toScreen(geometry);
      this.quadrant = getQuad(pointScreenPoint, view);
      this.x = pointScreenPoint.x + left;
      this.y = pointScreenPoint.y + top;
    }
    if (this.x < left ||
      this.x > left + width ||
      this.y < top ||
      this.y > top + height) {
      // Don't display popover is desired placement is
      // outside of map view
      this.content = null;
      return;
    }
    // Render content in popover
    this.content = popoverEventDetails.render(geometry.type);
  }
  /**
   * Handles the event to clear any existing popover content
   * @param event
   */
  handlePopoverClear(event) {
    event.stopPropagation();
    this.content = null;
  }
  /**
   * Computes styles object
   */
  get styles() {
    const { quadrant, x, y } = this;
    const transformX = (quadrant === null || quadrant === void 0 ? void 0 : quadrant.includes('right'))
      ? 'translateX(-110%)'
      : 'translateX(10%)';
    const transformY = (quadrant === null || quadrant === void 0 ? void 0 : quadrant.includes('top'))
      ? 'translateY(-25%)'
      : 'translateY(-75%)';
    return {
      // add window.scrollY to y to account for scroll position
      '--top-offset': `${y + window.scrollY}px`,
      '--left-offset': `${x}px`,
      'transform': `${transformX} ${transformY}`,
    };
  }
  render() {
    const { styles, content, unthemed } = this;
    return (h(Host, { style: styles, unthemed: unthemed }, content));
  }
  static get is() { return "arcgis-hub-map-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-popover.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-popover.css"]
    };
  }
  static get properties() {
    return {
      "target": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Optional target (string) for verifying recipient, allowing for multiple\npopovers to be rendered on-screen.  If defined, only events with matching target\nwill be displayed"
        },
        "attribute": "target",
        "reflect": false
      },
      "unthemed": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Sometimes we may want to have a popover without site themeing applied.\nAs we usually use the popover via a wormhole we need to do this."
        },
        "attribute": "unthemed",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "x": {},
      "y": {},
      "quadrant": {},
      "content": {}
    };
  }
  static get elementRef() { return "el"; }
  static get listeners() {
    return [{
        "name": "arcgisHubMapPopoverOpen",
        "method": "handlePopoverOpen",
        "target": "body",
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisHubMapPopoverClear",
        "method": "handlePopoverClear",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  CallWhen({ when(event) {
      const { target } = this;
      const { detail: { source } } = event;
      return (!target && !source) || ((target === null || target === void 0 ? void 0 : target.toLowerCase()) === (source === null || source === void 0 ? void 0 : source.toLowerCase()));
    } })
], ArcgisHubMapPopover.prototype, "handlePopoverOpen", null);
