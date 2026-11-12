/* Partner approval hub: Approve / Request changes -> the approval form, prefilled (partner, item, decision). Config in hub-config.js. */
(function () {
  var H = window.HUB || {};
  function url(item, decision) {
    var q = [[H.params.partner, H.partner], [H.params.item, item], [H.params.decision, decision]]
      .map(function (p) { return encodeURIComponent(p[0]) + "=" + encodeURIComponent(p[1]); }).join("&");
    return H.formUrl + (H.formUrl.indexOf("?") < 0 ? "?" : "&") + q;
  }
  var modal = document.createElement("div");
  modal.className = "modal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true");
  modal.innerHTML = '<div class="sheet"><header><b id="hub-mt"></b><button class="x" type="button" aria-label="Close">×</button></header>' +
    '<iframe title="Your answer" loading="lazy"></iframe></div>';
  document.body.appendChild(modal);
  var fr = modal.querySelector("iframe"), mt = modal.querySelector("#hub-mt");
  function close() { modal.classList.remove("open"); fr.src = "about:blank"; document.body.style.overflow = ""; }
  modal.querySelector(".x").onclick = close;
  modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  function open(item, decision, label) {
    mt.textContent = item + (label ? " · " + label : "");
    fr.src = url(item, decision); modal.classList.add("open"); document.body.style.overflow = "hidden";
  }
  window.hubOpen = open;
  // decision bar on preview pages
  var title = (H.items || {})[document.body.getAttribute("data-item")] || document.title.split("·")[0].trim();
  [].forEach.call(document.querySelectorAll(".decide"), function (d) {
    d.innerHTML = '<div class="wrap"><div><p class="eyebrow" style="color:#fff;opacity:.7">Your call</p><h3>Is “' + title +
      '” good to go?</h3></div><div class="row"><button class="btn btn-red" data-decide="' + H.values.approve + '" data-item="' + title +
      '">Approve</button><button class="btn btn-ghost" data-decide="' + H.values.change + '" data-item="' + title + '">Request change</button></div></div>';
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-decide]");
    if (!b) return;
    e.preventDefault(); open(b.getAttribute("data-item"), b.getAttribute("data-decide"), b.getAttribute("data-label"));
  });
})();
