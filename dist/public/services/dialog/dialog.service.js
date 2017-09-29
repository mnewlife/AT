var DialogService;
(function (DialogService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $mdDialog) {
            var _this = this;
            this.$q = $q;
            this.$mdDialog = $mdDialog;
            /***************************************************/
            this.showPrompt = function (title, textContext, ev, placeholder, okText, cancelText) {
                var prompt = _this.$mdDialog.prompt();
                prompt.title(title);
                prompt.textContent(textContext);
                prompt.ariaLabel("Prompt Dialog");
                if (placeholder)
                    prompt.placeholder(placeholder);
                if (ev)
                    prompt.targetEvent(ev);
                if (okText)
                    prompt.ok(okText);
                if (cancelText)
                    prompt.cancel(cancelText);
                return _this.$mdDialog.show(prompt)
                    .then(function (result) {
                    if (result) {
                        return _this.$q.resolve(result);
                    }
                    else {
                        return _this.$q.reject();
                    }
                })
                    .catch(function (reason) {
                    return _this.$q.reject(reason);
                });
            };
        }
        /***************************************************/
        Service.prototype.showAlert = function (title, textContent, ev, okText) {
            var _this = this;
            var dialog = this.$mdDialog.alert();
            dialog.parent(angular.element(document.body));
            dialog.clickOutsideToClose(true);
            dialog.ariaLabel("Alert Dialog");
            dialog.title(title);
            dialog.textContent(textContent);
            if (ev) {
                dialog.targetEvent(ev);
            }
            dialog.ok((okText) ? okText : "Got It");
            return this.$mdDialog.show(alert)
                .then(function (response) {
                return _this.$q.resolve();
            });
        };
        /***************************************************/
        Service.prototype.showConfirm = function (title, textContent, ev, okText, cancelText) {
            var _this = this;
            var dialog = this.$mdDialog.confirm();
            dialog.ariaLabel("Confirm Dialog");
            dialog.title(title);
            dialog.textContent(textContent);
            if (ev) {
                dialog.targetEvent(ev);
            }
            dialog.ok((okText) ? okText : "Yes");
            dialog.cancel((cancelText) ? cancelText : "No");
            return this.$mdDialog.show(dialog)
                .then(function (response) {
                return _this.$q.resolve(true);
            })
                .catch(function (reason) {
                return _this.$q.resolve(false);
            });
        };
        return Service;
    }());
    DialogService.Service = Service;
})(DialogService || (DialogService = {}));
/*******************************************************************/ 
