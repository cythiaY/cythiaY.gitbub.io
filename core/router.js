/**
 * hash模式单页面路由模块实现
 */
class SPARouter {
    /**
     * 路由对象格式：{path : '/**', filename: ''}
     * @param {*} routers 
     */
    constructor(el, routers, mode = 'hash') {
        this.el = el;
        this.mode = mode;
        this.currentRoute = {};
        this.path = null;
        this.query = null;
        this.initRouters(routers);
        this.initEvent();
    }
    initRouters(routers) {
        this.routers = routers.map((item) => {
            item.$router = this;
            // console.log('initRouter', this);
            return item;
        });
    }
    initEvent() {
        window.addEventListener('load', () => {
            this.routeUpload();
        });
        window.addEventListener('hashchange', () => {
            this.routeUpload();
        });
    }
    routeUpload() {
        let currentLocation = this.getRoute();
        this.query = currentLocation.query;
        this.path = currentLocation.path;
        this.currentRoute.query = currentLocation.query;
        this.routers.map((item) => {
            if (item.path === currentLocation.path) {
                this.currentRoute = item;
                this.refresh();
            }
        });
        // 默认index
        if (!this.currentRoute.path) {
            window.location.hash = '/index';
        }
    }
    getRoute() {
        let hashDetail = window.location.hash.split('?');
        let hashName = hashDetail[0].split('#')[1];
        let params = hashDetail[1] ? hashDetail[1].split('&') : [];
        let query = {};
        params.map((item) => {
            let temp = item.split('=');
            query[temp[0]] = temp[1];
        });
        console.log('getRoute', hashName, query);
        return {
            path: hashName,
            query: query
        };
    }
    refresh() {
        // 路由跳转加载子模块
        this.loadModule();
    }
    loadModule() {
        let _this = this;
        if (this.currentRoute.filename) {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.open('GET', this.currentRoute.filename);
            xmlRequest.responseType = 'document';
            xmlRequest.send(null);
            xmlRequest.onreadystatechange = function () {
                if (xmlRequest.readyState === 4) {
                    if (xmlRequest.status === 200 || xmlRequest.status === 304) {
                        // 删除上个页面的js脚本
                        let oldS = document.getElementById('appendScript');
                        let oldSt = document.getElementById('appendStyle')
                        if (oldS) {
                            oldS.parentNode.removeChild(oldS);
                        }
                        if (oldSt) {
                            oldSt.parentNode.removeChild(oldSt);
                        }
                        let sc = xmlRequest.response.getElementsByTagName('script');
                        let t = xmlRequest.response.getElementsByTagName('template');
                        let st = xmlRequest.response.getElementsByTagName('style');
                        if (t.length > 0) {
                            _this.el.innerHTML = t[0].innerHTML;
                        }
                        if (sc.length > 0) {
                            let newS = document.createElement('script');
                            newS.id = 'appendScript';
                            newS.innerHTML = sc[0].innerHTML;
                            document.body.appendChild(newS);
                        }
                        if (st.length > 0) {
                            let headTag = document.getElementsByTagName('head')[0];
                            let newSt = document.createElement('style');
                            newSt.id = "appendStyle";
                            newSt.appendChild(document.createTextNode(st[0].innerHTML));
                            headTag.appendChild(newSt);
                        }
                    }
                }
            };
        }
    }
}