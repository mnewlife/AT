var AboutHomeComponent;
(function (AboutHomeComponent) {
    var Component = (function () {
        /***************************************************/
        function Component($q, ToastService) {
            this.$q = $q;
            this.ToastService = ToastService;
            /***************************************************/
            this.route = function (destination) {
                if (destination) {
                    window.location.href = destination;
                }
            };
            this.services = [
                {
                    serviceName: "Grocery Rounds",
                    image: "/about/resources/drawable/groceryRound.png",
                    description: "Description Here",
                    href: "/grocRound"
                },
                {
                    serviceName: "Call 263",
                    image: "/about/resources/drawable/call263.jpg",
                    description: "Description Here",
                    href: "/call263"
                },
                {
                    serviceName: "More coming soon",
                    image: "/about/resources/drawable/mighty-eagle.jpg",
                    description: "Description Here",
                    href: ""
                }
            ];
        }
        return Component;
    }());
    AboutHomeComponent.Component = Component;
})(AboutHomeComponent || (AboutHomeComponent = {}));
/*******************************************************************/
