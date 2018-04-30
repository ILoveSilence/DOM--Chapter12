"use strict"
//用于添加页面自动加载的函数
function addLoadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload != 'function'){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

//用于向后插入document节点
function insertAfter(newElement, targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }
  else{
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

//用于向节点添加class
function addClass(element, value){
  if(!element.className){
    element.className = value;
  }else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
  }
}

//动态添加body的id和a标签的class
function hightlightPage(){
  var headers = document.getElementsByTagName("header");
  if(headers.length == 0)return false;
  var navs = headers[0].getElementsByTagName("nav");
  if(navs.length == 0) return false;

  //取得导航链接，循环遍历
  //找到当前页面的那个，高亮显示
  var links = navs[0].getElementsByTagName("a");
  var linkurl;
  for(let i = 0;i < links.length;i++){
    linkurl = links[i].getAttribute("href");
    if(window.location.href.indexOf(linkurl) != -1){
      addClass(links[i], "here");
    }

    //顺便给每个页面的body添加id用于添加不同的header背景图片
    let linktext = links[i].lastChild.nodeValue.toLowerCase();
    document.body.setAttribute("id", linktext);
  }
}
addLoadEvent(hightlightPage);

// ===========================
//实现index页面幻灯片效果
// ===========================
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	// 添加安全检查，确保元素具有left,right属性
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.right){
		elem.style.right = "0px";
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.right);

	if(xpos == final_x && ypos == final_y){
		return true;
	}

	var dist;
	if(xpos<final_x){
		dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos>final_x){
		dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos<final_y){
		dist = Math.ceil((final_y-ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos>final_y){
		dist = Math.ceil((ypos-final_y)/10);
		ypos = ypos - dist;
	}

	elem.style.left = xpos + "px";
	elem.style.right = ypos + "px";

	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var preview = document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif")
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);

// 循环找到a标签，然后通过href值判断要显示的图片，
// 传递相应的位置参数给moveElement
  var links = document.getElementsByTagName("a");
  var destination;
  for(let i = 0;i < links.length; i++){
    links[i].onmouseover = function(){
      destination = this.getAttribute("href");
      if(destination.indexOf("index.html") != -1){
        moveElement("preview",0,0,5);
      }
      if(destination.indexOf("about.html") != -1){
        moveElement("preview",-150,0,5);
      }
      if(destination.indexOf("photos.html") != -1){
        moveElement("preview",-300,0,5);
      }
      if(destination.indexOf("live.html") != -1){
        moveElement("preview",-450,0,5);
      }
      if(destination.indexOf("contact.html") != -1){
        moveElement("preview",-600,0,5);
      }
    }
  }
}
addLoadEvent(prepareSlideshow);
