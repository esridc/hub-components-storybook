// CKEditor5 uses a different translation pattern than hub-components and it's build process only allows
// for a single language to be bundled, see https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/ui/localization.html#known-limitations.
//
// Individual translation files are .js script files that extend window.CKEDITOR_TRANSLATIONS with their respective
// strings. The build bundles en translations by default; we need to import the translation files for each additionally
// supported language here.
//
// TODO: explore if it's possible to make these assets and load only the translations for the current locale
import '@esri/hub-ckeditor5-custom-build/build/translations/ar';
import '@esri/hub-ckeditor5-custom-build/build/translations/bg';
import '@esri/hub-ckeditor5-custom-build/build/translations/bs';
import '@esri/hub-ckeditor5-custom-build/build/translations/ca';
import '@esri/hub-ckeditor5-custom-build/build/translations/cs';
import '@esri/hub-ckeditor5-custom-build/build/translations/da';
import '@esri/hub-ckeditor5-custom-build/build/translations/de';
import '@esri/hub-ckeditor5-custom-build/build/translations/el';
import '@esri/hub-ckeditor5-custom-build/build/translations/es';
import '@esri/hub-ckeditor5-custom-build/build/translations/et';
import '@esri/hub-ckeditor5-custom-build/build/translations/fi';
import '@esri/hub-ckeditor5-custom-build/build/translations/fr';
import '@esri/hub-ckeditor5-custom-build/build/translations/he';
import '@esri/hub-ckeditor5-custom-build/build/translations/hr';
import '@esri/hub-ckeditor5-custom-build/build/translations/hu';
import '@esri/hub-ckeditor5-custom-build/build/translations/id';
import '@esri/hub-ckeditor5-custom-build/build/translations/it';
import '@esri/hub-ckeditor5-custom-build/build/translations/ja';
import '@esri/hub-ckeditor5-custom-build/build/translations/ko';
import '@esri/hub-ckeditor5-custom-build/build/translations/lt';
import '@esri/hub-ckeditor5-custom-build/build/translations/lv';
import '@esri/hub-ckeditor5-custom-build/build/translations/nb';
import '@esri/hub-ckeditor5-custom-build/build/translations/nl';
import '@esri/hub-ckeditor5-custom-build/build/translations/pl';
import '@esri/hub-ckeditor5-custom-build/build/translations/pt-br';
import '@esri/hub-ckeditor5-custom-build/build/translations/pt';
import '@esri/hub-ckeditor5-custom-build/build/translations/ro';
import '@esri/hub-ckeditor5-custom-build/build/translations/ru';
import '@esri/hub-ckeditor5-custom-build/build/translations/sk';
import '@esri/hub-ckeditor5-custom-build/build/translations/sl';
import '@esri/hub-ckeditor5-custom-build/build/translations/sr';
import '@esri/hub-ckeditor5-custom-build/build/translations/sv';
import '@esri/hub-ckeditor5-custom-build/build/translations/th';
import '@esri/hub-ckeditor5-custom-build/build/translations/tr';
import '@esri/hub-ckeditor5-custom-build/build/translations/uk';
import '@esri/hub-ckeditor5-custom-build/build/translations/vi';
import '@esri/hub-ckeditor5-custom-build/build/translations/zh-cn';
import '@esri/hub-ckeditor5-custom-build/build/translations/zh';
