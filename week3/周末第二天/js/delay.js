/**
 * Created by ���� on 2017/5/14.
 */
//��ȡ���� ajax
var dataAry = null;
var xhr = new XMLHttpRequest();
xhr.open("GET", "js/data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        dataAry = public.toJsonObj(xhr.responseText);
    }
};
xhr.send(null);

//������ ES6ģ���ַ���
//
var htmlStr = ``;
for (var i = 0; i < dataAry.length; i++) {
    htmlStr += `
    <li><div>
    <img src="" data-src="${dataAry[i].src}"  alt=""/>
    </div>
    <div><h2>${dataAry[i].title}</h2>
    <p>${dataAry[i].desc}</p>
    </div></li>
    `
};
var news = document.getElementById("news");
news.innerHTML = htmlStr;


function delayLoad() {
    //this�����ӳټ��ص���һ��ͼƬ
    if(this.isLoad)return;
    var _this = this;
    var _H = public.win("clientHeight") + public.win("scrollTop");
    var _h = this.parentNode.offsetHeight + public.offset(this.parentNode).top;
    if (_H > _h) {
        var imgCur = document.createElement("img");
        imgCur.src = this.getAttribute("data-src");
        //imgCur.onload,ֻҪͼƬ�ĵ�ַ�ܼ��س����ʹ�������¼�,
        this.isLoad=true;
        imgCur.onload = function () {
            _this.src = this.src;
            fadeIn.call(_this);
        }
    }
};


window.onscroll = allLoad;
function allLoad() {
    var imgList = news.getElementsByTagName("img");
    for (var i = 0; i < imgList.length; i++) {
        delayLoad.call(imgList[i]);
    }
};
allLoad();

function fadeIn(){
    //this ���������ӳټ��ص�ͼƬ,������������
    var _this=this,timer=null,n=0;
    timer=window.setInterval(function(){
        n+=0.05;
        if(n>=1){
            public.css(_this,"opacity",1);
            window.clearInterval(timer);
            return;
        }
        public.css(_this,"opacity",n)
    },20)
}