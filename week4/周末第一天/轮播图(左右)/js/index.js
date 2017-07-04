/**
 * Created by ���� on 2017/5/20.
 */
var banner=document.getElementById("banner");
var bannerInner=banner.getElementsByClassName("bannerInner")[0];
var focusList=banner.getElementsByClassName("focusList")[0];
//var left=banner.getElementsByTagName("a")[0];
//var right=banner.getElementsByTagName("a")[1];
var leftBtn=public.children(banner,"a")[0];
var rightBtn=public.children(banner,"a")[1];

var imgList=bannerInner.getElementsByTagName("img");
var list=focusList.getElementsByTagName("li");

//��ȡ����
function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open("get","data.txt?ss="+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            window.data=public .toJsonObj(xhr.responseText);
        }
    };
    xhr.send(null);
}
getData();

//ѭ��������
function bindData(){
    if(window.data&&window.data.length>0){
        var str1=``,str2=``;
        for(var i=0;i<data.length;i++){
            //�ֲ�����
            str1+=`<div><img src="" photo="${data[i].src}" alt=""/></div>`;
            //��������,�ж�Ϊ��һ����ʱ�����Ĭ��ѡ�е���ʽ
            str2+=i===0?`<li class="selected"></li>`:`<li></li>`;
        }
        //Ϊ��ʵ���޷����,��������һ������һ��һ��������
        str1+=`<div><img src="" photo="${data[0].src}" alt=""/></div>`;
        //�ȸ�bannerInner���ÿ��
        public .css(bannerInner,{width:(data.length+1)*800});
        bannerInner.innerHTML=str1;
        focusList.innerHTML=str2;
    }
}
bindData();

//�ӳټ���ͼƬ
function delayLoad(){
    for(var i=0;i<imgList.length;i++){
        var curImg=document.createElement("img");
        curImg.src=imgList[i].getAttribute("photo");
        curImg.i=i;
        curImg.onload=function(){
            imgList[this.i].src=this.src;
            animation(imgList[this.i],{opacity:1},1000)
        }
    }
}
delayLoad();

//�Զ��ֲ�
var step=0;
var timer=window.setInterval(move,2000);
function move(){
    if(step==data.length){
        step=0;
        public .css(bannerInner,"left",-step*800);
        //public .css(bannerInner,"left",0)
    }
    step++;
    animation(bannerInner,{left:-step*800},1000,function(){
        isOkClick=true;
    });
    focusAlign();
}
//�������
function focusAlign(){
    for(var i=0;i<list.length;i++){
        step==data.length?list[0].className="selected":null;
        list[i].className=i==step?"selected":"";
    }
}

//��껬���¼�
banner.onmouseover=function(){
    window.clearInterval(timer);
    public .css(leftBtn,{display:"block"});
    public .css(rightBtn,{display:"block"});
};
banner.onmouseout=function(){
   timer=window.setInterval(move,2000) ;
    public .css(leftBtn,{display:"none"});
    public .css(rightBtn,{display:"none"});
};
//�����л��¼�
var isOkClick=true;
rightBtn.onclick=function(){
    if(isOkClick){
        isOkClick=false;
        move()
    }
};
leftBtn.onclick=function(){
    if(isOkClick){
        isOkClick=false;
        if(step==0){
            step=data.length;
            public.css(bannerInner,{left:-step*800});
        }
        step--;
        animation(bannerInner,{left:-step*800},1000,function(){
            isOkClick=true;
        });
        focusAlign();
    }
};

//������
for(var i=0;i<list.length;i++){
    //step=i;
    list[i].i=i;
    list[i].onclick=function(){
        if(isOkClick){
            isOkClick=false;
            step=this.i;
            animation(bannerInner,{left:-step*800},1000,function(){
                isOkClick=true;
            });
            focusAlign();
        }
    }
}

