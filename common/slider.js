// slider.js 原生侧边栏
let headImg = document.createElement('img');
headImg.src = "https://upload.jianshu.io/users/upload_avatars/6967071/d0281db2-88fd-4a93-8b14-c89f0649c718.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120";

let name = document.createElement('h3');
name.innerText = "Cythia's Blog";
let childDiv = document.createElement('div');
childDiv.appendChild(headImg);
childDiv.appendChild(name);
childDiv.style.cssText = "display: table-cell; vertical-align: middle; text-align: center;";

let newChild = document.createElement('div');
newChild.append(childDiv);

let parentDiv = document.getElementById('slider');
parentDiv.innerHTML = newChild.innerHTML;