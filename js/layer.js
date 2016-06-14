function Layer(params) {
    params = params || {};

    this.layer = document.createElement("canvas");
    this.layerContext = this.layer.getContext("2d");
    this.objects = [];

    this.width = this.layer.width = params.width || 800;
    this.height = this.layer.height = params.height || 600;

    this.autoRender = false;
};

Layer.prototype.add = function (resource) {
    this.objects.push(resource);
};

Layer.prototype.show = function () {
    document.body.appendChild(this.layer);
};

Layer.prototype.hide = function () {
    document.body.removeChild(this.layer);
};

Layer.prototype.clear = function () {
    this.layerContext.clearRect(0, 0, this.width, this.height);
}

Layer.prototype.render = function () {

    this.clear();
    for (var e = 0, ln = this.objects.length; e < ln; e++) {
        this.layerContext.drawImage(this.objects[e].renderable, this.objects[e].x, this.objects[e].y);
    };

    if (this.autoRender) {
        window.requestAnimationFrame(this.render.bind(this));
    }

};

Layer.prototype.startRender = function () {
    this.autoRender = true;
    this.render();
}


Layer.prototype.stopRender = function () {
    this.autoRender = false;
    this.render();
}