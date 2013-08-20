(function(window, $, _){
// START

var qComplete = function( selector ) {
    return new qComplete.prototype.init(selector);
};

var _this = "";

qComplete.prototype = {
    init: function(selector) {
        // constructor
        _this = this;
        _this.$textfield = $(selector);
        return _this;
    },
    init_widget: function(options) {
        // initialize specified widget
        _this.total_data = options.data.slice(0);
        _this.current_data = _this.total_data.slice(0);
        _this.$widget = $(options.widget_selector);
        _this.$submit = $(options.submit_selector);
        _this.$textfield.on('keyup', onKeyUp);
        _this.$submit.on('click', onPressSubmit);
        _this.$widget.on('click', 'li', onItemSelected);

        _this.$widget.hide();

        return _this;
    },
    displayOptions: function() {
        // display current options in widget
        var current_options = _this.current_data;
        _this.$widget.html("");
        _.map(current_options, function(item) {
            var $li = $('<li></li>');
            $li.html(item);
            _this.$widget.append($li);
        });
    }
};

/*
 * Events
 */

var onKeyUp = function(evt) {
    var text = _this.$textfield.val();

    if (text === "") {
        _this.$widget.hide();
    } else {
        _this.$widget.show();
    }

    new_candidates = getMatched(text, _this.total_data);
    _this.current_data = new_candidates;


    _this.displayOptions();
    checkAvaibility();

}

var onPressSubmit = function(evt) {
    if ( ! _this.$submit.hasClass("available") ) {
        alert("No!! You can not pass");
        evt.preventDefault();
    }

}

var onItemSelected = function(evt) {
    text = $(this).html();
    _this.$textfield.val(text);
    checkAvaibility();
    _this.$widget.hide();
}

/*
 * Utils
 */

var checkAvaibility = function() {
    // check the input field whether matched one of candidates
    var text = _this.$textfield.val();
    var complete = _.find(_this.current_data, function(s){ return s == text; });

    if (complete == undefined) {
        _this.$submit.removeClass("available");
    } else {
        _this.$submit.addClass("available");
    }
}

var getMatched = function (refer, candidates) {
    // get matched candidates
    var new_candidates = _.filter(candidates, function(word){
        return word.contains(refer);
    });

    return new_candidates;
}


// made qComplete return instance but not void
qComplete.prototype.init.prototype = qComplete.prototype;


// declare window.qComplete
window.qComplete = qComplete;

// END
})(window, jQuery, _);

