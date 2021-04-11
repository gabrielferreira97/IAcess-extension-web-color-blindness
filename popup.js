var lc1306 = jQuery.noConflict(true);

(function ($) {

    $(function () {

        chrome.storage.sync.get('colorblindingValue', function (obj) {

            var noValue = obj.colorblindingValue === null || obj.colorblindingValue === undefined;
            $("input[name=type][value=" + (noValue ? "normal" : obj.colorblindingValue ) + "]").prop('checked', true);

            if (obj.colorblindingValue !== 'normal' && !noValue) {
               //console.log("internal " + obj.colorblindingValue);
                execute();
            }

        });

        $('input[name="type"]:radio').change(
            function () {

                var newValue = $('input[name=type]:checked', '#cvd_radios').val();
                chrome.storage.sync.set({'colorblindingValue': newValue}, function () {

                    if (newValue !== 'deactivate') {
                        chrome.tabs.executeScript({file: 'background.js'});
                    } else {
                        chrome.tabs.executeScript({file: 'recarregar.js'});
                    }

                });
            }
        );

    });

})(lc1306);