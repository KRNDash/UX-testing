// ("use strict");

//Navigation

function app() {
  let body: HTMLBodyElement | null | undefined = undefined;
  let menu: Element | null | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let menuItems = undefined;
  const init = function init() {
    body = document.querySelector("body");
    menu = document.querySelector(".menu-icon");
    menuItems = document.querySelectorAll(".nav__list-item");
    applyListeners();
  };
  const applyListeners = function applyListeners() {
    menu?.addEventListener("click", function () {
      return toggleClass(body, "nav-active");
    });
  };
  const toggleClass = function toggleClass(
    element: HTMLBodyElement | null | undefined,
    stringClass: string
  ) {
    if (element?.classList.contains(stringClass))
      element?.classList.remove(stringClass);
    else element?.classList.add(stringClass);
  };
  init();
}
