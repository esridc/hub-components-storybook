import { h } from './index-57f71b44.js';

const Breadcrumbs = ({ breadcrumbs, onClick }) => {
  return breadcrumbs.map((breadcrumb, index) => {
    const { title, icon, link, label } = breadcrumb;
    const cssClass = link ? '' : 'non-interactive';
    const labelText = label ? label : title;
    // the last item should be active and not show a trailing breadcrumb icon
    const isLast = index === breadcrumbs.length - 1;
    return (
    // eslint-disable-next-line react/jsx-key
    h("calcite-menu-item", { active: isLast, "aria-current": isLast ? 'page' : null, breadcrumb: !isLast, class: cssClass, href: link, "icon-start": icon, label: labelText, onClick: onClick, text: title, "text-enabled": true }));
  });
};

export { Breadcrumbs as B };
