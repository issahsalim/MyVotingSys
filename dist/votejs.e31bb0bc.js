// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var Year = document.getElementById('getYear');
Vbtn = document.getElementById("votebtn");
Checkbtn = document.getElementById("checkvote");
votemess = document.querySelector('.voteStatus');
CurrentVoteTime = document.querySelector('.votetime');
VbtnandCheckbtn = document.getElementById('btns');
timeExpireMessage = document.querySelector('.time_expire_mess');
votesucceddmess = document.querySelector('.votesucceddmess');
document.addEventListener("DOMContentLoaded", function () {
  var vote = "";
  var AlreadyVoted = false;

  // VOTE BUTTON 
  Vbtn.addEventListener('click', function () {
    var SelectedCandidate = document.querySelector('input[name="radio"]:checked');
    if (SelectedCandidate && !AlreadyVoted) {
      // FIND CANDIDATE NAME IN RENDER_CANDIDATE ARRAY
      var candidateIdmatchcandidateName = RenderCandidate.find(function (candidateName) {
        return candidateName.name === SelectedCandidate.id;
      });
      if (candidateIdmatchcandidateName) {
        // INCREASING CANDIDATE VOTES
        vote = (candidateIdmatchcandidateName.vote++).toString();
        votesucceddmess.innerHTML = "\n                <div class=\"alert alert-success alert-dismissible text-center fw-bold  \" fade show>\n                THANK YOU FOR YOUR VOTES\uD83D\uDE4F\u2764\uFE0F \n                <button class=\"btn-close\" data-bs-dismiss=\"alert\"></button></div>\n                ";
        setTimeout(function () {
          votesucceddmess.style.display = "none";
          votesucceddmess.style.opacity = 1;
        }, 2000);
      }
      AlreadyVoted = true;
    }
    // ALERT WHEN ALREADY VOTE
    else if (AlreadyVoted) {
      votemess.innerHTML = "\n            <div class=\"alert alert-danger alert-dismissible text-center fw-bold  \" fade show>Salim said You have already vote\uD83D\uDE12\n            <button class=\"btn-close\" data-bs-dismiss=\"alert\"></button></div>\n            ";
    } else {
      // ATTEMPT TO VOTE WHEN CANDIDATE NOT SELECTED

      votemess.innerHTML = "\n            <div class=\"alert alert-danger alert-dismissible text-center fs-6\" fade show>\n             <strong>Salim said Please choose candidate before voting \uD83D\uDC47</strong>\n            <button class=\"btn-close\" data-bs-dismiss=\"alert\"></button></div>\n            ";
    }
  });

  // CHECK VOTE BUTTON
  Checkbtn.addEventListener('click', function () {
    Checkbtn.style.display = "none";
    Vbtn.style.display = "none";

    // TABLE TO RENDER VOTES 
    var TableforVoteandName = RenderCandidate.map(function (voteandname) {
      return "\n            <tr>\n            \n            <td >".concat(voteandname.name, "</td>\n            <td>").concat(voteandname.vote, "</td> \n            </tr>\n            ");
    }).join("");
    votemess.innerHTML = " \n        <table class=\"table\">\n            <tr scope=\"col\">\n              \n            <th scope=\"col\">Names</th>\n            <th>Vote</th>\n               \n            </tr>\n          \n            <tbody> \n            ".concat(TableforVoteandName, "\n            </tbody>  \n        </table>\n        <div class=\"d-flex justify-content-center \"><button class=\"btn btn-primary\" onClick='goBack()'>\n        <a href=\"index.html\" class=\"class-link text-white t\">Back</a></button></div>\n        ");
    render.style.display = "none";
  });

  // vote time
  function VoteTime() {
    var Time = new Date();
    var hour = Time.getHours().toString().padStart(1, '0');
    var minute = Time.getMinutes().toString().padStart(2, '0');
    var seconds = Time.getSeconds().toString().padStart(2, '0');
    // get Current Year
    Year.innerHTML = Time.getFullYear();
    CurrentVoteTime.innerHTML = "Current time ".concat(hour, ":").concat(minute, ":").concat(seconds);
    var votetimecontainer = document.querySelector('.votetimecontainer');

    // VOTE TIME END'S LOGIC
    if (hour === '17' && minute === '35') {
      render.style.display = "none";
      Vbtn.style.display = "none";
      Checkbtn.classList.add('CheckVote');
      votetimecontainer.classList.add('endtimepro');
      votetimecontainer.classList.remove('votetimecontainer');
      timeExpireMessage.innerHTML = "Vote Time end's";
    }
  }
  // UPDATING TIME EVERY SECONDS
  setInterval(VoteTime, 1000);
  VoteTime();
});
},{}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49310" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/votejs.e31bb0bc.js.map