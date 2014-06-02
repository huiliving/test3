function mapInit() {
	//地图初始化参数设置
    var opt = {
		center: new MMap.LngLat(116.397428, 39.90923),//设置地图中心点
        level: 10,//初始地图缩放级别
        zooms:[7,17]//地图缩放级别范围
    };
    mapObj = new MMap.Map("iCenter", opt);
	
	//加载地图基本控件
    mapObj.plugin(["MMap.ToolBar", "MMap.OverView", "MMap.Scale"],function() {
		//加载工具条插件，工具条包括方向键盘、标尺键盘和自动定位控制
        toolbar = new MMap.ToolBar();
        mapObj.addControl(toolbar);
		//加载鹰眼
        overview = new MMap.OverView(); 
        mapObj.addControl(overview);
		//加载比例尺
        scale = new MMap.Scale(); 
        mapObj.addControl(scale);
    });
}
