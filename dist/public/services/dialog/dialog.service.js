var DialogService;
(function (DialogService) {
    var Service = (function () {
        /***************************************************/
        function Service($q, $mdDialog) {
            this.$q = $q;
            this.$mdDialog = $mdDialog;
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
            dialog.targetEvent(ev);
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
            dialog.targetEvent(ev);
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
