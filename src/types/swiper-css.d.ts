// Ambient declarations for Swiper's CSS side-effect imports.
//
// Swiper ships these as `.css` files with matching `.css.d.ts` ambient
// declarations, and a command-line `tsc` build resolves them via the package
// export map. The VS Code TypeScript language server can intermittently fail to
// resolve those export-map `types` entries and report TS2882
// ("Cannot find module or type declarations for side-effect import").
//
// Declaring the modules here makes resolution deterministic for both the editor
// and the compiler, so the imports in Carousel.tsx never surface as errors.

declare module "swiper/css";
declare module "swiper/css/bundle";
declare module "swiper/css/a11y";
declare module "swiper/css/autoplay";
declare module "swiper/css/controller";
declare module "swiper/css/effect-cards";
declare module "swiper/css/effect-coverflow";
declare module "swiper/css/effect-creative";
declare module "swiper/css/effect-cube";
declare module "swiper/css/effect-fade";
declare module "swiper/css/effect-flip";
declare module "swiper/css/free-mode";
declare module "swiper/css/grid";
declare module "swiper/css/hash-navigation";
declare module "swiper/css/history";
declare module "swiper/css/keyboard";
declare module "swiper/css/manipulation";
declare module "swiper/css/mousewheel";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/parallax";
declare module "swiper/css/scrollbar";
declare module "swiper/css/thumbs";
declare module "swiper/css/virtual";
declare module "swiper/css/zoom";