define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      }, {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users'
      }, {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'helpTickets'
      }]);
    };

    return App;
  }();

  _exports.App = App;
});
define('text!app.html',[],function(){return "<template>\n  <nav-bar> </nav-bar>\n  <router-view></router-view>\n</template>";});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "./auth-config", "regenerator-runtime"], function (_exports, _environment, _authConfig, _regeneratorRuntime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _authConfig = _interopRequireDefault(_authConfig);
  _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  window.regeneratorRuntime = _regeneratorRuntime.default;
  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editHelpTicket.html',[],function(){return "<template>\n    <div class=\"container\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-8\">\n                <div class=\"list-group-item\">\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\n                    <span show.bind=\"helpTicket._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\n                </div>\n                <form>\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\n                        <label for=\"title\">Title</label>\n                        <input type=\"text\" readonly.bind=\"helpTicket._id\" class=\"form-control\" value.bind=\"helpTicket.title\"\n                            id=\"title\" placeholder=\"Title\">\n                    </div>\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\n                        <label for=\"content\">Description</label>\n                        <textarea type=\"text\" value.bind=\"helpTicketContent.content\" class=\"form-control\" rows=\"8\"></textarea>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-2\">\n                            <label class=\"btn btn-primary\">\n                                Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\n                                    files.bind=\"files\">\n                            </label>\n                        </div>\n                        <div class=\"col-10\">\n                            <ul>\n                                <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\n                                        click.delegate=\"removeFile($index)\" class=\"pull-right\"></li>\n                            </ul>\n                        </div>\n                    </div>\n\n                    <div class=\"card\" repeat.for=\"content of helpTickets.helpTicketContentsArray\">\n                        <div class=\"card-body\">\n                            <div class=\"row\" style=\"padding:3px;\">\n                                <div class=\"col-3\">\n                                    <span innerhtml.bind=\"content.dateCreated | formatDate\"></span><br />\n                                    ${content.personId.firstName} ${content.personId.lastName}\n                                </div>\n                                <div class=\"col-9\" style=\"border-left-style: solid; border-left-width: 1px;\">\n                                    ${content.content}\n                                </div>\n                                <div>\n                                    <a href=\"http://localhost:5000/uploadedFiles/helpTickets/${content.file.fileName}\" target=\"_blank\">${content.file.originalFileName}</a>\n                                </div>\n                        \n\n\n                            </div>\n                        </div>\n\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</template>";});
define('text!modules/components/editUser.html',[],function(){return "<template>\n    <div class=\"container\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-sm-8\">\n                <div class=\"list-group-item\">\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\n                    <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\n                </div>\n                <div class=\"form-group\" style=\"margin-top:20px;\">\n                    <label for=\"firstName\">First name</label>\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.firstName\" id=\"firstName\" placeholder=\"First name\">\n                </div>\n                <div class=\"form-group\" style=\"margin-top:20px;\">\n                    <label for=\"lastName\">Last name</label>\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.lastName\" id=\"lastName\" placeholder=\"Last name\">\n                </div>\n                <div class=\"form-group\" style=\"margin-top:20px;\">\n                    <label for=\"email\">Email</label>\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"email\" placeholder=\"Email\">\n                </div>\n                <div class=\"form-group\" style=\"margin-top:20px;\">\n                    <label for=\"password\">Password</label>\n                    <input type=\"password\" class=\"form-control\" value.bind=\"user.password\" id=\"password\" placeholder=\"Password\">\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"role\">Role</label>\n                    <select class=\"form-control\" value.bind=\"user.role\" id=\"role\">\n                        <option value=\"user\">User</option>\n                        <option value=\"staff\">Staff</option>\n                        <option value=\"admin\">Administrator</option>\n                    </select>\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\n                    <label class=\"form-check-label\" for=\"defaultCheck1\">\n                        Active\n                    </label>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</template>";});
define('text!modules/components/tableHelpTicket.html',[],function(){return "    <template>\n        <div class=\"container\">\n            <div class=\"row justify-content-center\">\n                <div class=\"col-8\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th colspan=\"4\">\n                                    <span click.trigger=\"newHelpTicket()\"><i data-feather=\"plus\"></i></span>\n                                    <span click.trigger=\"activate()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\n                                </th>\n                            </tr>\n                            <tr>\n                                <th scope=\"col\">Title</th>\n                                <th scope=\"col\">Status</th>\n                                <th scope=\"col\">Person</th>\n                                <th scope=\"col\">Owner</th>\n\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr click.trigger=\"editHelpTicket(helpTicket)\" repeat.for=\"helpTicket of helpTickets.helpTicketsArray\">\n                                <td>${helpTicket.title}</td>\n                                <td>${helpTicket.status}</td>\n                                <td>${helpTicket.personId.firstName} ${helpTicket.personId.lastName} </td>\n                                <td>${helpTicket.ownerId.firstName} ${helpTicket.ownerId.lastName} </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n\n    </template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\n    <div class=\"container\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-8\">\n                <table class=\"table\">\n                    <thead>\n                        <tr>\n                            <th colspan=\"4\">\n                                <span click.trigger=\"newUser()\"><i data-feather=\"plus\"></i></span>\n                                <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\n                            </th>\n                        </tr>\n                        <tr>\n                            <th scope=\"col\">First</th>\n                            <th scope=\"col\">Last</th>\n                            <th scope=\"col\">Role</th>\n                            <th scope=\"col\">Active</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr repeat.for=\"user of users.usersArray\">\n                            <td click.trigger=\"editUser(user)\" >${user.firstName}</td>\n                            <td click.trigger=\"editUser(user)\">${user.lastName}</td>\n                            <td click.trigger=\"editUser(user)\">${user.role}</td>\n                            <td>\n                                <div class=\"form-check\">\n                                    <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\n                                        type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\n                                </div>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</template>";});
define('modules/helpTickets',["exports", "aurelia-framework", "aurelia-router", "../resources/data/help-ticket-object"], function (_exports, _aureliaFramework, _aureliaRouter, _helpTicketObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.HelpTickets = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var HelpTickets = (_dec = (0, _aureliaFramework.inject)(_helpTicketObject.HelpTicket), _dec(_class =
  /*#__PURE__*/
  function () {
    function HelpTickets(helpTicket) {
      this.helpTickets = helpTicket;
      this.showHelpTicketEditForm = false;
      this.message = "HelpTickets";
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    var _proto = HelpTickets.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getHelpTicket();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.showEditForm = function showEditForm() {
      this.showHelpTicketEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.getHelpTicket =
    /*#__PURE__*/
    function () {
      var _getHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.helpTickets.getHelpTickets(this.userObj);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getHelpTicket() {
        return _getHelpTicket.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.newHelpTicket = function newHelpTicket() {
      this.helpTicket = {
        title: "",
        personId: this.userObj._id,
        ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
        status: 'new'
      };
      this.helpTicketContent = {
        personId: this.userObj._id,
        content: ""
      };
      this.helpTickets.helpTicketContentsArray = [];
      this.showEditForm();
    };

    _proto.editHelpTicket =
    /*#__PURE__*/
    function () {
      var _editHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(helpTicket) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.helpTicket = helpTicket;
                this.helpTicketContent = {
                  personId: this.userObj._id,
                  content: ""
                };
                _context3.next = 4;
                return this.helpTickets.getHelpTicketsContents(helpTicket._id);

              case 4:
                this.showEditForm();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function editHelpTicket(_x) {
        return _editHelpTicket.apply(this, arguments);
      };
    }();

    _proto.back = function back() {
      this.showHelpTicketEditForm = false;
      this.showHelpTicketDisplayForm = false;
      this.filesToUpload = new Array();
      this.files = new Array();
    };

    _proto.changeFiles = function changeFiles() {
      var _this = this;

      this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

      for (var i = 0; i < this.files.length; i++) {
        var addFile = true;
        this.filesToUpload.forEach(function (item) {
          if (item.name === _this.files[i].name) addFile = false;
        });
        if (addFile) this.filesToUpload.push(this.files[i]);
      }
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var helpTicket, serverResponse;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content)) {
                  _context4.next = 10;
                  break;
                }

                if (this.userObj.role !== 'user') {
                  this.helpTicket.ownerId = this.userObj._id;
                }

                helpTicket = {
                  helpTicket: this.helpTicket,
                  content: this.helpTicketContent
                };
                _context4.next = 5;
                return this.helpTickets.saveHelpTicket(helpTicket);

              case 5:
                serverResponse = _context4.sent;

                if (this.filesToUpload && this.filesToUpload.length > 0) {
                  this.helpTickets.uploadFile(this.filesToUpload, serverResponse.contentID);
                }

                _context4.next = 9;
                return this.getHelpTicket();

              case 9:
                this.back();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.helpTicket && this.helpTicketContent)) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return this.helpTickets.delete(this.helpTicket);

              case 3:
                _context5.next = 5;
                return this.getHelpTicket();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    return HelpTickets;
  }()) || _class);
  _exports.HelpTickets = HelpTickets;
});
define('text!modules/helpTickets.html',[],function(){return "<template>\n        <h1>${message}</h1>\n         <compose show.bind=\"showHelpTicketEditForm\" view=\"./components/editHelpTicket.html\"></compose>\n         <compose show.bind=\"!showHelpTicketEditForm\" view=\"./components/tableHelpTicket.html\"></compose>\n</template>";});
define('modules/home',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Home = void 0;

  var _dec, _class;

  var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class =
  /*#__PURE__*/
  function () {
    function Home(router) {
      this.router = router;
      this.message = 'Home';
    }

    var _proto = Home.prototype;

    _proto.login = function login() {
      this.router.navigate('users');
    };

    return Home;
  }()) || _class);
  _exports.Home = Home;
});
define('text!modules/home.html',[],function(){return "<template>\n    <h1>${message}</h1>\n</template>";});
define('modules/landing',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.landing = void 0;

  var landing = function landing() {};

  _exports.landing = landing;
});
define('text!modules/landing.html',[],function(){return "<template>  \n\n</template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Users';
      this.showUserEditForm = false;
    }

    var _proto = Users.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.newUser = function newUser() {
      this.user = {
        firstName: "",
        lastName: "",
        active: true,
        role: "",
        email: "",
        password: ""
      };
      this.openEditForm();
    };

    _proto.editUser = function editUser(user) {
      this.user = user;
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.user && this.user.firstName && this.user.lastName && this.user.email && this.user.password)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context3.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.user) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context4.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    };

    _proto.back = function back() {
      this.showUserEditForm = false;
    };

    _proto.logout = function logout() {
      this.router.navigate('home');
    };

    return Users;
  }()) || _class);
  _exports.Users = Users;
});
define('text!modules/users.html',[],function(){return "<template>\n        <h1>${message}</h1>\n         <compose show.bind=\"showUserEditForm\" view=\"./components/editUser.html\"></compose>\n         <compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\"></compose>\n</template>";});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            console.log('Requesting ${request.method} ${request.url}');
            return _request;
          },
          response: function response(_response) {
            console.log('Received ${response.status} ${response.url}');
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
});
define('resources/data/help-ticket-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.HelpTicket = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var HelpTicket = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function HelpTicket(data) {
      this.data = data;
      this.HELP_TICKET_SERVICE = 'helpTickets';
      this.HELP_TICKET_CONTENT_SERVICE = 'helpTicketContents';
    }

    var _proto = HelpTicket.prototype;

    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.HELP_TICKET_SERVICE;

                if (userObj.role == 'user') {
                  url += '/user/' + userObj._id;
                }

                _context.next = 4;
                return this.data.get(url);

              case 4:
                response = _context.sent;

                if (!response.error) {
                  this.helpTicketsArray = response;
                } else {
                  this.helpTicketsArray = [];
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getHelpTickets(_x) {
        return _getHelpTickets.apply(this, arguments);
      };
    }();

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(files, id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.uploadFiles(files, this.HELP_TICKET_CONTENT_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function uploadFile(_x2, _x3) {
        return _uploadFile.apply(this, arguments);
      };
    }();

    _proto.saveHelpTicket =
    /*#__PURE__*/
    function () {
      var _saveHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(helpTicket) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!helpTicket) {
                  _context3.next = 11;
                  break;
                }

                if (!helpTicket.helpTicket._id) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return this.data.put(helpTicket, this.HELP_TICKET_SERVICE);

              case 4:
                serverResponse = _context3.sent;
                _context3.next = 10;
                break;

              case 7:
                _context3.next = 9;
                return this.data.post(helpTicket, this.HELP_TICKET_SERVICE);

              case 9:
                serverResponse = _context3.sent;

              case 10:
                return _context3.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function saveHelpTicket(_x4) {
        return _saveHelpTicket.apply(this, arguments);
      };
    }();

    _proto.getHelpTicketsContents =
    /*#__PURE__*/
    function () {
      var _getHelpTicketsContents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(helpTicketId) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!helpTicketId) {
                  _context4.next = 6;
                  break;
                }

                url = this.HELP_TICKET_CONTENT_SERVICE + '/helpTicket/' + helpTicketId;
                _context4.next = 4;
                return this.data.get(url);

              case 4:
                response = _context4.sent;

                if (!response.error) {
                  this.helpTicketContentsArray = response;
                } else {
                  this.helpTicketContentsArray = [];
                }

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getHelpTicketsContents(_x5) {
        return _getHelpTicketsContents.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(helpTicket) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(helpTicket && helpTicket._id)) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicket._id);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function _delete(_x6) {
        return _delete2.apply(this, arguments);
      };
    }();

    return HelpTicket;
  }()) || _class);
  _exports.HelpTicket = HelpTicket;
});
define('resources/data/todos',[], function () {
  "use strict";
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 11;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(user && user._id)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _delete(_x2) {
        return _delete2.apply(this, arguments);
      };
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    return User;
  }()) || _class);
  _exports.User = User;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.isAuthenticated = false;
      this.router = router;
      this.auth = auth;
      this.loginError = '';
    }

    var _proto = NavBar.prototype;

    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginError = "Invalid credentials.";
      });
    };

    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    _proto.logout = function logout() {
      if (this.userObj) this.auth.logout(this.userObj.email);
      sessionStorage.removeItem('user');
      this.isAuthenticated = this.auth.isAuthenticated();
      this.auth.logout();
    };

    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\n        <nav class=\"navbar navbar-expand-lg navbar navbar-dark bg-dark\">\n                <a class=\"navbar-brand\" href=\"#\">Help Me!</a>\n                <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n                  <span class=\"navbar-toggler-icon\"></span>\n                </button>\n                <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\n                    <form show.bind=\"!isAuthenticated\" class=\"form-inline\">\n                            <div class=\"form-group mb-2\">\n                                <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\n                                <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"Email\" >\n                            </div>\n                            <div class=\"form-group mx-sm-3 mb-2\">\n                                <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\n                                <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\" placeholder=\"Password\">\n                            </div>\n                            <button click.trigger=\"login()\" type=\"submit\" class=\"btn btn-primary mb-2\">Login</button>\n                            <span show.bind=\"loginError\" style=\"color: white;margin-left: 10px;\">${loginError}</span> \n                    \n                    </form>\n                  <ul show.bind=\"isAuthenticated\" class=\"navbar-nav\">\n                    <li class=\"nav-item active\">\n                      <a class=\"nav-link\" href=\"#home\">Home <span class=\"sr-only\">(current)</span></a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a class=\"nav-link\" href=\"#users\">Users</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a class=\"nav-link\" href=\"#helpTickets\">Help Tickets</a>\n                    </li>\n                    <li class=\"nav-item\">\n                      <a class=\"nav-link\" href=\"#\" click.trigger=\"logout()\">Logout</a>\n                    </li>\n                  </ul>\n                </div>\n              </nav>\n</template>";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar', './value-converters/format-date']);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map