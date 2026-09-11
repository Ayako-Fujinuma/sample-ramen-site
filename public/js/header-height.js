// デザイン案2〜5共通：ヘッダー(ロゴ+ナビ)の実際の高さを --header-h に反映する。
// 画面幅によってロゴとナビが2段になっても、ヒーロー等がヘッダーと重ならないようにするため。
(() => {
  const headers = document.querySelectorAll(".js-dynamic-header");
  if (!headers.length) return;

  const apply = () => {
    headers.forEach((header) => {
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    });
  };

  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("load", apply);
})();
