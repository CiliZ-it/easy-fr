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


    
    var x, y, z;
    Object.defineProperties(this, {
        x: {
            set: function (value) {
                x = value;
                this.layer.style.left = value + "px";
            },
            get: function () {
                return x;
            }
        },
        y: {
            set: function (value) {
                y = value;
                this.layer.style.top = value + "px";
            },
            get: function () {
                return y;
            }
        },
        z: {
            set: function (value) {
                z = value;
                this.layer.style.zIndex = value + "px";
            },
            get: function () {
                return z;
            }
        }
    });
    this.layer.style.position = "absolute";
    

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.z = params.z || 0;
    this.width = this.layer.width = params.width || 800;
    this.height = this.layer.height = params.height || 600;

    this.autoRender = false;

};

Layer.prototype.add = function (resource) {
    this.objects.push(resource);
};

Layer.prototype.show = function () {
    document.body.appendChild(this.layer);
    return this;
};

Layer.prototype.hide = function () {
    document.body.removeChild(this.layer);
    return this;
};

Layer.prototype.clear = function () {
    this.layerContext.clearRect(0, 0, this.width, this.height);
    return this;
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

    return this;
};

Layer.prototype.startRender = function () {
    this.autoRender = true;
    this.time = Date.now();
    this.render();
    return this;
}


Layer.prototype.stopRender = function () {
    this.autoRender = false;
    this.render();
    return this;
}