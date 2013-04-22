(function ($) {
    $.fn.extend({
        //pass the options variable to the function
        showDialog: function (options) {
            var html = '<div id="dlgContainer" class="modal hide fade" tabindex="-1" role="dialog">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h3 id="dlgHeader"></h3>' +
                '</div>' +
                '<div id="dlgBody" class="modal-body"></div>' +
                '<div class="modal-footer">' +
                '<button id="dlgBtnCancel" class="btn" data-dismiss="modal" aria-hidden="true">取消</button>' +
                '<button id="dlgBtnConfirm" class="btn btn-primary">确定</button>' +
                '</div>' +
                '</div>';

            var defaults = {
                header: 'Please confirm',
                body: 'Body contents'
            };

            var options = $.extend(defaults, options);
            var dlg = $(html);
            $('#dlgHeader', dlg).html(options.header);
            $('#dlgBody', dlg).html(options.body);
            dlg.on('shown', function() {
                dlg.find("button.btn-primary:first").focus();
            });
            dlg.on("hidden", function(){
                dlg.remove();
            });
            $("body").append(dlg);

            var defer = $.Deferred();
            var promise = defer.promise();
            promise.confirm = promise.done;
            promise.cancel = promise.fail;
            $('#dlgBtnConfirm', dlg).click(function () {
                defer.resolve(dlg);
                //dlg.modal('hide');
            });
            $('#dlgBtnCancel', dlg).click(function () {
                defer.reject(dlg);
                //dlg.modal('hide');
            });
            dlg.modal('show');
            return promise;
        }
    });

})(window.jQuery);