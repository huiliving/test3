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
                beforeSend: function() { $("#loadServer").fadeOut("fast"); $("#poper .first").html("<img src='images/ajax-loader.gif' title='���ڼ����У����Ժ󡭡�' />���ڼ����У����Ժ󡭡�") },
                success: function(data) {
                    if (data == "error") {
                        $("#poper .first").html("<font color=red>�����б����ʧ�ܣ���ˢ�����¼���</font>");
                    } else if (data == "empty") {
                        $("#poper .first").html("<font color=red>û�����ݣ����ֶ���д</font>");
                    } else {
                        $("#poper .first").remove();
                        $("#poper").append(data);
                        alink();
                    }
                },
                error: function() { $("#poper .first").html("<font color=red>ϵͳ������������ϵ����Ա��</font>"); }
            });
        });
    })


    $("#btnConnect").click(function() {
        if ($("#selectAuthentication").val() == "sql") { //SQL Server Authentication
            if ($("#txtServer").val().length < 1) {
                $("#message").css("color", "red"); $("#message").html("������Server name");
            } else if ($("#txtUserName").val().length < 1) {
                $("#message").css("color", "red"); $("#message").html("������Login");
            } else if ($("#txtPassword").val().length < 1) {
                $("#message").css("color", "red"); $("#message").html("������Password");
            } else {
                $.ajax({
                    type: "get",
                    dataType: "text",
                    timeout: 300000,
                    url: "ashx/Handler.ashx",
                    data: "flag=login&sqlServer=" + encodeURIComponent($("#txtServer").val()) + "&user=" + encodeURIComponent($("#txtUserName").val()) + "&password=" + encodeURIComponent($("#txtPassword").val()),
                    beforeSend: function() { $("#message").css("color", "#5aa608"); $("#message").html("<img src='images/ajax-loader.gif' title='���ڼ����У����Ժ󡭡�' />������֤�����Ժ󡭡�"); },
                    success: function(data) {
                        if (data == "True") {
                            $("#message").html("");
                            hideLogin();
                            $("#browser").fadeIn("fast");
                        }
                    },
                    error: function() { $("#message").css("color", "red"); $("#message").html("��¼ʧ��"); }
                });
            } 
        }
    });

    $(function() {
        var screenwidth, screenheight, mytop, getPosLeft, getPosTop
        screenwidth = $(window).width();
        screenheight = $(window).height();
        //��ȡ�������ඥ����ƫ��
        mytop = $(document).scrollTop();
        //���㵯�����left
        getPosLeft = screenwidth / 2 - 200;
        //���㵯�����top
        getPosTop = screenheight / 2 - 150;
        //css��λ������
        $("#login").css({ "left": getPosLeft, "top": getPosTop });
        //����������ڴ�С�ı�ʱ
        $(window).resize(function() {
            screenwidth = $(window).width();
            screenheight = $(window).height();
            mytop = $(document).scrollTop();
            getPosLeft = screenwidth / 2 - 200;
            getPosTop = screenheight / 2 - 150;
            $("#login").css({ "left": getPosLeft, "top": getPosTop + mytop });
        });
        //������������ʱ������������ƶ�
        $(window).scroll(function() {
            screenwidth = $(window).width();
            screenheight = $(window).height();
            mytop = $(document).scrollTop();
            getPosLeft = screenwidth / 2 - 200;
            getPosTop = screenheight / 2 - 150;
            $("#login").css({ "left": getPosLeft, "top": getPosTop + mytop });
        });
        //����رհ�ť
        $("#login_close").click(function() {
            hideLogin();
        });

        $("#btnOK").click(function() {
            $("#login").fadeOut("slow");
            $("#browser").fadeIn("slow");
            //ɾ����ҵĲ�
            $("#greybackground").remove();
            return false;
        });
        $.get("ashx/Handler.ashx?flag=islogin", function(data) {
            if (data == "True") {//û�е�¼����ʾ��¼��
                hideLogin();
            } else {
                showLogin();
            }
        });
    });

    function showLogin() {//��ʾ��½��
        $("#login").fadeIn("slow");
        //��ȡҳ���ĵ��ĸ߶�
        var docheight = $(document).height();
        //׷��һ���㣬ʹ�������
        $("body").append("<div id='greybackground'></div>");
        $("#greybackground").css({ "opacity": "0.5", "height": docheight });
        return false;
    }
    function hideLogin() {
        $("#login").fadeOut("slow");
        //ɾ����ҵĲ�
        $("#greybackground").remove();
        return false;
    }
    function alink() {//���ɵ�a׷��click�¼�
        $("#poper .second a").each(function() {
            $(this).click(function() {
                var a = $(this).html();
                $("#txtServer").val(a);
            });
        });
    }
</script>
