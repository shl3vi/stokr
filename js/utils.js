const utils = {
  toFixed: function (num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  },

  swapInArray(arr, i_1, i_2) {
    let tmp = arr[i_1];
    arr[i_1] = arr[i_2];
    arr[i_2] = tmp;
  },

  getParentByTag(element, tag) {
    let parent = element.parentElement;
    if (!parent) {
      return null;
    }
    if (parent.tagName === tag.toUpperCase()) {
      return parent;
    }
    return this.getParentByTag(parent, tag);
  },

  invokeListeners(_this, event/*, args for event-listener...*/){
    const args = [];

    // prepare the args for the listener
    for (let i=2; i < arguments.length; i++){
      args.push(arguments[i]);
    }

    // invoke all listeners
    _this.eventsListeners[event].forEach(function(listener){
      listener.apply(null, args);
    })
  },

  addEventListener(invoker, event, listener){
    invoker.eventsListeners[event].push(listener)
  }
};


