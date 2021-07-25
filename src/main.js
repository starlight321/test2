import styles1 from "../assets/index.css";
import styles2 from "../assets/index.less";

const test = (text, class1, class2) => {
  const element = document.createElement("div");
  element.innerHTML = text;
  element.className = class1;
  const p = document.createElement("p");
  p.innerHTML = "This is P";
  p.className = class2;
  element.appendChild(p);
  document.body.appendChild(element);
};

console.log(styles1.class1)
console.log(styles2.class1)
test("test", styles1.class1, styles2.class1);
