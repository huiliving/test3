function addLoadEvent(func) {
 var oldonload = window.onload;
 if (typeof window.onload != 'function') {
  window.onload = func;
 } else {
  window.onload = function() {
  oldonload();
  func();
  }
 }
}
function insertAfter(newelement,existingelement) {
 var parentelement = existingelement.parentNode;
 if (parentelement.lastChild == existingelement) {
  return parentelement.appendChild(newelement);
 } else {
  return
 parentelement.insertBefore(newelement,existingelement.nextSibling);
 }
}
function makeSlideshow(details,coords,linkholder) {
 if (!document.getElementById) return false;
 if (!document.getElementById(linkholder)) return false;
 var pane = document.createElement('div');
 pane.style.width = details['width'];
 pane.style.height = details['height'];
 pane.style.overflow = 'hidden';
 pane.style.position = 'relative';
 pane.style.top = '0px';
 pane.style.left = '10px';
 pane.setAttribute('id','descrizione');
 var pic = document.createElement('img');
 pic.setAttribute('id',details['id']);
 pic.setAttribute('src',details['image']);
 pic.setAttribute('alt','');
 pic.style.position = 'absolute';
 pane.appendChild(pic);
 var l_beni = document.getElementById(linkholder);
 l_beni.parentNode.insertBefore(pane,l_beni);
 var lnks = l_beni.getElementsByTagName('a');
 for (var i=0;i<lnks.length;i++) {
  var linktext = lnks[i].childNodes[0].nodeValue;
  if (coords[linktext]) {
   lnks[i].elementId = details['id'];
   lnks[i].x = coords[linktext][0];
   lnks[i].y = coords[linktext][1];
   lnks[i].sliding = null;
   lnks[i].onmouseover = function() {
    slideElement(this.elementId,this.x,this.y,6);
   }
   lnks[i].onfocus = lnks[i].onmouseover;
  }
 }
}
function slideElement(elementId,x,y,inc) {
 if (!document.getElementById) return false;
 if (!document.getElementById(elementId)) return false;
 var element = document.getElementById(elementId);
 if (element.sliding) clearTimeout(element.sliding);
 if (!element.xpos) element.xpos = 0;
 if (!element.ypos) element.ypos = 0;
 if (element.xpos == x && element.ypos == y) return true;
 if (element.xpos > x) {
  var dist = Math.ceil((element.xpos-x)/inc);
  element.xpos = element.xpos - dist;
 }
 if (element.xpos < x) {
  var dist = Math.ceil((x-element.xpos)/inc);
  element.xpos = element.xpos + dist;
 }
 if (element.ypos > y) {
  var dist = Math.ceil((element.ypos-y)/inc);
  element.ypos = element.ypos - dist;
 }
 if (element.ypos < y) {
  var dist = Math.ceil((y-element.ypos)/inc);
  element.ypos = element.ypos + dist;
 }
 element.style.left = element.xpos+'px';
 element.style.top = element.ypos+'px';
 element.sliding = setTimeout('slideElement("'+elementId+'",'+x+','+y+','+inc+')',10);
}
/* Focus Beni */
addLoadEvent(showbeni);
function showbeni() {
 if (!document.getElementById) return false;
 if (!document.getElementById('beni')) return false;
 var panel_details = new Array();
 panel_details['id'] = 'pic';
 panel_details['image'] = 'images/B394852212.jpg';
 panel_details['width'] = '420px';
 panel_details['height'] = '188px';
 var coords = new Array();
 coords['default'] = new Array(0,0);
 coords['Opere e oggetti d\'arte'] = new Array(0,-188);
 coords['Architetture'] = new Array(0, -376);
 coords['Reperti archeologici'] = new Array(0,-564);
 coords['Stampe e matrici di incisione'] = new Array(0,-752);
 coords['Fotografie'] = new Array(0,-940);
 coords['Beni etnoantropologici'] = new Array(0,-1128);
 var linkholder = 'beni';
 makeSlideshow(panel_details,coords,linkholder);
}