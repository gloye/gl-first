//创建和初始化地图函数：
function initMap() {
  createMap();//创建地图
  setMapEvent();//设置地图事件
  addMapControl();//向地图添加控件
  addMapOverlay();//向地图添加覆盖物
  searchInfo();//信息窗口
}

var point = new BMap.Point(117.178093,34.177558);

function createMap() {
  map = new BMap.Map("map");
  map.centerAndZoom(point, 14);

}
function setMapEvent() {
  // map.enableScrollWheelZoom();
  map.enableKeyboard();
  map.enableDragging();
  map.enableDoubleClickZoom()
}
function addClickHandler(target, window) {
  target.addEventListener("click", function () {
    target.openInfoWindow(window);
  });
}
function addMapOverlay() {
  var newIcon = new BMap.Icon("images/address_marker.png", new BMap.Size(55,57))
  marker = new BMap.Marker(point, {icon:newIcon});
  map.addOverlay(marker); //在地图中添加marker
}

//信息窗口
function searchInfo(){
  //创建检索信息窗口对象
  var searchInfoWindow = null;
  var content="<h3 style='color: #e21e1f;font-size:14px'>江苏云意电气股份有限公司</h3><p style='font-size:12px;color:#777'>地址：江苏省徐州市铜山区黄山路2号</p>";
  searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
    title  : "江苏云意电气股份有限公司",      //标题
    width  : 290,             //宽度
    height : 105,              //高度
    panel  : "panel",         //检索结果面板
    enableAutoPan : true,     //自动平移
    searchTypes   :[
      BMAPLIB_TAB_SEARCH,   //周边检索
      BMAPLIB_TAB_TO_HERE,  //到这里去
      BMAPLIB_TAB_FROM_HERE //从这里出发
    ]
  });
  marker.addEventListener("click", function(e){
    searchInfoWindow.open(marker);
  })
}
//向地图添加控件
function addMapControl() {
  var scaleControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
  scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
  map.addControl(scaleControl);
  var navControl = new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    type: BMAP_NAVIGATION_CONTROL_LARGE
  });
  map.addControl(navControl);
}
var map;
initMap();