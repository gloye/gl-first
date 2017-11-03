import $ from 'jquery';
import EventEmitter from 'events';

const Selector = (classPrefix) => ({
    PREFIX: classPrefix,
    NAV: `${classPrefix}-nav`,
    CONTENT: `${classPrefix}-content`,
    TAB: `${classPrefix}-tab`,
    PANEL: `${classPrefix}-panel`,
    ACTIVE: `${classPrefix}-active`,
    DISABLE: `${classPrefix}-disable`
})



class Tabs {

    constructor(options) {
        this.options = $.extend({}, Tabs.defaultOptions, options);
        this.element = $(this.options.element);
        this.fromIndex = this.options.activeIndex;

        this.event = new EventEmitter();
        this.selector = Selector(this.options.classPrefix);

        this._initElement();
        this._initTabs();
        this._initPanels();
        this._bindTabs();
        if (this.options.activeIndex !== undefined) {
            this.switchTo(this.options.activeIndex);
        }
    }

    _initElement() {
        this.element.addClass(this.selelctor.PREFIX);
        this.tabs = $(this.options.tabs);
        this.panels = $(this.options.panels);
        this.nav = $(this.options.nav);
        this.content = $(this.options.content);
        this.length = this.tabs.length;
    }

    _initTabs() {
        this.nav && this.nav.addClass(this.selector.NAV);
        this.tabs.addClass(this.selector.TAB).each((index, tab) => {
            $(tab).data('value', index);
        })
    }

    _initPanels() {
        this.content.addClass(this.selector.CONTENT);
        this.panels.addClass(this.selector.PANEL);
    }

    _bindTabs() {
        this.tabs.click((e) => {
            const $el = $(e.target);
            if (!$el.hasClass(this.selector.DISABLE)) {
                this.switchTo($el.data('value'));
            }
        })
    }

    events(name) {
        return this.events;
    }


    switchTo(toIndex) {
        this._switchTo(toIndex);
    }

    _swithchTo(toIndex) {
        const fromIndex = this.fromInex;
        const panelInfo = this._getPanelInfo(toIndex);

        this._switchTabs(toIndex);
        this._switchPanel(panelInfo);

        this.events.emit('change', {
            toIndex,
            fromIndex
        });

        this.fromIndex = toIndex;
    }

    _swithchTabs(toIndex) {
        const tabs = this.tabs;
        const fromIndex = this.fromIndex;
        if (tabs.length < 1) return;
        tabs.eq(fromIndex)
            .removeClass(this.selector.ACTIVE)
        tabs.eq(toIndex)
            .addClass(this.selector.ACTIVE)
    }
    _switchPanel(panelInfo) {
        panelInfo.fromPanels.hide();
        panelInfo.toPanels.show();
    }

    _getPanelInfo(toIndex) {
        const panels = this.panels;
        const fromIndex = this.fromIndex;
        let fromPanels, toPanels;
        if (fromIndex > -1) {
            fromPanels = this.panels.slice(fromIndex, (fromIndex + 1));
        }
        toPanels = this.panels.slice(toIndex, (toIndex + 1));
        return {
            toIndex: toIndex,
            fromIndex: fromIndex,
            toPanels: $(toPanels),
            fromPanels: $(fromPanels)
        };
    }

    destroy() {
        this.events.removeAllListeners();
    }

}

Tabs.defaultOptions = {
    classPrefix: 'tabs',
    activeIndex: 0
}


export default Tabs

const tab = new Tabs({
    element: '.tab-demo',
    tabs: '.tabs-tab',
    panels: 'tabs-panel'
})