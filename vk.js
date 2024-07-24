"use strict";
(self.webpackChunkvkmvk = self.webpackChunkvkmvk || []).push([[9520], {
    85420: function(e, t, n) {
        n.d(t, {
            AudioPlayerBase: function() {
                return u
            }
        });
        var o = n(16309),
            i = n(1064),
            r = n(77544),
            a = n(83812),
            s = n(96362),
            l = n(30420);
        class u extends i.Component {
            updateProgress()
            {
                const e = this.audio.getCurrentProgress(),
                    t = this.audio.duration();
                this.setState({
                    loaded: this.audio.loaded(),
                    progress: e,
                    listened: this.formatTime(e * t),
                    remained: this.formatTime(-(t - e * t))
                })
            }
            updateState()
            {
                this.setState(this.getState())
            }
            getState()
            {
                const {title: e, subTitle: t, performer: n, mainArtists: i, featArtists: r, isExplicit: s, fullId: u, coverUrl_p: c, coverUrl_l: d, url: f} = this.audio.getCurrent() || {};
                (0, a.setCookie)(this.AUDIO_COOKIE, u, 1),
                e ? document.body.classList.add(this.AUDIO_PLAYER_CLASS) : document.body.classList.remove(this.AUDIO_PLAYER_CLASS);
                const _ = this.audio.getCurrentProgress(),
                    p = this.audio.duration();
                return {
                    title: (0, o.decodeHTMLEntities)(e || ""),
                    subtitle: (0, o.decodeHTMLEntities)(t || ""),
                    performer: (0, o.decodeHTMLEntities)(n || ""),
                    mainArtists: this.prepareArtists(i),
                    featArtists: this.prepareArtists(r),
                    cover: c || d || "",
                    explicit: s || !1,
                    loaded: this.audio.loaded(),
                    progress: _,
                    listened: this.formatTime(_ * p),
                    remained: this.formatTime(-(p - _ * p)),
                    playing: this.audio.isPlaying(),
                    adsplaying: this.audio.isAdsPlaying(),
                    canRepeat: this.audio.canRepeat,
                    shuffled: this.audio.shuffled,
                    isDownloaded: (0, l.checkIsDownloadedUrl)(f || ""),
                    show: !!e || this.audio.isAdsPlaying(),
                    onPlay: () => this.onPlay(),
                    onPause: () => this.onPause(),
                    onPrev: () => this.onPrev(),
                    onNext: () => this.onNext(),
                    onClose: () => this.onClose(),
                    onShuffle: () => this.onShuffle(),
                    onDisableAds: () => this.onDisableAds(),
                    onRepeat: () => this.onRepeat(),
                    onMiniPlayerClick: () => this.requestExpanded()
                }
            }
            prepareArtists(e)
            {
                return e ? e.map((e => [e.id, (0, o.decodeHTMLEntities)(e.name)])) : []
            }
            onPlay()
            {
                (0, s.statlogsValueEvent)(this.STAT_KEY, "play", this.state.expanded),
                this.audio.play()
            }
            onPause()
            {
                (0, s.statlogsValueEvent)(this.STAT_KEY, "pause", this.state.expanded),
                this.audio.pause()
            }
            onClose()
            {
                (0, s.statlogsValueEvent)(this.STAT_KEY, "close", this.state.expanded),
                this.audio.clearCurrentPlaylist(),
                requestAnimationFrame((() => {
                    (0, a.setCookie)(this.AUDIO_COOKIE, "", -1),
                    (0, a.setCookie)(this.AUDIO_COOKIE_OLD, "", -1),
                    this.setState({
                        title: "",
                        subtitle: "",
                        performer: "",
                        explicit: !1,
                        progress: 0,
                        playing: !1,
                        adsplaying: !1,
                        show: !1,
                        expanded: !1
                    }),
                    document.body.classList.remove(this.AUDIO_PLAYER_CLASS)
                }))
            }
            onPrev()
            {
                this.audio.isAdsPlaying() || ((0, s.statlogsValueEvent)(this.STAT_KEY, "prev", this.state.expanded), this.audio.prev(!0))
            }
            onNext()
            {
                this.audio.isAdsPlaying() || ((0, s.statlogsValueEvent)(this.STAT_KEY, "next", this.state.expanded), this.audio.next(!0))
            }
            onShuffle()
            {
                this.audio.isAdsPlaying() || ((0, s.statlogsValueEvent)(this.STAT_KEY, "shuffle", this.state.expanded), this.audio.shuffle(), this.updateState())
            }
            onDisableAds()
            {
                (0, s.statlogsValueEvent)(this.STAT_KEY, "disable_ads", this.state.expanded),
                this.audio.pause(),
                nav.go("/vk_music")
            }
            onRepeat()
            {
                this.audio.isAdsPlaying() || ((0, s.statlogsValueEvent)(this.STAT_KEY, "repeat", this.state.expanded), this.audio.repeat(), this.updateState())
            }
            requestExpanded()
            {
                window.audio.notify(r.events.REQUEST_EXPANDED)
            }
            formatTime(e)
            {
                const t = Math.abs(e);
                return (e < 0 ? "-" : "") + [Math.floor(t / 3600), Math.floor(t / 60) % 60, Math.floor(t % 60)].map((e => e < 10 ? "0" + e : e)).filter(((e, t) => "00" !== e || t > 0)).join(":")
            }
            constructor()
            {
                super(),
                this.AUDIO_COOKIE = "remixcurr_audio",
                this.AUDIO_COOKIE_OLD = "remixmaudio",
                this.AUDIO_PLAYER_CLASS = "vk_audio_player",
                this.STAT_KEY = "mvk_audio_player",
                this.audio = window.audio,
                this.state = this.getState(),
                this.setState({
                    expanded: !1
                }),
                this.audio.subscribe(r.events.PLAY, (() => this.updateState())),
                this.audio.subscribe(r.events.PLAY_REQUESTED, (() => this.updateState())),
                this.audio.subscribe(r.events.PAUSE, (() => this.updateState())),
                this.audio.subscribe(r.events.SEEK, (() => this.updateState())),
                this.audio.subscribe(r.events.PROGRESS, (() => this.updateProgress())),
                this.audio.subscribe(r.events.STOP, (() => this.updateState())),
                this.audio.subscribe(r.events.PLAYLIST_CHANGED, (() => {
                    this.audio.shuffled && this.audio.shuffle(),
                    this.audio.canRepeat || this.audio.repeat(),
                    this.updateState()
                })),
                this.audio.subscribe(r.events.AD_READY, (() => this.updateState())),
                this.audio.subscribe(r.events.AD_DEINITED, (() => this.updateState())),
                this.audio.subscribe(r.events.AD_STARTED, (() => this.updateState())),
                this.audio.subscribe(r.events.AD_COMPLETED, (() => this.updateState())),
                window.page.onChange((() => this.updateState()))
            }
        }
    },
    6021: function(e, t, n) {
        n.d(t, {
            initAudioPlayerMini: function() {
                return p
            }
        });
        var o = n(28413),
            i = n(82136),
            r = n(43431),
            a = n(19276),
            s = n(8238);
        var l = function(e) {
                const t = e.show,
                    n = e.adsplaying,
                    o = n ? a.getLang("mobile_audio_player_ad") : e.title,
                    l = n ? "" : e.subtitle,
                    u = n ? "" : e.performer,
                    c = e.explicit,
                    d = e.playing,
                    f = e.onPlay,
                    _ = e.onPause,
                    p = e.onNext,
                    h = e.onMiniPlayerClick;
                if (!t)
                    return "";
                const m = r.default.class("AudioPlayerMini__controls", {
                        playing: d
                    }),
                    E = o ? (0, i.jsx)("span", {
                        className: "AudioPlayerMini__title",
                        children: o
                    }) : "",
                    w = l ? (0, i.jsx)("span", {
                        className: "AudioPlayerMini__subtitle",
                        children: l
                    }) : "",
                    v = !n && c ? (0, i.jsx)("span", {
                        className: "AudioPlayerMini__explicit",
                        children: (0, i.jsx)(s.Icon16Explicit, {})
                    }) : "",
                    T = d ? "AudioPlayerMini__pause" : "AudioPlayerMini__play",
                    A = d ? (0, i.jsx)(s.Icon24Pause, {}) : (0, i.jsx)(s.Icon24Play, {}),
                    S = d ? _ : f,
                    y = d ? a.getLang("mobile_audio_player_pause") : a.getLang("mobile_audio_player_play");
                return (0, i.jsxs)("div", {
                    className: "AudioPlayerMini__container",
                    children: [(0, i.jsx)("div", {
                        className: m,
                        children: (0, i.jsx)("button", {
                            className: T,
                            onClick: S,
                            "aria-label": y,
                            children: A
                        })
                    }), (0, i.jsxs)("div", {
                        className: "AudioPlayerMini__info",
                        role: "button",
                        tabindex: "0",
                        "aria-label": `${u} - ${o} ${l}`,
                        onClick: h,
                        children: [(0, i.jsxs)("div", {
                            className: "AudioPlayerMini__info1",
                            children: [E, w, v]
                        }), (0, i.jsx)("div", {
                            className: "AudioPlayerMini__info2",
                            children: (0, i.jsx)("span", {
                                className: "AudioPlayerMini__performer",
                                children: u
                            })
                        })]
                    }), (0, i.jsx)("div", {
                        className: "AudioPlayerMini__controls",
                        children: (0, i.jsx)("button", {
                            className: "AudioPlayerMini__next",
                            onClick: p,
                            "aria-label": a.getLang("mobile_audio_player_next"),
                            disabled: n,
                            children: (0, i.jsx)(s.Icon24SkipNext, {})
                        })
                    })]
                })
            },
            u = n(85420);
        class c extends u.AudioPlayerBase {
            render()
            {
                return o.default.preact(l, {
                    ...this.state
                })
            }
        }
        var d = c,
            f = n(1064),
            _ = n(30227);
        function p() {
            if (!window.audio || !window.audioplayer) {
                const e = "Can't init AudioPlayerMini. Audio not loaded yet.";
                return console.error(e), void (0, _.logError)(new Error(e))
            }
            const e = $$(".AudioPlayerMini");
            e && 0 !== e.length && e.forEach((e => (0, f.render)((0, f.createElement)(d, (0, a.getState)("AudioPlayerMini")), e)))
        }
    },
    85973: function(e, t, n) {
        n.d(t, {
            IOS_15_BOTTOM_NAVBAR_OFFSET: function() {
                return a
            },
            IOS_NO_KEYBOARD_ALLOWED_OFFSET: function() {
                return s
            },
            IPHONE_KEYBOARD_REJECT_OFFSET: function() {
                return r
            },
            IPHONE_SAFARI_BOTTOM_BAR: function() {
                return o
            },
            IPHONE_X_SAFARI_BOTTOM_BAR: function() {
                return i
            },
            iosMajor: function() {
                return p
            },
            iosMinor: function() {
                return h
            },
            isIOS: function() {
                return f
            },
            isIOSChrome: function() {
                return v
            },
            isIPad: function() {
                return c
            },
            isIPhone: function() {
                return d
            },
            isIPhoneX: function() {
                return w
            },
            isLandscapePhone: function() {
                return T
            },
            isScrollBasedViewport: function() {
                return m
            },
            isWKWebView: function() {
                return E
            }
        });
        const o = 45,
            i = 85,
            r = 180,
            a = 48,
            s = 70,
            l = navigator.userAgent.toLowerCase(),
            u = function(e) {
                const t = !/ipad|iphone|ipod/.test(e),
                    n = /mac os/.test(e);
                if (n && t && "boolean" == typeof navigator.standalone)
                    return !0;
                return !1
            }(l),
            c = u || -1 !== l.indexOf("ipad"),
            d = !c && -1 !== l.search(/iphone|ipod/),
            f = d || c;
        let _ = f && navigator.userAgent.match(/OS ([\d_]+) like Mac OS X/i),
            p = 0,
            h = 0;
        u && (p = 13, h = 0),
        _ && (_ = _[1].split("_"), p = +_[0], h = +_[1]),
        _ = null;
        const m = p < 13 && !(11 === p && h < 3),
            E = f && function(e) {
                if (window.webkit && window.webkit.messageHandlers)
                    return !0;
                const t = /constructor/i.test(window.HTMLElement),
                    n = !!window.indexedDB;
                if (-1 === e.indexOf("safari") || -1 === e.indexOf("version") || navigator.standalone) {
                    if (!n && t || !window.statusbar || !window.statusbar.visible)
                        ;
                    else if (!t || n)
                        return !0
                } else
                    ;
                return !1
            }(l),
            w = f && 375 === screen.width && 812 === screen.height && 3 === window.devicePixelRatio,
            v = -1 !== l.search(/crios/i);
        function T() {
            return 90 === Math.abs(window.orientation) && !c
        }
    },
    31418: function(e, t, n) {
        n.r(t),
        n.d(t, {
            isKeyboardOpen: function() {
                return J
            },
            offCloseCallback: function() {
                return ee
            },
            offOpenCallback: function() {
                return ne
            },
            onClose: function() {
                return Q
            },
            onCloseCallback: function() {
                return Z
            },
            onOpen: function() {
                return q
            },
            onOpenCallback: function() {
                return te
            }
        });
        const o = 999999;
        let i = 0,
            r = 0,
            a = 0,
            s = 0,
            l = null,
            u = null;
        function c() {
            const e = pageYOffset;
            i++,
            e !== r && e !== o && (r = e, s = Math.max(s, e), scrollTo(0, o)),
            clearTimeout(u),
            u = setTimeout((() => {
                u = null,
                window.removeEventListener("scroll", c),
                scrollTo(0, o),
                setTimeout((() => scrollTo(0, o)), 1e3)
            }), 150)
        }
        var d = n(85973);
        let f,
            _,
            p,
            h,
            m,
            E,
            w,
            v,
            T,
            A,
            S,
            y = 0,
            g = 0,
            b = "",
            L = !1,
            P = {},
            O = 0;
        function I(e) {
            if (b = e, L = !1, f = !1, p = 0, h = 0, w = 0, v = 0, P = {}, T = void 0, A = "start", S = 0, O = 0, !d.isIPhone)
                return;
            if ("top" !== b && "bottom" !== b)
                return void document.body.classList.add("ScrollViewsDisabled");
            x() < d.IPHONE_KEYBOARD_REJECT_OFFSET && B(0);
            const t = document.body;
            m = t.offsetHeight,
            E = t.offsetWidth,
            window.addEventListener("scroll", M),
            "top" === b && (0, d.isLandscapePhone)() || (R(), N())
        }
        function C() {
            "top" === b || "bottom" === b ? (_ && clearTimeout(_), window.removeEventListener("scroll", M)) : document.body.classList.remove("ScrollViewsDisabled"),
            L = !1,
            b = "",
            f = !1,
            m = 0,
            E = 0
        }
        function M() {
            if (R(), "top" === b) {
                if ((0, d.isLandscapePhone)())
                    return;
                if (d.isWKWebView)
                    return void (0 !== pageYOffset && N(0));
                const e = innerHeight;
                if ("start" === A && (e < m ? A = "animate" : N(1)), "animate" === A)
                    if (S = m - e, O || (O = Math.max(1, Math.min(4, Math.floor(S / 10)))), S <= 0)
                        A = "stop";
                    else {
                        const e = d.isIPad ? d.iosMajor < 11 ? 3 : 2 : 1;
                        N(Math.min(S, O) * e)
                    }
                return void ("stop" === A && N(1))
            }
            if ("bottom" !== b)
                return;
            const e = pageYOffset,
                t = x();
            f && (f = !1, e === w) || (d.isWKWebView ? v <= 5 && N() : e > d.IPHONE_KEYBOARD_REJECT_OFFSET ? e > t ? (B(e), d.isWKWebView || N()) : e < t ? P[e] || e > D(t) ? (P[e] = !0, N(m)) : N() : e !== D(t) && N() : t || (e < d.IOS_NO_KEYBOARD_ALLOWED_OFFSET ? (p === e ? h++ : (p = e, h = 1), h >= 3 && (window.removeEventListener("scroll", M), B(p)), setTimeout((() => {
                N()
            }), 300)) : N()))
        }
        function N(e) {
            f = !0;
            const t = x();
            let n;
            "bottom" === b ? n = e || (!t || d.isWKWebView || d.isIPad ? m : D(t)) : "top" === b && (n = isFinite(e) ? e : 1),
            v++,
            w = n,
            window.scrollTo(0, n)
        }
        function R() {
            _ && clearTimeout(_),
            L || (_ = setTimeout((() => {
                L = !0,
                _ = null,
                window.removeEventListener("scroll", M)
            }), 500))
        }
        function D(e) {
            return d.isIPad || d.isWKWebView || 90 === Math.abs(window.orientation) && screen.width >= 375 || (d.isIPhoneX ? e -= d.IPHONE_X_SAFARI_BOTTOM_BAR : e -= d.IPHONE_SAFARI_BOTTOM_BAR), e
        }
        function x() {
            return 90 === Math.abs(window.orientation) ? y : g
        }
        function B(e) {
            90 === Math.abs(window.orientation) ? y = e : g = e
        }
        let Y = null,
            V = 0,
            k = 0;
        function U() {
            if (visualViewport.height >= V)
                return;
            let e = V - visualViewport.height;
            k !== e && (!d.isWKWebView && e < d.IOS_NO_KEYBOARD_ALLOWED_OFFSET ? scrollTo(0, 0) : (15 === d.iosMajor && d.iosMinor < 2 && (e += d.IOS_15_BOTTOM_NAVBAR_OFFSET), scrollTo(0, e)))
        }
        let W = !1,
            F = !1,
            j = !1,
            K = null,
            H = [],
            $ = [],
            X = null;
        const G = d.isScrollBasedViewport && (d.isIPad || d.isWKWebView),
            z = d.isScrollBasedViewport && d.iosMajor <= 12;
        function q(e="default", {exitIfStarted: t=!1}={}) {
            if (d.isIOS && !(d.iosMajor < 8) && !(F && t || W)) {
                if (X = e, F = !0, K && (clearTimeout(K), K = null), "bottom" === e) {
                    if (((0, d.isLandscapePhone)() || !G && !z) && !function() {
                        if (Y || (Y = {
                            onceBlocked: !1
                        }), Y.onceBlocked && (Y.opened = !0), !Y.onceBlocked && !Y.opened) {
                            Y.onceBlocked = !0;
                            const e = document.activeElement;
                            return e.blur(), e.focus(), !1
                        }
                        return Y.opened = !0, window.visualViewport && (V = visualViewport.height, k = 0, setTimeout(U), visualViewport.addEventListener("scroll", U), visualViewport.addEventListener("resize", U)), !0
                    }())
                        return;
                    !G && z && I(e),
                    G && (l && (clearTimeout(l), l = null), u && (clearTimeout(u), u = null), r = 0, a = 0, i = 0, s = 0, window.addEventListener("scroll", c), setTimeout((() => {
                        scrollTo(0, o)
                    }), 10), setTimeout((() => {
                        scrollTo(0, o)
                    }), 100), setTimeout((() => {
                        scrollTo(0, o)
                    }), 200), setTimeout((() => {
                        scrollTo(0, o)
                    }), 300), setTimeout((() => {
                        scrollTo(0, o)
                    }), 400), setTimeout((() => {
                        scrollTo(0, o)
                    }), 500))
                } else
                    !G && z && I(e);
                $.length && $.forEach((e => e())),
                W = !0,
                F = !1
            }
        }
        function Q({exitIfStarted: e=!1}={}) {
            if (d.isIOS && !(d.iosMajor < 8) && (!j || !e)) {
                if (j = !0, "bottom" === X) {
                    if (((0, d.isLandscapePhone)() || !G && !z) && (!Y || Y.onceBlocked && !Y.opened || (window.visualViewport && (setTimeout(U), visualViewport.removeEventListener("scroll", U), visualViewport.removeEventListener("resize", U)), Y = null, V = 0, k = 0, 0)))
                        return;
                    if (!W)
                        return;
                    !G && z && C(),
                    G && (clearTimeout(l), clearTimeout(u), r = 0, a = 0, i = 0, l = null, u = null, window.removeEventListener("scroll", c))
                } else
                    !G && z && C();
                W = !1,
                j = !1,
                X = null,
                K && clearTimeout(K),
                K = setTimeout((() => {
                    scrollTo(0, 0),
                    H.length && H.forEach((e => e()))
                }), 10)
            }
        }
        function J() {
            return W
        }
        function Z(e) {
            -1 === H.indexOf(e) && H.push(e)
        }
        function ee(e) {
            const t = H.indexOf(e);
            -1 !== t && H.splice(t, 1)
        }
        function te(e) {
            -1 === $.indexOf(e) && $.push(e)
        }
        function ne(e) {
            const t = $.indexOf(e);
            -1 !== t && $.splice(t, 1)
        }
    },
    4716: function(e, t, n) {
        n.d(t, {
            cleanScrollView: function() {
                return L
            },
            hideTopBanner: function() {
                return k
            },
            preventDocumentScroll: function() {
                return v
            },
            restoreDocumentScroll: function() {
                return T
            },
            setScrollView: function() {
                return b
            }
        });
        var o = n(84943),
            i = n(31418),
            r = n(85973);
        n(32716);
        const a = ".layout";
        let s,
            l,
            u,
            c,
            d,
            f,
            _,
            p = !0,
            h = !1,
            m = "closed",
            E = !1,
            w = [];
        function v(e={}) {
            r.isIOS && (!0 !== e.stack && E || (_ = {
                initialized: !1,
                scrollViews: []
            }, w.push(_), e.layoutElement && e.layoutElement.nodeType ? _.layoutElement = e.layoutElement : _.layoutElement = (0, o.$)(e.layoutElement || a)), !1 === e.topBanner ? _.topBanner = !1 : _.topBanner = !0, E || (E = !0, addEvent(window, "focusin", x), addEvent(window, "focusout", B), addEvent(document, "touchmove", N, {
                capture: !0
            }), addEvent(document, "touchmove", R, {
                capture: !1
            }), addEvent(window, "resize", O), i.onCloseCallback(Y), r.isWKWebView || (addEvent(window, "orientationchange", I), requestAnimationFrame((() => {
                (0, r.isLandscapePhone)() ? I(null, !0) : (O(), _ && !_.topBanner ? requestAnimationFrame(k) : u || requestAnimationFrame(U))
            })))))
        }
        function T() {
            E && (E = !1, A(), 1 === w.length && (_.layoutOffset = null, W(), document.body.style.height = ""), _.layoutElement = null, w.pop(), _ = w.length ? w[w.length - 1] : null, _ && W(), removeEvent(window, "focusin", x), removeEvent(window, "focusout", B), removeEvent(document, "touchmove", N, {
                capture: !0
            }), removeEvent(document, "touchmove", R, {
                capture: !1
            }), removeEvent(window, "resize", O), removeEvent(window, "orientationchange", I), removeEvent(window, "resize", C), removeEvent(window, "scroll", M), i.offCloseCallback(Y))
        }
        function A() {
            _.scrollViews.forEach((e => L(e))),
            _.scrollViews = []
        }
        function S(e) {
            const t = e.currentTarget.__ScrollView;
            if ("prevented" !== t.state) {
                if (!("start" !== t.state || t.allowX && t.allowY)) {
                    const n = Math.abs(t.startX - e.changedTouches[0].clientX),
                        o = Math.abs(t.startY - e.changedTouches[0].clientY);
                    if (!t.allowX && n > o)
                        return void (t.state = "prevented");
                    if (!t.allowY && o > n)
                        return void (t.state = "prevented")
                }
                if ("allowed" !== t.state && (t.state = "allowed"), p = !1, !t.overscrollX) {
                    const n = e.currentTarget.scrollLeft,
                        o = t.startX - e.changedTouches[0].clientX;
                    (n <= 0 && o <= 0 || n >= t.maxX && o >= 0) && (p = !0, t.standalone && e.preventDefault())
                }
                if (!t.overscrollY) {
                    const n = e.currentTarget.scrollTop,
                        o = t.startY - e.changedTouches[0].clientY;
                    (n <= 0 && o <= 0 || n >= t.maxY && o >= 0) && (p = !0, t.standalone && e.preventDefault())
                }
            }
        }
        function y(e) {
            const t = e.currentTarget,
                n = t.__ScrollView;
            n.state = "start",
            n.startX = e.changedTouches[0].clientX,
            n.startY = e.changedTouches[0].clientY,
            n.maxX = n.overscrollX ? null : t.scrollWidth - t.clientWidth,
            n.maxY = n.overscrollY ? null : t.scrollHeight - t.clientHeight
        }
        function g(e) {
            e.currentTarget.__ScrollView.state = ""
        }
        function b(e, t={}) {
            if (r.isIOS && (!1 !== t.override || !e.__ScrollView)) {
                if (!0 !== t.standalone) {
                    if (!E)
                        return;
                    e.__ScrollView || _.scrollViews.push(e)
                }
                e.__ScrollView = {
                    allowX: !1 !== t.allowX,
                    allowY: !1 !== t.allowY,
                    overscrollX: !1 !== t.overscrollX,
                    overscrollY: !1 !== t.overscrollY,
                    standalone: !0 === t.standalone
                },
                _ && (r.isWKWebView || (!1 !== t.topBanner && (e.__ScrollView.topBanner = t.topBanner || {
                    hide: 30,
                    show: 60
                }), addEvent(e, "scroll", P))),
                addEvent(e, "touchstart", y),
                addEvent(e, "touchmove", S),
                addEvent(e, "touchend", g)
            }
        }
        function L(e) {
            e.__ScrollView = null,
            removeEvent(e, "touchstart", y),
            removeEvent(e, "touchmove", S),
            removeEvent(e, "touchend", g),
            removeEvent(e, "scroll", P)
        }
        function P(e) {
            if ("closed" !== m || (0, r.isLandscapePhone)())
                return h = !1, void (c && clearTimeout(c));
            h = !0;
            const t = e.target.__ScrollView.topBanner;
            _ && _.topBanner && t ? V(e.target, t.show, t.hide) : V(e.target, 1 / 0, 0),
            c && clearTimeout(c),
            c = setTimeout((() => {
                h = !1,
                O()
            }), 100)
        }
        function O() {
            if (h)
                return;
            if (f)
                return void (f = !1);
            if ((0, r.isLandscapePhone)())
                return;
            window.pageYOffset;
            "closed" === m && (r.isWKWebView || (s = document.documentElement.offsetHeight, l = innerHeight, u = s === l, "show" === d ? (d = null, requestAnimationFrame(U)) : "hide" === d && (d = null, requestAnimationFrame(k))))
        }
        function I(e, t) {
            r.isIPad ? _.topBanner || setTimeout((() => {
                k()
            }), 400) : 90 === Math.abs(window.orientation) ? (addEvent(window, "resize", C), document.body.style.height = "", _.layoutHeight = null, t ? setTimeout((() => {
                window.scrollTo(0, -300),
                C()
            })) : setTimeout((() => {
                window.scrollTo(0, -300)
            }), 400)) : (removeEvent(window, "resize", C), _.layoutOffset = null, W(), _.topBanner || setTimeout((() => {
                k()
            }), 400))
        }
        function C() {
            if ("closed" !== m)
                return;
            const e = document.body.offsetHeight,
                t = e - innerHeight;
            _.layoutOffset = t,
            W(),
            window.scrollTo(0, e)
        }
        function M() {
            pageYOffset && (m = "opened", removeEvent(window, "scroll", M))
        }
        function N(e) {
            p = !0
        }
        function R(e) {
            p && e.preventDefault()
        }
        function D(e) {
            const t = e && e.target,
                n = 0 === e.eventPhase && t.getAttribute("autofocus");
            let o = !1;
            return "textarea" !== t.tagName.toLowerCase() || n || (o = !0), "input" !== t.tagName.toLowerCase() || ["checkbox", "radio", "image", "submit"].includes(t.type) || n || (o = !0), "select" === t.tagName.toLowerCase() && (o = !0), o
        }
        function x(e) {
            if (D(e)) {
                e && e.target;
                let t;
                m = "opening",
                addEvent(window, "scroll", M),
                i.onOpen(t, {
                    exitIfStarted: !0
                })
            }
        }
        function B(e) {
            D(e) && i.onClose({
                exitIfStarted: !0
            })
        }
        function Y() {
            removeEvent(window, "scroll", M),
            m = "closed",
            setTimeout((() => {
                (0, r.isLandscapePhone)() ? C() : O()
            }), 100)
        }
        function V(e, t, n) {
            let o = e.scrollTop;
            o <= -t && (u || d) ? (d = "show", window.scrollTo(0, -10)) : o >= n && (!u || d) && (d = "hide", window.scrollTo(0, 10))
        }
        function k() {
            window.scrollTo(0, 300)
        }
        function U() {
            window.setImmediate ? setImmediate((() => {
                window.scrollTo(0, -300)
            })) : window.scrollTo(0, -300)
        }
        function W() {
            const e = _.layoutOffset;
            _.layoutElement.style.top = e ? e + "px" : ""
        }
    },
    72: function(e, t, n) {
        n.d(t, {
            menu: function() {
                return A
            }
        });
        var o = n(35492),
            i = n(84943),
            r = n(4716),
            a = n(28413),
            s = n(5498),
            l = n(45397),
            u = n(32716),
            c = n(7628),
            d = n(70944),
            f = n(82314),
            _ = n(25124),
            p = n(6021);
        const h = async e => {
            const {LeftMenu: t, leftMenuService: o} = await Promise.all([Promise.all([n.e(628), n.e(8250), n.e(6522), n.e(1609), n.e(1526), n.e(2213)]).then(n.bind(n, 85146)), Promise.all([n.e(628), n.e(8250), n.e(6522), n.e(1609), n.e(1526), n.e(2213)]).then(n.bind(n, 68408)), (0, f.addEntries)(["vkui.css", "audio.js"])]).then((([{LeftMenu: e}, {leftMenuService: t}]) => ({
                LeftMenu: e,
                leftMenuService: t
            })));
            return o.loadDataEvent(), new Promise(((n, i) => {
                o.dataLoadedEvent.watch((() => {
                    ((e, t) => {
                        (0, _.createReactInitiator)(e, t, {
                            destroyAfterNavigation: !1
                        }).render({}),
                        (0, p.initAudioPlayerMini)(),
                        window.audioplayer.initAudio()
                    })(t, e),
                    n()
                })),
                o.dataLoadFailedEvent.watch(i)
            }))
        };
        var m = n(30227),
            E = n(84661),
            w = n(55437);
        let v = !1,
            T = !1;
        var A = {
            NEED_MENU_PARAM: "_nlm",
            NEED_MENU: 1,
            FORCE_NEED_MENU: 2,
            clear_hover: function() {
                thover.clear()
            },
            hasMenu: function() {
                return window.al && window.al.menu
            },
            isMenuHasItems: function() {
                return !!A.hasMenu() && ((0, w.isArray)(window.al.menu) && window.al.menu.length || (0, w.isObject)(window.al.menu) && Object.keys(window.al.menu).length)
            },
            refreshCounters: function(e) {
                var t,
                    n;
                const o = (0, u.partConfigEnabled)("mobile_account_counters_queue");
                if (!e)
                    return !0;
                if ((0, w.isArray)(e) && !e.length)
                    return !0;
                if ((0, w.isObject)(e) && !Object.keys(e).length)
                    return !0;
                const r = o ? null == (t = e.notifications) ? void 0 : t.count : e[l.COUNTERS_POS_NOTIFICATIONS],
                    a = o ? null == (n = e.messages) ? void 0 : n.count : e[l.COUNTERS_POS_MESSAGES];
                if ("number" == typeof a && Tabbar.setCounter(Tabbar.TAB_ID_MESSAGES, a), "number" == typeof r && isFinite(r)) {
                    Tabbar.setCounter(Tabbar.TAB_ID_NOTIFICATION, r),
                    E.default.setCount(r),
                    window.store && (store.notificationsCount = r);
                    const e = document.getElementById("header_notification_counter");
                    e && (e.textContent = r || "")
                }
                const {al: s} = window,
                    c = (0, i.$)(".main_menu", document.getElementById("l"));
                return !c || !s.menu || (Object.entries(e).forEach((([e, t]) => {
                        const n = o ? t.index : e,
                            r = o ? t.count : t;
                        if (void 0 === r)
                            return !0;
                        const a = s.menu[n];
                        if (!a)
                            return !0;
                        const l = (0, i.$)(".mmi_" + a[0], c),
                            u = (0, i.$)(".mm_item", l),
                            d = (0, i.$)(".mmi_wrap", l),
                            f = (0, i.$)(".mm_counter", d),
                            _ = (0, i.$)(".mm_label", d),
                            p = (0, i.$)(".visually-hidden", _);
                        if ((0, w.attr)(u, "data-href", !1), r) {
                            if (a[3] && (0, w.attr)(u, "href", a[3]), f)
                                (0, w.val)(f, r);
                            else {
                                const e = (0, w.ce)("em", {
                                    className: "mm_counter",
                                    innerHTML: r
                                });
                                e.setAttribute("aria-hidden", "true"),
                                (0, w.append)(e, d)
                            }
                            p ? (0, w.val)(p, `&nbsp;${r}`) : (0, w.append)((0, w.ce)("span", {
                                className: "visually-hidden",
                                innerHTML: `&nbsp;${r}`
                            }), _)
                        } else
                            a[2] && (0, w.attr)(u, "href", a[2]),
                            (0, w.remove)(f),
                            (0, w.remove)(p);
                        ajax.prepare_click(u)
                    })), !0)
            },
            refreshSingleCounter: (e, t) => {
                if (!A.hasMenu())
                    return;
                let n;
                (0, w.isArray)(window.al.menu) && (n = new Array(al.menu.length), n[e] = t),
                (0, w.isObject)(window.al.menu) && (n = {}, Object.entries(window.al.menu).forEach((([o, i]) => {
                    parseInt(i, 10) === parseInt(e, 10) ? n[i] = t : n[i] = void 0
                }))),
                A.refreshCounters(n)
            },
            refreshNotifications: e => {
                window.store && (store.menuNotifications = e);
                const t = (0, i.$)(".mmi_apps .mmi_wrap");
                if (!t)
                    return;
                const n = (0, i.$)('[data-id="menu-apps-notification"]', t);
                !e[l.COUNTERS_POS_APPS] && n && n.remove(),
                e[l.COUNTERS_POS_APPS] && !n && (t.innerHTML += a.default.render((0, s.default)({
                    id: "menu-apps-notification"
                })))
            },
            refresh: function(e) {
                if (e = e || {}, ajax.refreshLinks(e.fv_link, e.app_link), void 0 !== e.pp && !1 !== e.pp && (0, w.val)("lm_prof_panel", e.pp), void 0 !== e.tn && !1 !== e.tn && (0, w.val)("lm_top_notify", e.tn), void 0 !== e.bn && !1 !== e.bn && (0, w.val)("lm_bottom_notify", e.bn), void 0 !== e.lm_content && !1 !== e.lm_content) {
                    const t = document.getElementById("lm_content");
                    t && (t.outerHTML = e.lm_content)
                }
                e.lm && (0, w.val)("l", e.lm),
                e.counters && !(0, u.partConfigEnabled)("mobile_account_counters_queue") && A.refreshCounters(e.counters),
                e.notifications && A.refreshNotifications(e.notifications),
                e.tab && !(0, u.partConfigEnabled)("mvk_keep_client_tab_id") && Tabbar.setCurrentId(e.tab),
                e.topbar || (0, w.remove)("vk_topbar")
            },
            loadMenu: function(e=3) {
                if (!T && (0, d.getCurrentLayout)() === d.LAYOUT.DESKTOP && document.getElementById("lm_cont") && !A.hasMenu() && window.vk && window.vk.id) {
                    T = !0;
                    const t = document.getElementById("LeftMenuRoot");
                    if (t)
                        return d.onLayoutChange.off(A.loadMenu), void h(t).catch((e => {
                            (0, m.logError)(e)
                        })).finally((() => {
                            T = !1
                        }));
                    ajax.post("/menu", {
                        act: "left_menu"
                    }, {
                        noRedirectOnFail: !0,
                        onDone: function(e) {
                            T = !1,
                            e && A.refresh(e),
                            d.onLayoutChange.off(A.loadMenu)
                        },
                        onFail: function(t, n) {
                            (0, m.logError)(new Error(n)),
                            T = !1,
                            e > 0 && setTimeout((() => {
                                A.loadMenu(e - 1)
                            }), 2e3)
                        }
                    })
                }
            },
            initEvents: function() {
                const e = A.getStickedScrollingHandler();
                e && ((0, w.onBodyScroll)(e), e((0, w.scrollGetY)())),
                (0, d.onLayoutChange)(A.loadMenu),
                (0, w.onBodyResize)((function() {
                    e && e((0, w.scrollGetY)())
                }))
            },
            init: function() {
                A.fixed = (0, w.hasClass)("_hfixed", document.body),
                A.initEvents(),
                A.loadMenu();
                const e = (0, i.$)(".leftMenu__content");
                e && (0, r.setScrollView)(e, {
                    topBanner: !!o.default.ipad && void 0,
                    overscrollY: !1,
                    standalone: !0
                })
            },
            qsOpened: !1,
            initSearch: function() {
                v || (v = !0, (0, w.addEvent)("lm_search_items", "mousedown touchstart", (function(e) {
                    e.stopPropagation()
                }), {
                    passive: !0
                }), (0, w.addEvent)((0, i.$)(".head_search", document.getElementById("l")), "mousedown touchstart", (function(e) {
                    e.stopPropagation()
                }), {
                    passive: !0
                }))
            },
            headerAction: function(e, t) {
                return nav.go(e, t)
            },
            getStickedScrollingHandler: () => {
                const e = (0, i.$)(".leftMenu__content"),
                    t = document.body;
                if (!e || !t || !t.classList.contains("_hfixed"))
                    return;
                if (t.classList.contains("_touch"))
                    return;
                let n,
                    o = (0, w.scrollGetY)(),
                    r = (0, w.scrollGetY)(),
                    a = !1;
                const s = (t, n=0) => {
                    e.style.position = t,
                    e.style.top = `${n}px`,
                    e.style.bottom = ""
                };
                let l = document.getElementById("mcont");
                return function(t) {
                    if (t < 0 || t > 0 && t + window.innerHeight >= document.body.scrollHeight)
                        return;
                    if ((0, w.getCw)() < 882)
                        return;
                    const i = e.getBoundingClientRect(),
                        u = Math.round(i.top),
                        c = Math.floor(i.height);
                    if (0 === c)
                        return void s("absolute");
                    const d = document.documentElement;
                    if (c >= (l && 0 !== l.offsetHeight || (l = document.getElementById("mcont")), (0, w.getH)(l)))
                        s("absolute");
                    else if (!(c > d.scrollHeight)) {
                        if ((t > o || t === o && t > 0) && (n = "down"), t < o && (n = "up"), o = t, c + 56 < window.innerHeight)
                            return s("fixed"), void (r = t + u - 56);
                        switch (n) {
                        case "down":
                            a = c + u <= window.innerHeight;
                            break;
                        case "up":
                            a = 0 <= u - 56
                        }
                        a ? ("down" === n ? ((t, n=0) => {
                            e.style.position = t,
                            e.style.top = "",
                            e.style.bottom = `${n}px`
                        })("fixed") : s("fixed"), r = t + Math.round(e.getBoundingClientRect().top) - 56) : s("absolute", r)
                    }
                }
            }
        };
        (0, c.onServerEvent)("LeftMenu/init").watch((e => {
            Object.assign(window.al, {
                menu: e
            })
        })),
        window.menu = A
    },
    84661: function(e, t, n) {
        n.d(t, {
            default: function() {
                return d
            }
        });
        var o = n(28413),
            i = n(43431),
            r = n(52926),
            a = n(19276),
            s = function(e) {
                const t = e.count;
                return o.default.html({
                    class: [i.default.class("Bell", {
                        empty: !t
                    }, "_"), "al_menu"],
                    href: e.url,
                    onclick: e.onclick,
                    "aria-label": a.getLang("mobile_notifications_title"),
                    "data-header": a.getLang("mobile_notifications_title"),
                    "data-skiponclick": 1,
                    inner: [(0, r.default)({
                        mix: "Bell__icon",
                        icon: "bell"
                    }), {
                        class: "Bell__counter",
                        inner: t,
                        tag: "em"
                    }]
                })
            };
        var l = n(84943);
        Object.assign(s, {
            setCount: function(e) {
                (0, l.$$)(c.bell).forEach((t => {
                    const n = t.$(c.counter);
                    t.classList.toggle(u.empty, !e),
                    n.innerText = e
                }))
            }
        });
        const u = {
                empty: "Bell_empty"
            },
            c = {
                bell: ".Bell",
                counter: ".Bell__counter"
            };
        var d = s
    },
    53760: function(e, t, n) {
        n.d(t, {
            audioUnmaskSource: function() {
                return a
            }
        });
        var o = n(7250);
        const i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
            r = {
                v: function(e) {
                    return e.split("").reverse().join("")
                },
                r: function(e, t) {
                    let n;
                    e = e.split("");
                    const o = i + i;
                    let r = e.length;
                    for (; r--;)
                        n = o.indexOf(e[r]),
                        ~n && (e[r] = o.substr(n - t, 1));
                    return e.join("")
                },
                s: function(e, t) {
                    let n = e.length;
                    if (n) {
                        const o = function(e, t) {
                            const n = e.length,
                                o = [];
                            if (n) {
                                let e = n;
                                for (t = Math.abs(t); e--;)
                                    t = (n * (e + 1) ^ t + e) % n,
                                    o[e] = t
                            }
                            return o
                        }(e, t);
                        let i = 0;
                        for (e = e.split(""); ++i < n;)
                            e[i] = e.splice(o[n - 1 - i], 1, e[i])[0];
                        e = e.join("")
                    }
                    return e
                },
                i: function(e, t) {
                    return r.s(e, t ^ vk.id)
                },
                x: function(e, t) {
                    const n = [];
                    return t = t.charCodeAt(0), (0, o.each)(e.split(""), (function(e, o) {
                        n.push(String.fromCharCode(o.charCodeAt(0) ^ t))
                    })), n.join("")
                }
            };
        function a(e) {
            if ((!window.wbopen || !~(window.open + "").indexOf("wbopen")) && ~e.indexOf("audio_api_unavailable")) {
                let t,
                    n,
                    o = e.split("?extra=")[1].split("#"),
                    i = "" === o[1] ? "" : s(o[1]);
                if (o = s(o[0]), "string" != typeof i || !o)
                    return e;
                i = i ? i.split(String.fromCharCode(9)) : [];
                let a = i.length;
                for (; a--;) {
                    if (n = i[a].split(String.fromCharCode(11)), t = n.splice(0, 1, o)[0], !r[t])
                        return e;
                    o = r[t].apply(null, n)
                }
                if (o && "http" === o.substr(0, 4))
                    return o
            }
            return e
        }
        function s(e) {
            if (!e || e.length % 4 == 1)
                return !1;
            let t,
                n,
                o = 0,
                r = 0,
                a = "";
            for (; n = e.charAt(r++);)
                n = i.indexOf(n),
                ~n && (t = o % 4 ? 64 * t + n : n, o++ % 4) && (a += String.fromCharCode(255 & t >> (-2 * o & 6)));
            return a
        }
    },
    43431: function(e, t, n) {
        function o(e) {
            return "number" == typeof e || "string" == typeof e && !!e
        }
        n.d(t, {
            default: function() {
                return r
            }
        });
        const i = {
            class: function(e, t={}, n="--") {
                const i = [e];
                return Object.keys(t).forEach((r => {
                    if (o(r)) {
                        const a = t[r];
                        !0 === a ? i.push(`${e}${n}${r}`) : o(a) && i.push(`${e}${n}${r}${n}${a}`)
                    }
                })), i.join(" ")
            },
            setMod: function(e, t, n) {
                const i = new RegExp(`\\s*${t}(_[-a-zA-Z]+)?`);
                let r;
                r = !0 === n ? ` ${t}` : o(n) ? ` ${t}_${n}` : "",
                i.test(e.className) ? e.className = e.className.replace(i, r) : e.className += r
            }
        };
        window.Bem = i;
        var r = i
    },
    69709: function(e, t, n) {
        function o(e) {
            return "number" == typeof e && !isNaN(e)
        }
        function i(e, t) {
            return (e % t + t) % t
        }
        n.d(t, {
            getCircularIndex: function() {
                return i
            },
            isNumber: function() {
                return o
            }
        })
    },
    47201: function(e, t, n) {
        n.d(t, {
            disableBodyScroll: function() {
                return d
            },
            enableBodyScroll: function() {
                return f
            },
            getBodyScrollLocked: function() {
                return _
            }
        });
        var o = n(55437),
            i = n(35492),
            r = n(69709);
        let a,
            s = !1,
            l = null,
            u = null;
        const c = "fixed";
        function d(e, t={}) {
            if (!window.MutationObserver)
                return;
            if (s)
                return;
            window.storybook || window.nav.saveScrollPosition();
            const n = document.body,
                d = (0, o.scrollTop)(),
                _ = n;
            let p;
            if (l = _.style.overflow, s = !0, i.default.ios || i.default.ipad || (_.style.overflow = "hidden"), t.forceScrollDisable && (_.style.height = "100%", document.documentElement.style.overflow = "hidden"), u = new MutationObserver((() => {
                _.contains(e) || f()
            })), a = d, n) {
                const e = !n.classList.contains(c);
                n.classList.add(c),
                e && (0, o.setStyle)(n, {
                    top: `-${d}px`
                }),
                p = (0, r.isNumber)(d) ? d : void 0,
                i.default.safari && (0, o.getCw)() < 882 && document.scrollingElement && (document.scrollingElement.scrollTop = d || 0, setTimeout((() => {
                    document.scrollingElement && (document.scrollingElement.scrollTop = d || 0)
                }), 100), setTimeout((() => {
                    document.scrollingElement && (document.scrollingElement.scrollTop = d || 0)
                }), 300))
            }
            return u.observe(n, {
                attributes: !0,
                childList: !0,
                subtree: !0
            }), {
                bodyScrollTopBeforeOpen: p
            }
        }
        function f(e, t={}) {
            if (!window.MutationObserver)
                return;
            var n;
            const i = null != (n = null == t ? void 0 : t.bodyScrollTopBeforeOpen) ? n : a,
                r = void 0 === (null == t ? void 0 : t.bodyScrollTopBeforeOpen),
                d = document.body;
            if (s) {
                if (d.style.overflow = l, (null == t ? void 0 : t.forceScrollDisable) && (document.documentElement.style.overflow = "initial"), null == u || u.disconnect(), d) {
                    const e = d.classList.contains(c);
                    d.classList.remove(c),
                    e && void 0 !== i && ((0, o.setStyle)(d, {
                        top: ""
                    }), (0, o.scrollTop)(i))
                }
                s = !1,
                r && (a = void 0)
            }
        }
        function _() {
            return s
        }
    },
    53279: function(e, t, n) {
        n.r(t),
        n.d(t, {
            getLastInteractionMethod: function() {
                return l
            },
            initInteractionMethodListener: function() {
                return a
            },
            onInteractionMethodChange: function() {
                return i
            }
        });
        var o = n(32489);
        const i = (0, o.createEvent)("onInteractionMethodChange"),
            r = (0, o.createStore)("coarse").on(i, ((e, t) => t));
        function a() {
            window.clog("[UserInteraction] init"),
            "matchMedia" in window ? function() {
                const e = window.matchMedia("(pointer: coarse)");
                e.addEventListener("change", (e => {
                    e.matches && i("coarse")
                }));
                const t = window.matchMedia("(pointer: fine)");
                t.addEventListener("change", (e => {
                    e.matches && i("fine")
                })),
                e.matches ? i("coarse") : t.matches && i("fine")
            }() : s()
        }
        function s() {
            document.addEventListener("mouseenter", (function e() {
                i("fine"),
                document.removeEventListener("mouseenter", e, {
                    capture: !0
                }),
                function() {
                    function e(t) {
                        var n;
                        (null == (n = t.sourceCapabilities) ? void 0 : n.firesTouchEvents) || (i("coarse"), document.removeEventListener("touchstart", e, {
                            capture: !0
                        }), s())
                    }
                    document.addEventListener("touchstart", e, {
                        passive: !0,
                        capture: !0
                    })
                }()
            }), {
                passive: !0,
                capture: !0
            })
        }
        function l() {
            return r.getState()
        }
        r.watch((e => {
            window.clog(`[UserInteraction] Last interaction method changed to ${e}`)
        }))
    },
    85678: function(e, t, n) {
        n.d(t, {
            StandaloneModalRoot: function() {
                return s
            }
        });
        var o = n(12),
            i = n(83713),
            r = n(52565),
            a = n(16309);
        const s = ({modal: e, popout: t, children: n, shouldLockBodyScroll: s, disablePortal: l}) => (0, o.jsx)("div", {
            className: (0, a.classNames)(l ? "" : "StandaloneModalRoot"),
            children: (0, o.jsx)(i.VKUIAppWrapper, {
                shouldLockBodyScroll: s,
                mode: "embedded",
                transparentEmbedded: !0,
                disablePortal: l,
                children: (0, o.jsx)(r.SplitLayout, {
                    modal: n || e,
                    popout: t
                })
            })
        })
    },
    83713: function(e, t, n) {
        n.d(t, {
            VKUIAppWrapper: function() {
                return m
            }
        });
        var o = n(12),
            i = n(16309),
            r = n(70960),
            a = n(52565),
            s = n(53279),
            l = n(55437),
            u = n(47201),
            c = n(12966),
            d = "VKUIAppWrapper-module__wrapperModeEmbedded--GSxPD",
            f = "VKUIAppWrapper-module__dynamicHeight--mnqCe",
            _ = "VKUIAppWrapper-module__wrapper--n1S66",
            p = "VKUIAppWrapper-module__modeEmbedded--qcrVp";
        const h = {
            [a.ViewWidth.DESKTOP]: 1024,
            [a.ViewWidth.TABLET]: 882,
            [a.ViewWidth.SMALL_TABLET]: 620,
            [a.ViewWidth.MOBILE]: 320,
            [a.ViewWidth.SMALL_MOBILE]: 180
        };
        const m = ({children: e, mode: t, transparentEmbedded: n, shouldLockBodyScroll: m, fixedSizeX: E, sizeX: w, sizeY: v, dynamicHeight: T, ...A}) => {
            const [S, y] = (0, r.useState)("fine" === (0, s.getLastInteractionMethod)()),
                [g, b] = (0, r.useState)((0, l.getCw)()),
                L = (0, r.useRef)(null);
            (0, r.useEffect)((() => {
                const e = () => {
                    b((0, l.getCw)())
                };
                return window.addEventListener("resize", e), m && (null == L ? void 0 : L.current) && (0, u.disableBodyScroll)(L.current), () => {
                    window.removeEventListener("resize", e),
                    m && (0, u.enableBodyScroll)()
                }
            }), []),
            (0, r.useEffect)((() => {
                const e = s.onInteractionMethodChange.watch((e => {
                    y("fine" === e)
                }));
                return () => {
                    e()
                }
            }), []);
            const P = (O = g) >= h[a.ViewWidth.DESKTOP] ? a.ViewWidth.DESKTOP : O >= h[a.ViewWidth.TABLET] ? a.ViewWidth.TABLET : O >= h[a.ViewWidth.SMALL_TABLET] ? a.ViewWidth.SMALL_TABLET : O >= h[a.ViewWidth.MOBILE] ? a.ViewWidth.MOBILE : a.ViewWidth.SMALL_MOBILE;
            var O;
            const I = E ? P > a.ViewWidth.SMALL_TABLET ? a.SizeType.REGULAR : a.SizeType.COMPACT : w || void 0,
                C = (0, c.useAppearanceDetector)(),
                M = "embedded" === t;
            return (0, o.jsx)(a.AdaptivityProvider, {
                hasPointer: S,
                viewWidth: P,
                sizeX: I,
                sizeY: v,
                children: (0, o.jsx)(a.ConfigProvider, {
                    isWebView: !0,
                    appearance: C,
                    platform: a.Platform.ANDROID,
                    transitionMotionEnabled: !1,
                    webviewType: a.WebviewType.INTERNAL,
                    children: (0, o.jsx)("div", {
                        ref: L,
                        className: (0, i.classNames)(A.className, _, {
                            [d]: M,
                            [f]: M && T,
                            vkui__root: !0,
                            "vkui__root--embedded": M
                        }),
                        children: t ? (0, o.jsx)(a.AppRoot, {
                            ...A,
                            mode: t,
                            className: (0, i.classNames)({
                                [p]: M
                            }),
                            style: {
                                backgroundColor: M && n ? "transparent" : void 0
                            },
                            disableParentTransformForPositionFixedElements: !0,
                            children: "partial" === t ? (0, o.jsx)("div", {
                                className: "vkui__root",
                                children: e
                            }) : e
                        }) : e
                    })
                })
            })
        }
    },
    86340: function(e, t, n) {
        n.d(t, {
            Icon: function() {
                return s
            }
        });
        var o = n(82136),
            i = n(19276),
            r = n(55784),
            a = n(14418);
        function s(e) {
            const t = e.icon;
            return (0, o.jsx)(r.MaybeLink, {
                className: (0, i.classNames)((0, a.getClassNameFromProps)(e) || e.mix, "Icon", {
                    [`Icon_${t}`]: !0,
                    Icon_active: e.active,
                    Icon_blue: e.blue,
                    Icon_bluer: e.bluer,
                    Icon_dark: e.dark,
                    Icon_selected: e.selected,
                    Icon_small: e.small,
                    Icon_white: e.white
                }),
                href: e.url,
                attrs: e.attrs
            })
        }
    },
    52926: function(e, t, n) {
        n.d(t, {
            default: function() {
                return i
            }
        });
        var o = n(86340);
        var i = o.Icon
    },
    55784: function(e, t, n) {
        n.d(t, {
            MaybeLink: function() {
                return a
            }
        });
        var o = n(82136),
            i = n(96124),
            r = n(14418);
        function a(e) {
            let t = e.tag;
            e.href && !t && (t = "a");
            const {children: n} = e,
                a = (0, r.getChildrenFromProps)(e, n);
            return (0, o.jsx)(i.CustomTag, {
                tag: t || "div",
                ...e,
                children: a
            })
        }
    },
    77544: function(e, t, n) {
        var o;
        n.d(t, {
            AudioPlayerEventType: function() {
                return o
            },
            events: function() {
                return i
            }
        }),
        function(e) {
            e.CURRENT_CHANGED = "curr",
            e.PLAY = "start",
            e.PLAY_REQUESTED = "request_play",
            e.IMPL_PLAY = "impl_play",
            e.PAUSE = "pause",
            e.STOP = "stop",
            e.UPDATE = "update",
            e.LOADED = "loaded",
            e.ENDED = "ended",
            e.FAILED = "failed",
            e.BUFFERED = "buffered",
            e.PROGRESS = "progress",
            e.VOLUME = "volume",
            e.PLAYLIST_CHANGED = "plchange",
            e.PLAYLIST_CLEAR_REQUESTED = "playlist_clear_requested",
            e.PLAYLIST_CLEARED = "playlist_cleared",
            e.ADDED = "added",
            e.REMOVED = "removed",
            e.FREQ_UPDATE = "freq",
            e.SEEK = "seek",
            e.PLAY_NEXT = "play_next",
            e.AD_READY = "ad_ready",
            e.AD_DEINITED = "ad_deinit",
            e.AD_STARTED = "ad_started",
            e.AD_COMPLETED = "ad_completed",
            e.PLAYER_IS_AD_CHANGED = "player_is_ad_changed",
            e.PLAYER_IS_PLAYING_CHANGED = "player_is_playing_changed",
            e.START_LOADING = "start_load",
            e.CAN_PLAY = "actual_start",
            e.SELECT = "select",
            e.DESELECT = "deselect",
            e.EMPTY_PLAYLIST = "empty_playlist",
            e.NOT_FOUND_PLAYLIST = "not_found_playlist",
            e.INIT = "init",
            e.REQUEST_EXPANDED = "request_expanded",
            e.PLAYLIST_START_LOADING = "playlist_start_loading",
            e.MUSIC_AUDIOS_ADD = "music_audios_add",
            e.MUSIC_AUDIOS_DELETE = "music_audios_delete",
            e.MUSIC_PLAYLISTS_ADD = "music_playlists_add",
            e.MUSIC_OWNERS_FOLLOW = "music_owners_follow",
            e.MUSIC_OWNERS_UNFOLLOW = "music_owners_unfollow",
            e.CURATOR_FOLLOW = "curator_follow",
            e.CURATOR_UNFOLLOW = "curator_unfollow",
            e.RADIOSTATION_FOLLOW = "radiostation_follow",
            e.RADIOSTATION_UNFOLLOW = "radiostation_unfollow",
            e.CURRENT_RADIOSTATION_FOLLOW_STATUS_UPDATE = "current_radiostation_update",
            e.CURRENT_AUDIO_DISLIKE_STATUS_UPDATE = "current_audio_dislike_status_update",
            e.AUDIO_RESTORE_BY_DISLIKE_ACTION = "audio_restore_by_dislike_action",
            e.AUDIO_DELETE_BY_DISLIKE_ACTION = "audio_delete_by_dislike_action",
            e.PLACEHOLDER_REMOVE = "placeholder_remove",
            e.PLAY_TRACK_FROM_AUTOPLAY = "play_track_from_autoplay",
            e.CLEAN_AUTOPLAY_QUEUE = "clean_autoplay_queue",
            e.PLAY_PREVIEW = "play_preview",
            e.STOP_PREVIEW = "stop_preview",
            e.END_PREVIEW = "end_preview",
            e.PROGRESS_PREVIEW = "progress_preview",
            e.PREVIEW_BUFFERED = "preview_buffered",
            e.PLAY_SNIPPET = "play_snippet",
            e.STOP_SNIPPET = "stop_snippet",
            e.PROGRESS_SNIPPET = "progress_snippet",
            e.SNIPPET_BUFFERED = "snippet_buffered",
            e.SNIPPET_PLAYER_STATE_CHANGED = "snippet_player_state_changed",
            e.SNIPPET_PLAYER_FAIL = "snippet_player_fail",
            e.SNIPPET_PLAYER_PLAY_NEXT_SNIPPET = "snippet_player_play_next_snippet",
            e.SNIPPET_PLAYER_PLAY_PREV_SNIPPET = "snippet_player_play_prev_snippet",
            e.SNIPPET_PLAYER_SNIPPET_PLAYING_END = "snippet_player_snippet_playing_end",
            e.SNIPPET_PLAYER_CHANGE_SOURCE = "snippet_player_change_source",
            e.SNIPPET_PLAYER_PAUSED_BY_INCOMING_CALL = "snippet_player_paused_by_incoming_call",
            e.SNIPPET_PLAYER_PAUSED_BY_VISIBILITY = "snippet_player_paused_by_visibility"
        }(o || (o = {}));
        const i = o
    },
    30420: function(e, t, n) {
        n.d(t, {
            checkIsDownloadedUrl: function() {
                return i
            }
        });
        var o = n(53760);
        function i(e) {
            return (0, o.audioUnmaskSource)(e).includes("blob:http")
        }
    },
    34364: function(e, t, n) {
        function o(e) {
            window.cur && window.cur.destroy && window.cur.destroy.push(e)
        }
        n.d(t, {
            pushNavDestroy: function() {
                return o
            }
        })
    },
    25124: function(e, t, n) {
        n.d(t, {
            createReactInitiator: function() {
                return o.createReactInitiator
            },
            createReactLazyInitiator: function() {
                return o.createReactLazyInitiator
            }
        });
        var o = n(9025)
    },
    9025: function(e, t, n) {
        n.d(t, {
            createReactInitiator: function() {
                return a
            },
            createReactLazyInitiator: function() {
                return s
            }
        });
        var o = n(12),
            i = n(10100),
            r = n(32716);
        function a(e, t=null, n) {
            const r = (0, i.createBasicReactInitiator)(t, n);
            return {
                ...r,
                render: function(t) {
                    return r.render((0, o.jsx)(e, {
                        ...t
                    }))
                }
            }
        }
        function s(e, t=null, n) {
            const a = (0, i.createBasicReactInitiator)(t, n),
                s = !t;
            let l;
            return {
                ...a,
                render: async function(n, i) {
                    const u = new Error("Async render error");
                    if (!l) {
                        if (l = await e(), null == i ? void 0 : i.abortSignal.aborted)
                            return;
                        const n = (0, r.partConfigEnabled)("react_lazy_initiator_abort_render"),
                            o = Boolean("function" == typeof t ? t() : t);
                        if (n && !s && !o)
                            return void console.warn("Target container not found. Verify that it exists before render.")
                    }
                    return a.render((0, o.jsx)(l, {
                        ...n
                    }), {
                        asyncBaseError: u
                    })
                }
            }
        }
    },
    10100: function(e, t, n) {
        n.d(t, {
            createBasicReactInitiator: function() {
                return u
            }
        });
        var o = n(51317),
            i = n(8430),
            r = n(34364);
        function a() {
            const e = document.createElement("div");
            return e.id = `${s}_${l++}`, e
        }
        const s = `rc_${(0, n(7250).srand)()}`;
        let l = 0;
        function u(e=null, t={}) {
            const {onRendered: n, onMounted: s, onUpdated: l, onUnmounted: u, destroyAfterNavigation: d=!0, useReact18Root: f} = t,
                _ = !e;
            let p = null;
            function h() {
                if (e)
                    return e;
                const t = a();
                return document.body.appendChild(t), t
            }
            let m = null;
            if (f) {
                const e = h();
                if ("function" == typeof e)
                    throw new Error("Function container getter is not allowed while using useReact18Root option");
                const t = c(e);
                m = (0, i.createRoot)(t)
            }
            function E() {
                if (!p)
                    return !1;
                let e = !0;
                return m ? m.unmount() : e = o.unmountComponentAtNode(p), _ && p.remove(), p = null, null == u || u(e), e
            }
            return {
                render: function(e, t={}) {
                    let i = !1;
                    try {
                        p || (i = !0, p = c(h())),
                        f ? null == m || m.render(e) : o.render(e, p)
                    } catch (e) {
                        throw t.asyncBaseError ? new Error(e.message, {
                            cause: t.asyncBaseError
                        }) : e
                    }
                    if (null == n || n(E), i) {
                        const e = p;
                        d && (0, r.pushNavDestroy)((() => {
                            e === p && E()
                        })),
                        null == s || s(E)
                    } else
                        null == l || l(E)
                },
                unmount: E,
                getContainer: function() {
                    return p
                },
                isMounted: function() {
                    return !!p
                }
            }
        }
        function c(e) {
            if ("function" != typeof e)
                return e;
            const t = e();
            if (!t)
                throw new Error("Target container not found. Verify that it exists before render.");
            return t
        }
    }
}]);
