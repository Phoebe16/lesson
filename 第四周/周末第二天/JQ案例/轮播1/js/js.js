/**
 * Created by ���� on 2017/5/21.
 */
$(function(){
    $.ajax({
        type:"GET",
        url:"data.txt?$="+new Date().getTime(),
        dataType:"json",
        async :false,
        data:null,
        success:function(data){
            console.log("success!");
            window.data=data;
        },
        error:function(){
            console.log("error!!");
        }
    });
    console.log(data);

    //Ĭ���õ�һ����ʾ
    display($("#rotmenu li:first"));
    //�Զ��ֲ�
    window.step=0;
    window.timer=window.setInterval(move,3000);
    function move(){
        step++;
        if(step==$("#rotmenu").children().length){
            //step==$("#rotmenu").children().size()
            step=0;
            //display($("#rotmenu li[class=li"+step+"]"));
            //return;
        }
        //ÿ��ִ�ж������Ǹ�Li������,����Ϊstep���Ǹ�li,��������class="li"+step;
        display($("#rotmenu li[class=li"+step+"]"));
    }
    function display($ele){
        //Ҫ���㴫�������Ǹ�JQ����
        //$ele���Ƕ�Ӧ���Ǹ�ִ�ж�����li,�����Ǹ�JQ����

        //�õ�ǰli�е�a��ǩִ�ж���(marginRight:20px).Ȼ������������li�е�a��ǩ��Ϊ,Ĭ��״̬
        //���ڵ�JQ������A��ǩ,�������ҵ�a��ǩ�ĸ���li,����li���ֵ���,Ȼ���ֵ��������a��ǩ,�����ǻص���ʼ״̬
        $ele.children("a").stop().animate({marginRight:20},400,function(){
            $(this).animate({opacity:1},700);
            //�л�ͼƬ,�ҵ�rot1�����img������src���Ըı�ɵ�ǰ��Ӧ��data�е�image�����е�ֵ,��������opacity���0 ,���𽥱��1
            $("#rot1").children("img").prop("src",data[step]["image"]).css({opacity:0}).stop().animate({opacity:1},2000);
            //heading��ʾ,����heading��ȥ,Ȼ���ڽ������h1��ǩ�����ּ���(��data�е�"heading"������),������������˶�����
            $("#rot1 .heading").stop().animate({left:-420},700,"easeOutCirc",function(){
                //��ȡ$this�е�h��ǩ
                $("h1",$(this)).html(data[step]["heading"]);
                //"easeInOutQuad"JQ�еĶ���
                $(this).animate({left:0},400,"easeInOutQuad")
            });
            //description ��ʾ: ��������ȥ,Ȼ��������p��ǩ�ϼ�������(data["description"]),����������
            $("#rot1 .description").stop().animate({bottom:-270},700,"easeOutCirc",function(){
                $("p",$(this)).html(data[step]["description"]);
                $(this).stop().animate({bottom:0},400,"easeInOutQuad")
            })

        }).parent().siblings().find("a").stop().animate({marginRight:-20},400,function(){
            $(this).animate({opacity:0.6},700);
        })
    }
});