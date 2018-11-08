/*
jQWidgets v6.0.6 (2018-August)
Copyright (c) 2011-2018 jQWidgets.
License: https://jqwidgets.com/license/
 */
/* eslint-disable */

(function (a) {
	a.jqx.jqxWidget("jqxInput", "", {});
	a.extend(a.jqx._jqxInput.prototype, {
		defineInstance: function () {
			var c = this;
			
			var b = {
				disabled: false,
				filter: c._filter,
				sort: c._sort,
				highlight: c._highlight,
				dropDownWidth: null,
				renderer: c._renderer,
				opened: false,
				$popup: document.createElement("ul"),
				source: [],
				roundedCorners: true,
				searchMode: "default",
				placeHolder: "",
				width: null,
				height: null,
				value: "",
				rtl: false,
				hint: true,
				displayMember: "",
				valueMember: "",
				events: ["select", "open", "close", "change"],
				popupZIndex: 20000,
				items: 8,
				minLength: 1,
				maxLength: null
			};
			if (this === a.jqx._jqxInput.prototype) {
				return b
			}
			a.extend(true, this, b);
			return b
		},
		createInstance: function () {
			var b = this;
			if (b.host.css("display") === "none" || document.body.contains(b.element) === false) {
				b._initiallyHidden = true
			}
			b._popupHelper = a(b.$popup);
			b.render()
		},
		render: function () {
			var g = this;
			this.input = this.element;
			if (g.isMaterialized() && this.input instanceof HTMLInputElement) {
				var d = this.host.children();
				a.each(d, function (j) {
					var k = "jqx-input-group-addon";
					a(this).removeClass(g.toThemeProperty("jqx-rc-all"));
					if (j === 0) {
						k += " jqx-rc-l"
					}
					if (j === d.length - 1) {
						k += " jqx-rc-r"
					}
					if (this !== g.element) {
						k += " jqx-fill-state-normal"
					}
					this.className += " " + g.toThemeProperty(k)
				});
				var i = a("<div></div>");
				i.addClass(g.toThemeProperty("jqx-input-group"));
				this.host.after(i);
				var b = this.element;
				var h = this.host.data();
				i.append(b);
				var c = a("<label></label");
				if (this.hint) {
					c[0].innerHTML = this.placeHolder
				}
				c.addClass(g.toThemeProperty("jqx-input-label"));
				i.append(c);
				var f = a("<span></span>");
				i.append(f);
				f.addClass(g.toThemeProperty("jqx-input-bar"));
				i[0].id = this.element.id;
				this.element.removeAttribute("id");
				i[0].style.cssText = this.element.style.cssText;
				g.input = g.element;
				if (!(this.input instanceof HTMLInputElement)) {
					this.input = this.host.find("input");
					if (this.input.length > 0) {
						this.input = this.input[0]
					}
					a(this.input).addClass(this.toThemeProperty("jqx-input-widget"))
				}
				this.label = c;
				this.bar = f;
				this.element.style.cssText = "";
				this.host = i;
				this.element = i[0];
				this.host.data(h);
				var g = this;
				if (g.template) {
					g.bar.addClass(g.toThemeProperty("jqx-" + g.template));
					g.label.addClass(g.toThemeProperty("jqx-" + g.template))
				}
				if (d.length > 0) {
					g._hasAddons = true
				}
			} else {
				if (this.element.nodeName.toLowerCase() === "textarea") {
					this.element.style.overflow = "auto"
				} else {
					if (this.element.nodeName.toLowerCase() === "div") {
						this.baseHost = this.element;
						var b = g.element.getElementsByTagName("input");
						var e = false;
						a.each(b, function () {
							var j = this.type;
							if (j == null || j === "text" || j === "textarea") {
								b = a(this);
								e = true;
								return false
							}
						});
						if (!e) {
							throw new Error("jqxInput: Missing Text Input in the Input Group")
						}
						if (b.length > 0) {
							this.baseHost = a(this.element);
							g.baseElement = g.element;
							var h = this.host.data();
							this.host = b;
							this.element = b[0];
							g.input = b[0];
							this.host.data(h);
							g.baseElement.className += " " + g.toThemeProperty("jqx-widget jqx-rc-all jqx-input-group");
							var d = this.baseHost.children();
							a.each(d, function (j) {
								var k = "jqx-input-group-addon";
								a(this).removeClass(g.toThemeProperty("jqx-rc-all"));
								if (j === 0) {
									k += " jqx-rc-l"
								}
								if (j === d.length - 1) {
									k += " jqx-rc-r"
								}
								if (this !== g.element) {
									k += " jqx-fill-state-normal"
								}
								this.className += " " + g.toThemeProperty(k)
							})
						}
					}
				}
			}
			this.addHandlers();
			if (this.rtl) {
				g.element.className += " " + g.toThemeProperty("jqx-rtl")
			}
			g.element.setAttribute("role", "textbox");
			a.jqx.aria(this, "aria-autocomplete", "both");
			a.jqx.aria(this, "aria-disabled", this.disabled);
			a.jqx.aria(this, "aria-readonly", false);
			a.jqx.aria(this, "aria-multiline", false);
			if (this.source && this.source.length) {
				a.jqx.aria(this, "aria-haspopup", true)
			}
			if (this.value !== "") {
				this.input.value = this.value
			}
			this._oldsource = this.source;
			this._updateSource()
		},
		_updateSource: function () {
			var d = this;
			var e = function (g) {
				if (g === undefined) {
					return null
				}
				if (typeof g === "string" || g instanceof String) {
					return {
						label: g,
						value: g
					}
				}
				if (typeof g !== "string" && g instanceof String === false) {
					var f = "";
					var h = "";
					if (d.displayMember !== "" && d.displayMember !== undefined) {
						if (g[d.displayMember]) {
							f = g[d.displayMember]
						}
					}
					if (d.valueMember !== "" && d.valueMember !== undefined) {
						h = g[d.valueMember]
					}
					if (f === "") {
						f = g.label
					}
					if (h === "") {
						h = g.value
					}
					return {
						label: f,
						value: h
					}
				}
				return g
			};
			var b = function (h) {
				var f = [];
				for (var g = 0; g < h.length; g++) {
					f[g] = e(h[g])
				}
				return f
			};
			if (this.source && this.source._source) {
				this.adapter = this.source;
				if (this.adapter._source.localdata != null) {
					this.adapter.unbindBindingUpdate(this.element.id);
					this.adapter.bindBindingUpdate(this.element.id, function () {
						d.source = b(d.adapter.records)
					})
				} else {
					var c = {};
					if (this.adapter._options.data) {
						a.extend(d.adapter._options.data, c)
					} else {
						if (this.source._source.data) {
							a.extend(c, this.source._source.data)
						}
						this.adapter._options.data = c
					}
					this.adapter.unbindDownloadComplete(this.element.id);
					this.adapter.bindDownloadComplete(this.element.id, function () {
						d.source = b(d.adapter.records)
					})
				}
				this.source.dataBind();
				return
			}
			if (!a.isFunction(this.source)) {
				this.source = b(this.source)
			}
		},
		_refreshClasses: function (d) {
			var c = d ? "addClass" : "removeClass",
			b = "jqx-widget-content jqx-input-widget jqx-input jqx-widget",
			e = "jqx-popup jqx-input-popup jqx-menu jqx-menu-vertical jqx-menu-dropdown jqx-widget jqx-widget-content";
			if (a.jqx.browser.msie) {
				e += " jqx-noshadow"
			}
			if (this.roundedCorners) {
				b += " jqx-rc-all";
				e += " jqx-rc-all"
			}
			if (this.disabled) {
				b += " jqx-fill-state-disabled"
			} else {
				this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))
			}
			this.host[c](this.toThemeProperty(b));
			this._popupHelper[c](this.toThemeProperty(e))
		},
		selectAll: function () {
			var c = this;
			var b = this.host;
			if (b[0]instanceof HTMLInputElement === false) {
				b = a(c.input)
			}
			setTimeout(function () {
				if ("selectionStart" in b[0]) {
					b[0].focus();
					b[0].setSelectionRange(0, b[0].value.length)
				} else {
					var d = b[0].createTextRange();
					d.collapse(true);
					d.moveEnd("character", b[0].value.length);
					d.moveStart("character", 0);
					d.select()
				}
			}, 10)
		},
		selectLast: function () {
			var b = this.host;
			if (b[0]instanceof HTMLInputElement === false) {
				b = a(that.input)
			}
			this.selectStart(b[0].value.length)
		},
		selectFirst: function () {
			this.selectStart(0)
		},
		selectStart: function (c) {
			var d = this;
			var b = this.host;
			if (b[0]instanceof HTMLInputElement === false) {
				b = a(d.input)
			}
			setTimeout(function () {
				if ("selectionStart" in b[0]) {
					b[0].focus();
					b[0].setSelectionRange(c, c)
				} else {
					var e = b[0].createTextRange();
					e.collapse(true);
					e.moveEnd("character", c);
					e.moveStart("character", c);
					e.select()
				}
			}, 10)
		},
		focus: function () {
			try {
				var c = this;
				c.element.focus();
				setTimeout(function () {
					c.element.focus()
				}, 25)
			} catch (b) {}
		},
		resize: function (c, b) {
			this.width = c;
			this.height = b;
			this.refresh()
		},
		refresh: function () {
			this._refreshClasses(false);
			this._refreshClasses(true);
			if (!this.baseHost) {
				if (this.width != null && this.width.toString().indexOf("px") != -1) {
					this.element.style.width = parseInt(this.width) + "px"
				} else {
					if (this.width != undefined && !isNaN(this.width)) {
						this.element.style.width = this.width + "px"
					} else {
						this.element.style.width = this.width
					}
				}
				if (this.height != null && this.height.toString().indexOf("px") != -1) {
					this.element.style.height = parseInt(this.height) + "px"
				} else {
					if (this.height != undefined && !isNaN(this.height)) {
						this.element.style.height = this.height + "px"
					} else {
						this.element.style.height = this.height
					}
				}
				if (this._hasAddons) {
					this._addonsWidth = 35;
					this.input.style.width = "calc(100% - " + this._addonsWidth + "px)"
				}
			} else {
				if (this.width != null && this.width.toString().indexOf("px") != -1) {
					this.baseElement.style.width = parseInt(this.width) + "px"
				} else {
					if (this.width != undefined && !isNaN(this.width)) {
						this.baseElement.style.width = this.width + "px"
					}
				}
				if (this.height != null && this.height.toString().indexOf("px") != -1) {
					this.baseElement.style.height = parseInt(this.height) + "px"
				} else {
					if (this.height != undefined && !isNaN(this.height)) {
						this.baseElement.style.height = this.height + "px"
					}
				}
				var d = this,
				e = a.jqx.browser.msie && a.jqx.browser.version < 9,
				c = 0;
				a.each(this.baseHost.children(), function () {
					this.style.height = "100%";
					if (this !== d.element) {
						c += a(this).outerWidth()
					}
				});
				d._addonsWidth = c;
				if (e) {
					var b = Math.max(0, d.baseElement.offsetHeight - 2);
					d.element.style.width = Math.max(0, (d.baseElement.offsetWidth - c - 1)) + "px";
					d.element.style.minHeight = b + "px";
					d.element.style.lineHeight = b + "px"
				} else {
					d.element.style.width = "calc(100% - " + c + "px)"
				}
				a.jqx.utilities.resize(d.baseHost, function () {
					if (e && typeof d.width === "string" && d.width.indexOf("%") !== -1 && !d._initiallyHidden) {
						d.element.style.width = (d.baseElement.offsetWidth - d._addonsWidth - 1) + "px"
					} else {
						if (d._initiallyHidden) {
							d._addonsWidth = d._getAddonsWidth();
							if (!e) {
								d.element.style.width = "calc(100% - " + d._addonsWidth + "px)"
							} else {
								d.element.style.width = (d.baseElement.offsetWidth - d._addonsWidth - 1) + "px";
								var f = d.baseElement.offsetHeight - 2;
								d.element.style.minHeight = f + "px";
								d.element.style.lineHeight = f + "px"
							}
							d._initiallyHidden = false
						}
					}
				})
			}
			if (this.disabled) {
				this.element.setAttribute("disabled", true)
			} else {
				this.element.removeAttribute("disabled")
			}
			if (this.maxLength) {
				this.element.setAttribute("maxlength", this.maxLength)
			}
			if (!this.element.getAttribute("placeholder")) {
				this._refreshPlaceHolder()
			}
		},
		_refreshPlaceHolder: function () {
			var b = this;
			if (!b.isMaterialized() || !b.hint) {
				if ("placeholder" in this.input && !(a.jqx.browser.msie && a.jqx.browser.version < 9)) {
					b.input.setAttribute("placeHolder", b.placeHolder)
				} else {
					if (b.input.value === "") {
						b.input.value = b.placeHolder
					}
				}
			}
			if (!b.hint) {
				return
			}
			if (b.input.value !== "") {
				b.element.setAttribute("hint", true)
			} else {
				b.element.removeAttribute("hint")
			}
			if (b.label) {
				b.label.innerHTML = b.placeHolder
			}
		},
		destroy: function () {
			this.removeHandlers();
			if (this.baseHost) {
				this.baseHost.remove()
			} else {
				this.host.remove()
			}
			if (this.$popup) {
				this._popupHelper.remove()
			}
		},
		propertiesChangedHandler: function (b, c, d) {
			if (d.width && d.height && Object.keys(d).length === 2) {
				b.refresh()
			}
		},
		propertyChangedHandler: function (b, c, e, d) {
			if (c === "width" && d !== e) {
				if (b.baseHost) {
					b.baseElement.style.width = b._toPx(d);
					if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
						b.element.style.width = (b.baseElement.offsetWidth - b._addonsWidth - 1) + "px"
					}
				} else {
					b.element.style.width = b._toPx(d)
				}
				return
			}
			if (c === "placeHolder") {
				if ((!("placeholder" in b.element) || (a.jqx.browser.msie && a.jqx.browser.version < 9)) && b.input.value === e) {
					b.input.value = ""
				}
				b._refreshPlaceHolder();
				return
			}
			if (b.batchUpdate && b.batchUpdate.width && b.batchUpdate.height && Object.keys(b.batchUpdate).length === 2) {
				return
			}
			if (c === "theme") {
				a.jqx.utilities.setTheme(e, d, b.host)
			}
			if (c === "opened") {
				if (d) {
					b.open()
				} else {
					b.close()
				}
				return
			}
			if (c === "source") {
				b._oldsource = d;
				b._updateSource()
			}
			if (c === "displayMember" || c === "valueMember") {
				b.source = b._oldsource;
				b._updateSource()
			}
			if (c === "disabled") {
				a.jqx.aria(b, "aria-disabled", b.disabled)
			}
			if (c === "value") {
				b.input.value = d;
				b._refreshPlaceHolder()
			}
			b.refresh()
		},
		select: function (d, f, b) {
			var e = this._find("jqx-fill-state-pressed", this._popupHelper);
			var g = e.getAttribute("data-value");
			var c = e.getAttribute("data-name");
			
			this.input.value = this.renderer(c, this.input.value);
			this.selectedItem = {
				label: c,
				value: g
			};
			this.element.setAttribute("data-value", g);
			this.element.setAttribute("data-label", c);
			this._raiseEvent("0", {
				item: {
					label: c,
					value: g
				},
				label: c,
				value: g
			});
			this._raiseEvent("3", {
				type: b,
				item: {
					label: c,
					value: g
				},
				label: c,
				value: g
			});
			this.value = c;
			return this.close()
		},
		val: function (b) {
			if (arguments.length === 0 || (b != null && typeof(b) === "object" && !b.label && !b.value)) {
				if (this.displayMember !== "" && this.valueMember !== "" && this.selectedItem) {
					if (this.input.value === "") {
						return ""
					}
					return this.selectedItem
				}
				return this.input.value
			}
			if (b && b.label) {
				this.selectedItem = {
					label: b.label,
					value: b.value
				};
				this.element.setAttribute("data-value", b.value);
				this.element.setAttribute("data-label", b.label);
				this.value = b;
				this.input.value = b.label;
				if (this.input) {
					this.input.value = b.label
				}
				return this.input.value
			}
			this.value = b;
			this.input.value = b;
			this.element.setAttribute("data-value", b);
			this.element.setAttribute("data-label", b);
			if (b && b.label) {
				this._raiseEvent("3", {
					type: null,
					item: {
						label: b.label,
						value: b.value
					},
					label: b.label,
					value: b.value
				})
			} else {
				this._raiseEvent("3", {
					type: null,
					item: {
						label: b,
						value: b
					},
					label: b,
					value: b
				})
			}
			this._refreshPlaceHolder();
			return this.input.value
		},
		_raiseEvent: function (f, c) {
			if (c === undefined) {
				c = {
					owner: null
				}
			}
			var d = this.events[f];
			c.owner = this;
			var e = new a.Event(d);
			e.owner = this;
			e.args = c;
			if (e.preventDefault) {
				e.preventDefault()
			}
			var b = this.host.trigger(e);
			return b
		},
		_renderer: function (b) {
			return b
		},
		open: function () {
			if (a.jqx.isHidden(this.host)) {
				return
			}
			var c = a.extend({}, this.host.coord(true), {
					height: this.element.offsetHeight
				});
			if (this.$popup.parentNode !== document.body) {
				var e = this.element.id + "_popup";
				this.$popup.id = e;
				a.jqx.aria(this, "aria-owns", e);
				document.body.appendChild(this.$popup)
			}
			this.$popup.style.position = "absolute";
			this.$popup.style.zIndex = this.popupZIndex;
			this.$popup.style.top = this._toPx(c.top + c.height);
			this.$popup.style.left = this._toPx(c.left);
			this.$popup.style.display = "block";
			var b = 0;
			var d = this._popupHelper.children();
			a.each(d, function () {
				b += a(this).outerHeight() + 1
			});
			this.$popup.style.height = this._toPx(b);
			this.opened = true;
			this._raiseEvent("1", {
				popup: this.$popup
			});
			a.jqx.aria(this, "aria-expanded", true);
			return this
		},
		close: function () {
			this.$popup.style.display = "none";
			this.opened = false;
			this._raiseEvent("2", {
				popup: this.$popup
			});
			a.jqx.aria(this, "aria-expanded", false);
			this._refreshPlaceHolder();
			return this
		},
		suggest: function () {
			var b;
			this.query = this.input.value;
			if (!this.query || this.query.length < this.minLength) {
				return this.opened ? this.close() : this
			}
			if (a.isFunction(this.source)) {
				b = this.source(this.query, a.proxy(this.load, this))
			} else {
				b = this.source
			}
			if (b) {
				return this.load(b)
			}
			return this
		},
		load: function (f) {
			var e = this,
			b = [];
			for (var c = 0; c < f.length; c++) {
				var d = f[c];
				if (e.filter(d)) {
					b.push(d)
				}
			}
			b = this.sort(b);
			if (!b.length) {
				if (this.opened) {
					return this.close()
				} else {
					return this
				}
			}
			return this._render(b.slice(0, this.items)).open()
		},
		_filter: function (b) {
			var c = this.query;
			var d = b;
			if (b.label != null) {
				d = b.label
			} else {
				if (this.displayMember) {
					d = b[this.displayMember]
				}
			}
			switch (this.searchMode) {
			case "none":
				break;
			default:
				return a.jqx.string.containsIgnoreCase(d, c);
			case "contains":
				return a.jqx.string.contains(d, c);
			case "equals":
				return a.jqx.string.equals(d, c);
			case "equalsignorecase":
				return a.jqx.string.equalsIgnoreCase(d, c);
			case "startswith":
				return a.jqx.string.startsWith(d, c);
			case "startswithignorecase":
				return a.jqx.string.startsWithIgnoreCase(d, c);
			case "endswith":
				return a.jqx.string.endsWith(d, c);
			case "endswithignorecase":
				return a.jqx.string.endsWithIgnoreCase(d, c)
			}
		},
		_sort: function (b) {
			var h = [],
			d = [],
			f = [];
			for (var c = 0; c < b.length; c++) {
				var e = b[c];
				var g = e;
				if (e.label) {
					g = e.label
				} else {
					if (this.displayMember) {
						g = e[this.displayMember]
					}
				}
				if (g.toString().toLowerCase().indexOf(this.query.toString().toLowerCase()) === 0) {
					h.push(e)
				} else {
					if (g.toString().indexOf(this.query) >= 0) {
						d.push(e)
					} else {
						if (g.toString().toLowerCase().indexOf(this.query.toString().toLowerCase()) >= 0) {
							f.push(e)
						}
					}
				}
			}
			return h.concat(d, f)
		},
		_highlight: function (c) {
			var d = this.query;
			d = d.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			var b = new RegExp("(" + d + ")", "ig");
			return c.replace(b, function (e, f) {
				return "<b>" + f + "</b>"
			})
		},
		_render: function (f) {
			var e = this,
			c = e._popupHelper.children();
			if (c.length > 0) {
				for (var d = 0; d < c.length; d++) {
					a(c[d]).remove()
				}
			}
			var g = function (n, k) {
				var p = n,
				m = document.createElement("li"),
				j = document.createElement("a"),
				h,
				o;
				j.setAttribute("href", "#");
				m.appendChild(j);
				if (n.value !== undefined && n.value !== null) {
					if (n.label !== undefined && n.label !== null) {
						h = n.label;
						o = n.value
					} else {
						h = n.value;
						o = n.value
					}
				} else {
					if (n.label !== undefined && n.label !== null) {
						h = n.label;
						o = n.label
					} else {
						if (e.displayMember !== undefined && e.displayMember !== "") {
							h = n[e.displayMember];
							o = n[e.valueMember]
						} else {
							h = n;
							o = n
						}
					}
				}
				m.setAttribute("data-value", o);
				m.setAttribute("data-name", h);
				if (n.label) {
					p = n.label
				} else {
					if (e.displayMember) {
						p = n[e.displayMember]
					}
				}
				j.innerHTML = e.highlight(p);
				var l = "";
				if (e.rtl) {
					l = " jqx-rtl"
				}
				if (k === 0) {
					l += " jqx-fill-state-pressed"
				}
				m.className = e.toThemeProperty("jqx-item jqx-menu-item jqx-rc-all" + l);
				e.$popup.appendChild(m);
				e.addHandler(m, "mouseenter", function (i) {
					e.mouseenter(i)
				})
			};
			var b = function (j) {
				for (var h = 0; h < j.length; h++) {
					g(j[h], h)
				}
			};
			b(f);
			if (!this.dropDownWidth) {
				this.$popup.style.width = e._toPx(e.element.offsetWidth - 6)
			} else {
				this.$popup.style.width = e._toPx(e.dropDownWidth)
			}
			return this
		},
		next: function () {
			var c = this._find("jqx-fill-state-pressed", this._popupHelper),
			b = c.nextSibling;
			a(c).removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
			if (!b) {
				b = this.$popup.firstChild
			}
			b.className += " " + this.toThemeProperty("jqx-fill-state-pressed")
		},
		prev: function () {
			var c = this._find("jqx-fill-state-pressed", this._popupHelper),
			b = c.previousSibling;
			a(c).removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
			if (!b) {
				b = this.$popup.lastChild
			}
			b.className += " " + this.toThemeProperty("jqx-fill-state-pressed")
		},
		addHandlers: function () {
			var c = this,
			b = ".jqxInput" + c.element.id;
			c.addHandler(c.host, "focus" + b, function () {
				c.onFocus()
			});
			c.addHandler(c.host, "blur" + b, function () {
				c.onBlur()
			});
			c.addHandler(c.host, "change" + b, function (f) {
				if (!f.args) {
					f.stopPropagation();
					f.preventDefault();
					var e = c.val(),
					d,
					g;
					if (e && e.label) {
						d = e.label;
						g = e.val
					} else {
						d = e;
						g = e
					}
					c._raiseEvent("3", {
						type: "keyboard",
						item: {
							label: d,
							value: g
						},
						label: d,
						value: g
					});
					c.value = d;
					c._refreshPlaceHolder()
				}
			});
			c.addHandler(c.host, "keypress" + b, function (d) {
				c.keypress(d)
			});
			c.addHandler(c.host, "keyup" + b, function (d) {
				c.keyup(d)
			});
			c.addHandler(c.host, "keydown" + b, function (d) {
				c.keydown(d)
			});
			c.addHandler(c.$popup, "mousedown" + b, function (d) {
				c.click(d)
			})
		},
		removeHandlers: function () {
			var c = this,
			b = ".jqxInput" + c.element.id;
			c.removeHandler(c.host, "change" + b);
			c.removeHandler(c.host, "focus" + b);
			c.removeHandler(c.host, "blur" + b);
			c.removeHandler(c.host, "keypress" + b);
			c.removeHandler(c.host, "keyup" + b);
			c.removeHandler(c.host, "keydown" + b);
			c.removeHandler(c.$popup, "mousedown" + b)
		},
		move: function (b) {
			if (!this.opened) {
				return
			}
			switch (b.keyCode) {
			case 9:
			case 13:
			case 27:
				b.preventDefault();
				break;
			case 38:
				if (!b.shiftKey) {
					b.preventDefault();
					this.prev()
				}
				break;
			case 40:
				if (!b.shiftKey) {
					b.preventDefault();
					this.next()
				}
				break
			}
			b.stopPropagation()
		},
		keydown: function (c) {
			var b = [40, 38, 9, 13, 27];
			this.suppressKeyPressRepeat = b.indexOf(c.keyCode) !== -1;
			this.move(c)
		},
		keypress: function (b) {
			if (this.suppressKeyPressRepeat) {
				return
			}
			this.move(b)
		},
		keyup: function (c) {
			switch (c.keyCode) {
			case 40:
			case 38:
			case 16:
			case 17:
			case 18:
				break;
			case 9:
			case 13:
				if (!this.opened) {
					return
				}
				this.select(c, this, "keyboard");
				break;
			case 27:
				if (!this.opened) {
					return
				}
				this.close();
				break;
			default:
				var b = this;
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(function () {
						b.suggest()
					}, 300)
			}
			c.stopPropagation();
			c.preventDefault()
		},
		clear: function () {
			this.val("")
		},
		onBlur: function () {
			var b = this;
			setTimeout(function () {
				b.close()
			}, 150);
			b.host.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
			b._refreshPlaceHolder()
		},
		onFocus: function () {
			var b = this;
			b.element.className += " " + b.toThemeProperty("jqx-fill-state-focus");
			b._refreshPlaceHolder()
		},
		click: function (b) {
			b.stopPropagation();
			b.preventDefault();
			this.select(b, this, "mouse")
		},
		mouseenter: function (b) {
			a(this._find("jqx-fill-state-pressed", this._popupHelper)).removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
			b.currentTarget.className += " " + this.toThemeProperty("jqx-fill-state-pressed")
		},
		_toPx: function (b) {
			if (typeof b === "number") {
				return b + "px"
			} else {
				return b
			}
		},
		_find: function (e, b) {
			var d = b.children();
			for (var c = 0; c < d.length; c++) {
				var f = d[c];
				if (f.className.indexOf(e) !== -1) {
					return f
				}
			}
		},
		_getAddonsWidth: function () {
			var e = this,
			d = e.baseHost.children(),
			b = 0;
			for (var c = 0; c < d.length; c++) {
				if (d[c] !== e.element) {
					b += a(d[c]).outerWidth()
				}
			}
			return b
		}
	})
})(jqxBaseFramework);
