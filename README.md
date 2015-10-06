knockout-winjs
=============

Adapter for KnockoutJS and WinJS, this code facilitates usage of WinJS UI controls in a
Knockout application. It achieves this by creating bindings for the various controls
which allow them to show up in Knockout data-bind attributes like:

    The current rating is: <span data-bind="text: userRating"></span><br/>
    <div data-bind="winRating: {userRating: userRating}"></div>

How to use this in your Knockout project?
----------------------------------------

Just make sure to include WinJS, and then include the adapter.

    <link href="winjs/css/ui-dark.css" rel="stylesheet" />
    <script src="winjs/js/base.js"></script>
    <script src="winjs/js/ui.js"></script>
    <script src="js/knockout-winjs.js"></script>

__Note: this adapter library has only been tested against Knockout 3.3+.__

Examples of control usage
-------------------------

### AppBar and AppBarCommand

    <!-- Shows up on the bottom of the screen, use right-click or touch edgy gesture to show -->
    <div data-bind="winAppBar: {placement: 'bottom'}">
        <button data-bind="winAppBarCommand: {label: 'AppBarButton', type: 'button', icon:'add'}"></button>
    </div>

### AutoSuggestBox

    <div data-bind="winAutoSuggestBox"></div>

### BackButton

    <!-- Won't show up unless you use WinJS.Navigation stack -->
    <button data-bind="winBackButton"></button>

### ContentDialog

    <div data-bind="winContentDialog"></div>

### DatePicker

    <div data-bind="winDatePicker: {current: date}"></div>

### FlipView

    <div class="flipView" data-bind="winFlipView: {itemTemplate: templateName, itemDataSource: flipViewArray}"></div>
    <script type="text/html" id="flipViewTemplate">
      <div>
        <span>Name: </span><span data-bind="text: text"></span>
      </div>
      <div>
        <span>Rating: </span><span data-bind="text: rating"></span>
      </div>
    </script>

### Flyout

    <button id="flyoutAnchor">Show a flyout!</button>
    <div data-bind="winFlyout: {anchor: '#flyoutAnchor', placement: 'right'}">
        <div>This is a flyout</div>
    </div>

### Hub and HubSection

    <div class="hub" data-bind="winHub">
      <div class="hubSection" data-bind="winHubSection: {header: 'Section1'}"></div>
      <div class="hubSection" data-bind="winHubSection: {header: 'Section2'}"></div>
      <div class="hubSection" data-bind="winHubSection: {header: 'Section3'}"></div>
    </div>

### ItemContainer

    <!-- shown here used within a ko foreach -->
    <div data-bind="foreach: ratings">
      <div class="item" data-bind="winItemContainer: {swipeBehavior: 'select', swipeOrientation: 'horizontal', selected: selected}">
        <div class="content"><span>Person: </span><span data-bind="text: text"></span>&nbsp;
        <span>Rating: </span><span data-bind="text: rating"></span>&nbsp;
        <span>Selected: </span><span data-bind="text: selected"></span></div>
      </div>
    </div>
    
### ListView

    <div class="listView" data-bind="winListView: {itemTemplate: 'listViewItemTemplate', itemDataSource: listViewArray, layout: {type: WinJS.UI.GridLayout}}"></div>
    <script type="text/html" id="listViewItemTemplate">
      <div class="listViewItem">
        <div>
          <span>Name: </span><span data-bind="text: text"></span>
        </div>
        <div>
          <span>Rating: </span><span data-bind="text: rating"></span>
        </div>
      </div>
    </script>

### Menu and MenuCommand

    <button id="menuAnchor">Show a menu!</button>
    <div data-bind="winMenu: {anchor: '#menuAnchor', placement: 'right' }">
      <button data-bind="winMenuCommand: {id: 'menu2', label: 'Menu2', type: 'button'}"></button>
      <hr data-bind="winMenuCommand: {type: 'separator'}" />
      <button data-bind="winMenuCommand: {id: 'menu3', label: 'Menu3', type: 'button'}"></button>
    </div>

### Pivot

    <div data-bind="winPivot, event: { itemanimationend: itemAnimationEndHandler }">
        <div data-bind="winPivotItem: { header: 'Header1' }">Item1</div>
        <div data-bind="winPivotItem: { header: 'Header2' }">Item2</div>
    </div>

### Rating

    The current rating is: <span data-bind="text: userRating"></span><br/>
    <div data-bind="winRating: {userRating: userRating}"></div>

### SemanticZoom

    <div data-bind="winSemanticZoom">
        <div data-bind="winListView: { itemDataSource: zoomedInSource.dataSource, groupDataSource: zoomedInSource.groups.dataSource }"></div>
        <div data-bind="winListView: { itemDataSource: zoomedOutSource.dataSource }"></div>
    </div>

### SplitView

    <div data-bind="winSplitView">
        <div class="paneNode">
            SplitView pane area
            <button data-bind="winSplitViewCommand: {label: 'Home', icon: 'home', oninvoked: goToHome}"></button>
            <button data-bind="winSplitViewCommand: {label: 'Settings', icon: 'settings', oninvoked: goToSettings}"></button>
        </div>
        <div class="aContentNode">Text for the SplitView content area</div>
        <div class="anotherContentNode">More text for the SplitView content area</div>
    </div>

### SplitViewPaneToggle

    <button data-bind="winSplitViewPaneToggle: { splitView: splitViewElement }"></button>

### TimePicker

    <div data-bind="winTimePicker: {current: time}"></div>

### ToggleSwitch
    
    <div data-bind="winToggleSwitch: {checked: toggleValue, title: toggleTitle, labelOff: toggleLabelOff, labelOn: 'world'}"></div>

### ToolBar

    <div data-bind="winToolBar">
        <button data-bind="winCommand"></button>
        <button data-bind="winCommand"></button>
    </div>

### Tooltip

    <div data-bind="winTooltip: {contentElement: '#tip', infotip: true}">
      <div>Hover for infoTip</div>
    </div>
    <div style="display: none">
      <div id="tip">
        <div>Tooltip only allows one time binding of with contentElement:</div>
        <div data-bind="text: toolTipContent"></div>
      </div>
    </div>
