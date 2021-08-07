import styles1 from "../assets/index.css";
import styles2 from "../assets/index.less";

import testPic from "../assets/test.png";
import vkdPic from "../assets/vkd.jpeg";
import wallPic from "../assets/wallPic.jpg";

const test = (text, class1, class2) => {
  const element = document.createElement("div");
  element.innerHTML = text;
  element.className = class1;
  const p = document.createElement("p");
  p.innerHTML = "This is P";
  p.className = class2;
  element.appendChild(p);

  const target = document.getElementById('app');
  target.innerHTML =`<img src=${testPic} /><br /><img src=${vkdPic} /><br /><img src=${wallPic} />`;
  document.body.appendChild(element);
};

console.log(styles1.class1);
console.log(styles2.class1);
test("test", styles1.class1, styles2.class1);
