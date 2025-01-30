'use strict';

const index = require('./index-7c083111.js');

const Breadcrumbs = ({ breadcrumbs, onClick }) => {
  return breadcrumbs.map((breadcrumb, index$1) => {
    const { title, icon, link, label } = breadcrumb;
    const cssClass = link ? '' : 'non-interactive';
    const labelText = label ? label : title;
    // the last item should be active and not show a trailing breadcrumb icon
    const isLast = index$1 === breadcrumbs.length - 1;
    return (
    // eslint-disable-next-line react/jsx-key
    index.h("calcite-menu-item", { active: isLast, "aria-current": isLast ? 'page' : null, breadcrumb: !isLast, class: cssClass, href: link, "icon-start": icon, label: labelText, onClick: onClick, text: title, "text-enabled": true }));
  });
};

exports.Breadcrumbs = Breadcrumbs;
