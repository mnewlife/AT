var GrocRoundAdminRoundContributorsComponent;!function(o){var n=function(){return function(o,n,t){var r=this;this.$routeParams=o,this.$location=n,this.RoundContributorsService=t,this.getRoundContributors=function(o,n){r.RoundContributorsService.getRoundContributors(o,n).then(function(o){o.forEach(function(o){r.roundContributors.push(o)})}).catch(function(o){r.errorMessage=o&&o.message?o.message:"Operation Failed"})},this.route=function(o){o&&r.$location.path(o)},this.roundContributors=[];var i=this.$location.search();i&&i.roundId&&i.userId?this.getRoundContributors(i.roundId,i.userId):window.history.back()}}();o.Component=n}(GrocRoundAdminRoundContributorsComponent||(GrocRoundAdminRoundContributorsComponent={}));