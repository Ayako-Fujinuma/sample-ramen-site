(() => {
  // ハンバーガーナビの開閉
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 臨時休業のお知らせ
  // public/js/notices.json に { "date": "YYYY-MM-DD", "message": "..." } を
  // 追加/削除するだけで、上部バナーと営業時間セクションに反映されます。
  fetch("js/notices.json")
    .then((res) => (res.ok ? res.json() : []))
    .then((notices) => {
      if (!Array.isArray(notices) || notices.length === 0) return;

      const banner = document.getElementById("noticeBanner");
      const bannerList = document.getElementById("noticeList");
      const hoursNotice = document.getElementById("hoursNotice");
      const hoursNoticeList = document.getElementById("hoursNoticeList");

      notices.forEach((notice) => {
        if (!notice || !notice.message) return;

        const bannerItem = document.createElement("li");
        bannerItem.innerHTML = `<span class="notice-date">${notice.date ?? ""}</span>${notice.message}`;
        bannerList.appendChild(bannerItem);

        const hoursItem = document.createElement("li");
        hoursItem.textContent = notice.date ? `${notice.date}：${notice.message}` : notice.message;
        hoursNoticeList.appendChild(hoursItem);
      });

      banner.hidden = false;
      hoursNotice.hidden = false;
    })
    .catch(() => {
      // お知らせの取得に失敗しても通常表示は継続する
    });
})();
