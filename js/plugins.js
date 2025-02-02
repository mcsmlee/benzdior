! function (e, t) {
	"function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.scrollReveal = t()
}(this, function () {
	return window.scrollReveal = function (e) {
		"use strict";

		function t(t) {
			return r = this, r.elems = {}, r.serial = 1, r.blocked = !1, r.config = o(r.defaults, t), r.isMobile() && !r.config.mobile || !r.isSupported() ? void r.destroy() : (r.config.viewport == e.document.documentElement ? (e.addEventListener("scroll", n, !1), e.addEventListener("resize", n, !1)) : r.config.viewport.addEventListener("scroll", n, !1), void r.init(!0))
		}
		var i, o, n, r;
		return t.prototype = {
			defaults: {
				enter: "bottom",
				move: "8px",
				over: "0.6s",
				wait: "0s",
				easing: "ease",
				scale: {
					direction: "up",
					power: "5%"
				},
				opacity: 0,
				mobile: !1,
				reset: !1,
				viewport: e.document.documentElement,
				delay: "once",
				vFactor: .6,
				complete: function () {}
			},
			init: function (e) {
				var t, i, o;
				o = Array.prototype.slice.call(r.config.viewport.querySelectorAll("[data-sr]")), o.forEach(function (e) {
					t = r.serial++, i = r.elems[t] = {
						domEl: e
					}, i.config = r.configFactory(i), i.styles = r.styleFactory(i), i.seen = !1, e.removeAttribute("data-sr"), e.setAttribute("style", i.styles.inline + i.styles.initial)
				}), r.scrolled = r.scrollY(), r.animate(e)
			},
			animate: function (e) {
				var t, i, o, n;
				n = function (e) {
					var t = r.elems[e];
					setTimeout(function () {
						t.domEl.setAttribute("style", t.styles.inline), t.config.complete(t.domEl), delete r.elems[e]
					}, t.styles.duration)
				};
				for (t in r.elems) r.elems.hasOwnProperty(t) && (i = r.elems[t], o = r.isElemInViewport(i), o && ("always" === r.config.delay || "onload" === r.config.delay && e || "once" === r.config.delay && !i.seen ? i.domEl.setAttribute("style", i.styles.inline + i.styles.target + i.styles.transition) : i.domEl.setAttribute("style", i.styles.inline + i.styles.target + i.styles.reset), i.seen = !0, i.config.reset || i.animating || (i.animating = !0, n(t))), !o && i.config.reset && i.domEl.setAttribute("style", i.styles.inline + i.styles.initial + i.styles.reset));
				r.blocked = !1
			},
			configFactory: function (e) {
				var t = {},
					i = {},
					n = e.domEl.getAttribute("data-sr").split(/[, ]+/);
				return n = r.filter(n), n.forEach(function (e, i) {
					switch (e) {
						case "enter":
							return void(t.enter = n[i + 1]);
						case "wait":
							return void(t.wait = n[i + 1]);
						case "move":
							return void(t.move = n[i + 1]);
						case "ease":
							return t.move = n[i + 1], void(t.ease = "ease");
						case "ease-in":
							return "up" == n[i + 1] || "down" == n[i + 1] ? (t.scale.direction = n[i + 1], t.scale.power = n[i + 2], void(t.easing = "ease-in")) : (t.move = n[i + 1], void(t.easing = "ease-in"));
						case "ease-in-out":
							return "up" == n[i + 1] || "down" == n[i + 1] ? (t.scale.direction = n[i + 1], t.scale.power = n[i + 2], void(t.easing = "ease-in-out")) : (t.move = n[i + 1], void(t.easing = "ease-in-out"));
						case "ease-out":
							return "up" == n[i + 1] || "down" == n[i + 1] ? (t.scale.direction = n[i + 1], t.scale.power = n[i + 2], void(t.easing = "ease-out")) : (t.move = n[i + 1], void(t.easing = "ease-out"));
						case "hustle":
							return "up" == n[i + 1] || "down" == n[i + 1] ? (t.scale.direction = n[i + 1], t.scale.power = n[i + 2], void(t.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )")) : (t.move = n[i + 1], void(t.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )"));
						case "over":
							return void(t.over = n[i + 1]);
						case "reset":
							return void(t.reset = "no" == n[i - 1] ? !1 : !0);
						case "scale":
							return t.scale = {}, "up" == n[i + 1] || "down" == n[i + 1] ? (t.scale.direction = n[i + 1], void(t.scale.power = n[i + 2])) : void(t.scale.power = n[i + 1]);
						default:
							return
					}
				}), i = o(i, r.config), i = o(i, t), ("top" == i.enter || "bottom" == i.enter) && (i.axis = "Y"), ("left" == i.enter || "right" == i.enter) && (i.axis = "X"), "hustle" == i.easing && (i.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )"), ("top" == i.enter || "left" == i.enter) && (i.move = "-" + i.move), i
			},
			styleFactory: function (e) {
				var t, i, o, n, r, a;
				return r = e.domEl.getAttribute("style") ? e.domEl.getAttribute("style") + "; visibility: visible; " : "visibility: visible; ", t = "-webkit-transition: -webkit-transform " + e.config.over + " " + e.config.easing + " " + e.config.wait + ", opacity " + e.config.over + " " + e.config.easing + " " + e.config.wait + "; transition: transform " + e.config.over + " " + e.config.easing + " " + e.config.wait + ", opacity " + e.config.over + " " + e.config.easing + " " + e.config.wait + "; -webkit-perspective: 1000;-webkit-backface-visibility: hidden;", n = "-webkit-transition: -webkit-transform " + e.config.over + " " + e.config.easing + " 0s, opacity " + e.config.over + " " + e.config.easing + " 0s; transition: transform " + e.config.over + " " + e.config.easing + " 0s, opacity " + e.config.over + " " + e.config.easing + " 0s; -webkit-perspective: 1000; -webkit-backface-visibility: hidden; ", a = function () {
					0 != parseInt(e.config.move) && (i += " translate" + e.config.axis + "(" + e.config.move + ")", o += " translate" + e.config.axis + "(0)"), 0 != parseInt(e.config.scale.power) && ("up" == e.config.scale.direction && (e.config.scale.value = 1 - .01 * parseFloat(e.config.scale.power)), "down" == e.config.scale.direction && (e.config.scale.value = 1 + .01 * parseFloat(e.config.scale.power)), i += " scale(" + e.config.scale.value + ")", o += " scale(1)"), i += "; opacity: " + e.config.opacity + "; ", o += "; opacity: 1; "
				}, i = "transform:", o = "transform:", a(), i += "-webkit-transform:", o += "-webkit-transform:", a(), {
					transition: t,
					initial: i,
					target: o,
					reset: n,
					inline: r,
					duration: 1e3 * (parseFloat(e.config.over) + parseFloat(e.config.wait))
				}
			},
			filter: function (e) {
				var t = [],
					i = ["from", "the", "and", "then", "but", "with", "please"];
				return e.forEach(function (e) {
					i.indexOf(e) > -1 || t.push(e)
				}), t
			},
			getViewportH: function () {
				var t = r.config.viewport.clientHeight,
					i = e.innerHeight;
				return r.config.viewport == e.document.documentElement && i > t ? i : t
			},
			scrollY: function () {
				return r.config.viewport == e.document.documentElement ? e.pageYOffset : r.config.viewport.scrollTop + r.config.viewport.offsetTop
			},
			getOffset: function (e) {
				var t = 0,
					i = 0;
				do isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (i += e.offsetLeft); while (e = e.offsetParent);
				return {
					top: t,
					left: i
				}
			},
			isElemInViewport: function (t) {
				var i = t.domEl.offsetHeight,
					o = r.getOffset(t.domEl).top,
					n = o + i,
					a = t.config.vFactor || 0;
				return o + i * a < r.scrolled + r.getViewportH() && n - i * a > r.scrolled || "fixed" == (t.domEl.currentStyle ? t.domEl.currentStyle : e.getComputedStyle(t.domEl, null)).position
			},
			isMobile: function () {
				var t = navigator.userAgent || navigator.vendor || e.opera;
				return /(ipad|playbook|silk|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4)) ? !0 : !1
			},
			isSupported: function () {
				for (var e = document.createElement("sensor"), t = "Webkit,Moz,O,".split(","), i = ("transition " + t.join("transition,")).split(","), o = 0; o < i.length; o++)
					if ("" === !e.style[i[o]]) return !1;
				return !0
			},
			destroy: function () {
				var e;
				e = Array.prototype.slice.call(r.config.viewport.querySelectorAll("[data-sr]")), e.forEach(function (e) {
					e.removeAttribute("data-sr")
				})
			}
		}, n = function () {
			r.blocked || (r.blocked = !0, r.scrolled = r.scrollY(), i(function () {
				r.animate()
			}))
		}, o = function (e, t) {
			for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
			return e
		}, i = function () {
			return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (t) {
				e.setTimeout(t, 1e3 / 60)
			}
		}(), t
	}(window), scrollReveal
});


// SmoothScroll v1.2.1
// Licensed under the terms of the MIT license.

// People involved
//  - Balazs Galambosi (maintainer)  
//  - Patrick Brunner  (original idea)
//  - Michael Herf     (Pulse Algorithm)
//  - Justin Force     (Resurect)

// Scroll Variables (tweakable)
function init() {
	if (!document.body) return;
	var e = document.body;
	var t = document.documentElement;
	var n = window.innerHeight;
	var r = e.scrollHeight;
	root = document.compatMode.indexOf("CSS") >= 0 ? t : e;
	activeElement = e;
	initdone = true;
	if (top != self) {
		frame = true
	} else if (r > n && (e.offsetHeight <= n || t.offsetHeight <= n)) {
		var i = false;
		var s = function () {
			if (!i && t.scrollHeight != document.height) {
				i = true;
				setTimeout(function () {
					t.style.height = document.height + "px";
					i = false
				}, 500)
			}
		};
		t.style.height = "";
		setTimeout(s, 10);
		addEvent("DOMNodeInserted", s);
		addEvent("DOMNodeRemoved", s);
		if (root.offsetHeight <= n) {
			var o = document.createElement("div");
			o.style.clear = "both";
			e.appendChild(o)
		}
	}
	if (document.URL.indexOf("mail.google.com") > -1) {
		var u = document.createElement("style");
		u.innerHTML = ".iu { visibility: hidden }";
		(document.getElementsByTagName("head")[0] || t).appendChild(u)
	}
	if (!fixedback && !disabled) {
		e.style.backgroundAttachment = "scroll";
		t.style.backgroundAttachment = "scroll"
	}
}

function scrollArray(e, t, n, r) {
	r || (r = 1e3);
	directionCheck(t, n);
	if (acceleration) {
		var i = +(new Date);
		var s = i - lastScroll;
		if (s < accelDelta) {
			var o = (1 + 30 / s) / 2;
			if (o > 1) {
				o = Math.min(o, accelMax);
				t *= o;
				n *= o
			}
		}
		lastScroll = +(new Date)
	}
	que.push({
		x: t,
		y: n,
		lastX: t < 0 ? .99 : -.99,
		lastY: n < 0 ? .99 : -.99,
		start: +(new Date)
	});
	if (pending) {
		return
	}
	var u = e === document.body;
	var a = function () {
		var i = +(new Date);
		var s = 0;
		var o = 0;
		for (var f = 0; f < que.length; f++) {
			var l = que[f];
			var c = i - l.start;
			var h = c >= animtime;
			var p = h ? 1 : c / animtime;
			if (pulseAlgorithm) {
				p = pulse(p)
			}
			var d = l.x * p - l.lastX >> 0;
			var v = l.y * p - l.lastY >> 0;
			s += d;
			o += v;
			l.lastX += d;
			l.lastY += v;
			if (h) {
				que.splice(f, 1);
				f--
			}
		}
		if (u) {
			window.scrollBy(s, o)
		} else {
			if (s) e.scrollLeft += s;
			if (o) e.scrollTop += o
		}
		if (!t && !n) {
			que = []
		}
		if (que.length) {
			requestFrame(a, e, r / framerate + 1)
		} else {
			pending = false
		}
	};
	requestFrame(a, e, 0);
	pending = true
}

function wheel(e) {
	if (!initdone) {
		init()
	}
	var t = e.target;
	var n = overflowingAncestor(t);
	if (!n || e.defaultPrevented || isNodeName(activeElement, "embed") || isNodeName(t, "embed") && /\.pdf/i.test(t.src)) {
		return true
	}
	var r = e.wheelDeltaX || 0;
	var i = e.wheelDeltaY || 0;
	if (!r && !i) {
		i = e.wheelDelta || 0
	}
	if (Math.abs(r) > 1.2) {
		r *= stepsize / 120
	}
	if (Math.abs(i) > 1.2) {
		i *= stepsize / 120
	}
	scrollArray(n, -r, -i);
	e.preventDefault()
}

function keydown(e) {
	var t = e.target;
	var n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== key.spacebar;
	if (/input|textarea|select|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) {
		return true
	}
	if (isNodeName(t, "button") && e.keyCode === key.spacebar) {
		return true
	}
	var r, i = 0,
		s = 0;
	var o = overflowingAncestor(activeElement);
	var u = o.clientHeight;
	if (o == document.body) {
		u = window.innerHeight
	}
	switch (e.keyCode) {
		case key.up:
			s = -arrowscroll;
			break;
		case key.down:
			s = arrowscroll;
			break;
		case key.spacebar:
			r = e.shiftKey ? 1 : -1;
			s = -r * u * .9;
			break;
		case key.pageup:
			s = -u * .9;
			break;
		case key.pagedown:
			s = u * .9;
			break;
		case key.home:
			s = -o.scrollTop;
			break;
		case key.end:
			var a = o.scrollHeight - o.scrollTop - u;
			s = a > 0 ? a + 10 : 0;
			break;
		case key.left:
			i = -arrowscroll;
			break;
		case key.right:
			i = arrowscroll;
			break;
		default:
			return true
	}
	scrollArray(o, i, s);
	e.preventDefault()
}

function mousedown(e) {
	activeElement = e.target
}

function setCache(e, t) {
	for (var n = e.length; n--;) cache[uniqueID(e[n])] = t;
	return t
}

function overflowingAncestor(e) {
	var t = [];
	var n = root.scrollHeight;
	do {
		var r = cache[uniqueID(e)];
		if (r) {
			return setCache(t, r)
		}
		t.push(e);
		if (n === e.scrollHeight) {
			if (!frame || root.clientHeight + 10 < n) {
				return setCache(t, document.body)
			}
		} else if (e.clientHeight + 10 < e.scrollHeight) {
			overflow = getComputedStyle(e, "").getPropertyValue("overflow-y");
			if (overflow === "scroll" || overflow === "auto") {
				return setCache(t, e)
			}
		}
	} while (e = e.parentNode)
}

function addEvent(e, t, n) {
	window.addEventListener(e, t, n || false)
}

function removeEvent(e, t, n) {
	window.removeEventListener(e, t, n || false)
}

function isNodeName(e, t) {
	return (e.nodeName || "").toLowerCase() === t.toLowerCase()
}

function directionCheck(e, t) {
	e = e > 0 ? 1 : -1;
	t = t > 0 ? 1 : -1;
	if (direction.x !== e || direction.y !== t) {
		direction.x = e;
		direction.y = t;
		que = [];
		lastScroll = 0
	}
}

function pulse_(e) {
	var t, n, r;
	e = e * pulseScale;
	if (e < 1) {
		t = e - (1 - Math.exp(-e))
	} else {
		n = Math.exp(-1);
		e -= 1;
		r = 1 - Math.exp(-e);
		t = n + r * (1 - n)
	}
	return t * pulseNormalize
}

function pulse(e) {
	if (e >= 1) return 1;
	if (e <= 0) return 0;
	if (pulseNormalize == 1) {
		pulseNormalize /= pulse_(1)
	}
	return pulse_(e)
}
var framerate = 150;
var animtime = 800;
var stepsize = 80;
var pulseAlgorithm = true;
var pulseScale = 8;
var pulseNormalize = 1;
var acceleration = true;
var accelDelta = 10;
var accelMax = 1;
var keyboardsupport = true;
var disableKeyboard = false;
var arrowscroll = 50;
var exclude = "";
var disabled = false;
var frame = false;
var direction = {
	x: 0,
	y: 0
};
var initdone = false;
var fixedback = true;
var root = document.documentElement;
var activeElement;
var key = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	spacebar: 32,
	pageup: 33,
	pagedown: 34,
	end: 35,
	home: 36
};
var que = [];
var pending = false;
var lastScroll = +(new Date);
var cache = {};
setInterval(function () {
	cache = {}
}, 10 * 1e3);
var uniqueID = function () {
	var e = 0;
	return function (t) {
		return t.uniqueID || (t.uniqueID = e++)
	}
}();
var requestFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (e, t, n) {
		window.setTimeout(e, n || 1e3 / 60)
	}
}();
addEvent("mousedown", mousedown);
addEvent("mousewheel", wheel);
addEvent("load", init);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
	def: "easeOutQuad",
	swing: function (e, f, a, h, g) {
		return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
	},
	easeInQuad: function (e, f, a, h, g) {
		return h * (f /= g) * f + a
	},
	easeOutQuad: function (e, f, a, h, g) {
		return -h * (f /= g) * (f - 2) + a
	},
	easeInOutQuad: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f + a
		}
		return -h / 2 * ((--f) * (f - 2) - 1) + a
	},
	easeInCubic: function (e, f, a, h, g) {
		return h * (f /= g) * f * f + a
	},
	easeOutCubic: function (e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f + 1) + a
	},
	easeInOutCubic: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f + a
		}
		return h / 2 * ((f -= 2) * f * f + 2) + a
	},
	easeInQuart: function (e, f, a, h, g) {
		return h * (f /= g) * f * f * f + a
	},
	easeOutQuart: function (e, f, a, h, g) {
		return -h * ((f = f / g - 1) * f * f * f - 1) + a
	},
	easeInOutQuart: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f + a
		}
		return -h / 2 * ((f -= 2) * f * f * f - 2) + a
	},
	easeInQuint: function (e, f, a, h, g) {
		return h * (f /= g) * f * f * f * f + a
	},
	easeOutQuint: function (e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f * f * f + 1) + a
	},
	easeInOutQuint: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f * f + a
		}
		return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
	},
	easeInSine: function (e, f, a, h, g) {
		return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
	},
	easeOutSine: function (e, f, a, h, g) {
		return h * Math.sin(f / g * (Math.PI / 2)) + a
	},
	easeInOutSine: function (e, f, a, h, g) {
		return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
	},
	easeInExpo: function (e, f, a, h, g) {
		return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
	},
	easeOutExpo: function (e, f, a, h, g) {
		return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
	},
	easeInOutExpo: function (e, f, a, h, g) {
		if (f == 0) {
			return a
		}
		if (f == g) {
			return a + h
		}
		if ((f /= g / 2) < 1) {
			return h / 2 * Math.pow(2, 10 * (f - 1)) + a
		}
		return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
	},
	easeInCirc: function (e, f, a, h, g) {
		return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
	},
	easeOutCirc: function (e, f, a, h, g) {
		return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
	},
	easeInOutCirc: function (e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
		}
		return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
	},
	easeInElastic: function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k) == 1) {
			return e + l
		}
		if (!j) {
			j = k * 0.3
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
	},
	easeOutElastic: function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k) == 1) {
			return e + l
		}
		if (!j) {
			j = k * 0.3
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
	},
	easeInOutElastic: function (f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e
		}
		if ((h /= k / 2) == 2) {
			return e + l
		}
		if (!j) {
			j = k * (0.3 * 1.5)
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g)
		}
		if (h < 1) {
			return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
		}
		return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
	},
	easeInBack: function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		return i * (f /= h) * f * ((g + 1) * f - g) + a
	},
	easeOutBack: function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
	},
	easeInOutBack: function (e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158
		}
		if ((f /= h / 2) < 1) {
			return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
		}
		return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
	},
	easeInBounce: function (e, f, a, h, g) {
		return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
	},
	easeOutBounce: function (e, f, a, h, g) {
		if ((f /= g) < (1 / 2.75)) {
			return h * (7.5625 * f * f) + a
		} else {
			if (f < (2 / 2.75)) {
				return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
			} else {
				if (f < (2.5 / 2.75)) {
					return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
				} else {
					return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
				}
			}
		}
	},
	easeInOutBounce: function (e, f, a, h, g) {
		if (f < g / 2) {
			return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
		}
		return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
	}
});

/*!
 * Isotope PACKAGED v2.0.1
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function (t) {
	function e() {}

	function i(t) {
		function i(e) {
			e.prototype.option || (e.prototype.option = function (e) {
				t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
			})
		}

		function n(e, i) {
			t.fn[e] = function (n) {
				if ("string" == typeof n) {
					for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
						var p = this[a],
							h = t.data(p, e);
						if (h)
							if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
								var f = h[n].apply(h, s);
								if (void 0 !== f) return f
							} else r("no such method '" + n + "' for " + e + " instance");
						else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
					}
					return this
				}
				return this.each(function () {
					var o = t.data(this, e);
					o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
				})
			}
		}
		if (t) {
			var r = "undefined" == typeof console ? e : function (t) {
				console.error(t)
			};
			return t.bridget = function (t, e) {
				i(e), n(t, e)
			}, t.bridget
		}
	}
	var o = Array.prototype.slice;
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery)
})(window),
function (t) {
	function e(e) {
		var i = t.event;
		return i.target = i.target || i.srcElement || e, i
	}
	var i = document.documentElement,
		o = function () {};
	i.addEventListener ? o = function (t, e, i) {
		t.addEventListener(e, i, !1)
	} : i.attachEvent && (o = function (t, i, o) {
		t[i + o] = o.handleEvent ? function () {
			var i = e(t);
			o.handleEvent.call(o, i)
		} : function () {
			var i = e(t);
			o.call(t, i)
		}, t.attachEvent("on" + i, t[i + o])
	});
	var n = function () {};
	i.removeEventListener ? n = function (t, e, i) {
		t.removeEventListener(e, i, !1)
	} : i.detachEvent && (n = function (t, e, i) {
		t.detachEvent("on" + e, t[e + i]);
		try {
			delete t[e + i]
		} catch (o) {
			t[e + i] = void 0
		}
	});
	var r = {
		bind: o,
		unbind: n
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function (t) {
	function e(t) {
		"function" == typeof t && (e.isReady ? t() : r.push(t))
	}

	function i(t) {
		var i = "readystatechange" === t.type && "complete" !== n.readyState;
		if (!e.isReady && !i) {
			e.isReady = !0;
			for (var o = 0, s = r.length; s > o; o++) {
				var a = r[o];
				a()
			}
		}
	}

	function o(o) {
		return o.bind(n, "DOMContentLoaded", i), o.bind(n, "readystatechange", i), o.bind(t, "load", i), e
	}
	var n = t.document,
		r = [];
	e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], o)) : t.docReady = o(t.eventie)
}(this),
function () {
	function t() {}

	function e(t, e) {
		for (var i = t.length; i--;)
			if (t[i].listener === e) return i;
		return -1
	}

	function i(t) {
		return function () {
			return this[t].apply(this, arguments)
		}
	}
	var o = t.prototype,
		n = this,
		r = n.EventEmitter;
	o.getListeners = function (t) {
		var e, i, o = this._getEvents();
		if (t instanceof RegExp) {
			e = {};
			for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
		} else e = o[t] || (o[t] = []);
		return e
	}, o.flattenListeners = function (t) {
		var e, i = [];
		for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
		return i
	}, o.getListenersAsObject = function (t) {
		var e, i = this.getListeners(t);
		return i instanceof Array && (e = {}, e[t] = i), e || i
	}, o.addListener = function (t, i) {
		var o, n = this.getListenersAsObject(t),
			r = "object" == typeof i;
		for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
			listener: i,
			once: !1
		});
		return this
	}, o.on = i("addListener"), o.addOnceListener = function (t, e) {
		return this.addListener(t, {
			listener: e,
			once: !0
		})
	}, o.once = i("addOnceListener"), o.defineEvent = function (t) {
		return this.getListeners(t), this
	}, o.defineEvents = function (t) {
		for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
		return this
	}, o.removeListener = function (t, i) {
		var o, n, r = this.getListenersAsObject(t);
		for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
		return this
	}, o.off = i("removeListener"), o.addListeners = function (t, e) {
		return this.manipulateListeners(!1, t, e)
	}, o.removeListeners = function (t, e) {
		return this.manipulateListeners(!0, t, e)
	}, o.manipulateListeners = function (t, e, i) {
		var o, n, r = t ? this.removeListener : this.addListener,
			s = t ? this.removeListeners : this.addListeners;
		if ("object" != typeof e || e instanceof RegExp)
			for (o = i.length; o--;) r.call(this, e, i[o]);
		else
			for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
		return this
	}, o.removeEvent = function (t) {
		var e, i = typeof t,
			o = this._getEvents();
		if ("string" === i) delete o[t];
		else if (t instanceof RegExp)
			for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
		else delete this._events;
		return this
	}, o.removeAllListeners = i("removeEvent"), o.emitEvent = function (t, e) {
		var i, o, n, r, s = this.getListenersAsObject(t);
		for (n in s)
			if (s.hasOwnProperty(n))
				for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
		return this
	}, o.trigger = i("emitEvent"), o.emit = function (t) {
		var e = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(t, e)
	}, o.setOnceReturnValue = function (t) {
		return this._onceReturnValue = t, this
	}, o._getOnceReturnValue = function () {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, o._getEvents = function () {
		return this._events || (this._events = {})
	}, t.noConflict = function () {
		return n.EventEmitter = r, t
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
		return t
	}) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
	function (t) {
		function e(t) {
			if (t) {
				if ("string" == typeof o[t]) return t;
				t = t.charAt(0).toUpperCase() + t.slice(1);
				for (var e, n = 0, r = i.length; r > n; n++)
					if (e = i[n] + t, "string" == typeof o[e]) return e
			}
		}
		var i = "Webkit Moz ms Ms O".split(" "),
			o = document.documentElement.style;
		"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
			return e
		}) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
	}(window),
	function (t) {
		function e(t) {
			var e = parseFloat(t),
				i = -1 === t.indexOf("%") && !isNaN(e);
			return i && e
		}

		function i() {
			for (var t = {
					width: 0,
					height: 0,
					innerWidth: 0,
					innerHeight: 0,
					outerWidth: 0,
					outerHeight: 0
				}, e = 0, i = s.length; i > e; e++) {
				var o = s[e];
				t[o] = 0
			}
			return t
		}

		function o(t) {
			function o(t) {
				if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
					var o = r(t);
					if ("none" === o.display) return i();
					var n = {};
					n.width = t.offsetWidth, n.height = t.offsetHeight;
					for (var h = n.isBorderBox = !(!p || !o[p] || "border-box" !== o[p]), f = 0, d = s.length; d > f; f++) {
						var l = s[f],
							c = o[l];
						c = a(t, c);
						var y = parseFloat(c);
						n[l] = isNaN(y) ? 0 : y
					}
					var m = n.paddingLeft + n.paddingRight,
						g = n.paddingTop + n.paddingBottom,
						v = n.marginLeft + n.marginRight,
						_ = n.marginTop + n.marginBottom,
						I = n.borderLeftWidth + n.borderRightWidth,
						L = n.borderTopWidth + n.borderBottomWidth,
						z = h && u,
						S = e(o.width);
					S !== !1 && (n.width = S + (z ? 0 : m + I));
					var b = e(o.height);
					return b !== !1 && (n.height = b + (z ? 0 : g + L)), n.innerWidth = n.width - (m + I), n.innerHeight = n.height - (g + L), n.outerWidth = n.width + v, n.outerHeight = n.height + _, n
				}
			}

			function a(t, e) {
				if (n || -1 === e.indexOf("%")) return e;
				var i = t.style,
					o = i.left,
					r = t.runtimeStyle,
					s = r && r.left;
				return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = o, s && (r.left = s), e
			}
			var u, p = t("boxSizing");
			return function () {
				if (p) {
					var t = document.createElement("div");
					t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[p] = "border-box";
					var i = document.body || document.documentElement;
					i.appendChild(t);
					var o = r(t);
					u = 200 === e(o.width), i.removeChild(t)
				}
			}(), o
		}
		var n = t.getComputedStyle,
			r = n ? function (t) {
				return n(t, null)
			} : function (t) {
				return t.currentStyle
			},
			s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
		"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("get-style-property")) : t.getSize = o(t.getStyleProperty)
	}(window),
	function (t, e) {
		function i(t, e) {
			return t[a](e)
		}

		function o(t) {
			if (!t.parentNode) {
				var e = document.createDocumentFragment();
				e.appendChild(t)
			}
		}

		function n(t, e) {
			o(t);
			for (var i = t.parentNode.querySelectorAll(e), n = 0, r = i.length; r > n; n++)
				if (i[n] === t) return !0;
			return !1
		}

		function r(t, e) {
			return o(t), i(t, e)
		}
		var s, a = function () {
			if (e.matchesSelector) return "matchesSelector";
			for (var t = ["webkit", "moz", "ms", "o"], i = 0, o = t.length; o > i; i++) {
				var n = t[i],
					r = n + "MatchesSelector";
				if (e[r]) return r
			}
		}();
		if (a) {
			var u = document.createElement("div"),
				p = i(u, "div");
			s = p ? i : r
		} else s = n;
		"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
			return s
		}) : window.matchesSelector = s
	}(this, Element.prototype),
	function (t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t) {
			for (var e in t) return !1;
			return e = null, !0
		}

		function o(t) {
			return t.replace(/([A-Z])/g, function (t) {
				return "-" + t.toLowerCase()
			})
		}

		function n(t, n, r) {
			function a(t, e) {
				t && (this.element = t, this.layout = e, this.position = {
					x: 0,
					y: 0
				}, this._create())
			}
			var u = r("transition"),
				p = r("transform"),
				h = u && p,
				f = !!r("perspective"),
				d = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "otransitionend",
					transition: "transitionend"
				}[u],
				l = ["transform", "transition", "transitionDuration", "transitionProperty"],
				c = function () {
					for (var t = {}, e = 0, i = l.length; i > e; e++) {
						var o = l[e],
							n = r(o);
						n && n !== o && (t[o] = n)
					}
					return t
				}();
			e(a.prototype, t.prototype), a.prototype._create = function () {
				this._transn = {
					ingProperties: {},
					clean: {},
					onEnd: {}
				}, this.css({
					position: "absolute"
				})
			}, a.prototype.handleEvent = function (t) {
				var e = "on" + t.type;
				this[e] && this[e](t)
			}, a.prototype.getSize = function () {
				this.size = n(this.element)
			}, a.prototype.css = function (t) {
				var e = this.element.style;
				for (var i in t) {
					var o = c[i] || i;
					e[o] = t[i]
				}
			}, a.prototype.getPosition = function () {
				var t = s(this.element),
					e = this.layout.options,
					i = e.isOriginLeft,
					o = e.isOriginTop,
					n = parseInt(t[i ? "left" : "right"], 10),
					r = parseInt(t[o ? "top" : "bottom"], 10);
				n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
				var a = this.layout.size;
				n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
			}, a.prototype.layoutPosition = function () {
				var t = this.layout.size,
					e = this.layout.options,
					i = {};
				e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
			};
			var y = f ? function (t, e) {
				return "translate3d(" + t + "px, " + e + "px, 0)"
			} : function (t, e) {
				return "translate(" + t + "px, " + e + "px)"
			};
			a.prototype._transitionTo = function (t, e) {
				this.getPosition();
				var i = this.position.x,
					o = this.position.y,
					n = parseInt(t, 10),
					r = parseInt(e, 10),
					s = n === this.position.x && r === this.position.y;
				if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
				var a = t - i,
					u = e - o,
					p = {},
					h = this.layout.options;
				a = h.isOriginLeft ? a : -a, u = h.isOriginTop ? u : -u, p.transform = y(a, u), this.transition({
					to: p,
					onTransitionEnd: {
						transform: this.layoutPosition
					},
					isCleaning: !0
				})
			}, a.prototype.goTo = function (t, e) {
				this.setPosition(t, e), this.layoutPosition()
			}, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e) {
				this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
			}, a.prototype._nonTransition = function (t) {
				this.css(t.to), t.isCleaning && this._removeStyles(t.to);
				for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
			}, a.prototype._transition = function (t) {
				if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
				var e = this._transn;
				for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
				for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
				if (t.from) {
					this.css(t.from);
					var o = this.element.offsetHeight;
					o = null
				}
				this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
			};
			var m = p && o(p) + ",opacity";
			a.prototype.enableTransition = function () {
				this.isTransitioning || (this.css({
					transitionProperty: m,
					transitionDuration: this.layout.options.transitionDuration
				}), this.element.addEventListener(d, this, !1))
			}, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t) {
				this.ontransitionend(t)
			}, a.prototype.onotransitionend = function (t) {
				this.ontransitionend(t)
			};
			var g = {
				"-webkit-transform": "transform",
				"-moz-transform": "transform",
				"-o-transform": "transform"
			};
			a.prototype.ontransitionend = function (t) {
				if (t.target === this.element) {
					var e = this._transn,
						o = g[t.propertyName] || t.propertyName;
					if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
						var n = e.onEnd[o];
						n.call(this), delete e.onEnd[o]
					}
					this.emitEvent("transitionEnd", [this])
				}
			}, a.prototype.disableTransition = function () {
				this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
			}, a.prototype._removeStyles = function (t) {
				var e = {};
				for (var i in t) e[i] = "";
				this.css(e)
			};
			var v = {
				transitionProperty: "",
				transitionDuration: ""
			};
			return a.prototype.removeTransitionStyles = function () {
				this.css(v)
			}, a.prototype.removeElem = function () {
				this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
			}, a.prototype.remove = function () {
				if (!u || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
				var t = this;
				this.on("transitionEnd", function () {
					return t.removeElem(), !0
				}), this.hide()
			}, a.prototype.reveal = function () {
				delete this.isHidden, this.css({
					display: ""
				});
				var t = this.layout.options;
				this.transition({
					from: t.hiddenStyle,
					to: t.visibleStyle,
					isCleaning: !0
				})
			}, a.prototype.hide = function () {
				this.isHidden = !0, this.css({
					display: ""
				});
				var t = this.layout.options;
				this.transition({
					from: t.visibleStyle,
					to: t.hiddenStyle,
					isCleaning: !0,
					onTransitionEnd: {
						opacity: function () {
							this.isHidden && this.css({
								display: "none"
							})
						}
					}
				})
			}, a.prototype.destroy = function () {
				this.css({
					position: "",
					left: "",
					right: "",
					top: "",
					bottom: "",
					transition: "",
					transform: ""
				})
			}, a
		}
		var r = t.getComputedStyle,
			s = r ? function (t) {
				return r(t, null)
			} : function (t) {
				return t.currentStyle
			};
		"function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
	}(window),
	function (t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t) {
			return "[object Array]" === f.call(t)
		}

		function o(t) {
			var e = [];
			if (i(t)) e = t;
			else if (t && "number" == typeof t.length)
				for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
			else e.push(t);
			return e
		}

		function n(t, e) {
			var i = l(e, t); - 1 !== i && e.splice(i, 1)
		}

		function r(t) {
			return t.replace(/(.)([A-Z])/g, function (t, e, i) {
				return e + "-" + i
			}).toLowerCase()
		}

		function s(i, s, f, l, c, y) {
			function m(t, i) {
				if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)) return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
				this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
				var o = ++g;
				this.element.outlayerGUID = o, v[o] = this, this._create(), this.options.isInitLayout && this.layout()
			}
			var g = 0,
				v = {};
			return m.namespace = "outlayer", m.Item = y, m.defaults = {
				containerStyle: {
					position: "relative"
				},
				isInitLayout: !0,
				isOriginLeft: !0,
				isOriginTop: !0,
				isResizeBound: !0,
				isResizingContainer: !0,
				transitionDuration: "0.4s",
				hiddenStyle: {
					opacity: 0,
					transform: "scale(0.001)"
				},
				visibleStyle: {
					opacity: 1,
					transform: "scale(1)"
				}
			}, e(m.prototype, f.prototype), m.prototype.option = function (t) {
				e(this.options, t)
			}, m.prototype._create = function () {
				this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
			}, m.prototype.reloadItems = function () {
				this.items = this._itemize(this.element.children)
			}, m.prototype._itemize = function (t) {
				for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
					var s = e[n],
						a = new i(s, this);
					o.push(a)
				}
				return o
			}, m.prototype._filterFindItemElements = function (t) {
				t = o(t);
				for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
					var s = t[n];
					if (d(s))
						if (e) {
							c(s, e) && i.push(s);
							for (var a = s.querySelectorAll(e), u = 0, p = a.length; p > u; u++) i.push(a[u])
						} else i.push(s)
				}
				return i
			}, m.prototype.getItemElements = function () {
				for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
				return t
			}, m.prototype.layout = function () {
				this._resetLayout(), this._manageStamps();
				var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
				this.layoutItems(this.items, t), this._isLayoutInited = !0
			}, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function () {
				this.getSize()
			}, m.prototype.getSize = function () {
				this.size = l(this.element)
			}, m.prototype._getMeasurement = function (t, e) {
				var i, o = this.options[t];
				o ? ("string" == typeof o ? i = this.element.querySelector(o) : d(o) && (i = o), this[t] = i ? l(i)[e] : o) : this[t] = 0
			}, m.prototype.layoutItems = function (t, e) {
				t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
			}, m.prototype._getItemsForLayout = function (t) {
				for (var e = [], i = 0, o = t.length; o > i; i++) {
					var n = t[i];
					n.isIgnored || e.push(n)
				}
				return e
			}, m.prototype._layoutItems = function (t, e) {
				function i() {
					o.emitEvent("layoutComplete", [o, t])
				}
				var o = this;
				if (!t || !t.length) return i(), void 0;
				this._itemsOn(t, "layout", i);
				for (var n = [], r = 0, s = t.length; s > r; r++) {
					var a = t[r],
						u = this._getItemLayoutPosition(a);
					u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
				}
				this._processLayoutQueue(n)
			}, m.prototype._getItemLayoutPosition = function () {
				return {
					x: 0,
					y: 0
				}
			}, m.prototype._processLayoutQueue = function (t) {
				for (var e = 0, i = t.length; i > e; e++) {
					var o = t[e];
					this._positionItem(o.item, o.x, o.y, o.isInstant)
				}
			}, m.prototype._positionItem = function (t, e, i, o) {
				o ? t.goTo(e, i) : t.moveTo(e, i)
			}, m.prototype._postLayout = function () {
				this.resizeContainer()
			}, m.prototype.resizeContainer = function () {
				if (this.options.isResizingContainer) {
					var t = this._getContainerSize();
					t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
				}
			}, m.prototype._getContainerSize = h, m.prototype._setContainerMeasure = function (t, e) {
				if (void 0 !== t) {
					var i = this.size;
					i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
				}
			}, m.prototype._itemsOn = function (t, e, i) {
				function o() {
					return n++, n === r && i.call(s), !0
				}
				for (var n = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
					var p = t[a];
					p.on(e, o)
				}
			}, m.prototype.ignore = function (t) {
				var e = this.getItem(t);
				e && (e.isIgnored = !0)
			}, m.prototype.unignore = function (t) {
				var e = this.getItem(t);
				e && delete e.isIgnored
			}, m.prototype.stamp = function (t) {
				if (t = this._find(t)) {
					this.stamps = this.stamps.concat(t);
					for (var e = 0, i = t.length; i > e; e++) {
						var o = t[e];
						this.ignore(o)
					}
				}
			}, m.prototype.unstamp = function (t) {
				if (t = this._find(t))
					for (var e = 0, i = t.length; i > e; e++) {
						var o = t[e];
						n(o, this.stamps), this.unignore(o)
					}
			}, m.prototype._find = function (t) {
				return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0
			}, m.prototype._manageStamps = function () {
				if (this.stamps && this.stamps.length) {
					this._getBoundingRect();
					for (var t = 0, e = this.stamps.length; e > t; t++) {
						var i = this.stamps[t];
						this._manageStamp(i)
					}
				}
			}, m.prototype._getBoundingRect = function () {
				var t = this.element.getBoundingClientRect(),
					e = this.size;
				this._boundingRect = {
					left: t.left + e.paddingLeft + e.borderLeftWidth,
					top: t.top + e.paddingTop + e.borderTopWidth,
					right: t.right - (e.paddingRight + e.borderRightWidth),
					bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
				}
			}, m.prototype._manageStamp = h, m.prototype._getElementOffset = function (t) {
				var e = t.getBoundingClientRect(),
					i = this._boundingRect,
					o = l(t),
					n = {
						left: e.left - i.left - o.marginLeft,
						top: e.top - i.top - o.marginTop,
						right: i.right - e.right - o.marginRight,
						bottom: i.bottom - e.bottom - o.marginBottom
					};
				return n
			}, m.prototype.handleEvent = function (t) {
				var e = "on" + t.type;
				this[e] && this[e](t)
			}, m.prototype.bindResize = function () {
				this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
			}, m.prototype.unbindResize = function () {
				this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
			}, m.prototype.onresize = function () {
				function t() {
					e.resize(), delete e.resizeTimeout
				}
				this.resizeTimeout && clearTimeout(this.resizeTimeout);
				var e = this;
				this.resizeTimeout = setTimeout(t, 100)
			}, m.prototype.resize = function () {
				this.isResizeBound && this.needsResizeLayout() && this.layout()
			}, m.prototype.needsResizeLayout = function () {
				var t = l(this.element),
					e = this.size && t;
				return e && t.innerWidth !== this.size.innerWidth
			}, m.prototype.addItems = function (t) {
				var e = this._itemize(t);
				return e.length && (this.items = this.items.concat(e)), e
			}, m.prototype.appended = function (t) {
				var e = this.addItems(t);
				e.length && (this.layoutItems(e, !0), this.reveal(e))
			}, m.prototype.prepended = function (t) {
				var e = this._itemize(t);
				if (e.length) {
					var i = this.items.slice(0);
					this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
				}
			}, m.prototype.reveal = function (t) {
				var e = t && t.length;
				if (e)
					for (var i = 0; e > i; i++) {
						var o = t[i];
						o.reveal()
					}
			}, m.prototype.hide = function (t) {
				var e = t && t.length;
				if (e)
					for (var i = 0; e > i; i++) {
						var o = t[i];
						o.hide()
					}
			}, m.prototype.getItem = function (t) {
				for (var e = 0, i = this.items.length; i > e; e++) {
					var o = this.items[e];
					if (o.element === t) return o
				}
			}, m.prototype.getItems = function (t) {
				if (t && t.length) {
					for (var e = [], i = 0, o = t.length; o > i; i++) {
						var n = t[i],
							r = this.getItem(n);
						r && e.push(r)
					}
					return e
				}
			}, m.prototype.remove = function (t) {
				t = o(t);
				var e = this.getItems(t);
				if (e && e.length) {
					this._itemsOn(e, "remove", function () {
						this.emitEvent("removeComplete", [this, e])
					});
					for (var i = 0, r = e.length; r > i; i++) {
						var s = e[i];
						s.remove(), n(s, this.items)
					}
				}
			}, m.prototype.destroy = function () {
				var t = this.element.style;
				t.height = "", t.position = "", t.width = "";
				for (var e = 0, i = this.items.length; i > e; e++) {
					var o = this.items[e];
					o.destroy()
				}
				this.unbindResize(), delete this.element.outlayerGUID, p && p.removeData(this.element, this.constructor.namespace)
			}, m.data = function (t) {
				var e = t && t.outlayerGUID;
				return e && v[e]
			}, m.create = function (t, i) {
				function o() {
					m.apply(this, arguments)
				}
				return Object.create ? o.prototype = Object.create(m.prototype) : e(o.prototype, m.prototype), o.prototype.constructor = o, o.defaults = e({}, m.defaults), e(o.defaults, i), o.prototype.settings = {}, o.namespace = t, o.data = m.data, o.Item = function () {
					y.apply(this, arguments)
				}, o.Item.prototype = new y, s(function () {
					for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, h = i.length; h > s; s++) {
						var f, d = i[s],
							l = d.getAttribute(n);
						try {
							f = l && JSON.parse(l)
						} catch (c) {
							u && u.error("Error parsing " + n + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + c);
							continue
						}
						var y = new o(d, f);
						p && p.data(d, t, y)
					}
				}), p && p.bridget && p.bridget(t, o), o
			}, m.Item = y, m
		}
		var a = t.document,
			u = t.console,
			p = t.jQuery,
			h = function () {},
			f = Object.prototype.toString,
			d = "object" == typeof HTMLElement ? function (t) {
				return t instanceof HTMLElement
			} : function (t) {
				return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
			},
			l = Array.prototype.indexOf ? function (t, e) {
				return t.indexOf(e)
			} : function (t, e) {
				for (var i = 0, o = t.length; o > i; i++)
					if (t[i] === e) return i;
				return -1
			};
		"function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
	}(window),
	function (t) {
		function e(t) {
			function e() {
				t.Item.apply(this, arguments)
			}
			e.prototype = new t.Item, e.prototype._create = function () {
				this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
			}, e.prototype.updateSortData = function () {
				if (!this.isIgnored) {
					this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
					var t = this.layout.options.getSortData,
						e = this.layout._sorters;
					for (var i in t) {
						var o = e[i];
						this.sortData[i] = o(this.element, this)
					}
				}
			};
			var i = e.prototype.destroy;
			return e.prototype.destroy = function () {
				i.apply(this, arguments), this.css({
					display: ""
				})
			}, e
		}
		"function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
	}(window),
	function (t) {
		function e(t, e) {
			function i(t) {
				this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
			}
			return function () {
				function t(t) {
					return function () {
						return e.prototype[t].apply(this.isotope, arguments)
					}
				}
				for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
					var s = o[n];
					i.prototype[s] = t(s)
				}
			}(), i.prototype.needsVerticalResizeLayout = function () {
				var e = t(this.isotope.element),
					i = this.isotope.size && e;
				return i && e.innerHeight !== this.isotope.size.innerHeight
			}, i.prototype._getMeasurement = function () {
				this.isotope._getMeasurement.apply(this, arguments)
			}, i.prototype.getColumnWidth = function () {
				this.getSegmentSize("column", "Width")
			}, i.prototype.getRowHeight = function () {
				this.getSegmentSize("row", "Height")
			}, i.prototype.getSegmentSize = function (t, e) {
				var i = t + e,
					o = "outer" + e;
				if (this._getMeasurement(i, o), !this[i]) {
					var n = this.getFirstItemSize();
					this[i] = n && n[o] || this.isotope.size["inner" + e]
				}
			}, i.prototype.getFirstItemSize = function () {
				var e = this.isotope.filteredItems[0];
				return e && e.element && t(e.element)
			}, i.prototype.layout = function () {
				this.isotope.layout.apply(this.isotope, arguments)
			}, i.prototype.getSize = function () {
				this.isotope.getSize(), this.size = this.isotope.size
			}, i.modes = {}, i.create = function (t, e) {
				function o() {
					i.apply(this, arguments)
				}
				return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
			}, i
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
	}(window),
	function (t) {
		function e(t, e) {
			var o = t.create("masonry");
			return o.prototype._resetLayout = function () {
				this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
				var t = this.cols;
				for (this.colYs = []; t--;) this.colYs.push(0);
				this.maxY = 0
			}, o.prototype.measureColumns = function () {
				if (this.getContainerWidth(), !this.columnWidth) {
					var t = this.items[0],
						i = t && t.element;
					this.columnWidth = i && e(i).outerWidth || this.containerWidth
				}
				this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
			}, o.prototype.getContainerWidth = function () {
				var t = this.options.isFitWidth ? this.element.parentNode : this.element,
					i = e(t);
				this.containerWidth = i && i.innerWidth
			}, o.prototype._getItemLayoutPosition = function (t) {
				t.getSize();
				var e = t.size.outerWidth % this.columnWidth,
					o = e && 1 > e ? "round" : "ceil",
					n = Math[o](t.size.outerWidth / this.columnWidth);
				n = Math.min(n, this.cols);
				for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), u = {
						x: this.columnWidth * a,
						y: s
					}, p = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = p;
				return u
			}, o.prototype._getColGroup = function (t) {
				if (2 > t) return this.colYs;
				for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
					var n = this.colYs.slice(o, o + t);
					e[o] = Math.max.apply(Math, n)
				}
				return e
			}, o.prototype._manageStamp = function (t) {
				var i = e(t),
					o = this._getElementOffset(t),
					n = this.options.isOriginLeft ? o.left : o.right,
					r = n + i.outerWidth,
					s = Math.floor(n / this.columnWidth);
				s = Math.max(0, s);
				var a = Math.floor(r / this.columnWidth);
				a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
				for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(u, this.colYs[p])
			}, o.prototype._getContainerSize = function () {
				this.maxY = Math.max.apply(Math, this.colYs);
				var t = {
					height: this.maxY
				};
				return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
			}, o.prototype._getContainerFitWidth = function () {
				for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
				return (this.cols - t) * this.columnWidth - this.gutter
			}, o.prototype.needsResizeLayout = function () {
				var t = this.containerWidth;
				return this.getContainerWidth(), t !== this.containerWidth
			}, o
		}
		var i = Array.prototype.indexOf ? function (t, e) {
			return t.indexOf(e)
		} : function (t, e) {
			for (var i = 0, o = t.length; o > i; i++) {
				var n = t[i];
				if (n === e) return i
			}
			return -1
		};
		"function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
	}(window),
	function (t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t, i) {
			var o = t.create("masonry"),
				n = o.prototype._getElementOffset,
				r = o.prototype.layout,
				s = o.prototype._getMeasurement;
			e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
			var a = o.prototype.measureColumns;
			o.prototype.measureColumns = function () {
				this.items = this.isotope.filteredItems, a.call(this)
			};
			var u = o.prototype._manageStamp;
			return o.prototype._manageStamp = function () {
				this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
			}, o
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : i(t.Isotope.LayoutMode, t.Masonry)
	}(window),
	function (t) {
		function e(t) {
			var e = t.create("fitRows");
			return e.prototype._resetLayout = function () {
				this.x = 0, this.y = 0, this.maxY = 0
			}, e.prototype._getItemLayoutPosition = function (t) {
				t.getSize(), 0 !== this.x && t.size.outerWidth + this.x > this.isotope.size.innerWidth && (this.x = 0, this.y = this.maxY);
				var e = {
					x: this.x,
					y: this.y
				};
				return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += t.size.outerWidth, e
			}, e.prototype._getContainerSize = function () {
				return {
					height: this.maxY
				}
			}, e
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
	}(window),
	function (t) {
		function e(t) {
			var e = t.create("vertical", {
				horizontalAlignment: 0
			});
			return e.prototype._resetLayout = function () {
				this.y = 0
			}, e.prototype._getItemLayoutPosition = function (t) {
				t.getSize();
				var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
					i = this.y;
				return this.y += t.size.outerHeight, {
					x: e,
					y: i
				}
			}, e.prototype._getContainerSize = function () {
				return {
					height: this.y
				}
			}, e
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
	}(window),
	function (t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t) {
			return "[object Array]" === h.call(t)
		}

		function o(t) {
			var e = [];
			if (i(t)) e = t;
			else if (t && "number" == typeof t.length)
				for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
			else e.push(t);
			return e
		}

		function n(t, e) {
			var i = f(e, t); - 1 !== i && e.splice(i, 1)
		}

		function r(t, i, r, u, h) {
			function f(t, e) {
				return function (i, o) {
					for (var n = 0, r = t.length; r > n; n++) {
						var s = t[n],
							a = i.sortData[s],
							u = o.sortData[s];
						if (a > u || u > a) {
							var p = void 0 !== e[s] ? e[s] : e,
								h = p ? 1 : -1;
							return (a > u ? 1 : -1) * h
						}
					}
					return 0
				}
			}
			var d = t.create("isotope", {
				layoutMode: "masonry",
				isJQueryFiltering: !0,
				sortAscending: !0
			});
			d.Item = u, d.LayoutMode = h, d.prototype._create = function () {
				this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
				for (var e in h.modes) this._initLayoutMode(e)
			}, d.prototype.reloadItems = function () {
				this.itemGUID = 0, t.prototype.reloadItems.call(this)
			}, d.prototype._itemize = function () {
				for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
					var n = e[i];
					n.id = this.itemGUID++
				}
				return this._updateItemsSortData(e), e
			}, d.prototype._initLayoutMode = function (t) {
				var i = h.modes[t],
					o = this.options[t] || {};
				this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
			}, d.prototype.layout = function () {
				return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
			}, d.prototype._layout = function () {
				var t = this._getIsInstant();
				this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
			}, d.prototype.arrange = function (t) {
				this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
			}, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function () {
				var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
				return this._isInstant = t, t
			}, d.prototype._filter = function (t) {
				function e() {
					f.reveal(n), f.hide(r)
				}
				var i = this.options.filter;
				i = i || "*";
				for (var o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, u = t.length; u > a; a++) {
					var p = t[a];
					if (!p.isIgnored) {
						var h = s(p);
						h && o.push(p), h && p.isHidden ? n.push(p) : h || p.isHidden || r.push(p)
					}
				}
				var f = this;
				return this._isInstant ? this._noTransition(e) : e(), o
			}, d.prototype._getFilterTest = function (t) {
				return s && this.options.isJQueryFiltering ? function (e) {
					return s(e.element).is(t)
				} : "function" == typeof t ? function (e) {
					return t(e.element)
				} : function (e) {
					return r(e.element, t)
				}
			}, d.prototype.updateSortData = function (t) {
				this._getSorters(), t = o(t);
				var e = this.getItems(t);
				e = e.length ? e : this.items, this._updateItemsSortData(e)
			}, d.prototype._getSorters = function () {
				var t = this.options.getSortData;
				for (var e in t) {
					var i = t[e];
					this._sorters[e] = l(i)
				}
			}, d.prototype._updateItemsSortData = function (t) {
				for (var e = 0, i = t.length; i > e; e++) {
					var o = t[e];
					o.updateSortData()
				}
			};
			var l = function () {
				function t(t) {
					if ("string" != typeof t) return t;
					var i = a(t).split(" "),
						o = i[0],
						n = o.match(/^\[(.+)\]$/),
						r = n && n[1],
						s = e(r, o),
						u = d.sortDataParsers[i[1]];
					return t = u ? function (t) {
						return t && u(s(t))
					} : function (t) {
						return t && s(t)
					}
				}

				function e(t, e) {
					var i;
					return i = t ? function (e) {
						return e.getAttribute(t)
					} : function (t) {
						var i = t.querySelector(e);
						return i && p(i)
					}
				}
				return t
			}();
			d.sortDataParsers = {
				parseInt: function (t) {
					return parseInt(t, 10)
				},
				parseFloat: function (t) {
					return parseFloat(t)
				}
			}, d.prototype._sort = function () {
				var t = this.options.sortBy;
				if (t) {
					var e = [].concat.apply(t, this.sortHistory),
						i = f(e, this.options.sortAscending);
					this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
				}
			}, d.prototype._mode = function () {
				var t = this.options.layoutMode,
					e = this.modes[t];
				if (!e) throw Error("No layout mode: " + t);
				return e.options = this.options[t], e
			}, d.prototype._resetLayout = function () {
				t.prototype._resetLayout.call(this), this._mode()._resetLayout()
			}, d.prototype._getItemLayoutPosition = function (t) {
				return this._mode()._getItemLayoutPosition(t)
			}, d.prototype._manageStamp = function (t) {
				this._mode()._manageStamp(t)
			}, d.prototype._getContainerSize = function () {
				return this._mode()._getContainerSize()
			}, d.prototype.needsResizeLayout = function () {
				return this._mode().needsResizeLayout()
			}, d.prototype.appended = function (t) {
				var e = this.addItems(t);
				if (e.length) {
					var i = this._filterRevealAdded(e);
					this.filteredItems = this.filteredItems.concat(i)
				}
			}, d.prototype.prepended = function (t) {
				var e = this._itemize(t);
				if (e.length) {
					var i = this.items.slice(0);
					this.items = e.concat(i), this._resetLayout(), this._manageStamps();
					var o = this._filterRevealAdded(e);
					this.layoutItems(i), this.filteredItems = o.concat(this.filteredItems)
				}
			}, d.prototype._filterRevealAdded = function (t) {
				var e = this._noTransition(function () {
					return this._filter(t)
				});
				return this.layoutItems(e, !0), this.reveal(e), t
			}, d.prototype.insert = function (t) {
				var e = this.addItems(t);
				if (e.length) {
					var i, o, n = e.length;
					for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
					var r = this._filter(e);
					for (this._noTransition(function () {
							this.hide(r)
						}), i = 0; n > i; i++) e[i].isLayoutInstant = !0;
					for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
					this.reveal(r)
				}
			};
			var c = d.prototype.remove;
			return d.prototype.remove = function (t) {
				t = o(t);
				var e = this.getItems(t);
				if (c.call(this, t), e && e.length)
					for (var i = 0, r = e.length; r > i; i++) {
						var s = e[i];
						n(s, this.filteredItems)
					}
			}, d.prototype.shuffle = function () {
				for (var t = 0, e = this.items.length; e > t; t++) {
					var i = this.items[t];
					i.sortData.random = Math.random()
				}
				this.options.sortBy = "random", this._sort(), this._layout()
			}, d.prototype._noTransition = function (t) {
				var e = this.options.transitionDuration;
				this.options.transitionDuration = 0;
				var i = t.call(this);
				return this.options.transitionDuration = e, i
			}, d.prototype.getFilteredItemElements = function () {
				for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
				return t
			}, d
		}
		var s = t.jQuery,
			a = String.prototype.trim ? function (t) {
				return t.trim()
			} : function (t) {
				return t.replace(/^\s+|\s+$/g, "")
			},
			u = document.documentElement,
			p = u.textContent ? function (t) {
				return t.textContent
			} : function (t) {
				return t.innerText
			},
			h = Object.prototype.toString,
			f = Array.prototype.indexOf ? function (t, e) {
				return t.indexOf(e)
			} : function (t, e) {
				for (var i = 0, o = t.length; o > i; i++)
					if (t[i] === e) return i;
				return -1
			};
		"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], r) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
	}(window);
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
	function e() {}

	function t(e, t) {
		for (var n = e.length; n--;)
			if (e[n].listener === t) return n;
		return -1
	}

	function n(e) {
		return function () {
			return this[e].apply(this, arguments)
		}
	}
	var i = e.prototype,
		r = this,
		o = r.EventEmitter;
	i.getListeners = function (e) {
		var t, n, i = this._getEvents();
		if ("object" == typeof e) {
			t = {};
			for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
		} else t = i[e] || (i[e] = []);
		return t
	}, i.flattenListeners = function (e) {
		var t, n = [];
		for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
		return n
	}, i.getListenersAsObject = function (e) {
		var t, n = this.getListeners(e);
		return n instanceof Array && (t = {}, t[e] = n), t || n
	}, i.addListener = function (e, n) {
		var i, r = this.getListenersAsObject(e),
			o = "object" == typeof n;
		for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
			listener: n,
			once: !1
		});
		return this
	}, i.on = n("addListener"), i.addOnceListener = function (e, t) {
		return this.addListener(e, {
			listener: t,
			once: !0
		})
	}, i.once = n("addOnceListener"), i.defineEvent = function (e) {
		return this.getListeners(e), this
	}, i.defineEvents = function (e) {
		for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
		return this
	}, i.removeListener = function (e, n) {
		var i, r, o = this.getListenersAsObject(e);
		for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
		return this
	}, i.off = n("removeListener"), i.addListeners = function (e, t) {
		return this.manipulateListeners(!1, e, t)
	}, i.removeListeners = function (e, t) {
		return this.manipulateListeners(!0, e, t)
	}, i.manipulateListeners = function (e, t, n) {
		var i, r, o = e ? this.removeListener : this.addListener,
			s = e ? this.removeListeners : this.addListeners;
		if ("object" != typeof t || t instanceof RegExp)
			for (i = n.length; i--;) o.call(this, t, n[i]);
		else
			for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
		return this
	}, i.removeEvent = function (e) {
		var t, n = typeof e,
			i = this._getEvents();
		if ("string" === n) delete i[e];
		else if ("object" === n)
			for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
		else delete this._events;
		return this
	}, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
		var n, i, r, o, s = this.getListenersAsObject(e);
		for (r in s)
			if (s.hasOwnProperty(r))
				for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
		return this
	}, i.trigger = n("emitEvent"), i.emit = function (e) {
		var t = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(e, t)
	}, i.setOnceReturnValue = function (e) {
		return this._onceReturnValue = e, this
	}, i._getOnceReturnValue = function () {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, i._getEvents = function () {
		return this._events || (this._events = {})
	}, e.noConflict = function () {
		return r.EventEmitter = o, e
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
		return e
	}) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
	function (e) {
		function t(t) {
			var n = e.event;
			return n.target = n.target || n.srcElement || t, n
		}
		var n = document.documentElement,
			i = function () {};
		n.addEventListener ? i = function (e, t, n) {
			e.addEventListener(t, n, !1)
		} : n.attachEvent && (i = function (e, n, i) {
			e[n + i] = i.handleEvent ? function () {
				var n = t(e);
				i.handleEvent.call(i, n)
			} : function () {
				var n = t(e);
				i.call(e, n)
			}, e.attachEvent("on" + n, e[n + i])
		});
		var r = function () {};
		n.removeEventListener ? r = function (e, t, n) {
			e.removeEventListener(t, n, !1)
		} : n.detachEvent && (r = function (e, t, n) {
			e.detachEvent("on" + t, e[t + n]);
			try {
				delete e[t + n]
			} catch (i) {
				e[t + n] = void 0
			}
		});
		var o = {
			bind: i,
			unbind: r
		};
		"function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
	}(this),
	function (e, t) {
		"function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
			return t(e, n, i)
		}) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
	}(window, function (e, t, n) {
		function i(e, t) {
			for (var n in t) e[n] = t[n];
			return e
		}

		function r(e) {
			return "[object Array]" === d.call(e)
		}

		function o(e) {
			var t = [];
			if (r(e)) t = e;
			else if ("number" == typeof e.length)
				for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
			else t.push(e);
			return t
		}

		function s(e, t, n) {
			if (!(this instanceof s)) return new s(e, t);
			"string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
			var r = this;
			setTimeout(function () {
				r.check()
			})
		}

		function f(e) {
			this.img = e
		}

		function c(e) {
			this.src = e, v[e] = this
		}
		var a = e.jQuery,
			u = e.console,
			h = u !== void 0,
			d = Object.prototype.toString;
		s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
			this.images = [];
			for (var e = 0, t = this.elements.length; t > e; e++) {
				var n = this.elements[e];
				"IMG" === n.nodeName && this.addImage(n);
				var i = n.nodeType;
				if (i && (1 === i || 9 === i || 11 === i))
					for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
						var f = r[o];
						this.addImage(f)
					}
			}
		}, s.prototype.addImage = function (e) {
			var t = new f(e);
			this.images.push(t)
		}, s.prototype.check = function () {
			function e(e, r) {
				return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
			}
			var t = this,
				n = 0,
				i = this.images.length;
			if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
			for (var r = 0; i > r; r++) {
				var o = this.images[r];
				o.on("confirm", e), o.check()
			}
		}, s.prototype.progress = function (e) {
			this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
			var t = this;
			setTimeout(function () {
				t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
			})
		}, s.prototype.complete = function () {
			var e = this.hasAnyBroken ? "fail" : "done";
			this.isComplete = !0;
			var t = this;
			setTimeout(function () {
				if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
					var n = t.hasAnyBroken ? "reject" : "resolve";
					t.jqDeferred[n](t)
				}
			})
		}, a && (a.fn.imagesLoaded = function (e, t) {
			var n = new s(this, e, t);
			return n.jqDeferred.promise(a(this))
		}), f.prototype = new t, f.prototype.check = function () {
			var e = v[this.img.src] || new c(this.img.src);
			if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
			if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
			var t = this;
			e.on("confirm", function (e, n) {
				return t.confirm(e.isLoaded, n), !0
			}), e.check()
		}, f.prototype.confirm = function (e, t) {
			this.isLoaded = e, this.emit("confirm", this, t)
		};
		var v = {};
		return c.prototype = new t, c.prototype.check = function () {
			if (!this.isChecked) {
				var e = new Image;
				n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
			}
		}, c.prototype.handleEvent = function (e) {
			var t = "on" + e.type;
			this[t] && this[t](e)
		}, c.prototype.onload = function (e) {
			this.confirm(!0, "onload"), this.unbindProxyEvents(e)
		}, c.prototype.onerror = function (e) {
			this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
		}, c.prototype.confirm = function (e, t) {
			this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
		}, c.prototype.unbindProxyEvents = function (e) {
			n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
		}, s
	});
/*
 * Swiper 2.1 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: August 22, 2013
 */
var Swiper = function (f, b) {
	function g(a) {
		return document.querySelectorAll ? document.querySelectorAll(a) : jQuery(a)
	}

	function h() {
		var c = y - l;
		b.freeMode && (c = y - l);
		b.slidesPerView > a.slides.length && (c = 0);
		0 > c && (c = 0);
		return c
	}

	function n() {
		function c(c) {
			var d = new Image;
			d.onload = function () {
				a.imagesLoaded++;
				if (a.imagesLoaded == a.imagesToLoad.length && (a.reInit(), b.onImagesReady)) b.onImagesReady(a)
			};
			d.src = c
		}
		a.browser.ie10 ? (a.h.addEventListener(a.wrapper, a.touchEvents.touchStart, z, !1), a.h.addEventListener(document, a.touchEvents.touchMove,
			A, !1), a.h.addEventListener(document, a.touchEvents.touchEnd, B, !1)) : (a.support.touch && (a.h.addEventListener(a.wrapper, "touchstart", z, !1), a.h.addEventListener(a.wrapper, "touchmove", A, !1), a.h.addEventListener(a.wrapper, "touchend", B, !1)), b.simulateTouch && (a.h.addEventListener(a.wrapper, "mousedown", z, !1), a.h.addEventListener(document, "mousemove", A, !1), a.h.addEventListener(document, "mouseup", B, !1)));
		b.autoResize && a.h.addEventListener(window, "resize", a.resizeFix, !1);
		t();
		a._wheelEvent = !1;
		if (b.mousewheelControl) {
			void 0 !==
				document.onmousewheel && (a._wheelEvent = "mousewheel");
			try {
				WheelEvent("wheel"), a._wheelEvent = "wheel"
			} catch (d) {}
			a._wheelEvent || (a._wheelEvent = "DOMMouseScroll");
			a._wheelEvent && a.h.addEventListener(a.container, a._wheelEvent, N, !1)
		}
		b.keyboardControl && a.h.addEventListener(document, "keydown", O, !1);
		if (b.updateOnImagesReady) {
			document.querySelectorAll ? a.imagesToLoad = a.container.querySelectorAll("img") : window.jQuery && (a.imagesToLoad = g(a.container).find("img"));
			for (var e = 0; e < a.imagesToLoad.length; e++) c(a.imagesToLoad[e].getAttribute("src"))
		}
	}

	function t() {
		if (b.preventLinks) {
			var c = [];
			document.querySelectorAll ? c = a.container.querySelectorAll("a") : window.jQuery && (c = g(a.container).find("a"));
			for (var d = 0; d < c.length; d++) a.h.addEventListener(c[d], "click", P, !1)
		}
		if (b.releaseFormElements)
			for (c = document.querySelectorAll ? a.container.querySelectorAll("input, textarea, select") : g(a.container).find("input, textarea, select"), d = 0; d < c.length; d++) a.h.addEventListener(c[d], a.touchEvents.touchStart, Q, !0);
		if (b.onSlideClick)
			for (d = 0; d < a.slides.length; d++) a.h.addEventListener(a.slides[d],
				"click", R, !1);
		if (b.onSlideTouch)
			for (d = 0; d < a.slides.length; d++) a.h.addEventListener(a.slides[d], a.touchEvents.touchStart, S, !1)
	}

	function v() {
		if (b.onSlideClick)
			for (var c = 0; c < a.slides.length; c++) a.h.removeEventListener(a.slides[c], "click", R, !1);
		if (b.onSlideTouch)
			for (c = 0; c < a.slides.length; c++) a.h.removeEventListener(a.slides[c], a.touchEvents.touchStart, S, !1);
		if (b.releaseFormElements)
			for (var d = document.querySelectorAll ? a.container.querySelectorAll("input, textarea, select") : g(a.container).find("input, textarea, select"),
					c = 0; c < d.length; c++) a.h.removeEventListener(d[c], a.touchEvents.touchStart, Q, !0);
		if (b.preventLinks)
			for (d = [], document.querySelectorAll ? d = a.container.querySelectorAll("a") : window.jQuery && (d = g(a.container).find("a")), c = 0; c < d.length; c++) a.h.removeEventListener(d[c], "click", P, !1)
	}

	function O(c) {
		var b = c.keyCode || c.charCode;
		if (37 == b || 39 == b || 38 == b || 40 == b) {
			for (var e = !1, f = a.h.getOffset(a.container), h = a.h.windowScroll().left, g = a.h.windowScroll().top, m = a.h.windowWidth(), l = a.h.windowHeight(), f = [
					[f.left, f.top],
					[f.left +
						a.width, f.top
					],
					[f.left, f.top + a.height],
					[f.left + a.width, f.top + a.height]
				], p = 0; p < f.length; p++) {
				var r = f[p];
				r[0] >= h && (r[0] <= h + m && r[1] >= g && r[1] <= g + l) && (e = !0)
			}
			if (!e) return
		}
		if (k) {
			if (37 == b || 39 == b) c.preventDefault ? c.preventDefault() : c.returnValue = !1;
			39 == b && a.swipeNext();
			37 == b && a.swipePrev()
		} else {
			if (38 == b || 40 == b) c.preventDefault ? c.preventDefault() : c.returnValue = !1;
			40 == b && a.swipeNext();
			38 == b && a.swipePrev()
		}
	}

	function N(c) {
		var d = a._wheelEvent,
			e;
		c.detail ? e = -c.detail : "mousewheel" == d ? e = c.wheelDelta : "DOMMouseScroll" ==
			d ? e = -c.detail : "wheel" == d && (e = Math.abs(c.deltaX) > Math.abs(c.deltaY) ? -c.deltaX : -c.deltaY);
		b.freeMode ? (k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y"), k ? (d = a.getWrapperTranslate("x") + e, e = a.getWrapperTranslate("y"), 0 < d && (d = 0), d < -h() && (d = -h())) : (d = a.getWrapperTranslate("x"), e = a.getWrapperTranslate("y") + e, 0 < e && (e = 0), e < -h() && (e = -h())), a.setWrapperTransition(0), a.setWrapperTranslate(d, e, 0), k ? a.updateActiveSlide(d) : a.updateActiveSlide(e)) : 0 > e ? a.swipeNext() : a.swipePrev();
		b.autoplay && a.stopAutoplay();
		c.preventDefault ? c.preventDefault() : c.returnValue = !1;
		return !1
	}

	function T(a) {
		for (var d = !1; !d;) - 1 < a.className.indexOf(b.slideClass) && (d = a), a = a.parentElement;
		return d
	}

	function R(c) {
		a.allowSlideClick && (c.target ? (a.clickedSlide = this, a.clickedSlideIndex = a.slides.indexOf(this)) : (a.clickedSlide = T(c.srcElement), a.clickedSlideIndex = a.slides.indexOf(a.clickedSlide)), b.onSlideClick(a))
	}

	function S(c) {
		a.clickedSlide = c.target ? this : T(c.srcElement);
		a.clickedSlideIndex = a.slides.indexOf(a.clickedSlide);
		b.onSlideTouch(a)
	}

	function P(b) {
		if (!a.allowLinks) return b.preventDefault ? b.preventDefault() : b.returnValue = !1, !1
	}

	function Q(a) {
		a.stopPropagation ? a.stopPropagation() : a.returnValue = !1;
		return !1
	}

	function z(c) {
		b.preventLinks && (a.allowLinks = !0);
		if (a.isTouched || b.onlyExternal) return !1;
		var d;
		if (d = b.noSwiping)
			if (d = c.target || c.srcElement) {
				d = c.target || c.srcElement;
				var e = !1;
				do -1 < d.className.indexOf(b.noSwipingClass) && (e = !0), d = d.parentElement; while (!e && d.parentElement && -1 == d.className.indexOf(b.wrapperClass));
				!e && (-1 < d.className.indexOf(b.wrapperClass) &&
					-1 < d.className.indexOf(b.noSwipingClass)) && (e = !0);
				d = e
			}
		if (d) return !1;
		G = !1;
		a.isTouched = !0;
		u = "touchstart" == c.type;
		if (!u || 1 == c.targetTouches.length) {
			b.loop && a.fixLoop();
			a.callPlugins("onTouchStartBegin");
			u || (c.preventDefault ? c.preventDefault() : c.returnValue = !1);
			d = u ? c.targetTouches[0].pageX : c.pageX || c.clientX;
			c = u ? c.targetTouches[0].pageY : c.pageY || c.clientY;
			a.touches.startX = a.touches.currentX = d;
			a.touches.startY = a.touches.currentY = c;
			a.touches.start = a.touches.current = k ? d : c;
			a.setWrapperTransition(0);
			a.positions.start =
				a.positions.current = k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y");
			k ? a.setWrapperTranslate(a.positions.start, 0, 0) : a.setWrapperTranslate(0, a.positions.start, 0);
			a.times.start = (new Date).getTime();
			x = void 0;
			0 < b.moveStartThreshold && (M = !1);
			if (b.onTouchStart) b.onTouchStart(a);
			a.callPlugins("onTouchStartEnd")
		}
	}

	function A(c) {
		if (a.isTouched && !b.onlyExternal && (!u || "mousemove" != c.type)) {
			var d = u ? c.targetTouches[0].pageX : c.pageX || c.clientX,
				e = u ? c.targetTouches[0].pageY : c.pageY || c.clientY;
			"undefined" ===
			typeof x && k && (x = !!(x || Math.abs(e - a.touches.startY) > Math.abs(d - a.touches.startX)));
			"undefined" !== typeof x || k || (x = !!(x || Math.abs(e - a.touches.startY) < Math.abs(d - a.touches.startX)));
			if (x) a.isTouched = !1;
			else if (c.assignedToSwiper) a.isTouched = !1;
			else if (c.assignedToSwiper = !0, a.isMoved = !0, b.preventLinks && (a.allowLinks = !1), b.onSlideClick && (a.allowSlideClick = !1), b.autoplay && a.stopAutoplay(), !u || 1 == c.touches.length) {
				a.callPlugins("onTouchMoveStart");
				c.preventDefault ? c.preventDefault() : c.returnValue = !1;
				a.touches.current =
					k ? d : e;
				a.positions.current = (a.touches.current - a.touches.start) * b.touchRatio + a.positions.start;
				if (0 < a.positions.current && b.onResistanceBefore) b.onResistanceBefore(a, a.positions.current);
				if (a.positions.current < -h() && b.onResistanceAfter) b.onResistanceAfter(a, Math.abs(a.positions.current + h()));
				b.resistance && "100%" != b.resistance && (0 < a.positions.current && (c = 1 - a.positions.current / l / 2, a.positions.current = 0.5 > c ? l / 2 : a.positions.current * c), a.positions.current < -h() && (d = (a.touches.current - a.touches.start) * b.touchRatio +
					(h() + a.positions.start), c = (l + d) / l, d = a.positions.current - d * (1 - c) / 2, e = -h() - l / 2, a.positions.current = d < e || 0 >= c ? e : d));
				b.resistance && "100%" == b.resistance && (0 < a.positions.current && (!b.freeMode || b.freeModeFluid) && (a.positions.current = 0), a.positions.current < -h() && (!b.freeMode || b.freeModeFluid) && (a.positions.current = -h()));
				if (b.followFinger) {
					b.moveStartThreshold ? Math.abs(a.touches.current - a.touches.start) > b.moveStartThreshold || M ? (M = !0, k ? a.setWrapperTranslate(a.positions.current, 0, 0) : a.setWrapperTranslate(0,
						a.positions.current, 0)) : a.positions.current = a.positions.start : k ? a.setWrapperTranslate(a.positions.current, 0, 0) : a.setWrapperTranslate(0, a.positions.current, 0);
					(b.freeMode || b.watchActiveIndex) && a.updateActiveSlide(a.positions.current);
					b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grabbing", a.container.style.cursor = "-moz-grabbin", a.container.style.cursor = "-webkit-grabbing");
					D || (D = a.touches.current);
					H || (H = (new Date).getTime());
					a.velocity = (a.touches.current - D) / ((new Date).getTime() -
						H) / 2;
					2 > Math.abs(a.touches.current - D) && (a.velocity = 0);
					D = a.touches.current;
					H = (new Date).getTime();
					a.callPlugins("onTouchMoveEnd");
					if (b.onTouchMove) b.onTouchMove(a);
					return !1
				}
			}
		}
	}

	function B(c) {
		x && a.swipeReset();
		if (!b.onlyExternal && a.isTouched) {
			a.isTouched = !1;
			b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grab", a.container.style.cursor = "-moz-grab", a.container.style.cursor = "-webkit-grab");
			a.positions.current || 0 === a.positions.current || (a.positions.current = a.positions.start);
			b.followFinger &&
				(k ? a.setWrapperTranslate(a.positions.current, 0, 0) : a.setWrapperTranslate(0, a.positions.current, 0));
			a.times.end = (new Date).getTime();
			a.touches.diff = a.touches.current - a.touches.start;
			a.touches.abs = Math.abs(a.touches.diff);
			a.positions.diff = a.positions.current - a.positions.start;
			a.positions.abs = Math.abs(a.positions.diff);
			var d = a.positions.diff,
				e = a.positions.abs;
			c = a.times.end - a.times.start;
			5 > e && (300 > c && !1 == a.allowLinks) && (b.freeMode || 0 == e || a.swipeReset(), b.preventLinks && (a.allowLinks = !0), b.onSlideClick &&
				(a.allowSlideClick = !0));
			setTimeout(function () {
				b.preventLinks && (a.allowLinks = !0);
				b.onSlideClick && (a.allowSlideClick = !0)
			}, 100);
			if (a.isMoved) {
				a.isMoved = !1;
				var f = h();
				if (0 < a.positions.current) a.swipeReset();
				else if (a.positions.current < -f) a.swipeReset();
				else if (b.freeMode) {
					if (b.freeModeFluid) {
						var e = 1E3 * b.momentumRatio,
							d = a.positions.current + a.velocity * e,
							g = !1,
							F, m = 20 * Math.abs(a.velocity) * b.momentumBounceRatio;
						d < -f && (b.momentumBounce && a.support.transitions ? (d + f < -m && (d = -f - m), F = -f, G = g = !0) : d = -f);
						0 < d && (b.momentumBounce &&
							a.support.transitions ? (d > m && (d = m), F = 0, G = g = !0) : d = 0);
						0 != a.velocity && (e = Math.abs((d - a.positions.current) / a.velocity));
						k ? a.setWrapperTranslate(d, 0, 0) : a.setWrapperTranslate(0, d, 0);
						a.setWrapperTransition(e);
						b.momentumBounce && g && a.wrapperTransitionEnd(function () {
							if (G) {
								if (b.onMomentumBounce) b.onMomentumBounce(a);
								k ? a.setWrapperTranslate(F, 0, 0) : a.setWrapperTranslate(0, F, 0);
								a.setWrapperTransition(300)
							}
						});
						a.updateActiveSlide(d)
					}(!b.freeModeFluid || 300 <= c) && a.updateActiveSlide(a.positions.current)
				} else {
					E = 0 > d ? "toNext" :
						"toPrev";
					"toNext" == E && 300 >= c && (30 > e || !b.shortSwipes ? a.swipeReset() : a.swipeNext(!0));
					"toPrev" == E && 300 >= c && (30 > e || !b.shortSwipes ? a.swipeReset() : a.swipePrev(!0));
					f = 0;
					if ("auto" == b.slidesPerView) {
						for (var d = Math.abs(k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y")), q = g = 0; q < a.slides.length; q++)
							if (m = k ? a.slides[q].getWidth(!0) : a.slides[q].getHeight(!0), g += m, g > d) {
								f = m;
								break
							}
						f > l && (f = l)
					} else f = p * b.slidesPerView;
					"toNext" == E && 300 < c && (e >= 0.5 * f ? a.swipeNext(!0) : a.swipeReset());
					"toPrev" == E && 300 < c && (e >= 0.5 * f ?
						a.swipePrev(!0) : a.swipeReset())
				}
				if (b.onTouchEnd) b.onTouchEnd(a);
				a.callPlugins("onTouchEnd")
			} else {
				a.isMoved = !1;
				if (b.onTouchEnd) b.onTouchEnd(a);
				a.callPlugins("onTouchEnd");
				a.swipeReset()
			}
		}
	}

	function I(c, d, e) {
		function f() {
			g += m;
			if (p = "toNext" == l ? g > c : g < c) k ? a.setWrapperTranslate(Math.round(g), 0) : a.setWrapperTranslate(0, Math.round(g)), a._DOMAnimating = !0, window.setTimeout(function () {
				f()
			}, 1E3 / 60);
			else {
				if (b.onSlideChangeEnd) b.onSlideChangeEnd(a);
				k ? a.setWrapperTranslate(c, 0) : a.setWrapperTranslate(0, c);
				a._DOMAnimating = !1
			}
		}
		if (a.support.transitions || !b.DOMAnimation) {
			k ? a.setWrapperTranslate(c, 0, 0) : a.setWrapperTranslate(0, c, 0);
			var h = "to" == d && 0 <= e.speed ? e.speed : b.speed;
			a.setWrapperTransition(h)
		} else {
			var g = k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y"),
				h = "to" == d && 0 <= e.speed ? e.speed : b.speed,
				m = Math.ceil((c - g) / h * (1E3 / 60)),
				l = g > c ? "toNext" : "toPrev",
				p = "toNext" == l ? g > c : g < c;
			if (a._DOMAnimating) return;
			f()
		}
		a.updateActiveSlide(c);
		if (b.onSlideNext && "next" == d) b.onSlideNext(a, c);
		if (b.onSlidePrev && "prev" == d) b.onSlidePrev(a, c);
		if (b.onSlideReset && "reset" == d) b.onSlideReset(a, c);
		("next" == d || "prev" == d || "to" == d && !0 == e.runCallbacks) && W()
	}

	function W() {
		a.callPlugins("onSlideChangeStart");
		if (b.onSlideChangeStart)
			if (b.queueStartCallbacks && a.support.transitions) {
				if (a._queueStartCallbacks) return;
				a._queueStartCallbacks = !0;
				b.onSlideChangeStart(a);
				a.wrapperTransitionEnd(function () {
					a._queueStartCallbacks = !1
				})
			} else b.onSlideChangeStart(a);
		b.onSlideChangeEnd && (a.support.transitions ? b.queueEndCallbacks ? a._queueEndCallbacks || (a._queueEndCallbacks = !0, a.wrapperTransitionEnd(b.onSlideChangeEnd)) : a.wrapperTransitionEnd(b.onSlideChangeEnd) : b.DOMAnimation || setTimeout(function () {
			b.onSlideChangeEnd(a)
		}, 10))
	}

	function U() {
		for (var b = a.paginationButtons, d = 0; d < b.length; d++) a.h.removeEventListener(b[d], "click", V, !1)
	}

	function V(b) {
		var d;
		b = b.target || b.srcElement;
		for (var e = a.paginationButtons, f = 0; f < e.length; f++) b === e[f] && (d = f);
		a.swipeTo(d)
	}
	if (document.body.__defineGetter__ && HTMLElement) {
		var s = HTMLElement.prototype;
		s.__defineGetter__ && s.__defineGetter__("outerHTML",
			function () {
				return (new XMLSerializer).serializeToString(this)
			})
	}
	window.getComputedStyle || (window.getComputedStyle = function (a, b) {
		this.el = a;
		this.getPropertyValue = function (b) {
			var d = /(\-([a-z]){1})/g;
			"float" === b && (b = "styleFloat");
			d.test(b) && (b = b.replace(d, function (a, b, c) {
				return c.toUpperCase()
			}));
			return a.currentStyle[b] ? a.currentStyle[b] : null
		};
		return this
	});
	Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
		for (var e = b || 0, f = this.length; e < f; e++)
			if (this[e] === a) return e;
		return -1
	});
	if ((document.querySelectorAll ||
			window.jQuery) && "undefined" !== typeof f && (f.nodeType || 0 !== g(f).length)) {
		var a = this;
		a.touches = {
			start: 0,
			startX: 0,
			startY: 0,
			current: 0,
			currentX: 0,
			currentY: 0,
			diff: 0,
			abs: 0
		};
		a.positions = {
			start: 0,
			abs: 0,
			diff: 0,
			current: 0
		};
		a.times = {
			start: 0,
			end: 0
		};
		a.id = (new Date).getTime();
		a.container = f.nodeType ? f : g(f)[0];
		a.isTouched = !1;
		a.isMoved = !1;
		a.activeIndex = 0;
		a.activeLoaderIndex = 0;
		a.activeLoopIndex = 0;
		a.previousIndex = null;
		a.velocity = 0;
		a.snapGrid = [];
		a.slidesGrid = [];
		a.imagesToLoad = [];
		a.imagesLoaded = 0;
		a.wrapperLeft = 0;
		a.wrapperRight =
			0;
		a.wrapperTop = 0;
		a.wrapperBottom = 0;
		var J, p, y, E, x, l, s = {
			mode: "horizontal",
			touchRatio: 1,
			speed: 300,
			freeMode: !1,
			freeModeFluid: !1,
			momentumRatio: 1,
			momentumBounce: !0,
			momentumBounceRatio: 1,
			slidesPerView: 1,
			slidesPerGroup: 1,
			simulateTouch: !0,
			followFinger: !0,
			shortSwipes: !0,
			moveStartThreshold: !1,
			autoplay: !1,
			onlyExternal: !1,
			createPagination: !0,
			pagination: !1,
			paginationElement: "span",
			paginationClickable: !1,
			paginationAsRange: !0,
			resistance: !0,
			scrollContainer: !1,
			preventLinks: !0,
			noSwiping: !1,
			noSwipingClass: "swiper-no-swiping",
			initialSlide: 0,
			keyboardControl: !1,
			mousewheelControl: !1,
			mousewheelDebounce: 600,
			useCSS3Transforms: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			calculateHeight: !1,
			updateOnImagesReady: !0,
			releaseFormElements: !0,
			watchActiveIndex: !1,
			visibilityFullFit: !1,
			offsetPxBefore: 0,
			offsetPxAfter: 0,
			offsetSlidesBefore: 0,
			offsetSlidesAfter: 0,
			centeredSlides: !1,
			queueStartCallbacks: !1,
			queueEndCallbacks: !1,
			autoResize: !0,
			resizeReInit: !1,
			DOMAnimation: !0,
			loader: {
				slides: [],
				slidesHTMLType: "inner",
				surroundGroups: 1,
				logic: "reload",
				loadAllSlides: !1
			},
			slideElement: "div",
			slideClass: "swiper-slide",
			slideActiveClass: "swiper-slide-active",
			slideVisibleClass: "swiper-slide-visible",
			wrapperClass: "swiper-wrapper",
			paginationElementClass: "swiper-pagination-switch",
			paginationActiveClass: "swiper-active-switch",
			paginationVisibleClass: "swiper-visible-switch"
		};
		b = b || {};
		for (var q in s)
			if (q in b && "object" === typeof b[q])
				for (var C in s[q]) C in b[q] || (b[q][C] = s[q][C]);
			else q in b || (b[q] = s[q]);
		a.params = b;
		b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0);
		b.loop && (b.resistance =
			"100%");
		var k = "horizontal" === b.mode;
		a.touchEvents = {
			touchStart: a.support.touch || !b.simulateTouch ? "touchstart" : a.browser.ie10 ? "MSPointerDown" : "mousedown",
			touchMove: a.support.touch || !b.simulateTouch ? "touchmove" : a.browser.ie10 ? "MSPointerMove" : "mousemove",
			touchEnd: a.support.touch || !b.simulateTouch ? "touchend" : a.browser.ie10 ? "MSPointerUp" : "mouseup"
		};
		for (q = a.container.childNodes.length - 1; 0 <= q; q--)
			if (a.container.childNodes[q].className)
				for (C = a.container.childNodes[q].className.split(" "), s = 0; s < C.length; s++) C[s] ===
					b.wrapperClass && (J = a.container.childNodes[q]);
		a.wrapper = J;
		a._extendSwiperSlide = function (c) {
			c.append = function () {
				b.loop ? (c.insertAfter(a.slides.length - a.loopedSlides), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.wrapper.appendChild(c);
				a.reInit();
				return c
			};
			c.prepend = function () {
				b.loop ? (a.wrapper.insertBefore(c, a.slides[a.loopedSlides]), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.wrapper.insertBefore(c, a.wrapper.firstChild);
				a.reInit();
				return c
			};
			c.insertAfter = function (d) {
				if ("undefined" ===
					typeof d) return !1;
				b.loop ? (d = a.slides[d + 1 + a.loopedSlides], a.wrapper.insertBefore(c, d), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : (d = a.slides[d + 1], a.wrapper.insertBefore(c, d));
				a.reInit();
				return c
			};
			c.clone = function () {
				return a._extendSwiperSlide(c.cloneNode(!0))
			};
			c.remove = function () {
				a.wrapper.removeChild(c);
				a.reInit()
			};
			c.html = function (a) {
				if ("undefined" === typeof a) return c.innerHTML;
				c.innerHTML = a;
				return c
			};
			c.index = function () {
				for (var b, e = a.slides.length - 1; 0 <= e; e--) c === a.slides[e] && (b = e);
				return b
			};
			c.isActive = function () {
				return c.index() === a.activeIndex ? !0 : !1
			};
			c.swiperSlideDataStorage || (c.swiperSlideDataStorage = {});
			c.getData = function (a) {
				return c.swiperSlideDataStorage[a]
			};
			c.setData = function (a, b) {
				c.swiperSlideDataStorage[a] = b;
				return c
			};
			c.data = function (a, b) {
				return b ? (c.setAttribute("data-" + a, b), c) : c.getAttribute("data-" + a)
			};
			c.getWidth = function (b) {
				return a.h.getWidth(c, b)
			};
			c.getHeight = function (b) {
				return a.h.getHeight(c, b)
			};
			c.getOffset = function () {
				return a.h.getOffset(c)
			};
			return c
		};
		a.calcSlides = function (c) {
			var d =
				a.slides ? a.slides.length : !1;
			a.slides = [];
			a.displaySlides = [];
			for (var e = 0; e < a.wrapper.childNodes.length; e++)
				if (a.wrapper.childNodes[e].className)
					for (var f = a.wrapper.childNodes[e].className.split(" "), g = 0; g < f.length; g++) f[g] === b.slideClass && a.slides.push(a.wrapper.childNodes[e]);
			for (e = a.slides.length - 1; 0 <= e; e--) a._extendSwiperSlide(a.slides[e]);
			d && (d !== a.slides.length || c) && (v(), t(), a.updateActiveSlide(), b.createPagination && a.params.pagination && a.createPagination(), a.callPlugins("numberOfSlidesChanged"))
		};
		a.createSlide = function (c, d, e) {
			d = d || a.params.slideClass;
			e = e || b.slideElement;
			e = document.createElement(e);
			e.innerHTML = c || "";
			e.className = d;
			return a._extendSwiperSlide(e)
		};
		a.appendSlide = function (b, d, e) {
			if (b) return b.nodeType ? a._extendSwiperSlide(b).append() : a.createSlide(b, d, e).append()
		};
		a.prependSlide = function (b, d, e) {
			if (b) return b.nodeType ? a._extendSwiperSlide(b).prepend() : a.createSlide(b, d, e).prepend()
		};
		a.insertSlideAfter = function (b, d, e, f) {
			return "undefined" === typeof b ? !1 : d.nodeType ? a._extendSwiperSlide(d).insertAfter(b) :
				a.createSlide(d, e, f).insertAfter(b)
		};
		a.removeSlide = function (c) {
			if (a.slides[c]) {
				if (b.loop) {
					if (!a.slides[c + a.loopedSlides]) return !1;
					a.slides[c + a.loopedSlides].remove();
					a.removeLoopedSlides();
					a.calcSlides();
					a.createLoop()
				} else a.slides[c].remove();
				return !0
			}
			return !1
		};
		a.removeLastSlide = function () {
			return 0 < a.slides.length ? (b.loop ? (a.slides[a.slides.length - 1 - a.loopedSlides].remove(), a.removeLoopedSlides(), a.calcSlides(), a.createLoop()) : a.slides[a.slides.length - 1].remove(), !0) : !1
		};
		a.removeAllSlides = function () {
			for (var b =
					a.slides.length - 1; 0 <= b; b--) a.slides[b].remove()
		};
		a.getSlide = function (b) {
			return a.slides[b]
		};
		a.getLastSlide = function () {
			return a.slides[a.slides.length - 1]
		};
		a.getFirstSlide = function () {
			return a.slides[0]
		};
		a.activeSlide = function () {
			return a.slides[a.activeIndex]
		};
		var K = [],
			L;
		for (L in a.plugins) b[L] && (q = a.plugins[L](a, b[L])) && K.push(q);
		a.callPlugins = function (a, b) {
			b || (b = {});
			for (var e = 0; e < K.length; e++)
				if (a in K[e]) K[e][a](b)
		};
		a.browser.ie10 && !b.onlyExternal && (k ? a.wrapper.classList.add("swiper-wp8-horizontal") :
			a.wrapper.classList.add("swiper-wp8-vertical"));
		b.freeMode && (a.container.className += " swiper-free-mode");
		a.initialized = !1;
		a.init = function (c, d) {
			var e = a.h.getWidth(a.container),
				f = a.h.getHeight(a.container);
			if (e !== a.width || f !== a.height || c) {
				a.width = e;
				a.height = f;
				l = k ? e : f;
				e = a.wrapper;
				c && a.calcSlides(d);
				if ("auto" === b.slidesPerView) {
					var g = 0,
						h = 0;
					0 < b.slidesOffset && (e.style.paddingLeft = "", e.style.paddingRight = "", e.style.paddingTop = "", e.style.paddingBottom = "");
					e.style.width = "";
					e.style.height = "";
					0 < b.offsetPxBefore &&
						(k ? a.wrapperLeft = b.offsetPxBefore : a.wrapperTop = b.offsetPxBefore);
					0 < b.offsetPxAfter && (k ? a.wrapperRight = b.offsetPxAfter : a.wrapperBottom = b.offsetPxAfter);
					b.centeredSlides && (k ? (a.wrapperLeft = (l - this.slides[0].getWidth(!0)) / 2, a.wrapperRight = (l - a.slides[a.slides.length - 1].getWidth(!0)) / 2) : (a.wrapperTop = (l - a.slides[0].getHeight(!0)) / 2, a.wrapperBottom = (l - a.slides[a.slides.length - 1].getHeight(!0)) / 2));
					k ? (0 <= a.wrapperLeft && (e.style.paddingLeft = a.wrapperLeft + "px"), 0 <= a.wrapperRight && (e.style.paddingRight = a.wrapperRight +
						"px")) : (0 <= a.wrapperTop && (e.style.paddingTop = a.wrapperTop + "px"), 0 <= a.wrapperBottom && (e.style.paddingBottom = a.wrapperBottom + "px"));
					var m = 0,
						q = 0;
					a.snapGrid = [];
					a.slidesGrid = [];
					for (var n = 0, r = 0; r < a.slides.length; r++) {
						var f = a.slides[r].getWidth(!0),
							s = a.slides[r].getHeight(!0);
						b.calculateHeight && (n = Math.max(n, s));
						var t = k ? f : s;
						if (b.centeredSlides) {
							var u = r === a.slides.length - 1 ? 0 : a.slides[r + 1].getWidth(!0),
								w = r === a.slides.length - 1 ? 0 : a.slides[r + 1].getHeight(!0),
								u = k ? u : w;
							if (t > l) {
								for (w = 0; w <= Math.floor(t / (l + a.wrapperLeft)); w++) 0 ===
									w ? a.snapGrid.push(m + a.wrapperLeft) : a.snapGrid.push(m + a.wrapperLeft + l * w);
								a.slidesGrid.push(m + a.wrapperLeft)
							} else a.snapGrid.push(q), a.slidesGrid.push(q);
							q += t / 2 + u / 2
						} else {
							if (t > l)
								for (w = 0; w <= Math.floor(t / l); w++) a.snapGrid.push(m + l * w);
							else a.snapGrid.push(m);
							a.slidesGrid.push(m)
						}
						m += t;
						g += f;
						h += s
					}
					b.calculateHeight && (a.height = n);
					k ? (y = g + a.wrapperRight + a.wrapperLeft, e.style.width = g + "px", e.style.height = a.height + "px") : (y = h + a.wrapperTop + a.wrapperBottom, e.style.width = a.width + "px", e.style.height = h + "px")
				} else if (b.scrollContainer) e.style.width =
					"", e.style.height = "", n = a.slides[0].getWidth(!0), g = a.slides[0].getHeight(!0), y = k ? n : g, e.style.width = n + "px", e.style.height = g + "px", p = k ? n : g;
				else {
					if (b.calculateHeight) {
						g = n = 0;
						k || (a.container.style.height = "");
						e.style.height = "";
						for (r = 0; r < a.slides.length; r++) a.slides[r].style.height = "", n = Math.max(a.slides[r].getHeight(!0), n), k || (g += a.slides[r].getHeight(!0));
						s = n;
						a.height = s;
						k ? g = s : (l = s, a.container.style.height = l + "px")
					} else s = k ? a.height : a.height / b.slidesPerView, g = k ? a.height : a.slides.length * s;
					f = k ? a.width / b.slidesPerView :
						a.width;
					n = k ? a.slides.length * f : a.width;
					p = k ? f : s;
					0 < b.offsetSlidesBefore && (k ? a.wrapperLeft = p * b.offsetSlidesBefore : a.wrapperTop = p * b.offsetSlidesBefore);
					0 < b.offsetSlidesAfter && (k ? a.wrapperRight = p * b.offsetSlidesAfter : a.wrapperBottom = p * b.offsetSlidesAfter);
					0 < b.offsetPxBefore && (k ? a.wrapperLeft = b.offsetPxBefore : a.wrapperTop = b.offsetPxBefore);
					0 < b.offsetPxAfter && (k ? a.wrapperRight = b.offsetPxAfter : a.wrapperBottom = b.offsetPxAfter);
					b.centeredSlides && (k ? (a.wrapperLeft = (l - p) / 2, a.wrapperRight = (l - p) / 2) : (a.wrapperTop =
						(l - p) / 2, a.wrapperBottom = (l - p) / 2));
					k ? (0 < a.wrapperLeft && (e.style.paddingLeft = a.wrapperLeft + "px"), 0 < a.wrapperRight && (e.style.paddingRight = a.wrapperRight + "px")) : (0 < a.wrapperTop && (e.style.paddingTop = a.wrapperTop + "px"), 0 < a.wrapperBottom && (e.style.paddingBottom = a.wrapperBottom + "px"));
					y = k ? n + a.wrapperRight + a.wrapperLeft : g + a.wrapperTop + a.wrapperBottom;
					e.style.width = n + "px";
					e.style.height = g + "px";
					m = 0;
					a.snapGrid = [];
					a.slidesGrid = [];
					for (r = 0; r < a.slides.length; r++) a.snapGrid.push(m), a.slidesGrid.push(m), m += p, a.slides[r].style.width =
						f + "px", a.slides[r].style.height = s + "px"
				}
				if (a.initialized) {
					if (a.callPlugins("onInit"), b.onFirstInit) b.onInit(a)
				} else if (a.callPlugins("onFirstInit"), b.onFirstInit) b.onFirstInit(a);
				a.initialized = !0
			}
		};
		a.reInit = function (b) {
			a.init(!0, b)
		};
		a.resizeFix = function (c) {
			a.callPlugins("beforeResizeFix");
			a.init(b.resizeReInit || c);
			if (!b.freeMode) b.loop ? a.swipeTo(a.activeLoopIndex, 0, !1) : a.swipeTo(a.activeIndex, 0, !1);
			else if ((k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y")) < -h()) {
				c = k ? -h() : 0;
				var d = k ? 0 : -h();
				a.setWrapperTransition(0);
				a.setWrapperTranslate(c, d, 0)
			}
			a.callPlugins("afterResizeFix")
		};
		a.destroy = function (c) {
			a.browser.ie10 ? (a.h.removeEventListener(a.wrapper, a.touchEvents.touchStart, z, !1), a.h.removeEventListener(document, a.touchEvents.touchMove, A, !1), a.h.removeEventListener(document, a.touchEvents.touchEnd, B, !1)) : (a.support.touch && (a.h.removeEventListener(a.wrapper, "touchstart", z, !1), a.h.removeEventListener(a.wrapper, "touchmove", A, !1), a.h.removeEventListener(a.wrapper, "touchend", B, !1)), b.simulateTouch && (a.h.removeEventListener(a.wrapper,
				"mousedown", z, !1), a.h.removeEventListener(document, "mousemove", A, !1), a.h.removeEventListener(document, "mouseup", B, !1)));
			b.autoResize && a.h.removeEventListener(window, "resize", a.resizeFix, !1);
			v();
			b.paginationClickable && U();
			b.mousewheelControl && a._wheelEvent && a.h.removeEventListener(a.container, a._wheelEvent, N, !1);
			b.keyboardControl && a.h.removeEventListener(document, "keydown", O, !1);
			b.autoplay && a.stopAutoplay();
			a.callPlugins("onDestroy");
			a = null
		};
		b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor =
			"grab", a.container.style.cursor = "-moz-grab", a.container.style.cursor = "-webkit-grab");
		a.allowSlideClick = !0;
		a.allowLinks = !0;
		var u = !1,
			M, G = !0,
			D, H;
		a.swipeNext = function (c) {
			!c && b.loop && a.fixLoop();
			a.callPlugins("onSwipeNext");
			var d = c = k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y");
			if ("auto" == b.slidesPerView)
				for (var e = 0; e < a.snapGrid.length; e++) {
					if (-c >= a.snapGrid[e] && -c < a.snapGrid[e + 1]) {
						d = -a.snapGrid[e + 1];
						break
					}
				} else d = p * b.slidesPerGroup, d = -(Math.floor(Math.abs(c) / Math.floor(d)) * d + d);
			d < -h() && (d = -h());
			if (d == c) return !1;
			I(d, "next");
			return !0
		};
		a.swipePrev = function (c) {
			!c && b.loop && a.fixLoop();
			!c && b.autoplay && a.stopAutoplay();
			a.callPlugins("onSwipePrev");
			c = Math.ceil(k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y"));
			var d;
			if ("auto" == b.slidesPerView) {
				d = 0;
				for (var e = 1; e < a.snapGrid.length; e++) {
					if (-c == a.snapGrid[e]) {
						d = -a.snapGrid[e - 1];
						break
					}
					if (-c > a.snapGrid[e] && -c < a.snapGrid[e + 1]) {
						d = -a.snapGrid[e];
						break
					}
				}
			} else d = p * b.slidesPerGroup, d *= -(Math.ceil(-c / d) - 1);
			0 < d && (d = 0);
			if (d == c) return !1;
			I(d, "prev");
			return !0
		};
		a.swipeReset = function () {
			a.callPlugins("onSwipeReset");
			var c = k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y"),
				d = p * b.slidesPerGroup;
			h();
			if ("auto" == b.slidesPerView) {
				for (var e = d = 0; e < a.snapGrid.length; e++) {
					if (-c === a.snapGrid[e]) return;
					if (-c >= a.snapGrid[e] && -c < a.snapGrid[e + 1]) {
						d = 0 < a.positions.diff ? -a.snapGrid[e + 1] : -a.snapGrid[e];
						break
					}
				} - c >= a.snapGrid[a.snapGrid.length - 1] && (d = -a.snapGrid[a.snapGrid.length - 1]);
				c <= -h() && (d = -h())
			} else d = 0 > c ? Math.round(c / d) * d : 0;
			b.scrollContainer && (d = 0 > c ? c : 0);
			d < -h() &&
				(d = -h());
			b.scrollContainer && l > p && (d = 0);
			if (d == c) return !1;
			I(d, "reset");
			return !0
		};
		a.swipeTo = function (c, d, e) {
			c = parseInt(c, 10);
			a.callPlugins("onSwipeTo", {
				index: c,
				speed: d
			});
			b.loop && (c += a.loopedSlides);
			var f = k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y");
			if (!(c > a.slides.length - 1 || 0 > c)) {
				var g;
				g = "auto" == b.slidesPerView ? -a.slidesGrid[c] : -c * p;
				g < -h() && (g = -h());
				if (g == f) return !1;
				I(g, "to", {
					index: c,
					speed: d,
					runCallbacks: !1 === e ? !1 : !0
				});
				return !0
			}
		};
		a._queueStartCallbacks = !1;
		a._queueEndCallbacks = !1;
		a.updateActiveSlide =
			function (c) {
				if (a.initialized && 0 != a.slides.length) {
					a.previousIndex = a.activeIndex;
					0 < c && (c = 0);
					"undefined" == typeof c && (c = k ? a.getWrapperTranslate("x") : a.getWrapperTranslate("y"));
					if ("auto" == b.slidesPerView) {
						if (a.activeIndex = a.slidesGrid.indexOf(-c), 0 > a.activeIndex) {
							for (var d = 0; d < a.slidesGrid.length - 1 && !(-c > a.slidesGrid[d] && -c < a.slidesGrid[d + 1]); d++);
							var e = Math.abs(a.slidesGrid[d] + c),
								f = Math.abs(a.slidesGrid[d + 1] + c);
							a.activeIndex = e <= f ? d : d + 1
						}
					} else a.activeIndex = b.visibilityFullFit ? Math.ceil(-c / p) : Math.round(-c /
						p);
					a.activeIndex == a.slides.length && (a.activeIndex = a.slides.length - 1);
					0 > a.activeIndex && (a.activeIndex = 0);
					if (a.slides[a.activeIndex]) {
						a.calcVisibleSlides(c);
						e = RegExp("\\s*" + b.slideActiveClass);
						f = RegExp("\\s*" + b.slideVisibleClass);
						for (d = 0; d < a.slides.length; d++) a.slides[d].className = a.slides[d].className.replace(e, "").replace(f, ""), 0 <= a.visibleSlides.indexOf(a.slides[d]) && (a.slides[d].className += " " + b.slideVisibleClass);
						a.slides[a.activeIndex].className += " " + b.slideActiveClass;
						b.loop ? (d = a.loopedSlides,
							a.activeLoopIndex = a.activeIndex - d, a.activeLoopIndex >= a.slides.length - 2 * d && (a.activeLoopIndex = a.slides.length - 2 * d - a.activeLoopIndex), 0 > a.activeLoopIndex && (a.activeLoopIndex = a.slides.length - 2 * d + a.activeLoopIndex)) : a.activeLoopIndex = a.activeIndex;
						b.pagination && a.updatePagination(c)
					}
				}
			};
		a.createPagination = function (c) {
			b.paginationClickable && a.paginationButtons && U();
			var d = "",
				e = a.slides.length;
			b.loop && (e -= 2 * a.loopedSlides);
			for (var f = 0; f < e; f++) d += "<" + b.paginationElement + ' class="' + b.paginationElementClass +
				'"></' + b.paginationElement + ">";
			a.paginationContainer = b.pagination.nodeType ? b.pagination : g(b.pagination)[0];
			a.paginationContainer.innerHTML = d;
			a.paginationButtons = [];
			document.querySelectorAll ? a.paginationButtons = a.paginationContainer.querySelectorAll("." + b.paginationElementClass) : window.jQuery && (a.paginationButtons = g(a.paginationContainer).find("." + b.paginationElementClass));
			c || a.updatePagination();
			a.callPlugins("onCreatePagination");
			if (b.paginationClickable)
				for (c = a.paginationButtons, d = 0; d < c.length; d++) a.h.addEventListener(c[d],
					"click", V, !1)
		};
		a.updatePagination = function (c) {
			if (b.pagination && !(1 > a.slides.length)) {
				if (document.querySelectorAll) var d = a.paginationContainer.querySelectorAll("." + b.paginationActiveClass);
				else window.jQuery && (d = g(a.paginationContainer).find("." + b.paginationActiveClass));
				if (d && (d = a.paginationButtons, 0 != d.length)) {
					for (var e = 0; e < d.length; e++) d[e].className = b.paginationElementClass;
					var f = b.loop ? a.loopedSlides : 0;
					if (b.paginationAsRange) {
						a.visibleSlides || a.calcVisibleSlides(c);
						c = [];
						for (e = 0; e < a.visibleSlides.length; e++) {
							var h =
								a.slides.indexOf(a.visibleSlides[e]) - f;
							b.loop && 0 > h && (h = a.slides.length - 2 * a.loopedSlides + h);
							b.loop && h >= a.slides.length - 2 * a.loopedSlides && (h = a.slides.length - 2 * a.loopedSlides - h, h = Math.abs(h));
							c.push(h)
						}
						for (e = 0; e < c.length; e++) d[c[e]] && (d[c[e]].className += " " + b.paginationVisibleClass);
						b.loop ? d[a.activeLoopIndex].className += " " + b.paginationActiveClass : d[a.activeIndex].className += " " + b.paginationActiveClass
					} else b.loop ? d[a.activeLoopIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass :
						d[a.activeIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass
				}
			}
		};
		a.calcVisibleSlides = function (c) {
			var d = [],
				e = 0,
				f = 0,
				g = 0;
			k && 0 < a.wrapperLeft && (c += a.wrapperLeft);
			!k && 0 < a.wrapperTop && (c += a.wrapperTop);
			for (var h = 0; h < a.slides.length; h++) {
				var e = e + f,
					f = "auto" == b.slidesPerView ? k ? a.h.getWidth(a.slides[h], !0) : a.h.getHeight(a.slides[h], !0) : p,
					g = e + f,
					m = !1;
				b.visibilityFullFit ? (e >= -c && g <= -c + l && (m = !0), e <= -c && g >= -c + l && (m = !0)) : (g > -c && g <= -c + l && (m = !0), e >= -c && e < -c + l && (m = !0), e < -c && g > -c + l && (m = !0));
				m &&
					d.push(a.slides[h])
			}
			0 == d.length && (d = [a.slides[a.activeIndex]]);
			a.visibleSlides = d
		};
		a.autoPlayIntervalId = void 0;
		a.startAutoplay = function () {
			if ("undefined" !== typeof a.autoPlayIntervalId) return !1;
			b.autoplay && !b.loop && (a.autoPlayIntervalId = setInterval(function () {
				a.swipeNext(!0) || a.swipeTo(0)
			}, b.autoplay));
			b.autoplay && b.loop && (a.autoPlayIntervalId = setInterval(function () {
				a.swipeNext()
			}, b.autoplay));
			a.callPlugins("onAutoplayStart")
		};
		a.stopAutoplay = function () {
			a.autoPlayIntervalId && clearInterval(a.autoPlayIntervalId);
			a.autoPlayIntervalId = void 0;
			a.callPlugins("onAutoplayStop")
		};
		a.loopCreated = !1;
		a.removeLoopedSlides = function () {
			if (a.loopCreated)
				for (var b = 0; b < a.slides.length; b++) !0 === a.slides[b].getData("looped") && a.wrapper.removeChild(a.slides[b])
		};
		a.createLoop = function () {
			if (0 != a.slides.length) {
				a.loopedSlides = b.slidesPerView + b.loopAdditionalSlides;
				for (var c = "", d = "", e = 0; e < a.loopedSlides; e++) c += a.slides[e].outerHTML;
				for (e = a.slides.length - a.loopedSlides; e < a.slides.length; e++) d += a.slides[e].outerHTML;
				J.innerHTML = d + J.innerHTML +
					c;
				a.loopCreated = !0;
				a.calcSlides();
				for (e = 0; e < a.slides.length; e++)(e < a.loopedSlides || e >= a.slides.length - a.loopedSlides) && a.slides[e].setData("looped", !0);
				a.callPlugins("onCreateLoop")
			}
		};
		a.fixLoop = function () {
			if (a.activeIndex < a.loopedSlides) {
				var c = a.slides.length - 3 * a.loopedSlides + a.activeIndex;
				a.swipeTo(c, 0, !1)
			} else a.activeIndex > a.slides.length - 2 * b.slidesPerView && (c = -a.slides.length + a.activeIndex + a.loopedSlides, a.swipeTo(c, 0, !1))
		};
		a.loadSlides = function () {
			var c = "";
			a.activeLoaderIndex = 0;
			for (var d = b.loader.slides,
					e = b.loader.loadAllSlides ? d.length : b.slidesPerView * (1 + b.loader.surroundGroups), f = 0; f < e; f++) c = "outer" == b.loader.slidesHTMLType ? c + d[f] : c + ("<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + f + '">' + d[f] + "</" + b.slideElement + ">");
			a.wrapper.innerHTML = c;
			a.calcSlides(!0);
			b.loader.loadAllSlides || a.wrapperTransitionEnd(a.reloadSlides, !0)
		};
		a.reloadSlides = function () {
			var c = b.loader.slides,
				d = parseInt(a.activeSlide().data("swiperindex"), 10);
			if (!(0 > d || d > c.length - 1)) {
				a.activeLoaderIndex = d;
				var e = Math.max(0,
						d - b.slidesPerView * b.loader.surroundGroups),
					f = Math.min(d + b.slidesPerView * (1 + b.loader.surroundGroups) - 1, c.length - 1);
				0 < d && (d = -p * (d - e), k ? a.setWrapperTranslate(d, 0, 0) : a.setWrapperTranslate(0, d, 0), a.setWrapperTransition(0));
				if ("reload" === b.loader.logic) {
					for (var g = a.wrapper.innerHTML = "", d = e; d <= f; d++) g += "outer" == b.loader.slidesHTMLType ? c[d] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + d + '">' + c[d] + "</" + b.slideElement + ">";
					a.wrapper.innerHTML = g
				} else {
					for (var g = 1E3, h = 0, d = 0; d < a.slides.length; d++) {
						var l =
							a.slides[d].data("swiperindex");
						l < e || l > f ? a.wrapper.removeChild(a.slides[d]) : (g = Math.min(l, g), h = Math.max(l, h))
					}
					for (d = e; d <= f; d++) d < g && (e = document.createElement(b.slideElement), e.className = b.slideClass, e.setAttribute("data-swiperindex", d), e.innerHTML = c[d], a.wrapper.insertBefore(e, a.wrapper.firstChild)), d > h && (e = document.createElement(b.slideElement), e.className = b.slideClass, e.setAttribute("data-swiperindex", d), e.innerHTML = c[d], a.wrapper.appendChild(e))
				}
				a.reInit(!0)
			}
		};
		a.calcSlides();
		0 < b.loader.slides.length &&
			0 == a.slides.length && a.loadSlides();
		b.loop && a.createLoop();
		a.init();
		n();
		b.pagination && b.createPagination && a.createPagination(!0);
		b.loop || 0 < b.initialSlide ? a.swipeTo(b.initialSlide, 0, !1) : a.updateActiveSlide(0);
		b.autoplay && a.startAutoplay()
	}
};
Swiper.prototype = {
	plugins: {},
	wrapperTransitionEnd: function (f, b) {
		function g() {
			f(h);
			h.params.queueEndCallbacks && (h._queueEndCallbacks = !1);
			if (!b)
				for (var v = 0; v < t.length; v++) h.h.removeEventListener(n, t[v], g, !1)
		}
		var h = this,
			n = h.wrapper,
			t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
		if (f)
			for (var v = 0; v < t.length; v++) h.h.addEventListener(n, t[v], g, !1)
	},
	getWrapperTranslate: function (f) {
		var b = this.wrapper,
			g, h, n = window.WebKitCSSMatrix ? new WebKitCSSMatrix(window.getComputedStyle(b,
				null).webkitTransform) : window.getComputedStyle(b, null).MozTransform || window.getComputedStyle(b, null).OTransform || window.getComputedStyle(b, null).MsTransform || window.getComputedStyle(b, null).msTransform || window.getComputedStyle(b, null).transform || window.getComputedStyle(b, null).getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
		g = n.toString().split(",");
		this.params.useCSS3Transforms ? ("x" == f && (h = 16 == g.length ? parseFloat(g[12]) : window.WebKitCSSMatrix ? n.m41 : parseFloat(g[4])), "y" ==
			f && (h = 16 == g.length ? parseFloat(g[13]) : window.WebKitCSSMatrix ? n.m42 : parseFloat(g[5]))) : ("x" == f && (h = parseFloat(b.style.left, 10) || 0), "y" == f && (h = parseFloat(b.style.top, 10) || 0));
		return h || 0
	},
	setWrapperTranslate: function (f, b, g) {
		var h = this.wrapper.style;
		f = f || 0;
		b = b || 0;
		g = g || 0;
		this.params.useCSS3Transforms ? this.support.transforms3d ? h.webkitTransform = h.MsTransform = h.msTransform = h.MozTransform = h.OTransform = h.transform = "translate3d(" + f + "px, " + b + "px, " + g + "px)" : (h.webkitTransform = h.MsTransform = h.msTransform = h.MozTransform =
			h.OTransform = h.transform = "translate(" + f + "px, " + b + "px)", this.support.transforms || (h.left = f + "px", h.top = b + "px")) : (h.left = f + "px", h.top = b + "px");
		this.callPlugins("onSetWrapperTransform", {
			x: f,
			y: b,
			z: g
		})
	},
	setWrapperTransition: function (f) {
		var b = this.wrapper.style;
		b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = f / 1E3 + "s";
		this.callPlugins("onSetWrapperTransition", {
			duration: f
		})
	},
	h: {
		getWidth: function (f, b) {
			var g = window.getComputedStyle(f,
					null).getPropertyValue("width"),
				h = parseFloat(g);
			if (isNaN(h) || 0 < g.indexOf("%")) h = f.offsetWidth - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-right"));
			b && (h += parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-right")));
			return h
		},
		getHeight: function (f, b) {
			if (b) return f.offsetHeight;
			var g = window.getComputedStyle(f,
					null).getPropertyValue("height"),
				h = parseFloat(g);
			if (isNaN(h) || 0 < g.indexOf("%")) h = f.offsetHeight - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-bottom"));
			b && (h += parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(f, null).getPropertyValue("padding-bottom")));
			return h
		},
		getOffset: function (f) {
			var b = f.getBoundingClientRect(),
				g = document.body,
				h = f.clientTop ||
				g.clientTop || 0,
				g = f.clientLeft || g.clientLeft || 0,
				n = window.pageYOffset || f.scrollTop;
			f = window.pageXOffset || f.scrollLeft;
			document.documentElement && !window.pageYOffset && (n = document.documentElement.scrollTop, f = document.documentElement.scrollLeft);
			return {
				top: b.top + n - h,
				left: b.left + f - g
			}
		},
		windowWidth: function () {
			if (window.innerWidth) return window.innerWidth;
			if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth
		},
		windowHeight: function () {
			if (window.innerHeight) return window.innerHeight;
			if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight
		},
		windowScroll: function () {
			if ("undefined" != typeof pageYOffset) return {
				left: window.pageXOffset,
				top: window.pageYOffset
			};
			if (document.documentElement) return {
				left: document.documentElement.scrollLeft,
				top: document.documentElement.scrollTop
			}
		},
		addEventListener: function (f, b, g, h) {
			f.addEventListener ? f.addEventListener(b, g, h) : f.attachEvent && f.attachEvent("on" + b, g)
		},
		removeEventListener: function (f, b, g, h) {
			f.removeEventListener ?
				f.removeEventListener(b, g, h) : f.detachEvent && f.detachEvent("on" + b, g)
		}
	},
	setTransform: function (f, b) {
		var g = f.style;
		g.webkitTransform = g.MsTransform = g.msTransform = g.MozTransform = g.OTransform = g.transform = b
	},
	setTranslate: function (f, b) {
		var g = f.style,
			h = b.x || 0,
			n = b.y || 0,
			t = b.z || 0;
		g.webkitTransform = g.MsTransform = g.msTransform = g.MozTransform = g.OTransform = g.transform = this.support.transforms3d ? "translate3d(" + h + "px," + n + "px," + t + "px)" : "translate(" + h + "px," + n + "px)";
		this.support.transforms || (g.left = h + "px", g.top = n + "px")
	},
	setTransition: function (f, b) {
		var g = f.style;
		g.webkitTransitionDuration = g.MsTransitionDuration = g.msTransitionDuration = g.MozTransitionDuration = g.OTransitionDuration = g.transitionDuration = b + "ms"
	},
	support: {
		touch: window.Modernizr && !0 === Modernizr.touch || function () {
			return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
		}(),
		transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
			var f = document.createElement("div");
			return "webkitPerspective" in f.style || "MozPerspective" in
				f.style || "OPerspective" in f.style || "MsPerspective" in f.style || "perspective" in f.style
		}(),
		transforms: window.Modernizr && !0 === Modernizr.csstransforms || function () {
			var f = document.createElement("div").style;
			return "transform" in f || "WebkitTransform" in f || "MozTransform" in f || "msTransform" in f || "MsTransform" in f || "OTransform" in f
		}(),
		transitions: window.Modernizr && !0 === Modernizr.csstransitions || function () {
			var f = document.createElement("div").style;
			return "transition" in f || "WebkitTransition" in f || "MozTransition" in
				f || "msTransition" in f || "MsTransition" in f || "OTransition" in f
		}()
	},
	browser: {
		ie8: function () {
			var f = -1;
			"Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (f = parseFloat(RegExp.$1));
			return -1 != f && 9 > f
		}(),
		ie10: window.navigator.msPointerEnabled
	}
};
(window.jQuery || window.Zepto) && function (f) {
	f.fn.swiper = function (b) {
		b = new Swiper(f(this)[0], b);
		f(this).data("swiper", b);
		return b
	}
}(window.jQuery || window.Zepto);
"undefined" !== typeof module && (module.exports = Swiper);

/*
Plugin Name: socialShare
Version: 1.0
Plugin URI: https://github.com/tolgaergin/social
Description: To share any page with 46 icons 
Author: Tolga Ergin
Author URI: http://tolgaergin.com
Designer: GГ¶khun GГјneyhan
Designer URI: http://gokhunguneyhan.com
*/

/* PLUGIN USAGE */
/* 

$('#clickable').socialShare({
      social: 'blogger,delicious,digg,facebook,friendfeed,google,linkedin,myspace,pinterest,reddit,stumbleupon,tumblr,twitter,windows,yahoo'
    });

*/

(function ($) {
	$.fn.extend({
		socialShare: function (options) {
			var defaults = {
				social: '',
				title: document.title,
				shareUrl: window.location.href,
				description: $('meta[name="description"]').attr('content'),
				animation: 'launchpad',
				chainAnimationSpeed: 100,
				whenSelect: false,
				selectContainer: '.share-container',
				blur: false
			};
			var options = $.extend(true, defaults, options);
			var beforeDivs = '<div class="arthref arthrefSocialShare"><div class="overla ' + options.animation + '"><div class="icon-container"><div class="centered"><ul>';
			var afterDivs = '</ul></div></div></div></div>';
			return this.each(function () {
				var o = options;
				var obj = $(this);
				if (o.whenSelect) {
					$(o.selectContainer).mouseup(function (e) {
						var selection = getSelected();
						if (selection && (selection = new String(selection).replace(/^\s+|\s+$/g, ''))) {
							options.title = selection
						}
					})
				}
				obj.click(function () {
					createContainer();
					if (o.blur) {}
					setTimeout(function () {;
						$('.arthrefSocialShare').find('ul').addClass('active');
						if (o.animation == 'chain') chainAnimation($('.arthrefSocialShare').find('li'), o.chainAnimationSpeed, '1')
					}, 0)
				});
				$(document).on("click touchstart", ".arthrefSocialShare .overlay", function (e) {
					destroyContainer(o)
				});
				$(document).on("keydown", function (e) {
					if (e.keyCode == 27) destroyContainer(o)
				});
				$(document).on("click touchstart", ".arthrefSocialShare li", function (e) {
					e.stopPropagation()
				})
			});

			function getSelected() {
				if (window.getSelection) {
					return window.getSelection()
				} else if (document.getSelection) {
					return document.getSelection()
				} else {
					var selection = document.selection && document.selection.createRange();
					if (selection.text) {
						return selection.text
					}
					return false
				}
				return false
			};

			function chainAnimation(e, s, o) {
				var $fade = $(e);
				$fade.each(function (i) {
					$(this).delay(i * s).fadeTo(s, o)
				})
			};

			function createContainer() {
				var siteSettings = {
					'blogger': {
						text: 'Blogger',
						className: 'aBlogger',
						url: 'http://www.blogger.com/blog_this.pyra?t=&amp;u={u}&amp;n={t}'
					},
					'delicious': {
						text: 'Delicious',
						className: 'aDelicious',
						url: 'http://del.icio.us/post?url={u}&amp;title={t}'
					},
					'digg': {
						text: 'aDigg',
						className: 'Digg',
						url: 'http://digg.com/submit?phase=2&amp;url={u}&amp;title={t}'
					},
					'facebook': {
						text: 'Facebook',
						className: 'aFacebook',
						url: 'http://www.facebook.com/sharer.php?u={u}&amp;t={t}'
					},
					'friendfeed': {
						text: 'FriendFeed',
						className: 'aFriendFeed',
						url: 'http://friendfeed.com/share?url={u}&amp;title={t}'
					},
					'google': {
						text: 'Google Plus',
						className: 'aGooglePlus',
						url: 'https://plus.google.com/share?url={u}'
					},
					'linkedin': {
						text: 'LinkedIn',
						className: 'aLinkedIn',
						url: 'http://www.linkedin.com/shareArticle?mini=true&amp;url={u}&amp;title={t}&amp;ro=false&amp;summary={d}&amp;source='
					},
					'myspace': {
						text: 'MySpace',
						className: 'aMySpace',
						url: 'http://www.myspace.com/Modules/PostTo/Pages/?u={u}&amp;t={t}'
					},
					'pinterest': {
						text: 'Pinterest',
						className: 'aPinterest',
						url: 'http://pinterest.com/pin/create/button/?url={u}&amp;description={d}'
					},
					'reddit': {
						text: 'Reddit',
						className: 'aReddit',
						url: 'http://reddit.com/submit?url={u}&amp;title={t}'
					},
					'stumbleupon': {
						text: 'StumbleUpon',
						className: 'aStumbleUpon',
						url: 'http://www.stumbleupon.com/submit?url={u}&amp;title={t}'
					},
					'tumblr': {
						text: 'Tumblr',
						className: 'aTumblr',
						url: 'http://www.tumblr.com/share/link?url={u}&name={t}&description={d}'
					},
					'twitter': {
						text: 'Twitter',
						className: 'aTwitter',
						url: 'http://twitter.com/home?status={t}%20{u}'
					},
					'windows': {
						text: 'Windows',
						className: 'aWindows',
						url: 'http://profile.live.com/badge?url={u}'
					},
					'yahoo': {
						text: 'Yahoo',
						className: 'aYahoo',
						url: 'http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&amp;u={u}&amp;t={t}'
					}
				};
				var sites = options.social.split(',');
				var listItem = '';
				for (var i = 0; i <= sites.length - 1; i++) {
					siteSettings[sites[i]]['url'] = siteSettings[sites[i]]['url'].replace('{t}', encodeURIComponent(options.title)).replace('{u}', encodeURI(options.shareUrl)).replace('{d}', encodeURIComponent(options.description));
					listItem += '<li><a href="' + siteSettings[sites[i]]['url'] + '" target="_blank" rel="nofollow" class="' + siteSettings[sites[i]]['className'] + '"></a><span class="transition">' + siteSettings[sites[i]]['text'] + '</span></li>'
				};
				$('.share-container').append(beforeDivs + listItem + afterDivs)
			}

			function destroyContainer(o) {
				if (o.blur) $('.share-container').children().removeClass('blurred');
				$('.arthrefSocialShare').find('.overlay').removeClass('active');
				$('.arthrefSocialShare').find('ul').removeClass('active');
				setTimeout(function () {
					$('.arthrefSocialShare').remove()
				}, 300)
			}
		}
	})
})(jQuery);
/**
	/*
	 *
	 *	jQuery Sliding Menu Plugin
	 *	Mobile app list-style navigation in the browser
	 *
	 *	Written by Ali Zahid
	 *	http://alizahid.github.io/jquery-sliding-menu/
	 *
	 */
(function ($) {
	var usedIds = [];
	$.fn.menu = function (options) {
		var selector = this.selector;
		var settings = $.extend({
			dataJSON: false,
			backLabel: 'Back'
		}, options);
		return this.each(function () {
			var self = this,
				menu = $(self),
				data;
			if (menu.hasClass('sliding-menu')) {
				return
			}
			var menuWidth = menu.width();
			if (settings.dataJSON) {
				data = processJSON(settings.dataJSON)
			} else {
				data = process(menu)
			}
			menu.empty().addClass('sliding-menu');
			var rootPanel;
			if (settings.dataJSON) {
				$(data).each(function (index, item) {
					var panel = $('<ul></ul>');
					if (item.root) {
						rootPanel = '#' + item.id
					}
					panel.attr('id', item.id);
					panel.addClass('menu-panel');
					panel.width(menuWidth);
					$(item.children).each(function (index, item) {
						var link = $('<a></a>');
						link.attr('class', item.styleClass);
						link.attr('href', item.href);
						link.text(item.label);
						var li = $('<li></li>');
						li.append(link);
						panel.append(li)
					});
					menu.append(panel)
				})
			} else {
				$(data).each(function (index, item) {
					var panel = $(item);
					if (panel.hasClass('menu-panel-root')) {
						rootPanel = '#' + panel.attr('id')
					}
					panel.width(menuWidth);
					menu.append(item)
				})
			}
			rootPanel = $(rootPanel);
			rootPanel.addClass('menu-panel-root');
			var currentPanel = rootPanel;
			menu.height(rootPanel.height());
			var wrapper = $('<div></div>').addClass('sliding-menu-wrapper').width(data.length * menuWidth);
			menu.wrapInner(wrapper);
			wrapper = $('.sliding-menu-wrapper', menu);
			$('a', self).on('click', function (e) {
				var href = $(this).attr('href'),
					label = $(this).text();
				if (wrapper.is(':animated')) {
					e.preventDefault();
					return
				}
				if (href == '#') {
					e.preventDefault()
				} else if (href.indexOf('#menu-panel') == 0) {
					var target = $(href),
						isBack = $(this).hasClass('back'),
						marginLeft = parseInt(wrapper.css('margin-left'));
					if (isBack) {
						if (href == '#menu-panel-back') {
							target = currentPanel.prev()
						}
						wrapper.stop(true, true).animate({
							marginLeft: marginLeft + menuWidth
						}, 'fast')
					} else {
						target.insertAfter(currentPanel);
						if (settings.backLabel === true) {
							$('.back', target).text(label)
						} else {
							$('.back', target).text(settings.backLabel)
						}
						wrapper.stop(true, true).animate({
							marginLeft: marginLeft - menuWidth
						}, 'fast')
					}
					currentPanel = target;
					menu.stop(true, true).animate({
						height: target.height()
					}, 'fast');
					e.preventDefault()
				}
			});
			return this
		});

		function process(data) {
			var ul = $('ul', data),
				panels = [];
			$(ul).each(function (index, item) {
				var panel = $(item),
					handler = panel.prev(),
					id = getNewId();
				if (handler.length == 1) {
					handler.addClass('nav').attr('href', '#menu-panel-' + id)
				}
				panel.attr('id', 'menu-panel-' + id);
				if (index == 0) {
					panel.addClass('menu-panel-root')
				} else {
					panel.addClass('menu-panel');
					var li = $('<li></li>'),
						back = $('<a></a>').addClass('back').attr('href', '#menu-panel-back');
					panel.prepend(back)
				}
				panels.push(item)
			});
			return panels
		}

		function processJSON(data, parent) {
			var root = {
					id: 'menu-panel-' + getNewId(),
					children: [],
					root: (parent ? false : true)
				},
				panels = [];
			if (parent) {
				root.children.push({
					styleClass: 'back',
					href: '#' + parent.id
				})
			}
			$(data).each(function (index, item) {
				root.children.push(item);
				if (item.children) {
					var panel = processJSON(item.children, root);
					item.href = '#' + panel[0].id;
					item.styleClass = 'nav';
					panels = panels.concat(panel)
				}
			});
			return [root].concat(panels)
		}

		function getNewId() {
			var id;
			do {
				id = Math.random().toString(36).substring(3, 8)
			} while (usedIds.indexOf(id) >= 0);
			usedIds.push(id);
			return id
		}
	}
}(jQuery));

/*! Magnific Popup - v0.9.9 - 2013-12-27
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2013 Dmitry Semenov; */
(function (e) {
	var t, n, i, o, r, a, s, l = "Close",
		c = "BeforeClose",
		d = "AfterClose",
		u = "BeforeAppend",
		p = "MarkupParse",
		f = "Open",
		m = "Change",
		g = "mfp",
		h = "." + g,
		v = "mfp-ready",
		C = "mfp-removing",
		y = "mfp-prevent-close",
		w = function () {},
		b = !!window.jQuery,
		I = e(window),
		x = function (e, n) {
			t.ev.on(g + e + h, n)
		},
		k = function (t, n, i, o) {
			var r = document.createElement("div");
			return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
		},
		T = function (n, i) {
			t.ev.triggerHandler(g + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
		},
		E = function (n) {
			return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
		},
		_ = function () {
			e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
		},
		S = function () {
			var e = document.createElement("p").style,
				t = ["ms", "O", "Moz", "Webkit"];
			if (void 0 !== e.transition) return !0;
			for (; t.length;)
				if (t.pop() + "Transition" in e) return !0;
			return !1
		};
	w.prototype = {
		constructor: w,
		init: function () {
			var n = navigator.appVersion;
			t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
		},
		open: function (n) {
			i || (i = e(document.body));
			var r;
			if (n.isObj === !1) {
				t.items = n.items.toArray(), t.index = 0;
				var s, l = n.items;
				for (r = 0; l.length > r; r++)
					if (s = l[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
						t.index = r;
						break
					}
			} else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
			if (t.isOpen) return t.updateItemHTML(), void 0;
			t.types = [], a = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + h, function () {
				t.close()
			}), t.wrap = k("wrap").attr("tabindex", -1).on("click" + h, function (e) {
				t._checkIfClose(e.target) && t.close()
			}), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
			var c = e.magnificPopup.modules;
			for (r = 0; c.length > r; r++) {
				var d = c[r];
				d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
			}
			T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function (e, t, n, i) {
				n.close_replaceWith = E(i.type)
			}), a += " mfp-close-btn-in") : t.wrap.append(E())), t.st.alignTop && (a += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
				overflow: t.st.overflowY,
				overflowX: "hidden",
				overflowY: t.st.overflowY
			}) : t.wrap.css({
				top: I.scrollTop(),
				position: "absolute"
			}), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
				height: o.height(),
				position: "absolute"
			}), t.st.enableEscapeKey && o.on("keyup" + h, function (e) {
				27 === e.keyCode && t.close()
			}), I.on("resize" + h, function () {
				t.updateSize()
			}), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
			var u = t.wH = I.height(),
				m = {};
			if (t.fixedContentPos && t._hasScrollBar(u)) {
				var g = t._getScrollbarSize();
				g && (m.marginRight = g)
			}
			t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : m.overflow = "hidden");
			var C = t.st.mainClass;
			return t.isIE7 && (C += " mfp-ie7"), C && t._addClassToMFP(C), t.updateItemHTML(), T("BuildControls"), e("html").css(m), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i), t._lastFocusedEl = document.activeElement, setTimeout(function () {
				t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), o.on("focusin" + h, t._onFocusIn)
			}, 16), t.isOpen = !0, t.updateSize(u), T(f), n
		},
		close: function () {
			t.isOpen && (T(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(C), setTimeout(function () {
				t._close()
			}, t.st.removalDelay)) : t._close())
		},
		_close: function () {
			T(l);
			var n = C + " " + v + " ";
			if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
				var i = {
					marginRight: ""
				};
				t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
			}
			o.off("keyup" + h + " focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T(d)
		},
		updateSize: function (e) {
			if (t.isIOS) {
				var n = document.documentElement.clientWidth / window.innerWidth,
					i = window.innerHeight * n;
				t.wrap.css("height", i), t.wH = i
			} else t.wH = e || I.height();
			t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
		},
		updateItemHTML: function () {
			var n = t.items[t.index];
			t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
			var i = n.type;
			if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
				var o = t.st[i] ? t.st[i].markup : !1;
				T("FirstMarkupParse", o), t.currTemplate[i] = o ? e(o) : !0
			}
			r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
			var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
			t.appendContent(a, i), n.preloaded = !0, T(m, n), r = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
		},
		appendContent: function (e, n) {
			t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "", T(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
		},
		parseEl: function (n) {
			var i, o = t.items[n];
			if (o.tagName ? o = {
					el: e(o)
				} : (i = o.type, o = {
					data: o,
					src: o.src
				}), o.el) {
				for (var r = t.types, a = 0; r.length > a; a++)
					if (o.el.hasClass("mfp-" + r[a])) {
						i = r[a];
						break
					}
				o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
			}
			return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, T("ElementParse", o), t.items[n]
		},
		addGroup: function (e, n) {
			var i = function (i) {
				i.mfpEl = this, t._openClick(i, e, n)
			};
			n || (n = {});
			var o = "click.magnificPopup";
			n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
		},
		_openClick: function (n, i, o) {
			var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
			if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
				var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
				if (a)
					if (e.isFunction(a)) {
						if (!a.call(t)) return !0
					} else if (a > I.width()) return !0;
				n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
			}
		},
		updateStatus: function (e, i) {
			if (t.preloader) {
				n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
				var o = {
					status: e,
					text: i
				};
				T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function (e) {
					e.stopImmediatePropagation()
				}), t.container.addClass("mfp-s-" + e), n = e
			}
		},
		_checkIfClose: function (n) {
			if (!e(n).hasClass(y)) {
				var i = t.st.closeOnContentClick,
					o = t.st.closeOnBgClick;
				if (i && o) return !0;
				if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
				if (n === t.content[0] || e.contains(t.content[0], n)) {
					if (i) return !0
				} else if (o && e.contains(document, n)) return !0;
				return !1
			}
		},
		_addClassToMFP: function (e) {
			t.bgOverlay.addClass(e), t.wrap.addClass(e)
		},
		_removeClassFromMFP: function (e) {
			this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
		},
		_hasScrollBar: function (e) {
			return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
		},
		_setFocus: function () {
			(t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
		},
		_onFocusIn: function (n) {
			return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
		},
		_parseMarkup: function (t, n, i) {
			var o;
			i.data && (n = e.extend(i.data, n)), T(p, [t, n, i]), e.each(n, function (e, n) {
				if (void 0 === n || n === !1) return !0;
				if (o = e.split("_"), o.length > 1) {
					var i = t.find(h + "-" + o[0]);
					if (i.length > 0) {
						var r = o[1];
						"replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
					}
				} else t.find(h + "-" + e).html(n)
			})
		},
		_getScrollbarSize: function () {
			if (void 0 === t.scrollbarSize) {
				var e = document.createElement("div");
				e.id = "mfp-sbm", e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
			}
			return t.scrollbarSize
		}
	}, e.magnificPopup = {
		instance: null,
		proto: w.prototype,
		modules: [],
		open: function (t, n) {
			return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
		},
		close: function () {
			return e.magnificPopup.instance && e.magnificPopup.instance.close()
		},
		registerModule: function (t, n) {
			n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
		},
		defaults: {
			disableOn: 0,
			key: null,
			midClick: !1,
			mainClass: "",
			preloader: !0,
			focus: "",
			closeOnContentClick: !1,
			closeOnBgClick: !0,
			closeBtnInside: !0,
			showCloseBtn: !0,
			enableEscapeKey: !0,
			modal: !1,
			alignTop: !1,
			removalDelay: 0,
			prependTo: null,
			fixedContentPos: "auto",
			fixedBgPos: "auto",
			overflowY: "auto",
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
			tClose: "Close (Esc)",
			tLoading: "Loading..."
		}
	}, e.fn.magnificPopup = function (n) {
		_();
		var i = e(this);
		if ("string" == typeof n)
			if ("open" === n) {
				var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup,
					a = parseInt(arguments[1], 10) || 0;
				r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
					mfpEl: o
				}, i, r)
			} else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
		else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
		return i
	};
	var P, O, z, M = "inline",
		B = function () {
			z && (O.after(z.addClass(P)).detach(), z = null)
		};
	e.magnificPopup.registerModule(M, {
		options: {
			hiddenClass: "hide",
			markup: "",
			tNotFound: "Content not found"
		},
		proto: {
			initInline: function () {
				t.types.push(M), x(l + "." + M, function () {
					B()
				})
			},
			getInline: function (n, i) {
				if (B(), n.src) {
					var o = t.st.inline,
						r = e(n.src);
					if (r.length) {
						var a = r[0].parentNode;
						a && a.tagName && (O || (P = o.hiddenClass, O = k(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
					} else t.updateStatus("error", o.tNotFound), r = e("<div>");
					return n.inlineElement = r, r
				}
				return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
			}
		}
	});
	var F, H = "ajax",
		L = function () {
			F && i.removeClass(F)
		},
		A = function () {
			L(), t.req && t.req.abort()
		};
	e.magnificPopup.registerModule(H, {
		options: {
			settings: null,
			cursor: "mfp-ajax-cur",
			tError: '<a href="%url%">The content</a> could not be loaded.'
		},
		proto: {
			initAjax: function () {
				t.types.push(H), F = t.st.ajax.cursor, x(l + "." + H, A), x("BeforeChange." + H, A)
			},
			getAjax: function (n) {
				F && i.addClass(F), t.updateStatus("loading");
				var o = e.extend({
					url: n.src,
					success: function (i, o, r) {
						var a = {
							data: i,
							xhr: r
						};
						T("ParseAjax", a), t.appendContent(e(a.data), H), n.finished = !0, L(), t._setFocus(), setTimeout(function () {
							t.wrap.addClass(v)
						}, 16), t.updateStatus("ready"), T("AjaxContentAdded")
					},
					error: function () {
						L(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
					}
				}, t.st.ajax.settings);
				return t.req = e.ajax(o), ""
			}
		}
	});
	var j, N = function (n) {
		if (n.data && void 0 !== n.data.title) return n.data.title;
		var i = t.st.image.titleSrc;
		if (i) {
			if (e.isFunction(i)) return i.call(t, n);
			if (n.el) return n.el.attr(i) || ""
		}
		return ""
	};
	e.magnificPopup.registerModule("image", {
		options: {
			markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
			cursor: "mfp-zoom-out-cur",
			titleSrc: "title",
			verticalFit: !0,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		},
		proto: {
			initImage: function () {
				var e = t.st.image,
					n = ".image";
				t.types.push("image"), x(f + n, function () {
					"image" === t.currItem.type && e.cursor && i.addClass(e.cursor)
				}), x(l + n, function () {
					e.cursor && i.removeClass(e.cursor), I.off("resize" + h)
				}), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
			},
			resizeImage: function () {
				var e = t.currItem;
				if (e && e.img && t.st.image.verticalFit) {
					var n = 0;
					t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
				}
			},
			_onImageHasSize: function (e) {
				e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
			},
			findImageSize: function (e) {
				var n = 0,
					i = e.img[0],
					o = function (r) {
						j && clearInterval(j), j = setInterval(function () {
							return i.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(j), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0)
						}, r)
					};
				o(1)
			},
			getImage: function (n, i) {
				var o = 0,
					r = function () {
						n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
					},
					a = function () {
						n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
					},
					s = t.st.image,
					l = i.find(".mfp-img");
				if (l.length) {
					var c = document.createElement("img");
					c.className = "mfp-img", n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
				}
				return t._parseMarkup(i, {
					title: N(n),
					img_replaceWith: n.img
				}, n), t.resizeImage(), n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
			}
		}
	});
	var W, R = function () {
		return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W
	};
	e.magnificPopup.registerModule("zoom", {
		options: {
			enabled: !1,
			easing: "ease-in-out",
			duration: 300,
			opener: function (e) {
				return e.is("img") ? e : e.find("img")
			}
		},
		proto: {
			initZoom: function () {
				var e, n = t.st.zoom,
					i = ".zoom";
				if (n.enabled && t.supportsTransition) {
					var o, r, a = n.duration,
						s = function (e) {
							var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
								i = "all " + n.duration / 1e3 + "s " + n.easing,
								o = {
									position: "fixed",
									zIndex: 9999,
									left: 0,
									top: 0,
									"-webkit-backface-visibility": "hidden"
								},
								r = "transition";
							return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
						},
						d = function () {
							t.content.css("visibility", "visible")
						};
					x("BuildControls" + i, function () {
						if (t._allowZoom()) {
							if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return d(), void 0;
							r = s(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function () {
								r.css(t._getOffset(!0)), o = setTimeout(function () {
									d(), setTimeout(function () {
										r.remove(), e = r = null, T("ZoomAnimationEnded")
									}, 16)
								}, a)
							}, 16)
						}
					}), x(c + i, function () {
						if (t._allowZoom()) {
							if (clearTimeout(o), t.st.removalDelay = a, !e) {
								if (e = t._getItemToZoom(), !e) return;
								r = s(e)
							}
							r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function () {
								r.css(t._getOffset())
							}, 16)
						}
					}), x(l + i, function () {
						t._allowZoom() && (d(), r && r.remove(), e = null)
					})
				}
			},
			_allowZoom: function () {
				return "image" === t.currItem.type
			},
			_getItemToZoom: function () {
				return t.currItem.hasSize ? t.currItem.img : !1
			},
			_getOffset: function (n) {
				var i;
				i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
				var o = i.offset(),
					r = parseInt(i.css("padding-top"), 10),
					a = parseInt(i.css("padding-bottom"), 10);
				o.top -= e(window).scrollTop() - r;
				var s = {
					width: i.width(),
					height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r
				};
				return R() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
			}
		}
	});
	var Z = "iframe",
		q = "//about:blank",
		D = function (e) {
			if (t.currTemplate[Z]) {
				var n = t.currTemplate[Z].find("iframe");
				n.length && (e || (n[0].src = q), t.isIE8 && n.css("display", e ? "block" : "none"))
			}
		};
	e.magnificPopup.registerModule(Z, {
		options: {
			markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
			srcAction: "iframe_src",
			patterns: {
				youtube: {
					index: "youtube.com",
					id: "v=",
					src: "//www.youtube.com/embed/%id%?autoplay=1"
				},
				vimeo: {
					index: "vimeo.com/",
					id: "/",
					src: "//player.vimeo.com/video/%id%?autoplay=1"
				},
				gmaps: {
					index: "//maps.google.",
					src: "%id%&output=embed"
				}
			}
		},
		proto: {
			initIframe: function () {
				t.types.push(Z), x("BeforeChange", function (e, t, n) {
					t !== n && (t === Z ? D() : n === Z && D(!0))
				}), x(l + "." + Z, function () {
					D()
				})
			},
			getIframe: function (n, i) {
				var o = n.src,
					r = t.st.iframe;
				e.each(r.patterns, function () {
					return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
				});
				var a = {};
				return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
			}
		}
	});
	var K = function (e) {
			var n = t.items.length;
			return e > n - 1 ? e - n : 0 > e ? n + e : e
		},
		Y = function (e, t, n) {
			return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
		};
	e.magnificPopup.registerModule("gallery", {
		options: {
			enabled: !1,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [0, 2],
			navigateByImgClick: !0,
			arrows: !0,
			tPrev: "Previous (Left arrow key)",
			tNext: "Next (Right arrow key)",
			tCounter: "%curr% of %total%"
		},
		proto: {
			initGallery: function () {
				var n = t.st.gallery,
					i = ".mfp-gallery",
					r = Boolean(e.fn.mfpFastClick);
				return t.direction = !0, n && n.enabled ? (a += " mfp-gallery", x(f + i, function () {
					n.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function () {
						return t.items.length > 1 ? (t.next(), !1) : void 0
					}), o.on("keydown" + i, function (e) {
						37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
					})
				}), x("UpdateStatus" + i, function (e, n) {
					n.text && (n.text = Y(n.text, t.currItem.index, t.items.length))
				}), x(p + i, function (e, i, o, r) {
					var a = t.items.length;
					o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ""
				}), x("BuildControls" + i, function () {
					if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
						var i = n.arrowMarkup,
							o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
							a = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
							s = r ? "mfpFastClick" : "click";
						o[s](function () {
							t.prev()
						}), a[s](function () {
							t.next()
						}), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", a[0], !1, !0), k("a", a[0], !1, !0)), t.container.append(o.add(a))
					}
				}), x(m + i, function () {
					t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
						t.preloadNearbyImages(), t._preloadTimeout = null
					}, 16)
				}), x(l + i, function () {
					o.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
				}), void 0) : !1
			},
			next: function () {
				t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML()
			},
			prev: function () {
				t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML()
			},
			goTo: function (e) {
				t.direction = e >= t.index, t.index = e, t.updateItemHTML()
			},
			preloadNearbyImages: function () {
				var e, n = t.st.gallery.preload,
					i = Math.min(n[0], t.items.length),
					o = Math.min(n[1], t.items.length);
				for (e = 1;
					(t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e);
				for (e = 1;
					(t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
			},
			_preloadItem: function (n) {
				if (n = K(n), !t.items[n].preloaded) {
					var i = t.items[n];
					i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
						i.hasSize = !0
					}).on("error.mfploader", function () {
						i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i)
					}).attr("src", i.src)), i.preloaded = !0
				}
			}
		}
	});
	var U = "retina";
	e.magnificPopup.registerModule(U, {
			options: {
				replaceSrc: function (e) {
					return e.src.replace(/\.\w+$/, function (e) {
						return "@2x" + e
					})
				},
				ratio: 1
			},
			proto: {
				initRetina: function () {
					if (window.devicePixelRatio > 1) {
						var e = t.st.retina,
							n = e.ratio;
						n = isNaN(n) ? n() : n, n > 1 && (x("ImageHasSize." + U, function (e, t) {
							t.img.css({
								"max-width": t.img[0].naturalWidth / n,
								width: "100%"
							})
						}), x("ElementParse." + U, function (t, i) {
							i.src = e.replaceSrc(i, n)
						}))
					}
				}
			}
		}),
		function () {
			var t = 1e3,
				n = "ontouchstart" in window,
				i = function () {
					I.off("touchmove" + r + " touchend" + r)
				},
				o = "mfpFastClick",
				r = "." + o;
			e.fn.mfpFastClick = function (o) {
				return e(this).each(function () {
					var a, s = e(this);
					if (n) {
						var l, c, d, u, p, f;
						s.on("touchstart" + r, function (e) {
							u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, I.on("touchmove" + r, function (e) {
								p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i())
							}).on("touchend" + r, function (e) {
								i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function () {
									a = !1
								}, t), o())
							})
						})
					}
					s.on("click" + r, function () {
						a || o()
					})
				})
			}, e.fn.destroyMfpFastClick = function () {
				e(this).off("touchstart" + r + " click" + r), n && I.off("touchmove" + r + " touchend" + r)
			}
		}(), _()
})(window.jQuery || window.Zepto);
/**
 jQuery.kinetic v2.0.4
 Dave Taylor http://davetayls.me

 @license The MIT License (MIT)
 @preserve Copyright (c) 2012 Dave Taylor http://davetayls.me
 */
(function (e) {
	"use strict";
	var t = "kinetic-active";
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function () {
			return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
				window.setTimeout(e, 1e3 / 60)
			}
		}()
	}
	e.support = e.support || {};
	e.extend(e.support, {
		touch: "ontouchend" in document
	});
	var n = function () {
		return false
	};
	var r = function (t, n) {
		this.settings = n;
		this.el = t;
		this.$el = e(t);
		this._initElements();
		return this
	};
	r.DATA_KEY = "kinetic";
	r.DEFAULTS = {
		cursor: "",
		decelerate: true,
		triggerHardware: false,
		y: true,
		x: true,
		slowdown: .9,
		maxvelocity: 40,
		throttleFPS: 60,
		movingClass: {
			up: "kinetic-moving-up",
			down: "kinetic-moving-down",
			left: "kinetic-moving-left",
			right: "kinetic-moving-right"
		},
		deceleratingClass: {
			up: "kinetic-decelerating-up",
			down: "kinetic-decelerating-down",
			left: "kinetic-decelerating-left",
			right: "kinetic-decelerating-right"
		}
	};
	r.prototype.start = function (t) {
		this.settings = e.extend(this.settings, t);
		this.velocity = t.velocity || this.velocity;
		this.velocityY = t.velocityY || this.velocityY;
		this.settings.decelerate = false;
		this._move()
	};
	r.prototype.end = function () {
		this.settings.decelerate = true
	};
	r.prototype.stop = function () {
		this.velocity = 0;
		this.velocityY = 0;
		this.settings.decelerate = true;
		if (e.isFunction(this.settings.stopped)) {
			this.settings.stopped.call(this)
		}
	};
	r.prototype.detach = function () {
		this._detachListeners();
		this.$el.removeClass(t).css("cursor", "")
	};
	r.prototype.attach = function () {
		if (this.$el.hasClass(t)) {
			return
		}
		this._attachListeners(this.$el);
		this.$el.addClass(t).css("cursor", this.settings.cursor)
	};
	r.prototype._initElements = function () {
		this.$el.addClass(t);
		e.extend(this, {
			xpos: null,
			prevXPos: false,
			ypos: null,
			prevYPos: false,
			mouseDown: false,
			throttleTimeout: 1e3 / this.settings.throttleFPS,
			lastMove: null,
			elementFocused: null
		});
		this.velocity = 0;
		this.velocityY = 0;
		e(document).mouseup(e.proxy(this._resetMouse, this)).click(e.proxy(this._resetMouse, this));
		this._initEvents();
		this.$el.css("cursor", this.settings.cursor);
		if (this.settings.triggerHardware) {
			this.$el.css({
				"-webkit-transform": "translate3d(0,0,0)",
				"-webkit-perspective": "1000",
				"-webkit-backface-visibility": "hidden"
			})
		}
	};
	r.prototype._initEvents = function () {
		var t = this;
		this.settings.events = {
			touchStart: function (e) {
				var n;
				if (t._useTarget(e.target, e)) {
					n = e.originalEvent.touches[0];
					t._start(n.clientX, n.clientY);
					e.stopPropagation()
				}
			},
			touchMove: function (e) {
				var n;
				if (t.mouseDown) {
					n = e.originalEvent.touches[0];
					t._inputmove(n.clientX, n.clientY);
					if (e.preventDefault) {
						e.preventDefault()
					}
				}
			},
			inputDown: function (e) {
				if (t._useTarget(e.target, e)) {
					t._start(e.clientX, e.clientY);
					t.elementFocused = e.target;
					if (e.target.nodeName === "IMG") {
						e.preventDefault()
					}
					e.stopPropagation()
				}
			},
			inputEnd: function (e) {
				if (t._useTarget(e.target, e)) {
					t._end();
					t.elementFocused = null;
					if (e.preventDefault) {
						e.preventDefault()
					}
				}
			},
			inputMove: function (e) {
				if (t.mouseDown) {
					t._inputmove(e.clientX, e.clientY);
					if (e.preventDefault) {
						e.preventDefault()
					}
				}
			},
			scroll: function (n) {
				if (e.isFunction(t.settings.moved)) {
					t.settings.moved.call(t, t.settings)
				}
				if (n.preventDefault) {
					n.preventDefault()
				}
			},
			inputClick: function (e) {
				if (Math.abs(t.velocity) > 0) {
					e.preventDefault();
					return false
				}
			},
			dragStart: function (e) {
				if (t._useTarget(e.target, e) && t.elementFocused) {
					return false
				}
			}
		};
		this._attachListeners(this.$el, this.settings)
	};
	r.prototype._inputmove = function (t, n) {
		var r = this.$el;
		var i = this.el;
		if (!this.lastMove || new Date > new Date(this.lastMove.getTime() + this.throttleTimeout)) {
			this.lastMove = new Date;
			if (this.mouseDown && (this.xpos || this.ypos)) {
				if (this.elementFocused) {
					e(this.elementFocused).blur();
					this.elementFocused = null;
					r.focus()
				}
				this.settings.decelerate = false;
				this.velocity = this.velocityY = 0;
				var s = this.scrollLeft();
				var o = this.scrollTop();
				var u = t - this.xpos;
				var a = n - this.ypos;
				this.scrollLeft(this.settings.x ? s - u : s);
				this.scrollTop(this.settings.y ? o - a : o);
				this.prevXPos = this.xpos;
				this.prevYPos = this.ypos;
				this.xpos = t;
				this.ypos = n;
				this._calculateVelocities();
				this._setMoveClasses(this.settings.movingClass);
				if (e.isFunction(this.settings.moved)) {
					this.settings.moved.call(r, this.settings)
				}
			}
		}
	};
	r.prototype._calculateVelocities = function () {
		this.velocity = this._capVelocity(this.prevXPos - this.xpos, this.settings.maxvelocity);
		this.velocityY = this._capVelocity(this.prevYPos - this.ypos, this.settings.maxvelocity)
	};
	r.prototype._end = function () {
		if (this.xpos && this.prevXPos && this.settings.decelerate === false) {
			this.settings.decelerate = true;
			this._calculateVelocities();
			this.xpos = this.prevXPos = this.mouseDown = false;
			this._move()
		}
	};
	r.prototype._useTarget = function (t, n) {
		if (e.isFunction(this.settings.filterTarget)) {
			return this.settings.filterTarget.call(this, t, n) !== false
		}
		return true
	};
	r.prototype._start = function (e, t) {
		this.mouseDown = true;
		this.velocity = this.prevXPos = 0;
		this.velocityY = this.prevYPos = 0;
		this.xpos = e;
		this.ypos = t
	};
	r.prototype._resetMouse = function () {
		this.xpos = false;
		this.ypos = false;
		this.mouseDown = false
	};
	r.prototype._decelerateVelocity = function (e, t) {
		return Math.floor(Math.abs(e)) === 0 ? 0 : e * t
	};
	r.prototype._capVelocity = function (e, t) {
		var n = e;
		if (e > 0) {
			if (e > t) {
				n = t
			}
		} else {
			if (e < 0 - t) {
				n = 0 - t
			}
		}
		return n
	};
	r.prototype._setMoveClasses = function (e) {
		var t = this.settings;
		var n = this.$el;
		n.removeClass(t.movingClass.up).removeClass(t.movingClass.down).removeClass(t.movingClass.left).removeClass(t.movingClass.right).removeClass(t.deceleratingClass.up).removeClass(t.deceleratingClass.down).removeClass(t.deceleratingClass.left).removeClass(t.deceleratingClass.right);
		if (this.velocity > 0) {
			n.addClass(e.right)
		}
		if (this.velocity < 0) {
			n.addClass(e.left)
		}
		if (this.velocityY > 0) {
			n.addClass(e.down)
		}
		if (this.velocityY < 0) {
			n.addClass(e.up)
		}
	};
	r.prototype._move = function () {
		var t = this.$el;
		var n = this.el;
		var r = this;
		var i = r.settings;
		if (i.x && n.scrollWidth > 0) {
			this.scrollLeft(this.scrollLeft() + this.velocity);
			if (Math.abs(this.velocity) > 0) {
				this.velocity = i.decelerate ? r._decelerateVelocity(this.velocity, i.slowdown) : this.velocity
			}
		} else {
			this.velocity = 0
		}
		if (i.y && n.scrollHeight > 0) {
			this.scrollTop(this.scrollTop() + this.velocityY);
			if (Math.abs(this.velocityY) > 0) {
				this.velocityY = i.decelerate ? r._decelerateVelocity(this.velocityY, i.slowdown) : this.velocityY
			}
		} else {
			this.velocityY = 0
		}
		r._setMoveClasses(i.deceleratingClass);
		if (e.isFunction(i.moved)) {
			i.moved.call(this, i)
		}
		if (Math.abs(this.velocity) > 0 || Math.abs(this.velocityY) > 0) {
			if (!this.moving) {
				this.moving = true;
				window.requestAnimationFrame(function () {
					r.moving = false;
					r._move()
				})
			}
		} else {
			r.stop()
		}
	};
	r.prototype._getScroller = function () {
		var t = this.$el;
		if (this.$el.is("body") || this.$el.is("html")) {
			t = e(window)
		}
		return t
	};
	r.prototype.scrollLeft = function (e) {
		var t = this._getScroller();
		if (typeof e === "number") {
			t.scrollLeft(e);
			this.settings.scrollLeft = e
		} else {
			return t.scrollLeft()
		}
	};
	r.prototype.scrollTop = function (e) {
		var t = this._getScroller();
		if (typeof e === "number") {
			t.scrollTop(e);
			this.settings.scrollTop = e
		} else {
			return t.scrollTop()
		}
	};
	r.prototype._attachListeners = function () {
		var t = this.$el;
		var r = this.settings;
		if (e.support.touch) {
			t.bind("touchstart", r.events.touchStart).bind("touchend", r.events.inputEnd).bind("touchmove", r.events.touchMove)
		} else {
			t.mousedown(r.events.inputDown).mouseup(r.events.inputEnd).mousemove(r.events.inputMove)
		}
		t.click(r.events.inputClick).scroll(r.events.scroll).bind("selectstart", n).bind("dragstart", r.events.dragStart)
	};
	r.prototype._detachListeners = function () {
		var t = this.$el;
		var r = this.settings;
		if (e.support.touch) {
			t.unbind("touchstart", r.events.touchStart).unbind("touchend", r.events.inputEnd).unbind("touchmove", r.events.touchMove)
		} else {
			t.unbind("mousedown", r.events.inputDown).unbind("mouseup", r.events.inputEnd).unbind("mousemove", r.events.inputMove)
		}
		t.unbind("click", r.events.inputClick).unbind("scroll", r.events.scroll).unbind("selectstart", n).unbind("dragstart", r.events.dragStart)
	};
	e.Kinetic = r;
	e.fn.kinetic = function (t, n) {
		return this.each(function () {
			var i = e(this);
			var s = i.data(r.DATA_KEY);
			var o = e.extend({}, r.DEFAULTS, i.data(), typeof t === "object" && t);
			if (!s) {
				i.data(r.DATA_KEY, s = new r(this, o))
			}
			if (typeof t === "string") {
				s[t](n)
			}
		})
	}
})(window.jQuery || window.Zepto);
/**
 * @name		Shuffle Letters
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license		MIT License
 */

(function (e) {
	function t(e) {
		var t = "";
		if (e == "lowerLetter") {
			t = "abcdefghijklmnopqrstuvwxyz0123456789"
		} else if (e == "upperLetter") {
			t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		} else if (e == "symbol") {
			t = "0123456789"
		}
		var n = t.split("");
		return n[Math.floor(Math.random() * n.length)]
	}
	e.fn.shuffleLetters = function (n) {
		var r = e.extend({
			step: 8,
			fps: 25,
			text: "",
			callback: function () {}
		}, n);
		return this.each(function () {
			var n = e(this),
				i = "";
			if (n.data("animated")) {
				return true
			}
			n.data("animated", true);
			if (r.text) {
				i = r.text.split("")
			} else {
				i = n.text().split("")
			}
			var s = [],
				o = [];
			for (var u = 0; u < i.length; u++) {
				var a = i[u];
				if (a == " ") {
					s[u] = "space";
					continue
				} else if (/[a-z]/.test(a)) {
					s[u] = "lowerLetter"
				} else if (/[A-Z]/.test(a)) {
					s[u] = "upperLetter"
				} else {
					s[u] = "symbol"
				}
				o.push(u)
			}
			n.html("");
			(function f(e) {
				var u, a = o.length,
					l = i.slice(0);
				if (e > a) {
					n.data("animated", false);
					r.callback(n);
					return
				}
				for (u = Math.max(e, 0); u < a; u++) {
					if (u < e + r.step) {
						l[o[u]] = t(s[o[u]])
					} else {
						l[o[u]] = ""
					}
				}
				n.text(l.join(""));
				setTimeout(function () {
					f(e + 1)
				}, 1e3 / r.fps)
			})(-r.step)
		})
	}
})(jQuery);

(function (a) {
	a.isScrollToFixed = function (b) {
		return !!a(b).data("ScrollToFixed")
	};
	a.ScrollToFixed = function (d, i) {
		var l = this;
		l.$el = a(d);
		l.el = d;
		l.$el.data("ScrollToFixed", l);
		var c = false;
		var G = l.$el;
		var H;
		var E;
		var e;
		var y;
		var D = 0;
		var q = 0;
		var j = -1;
		var f = -1;
		var t = null;
		var z;
		var g;

		function u() {
			G.trigger("preUnfixed.ScrollToFixed");
			k();
			G.trigger("unfixed.ScrollToFixed");
			f = -1;
			D = G.offset().top;
			q = G.offset().left;
			if (l.options.offsets) {
				q += (G.offset().left - G.position().left)
			}
			if (j == -1) {
				j = q
			}
			H = G.css("position");
			c = true;
			if (l.options.bottom != -1) {
				G.trigger("preFixed.ScrollToFixed");
				w();
				G.trigger("fixed.ScrollToFixed")
			}
		}

		function n() {
			var I = l.options.limit;
			if (!I) {
				return 0
			}
			if (typeof (I) === "function") {
				return I.apply(G)
			}
			return I
		}

		function p() {
			return H === "fixed"
		}

		function x() {
			return H === "absolute"
		}

		function h() {
			return !(p() || x())
		}

		function w() {
			if (!p()) {
				t.css({
					display: G.css("display"),
					width: G.outerWidth(true),
					height: G.outerHeight(true),
					"float": G.css("float")
				});
				cssOptions = {
					"z-index": l.options.zIndex,
					position: "fixed",
					top: l.options.bottom == -1 ? s() : "",
					bottom: l.options.bottom == -1 ? "" : l.options.bottom,
					"margin-left": "0px"
				};
				if (!l.options.dontSetWidth) {
					cssOptions.width = G.width()
				}
				G.css(cssOptions);
				G.addClass(l.options.baseClassName);
				if (l.options.className) {
					G.addClass(l.options.className)
				}
				H = "fixed"
			}
		}

		function b() {
			var J = n();
			var I = q;
			if (l.options.removeOffsets) {
				I = "";
				J = J - D
			}
			cssOptions = {
				position: "absolute",
				top: J,
				left: I,
				"margin-left": "0px",
				bottom: ""
			};
			if (!l.options.dontSetWidth) {
				cssOptions.width = G.width()
			}
			G.css(cssOptions);
			H = "absolute"
		}

		function k() {
			if (!h()) {
				f = -1;
				t.css("display", "none");
				G.css({
					"z-index": y,
					width: "",
					position: E,
					left: "",
					top: e,
					"margin-left": ""
				});
				G.removeClass("scroll-to-fixed-fixed");
				if (l.options.className) {
					G.removeClass(l.options.className)
				}
				H = null
			}
		}

		function v(I) {
			if (I != f) {
				G.css("left", q - I);
				f = I
			}
		}

		function s() {
			var I = l.options.marginTop;
			if (!I) {
				return 0
			}
			if (typeof (I) === "function") {
				return I.apply(G)
			}
			return I
		}

		function A() {
			if (!a.isScrollToFixed(G)) {
				return
			}
			var K = c;
			if (!c) {
				u()
			} else {
				if (h()) {
					D = G.offset().top;
					q = G.offset().left
				}
			}
			var I = a(window).scrollLeft();
			var L = a(window).scrollTop();
			var J = n();
			if (l.options.minWidth && a(window).width() < l.options.minWidth) {
				if (!h() || !K) {
					o();
					G.trigger("preUnfixed.ScrollToFixed");
					k();
					G.trigger("unfixed.ScrollToFixed")
				}
			} else {
				if (l.options.maxWidth && a(window).width() > l.options.maxWidth) {
					if (!h() || !K) {
						o();
						G.trigger("preUnfixed.ScrollToFixed");
						k();
						G.trigger("unfixed.ScrollToFixed")
					}
				} else {
					if (l.options.bottom == -1) {
						if (J > 0 && L >= J - s()) {
							if (!x() || !K) {
								o();
								G.trigger("preAbsolute.ScrollToFixed");
								b();
								G.trigger("unfixed.ScrollToFixed")
							}
						} else {
							if (L >= D - s()) {
								if (!p() || !K) {
									o();
									G.trigger("preFixed.ScrollToFixed");
									w();
									f = -1;
									G.trigger("fixed.ScrollToFixed")
								}
								v(I)
							} else {
								if (!h() || !K) {
									o();
									G.trigger("preUnfixed.ScrollToFixed");
									k();
									G.trigger("unfixed.ScrollToFixed")
								}
							}
						}
					} else {
						if (J > 0) {
							if (L + a(window).height() - G.outerHeight(true) >= J - (s() || -m())) {
								if (p()) {
									o();
									G.trigger("preUnfixed.ScrollToFixed");
									if (E === "absolute") {
										b()
									} else {
										k()
									}
									G.trigger("unfixed.ScrollToFixed")
								}
							} else {
								if (!p()) {
									o();
									G.trigger("preFixed.ScrollToFixed");
									w()
								}
								v(I);
								G.trigger("fixed.ScrollToFixed")
							}
						} else {
							v(I)
						}
					}
				}
			}
		}

		function m() {
			if (!l.options.bottom) {
				return 0
			}
			return l.options.bottom
		}

		function o() {
			var I = G.css("position");
			if (I == "absolute") {
				G.trigger("postAbsolute.ScrollToFixed")
			} else {
				if (I == "fixed") {
					G.trigger("postFixed.ScrollToFixed")
				} else {
					G.trigger("postUnfixed.ScrollToFixed")
				}
			}
		}
		var C = function (I) {
			if (G.is(":visible")) {
				c = false;
				A()
			}
		};
		var F = function (I) {
			(!!window.requestAnimationFrame) ? requestAnimationFrame(A): A()
		};
		var B = function () {
			var J = document.body;
			if (document.createElement && J && J.appendChild && J.removeChild) {
				var L = document.createElement("div");
				if (!L.getBoundingClientRect) {
					return null
				}
				L.innerHTML = "x";
				L.style.cssText = "position:fixed;top:100px;";
				J.appendChild(L);
				var M = J.style.height,
					N = J.scrollTop;
				J.style.height = "3000px";
				J.scrollTop = 500;
				var I = L.getBoundingClientRect().top;
				J.style.height = M;
				var K = (I === 100);
				J.removeChild(L);
				J.scrollTop = N;
				return K
			}
			return null
		};
		var r = function (I) {
			I = I || window.event;
			if (I.preventDefault) {
				I.preventDefault()
			}
			I.returnValue = false
		};
		l.init = function () {
			l.options = a.extend({}, a.ScrollToFixed.defaultOptions, i);
			y = G.css("z-index");
			l.$el.css("z-index", l.options.zIndex);
			t = a("<div />");
			H = G.css("position");
			E = G.css("position");
			e = G.css("top");
			if (h()) {
				l.$el.after(t)
			}
			a(window).bind("resize.ScrollToFixed", C);
			a(window).bind("scroll.ScrollToFixed", F);
			if ("ontouchmove" in window) {
				a(window).bind("touchmove.ScrollToFixed", A)
			}
			if (l.options.preFixed) {
				G.bind("preFixed.ScrollToFixed", l.options.preFixed)
			}
			if (l.options.postFixed) {
				G.bind("postFixed.ScrollToFixed", l.options.postFixed)
			}
			if (l.options.preUnfixed) {
				G.bind("preUnfixed.ScrollToFixed", l.options.preUnfixed)
			}
			if (l.options.postUnfixed) {
				G.bind("postUnfixed.ScrollToFixed", l.options.postUnfixed)
			}
			if (l.options.preAbsolute) {
				G.bind("preAbsolute.ScrollToFixed", l.options.preAbsolute)
			}
			if (l.options.postAbsolute) {
				G.bind("postAbsolute.ScrollToFixed", l.options.postAbsolute)
			}
			if (l.options.fixed) {
				G.bind("fixed.ScrollToFixed", l.options.fixed)
			}
			if (l.options.unfixed) {
				G.bind("unfixed.ScrollToFixed", l.options.unfixed)
			}
			if (l.options.spacerClass) {
				t.addClass(l.options.spacerClass)
			}
			G.bind("resize.ScrollToFixed", function () {
				t.height(G.height())
			});
			G.bind("scroll.ScrollToFixed", function () {
				G.trigger("preUnfixed.ScrollToFixed");
				k();
				G.trigger("unfixed.ScrollToFixed");
				A()
			});
			G.bind("detach.ScrollToFixed", function (I) {
				r(I);
				G.trigger("preUnfixed.ScrollToFixed");
				k();
				G.trigger("unfixed.ScrollToFixed");
				a(window).unbind("resize.ScrollToFixed", C);
				a(window).unbind("scroll.ScrollToFixed", F);
				G.unbind(".ScrollToFixed");
				t.remove();
				l.$el.removeData("ScrollToFixed")
			});
			C()
		};
		l.init()
	};
	a.ScrollToFixed.defaultOptions = {
		marginTop: 0,
		limit: 0,
		bottom: -1,
		zIndex: 1000,
		baseClassName: "scroll-to-fixed-fixed"
	};
	a.fn.scrollToFixed = function (b) {
		return this.each(function () {
			(new a.ScrollToFixed(this, b))
		})
	}
})(jQuery);
! function (e) {
	e.fn.extend({
		center: function (t) {
			var t = e.extend({
				inside: ".inner",
				transition: 0,
				minX: 0,
				minY: 0,
				withScrolling: true,
				vertical: true,
				horizontal: false
			}, t);
			return this.each(function () {
				var n = {
					position: "relative"
				};
				if (t.vertical) {
					var r = (e(t.inside).height() - e(this).outerHeight()) / 2;
					if (t.withScrolling) r += e(t.inside).scrollTop() || 0;
					r = r > t.minY ? r : t.minY;
					e.extend(n, {
						top: r + "px"
					})
				}
				if (t.horizontal) {
					var i = (e(t.inside).width() - e(this).outerWidth()) / 2;
					if (t.withScrolling) i += e(t.inside).scrollLeft() || 0;
					i = i > t.minX ? i : t.minX;
					e.extend(n, {
						left: i + "px"
					})
				}
				if (t.transition > 0) e(this).animate(n, t.transition);
				else e(this).css(n);
				return e(this)
			})
		}
	})
}(jQuery);
var Froogaloop = function () {
	function e(a) {
		return new e.fn.init(a)
	}

	function h(a, c, b) {
		if (!b.contentWindow.postMessage) return !1;
		var f = b.getAttribute("src").split("?")[0],
			a = JSON.stringify({
				method: a,
				value: c
			});
		"//" === f.substr(0, 2) && (f = window.location.protocol + f);
		b.contentWindow.postMessage(a, f)
	}

	function j(a) {
		var c, b;
		try {
			c = JSON.parse(a.data), b = c.event || c.method
		} catch (f) {}
		"ready" == b && !i && (i = !0);
		if (a.origin != k) return !1;
		var a = c.value,
			e = c.data,
			g = "" === g ? null : c.player_id;
		c = g ? d[g][b] : d[b];
		b = [];
		if (!c) return !1;
		void 0 !==
			a && b.push(a);
		e && b.push(e);
		g && b.push(g);
		return 0 < b.length ? c.apply(null, b) : c.call()
	}

	function l(a, c, b) {
		b ? (d[b] || (d[b] = {}), d[b][a] = c) : d[a] = c
	}
	var d = {},
		i = !1,
		k = "";
	e.fn = e.prototype = {
		element: null,
		init: function (a) {
			"string" === typeof a && (a = document.getElementById(a));
			this.element = a;
			a = this.element.getAttribute("src");
			"//" === a.substr(0, 2) && (a = window.location.protocol + a);
			for (var a = a.split("/"), c = "", b = 0, f = a.length; b < f; b++) {
				if (3 > b) c += a[b];
				else break;
				2 > b && (c += "/")
			}
			k = c;
			return this
		},
		api: function (a, c) {
			if (!this.element ||
				!a) return !1;
			var b = this.element,
				f = "" !== b.id ? b.id : null,
				d = !c || !c.constructor || !c.call || !c.apply ? c : null,
				e = c && c.constructor && c.call && c.apply ? c : null;
			e && l(a, e, f);
			h(a, d, b);
			return this
		},
		addEvent: function (a, c) {
			if (!this.element) return !1;
			var b = this.element,
				d = "" !== b.id ? b.id : null;
			l(a, c, d);
			"ready" != a ? h("addEventListener", a, b) : "ready" == a && i && c.call(null, d);
			return this
		},
		removeEvent: function (a) {
			if (!this.element) return !1;
			var c = this.element,
				b;
			a: {
				if ((b = "" !== c.id ? c.id : null) && d[b]) {
					if (!d[b][a]) {
						b = !1;
						break a
					}
					d[b][a] = null
				} else {
					if (!d[a]) {
						b = !1;
						break a
					}
					d[a] = null
				}
				b = !0
			}
			"ready" != a && b && h("removeEventListener", a, c)
		}
	};
	e.fn.init.prototype = e.fn;
	window.addEventListener ? window.addEventListener("message", j, !1) : window.attachEvent("onmessage", j);
	return window.Froogaloop = window.$f = e
}();