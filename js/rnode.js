function rNode(params) {

    params = params || {};

    this.objects = [];
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.angle = params.angle || 0;
};

rNode.prototype.add = function (resource) {
    this.objects.push(resource);
};


rNode.prototype.render = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle / 180) * Math.PI);
    for (var e = 0, ln = this.objects.length; e < ln; e++) {
        this.objects[e].render(ctx);
    };
    ctx.restore();
};