var IntentController = new (function() { 
  this.renderActionContainer = function (action, root) {
    var header = document.createElement("h2");
    header.textContent = action.key;
    var collection = document.createElement("ul");

    root.appendChild(header);
    root.appendChild(collection);

    return collection; 
  };
  
  this.renderActions = function(actions, intent, root) {
    root = root || document.getElementById("actions");
    var action;
    for(var i = 0; action = actions[i]; i++) {
      var actionElement = renderAction(action, intent);
      root.appendChild(actionElement); 
    } 
  };

  var launch = function(intent) { 
    return function(e) {
      e.preventDefault();
      var intentStr = window.atob(JSON.stringify(intent));
      var w = window.open(e.target.href, intentStr); 
      window.close();
      return false;
    };
  };

  var renderAction = function(action, intent) {
    var actionElement = document.createElement("li");
    var actionLink = document.createElement("a");
    var icon = document.createElement("img");
    var domain = document.createElement("span");

    icon.src = action.icon;

    actionLink.href = action.url;
    actionLink.target = "_blank";
    actionLink.textContent = action.title;
    attachEventListener(actionLink, "click", launch(intent), false);

    domain.textContent = action.domain || "Unknown domain";
    
    actionElement.appendChild(icon);
    actionElement.appendChild(actionLink);
    actionElement.appendChild(domain);

    return actionElement;
  };
})();
