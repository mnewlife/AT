var DescLimitFilter;
(function (DescLimitFilter) {
    DescLimitFilter.getFilter = function () {
        return function () {
            return function (description) {
                if (description) {
                    return (description.length < 100) ? description : description.substring(0, 100) + "...";
                }
            };
        };
    };
})(DescLimitFilter || (DescLimitFilter = {}));
