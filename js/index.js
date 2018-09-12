$(function () {


    /**
     * s数组初始化
     */
    var arr=new Array(57);
    for(var j=0;j<arr.length;j++)
    {
        arr[j]=0;
    }
    /**
     * 页面加载时答卷显示效果
     */
    for(var i=0;i<57;i++)
    {
        if(i==0)
        $(".juan").append('<div>写</div>');
        else if(i==56)
            $(".juan").append('<div>译</div>');
        else
            $(".juan").append('<div>'+i+'</div>');
    }
    $("select").change(function (e) {

        var i=$(this).attr('id');
        var option=$("#"+i).find("option:selected").val();
        juan(i,option);



    })




    /**
     * 判断选择的是第几个
     */

    $("input:radio").each(function (index) {
        var _this=this;
        $(this).click(function () {
            var index=$(_this).attr('name');
            var values=$(_this).val();
            juan(index,values);

        });
    })

    /**
     * \卷面
     * @param index
     * @param values
     */
    function juan(index,values) {

        $(".juan div").each(function (num) {
            if(num==index)
            {if(index==0||index==56){
                arr[index]=values;
                $(this).css('background-color','gray');
            }

                else
            {
                arr[index]=values;
                $(this).css('background-color','gray');
                $(this).text(index+values);
            }

            }
        })


    }

    /**
     * 导航栏跳转
     */


    $(".nav-item").each(function (index) {

        $(this).click(function () {
            panduan();
            if(index==0)
            {

                $("#write").css('display','block');
                $("#listen").css('display','none');
                $("#wanxing").css('display','none');
                $("#long").css('display','none');
                $("#care").css('display','none');
                $("#translation").css('display','none');
            } if(index==1)
            {

                $("#write").css('display','none');
                $("#listen").css('display','block');
                $("#wanxing").css('display','none');
                $("#long").css('display','none');
                $("#care").css('display','none');
                $("#translation").css('display','none');
            }
            if(index==2){
                $("#write").css('display','none');
                $("#listen").css('display','none');
                $("#wanxing").css('display','block');
                $("#long").css('display','none');
                $("#care").css('display','none');
                $("#translation").css('display','none');
            }
            if(index==3){
                $("#write").css('display','none');
                $("#listen").css('display','none');
                $("#wanxing").css('display','none');
                $("#long").css('display','block');
                $("#care").css('display','none');
                $("#translation").css('display','none');
            }
            if(index==4){
                $("#write").css('display','none');
                $("#listen").css('display','none');
                $("#wanxing").css('display','none');
                $("#long").css('display','none');
                $("#care").css('display','block');
                $("#translation").css('display','none');
            } if(index==5){
                $("#write").css('display','none');
                $("#listen").css('display','none');
                $(".wanxing").css('display','none');
                $("#long").css('display','none');
                $("#care").css('display','none');
                $("#translation").css('display','block');
            }
        })
    })


    /**
     * 滚动屏幕
     * @type {*|jQuery}
     */


    var begin = $(document).scrollTop();
        $(window).on('scroll', function () {

            if ($(document).scrollTop() > begin) {
                $("nav").fadeOut('slow');
            } else {
                $("nav").fadeIn('slow');

            }
        })



        /**
     * 判断写作翻译
     */
    function panduan(){
        var write=$("#text1").val();
        var trans=$("#text").val();
        if(write!='')
        {
            arr[0]=1;
            juan(0,"ok");

        }
        if(trans!='')
        {
            arr[56]=1;
            juan(56,"ok");
        }

    }
    /**
     * 上下级跳转
     */

    $(".next").click(function () {
panduan();

        $("#write").css('display','none');
        $("#listen").css('display','none');
        $("#wanxing").css('display','none');
        $("#long").css('display','none');
        $("#care").css('display','none');
        $("#translation").css('display','none');

        var parents=$(this).parent().parent().parent().attr('id');
        // alert(parents);
        $("#body").append($('#'+parents).clone());
        $("#body li:eq(0)").remove();
        $("#body li:eq(0)").css('display','block');
        // alert( $("#body li:eq(0)").attr('id'));


        })


    /**
     * 时钟
//      */
clock();
    function clock() {
        var date=new Date();
        var nDate=new Date('2018/9/12,19:00:0');
        var time=parseInt((nDate.getTime()-date.getTime())/1000);
        var hour=parseInt(time/(60*60)%24);
        var mi=parseInt(time/60%60);
        var se=parseInt(time%60);
        var str="<span>"+ hour+":"+mi+":"+ se+"<span/>";
        $(".clock a").html($(str))
    }
    setInterval(clock,1000);




    /**
     * 交卷
     */

    $(".submit").click(function () {
        $(".alert").css('display','block');
       //  var write=$("#text1").val();
       //  var trans=$("#text").val();
       // if(write!='')
       // {
       //     arr[0]=1;
       //     juan(0,"ok");
       //
       // }
       //  if(trans!='')
       //  {
       //      arr[56]=1;
       //      juan(56,"ok");
       //  }
        //判断是否做完
        var success=true;
        var txt='';

        for(var i=0;i<arr.length;i++)
        {
            if(arr[i]==0){
                success=false;
                txt=txt+i+',';

            }

        }
        if(success==false)
        {
            $(".alert").css({
                width:'80%',
                left:'10%',

            });
            $(".alert h2").text("以下试题未完成！确认提交？");
            $(".alert p").text(txt);
            $(".yes").click(function () {
                window.location='message.html';

            })
            $(".no").click(function () {
                $(".alert").css('display','none');

            })
        }

        else
        {
            $(".alert button").css('display','none');
            window.location='message.html';

        }



    })

})

