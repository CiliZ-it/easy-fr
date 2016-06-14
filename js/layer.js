function Layer(params) {
    this.layer = document.createElement("canvas");
    this.layerContext = this.layer.getContext("2d");
    this.objects = [];

    this.width = this.layer.width = params.width || 800;
    this.height = this.layer.height = params.height || 600;
};

Layer.prototype.add = function (resource) {
    this.objects.push(resource);
};