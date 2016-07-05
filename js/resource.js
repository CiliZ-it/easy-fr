function Resource(params) {
    this.renderable = document.createElement("canvas");
    this.renderableContext = this.renderable.getContext("2d");
    this.asset = params.asset;
    this.x = 0;
    this.y = 0;
    this.opacity = 0;
    this.anchor = { x: 0, y: 0 };
    this.layer = false;
    this.ready = false;
    console.log(params)
    if (this.asset && !this.asset.ready) {
        this.asset.onReady(function () {
            this.init(this.asset, params.width, params.height);
        }.bind(this));
    };
    if (this.asset.ready) {
        this.init(this.asset, params.width, params.height);
    }

}

Resource.prototype.render = function (ctx) {

    if (this.beforeRender && this.beforeRender() == false) {
        this.beforeRender = false;
    };

    ctx.drawImage(this.renderable, this.x - (this.width * this.anchor.x), this.y - (this.height * this.anchor.y));

    if (this.afterRender && this.afterRender() == false) {
        this.afterRender = false;
    };

}

Resource.prototype.init = function (asset, width, height) {
    this.width = this.renderable.width = (width || asset.width);
    this.height = this.renderable.height = (height || asset.height);
    this.renderableContext.drawImage(asset.asset, 0, 0, this.width, this.height);
    this.onInit && this.onInit();
    this.ready = true;
};

Resource.prototype.clone = function () {
    return new Resource({
        asset: this.asset,
        width: this.width,
        height: this.height
    });
};
