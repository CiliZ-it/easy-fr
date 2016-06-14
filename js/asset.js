function Asset(params) {
    this.asset = new Image;
    this.ready = false;
    
    if (params.src) {
        this.asset.onload = this.onAssetReady.bind(this.asset, this);
        this.asset.src = params.src;
    }

};

Asset.prototype.onAssetReady = function (self, asset, width, height) {
    self.ready = true;
    self.width = this.naturalWidth;
    self.height = this.naturalHeight;

    if (self.readyListeners) {
        for (var l = 0, ln = self.readyListeners.length; l < ln; l++) {
            self.readyListeners[l](self);
        };
    };
};

Asset.prototype.onReady = function (fn) {
    this.readyListeners = this.readyListeners || [];
    this.readyListeners.push(fn);
}
