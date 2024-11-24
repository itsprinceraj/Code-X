//  crate a toggle class function ;

export const toggle = (element, className) => {
  const ele = document.querySelector(element);
  ele.classList.toggle(className);
};
