layui.extend({
    admin: 'hfzjlib/admin'
    , view: 'hfzjlib/view'
}).define(['setter', 'admin'], function (exports) {
    var setter = layui.setter
        ,element = layui.element
        , admin = layui.admin
        , tabsPage = admin.tabsPage
        , view = layui.view

        //打开标签页
        , openTabsPage = function (url, text) {
            //遍历页签选项卡
            var matchTo
                , tabs = $('#LAY_app_tabsheader>li')
                // , path = url.replace(/(^http(s*):)|(\?[\s\S]*$)/g, '')
                , path = url
            ;

            tabs.each(function (index) {
                var li = $(this)
                    , layid = li.attr('lay-id');

                if (layid === url) {
                    matchTo = true;
                    tabsPage.index = index;
                }
            });

            text = text || '新标签页';

            if (setter.pageTabs) {
                //如果未在选项卡中匹配到，则追加选项卡
                if (!matchTo) {
                    $(APP_BODY).append([
                        '<div class="layadmin-tabsbody-item layui-show">'
                        , '<iframe src="' + url + '" frameborder="0" class="layadmin-iframe"></iframe>'
                        , '</div>'
                    ].join(''));
                    tabsPage.index = tabs.length;
                    element.tabAdd(FILTER_TAB_TBAS, {
                        title: '<span>' + text + '</span>'
                        , id: url
                        , attr: path
                    });
                }
            } else {
                var iframe = admin.tabsBody(admin.tabsPage.index).find('.layadmin-iframe');
                iframe[0].contentWindow.location.href = url;
            }

            //定位当前tabs
            element.tabChange(FILTER_TAB_TBAS, url);
            admin.tabsBodyChange(tabsPage.index, {
                url: url
                , text: text
                , openTabsPage:true
            });
        }

        ,openLastPage =function(){
            if(!isEmpty(window.name)&&(window.name.indexOf('{"')===0)){
                try{
                    var obj=JSON.parse(window.name);
                    if(obj.lastTab.url&&obj.lastTab.text){
                        openTabsPage(obj.lastTab.url,obj.lastTab.text);
                    }else {
                        lazyLoadMainPage();
                    }
                }catch (e){console.log(e)}
            }else{
                lazyLoadMainPage();
            }
        }

        ,lazyLoadMainPage = function(){
            var homeTab = layui.$('#LAY_app iframe:first');
            if(isEmpty(homeTab.attr('src'))){
                homeTab.attr('src',$('#LAY_app_tabsheader>li:first').attr('lay-attr'));
            }
        }

        , APP_BODY = '#LAY_app_body', FILTER_TAB_TBAS = 'layadmin-layout-tabs'
        , $ = layui.$, $win = $(window);

    //初始
    if (admin.screen() < 2) admin.sideFlexible();

    layui.config({
        base: setter.base + 'modules/'
    });

    //扩展 lib 目录下的其它模块
    layui.each(setter.extend, function (index, item) {
        var mods = {};
        mods[item] = '{/}' + setter.base + 'lib/extend/' + item;
        layui.extend(mods);
    });

    view().autoRender();

    // openLastPage();
    lazyLoadMainPage();

    //对外输出
    exports('index', {
        openTabsPage: openTabsPage
    });
});
