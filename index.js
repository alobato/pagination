"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var range = function range(start, end) {
  return _toConsumableArray(Array(end - start).keys()).map(function (k) {
    return k + start;
  });
};

var _default = (0, _react.memo)(function (_ref) {
  var _ref$initialPage = _ref.initialPage,
      initialPage = _ref$initialPage === void 0 ? 1 : _ref$initialPage,
      _ref$pageSize = _ref.pageSize,
      pageSize = _ref$pageSize === void 0 ? 20 : _ref$pageSize,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      _ref$previousLabel = _ref.previousLabel,
      previousLabel = _ref$previousLabel === void 0 ? 'Anterior' : _ref$previousLabel,
      _ref$nextLabel = _ref.nextLabel,
      nextLabel = _ref$nextLabel === void 0 ? 'Próxima' : _ref$nextLabel,
      _ref$fistLabel = _ref.fistLabel,
      fistLabel = _ref$fistLabel === void 0 ? 'Primeira' : _ref$fistLabel,
      _ref$lastLabel = _ref.lastLabel,
      lastLabel = _ref$lastLabel === void 0 ? 'Última' : _ref$lastLabel,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      rest = _objectWithoutProperties(_ref, ["initialPage", "pageSize", "items", "previousLabel", "nextLabel", "fistLabel", "lastLabel", "onChange"]);

  var getPager = (0, _react.useCallback)(function (totalItems, currentPage, pageSize) {
    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);
    var startPage, endPage;

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    } // calculate start and end item indexes


    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1); // create an array of pages

    var pages = range(startPage, endPage + 1); // return object with all pager properties required by the view

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }, []);
  var getPageOfItems = (0, _react.useCallback)(function (items, pager) {
    return items.slice(pager.startIndex, pager.endIndex + 1);
  }, []);

  var _useState = (0, _react.useState)(getPager(items.length, initialPage, pageSize)),
      _useState2 = _slicedToArray(_useState, 2),
      pager = _useState2[0],
      setPager = _useState2[1];

  var stringifyItems = JSON.stringify(items);
  (0, _react.useEffect)(function () {
    var newPager = getPager(items.length, initialPage, pageSize);
    setPager(newPager);
    var pageOfItems = getPageOfItems(items, newPager);
    onChange(pageOfItems);
  }, [stringifyItems, getPageOfItems, onChange, items, initialPage, pageSize, getPager]);

  var setPage = function setPage(page) {
    var newPager = getPager(items.length, page, pageSize);
    setPager(newPager);
    var pageOfItems = getPageOfItems(items, newPager);
    onChange(pageOfItems);
  };

  var isFirstPage = pager.currentPage === 1;

  var isCurrentPage = function isCurrentPage(page) {
    return pager.currentPage === page;
  };

  if (!items.length) return null;
  return _react["default"].createElement("div", rest, _react["default"].createElement("ul", null, _react["default"].createElement("li", {
    className: isFirstPage ? 'disabled' : ''
  }, isFirstPage ? _react["default"].createElement("span", null, fistLabel) : _react["default"].createElement("span", {
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      return e.key === 'Enter' && setPage(1);
    },
    onClick: function onClick() {
      return setPage(1);
    }
  }, fistLabel)), _react["default"].createElement("li", {
    className: isFirstPage ? 'disabled' : ''
  }, isFirstPage ? _react["default"].createElement("span", null, previousLabel) : _react["default"].createElement("span", {
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      return e.key === 'Enter' && setPage(pager.currentPage - 1);
    },
    onClick: function onClick() {
      return setPage(pager.currentPage - 1);
    }
  }, previousLabel)), pager.pages.map(function (page, index) {
    return _react["default"].createElement("li", {
      key: index,
      className: isCurrentPage(page) ? 'active' : ''
    }, _react["default"].createElement("span", {
      tabIndex: isCurrentPage(page) ? -1 : 0,
      onKeyPress: function onKeyPress(e) {
        return e.key === 'Enter' && setPage(page);
      },
      onClick: function onClick() {
        return setPage(page);
      }
    }, page));
  }), _react["default"].createElement("li", {
    className: pager.currentPage === pager.totalPages ? 'disabled' : ''
  }, pager.currentPage === pager.totalPages ? _react["default"].createElement("span", null, nextLabel) : _react["default"].createElement("span", {
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      return e.key === 'Enter' && setPage(pager.currentPage + 1);
    },
    onClick: function onClick() {
      return setPage(pager.currentPage + 1);
    }
  }, nextLabel)), _react["default"].createElement("li", {
    className: pager.currentPage === pager.totalPages ? 'disabled' : ''
  }, pager.currentPage === pager.totalPages ? _react["default"].createElement("span", null, lastLabel) : _react["default"].createElement("span", {
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      return e.key === 'Enter' && setPage(pager.totalPages);
    },
    onClick: function onClick() {
      return setPage(pager.totalPages);
    }
  }, lastLabel))));
});

exports["default"] = _default;
