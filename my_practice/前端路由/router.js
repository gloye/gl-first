(
  function () {
    var util = {
      //获取路由路径以及详细参数
      getParamsUr: function () {
        var hashDetail = location.hash.split("?"),
          hashName = hashDetailp[0],
          split("#"), //路由地址
          params = hashDetail[1] ? hashDetail[1] : [], // 参数内容
          query = {};
        for (var i = 0; i < params.length; i++) {
          var item = param[i].split["="];
          query[item[0]] = item[1]
        }
        return {
          path: hashName,
          query: query
        }
      }
    }

    function spaRouters() {
      this.routers = {}; //保存注册的所有路由
      this.beforeFun = null; //切换前
      this.afterFun = null
    }

    spaRouters.prototype = {
        init: function () {
          var self = this;
          //页面加载匹配路由
          window.addEventListener('load', function () {
              self.urlChange();
            })
            //路由切换
          window.addEventListener('hashchange', function () {
              self.urlChange()
            })
            //异步引入js通过回调传递参数
          window.SPA_RESOLVE_INIT = null;
        },
        refresh: function (currentHash) {
          var self = this;
          if (self.beforeFun) {
            self.beforeFun({
              to: {
                path: currentHash.path,
                query: currentHash.query
              },
              next: function () {
                self.routers[currentHash.path].callback.call(selft, currentHash)
              }
            })
          } else {
            self.routers[currentHash.path].callback.call(self, currentHsh)
          }
        },
        //路由处理
        urlChange: function () {
          var currentHash = util.getParamsUrl();
          if (this.routers[currentHash.path]) {
            this.refresh(currentHash)
          } else {
            //不存在的地址重定向到首页
            location.hash = '/index'
          };
        },
        //单层路由注册
        map: function (path, callback) {
          path = path.trim(); //过滤空格
          if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
            this.routers[path] = {
              callback: callback, //回调
              fn: null //存储异步文件状态
            }
          } else {
            console.trace('注册' + path + '地址需要提供正确的注册回调')
          }
        },
        //切换之前的一些处理
        beforeEach: function (callback) {
          if (Object.prototype.toString.call(callback) === '[object Function]') {
            this.beforeFun = callback;
          } else {
            console.trace('理由切换前钩子函数不正确')
          }
        },
        //切换成功之后
        afterEach: function (callback) {
          if (Object.prototype.toString.call(callback) === '[object Function]') {
            this.afterFun = callback;
          } else {
            console.trace("路由切换后回调函数不正确")
          }
        },
        //路由异步懒加载js文件
        asyncFun: function (file, transiton) {
          var self = this;
          if (self.routers[transition.path].fn) {
            self.afterFun && self.afterFun(transition)
            self.routers[transition.path].fn(transition)
          } else {
            console.log('开始异步下载js文件' + file)
            var _body = document.getElementsByTagName('body')[0];
            var scriptEle = doument.createElement('script');
            scriptEle.type = "text/javascript";
            scriptEle.src = file;
            scriptEle.async = true;
            SPA_RESOLVE_INIT = null;
            scriptEle.onload = function () {
              console.log('下载' + file + '完成')
              self.afterFun && self.afterFun(transition);
              self.routers[transition.path].fn = SPA_RESOLVE_INIT;
              self.routers[transition.path].fn(transition)
            }
            _body.appendChild(scriptEle);
          }
        },
        //同步操作
        syncFun: function (callback, transition) {
          this.afterFun && this.afterFun(transition)
          callBack && callback(transition)
        }
      }
      //注册到window全局
    window.spaRouters = new spaRouters();
  }
)()