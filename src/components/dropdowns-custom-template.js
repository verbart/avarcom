export default function ($templateCache) {
    $templateCache.put('ngDropdowns/templates/dropdownSelectItem.html', [
        '<li ng-class="{active: dropdownSelectItem.is_selected, divider: (dropdownSelectItem.divider && !dropdownSelectItem[dropdownItemLabel]), \'divider-label\': (dropdownSelectItem.divider && dropdownSelectItem[dropdownItemLabel])}">',
        '<a href="" class="dropdown-item"',
        ' ng-if="!dropdownSelectItem.divider"',
        ' ng-href="{{dropdownSelectItem.href}}"',
        ' ng-click="selectItem()">',
        '{{dropdownSelectItem[dropdownItemLabel]}}',
        '</a>',
        '<span ng-if="dropdownSelectItem.divider">',
        '{{dropdownSelectItem[dropdownItemLabel]}}',
        '</span>',
        '</li>'
    ].join(''));
}
