class Drawer {
  constructor(selector) {
    this.polygons = [];
    this.me = document.querySelector(selector);
    this.ctx = null;
    this.target = null;

    this.me.onmousedown = this.onMouseDown;
    this.me.onmouseup = this.onMouseUp;
    this.me.onmousemove = this.onMouseMove;

    if (this.me.getContext) {
      this.ctx = this.me.getContext('2d');
      this.resize();
    } else {
      throw new Error('canvas context:2d is not available!');
    }
  }

  onResize() {
    this.resize();
    this.clear();
    this.render();
  }

  resize() {
    const rect = this.me.getBoundingClientRect();
    this.me.width = rect.width * window.devicePixelRatio;
    this.me.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  clear() {
    const rect = this.me.getBoundingClientRect();
    this.ctx.clearRect(0, 0, this.me.width, this.me.height);
  }

  render() {
    this.polygons.forEach(polygon => polygon.draw());
  }

  addPolygon(polygon) {
    this.polygons.push(polygon);
    polygon.attach(this.ctx);
    polygon.draw();
  }

  removePolygon(polygon) {
    const index = this.polygons.indexOf(polygon);
    if (index !== -1) {
      this.polygons[index].destroy();
      this.polygons[index].detach();
      this.polygons.splice(index, 1);
    }
  }

  onMouseDown = (event) => {
    const point = DrawHelper.getMousePosition(this.me, event);
    for (let i = 0; i < this.polygons.length; i++) {
      if (this.polygons[i].isInCornerPath(point) && this.polygons[i].scalable) {
        this.polygons[i].scaleStart(point);
        this.target = this.polygons[i];
        break;
      }
      if (this.polygons[i].isInPath(point) && this.polygons[i].dragable) {
        this.polygons[i].dragStart(point);
        this.target = this.polygons[i];
        break;
      }
    }
  }

  onMouseMove = (event) => {
    const point = DrawHelper.getMousePosition(this.me, event);
    if (!this.target) return;
    switch (this.target.status) {
      case 'draging':
        this.target.drag(point)
        break;
      case 'scaling':
        this.target.scale(point)
        break;
      default:
        break;
    }
  }

  onMouseUp = (event) => {
    const point = DrawHelper.getMousePosition(this.me, event);
    if (!this.target) return;
    switch (this.target.status) {
      case 'draging':
        this.target.dragEnd(point)
        break;
      case 'scaling':
        this.target.scaleEnd(point)
        break;
      default:
        break;
    }
    this.target = null;
  }
}

class DrawHelper {
  static drawPoints(ctx, points) {
    const firstPoint = points[0];
    ctx.strokeStyle = 'red';
    ctx.beginPath();

    ctx.moveTo(firstPoint.x, firstPoint.y);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.stroke();
  }

  static getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left * (canvas.width / rect.width);
    const y = event.clientY - rect.top * (canvas.height / rect.height);

    return { x, y };
  }

  static clearRect(ctx, x, y, width, height) {
    ctx.clearRect(x, y, width, height);
  }

  static checkGeometry(geometry) {
    const keys = Object.keys(geometry);
    for (let i = 0; i < keys.length; i++) {
      if (geometry[keys[i]] < 0) {
        throw new Error(`geometry: value of ${keys[i]} is no less than 0!`);
      }
    }
    return geometry;
  }

  static drawRect() {}
}

class Polygon {
  dragable=false
  scalable=false
  status='pending'
  prePoint=null
  constructor() {
    this.ctx = null;
  }

  draw() {}
  destroy() {}

  attach(ctx) {
    this.ctx = ctx;
  }
  detach() {
    this.ctx = null;
  }

  isInPath(point) { return false }
  isInCornerPath(point) { return false }

  scaleStart(point) {
    this.status = 'scaling';
    this.prePoint = point;
  }
  scale(point) {
    this.destroy();
    this.update(point);
    this.draw();
  }
  scaleEnd(point) {
    this.status = 'pending';
    this.destroy();
    this.update(point);
    this.draw();
    this.prePoint = null;
  }

  dragStart(point) {
    this.status = 'draging';
    this.prePoint = point;
  }
  drag(point) {
    this.destroy();
    this.update(point);
    this.draw();
  }
  dragEnd(point) {
    this.status = 'pending';
    this.destroy();
    this.update(point);
    this.draw();
    this.prePoint = null;
  }

}

class DragableAndScalableRect extends Polygon {
  minWidth = 0
  minHeight = 0
  constructor(geometry) {
    super();
    this.geometry = DrawHelper.checkGeometry(geometry);
    this.minWidth = 'minWidth' in geometry ? geometry.minWidth : this.minWidth;
    this.minHeight = 'minHeight' in geometry ? geometry.minHeight : this.minHeight;
    this.points = this.getPoints();
    this.cornerPoint = null;
    this.dragable = true;
    this.scalable = true;
  }

  isInPath(point, geometry) {
    const { x, y, width, height } = geometry || this.geometry;
    return (point.x >= x - width/2) &&
            (point.x <= x + width/2) &&
            (point.y >= y - height/2) &&
            (point.y <= y + height/2);
  }

  isInCornerPath(point) {
    const [rectPoints, ...cornerPoints] = this.points;
    const { cornerWidth } = this.geometry;
    for (let i = 0; i < rectPoints.length; i++) {
      if (
        this.isInPath(
          point,
          {...rectPoints[i], width: cornerWidth, height: cornerWidth})
        ) {
          this.cornerPoint = i;
          return true;
        }
    }
    this.cornerPoint = null;
    return false;
  }

  draw() {
    this.points.forEach(pointArray => {
      if (Array.isArray(pointArray)) {
        DrawHelper.drawPoints(this.ctx, pointArray);
      }
    });
  }

  destroy() {
    const { width, height, cornerWidth } = this.geometry;
    const [rectPoints, ...cornerPoints] = this.points;
    const leftTopPoint = rectPoints[0];
    DrawHelper.clearRect(this.ctx, leftTopPoint.x - 1, leftTopPoint.y - 1, width + 2, height + 2);
    cornerPoints.forEach((cPoint) => {
      DrawHelper.clearRect(this.ctx, cPoint[0].x - 1, cPoint[0].y - 1, cornerWidth + 2, cornerWidth + 2);
    });
  }

  updateWhenDraging(point) {
    const { prePoint } = this;
    this.geometry.x = this.geometry.x + (point.x - prePoint.x);
    this.geometry.y = this.geometry.y + (point.y - prePoint.y);
    this.points = this.getPoints();
    this.prePoint = point;
  }

  updateWhenScaling(point) {
    const { prePoint } = this;
    const xDistance = (point.x - prePoint.x);
    const yDistance = (point.y - prePoint.y);
    const newGeometry = {...this.geometry };

    switch (this.cornerPoint) {
      case 0:
        newGeometry.x = this.geometry.x + (xDistance) / 2;
        newGeometry.y = this.geometry.y + (yDistance) / 2;
        newGeometry.width = this.geometry.width - (xDistance);
        newGeometry.height = this.geometry.height - (yDistance);
        break;
      case 1:
        newGeometry.x = this.geometry.x + (xDistance) / 2;
        newGeometry.y = this.geometry.y + (yDistance) / 2;
        newGeometry.width = this.geometry.width + (xDistance);
        newGeometry.height = this.geometry.height - (yDistance);
        break;
      case 2:
        newGeometry.x = this.geometry.x + (xDistance) / 2;
        newGeometry.y = this.geometry.y + (yDistance) / 2;
        newGeometry.width = this.geometry.width + (xDistance);
        newGeometry.height = this.geometry.height + (yDistance);
        break;
      case 3:
        newGeometry.x = this.geometry.x + (xDistance) / 2;
        newGeometry.y = this.geometry.y + (yDistance) / 2;
        newGeometry.width = this.geometry.width - (xDistance);
        newGeometry.height = this.geometry.height + (yDistance);
        break;
      default:
        return;
    }

    if (
      newGeometry.width < this.minWidth ||
      newGeometry.height < this.minHeight
    ) {
      return;
    }
    this.geometry = newGeometry;
    this.points = this.getPoints();
    this.prePoint = point;
  }

  update(point) {
    switch (this.status) {
      case 'draging':
        this.updateWhenDraging(point);
        break;
      case 'scaling':
        this.updateWhenScaling(point);
        break;
      default:
        break;
    }
  }

  getPointFromGeometry(x, y, width, height) {
    return {
      leftTopPoint: {
        x: x - width / 2,
        y: y - height / 2
      },
      rightTopPoint: {
        x: x + width / 2,
        y: y - height / 2
      },
      leftBottomPoint: {
        x: x - width / 2,
        y: y + height / 2
      },
      rightBottomPoint: {
        x: x + width / 2,
        y: y + height / 2
      }
    };
  }

  getPoints() {
    const { x, y, width, height, cornerWidth } = this.geometry;
    const rectPosition = this.getPointFromGeometry(x, y, width, height);
    const leftTopPoint = rectPosition.leftTopPoint;
    const rightTopPoint = rectPosition.rightTopPoint;
    const leftBottomPoint = rectPosition.leftBottomPoint;
    const rightBottomPoint = rectPosition.rightBottomPoint;

    const leftTopRectPosition = this.getPointFromGeometry(leftTopPoint.x, leftTopPoint.y, cornerWidth, cornerWidth);
    const rightTopRectPosition = this.getPointFromGeometry(rightTopPoint.x, rightTopPoint.y, cornerWidth, cornerWidth);
    const rightBottomRectPosition = this.getPointFromGeometry(rightBottomPoint.x, rightBottomPoint.y, cornerWidth, cornerWidth);
    const leftBottomRectPosition = this.getPointFromGeometry(leftBottomPoint.x, leftBottomPoint.y, cornerWidth, cornerWidth);

    const leftTopRect = [
      leftTopRectPosition.leftTopPoint,
      leftTopRectPosition.rightTopPoint,
      leftTopRectPosition.rightBottomPoint,
      leftTopRectPosition.leftBottomPoint
    ];
    const rightTopRect = [
      rightTopRectPosition.leftTopPoint,
      rightTopRectPosition.rightTopPoint,
      rightTopRectPosition.rightBottomPoint,
      rightTopRectPosition.leftBottomPoint
    ];
    const rightBottomRect = [
      rightBottomRectPosition.leftTopPoint,
      rightBottomRectPosition.rightTopPoint,
      rightBottomRectPosition.rightBottomPoint,
      rightBottomRectPosition.leftBottomPoint
    ];
    const leftBottomRect = [
      leftBottomRectPosition.leftTopPoint,
      leftBottomRectPosition.rightTopPoint,
      leftBottomRectPosition.rightBottomPoint,
      leftBottomRectPosition.leftBottomPoint
    ];

    return [
      [
        leftTopPoint, rightTopPoint, rightBottomPoint, leftBottomPoint
      ],
      leftTopRect,
      rightTopRect,
      rightBottomRect,
      leftBottomRect
    ];
  }
}