function Layer(params) {
    params = params || {};

    this.layer = document.createElement("canvas");
    this.layerContext = this.layer.getContext("2d");
    this.objects = [];
    
    Object.defineProperties(this, {
        width: {
            set: function (val) {
                this.layer.width = val;
            },
            get: function () {
                return this.layer.width;
            }
        },
        height: {
            set: function (val) {
                this.layer.height = val;
            },
            get: function () {
                return this.layer.height;
            }
        }
    })

    this.width = params.width || 800;
    this.height = params.height || 600;



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
    var dt = Date.now() - this.time;
    for (var e = 0, ln = this.objects.length; e < ln; e++) {

        this.objects[e].render(this.layerContext);

    };

    if (this.autoRender) {

        window.requestAnimationFrame(this.render.bind(this));

    }

};

Layer.prototype.startRender = function () {
    this.autoRender = true;
    this.time = Date.now();
    this.render();
}


Layer.prototype.stopRender = function () {
    this.autoRender = false;
    this.render();
}