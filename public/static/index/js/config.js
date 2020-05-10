
layui.define(['laytpl', 'layer', 'element', 'util'], function (exports) {
    exports('setter', {
        container: 'LAY_app' //容器ID
        , base: layui.cache.base //记录静态资源所在路径
        , views: layui.cache.base + 'tpl/' //动态模板所在目录
        , entry: 'index' //默认视图文件名
        , engine: '.html' //视图文件后缀名
        , pageTabs: true //是否开启页面选项卡功能。iframe版推荐开启

        , name: 'hfzj'
        , tableName: 'hfzj' //本地存储表名
        , MOD_NAME: 'admin' //模块事件名

        , debug: false
        , main_page:'/index/main'

        //自定义请求字段
        , request: {
            tokenName: false //自动携带 token 的字段名（如：access_token）。可设置 false 不携带。
        }

        //自定义响应字段
        , response: {
            statusName: 'code' //数据状态的字段名称
            , statusCode: {
                ok: 0 //数据状态一切正常的状态码
                , logout: 401 //登录状态失效的状态码
            }
            , msgName: 'msg' //状态信息的字段名称
            , dataName: 'data' //数据详情的字段名称
        }

        //主题配置
        , theme: {
            //内置主题配色方案
            color: [{
                main: '#20222A'
                , selected: '#1E9FFF'
                , alias: 'ocean' //海洋
            }]

            //初始的颜色索引，对应上面的配色方案数组索引
            //如果本地已经有主题色记录，则以本地记录为优先，除非请求本地数据（localStorage）
            , initColorIndex: 0
        }
    });
});

function isNullOrUndefined(variable){
    if(typeof (variable)==='undefined' || variable==null || variable==='undefined')
        return true;
    else
        return false;
}
function isEmpty(variable){
    if(isNullOrUndefined(variable))
        return true;
    if(variable===false)
        return true;
    return variable==="";
}
function jumper(url) {
    if(!isEmpty(url)){
        var isTop=url.indexOf('top:')===0,urlArr=url.split('top:');
        url = isTop?urlArr[1]:urlArr[0];

        if(url==='reload')
            isTop?top.document.location.reload():location.reload();
        else if(url==='back')
            isTop?top.document.history.back():history.back();
        else
            isTop?(top.document.location.href = url):(location.href = url);
    }
}
function isPhoneAvailable(str) {
    var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return myreg.test(str);
}

function getUrlParam (name,url) {
    if(isEmpty(url))
        url = document.location.href;
    var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
    var matcher = pattern.exec(url);
    var items = null;
    if(null != matcher){
        try{
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        }catch(e){
            try{
                items = decodeURIComponent(matcher[1]);
            }catch(e){
                items = matcher[1];
            }
        }
    }
    return items;
}

function layJump(url,name) {
    if(self !== top){
        parent.layui.index.openTabsPage(url,name);
    }else
        document.location.href=url;
}