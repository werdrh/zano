/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  let t = !1;
  setTimeout(() => {
    if (t) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  var e = function () {
    return (
      (e =
        Object.assign ||
        function (t) {
          for (var e, i = 1, s = arguments.length; i < s; i++)
            for (var o in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      e.apply(this, arguments)
    );
  };
  var i = (function () {
    function t(t) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(t)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (t.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (t) {
            var e = (16 * Math.random()) | 0;
            return ("x" == t ? e : (3 & e) | 8).toString(16);
          }
        );
      }),
      (t.prototype._getSelector = function (t, e) {
        return (
          void 0 === e && (e = document),
          "string" != typeof t
            ? t
            : ((e = e || document),
              "#" === t.substring(0, 1)
                ? e.querySelector(t)
                : e.querySelectorAll(t))
        );
      }),
      (t.prototype._each = function (t) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, t)
              : t(this.selector, 0),
            this)
          : this;
      }),
      (t.prototype._setCssVendorPrefix = function (t, e, i) {
        var s = e.replace(/-([a-z])/gi, function (t, e) {
          return e.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(s)
          ? ((t.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
            (t.style["webkit" + s] = i),
            (t.style["moz" + s] = i),
            (t.style["ms" + s] = i),
            (t.style["o" + s] = i))
          : (t.style[s] = i);
      }),
      (t.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (t.prototype.isEventMatched = function (t, e) {
        var i = e.split(".");
        return t
          .split(".")
          .filter(function (t) {
            return t;
          })
          .every(function (t) {
            return -1 !== i.indexOf(t);
          });
      }),
      (t.prototype.attr = function (t, e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.getAttribute(t)
            : ""
          : (this._each(function (i) {
              i.setAttribute(t, e);
            }),
            this);
      }),
      (t.prototype.find = function (t) {
        return s(this._getSelector(t, this.selector));
      }),
      (t.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? s(this.selector[0])
          : s(this.selector);
      }),
      (t.prototype.eq = function (t) {
        return s(this.selector[t]);
      }),
      (t.prototype.parent = function () {
        return s(this.selector.parentElement);
      }),
      (t.prototype.get = function () {
        return this._getFirstEl();
      }),
      (t.prototype.removeAttr = function (t) {
        var e = t.split(" ");
        return (
          this._each(function (t) {
            e.forEach(function (e) {
              return t.removeAttribute(e);
            });
          }),
          this
        );
      }),
      (t.prototype.wrap = function (t) {
        if (!this.firstElement) return this;
        var e = document.createElement("div");
        return (
          (e.className = t),
          this.firstElement.parentNode.insertBefore(e, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          e.appendChild(this.firstElement),
          this
        );
      }),
      (t.prototype.addClass = function (t) {
        return (
          void 0 === t && (t = ""),
          this._each(function (e) {
            t.split(" ").forEach(function (t) {
              t && e.classList.add(t);
            });
          }),
          this
        );
      }),
      (t.prototype.removeClass = function (t) {
        return (
          this._each(function (e) {
            t.split(" ").forEach(function (t) {
              t && e.classList.remove(t);
            });
          }),
          this
        );
      }),
      (t.prototype.hasClass = function (t) {
        return !!this.firstElement && this.firstElement.classList.contains(t);
      }),
      (t.prototype.hasAttribute = function (t) {
        return !!this.firstElement && this.firstElement.hasAttribute(t);
      }),
      (t.prototype.toggleClass = function (t) {
        return this.firstElement
          ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t), this)
          : this;
      }),
      (t.prototype.css = function (t, e) {
        var i = this;
        return (
          this._each(function (s) {
            i._setCssVendorPrefix(s, t, e);
          }),
          this
        );
      }),
      (t.prototype.on = function (e, i) {
        var s = this;
        return this.selector
          ? (e.split(" ").forEach(function (e) {
              Array.isArray(t.eventListeners[e]) || (t.eventListeners[e] = []),
                t.eventListeners[e].push(i),
                s.selector.addEventListener(e.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (t.prototype.once = function (t, e) {
        var i = this;
        return (
          this.on(t, function () {
            i.off(t), e(t);
          }),
          this
        );
      }),
      (t.prototype.off = function (e) {
        var i = this;
        return this.selector
          ? (Object.keys(t.eventListeners).forEach(function (s) {
              i.isEventMatched(e, s) &&
                (t.eventListeners[s].forEach(function (t) {
                  i.selector.removeEventListener(s.split(".")[0], t);
                }),
                (t.eventListeners[s] = []));
            }),
            this)
          : this;
      }),
      (t.prototype.trigger = function (t, e) {
        if (!this.firstElement) return this;
        var i = new CustomEvent(t.split(".")[0], { detail: e || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (t.prototype.load = function (t) {
        var e = this;
        return (
          fetch(t).then(function (t) {
            e.selector.innerHTML = t;
          }),
          this
        );
      }),
      (t.prototype.html = function (t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (e) {
              e.innerHTML = t;
            }),
            this);
      }),
      (t.prototype.append = function (t) {
        return (
          this._each(function (e) {
            "string" == typeof t
              ? e.insertAdjacentHTML("beforeend", t)
              : e.appendChild(t);
          }),
          this
        );
      }),
      (t.prototype.prepend = function (t) {
        return (
          this._each(function (e) {
            e.insertAdjacentHTML("afterbegin", t);
          }),
          this
        );
      }),
      (t.prototype.remove = function () {
        return (
          this._each(function (t) {
            t.parentNode.removeChild(t);
          }),
          this
        );
      }),
      (t.prototype.empty = function () {
        return (
          this._each(function (t) {
            t.innerHTML = "";
          }),
          this
        );
      }),
      (t.prototype.scrollTop = function (t) {
        return void 0 !== t
          ? ((document.body.scrollTop = t),
            (document.documentElement.scrollTop = t),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (t.prototype.scrollLeft = function (t) {
        return void 0 !== t
          ? ((document.body.scrollLeft = t),
            (document.documentElement.scrollLeft = t),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (t.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var t = this.firstElement.getBoundingClientRect(),
          e = s("body").style().marginLeft;
        return {
          left: t.left - parseFloat(e) + this.scrollLeft(),
          top: t.top + this.scrollTop(),
        };
      }),
      (t.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (t.prototype.width = function () {
        var t = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(t.paddingLeft) -
          parseFloat(t.paddingRight)
        );
      }),
      (t.prototype.height = function () {
        var t = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(t.paddingTop) -
          parseFloat(t.paddingBottom)
        );
      }),
      (t.eventListeners = {}),
      t
    );
  })();
  function s(t) {
    return (
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (t, e) {
          e = e || { bubbles: !1, cancelable: !1, detail: null };
          var i = document.createEvent("CustomEvent");
          return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
        };
      })(),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
      new i(t)
    );
  }
  var o = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function n(t) {
    return "href" === t
      ? "src"
      : (t = (t =
          (t = t.replace("data-", "")).charAt(0).toLowerCase() +
          t.slice(1)).replace(/-([a-z])/g, function (t) {
          return t[1].toUpperCase();
        }));
  }
  var r = function (t, e, i, o) {
      void 0 === i && (i = 0);
      var n = s(t).attr("data-lg-size") || o;
      if (n) {
        var r = n.split(",");
        if (r[1])
          for (var l = window.innerWidth, a = 0; a < r.length; a++) {
            var d = r[a];
            if (parseInt(d.split("-")[2], 10) > l) {
              n = d;
              break;
            }
            a === r.length - 1 && (n = d);
          }
        var g = n.split("-"),
          h = parseInt(g[0], 10),
          c = parseInt(g[1], 10),
          u = e.width(),
          m = e.height() - i,
          p = Math.min(u, h),
          f = Math.min(m, c),
          v = Math.min(p / h, f / c);
        return { width: h * v, height: c * v };
      }
    },
    l = function (t, e, i, o, n) {
      if (n) {
        var r = s(t).find("img").first();
        if (r.get()) {
          var l = e.get().getBoundingClientRect(),
            a = l.width,
            d = e.height() - (i + o),
            g = r.width(),
            h = r.height(),
            c = r.style(),
            u =
              (a - g) / 2 -
              r.offset().left +
              (parseFloat(c.paddingLeft) || 0) +
              (parseFloat(c.borderLeft) || 0) +
              s(window).scrollLeft() +
              l.left,
            m =
              (d - h) / 2 -
              r.offset().top +
              (parseFloat(c.paddingTop) || 0) +
              (parseFloat(c.borderTop) || 0) +
              s(window).scrollTop() +
              i;
          return (
            "translate3d(" +
            (u *= -1) +
            "px, " +
            (m *= -1) +
            "px, 0) scale3d(" +
            g / n.width +
            ", " +
            h / n.height +
            ", 1)"
          );
        }
      }
    },
    a = function (t, e, i, s, o, n) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        t +
        "; max-width:" +
        i +
        "; height: " +
        e +
        "; max-height:" +
        s +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (n ? 'title="' + n + '"' : "") +
        ' src="' +
        o +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    d = function (t, e, i, s, o, n) {
      var r =
          "<img " +
          i +
          " " +
          (s ? 'srcset="' + s + '"' : "") +
          "  " +
          (o ? 'sizes="' + o + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          t +
          '" src="' +
          e +
          '" />',
        l = "";
      n &&
        (l = ("string" == typeof n ? JSON.parse(n) : n).map(function (t) {
          var e = "";
          return (
            Object.keys(t).forEach(function (i) {
              e += " " + i + '="' + t[i] + '"';
            }),
            "<source " + e + "></source>"
          );
        }));
      return "" + l + r;
    },
    g = function (t) {
      for (var e = [], i = [], s = "", o = 0; o < t.length; o++) {
        var n = t[o].split(" ");
        "" === n[0] && n.splice(0, 1), i.push(n[0]), e.push(n[1]);
      }
      for (var r = window.innerWidth, l = 0; l < e.length; l++)
        if (parseInt(e[l], 10) > r) {
          s = i[l];
          break;
        }
      return s;
    },
    h = function (t) {
      return !!t && !!t.complete && 0 !== t.naturalWidth;
    },
    c = function (t, e, i, s) {
      return (
        '<div class="lg-video-cont ' +
        (s && s.youtube
          ? "lg-has-youtube"
          : s && s.vimeo
          ? "lg-has-vimeo"
          : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (e || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        t +
        '" />\n        </div>'
      );
    },
    u = function (t, e, i, r) {
      var l = [],
        a = (function () {
          for (var t = 0, e = 0, i = arguments.length; e < i; e++)
            t += arguments[e].length;
          var s = Array(t),
            o = 0;
          for (e = 0; e < i; e++)
            for (var n = arguments[e], r = 0, l = n.length; r < l; r++, o++)
              s[o] = n[r];
          return s;
        })(o, e);
      return (
        [].forEach.call(t, function (t) {
          for (var e = {}, o = 0; o < t.attributes.length; o++) {
            var d = t.attributes[o];
            if (d.specified) {
              var g = n(d.name),
                h = "";
              a.indexOf(g) > -1 && (h = g), h && (e[h] = d.value);
            }
          }
          var c = s(t),
            u = c.find("img").first().attr("alt"),
            m = c.attr("title"),
            p = r ? c.attr(r) : c.find("img").first().attr("src");
          (e.thumb = p),
            i && !e.subHtml && (e.subHtml = m || u || ""),
            (e.alt = u || m || ""),
            l.push(e);
        }),
        l
      );
    },
    m = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    p = function (t, e, i) {
      if (!t)
        return e
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (i + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
            );
      var s = t.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
        ),
        o = t.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
        ),
        n = t.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
        );
      return s ? { youtube: s } : o ? { vimeo: o } : n ? { wistia: n } : void 0;
    },
    f = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
    },
    v = "lgAfterAppendSlide",
    y = "lgInit",
    b = "lgHasVideo",
    I = "lgContainerResize",
    C = "lgUpdateSlides",
    w = "lgAfterAppendSubHtml",
    x = "lgBeforeOpen",
    S = "lgAfterOpen",
    T = "lgSlideItemLoad",
    E = "lgBeforeSlide",
    O = "lgAfterSlide",
    L = "lgPosterClick",
    A = "lgDragStart",
    P = "lgDragMove",
    k = "lgDragEnd",
    D = "lgBeforeNextSlide",
    z = "lgBeforePrevSlide",
    G = "lgBeforeClose",
    M = "lgAfterClose",
    V = 0,
    _ = (function () {
      function t(t, e) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !t)
        )
          return this;
        if (
          (V++,
          (this.lgId = V),
          (this.el = t),
          (this.LGel = s(t)),
          this.generateSettings(e),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (t.prototype.generateSettings = function (t) {
          if (
            ((this.settings = e(e({}, f), t)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : m())
          ) {
            var i = e(
              e({}, this.settings.mobileSettings),
              this.settings.mobileSettings
            );
            this.settings = e(e({}, this.settings), i);
          }
        }),
        (t.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length
            ));
        }),
        (t.prototype.init = function () {
          var t = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(y, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              t.enableDrag(), t.enableSwipe(), t.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (t.prototype.openGalleryOnItemClick = function () {
          for (
            var t = this,
              e = function (e) {
                var n = o.items[e],
                  r = s(n),
                  l = i.generateUUID();
                r.attr("data-lg-id", l).on(
                  "click.lgcustom-item-" + l,
                  function (i) {
                    i.preventDefault();
                    var s = t.settings.index || e;
                    t.openGallery(s, n);
                  }
                );
              },
              o = this,
              n = 0;
            n < this.items.length;
            n++
          )
            e(n);
        }),
        (t.prototype.buildModules = function () {
          var t = this;
          this.settings.plugins.forEach(function (e) {
            t.plugins.push(new e(t, s));
          });
        }),
        (t.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use"
              )
            : console.error("Please provide a valid license key");
        }),
        (t.prototype.getSlideItem = function (t) {
          return s(this.getSlideItemId(t));
        }),
        (t.prototype.getSlideItemId = function (t) {
          return "#lg-item-" + this.lgId + "-" + t;
        }),
        (t.prototype.getIdName = function (t) {
          return t + "-" + this.lgId;
        }),
        (t.prototype.getElementById = function (t) {
          return s("#" + this.getIdName(t));
        }),
        (t.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (t.prototype.buildStructure = function () {
          var t = this;
          if (!(this.$container && this.$container.get())) {
            var e = "",
              i = "";
            this.settings.controls &&
              (e =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (i =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var o = "";
            this.settings.allowMediaOverlap && (o += "lg-media-overlap ");
            var n = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              r = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              l =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              a =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="Close gallery" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              d = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="Toggle maximize" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              g =
                '\n        <div class="' +
                l +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                n +
                " " +
                r +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                o +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                e +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                d +
                "\n                    " +
                a +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            s(this.settings.container).css("position", "relative").append(g),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms"
              );
            var h = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (h += "lg-grab "),
              this.outer.addClass(h),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms"
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                ),
              this.counter(),
              s(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  t.refreshOnResize();
                }
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (t.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var t = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var e = this.mediaContainerPosition,
              i = e.top,
              s = e.bottom;
            if (
              ((this.currentImageSize = r(
                this.items[this.index],
                this.outer,
                i + s,
                t && this.settings.videoMaxSize
              )),
              t && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var o = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", o);
            }
            this.LGel.trigger(I);
          }
        }),
        (t.prototype.resizeVideoSlide = function (t, e) {
          var i = this.getVideoContStyle(e);
          this.getSlideItem(t).find(".lg-video-cont").attr("style", i);
        }),
        (t.prototype.updateSlides = function (t, e) {
          if (
            (this.index > t.length - 1 && (this.index = t.length - 1),
            1 === t.length && (this.index = 0),
            t.length)
          ) {
            var i = this.galleryItems[e].src;
            (this.galleryItems = t),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var s = 0;
            this.galleryItems.some(function (t, e) {
              return t.src === i && ((s = e), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
              this.loadContent(s, !0),
              this.getSlideItem(s).addClass("lg-current"),
              (this.index = s),
              this.updateCurrentCounter(s),
              this.LGel.trigger(C);
          } else this.closeGallery();
        }),
        (t.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var t = s(this.settings.selectWithin);
                this.items = t.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return u(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage
          );
        }),
        (t.prototype.openGallery = function (t, e) {
          var i = this;
          if ((void 0 === t && (t = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.get().focus(),
              this.outer.removeClass("lg-hide-items"),
              this.$container.addClass("lg-show");
            var o = this.getItemsToBeInsertedToDom(t, t);
            this.currentItemsInDom = o;
            var n = "";
            o.forEach(function (t) {
              n = n + '<div id="' + t + '" class="lg-item"></div>';
            }),
              this.$inner.append(n),
              this.addHtml(t);
            var a = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var d = this.mediaContainerPosition,
              g = d.top,
              h = d.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(g, h);
            var c = this.galleryItems[t].__slideVideoInfo;
            this.zoomFromOrigin &&
              e &&
              ((this.currentImageSize = r(
                e,
                this.outer,
                g + h,
                c && this.settings.videoMaxSize
              )),
              (a = l(e, this.outer, g, h, this.currentImageSize))),
              (this.zoomFromOrigin && a) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(t).removeClass("lg-complete"));
            var u = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              i.outer.addClass("lg-components-open");
            }, u),
              (this.index = t),
              this.LGel.trigger(x),
              this.getSlideItem(t).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = s(window).scrollTop()),
              setTimeout(function () {
                if (i.zoomFromOrigin && a) {
                  var e = i.getSlideItem(t);
                  e.css("transform", a),
                    setTimeout(function () {
                      e
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          i.settings.startAnimationDuration + "ms"
                        ),
                        i.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      e.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  i.$backdrop.addClass("in"),
                    i.$container.addClass("lg-show-in");
                }, 10),
                  (i.zoomFromOrigin && a) ||
                    setTimeout(function () {
                      i.outer.addClass("lg-visible");
                    }, i.settings.backdropDuration),
                  i.slide(t, !1, !1, !1),
                  i.LGel.trigger(S);
              }),
              document.body === this.settings.container &&
                s("html").addClass("lg-on");
          }
        }),
        (t.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var t = this.$toolbar.get().clientHeight || 0,
            e = this.outer.find(".lg-components .lg-sub-html").get(),
            i =
              this.settings.defaultCaptionHeight || (e && e.clientHeight) || 0,
            s = this.outer.find(".lg-thumb-outer").get();
          return { top: t, bottom: (s ? s.clientHeight : 0) + i };
        }),
        (t.prototype.setMediaContainerPosition = function (t, e) {
          void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.$content.css("top", t + "px").css("bottom", e + "px");
        }),
        (t.prototype.hideBars = function () {
          var t = this;
          setTimeout(function () {
            t.outer.removeClass("lg-hide-items"),
              t.settings.hideBarsDelay > 0 &&
                (t.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  t.outer.removeClass("lg-hide-items"),
                    clearTimeout(t.hideBarTimeout),
                    (t.hideBarTimeout = setTimeout(function () {
                      t.outer.addClass("lg-hide-items");
                    }, t.settings.hideBarsDelay));
                }),
                t.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (t.prototype.initPictureFill = function (t) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [t.get()] });
            } catch (t) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
              );
            }
        }),
        (t.prototype.counter = function () {
          if (this.settings.counter) {
            var t =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(t);
          }
        }),
        (t.prototype.addHtml = function (t) {
          var e, i;
          if (
            (this.galleryItems[t].subHtmlUrl
              ? (i = this.galleryItems[t].subHtmlUrl)
              : (e = this.galleryItems[t].subHtml),
            !i)
          )
            if (e) {
              var o = e.substring(0, 1);
              ("." !== o && "#" !== o) ||
                (e =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? s(this.items).eq(t).find(e).first().html()
                    : s(e).first().html());
            } else e = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            i
              ? this.outer.find(".lg-sub-html").load(i)
              : this.outer.find(".lg-sub-html").html(e);
          else {
            var n = s(this.getSlideItemId(t));
            i
              ? n.load(i)
              : n.append('<div class="lg-sub-html">' + e + "</div>");
          }
          null != e &&
            ("" === e
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(w, { index: t });
        }),
        (t.prototype.preload = function (t) {
          for (
            var e = 1;
            e <= this.settings.preload && !(e >= this.galleryItems.length - t);
            e++
          )
            this.loadContent(t + e, !1);
          for (var i = 1; i <= this.settings.preload && !(t - i < 0); i++)
            this.loadContent(t - i, !1);
        }),
        (t.prototype.getDummyImgStyles = function (t) {
          return t
            ? "width:" +
                t.width +
                "px;\n                margin-left: -" +
                t.width / 2 +
                "px;\n                margin-top: -" +
                t.height / 2 +
                "px;\n                height:" +
                t.height +
                "px"
            : "";
        }),
        (t.prototype.getVideoContStyle = function (t) {
          return t
            ? "width:" +
                t.width +
                "px;\n                height:" +
                t.height +
                "px"
            : "";
        }),
        (t.prototype.getDummyImageContent = function (t, e, i) {
          var o;
          if ((this.settings.dynamic || (o = s(this.items).eq(e)), o)) {
            var n = void 0;
            if (
              !(n = this.settings.exThumbImage
                ? o.attr(this.settings.exThumbImage)
                : o.find("img").first().attr("src"))
            )
              return "";
            var r =
              "<img " +
              i +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              n +
              '" />';
            return (
              t.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              r
            );
          }
          return "";
        }),
        (t.prototype.setImgMarkup = function (t, e, i) {
          var s = this.galleryItems[i],
            o = s.alt,
            n = s.srcset,
            r = s.sizes,
            l = s.sources,
            a = o ? 'alt="' + o + '"' : "",
            g =
              '<picture class="lg-img-wrap"> ' +
              (this.isFirstSlideWithZoomAnimation()
                ? this.getDummyImageContent(e, i, a)
                : d(i, t, a, n, r, l)) +
              "</picture>";
          e.prepend(g);
        }),
        (t.prototype.onSlideObjectLoad = function (t, e, i, s) {
          var o = t.find(".lg-object").first();
          h(o.get()) || e
            ? i()
            : (o.on("load.lg error.lg", function () {
                i && i();
              }),
              o.on("error.lg", function () {
                s && s();
              }));
        }),
        (t.prototype.onLgObjectLoad = function (t, e, i, s, o, n) {
          var r = this;
          this.onSlideObjectLoad(
            t,
            n,
            function () {
              r.triggerSlideItemLoad(t, e, i, s, o);
            },
            function () {
              t.addClass("lg-complete lg-complete_"),
                t.html(
                  '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                );
            }
          );
        }),
        (t.prototype.triggerSlideItemLoad = function (t, e, i, s, o) {
          var n = this,
            r = this.galleryItems[e],
            l = o && "video" === this.getSlideType(r) && !r.poster ? s : 0;
          setTimeout(function () {
            t.addClass("lg-complete lg-complete_"),
              n.LGel.trigger(T, { index: e, delay: i || 0, isFirstSlide: o });
          }, l);
        }),
        (t.prototype.isFirstSlideWithZoomAnimation = function () {
          return !(
            this.lGalleryOn ||
            !this.zoomFromOrigin ||
            !this.currentImageSize
          );
        }),
        (t.prototype.addSlideVideoInfo = function (t) {
          var e = this;
          t.forEach(function (t, i) {
            (t.__slideVideoInfo = p(t.src, !!t.video, i)),
              t.__slideVideoInfo &&
                e.settings.loadYouTubePoster &&
                !t.poster &&
                t.__slideVideoInfo.youtube &&
                (t.poster =
                  "//img.youtube.com/vi/" +
                  t.__slideVideoInfo.youtube[1] +
                  "/maxresdefault.jpg");
          });
        }),
        (t.prototype.loadContent = function (t, e) {
          var i = this,
            o = this.galleryItems[t],
            n = s(this.getSlideItemId(t)),
            l = o.poster,
            h = o.srcset,
            u = o.sizes,
            m = o.sources,
            p = o.src,
            f = o.video,
            y = f && "string" == typeof f ? JSON.parse(f) : f;
          if (o.responsive) {
            var I = o.responsive.split(",");
            p = g(I) || p;
          }
          var C = o.__slideVideoInfo,
            w = "",
            x = !!o.iframe,
            S = !this.lGalleryOn,
            T = 0;
          if (
            (S &&
              (T =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            !n.hasClass("lg-loaded"))
          ) {
            if (C) {
              var E = this.mediaContainerPosition,
                O = E.top,
                L = E.bottom,
                A = r(
                  this.items[t],
                  this.outer,
                  O + L,
                  C && this.settings.videoMaxSize
                );
              w = this.getVideoContStyle(A);
            }
            if (x) {
              var P = a(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                this.settings.iframeMaxWidth,
                this.settings.iframeMaxHeight,
                p,
                o.iframeTitle
              );
              n.prepend(P);
            } else if (l) {
              var k = "";
              S &&
                this.zoomFromOrigin &&
                this.currentImageSize &&
                (k = this.getDummyImageContent(n, t, ""));
              P = c(l, k || "", w, C);
              n.prepend(P);
            } else if (C) {
              P = '<div class="lg-video-cont " style="' + w + '"></div>';
              n.prepend(P);
            } else if ((this.setImgMarkup(p, n, t), h || m)) {
              var D = n.find(".lg-object");
              this.initPictureFill(D);
            }
            (l || C) &&
              this.LGel.trigger(b, {
                index: t,
                src: p,
                html5Video: y,
                hasPoster: !!l,
              }),
              this.LGel.trigger(v, { index: t }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(t);
          }
          var z = 0;
          T && !s(document.body).hasClass("lg-from-hash") && (z = T),
            this.isFirstSlideWithZoomAnimation() &&
              (setTimeout(function () {
                n.removeClass(
                  "lg-start-end-progress lg-start-progress"
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              n.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if (
                    "image" === i.getSlideType(o) &&
                    (n
                      .find(".lg-img-wrap")
                      .append(d(t, p, "", h, u, o.sources)),
                    h || m)
                  ) {
                    var e = n.find(".lg-object");
                    i.initPictureFill(e);
                  }
                  ("image" === i.getSlideType(o) ||
                    ("video" === i.getSlideType(o) && l)) &&
                    (i.onLgObjectLoad(n, t, T, z, !0, !1),
                    i.onSlideObjectLoad(
                      n,
                      !(!C || !C.html5 || l),
                      function () {
                        i.loadContentOnFirstSlideLoad(t, n, z);
                      },
                      function () {
                        i.loadContentOnFirstSlideLoad(t, n, z);
                      }
                    ));
                }, this.settings.startAnimationDuration + 100)),
            n.addClass("lg-loaded"),
            (this.isFirstSlideWithZoomAnimation() &&
              ("video" !== this.getSlideType(o) || l)) ||
              this.onLgObjectLoad(n, t, T, z, S, !(!C || !C.html5 || l)),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !n.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                n.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === e &&
              (n.hasClass("lg-complete_")
                ? this.preload(t)
                : n
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      i.preload(t);
                    }));
        }),
        (t.prototype.loadContentOnFirstSlideLoad = function (t, e, i) {
          var s = this;
          setTimeout(function () {
            e.find(".lg-dummy-img").remove(),
              e.removeClass("lg-first-slide"),
              s.outer.removeClass("lg-first-slide-loading"),
              (s.isDummyImageRemoved = !0),
              s.preload(t);
          }, i + 300);
        }),
        (t.prototype.getItemsToBeInsertedToDom = function (t, e, i) {
          var s = this;
          void 0 === i && (i = 0);
          var o = [],
            n = Math.max(i, 3);
          n = Math.min(n, this.galleryItems.length);
          var r = "lg-item-" + this.lgId + "-" + e;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (t, e) {
                o.push("lg-item-" + s.lgId + "-" + e);
              }),
              o
            );
          if (t < (this.galleryItems.length - 1) / 2) {
            for (var l = t; l > t - n / 2 && l >= 0; l--)
              o.push("lg-item-" + this.lgId + "-" + l);
            var a = o.length;
            for (l = 0; l < n - a; l++)
              o.push("lg-item-" + this.lgId + "-" + (t + l + 1));
          } else {
            for (l = t; l <= this.galleryItems.length - 1 && l < t + n / 2; l++)
              o.push("lg-item-" + this.lgId + "-" + l);
            for (a = o.length, l = 0; l < n - a; l++)
              o.push("lg-item-" + this.lgId + "-" + (t - l - 1));
          }
          return (
            this.settings.loop &&
              (t === this.galleryItems.length - 1
                ? o.push("lg-item-" + this.lgId + "-0")
                : 0 === t &&
                  o.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1)
                  )),
            -1 === o.indexOf(r) && o.push("lg-item-" + this.lgId + "-" + e),
            o
          );
        }),
        (t.prototype.organizeSlideItems = function (t, e) {
          var i = this,
            o = this.getItemsToBeInsertedToDom(
              t,
              e,
              this.settings.numberOfSlideItemsInDom
            );
          return (
            o.forEach(function (t) {
              -1 === i.currentItemsInDom.indexOf(t) &&
                i.$inner.append('<div id="' + t + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (t) {
              -1 === o.indexOf(t) && s("#" + t).remove();
            }),
            o
          );
        }),
        (t.prototype.getPreviousSlideIndex = function () {
          var t = 0;
          try {
            var e = this.outer.find(".lg-current").first().attr("id");
            t = parseInt(e.split("-")[3]) || 0;
          } catch (e) {
            t = 0;
          }
          return t;
        }),
        (t.prototype.setDownloadValue = function (t) {
          if (this.settings.download) {
            var e = this.galleryItems[t];
            if (!1 === e.downloadUrl || "false" === e.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var i = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                i.attr("href", e.downloadUrl || e.src),
                e.download && i.attr("download", e.download);
            }
          }
        }),
        (t.prototype.makeSlideAnimation = function (t, e, i) {
          var s = this;
          this.lGalleryOn && i.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                s.outer.addClass("lg-no-trans"),
                  s.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === t
                    ? (e.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                    : (e.addClass("lg-next-slide"),
                      i.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    s.outer.find(".lg-item").removeClass("lg-current"),
                      e.addClass("lg-current"),
                      s.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0
            );
        }),
        (t.prototype.slide = function (t, e, i, s) {
          var o = this,
            n = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(t, n)),
            !this.lGalleryOn || n !== t)
          ) {
            var l = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(t);
              var a = this.getSlideItem(t),
                d = this.getSlideItem(n),
                g = this.galleryItems[t],
                h = g.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(g)),
                this.setDownloadValue(t),
                h)
              ) {
                var c = this.mediaContainerPosition,
                  u = c.top,
                  m = c.bottom,
                  p = r(
                    this.items[t],
                    this.outer,
                    u + m,
                    h && this.settings.videoMaxSize
                  );
                this.resizeVideoSlide(t, p);
              }
              if (
                (this.LGel.trigger(E, {
                  prevIndex: n,
                  index: t,
                  fromTouch: !!e,
                  fromThumb: !!i,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(t),
                s || (t < n ? (s = "prev") : t > n && (s = "next")),
                e)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var f = void 0,
                  v = void 0;
                l > 2
                  ? ((f = t - 1),
                    (v = t + 1),
                    ((0 === t && n === l - 1) || (t === l - 1 && 0 === n)) &&
                      ((v = 0), (f = l - 1)))
                  : ((f = 0), (v = 1)),
                  "prev" === s
                    ? this.getSlideItem(v).addClass("lg-next-slide")
                    : this.getSlideItem(f).addClass("lg-prev-slide"),
                  a.addClass("lg-current");
              } else this.makeSlideAnimation(s, a, d);
              this.lGalleryOn
                ? setTimeout(function () {
                    o.loadContent(t, !0),
                      ".lg-item" !== o.settings.appendSubHtmlTo && o.addHtml(t);
                  }, this.settings.speed +
                    50 +
                    (e ? 0 : this.settings.slideDelay))
                : this.loadContent(t, !0),
                setTimeout(function () {
                  (o.lgBusy = !1),
                    d.removeClass("lg-slide-progress"),
                    o.LGel.trigger(O, {
                      prevIndex: n,
                      index: t,
                      fromTouch: e,
                      fromThumb: i,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (e ? 0 : this.settings.slideDelay));
            }
            this.index = t;
          }
        }),
        (t.prototype.updateCurrentCounter = function (t) {
          this.getElementById("lg-counter-current").html(t + 1 + "");
        }),
        (t.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + ""
          );
        }),
        (t.prototype.getSlideType = function (t) {
          return t.__slideVideoInfo ? "video" : t.iframe ? "iframe" : "image";
        }),
        (t.prototype.touchMove = function (t, e, i) {
          var s = e.pageX - t.pageX,
            o = e.pageY - t.pageY,
            n = !1;
          if (
            (this.swipeDirection
              ? (n = !0)
              : Math.abs(s) > 15
              ? ((this.swipeDirection = "horizontal"), (n = !0))
              : Math.abs(o) > 15 &&
                ((this.swipeDirection = "vertical"), (n = !0)),
            n)
          ) {
            var r = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == i || i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(r, s, 0);
              var l = r.get().offsetWidth,
                a = (15 * l) / 100 - Math.abs((10 * s) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -l + s - a,
                0
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  l + s + a,
                  0
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == i || i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var d = 1 - Math.abs(o) / window.innerHeight;
              this.$backdrop.css("opacity", d);
              var g = 1 - Math.abs(o) / (2 * window.innerWidth);
              this.setTranslate(r, 0, o, g, g),
                Math.abs(o) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (t.prototype.touchEnd = function (t, e, i) {
          var o,
            n = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              n.$container.removeClass("lg-dragging-vertical"),
                n.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var r = !0;
              if ("horizontal" === n.swipeDirection) {
                o = t.pageX - e.pageX;
                var l = Math.abs(t.pageX - e.pageX);
                o < 0 && l > n.settings.swipeThreshold
                  ? (n.goToNextSlide(!0), (r = !1))
                  : o > 0 &&
                    l > n.settings.swipeThreshold &&
                    (n.goToPrevSlide(!0), (r = !1));
              } else if ("vertical" === n.swipeDirection) {
                if (
                  ((o = Math.abs(t.pageY - e.pageY)),
                  n.settings.closable && n.settings.swipeToClose && o > 100)
                )
                  return void n.closeGallery();
                n.$backdrop.css("opacity", 1);
              }
              if (
                (n.outer.find(".lg-item").removeAttr("style"),
                r && Math.abs(t.pageX - e.pageX) < 5)
              ) {
                var a = s(i.target);
                n.isPosterElement(a) && n.LGel.trigger(L);
              }
              n.swipeDirection = void 0;
            }),
            setTimeout(function () {
              n.outer.hasClass("lg-dragging") ||
                "lg-slide" === n.settings.mode ||
                n.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (t.prototype.enableSwipe = function () {
          var t = this,
            e = {},
            i = {},
            o = !1,
            n = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (i) {
              t.dragOrSwipeEnabled = !0;
              var o = t.getSlideItem(t.index);
              (!s(i.target).hasClass("lg-item") &&
                !o.get().contains(i.target)) ||
                t.outer.hasClass("lg-zoomed") ||
                t.lgBusy ||
                1 !== i.targetTouches.length ||
                ((n = !0),
                (t.touchAction = "swipe"),
                t.manageSwipeClass(),
                (e = {
                  pageX: i.targetTouches[0].pageX,
                  pageY: i.targetTouches[0].pageY,
                }));
            }),
            this.$inner.on("touchmove.lg", function (s) {
              n &&
                "swipe" === t.touchAction &&
                1 === s.targetTouches.length &&
                ((i = {
                  pageX: s.targetTouches[0].pageX,
                  pageY: s.targetTouches[0].pageY,
                }),
                t.touchMove(e, i, s),
                (o = !0));
            }),
            this.$inner.on("touchend.lg", function (r) {
              if ("swipe" === t.touchAction) {
                if (o) (o = !1), t.touchEnd(i, e, r);
                else if (n) {
                  var l = s(r.target);
                  t.isPosterElement(l) && t.LGel.trigger(L);
                }
                (t.touchAction = void 0), (n = !1);
              }
            }));
        }),
        (t.prototype.enableDrag = function () {
          var t = this,
            e = {},
            i = {},
            o = !1,
            n = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (i) {
              t.dragOrSwipeEnabled = !0;
              var n = t.getSlideItem(t.index);
              (s(i.target).hasClass("lg-item") || n.get().contains(i.target)) &&
                (t.outer.hasClass("lg-zoomed") ||
                  t.lgBusy ||
                  (i.preventDefault(),
                  t.lgBusy ||
                    (t.manageSwipeClass(),
                    (e = { pageX: i.pageX, pageY: i.pageY }),
                    (o = !0),
                    (t.outer.get().scrollLeft += 1),
                    (t.outer.get().scrollLeft -= 1),
                    t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    t.LGel.trigger(A))));
            }),
            s(window).on("mousemove.lg.global" + this.lgId, function (s) {
              o &&
                t.lgOpened &&
                ((n = !0),
                (i = { pageX: s.pageX, pageY: s.pageY }),
                t.touchMove(e, i),
                t.LGel.trigger(P));
            }),
            s(window).on("mouseup.lg.global" + this.lgId, function (r) {
              if (t.lgOpened) {
                var l = s(r.target);
                n
                  ? ((n = !1), t.touchEnd(i, e, r), t.LGel.trigger(k))
                  : t.isPosterElement(l) && t.LGel.trigger(L),
                  o &&
                    ((o = !1),
                    t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (t.prototype.triggerPosterClick = function () {
          var t = this;
          this.$inner.on("click.lg", function (e) {
            !t.dragOrSwipeEnabled &&
              t.isPosterElement(s(e.target)) &&
              t.LGel.trigger(L);
          });
        }),
        (t.prototype.manageSwipeClass = function () {
          var t = this.index + 1,
            e = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (e = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (t = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"),
            this.getSlideItem(t).addClass("lg-next-slide");
        }),
        (t.prototype.goToNextSlide = function (t) {
          var e = this,
            i = this.settings.loop;
          t && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(D, { index: this.index }),
                  this.slide(this.index, !!t, !1, "next"))
                : i
                ? ((this.index = 0),
                  this.LGel.trigger(D, { index: this.index }),
                  this.slide(this.index, !!t, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !t &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    e.outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (t.prototype.goToPrevSlide = function (t) {
          var e = this,
            i = this.settings.loop;
          t && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(z, { index: this.index, fromTouch: t }),
                  this.slide(this.index, !!t, !1, "prev"))
                : i
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(z, { index: this.index, fromTouch: t }),
                  this.slide(this.index, !!t, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !t &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    e.outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (t.prototype.keyPress = function () {
          var t = this;
          s(window).on("keydown.lg.global" + this.lgId, function (e) {
            t.lgOpened &&
              !0 === t.settings.escKey &&
              27 === e.keyCode &&
              (e.preventDefault(),
              t.settings.allowMediaOverlap &&
              t.outer.hasClass("lg-can-toggle") &&
              t.outer.hasClass("lg-components-open")
                ? t.outer.removeClass("lg-components-open")
                : t.closeGallery()),
              t.lgOpened &&
                t.galleryItems.length > 1 &&
                (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()),
                39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()));
          });
        }),
        (t.prototype.arrow = function () {
          var t = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            t.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              t.goToNextSlide();
            });
        }),
        (t.prototype.arrowDisable = function (t) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var e = this.getElementById("lg-prev"),
              i = this.getElementById("lg-next");
            t + 1 === this.galleryItems.length
              ? i.attr("disabled", "disabled").addClass("disabled")
              : i.removeAttr("disabled").removeClass("disabled"),
              0 === t
                ? e.attr("disabled", "disabled").addClass("disabled")
                : e.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (t.prototype.setTranslate = function (t, e, i, s, o) {
          void 0 === s && (s = 1),
            void 0 === o && (o = 1),
            t.css(
              "transform",
              "translate3d(" +
                e +
                "px, " +
                i +
                "px, 0px) scale3d(" +
                s +
                ", " +
                o +
                ", 1)"
            );
        }),
        (t.prototype.mousewheel = function () {
          var t = this,
            e = 0;
          this.outer.on("wheel.lg", function (i) {
            if (i.deltaY && !(t.galleryItems.length < 2)) {
              i.preventDefault();
              var s = new Date().getTime();
              s - e < 1e3 ||
                ((e = s),
                i.deltaY > 0
                  ? t.goToNextSlide()
                  : i.deltaY < 0 && t.goToPrevSlide());
            }
          });
        }),
        (t.prototype.isSlideElement = function (t) {
          return (
            t.hasClass("lg-outer") ||
            t.hasClass("lg-item") ||
            t.hasClass("lg-img-wrap")
          );
        }),
        (t.prototype.isPosterElement = function (t) {
          var e = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            t.hasClass("lg-video-poster") ||
            t.hasClass("lg-video-play-button") ||
            (e && e.contains(t.get()))
          );
        }),
        (t.prototype.toggleMaximize = function () {
          var t = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            t.$container.toggleClass("lg-inline"), t.refreshOnResize();
          });
        }),
        (t.prototype.invalidateItems = function () {
          for (var t = 0; t < this.items.length; t++) {
            var e = s(this.items[t]);
            e.off("click.lgcustom-item-" + e.attr("data-lg-id"));
          }
        }),
        (t.prototype.manageCloseGallery = function () {
          var t = this;
          if (this.settings.closable) {
            var e = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              t.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (i) {
                  var o = s(i.target);
                  e = !!t.isSlideElement(o);
                }),
                this.outer.on("mousemove.lg", function () {
                  e = !1;
                }),
                this.outer.on("mouseup.lg", function (i) {
                  var o = s(i.target);
                  t.isSlideElement(o) &&
                    e &&
                    (t.outer.hasClass("lg-dragging") || t.closeGallery());
                }));
          }
        }),
        (t.prototype.closeGallery = function (t) {
          var e = this;
          if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
          this.LGel.trigger(G), s(window).scrollTop(this.prevScrollTop);
          var i,
            o = this.items[this.index];
          if (this.zoomFromOrigin && o) {
            var n = this.mediaContainerPosition,
              a = n.top,
              d = n.bottom,
              g = this.galleryItems[this.index],
              h = g.__slideVideoInfo,
              c = g.poster,
              u = r(o, this.outer, a + d, h && c && this.settings.videoMaxSize);
            i = l(o, this.outer, a, d, u);
          }
          this.zoomFromOrigin && i
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms"
                )
                .css("transform", i))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            s("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var m =
            this.zoomFromOrigin && i
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              e.zoomFromOrigin &&
                i &&
                e.outer.removeClass("lg-zoom-from-image"),
                e.$container.removeClass("lg-show"),
                e.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    e.settings.backdropDuration + "ms"
                  ),
                e.outer.removeClass("lg-closing " + e.settings.startClass),
                e.getSlideItem(e.index).removeClass("lg-start-end-progress"),
                e.$inner.empty(),
                e.lgOpened && e.LGel.trigger(M, { instance: e }),
                e.outer.get() && e.outer.get().blur(),
                (e.lgOpened = !1);
            }, m + 100),
            m + 100
          );
        }),
        (t.prototype.initModules = function () {
          this.plugins.forEach(function (t) {
            try {
              t.init();
            } catch (t) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated"
              );
            }
          });
        }),
        (t.prototype.destroyModules = function (t) {
          this.plugins.forEach(function (e) {
            try {
              t ? e.destroy() : e.closeGallery && e.closeGallery();
            } catch (t) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed"
              );
            }
          });
        }),
        (t.prototype.refresh = function (t) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = t || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(C);
        }),
        (t.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (t.prototype.destroy = function () {
          var t = this,
            e = this.closeGallery(!0);
          return (
            setTimeout(function () {
              t.destroyModules(!0),
                t.settings.dynamic || t.invalidateItems(),
                s(window).off(".lg.global" + t.lgId),
                t.LGel.off(".lg"),
                t.$container.remove();
            }, e),
            e
          );
        }),
        t
      );
    })();
  const B = function (t, e) {
    return new _(t, e);
  };
  var j = function () {
      return (
        (j =
          Object.assign ||
          function (t) {
            for (var e, i = 1, s = arguments.length; i < s; i++)
              for (var o in (e = arguments[i]))
                Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }),
        j.apply(this, arguments)
      );
    },
    F = {
      autoplayFirstVideo: !0,
      youTubePlayerParams: !1,
      vimeoPlayerParams: !1,
      wistiaPlayerParams: !1,
      gotoNextSlideOnVideoEnd: !0,
      autoplayVideoOnSlide: !1,
      videojs: !1,
      videojsOptions: {},
    },
    H = "lgHasVideo",
    N = "lgSlideItemLoad",
    $ = "lgBeforeSlide",
    U = "lgAfterSlide",
    W = "lgPosterClick",
    Y = function (t) {
      return Object.keys(t)
        .map(function (e) {
          return encodeURIComponent(e) + "=" + encodeURIComponent(t[e]);
        })
        .join("&");
    };
  const R = (function () {
      function t(t) {
        return (
          (this.core = t),
          (this.settings = j(j({}, F), this.core.settings)),
          this
        );
      }
      return (
        (t.prototype.init = function () {
          var t = this;
          this.core.LGel.on(H + ".video", this.onHasVideo.bind(this)),
            this.core.LGel.on(W + ".video", function () {
              var e = t.core.getSlideItem(t.core.index);
              t.loadVideoOnPosterClick(e);
            }),
            this.core.LGel.on(N + ".video", this.onSlideItemLoad.bind(this)),
            this.core.LGel.on($ + ".video", this.onBeforeSlide.bind(this)),
            this.core.LGel.on(U + ".video", this.onAfterSlide.bind(this));
        }),
        (t.prototype.onSlideItemLoad = function (t) {
          var e = this,
            i = t.detail,
            s = i.isFirstSlide,
            o = i.index;
          this.settings.autoplayFirstVideo &&
            s &&
            o === this.core.index &&
            setTimeout(function () {
              e.loadAndPlayVideo(o);
            }, 200),
            !s &&
              this.settings.autoplayVideoOnSlide &&
              o === this.core.index &&
              this.loadAndPlayVideo(o);
        }),
        (t.prototype.onHasVideo = function (t) {
          var e = t.detail,
            i = e.index,
            s = e.src,
            o = e.html5Video;
          e.hasPoster ||
            (this.appendVideos(this.core.getSlideItem(i), {
              src: s,
              addClass: "lg-object",
              index: i,
              html5Video: o,
            }),
            this.gotoNextSlideOnVideoEnd(s, i));
        }),
        (t.prototype.onBeforeSlide = function (t) {
          if (this.core.lGalleryOn) {
            var e = t.detail.prevIndex;
            this.pauseVideo(e);
          }
        }),
        (t.prototype.onAfterSlide = function (t) {
          var e = this,
            i = t.detail,
            s = i.index,
            o = i.prevIndex,
            n = this.core.getSlideItem(s);
          this.settings.autoplayVideoOnSlide &&
            s !== o &&
            n.hasClass("lg-complete") &&
            setTimeout(function () {
              e.loadAndPlayVideo(s);
            }, 100);
        }),
        (t.prototype.loadAndPlayVideo = function (t) {
          var e = this.core.getSlideItem(t);
          this.core.galleryItems[t].poster
            ? this.loadVideoOnPosterClick(e, !0)
            : this.playVideo(t);
        }),
        (t.prototype.playVideo = function (t) {
          this.controlVideo(t, "play");
        }),
        (t.prototype.pauseVideo = function (t) {
          this.controlVideo(t, "pause");
        }),
        (t.prototype.getVideoHtml = function (t, e, i, s) {
          var o = "",
            n = this.core.galleryItems[i].__slideVideoInfo || {},
            r = this.core.galleryItems[i],
            l = r.title || r.alt;
          l = l ? 'title="' + l + '"' : "";
          var a =
            'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
          if (n.youtube) {
            var d = "lg-youtube" + i,
              g =
                "?" +
                (n.youtube[2] ? n.youtube[2] + "&" : "") +
                "wmode=opaque&autoplay=0&mute=1&enablejsapi=1" +
                (this.settings.youTubePlayerParams
                  ? "&" + Y(this.settings.youTubePlayerParams)
                  : "");
            o =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-youtube ' +
              e +
              '" ' +
              l +
              ' src="//www.youtube.com/embed/' +
              (n.youtube[1] + g) +
              '" ' +
              a +
              "></iframe>";
          } else if (n.vimeo) {
            (d = "lg-vimeo" + i),
              (g = (function (t, e) {
                if (!e || !e.vimeo) return "";
                var i = e.vimeo[2] || "";
                return (
                  (i = "?" == i[0] ? "&" + i.slice(1) : i || ""),
                  "?autoplay=0&muted=1" + (t ? "&" + Y(t) : "") + i
                );
              })(this.settings.vimeoPlayerParams, n));
            o =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-vimeo ' +
              e +
              '" ' +
              l +
              ' src="//player.vimeo.com/video/' +
              (n.vimeo[1] + g) +
              '" ' +
              a +
              "></iframe>";
          } else if (n.wistia) {
            var h = "lg-wistia" + i;
            (g = (g = Y(this.settings.wistiaPlayerParams)) ? "?" + g : ""),
              (o =
                '<iframe allow="autoplay" id="' +
                h +
                '" src="//fast.wistia.net/embed/iframe/' +
                (n.wistia[4] + g) +
                '" ' +
                l +
                ' class="wistia_embed lg-video-object lg-wistia ' +
                e +
                '" name="wistia_embed" ' +
                a +
                "></iframe>");
          } else if (n.html5) {
            for (var c = "", u = 0; u < s.source.length; u++)
              c +=
                '<source src="' +
                s.source[u].src +
                '" type="' +
                s.source[u].type +
                '">';
            if (s.tracks) {
              var m = function (t) {
                var e = "",
                  i = s.tracks[t];
                Object.keys(i || {}).forEach(function (t) {
                  e += t + '="' + i[t] + '" ';
                }),
                  (c += "<track " + e + ">");
              };
              for (u = 0; u < s.tracks.length; u++) m(u);
            }
            var p = "",
              f = s.attributes || {};
            Object.keys(f || {}).forEach(function (t) {
              p += t + '="' + f[t] + '" ';
            }),
              (o =
                '<video class="lg-video-object lg-html5 ' +
                (this.settings.videojs ? "video-js" : "") +
                '" ' +
                p +
                ">\n                " +
                c +
                "\n                Your browser does not support HTML5 video.\n            </video>");
          }
          return o;
        }),
        (t.prototype.appendVideos = function (t, e) {
          var i,
            s = this.getVideoHtml(e.src, e.addClass, e.index, e.html5Video);
          t.find(".lg-video-cont").append(s);
          var o = t.find(".lg-video-object").first();
          if (
            (e.html5Video &&
              o.on("mousedown.lg.video", function (t) {
                t.stopPropagation();
              }),
            this.settings.videojs &&
              (null ===
                (i = this.core.galleryItems[e.index].__slideVideoInfo) ||
              void 0 === i
                ? void 0
                : i.html5))
          )
            try {
              return videojs(o.get(), this.settings.videojsOptions);
            } catch (t) {
              console.error(
                "lightGallery:- Make sure you have included videojs"
              );
            }
        }),
        (t.prototype.gotoNextSlideOnVideoEnd = function (t, e) {
          var i = this,
            s = this.core.getSlideItem(e).find(".lg-video-object").first(),
            o = this.core.galleryItems[e].__slideVideoInfo || {};
          if (this.settings.gotoNextSlideOnVideoEnd)
            if (o.html5)
              s.on("ended", function () {
                i.core.goToNextSlide();
              });
            else if (o.vimeo)
              try {
                new Vimeo.Player(s.get()).on("ended", function () {
                  i.core.goToNextSlide();
                });
              } catch (t) {
                console.error(
                  "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                );
              }
            else if (o.wistia)
              try {
                (window._wq = window._wq || []),
                  window._wq.push({
                    id: s.attr("id"),
                    onReady: function (t) {
                      t.bind("end", function () {
                        i.core.goToNextSlide();
                      });
                    },
                  });
              } catch (t) {
                console.error(
                  "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                );
              }
        }),
        (t.prototype.controlVideo = function (t, e) {
          var i = this.core.getSlideItem(t).find(".lg-video-object").first(),
            s = this.core.galleryItems[t].__slideVideoInfo || {};
          if (i.get())
            if (s.youtube)
              try {
                i.get().contentWindow.postMessage(
                  '{"event":"command","func":"' + e + 'Video","args":""}',
                  "*"
                );
              } catch (t) {
                console.error("lightGallery:- " + t);
              }
            else if (s.vimeo)
              try {
                new Vimeo.Player(i.get())[e]();
              } catch (t) {
                console.error(
                  "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                );
              }
            else if (s.html5)
              if (this.settings.videojs)
                try {
                  videojs(i.get())[e]();
                } catch (t) {
                  console.error(
                    "lightGallery:- Make sure you have included videojs"
                  );
                }
              else i.get()[e]();
            else if (s.wistia)
              try {
                (window._wq = window._wq || []),
                  window._wq.push({
                    id: i.attr("id"),
                    onReady: function (t) {
                      t[e]();
                    },
                  });
              } catch (t) {
                console.error(
                  "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                );
              }
        }),
        (t.prototype.loadVideoOnPosterClick = function (t, e) {
          var i = this;
          if (t.hasClass("lg-video-loaded"))
            e && this.playVideo(this.core.index);
          else if (t.hasClass("lg-has-video")) this.playVideo(this.core.index);
          else {
            t.addClass("lg-has-video");
            var s = void 0,
              o = this.core.galleryItems[this.core.index].src,
              n = this.core.galleryItems[this.core.index].video;
            n && (s = "string" == typeof n ? JSON.parse(n) : n);
            var r = this.appendVideos(t, {
              src: o,
              addClass: "",
              index: this.core.index,
              html5Video: s,
            });
            this.gotoNextSlideOnVideoEnd(o, this.core.index);
            var l = t.find(".lg-object").first().get();
            t.find(".lg-video-cont").first().append(l),
              t.addClass("lg-video-loading"),
              r &&
                r.ready(function () {
                  r.on("loadedmetadata", function () {
                    i.onVideoLoadAfterPosterClick(t, i.core.index);
                  });
                }),
              t
                .find(".lg-video-object")
                .first()
                .on("load.lg error.lg loadedmetadata.lg", function () {
                  setTimeout(function () {
                    i.onVideoLoadAfterPosterClick(t, i.core.index);
                  }, 50);
                });
          }
        }),
        (t.prototype.onVideoLoadAfterPosterClick = function (t, e) {
          t.addClass("lg-video-loaded"), this.playVideo(e);
        }),
        (t.prototype.destroy = function () {
          this.core.LGel.off(".lg.video"), this.core.LGel.off(".video");
        }),
        t
      );
    })(),
    X = document.querySelectorAll("[data-gallery]");
  X.length &&
    X.forEach((t) => {
      B(t, {
        plugins: [R],
        licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
        speed: 500,
      });
    }),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    });
})();
