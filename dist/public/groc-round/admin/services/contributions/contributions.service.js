var GrocRoundAdminContributionsService;!function(e){var t=function(){return function(e,t,r){var o=this;this.$q=e,this.$http=t,this.ToastService=r,this.urlPrefix="/grocRound/admin/contributions",this.getContributions=function(e,t){var r=[],n=o.urlPrefix+"/getContributions";return e&&r.push("roundId="+e),t&&r.push("userId="+t),r.length&&(n+="?"+r.join("&")),o.$http.get(n).then(function(e){var t=e.data;return t.payload&&t.payload.foundContributions?o.$q.resolve(t.payload.foundContributions):o.$q.reject({message:t.message})}).catch(function(e){var t=e.message?e.message:"Operation failed";return o.ToastService.showSimple(t),o.$q.reject({message:t})})},this.getContribution=function(e){return o.$http.get(o.urlPrefix+"/getContribution/"+e).then(function(e){var t=e.data;return t.payload&&t.payload.foundContribution?o.$q.resolve(t.payload.foundContribution):o.$q.reject({message:t.message})}).catch(function(e){var t=e.message?e.message:"Operation failed";return o.ToastService.showSimple(t),o.$q.reject({message:t})})},this.addContribution=function(e){return o.$http.post(o.urlPrefix+"/addContribution",e).then(function(e){var t=e.data;return t.payload&&t.payload.addedContribution?(o.ToastService.showSimple("Cart product added"),o.$q.resolve(t.payload.addedContribution)):o.$q.reject({message:t.message})}).catch(function(e){var t=e.message?e.message:"Operation failed";return o.ToastService.showSimple(t),o.$q.reject({message:t})})},this.updateContribution=function(e,t){return o.$http.post(o.urlPrefix+"/updateContribution/"+e,t).then(function(e){var t=e.data;return t.payload&&t.payload.updatedContribution?(o.ToastService.showSimple("Cart product updated"),o.$q.resolve(t.payload.updateContribution)):o.$q.reject({message:t.message})}).catch(function(e){var t=e.message?e.message:"Operation failed";return o.ToastService.showSimple(t),o.$q.reject({message:t})})},this.removeContribution=function(e){return o.$http.get(o.urlPrefix+"/deleteContribution/"+e).then(function(e){var t=e.data;return t.success?(o.ToastService.showSimple("Cart product removed"),o.$q.resolve()):o.$q.reject({message:t.message})}).catch(function(e){var t=e.message?e.message:"Operation failed";return o.ToastService.showSimple(t),o.$q.reject({message:t})})}}}();e.Service=t}(GrocRoundAdminContributionsService||(GrocRoundAdminContributionsService={}));