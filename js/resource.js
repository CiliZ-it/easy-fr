function Resource(params) {
    this.renderable = document.createElement("canvas");
    this.renderableContext = this.renderable.getContext("2d");
    this.asset = params.asset;

    if (this.asset) {
        this.asset.onReady(function () {
            this.init(this.asset, params.width, params.height);
        }.bind(this));
    };

}

Resource.prototype.init = function (asset, width, height) {
    this.width = this.renderable.width = width || asset.width;
    this.height = this.renderable.height = height || asset.height;
    this.renderableContext.drawImage(asset.asset, 0, 0);
};

Resource.prototype.clone = function () {
    return new Resource({
        asset: this.asset,
        width: this.width,
        height: this.height
    });
};
