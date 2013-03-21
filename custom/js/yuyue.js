if (typeof(timer) != "undefined") {
    update = function(){}
    timer();
    window.setTimeout("timer()", 1000);
}

(function(){
    window.origOnLoad = window.onload;
    window.onload = myOnLoad;
})();
function myOnLoad() {
    if (window.origOnLoad)
        window.origOnLoad();
    modify();
}
function modify() {
    for (var i = 1; i <= 17; i++) {
        var name = "p_Appointment_app_" + i;
        $('[name=' + name + ']').attr('id', name);
    }
    $('[name="p_Appointment_phonenumber"]').attr("id", "p_Appointment_phonenumber");
//    var app1=frm.p_Appointment_app_1.value;//房屋所有权证号
//    var app2=frm.p_Appointment_app_2.value;//网签合同号
//    var app3=frm.p_Appointment_app_3.value;//契税票号
//    var app4=frm.p_Appointment_app_4.value;//卖方是否个人
//    var app5=frm.p_Appointment_app_5.value;//卖方姓名或名称
//    var app6=frm.p_Appointment_app_6.value;//卖方证件类别
//    var app7=frm.p_Appointment_app_7.value;//卖方证件号码
//    var app8=frm.p_Appointment_app_8.value;//卖方委托代理人姓名
//    var app9=frm.p_Appointment_app_9.value;//卖方委托代理人证件类别
//    var app10=frm.p_Appointment_app_10.value;//卖方委托代理人证件号码
//    var app11=frm.p_Appointment_app_11.value;//买方是否个人
//    var app12=frm.p_Appointment_app_12.value;//买方姓名或名称
//    var app13=frm.p_Appointment_app_13.value;//买方证件类别
//    var app14=frm.p_Appointment_app_14.value;//买方证件号码
//    var app15=frm.p_Appointment_app_15.value;//买方委托代理人姓名
//    var app16=frm.p_Appointment_app_16.value;//买方委托代理人证件类别
//    var app17=frm.p_Appointment_app_17.value;//买方委托代理人证件号码

    $('#p_Appointment_app_date').append('<option value="--------">--------</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-28">2013-03-28</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-29">2013-03-29</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-30">2013-03-30</option>');
    $('#p_Appointment_app_date').append('<option value="2013-03-31">2013-03-31</option>');
    $('#p_Appointment_app_date').append('<option value="2013-04-08">2013-04-08</option>');
    $('#p_Appointment_app_date').append('<option value="2013-04-09">2013-04-09</option>');
    $('#p_Appointment_app_date').append('<option value="2013-04-10">2013-04-10</option>');

    $('#p_Appointment_app_1').val("1234567");
    $('#p_Appointment_app_3').val("1234567");
    $("#slwq").val("C"); // 'C' or 'CW'
    $("#wqhth").val("123456");
    $("#p_Appointment_app_date").val("2013-03-30");
    $("#p_Appointment_app_5").val("卖方");
    $("#p_Appointment_app_6").val("sfz"); //身份证
    $("#p_Appointment_app_7").val("110331198909090050");
    $("#p_Appointment_app_12").val("买方");
    $("#p_Appointment_app_13").val("sfz");
    $("#p_Appointment_app_14").val("110331198909090051");
    $("#p_Appointment_phonenumber").val("18210068555");
    $("#p_Appointment_testmsgtemp").val("123456"); // password
    $("#p_Appointment_testmsgtempnext").val("123456");
    var checkCode = $('#checkCode').val();
    $("#j_captcha_response").val(checkCode);  // 验证码
}

function doSave2() {
    console.log("yes, jfo -- doSave2()");

    var frm = window.document.frm;

    var qyh = document.getElementById("p_Appointment_app_3").value;
    if(qyh.length<7){
        alert("完税凭证号不得少于7位数字！");
        return false;
    }
    //网签合同号
    var wq1 = document.getElementById("slwq").value;
    var wq2 = document.getElementById("wqhth").value;
    if(wq2.length<6){
        alert("网签合同号至少为6位数字！");
        return false;
    }
    if(wq1==""||wq1==null){
        alert("请正确填写网签合同号！");
        return false;
    }
    if(wq2==""||wq2==null){
        alert("请正确填写网签合同号！");
        return false;
    }
    var wq3 = wq1+wq2;
    document.getElementById("p_Appointment_app_2").value = wq3;

    var rv = getSelectedText("sx");
    document.getElementById("p_Appointment_app_4").value=rv;
    if("2"==rv){
        var se8 = document.getElementById("p_Appointment_app_8").value;
        var se9 = document.getElementById("p_Appointment_app_9").value;
        var se10 = document.getElementById("p_Appointment_app_10").value;

        //去空格
        se8=trimKg(se8);
        se9=trimKg(se9);
        se10=trimKg(se10);
        if(se8==null||se9==null||se10==null||se8==""||se9==""||se10==""){
            alert("卖方为单位时，卖方委托代理人信息为必填项!");
            return;
        }


    }
    var rv = getSelectedText("s");
    document.getElementById("p_Appointment_app_11").value=rv;
    if("2"==rv){
        var se15 = document.getElementById("p_Appointment_app_15").value;
        var se16 = document.getElementById("p_Appointment_app_16").value;
        var se17 = document.getElementById("p_Appointment_app_17").value;
        se15=trimKg(se15);
        se16=trimKg(se16);
        se17=trimKg(se17);
        if(se15==null||se16==null||se17==null||se15==""||se16==""||se17==""){
            alert("买方为单位时，买方委托代理人信息为必填项!");
            return;
        }


    }
    var se1 = document.getElementById("p_Appointment_app_1").value;
    var se2 = document.getElementById("p_Appointment_app_2").value;
    var se3 = document.getElementById("p_Appointment_app_3").value;
    var se5 = document.getElementById("p_Appointment_app_5").value;
    var se6 = document.getElementById("p_Appointment_app_6").value;
    var se7 = document.getElementById("p_Appointment_app_7").value;
    var se12 = document.getElementById("p_Appointment_app_12").value;
    var se13 = document.getElementById("p_Appointment_app_13").value;
    var se14 = document.getElementById("p_Appointment_app_14").value;
    se1=trimKg(se1);
    se2=trimKg(se2);
    se3=trimKg(se3);
    se5=trimKg(se5);
    se6=trimKg(se6);
    se7=trimKg(se7);
    se12=trimKg(se12);
    se13=trimKg(se13);
    se14=trimKg(se14);



    if(se1==null||se2==null||se3==null||se5==null||se6==null||se7==null||se12==null||se13==null||se14==null||se1==""||se2==""||se3==""||se5==""||se6==""||se7==""||se12==""||se13==""||se14==""){
        //  if(se2==null||se3==null||se5==null||se6==null||se7==null||se12==null||se13==null||se14==null||se2==""||se3==""||se5==""||se6==""||se7==""||se12==""||se13==""||se14==""){
        alert("请填写必填项信息!");
        return;
    }


    //document.getElementById("p_Appointment_temp1").value=document.getElementById("p_Appointment_server_id").value;
    //alert($('#p_Appointment_server_id').text());
    //取SELECT文本值用
    document.getElementById("server_id").value=document.getElementById("p_Appointment_server_id").value;
    var service_id = document.getElementById("p_Appointment_server_id").value;
    var app_date = document.getElementById("p_Appointment_app_date").value;


    //var md = document.getElementById("p_Appointment_testmsgtemp").value;
    //var sss = md5(md);
    document.getElementById("p_Appointment_testmsg").value = sss;
    //var app_agree = document.getElementById("agree").checked;
    if (service_id == null || service_id == "") {
        alert("【预约业务类型】不能为空！");
        return false;
    } else if (app_date == null || app_date == "") {
        alert("【预约日期】不能为空！");
        return false;
    }
    //else if (md == null || md == "") {
    //	alert("个人密码不能为空！");
    //	return false;



    //} else{
    //	frm.submit();
    //}

    var app1=frm.p_Appointment_app_1.value;//房屋所有权证号
    var app2=frm.p_Appointment_app_2.value;//网签合同号
    var app3=frm.p_Appointment_app_3.value;//契税票号
    var app4=frm.p_Appointment_app_4.value;//卖方是否个人
    var app5=frm.p_Appointment_app_5.value;//卖方姓名或名称
    var app6=frm.p_Appointment_app_6.value;//卖方证件类别
    var app7=frm.p_Appointment_app_7.value;//卖方证件号码

    var app8=frm.p_Appointment_app_8.value;//卖方委托代理人姓名
    var app9=frm.p_Appointment_app_9.value;//卖方委托代理人证件类别
    var app10=frm.p_Appointment_app_10.value;//卖方委托代理人证件号码

    var app11=frm.p_Appointment_app_11.value;//买方是否个人
    var app12=frm.p_Appointment_app_12.value;//买方姓名或名称
    var app13=frm.p_Appointment_app_13.value;//买方证件类别
    var app14=frm.p_Appointment_app_14.value;//买方证件号码

    var app15=frm.p_Appointment_app_15.value;//买方委托代理人姓名
    var app16=frm.p_Appointment_app_16.value;//买方委托代理人证件类别
    var app17=frm.p_Appointment_app_17.value;//买方委托代理人证件号码


    var phonenumber=frm.p_Appointment_phonenumber.value;
    var testmsg=frm.p_Appointment_testmsgtemp.value;


    //验证证件号码是否重复
    if(ifChongfu(app7,app10,app14,app17)==false){
        alert("证件号码不能重复！");
        return false;
    }


    if(checktelephone(phonenumber)==false){
        alert("请填写正确的手机号！");
        return false;
    }else if((testmsg==null||trimKg(testmsg)==""||trimKg(testmsg).length<6)){
        alert("请输入6位个人密码,不能包含空格！");
        return false;
    }
    /*else if(checkpwd(testmsg)==false){
     alert("个人密码只能为数字和字母");
     return false;
     }*/
    else if(validateCode('j_captcha_response','checkCode')==false){
        alert("请输入正确的验证码！");
        return false;
    }else{

        if(app6=='sfz'){
//            if(isApply2(app7)==false){
//                return false;
//            }

        }
        if(app6=='jgz'||app6=='gaz'||app6=='hz'||app6=='qt'||app6=='zzjgdm'||app6=='yyzzh'){
//            if(isApply(app7)==false){
//                return false;
//            }
        }
        if(app9=='sfz'){
//            if(isApply2(app10)==false){
//                return false;
//            }
        }
        if(app9=='jgz'||app9=='gaz'||app9=='hz'||app9=='qt'||app9=='zzjgdm'||app9=='yyzzh'){
//            if(isApply(app10)==false){
//                return false;
//            }
        }
        if(app13=='sfz'){
//            if(isApply2(app14)==false){
//                return false;
//            }
        }
        if(app13=='jgz'||app13=='gaz'||app13=='hz'||app13=='qt'||app13=='zzjgdm'||app13=='yyzzh'){
//            if(isApply(app14)==false){
//                return false;
//            }
        }

        if(app16=='sfz'){
//            flag4= isApply2(app17);
        }
        if(app16=='jgz'||app16=='gaz'||app16=='hz'||app16=='qt'||app16=='zzjgdm'||app16=='yyzzh'){
//            flag4= isApply(app17);
        }

        var md = document.getElementById("p_Appointment_testmsgtemp").value;
        var mdnext = document.getElementById("p_Appointment_testmsgtempnext").value;
        if(md!=mdnext){
            alert("两次输入的个人密码不一致，请重新输入！");
        }else{
            var sss = md5(md);
            document.getElementById("p_Appointment_testmsg").value = sss;
            document.getElementById("p_Appointment_app_date").value=app_date;
            frm.p_Appointment_app_person_button.disabled=true;
            frm.submit();
        }

    }

}


function doShow2() {
    var frm = window.document.frm;

    var service_id = document.getElementById("p_Appointment_server_id").value;

//    if (service_id == null || service_id == "") {
//        alert("请选择预约业务类型！");
//
//        return false;
//    }
    /*else if(validateCode('j_captcha_response','checkCode')==false){
     alert("请输入正确的验证码！");
     return false;
     }*/
//    else {
        document.getElementById("service_ne").value = document
            .getElementById("p_Appointment_server_id").value;//保存选择的类型
        $('#service_ne').val("297edff83cf6b763013cf631de820001");
        frm.p_Appointment_app_person_button.disabled=true;

        frm.action="yyfh.appointment.do";
        frm.m.value = "edit";
        frm.submit();
//    }
}

window.alert = console.log;
//@ sourceURL=yuyue.js
