webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_component__ = __webpack_require__("../../../../../src/app/auth/auth.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_main_component__ = __webpack_require__("../../../../../src/app/main/main.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__main_main_component__["a" /* MainComponent */] },
    { path: 'auth', component: __WEBPACK_IMPORTED_MODULE_2__auth_auth_component__["a" /* AuthComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(appRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "app-header {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 56px;\r\n  z-index: 1000;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [appName]=\"applicationName\"></app-header>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.applicationName = 'Music Recommendation Service';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_auth_component__ = __webpack_require__("../../../../../src/app/auth/auth.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_login_login_component__ = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_registration_registration_component__ = __webpack_require__("../../../../../src/app/auth/registration/registration.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_query_service__ = __webpack_require__("../../../../../src/app/services/query.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__main_main_component__ = __webpack_require__("../../../../../src/app/main/main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angular2_cookie_core__ = __webpack_require__("../../../../angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_music_service__ = __webpack_require__("../../../../../src/app/services/music.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__secondsToTime_pipe__ = __webpack_require__("../../../../../src/app/secondsToTime.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_7__auth_auth_component__["a" /* AuthComponent */],
                __WEBPACK_IMPORTED_MODULE_8__auth_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_9__auth_registration_registration_component__["a" /* RegistrationComponent */],
                __WEBPACK_IMPORTED_MODULE_12__main_main_component__["a" /* MainComponent */],
                __WEBPACK_IMPORTED_MODULE_15__secondsToTime_pipe__["a" /* SecondsToTimePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__services_query_service__["a" /* QueryService */],
                __WEBPACK_IMPORTED_MODULE_11__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_13_angular2_cookie_core__["CookieService"],
                __WEBPACK_IMPORTED_MODULE_14__services_music_service__["a" /* MusicService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapper {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: black;\r\n  overflow: hidden;\r\n}\r\n\r\nvideo {\r\n  min-width: 100%;\r\n  min-height: 100%;\r\n  width: auto;\r\n  height: auto;\r\n}\r\n\r\n.rainbow {\r\n  -webkit-animation: CustomAnimation 10s ease infinite;\r\n          animation: CustomAnimation 10s ease infinite;\r\n  background: linear-gradient(270deg, rgb(31, 234, 182), rgb(234, 31, 199), rgb(234, 194, 31)) 0% 0% / 300% 300%;\r\n  opacity: .75;\r\n  height: 100%;\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1;\r\n}\r\n\r\n@-webkit-keyframes CustomAnimation {\r\n  0% {\r\n    background-position: 0% 50%;\r\n  }\r\n  50% {\r\n    background-position: 100% 50%;\r\n  }\r\n  100% {\r\n    background-position: 0% 50%;\r\n  }\r\n}\r\n\r\n@keyframes CustomAnimation {\r\n  0% {\r\n    background-position: 0% 50%;\r\n  }\r\n  50% {\r\n    background-position: 100% 50%;\r\n  }\r\n  100% {\r\n    background-position: 0% 50%;\r\n  }\r\n}\r\n\r\n.body {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  z-index: 2;\r\n}\r\n\r\n.body h5 {\r\n  font-size: 24px;\r\n  font-weight: 400;\r\n  color: white;\r\n  text-align: center;\r\n}\r\n\r\n.auth-window {\r\n  background-color: #ffffff;\r\n  width: 400px;\r\n\r\n}\r\n\r\n.top-block {\r\n  width: 100%;\r\n  height: 80px;\r\n}\r\n\r\n.top-block button {\r\n  font-size: 20px;\r\n  width: 50%;\r\n  height: 100%;\r\n  border: none;\r\n  outline: none;\r\n  float: left;\r\n  margin: 0;\r\n  border-top: 4px solid;\r\n  background: #eee;\r\n  border-top: 4px solid #eee;\r\n}\r\n\r\n.top-block button.clicked {\r\n  border-top: 4px solid #4ce02f;\r\n  background: #ffffff;\r\n  cursor: auto;\r\n}\r\n\r\n.top-block button:hover:not(.clicked) {\r\n  background: #f5f5f5;\r\n  border-top: 4px solid #f5f5f5;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/auth.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <video poster=\"\" id=\"bgvid\" playsinline autoplay loop muted>\n    <source src=\"http://ak5.picdn.net/shutterstock/videos/12273485/preview/stock-footage-happy-young-man-dancing-in-kitchen-wearing-pajamas-in-the-morning-listening-to-music-on-smartphone-a.mp4\" type=\"video/mp4\">\n  </video>\n  <div class=\"rainbow\"></div>\n  <div class=\"body\">\n    <div class=\"auth-window\" (click)=\"$event.stopPropagation()\">\n      <div class=\"top-block\">\n        <button [ngClass]=\"{'clicked': isLoginPage}\" (click)=\"handleLoginPress($event)\">Login</button>\n        <button [ngClass]=\"{'clicked': !isLoginPage}\" (click)=\"handleRegistrationPress($event)\">Registration</button>\n      </div>\n      <login *ngIf=\"isLoginPage\"></login>\n      <registration *ngIf=\"!isLoginPage\"></registration>\n    </div>\n    <h5>Let Your Music Inspire You</h5>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/auth/auth.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthComponent = (function () {
    function AuthComponent() {
        this.isLoginPage = true;
    }
    AuthComponent.prototype.handleLoginPress = function () {
        this.isLoginPage = true;
    };
    AuthComponent.prototype.handleRegistrationPress = function () {
        this.isLoginPage = false;
    };
    AuthComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-auth',
            template: __webpack_require__("../../../../../src/app/auth/auth.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/auth.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AuthComponent);
    return AuthComponent;
}());



/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-window {\r\n    padding: 10px;\r\n}\r\n\r\n.login-window .form-control.ng-invalid.ng-dirty {\r\n    border-color: red;\r\n}\r\n\r\n.help-block {\r\n    color: red;\r\n    font-size: 9px;\r\n    font-weight: 600;\r\n    padding: 0 2px;\r\n}\r\n\r\nbutton {\r\n  width: 100%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"login-window\">\r\n    <form (ngSubmit)=\"onSubmit(f)\" #f=\"ngForm\">\r\n        <div class=\"form-group\">\r\n            <label for=\"login\">Login</label>\r\n            <input type=\"text\" id=\"login\" class=\"form-control\" ngModel name=\"login\" required #login=\"ngModel\">\r\n            <span class=\"help-block\" *ngIf=\"!login.valid && login.dirty\">This field is required!</span>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"password\">Password</label>\r\n            <input type=\"password\" id=\"password\" class=\"form-control\" ngModel name=\"password\" required #password=\"ngModel\">\r\n            <span class=\"help-block\" *ngIf=\"!password.valid && password.dirty\">This field is required!</span>\r\n        </div>\r\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!f.valid\">Submit</button>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = (function () {
    function LoginComponent(authService) {
        this.authService = authService;
    }
    LoginComponent.prototype.onSubmit = function (form) {
        this.authService.login(form.value.login, form.value.password);
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login',
            template: __webpack_require__("../../../../../src/app/auth/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/auth/registration/registration.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".registration-window {\r\n    padding: 10px;\r\n}\r\n\r\n.registration-window .form-control.ng-invalid.ng-dirty {\r\n    border-color: red;\r\n}\r\n\r\n.help-block {\r\n    color: red;\r\n    font-size: 9px;\r\n    font-weight: 600;\r\n    padding: 0 2px;\r\n}\r\n\r\nbutton {\r\n  width: 100%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/registration/registration.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"registration-window\">\r\n    <form (ngSubmit)=\"onSubmit(f)\" #f=\"ngForm\">\r\n        <div class=\"form-group\">\r\n            <label for=\"login\">Login</label>\r\n            <input type=\"text\" id=\"login\" class=\"form-control\" ngModel name=\"login\" required #login=\"ngModel\">\r\n            <span class=\"help-block\" *ngIf=\"!login.valid && login.dirty\">This field is required!</span>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"password\">Password</label>\r\n            <input type=\"password\" id=\"password\" class=\"form-control\" ngModel name=\"password\" required #password=\"ngModel\">\r\n            <span class=\"help-block\" *ngIf=\"!password.valid && password.dirty\">This field is required!</span>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"repeat\">Repeat Password</label>\r\n            <input type=\"password\" id=\"repeat\" class=\"form-control\" ngModel name=\"repeat\" required #repeat=\"ngModel\">\r\n            <span class=\"help-block\" *ngIf=\"repeat.value !== password.value && repeat.dirty\">Passwords don`t match!</span>\r\n        </div>\r\n        <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!f.valid || repeat.value !== password.value\">Submit</button>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/auth/registration/registration.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RegistrationComponent = (function () {
    function RegistrationComponent(authService) {
        this.authService = authService;
    }
    RegistrationComponent.prototype.onSubmit = function (form) {
        this.authService.register(form.value.login, form.value.password);
    };
    RegistrationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'registration',
            template: __webpack_require__("../../../../../src/app/auth/registration/registration.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/registration/registration.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "../../../../../src/app/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "header {\r\n  border-bottom:1px solid darkgrey;\r\n  height: 100%;\r\n  width: 100%;\r\n  background: #f5f5f5;\r\n  position: relative;\r\n}\r\n\r\nheader span {\r\n  margin: 16px;\r\n  line-height: 100%;\r\n  font-size: 20px;\r\n  font-weight: 300;\r\n  display: inline-block;\r\n}\r\n\r\n.user-info {\r\n  display: inline-block;\r\n  height: 100%;\r\n  float: right;\r\n}\r\n\r\n.user-info img {\r\n  height: 80%;\r\n}\r\n\r\n.user-info span {\r\n  margin: 0 10px;\r\n  line-height: 100%;\r\n  font-size: 14px;\r\n}\r\n\r\n.user-info button {\r\n  background: none;\r\n  border: none;\r\n  height: 100%;\r\n  padding: 0 15px;\r\n  font-size: 15px;\r\n  background: #e5e5e5;\r\n}\r\n\r\n.user-info button:hover {\r\n  background: #f0f0f0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n  <span class=\"header-logo\">{{appName}}</span>\n  <div class=\"user-info\" *ngIf=\"userLogin\">\n    <span>{{userLogin}}</span>\n    <img src=\"../../assets/unnamed.png\">\n    <button (click)=\"logout()\">Logout</button>\n  </div>\n</header>\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    function HeaderComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.appName = 'Application';
        this.userLogin = this.authService.getLogin();
        this.authService.getLoginObservable().subscribe(function (data) {
            _this.userLogin = data;
        });
    }
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "appName", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/main/main.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapper {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 56px 0 0 0;\r\n  overflow: hidden;\r\n}\r\n\r\n.body {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.body div {\r\n  padding: 0;\r\n}\r\n\r\n* {\r\n  border-collapse: collapse;\r\n}\r\n\r\n.playlistData, .music {\r\n  border: 1px solid lightgray;\r\n}\r\n\r\n.playlists, .recommendations, .songs {\r\n  border-bottom: 1px solid lightgray;\r\n}\r\n\r\n.songs {\r\n  border-right: 1px solid lightgray;\r\n}\r\n\r\n.header {\r\n  border-bottom: 1px solid lightgray;\r\n}\r\n\r\n.body .header {\r\n  font-size: 14px;\r\n  padding: 16px;\r\n  font-weight: bolder;\r\n  color: rgb(154,154,154);\r\n}\r\n\r\n.audio {\r\n  height: 60px;\r\n}\r\n\r\n.playlistData {\r\n  height: 100%;\r\n}\r\n\r\n.music {\r\n  height: 100%;\r\n}\r\n\r\n.recommendations, .songs, .playlists {\r\n  height: calc(100% - 60px);\r\n}\r\n\r\n.songs, .playlists, .recommendations {\r\n  position: relative;\r\n}\r\n\r\n.notification {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  color: gray;\r\n  font-size: 14px;\r\n}\r\n\r\n.songList {\r\n  border: none;\r\n  height: calc(100% - 60px);\r\n  overflow-y: auto;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.songList li {\r\n  list-style-type: none;\r\n  padding: 7px;\r\n  cursor: pointer;\r\n  position: relative;\r\n  padding-right: 20px;\r\n}\r\n\r\n.songList li .author {\r\n  color: #487fb5;\r\n  font-weight: bolder;\r\n}\r\n\r\n.songList li:hover {\r\n  background: #487fb5;\r\n  color: #fff;\r\n}\r\n\r\n.songList li:hover .author {\r\n  color: #fff;\r\n}\r\n\r\n.songList li.selected {\r\n  background: #487fb5;\r\n  color: #fff;\r\n}\r\n\r\n.songList li.selected .author {\r\n  color: #fff;\r\n}\r\n\r\n.songList li .duration {\r\n  float: right;\r\n}\r\n\r\n.audio {\r\n  padding: 0;\r\n}\r\n\r\n.audio label, .audio audio {\r\n  height: 30px;\r\n  width: 100%;\r\n  margin: 0;\r\n  font-weight: normal;\r\n}\r\n\r\n.audio label {\r\n  padding: 0 10px;\r\n  line-height: 30px;\r\n  background: #fafafa;\r\n}\r\n\r\n.audio label.unactive {\r\n  color: #bebebe;\r\n}\r\n\r\n.input-group {\r\n  padding: 5px!important;\r\n  border-collapse: separate;\r\n}\r\n\r\n.playlistList {\r\n  border: none;\r\n  height: calc(100% - 60px);\r\n  overflow-y: auto;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.playlistList li {\r\n  list-style-type: none;\r\n  padding: 7px;\r\n  cursor: pointer;\r\n  position: relative;\r\n  padding-right: 20px;\r\n}\r\n\r\n.playlistList li:hover {\r\n  background: #487fb5;\r\n  color: #fff;\r\n}\r\n\r\n.playlistList li.selected {\r\n  background: #487fb5;\r\n  color: #fff;\r\n}\r\n\r\n\r\n.plus, .cross {\r\n  color: green;\r\n  position: absolute;\r\n  top: 50%;\r\n  -webkit-transform: translateY(-50%);\r\n          transform: translateY(-50%);\r\n  right: 5px;\r\n}\r\n\r\n.cross {\r\n  color: red;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"body\">\n    <div class=\"playlistData col-lg-3 col-md-3 col-sm-3 col-xs-3\">\n      <div class=\"playlists\">\n        <div class=\"header\">\n          Playlists\n        </div>\n        <ul class=\"playlistList\" *ngIf=\"playlists.length > 0\">\n          <li *ngFor=\"let playlist of playlists\" (click)=\"selectPlaylist(playlist)\" [ngClass]=\"{'selected': selectedPlaylist === playlist}\">\n            <span class=\"name\">{{playlist.PlaylistName}}</span>\n            <span class=\"cross\" (click)=\"$event.stopPropagation();deletePlaylist(playlist.ID)\">&#10006;</span>\n          </li>\n        </ul>\n        <div class=\"notification\" *ngIf=\"playlists.length === 0\">\n          No playlists avaliable\n        </div>\n      </div>\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Playlist name...\" ngModel name=\"playlistName\" #playlistName required>\n        <span class=\"input-group-btn\">\n        <button class=\"btn btn-success\" type=\"button\" [disabled]=\"!playlistName.checkValidity()\" (click)=\"addPlaylist(playlistName.value)\">+</button>\n      </span>\n      </div>\n    </div>\n    <div class=\"music col-lg-9 col-md-9 col-sm-9 col-xs-9\">\n      <div class=\"songs col-lg-6 col-md-6 col-sm-6 col-xs-6\">\n        <div class=\"header\">\n          Songs\n        </div>\n        <ul class=\"songList\" *ngIf=\"playlistSongs.length > 0\">\n          <li *ngFor=\"let song of playlistSongs\" (click)=\"selectSong(song)\" [ngClass]=\"{'selected': selectedSong === song}\">\n            <span class=\"author\">{{song.Artist}}</span> - {{song.SongName}}\n            <span class=\"duration\">{{song.Length | secondsToTime}}</span>\n            <span class=\"cross\" (click)=\"$event.stopPropagation();deleteFromPlaylist(song)\">&#10006;</span>\n          </li>\n        </ul>\n        <div class=\"notification\" *ngIf=\"playlistSongs.length === 0\">\n          No songs in current playlists\n        </div>\n      </div>\n      <div class=\"recommendations col-lg-6 col-md-6 col-sm-6 col-xs-6\">\n        <div class=\"header\">\n          Recommendations\n        </div>\n        <ul class=\"songList\" *ngIf=\"recommendations.length > 0\">\n          <li *ngFor=\"let song of recommendations\" (click)=\"selectSong(song)\" [ngClass]=\"{'selected': selectedSong === song}\">\n            <span class=\"author\">{{song.Artist}}</span> - {{song.SongName}}\n            <span class=\"plus\" *ngIf=\"selectedPlaylist\" (click)=\"$event.stopPropagation();insertInPlaylist(song.ID)\">&#10010;</span>\n            <span class=\"duration\">{{song.Length | secondsToTime}}</span>\n          </li>\n        </ul>\n        <div class=\"notification\" *ngIf=\"recommendations.length === 0\">\n          No recommendations for you\n        </div>\n      </div>\n      <div class=\"audio col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n        <label *ngIf=\"selectedSong\"><span class=\"author\">{{selectedSong.Artist}}</span> - {{selectedSong.SongName}}</label>\n        <label *ngIf=\"!selectedSong\" class=\"unactive\">Please, select a song...</label>\n        <audio controls src={{selectedSong?selectedSong.Adress:null}} autoplay #audio></audio>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/main.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_query_service__ = __webpack_require__("../../../../../src/app/services/query.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_music_service__ = __webpack_require__("../../../../../src/app/services/music.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MainComponent = (function () {
    function MainComponent(musicService, queryService) {
        this.musicService = musicService;
        this.queryService = queryService;
        this.selectedSong = null;
        this.recommendations = this.musicService.getRecommendations();
        this.selectedPlaylist = null;
        this.playlists = this.musicService.getPlaylists();
        this.playlistSongs = [];
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.audio.nativeElement.volume = 0.4;
        this.recommendationsSubscription = this.musicService.getRecommendationsObservable().subscribe(function (data) {
            _this.recommendations = data;
            if (_this.selectedSong) {
                var id = _this.selectedSong.ID;
                _this.selectedSong = null;
                for (var song in _this.recommendations) {
                    if (_this.recommendations[song].ID === id) {
                        _this.selectSong(_this.recommendations[song]);
                    }
                }
            }
        });
        this.playlistsSubscription = this.musicService.getPlaylistsObservable().subscribe(function (data) {
            _this.playlists = data;
            if (_this.selectedPlaylist) {
                var id = _this.selectedPlaylist.ID;
                _this.selectedPlaylist = null;
                for (var playlist in _this.playlists) {
                    if (_this.playlists[playlist].ID === id) {
                        _this.selectPlaylist(_this.playlists[playlist]);
                    }
                }
            }
            _this.playlistSongs = [];
        });
        this.musicService.refreshMusic();
    };
    MainComponent.prototype.ngOnDestroy = function () {
        this.recommendationsSubscription.unsubscribe();
        this.playlistsSubscription.unsubscribe();
    };
    MainComponent.prototype.selectSong = function (song) {
        this.selectedSong = song;
        this.queryService.registerListen(song.ID).subscribe();
    };
    MainComponent.prototype.selectPlaylist = function (playlist) {
        var _this = this;
        this.selectedPlaylist = playlist;
        this.queryService.getPlaylistSongs(this.selectedPlaylist.ID).subscribe(function (data) {
            var songs = JSON.parse(data.body);
            _this.playlistSongs = songs;
        }, function (err) {
            console.log(err);
        });
    };
    MainComponent.prototype.deletePlaylist = function (id) {
        var _this = this;
        this.queryService.deletePlaylist(id).subscribe(function (data) {
            _this.musicService.refreshMusic();
        });
    };
    MainComponent.prototype.addPlaylist = function (val) {
        var _this = this;
        this.queryService.createPlaylist(val).subscribe(function (data) {
            _this.musicService.refreshMusic();
        });
    };
    MainComponent.prototype.insertInPlaylist = function (id) {
        var _this = this;
        this.queryService.insertInPlaylist(this.selectedPlaylist.ID, id).subscribe(function (data) {
            _this.musicService.refreshMusic();
        });
    };
    MainComponent.prototype.deleteFromPlaylist = function (song) {
        var _this = this;
        this.queryService.deleteFromPlaylist(this.selectedPlaylist.ID, song.ID, this.playlistSongs.indexOf(song)).subscribe(function (data) {
            _this.musicService.refreshMusic();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('audio'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MainComponent.prototype, "audio", void 0);
    MainComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-main',
            template: __webpack_require__("../../../../../src/app/main/main.component.html"),
            styles: [__webpack_require__("../../../../../src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_music_service__["a" /* MusicService */], __WEBPACK_IMPORTED_MODULE_1__services_query_service__["a" /* QueryService */]])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "../../../../../src/app/secondsToTime.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondsToTimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dateformat__ = __webpack_require__("../../../../dateformat/lib/dateformat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dateformat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dateformat__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SecondsToTimePipe = (function () {
    function SecondsToTimePipe() {
    }
    SecondsToTimePipe.prototype.transform = function (seconds) {
        var time = new Date(seconds * 1000);
        return __WEBPACK_IMPORTED_MODULE_1_dateformat__(time, "MM:ss");
    };
    SecondsToTimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'secondsToTime'
        })
    ], SecondsToTimePipe);
    return SecondsToTimePipe;
}());



/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__query_service__ = __webpack_require__("../../../../../src/app/services/query.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__("../../../../angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function () {
    function AuthService(queryService, cookieService, router) {
        this.queryService = queryService;
        this.cookieService = cookieService;
        this.router = router;
        this.loginValue = null;
        this.loginValueSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        var session = this.cookieService.get('session');
        if (session) {
            var values = session.split(',');
            if (values[0] == "''" || values[1] == "'null'" || values[2] == "'null'") {
                this.router.navigate(['/auth']);
                return;
            }
            this.loginValue = values[0].slice(1, -1);
            this.loginValueSubject.next(this.loginValue);
        }
        else {
            this.router.navigate(['/auth']);
        }
    }
    AuthService.prototype.getLogin = function () {
        return this.loginValue;
    };
    AuthService.prototype.getLoginObservable = function () {
        return this.loginValueSubject.asObservable();
    };
    AuthService.prototype.logout = function () {
        this.cookieService.remove('session');
        this.loginValue = null;
        this.loginValueSubject.next(this.loginValue);
        this.router.navigate(['/auth']);
    };
    AuthService.prototype.register = function (login, password) {
        var _this = this;
        this.queryService.register(login, password).subscribe(function (value) {
            if (value.body === '1') {
                _this.login(login, password);
            }
            else {
                alert('This login already exists');
            }
        }, function (err) {
            alert('Server error');
            console.log(err);
        });
    };
    AuthService.prototype.login = function (login, password) {
        var _this = this;
        this.queryService.login(login, password).subscribe(function (value) {
            var values = value.body.split(',');
            if (values[0] == "''" || values[1] == "'null'" || values[2] == "'null'") {
                alert('Invalid credentinals');
                return;
            }
            var date = new Date(values[1].slice(1, -1));
            var options = {
                // domain: DOMAIN,
                expires: date.toUTCString()
            };
            var optionsLocal = {
                // domain: DOMAIN,
                expires: date.toUTCString()
            };
            _this.loginValue = values[0].slice(1, -1);
            _this.loginValueSubject.next(_this.loginValue);
            _this.cookieService.put('session', value.body, options);
            _this.cookieService.put('session', value.body, optionsLocal);
            _this.router.navigate(['/']);
        }, function (err) {
            alert('Server error');
            console.log(err);
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__query_service__["a" /* QueryService */], __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/services/music.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Song */
/* unused harmony export Playlist */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__query_service__ = __webpack_require__("../../../../../src/app/services/query.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Song = (function () {
    function Song() {
    }
    return Song;
}());

var Playlist = (function () {
    function Playlist() {
    }
    return Playlist;
}());

var MusicService = (function () {
    function MusicService(queryService) {
        this.queryService = queryService;
        this.recommendations = [];
        this.recommendationsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.playlists = [];
        this.playlistsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
    }
    MusicService.prototype.getRecommendations = function () {
        return this.recommendations;
    };
    MusicService.prototype.getRecommendationsObservable = function () {
        return this.recommendationsSubject.asObservable();
    };
    MusicService.prototype.getPlaylists = function () {
        return this.playlists;
    };
    MusicService.prototype.getPlaylistsObservable = function () {
        return this.playlistsSubject.asObservable();
    };
    MusicService.prototype.refreshMusic = function () {
        var _this = this;
        this.queryService.getRecommendations().subscribe(function (response) {
            var stringIds = response.body.split(',');
            var ids = stringIds.map(function (value) {
                return parseInt(value);
            });
            _this.queryService.selectSongs(ids).subscribe(function (response) {
                var songs = JSON.parse(response.body);
                _this.recommendations = songs;
                _this.recommendationsSubject.next(_this.recommendations);
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
        this.queryService.listPlaylists().subscribe(function (response) {
            var playlists = JSON.parse(response.body);
            _this.playlists = playlists;
            _this.playlistsSubject.next(_this.playlists);
        }, function (err) {
            console.log(err);
        });
    };
    MusicService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__query_service__["a" /* QueryService */]])
    ], MusicService);
    return MusicService;
}());



/***/ }),

/***/ "../../../../../src/app/services/query.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DOMAIN */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// const API_HOST: string = 'http://138.68.69.43/';
var API_HOST = '';
var DOMAIN = '138.68.69.43';
var QueryService = (function () {
    function QueryService(http) {
        this.http = http;
    }
    QueryService.prototype.register = function (login, password) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('login', login)
            .append('pass', password);
        return this.http.get(API_HOST + 'method/regUser', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.login = function (login, password) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('login', login)
            .append('pass', password);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(API_HOST + 'method/login', {
            withCredentials: true,
            params: params,
            headers: headers,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.registerListen = function (id) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('id', id.toString());
        return this.http.get(API_HOST + 'method/registerListen', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.getRecommendations = function () {
        return this.http.get(API_HOST + 'method/getRecomendations', {
            withCredentials: true,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.selectSongs = function (ids) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('ids', ids.join(','));
        return this.http.get(API_HOST + 'method/selectSongs', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.createPlaylist = function (name) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('name', name);
        return this.http.get(API_HOST + 'method/createPlaylist', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.deletePlaylist = function (playlistId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('playlist', playlistId);
        return this.http.get(API_HOST + 'method/deletePlaylist', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.insertInPlaylist = function (playlistId, songId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('playlist', playlistId)
            .append('song', songId)
            .append('prevPos', '0')
            .append('nextPos', '0');
        return this.http.get(API_HOST + 'method/insertInPlaylist', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.deleteFromPlaylist = function (playlistId, songId, pos) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('playlist', playlistId)
            .append('song', songId)
            .append('pos', pos.toString());
        return this.http.get(API_HOST + 'method/deleteFromPlaylist', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.getPlaylistSongs = function (playlistId) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('playlist', playlistId);
        return this.http.get(API_HOST + 'method/getPlaylistSongs', {
            withCredentials: true,
            params: params,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService.prototype.listPlaylists = function () {
        return this.http.get(API_HOST + 'method/listPlaylists', {
            withCredentials: true,
            observe: 'response',
            responseType: 'text'
        });
    };
    QueryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], QueryService);
    return QueryService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map