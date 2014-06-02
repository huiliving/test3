<script type="text/javascript">
    $(document).ready(function() {
        $("#browser").treeview();

        $("#selectAuthentication").change(function() {
            if ($(this).val() == "windows") {
                $("#txtUserName,#txtPassword").css("background-color", "#eee");
                $("#txtUserName,#txtPassword").attr("disabled", "disabled");
            } else {
                $("#txtUserName,#txtPassword").css("background-color", "#fff");
                $("#txtUserName,#txtPassword").removeAttr("disabled");
            }
        });

        $("#txtServer").focus(function() { $("#poper").fadeIn("fast"); });

        $("#poper").css({ "top": $("#txtServer").outerHeight() + 1, "width": $("#txtServer").outerWidth() });

        $("#layer_close").click(function() {
            $(this).parent().parent().fadeOut("fast");
        });

        $("#loadServer").click(function() {
            $.ajax({
                type: "get",
                dataType: "text",
                timeout: 300000,
                url: "ashx/Handler.ashx",
                data: "flag=server",
                beforeSend: function() { $("#loadServer").fadeOut("fast"); $("#poper .first").html("<img src='images/ajax-loader.gif' title='正在加载中，请稍后……' />正在加载中，请稍后……") },
                success: function(data) {
                    if (data == "error") {
                        $("#poper .first").html("<font color=red>服务列表加载失败，请刷新重新加载</font>");
                    } else if (data == "empty") {
                        $("#poper .first").html("<font color=red>没有数据，请手动填写</font>");
                    } else {
                        $("#poper .first").remove();
                        $("#poper").append(data);
                        alink();
                    }
                },
                error: function() { $("#poper .first").html("<font color=red>系统发生错误，请联系管理员！</font>"); }
            });
        });
    })


    $("#btnConnect").click(function() {
        if ($("#selectAuthentication").val() == "sql") { //SQL Server Authentication
            if ($("#txtServer").val().length < 1) {
                $("#message").css("color", "red"); $("#message").html("请输入Server name");
            } else if ($("#txtUserName").val().length < 1) {
                $("#message").css("color", "red"); $("#message").html("请输入Login");
            } else if ($("#txtPassword").val().length < 1) {
                $("#message").css("color", "red"); $("#message").html("请输入Password");
            } else {
                $.ajax({
                    type: "get",
                    dataType: "text",
                    timeout: 300000,
                    url: "ashx/Handler.ashx",
                    data: "flag=login&sqlServer=" + encodeURIComponent($("#txtServer").val()) + "&user=" + encodeURIComponent($("#txtUserName").val()) + "&password=" + encodeURIComponent($("#txtPassword").val()),
                    beforeSend: function() { $("#message").css("color", "#5aa608"); $("#message").html("<img src='images/ajax-loader.gif' title='正在加载中，请稍后……' />正在验证，请稍后……"); },
                    success: function(data) {
                        if (data == "True") {
                            $("#message").html("");
                            hideLogin();
                            $("#browser").fadeIn("fast");
                        }
                    },
                    error: function() { $("#message").css("color", "red"); $("#message").html("登录失败"); }
                });
            } 
        }
    });

    $(function() {
        var screenwidth, screenheight, mytop, getPosLeft, getPosTop
        screenwidth = $(window).width();
        screenheight = $(window).height();
        //获取滚动条距顶部的偏移
        mytop = $(document).scrollTop();
        //计算弹出层的left
        getPosLeft = screenwidth / 2 - 200;
        //计算弹出层的top
        getPosTop = screenheight / 2 - 150;
        //css定位弹出层
        $("#login").css({ "left": getPosLeft, "top": getPosTop });
        //当浏览器窗口大小改变时
        $(window).resize(function() {
            screenwidth = $(window).width();
            screenheight = $(window).height();
            mytop = $(document).scrollTop();
            getPosLeft = screenwidth / 2 - 200;
            getPosTop = screenheight / 2 - 150;
            $("#login").css({ "left": getPosLeft, "top": getPosTop + mytop });
        });
        //当拉动滚动条时，弹出层跟着移动
        $(window).scroll(function() {
            screenwidth = $(window).width();
            screenheight = $(window).height();
            mytop = $(document).scrollTop();
            getPosLeft = screenwidth / 2 - 200;
            getPosTop = screenheight / 2 - 150;
            $("#login").css({ "left": getPosLeft, "top": getPosTop + mytop });
        });
        //点击关闭按钮
        $("#login_close").click(function() {
            hideLogin();
        });

        $("#btnOK").click(function() {
            $("#login").fadeOut("slow");
            $("#browser").fadeIn("slow");
            //删除变灰的层
            $("#greybackground").remove();
            return false;
        });
        $.get("ashx/Handler.ashx?flag=islogin", function(data) {
            if (data == "True") {//没有登录，显示登录框
                hideLogin();
            } else {
                showLogin();
            }
        });
    });

    function showLogin() {//显示登陆框
        $("#login").fadeIn("slow");
        //获取页面文档的高度
        var docheight = $(document).height();
        //追加一个层，使背景变灰
        $("body").append("<div id='greybackground'></div>");
        $("#greybackground").css({ "opacity": "0.5", "height": docheight });
        return false;
    }
    function hideLogin() {
        $("#login").fadeOut("slow");
        //删除变灰的层
        $("#greybackground").remove();
        return false;
    }
    function alink() {//生成的a追加click事件
        $("#poper .second a").each(function() {
            $(this).click(function() {
                var a = $(this).html();
                $("#txtServer").val(a);
            });
        });
    }
</script>
