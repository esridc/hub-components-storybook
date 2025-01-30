/**
 * The different editors available for configuring the appearance of a catalog.
 *
 * Collections - The editor for configuring the appearance of the collections in a catalog (position, visibility, etc)
 * Results - The editor for configuring the appearance of the search results in a catalog (corners, dropShadow, etc)
 */
export var CatalogAppearanceEditors;
(function (CatalogAppearanceEditors) {
  CatalogAppearanceEditors["Collections"] = "collections";
  CatalogAppearanceEditors["Results"] = "results";
})(CatalogAppearanceEditors || (CatalogAppearanceEditors = {}));
