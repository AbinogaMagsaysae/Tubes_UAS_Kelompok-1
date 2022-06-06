class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(2, 0);
    this.r = 2;
    this.maxspeed = 1;
    this.maxforce = 0.1;
  }

  run() {
    this.update();
    this.display();
  }
  follow(p) {

    let predict = this.velocity.copy();
    predict.normalize();
    //predict.mult(10);
    let predictLoc = p5.Vector.add(this.position, predict);

    let normal = null;
    let target = null;
    let worldRecord = 1000000; 

    // Loop through all points of the path
    for (let i = 0; i < p.points.length - 1; i++) {
      let a = p.points[i];
      let b = p.points[i + 1];
      //println(b);

      let normalPoint = getNormalPoint(predictLoc, a, b);
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b.copy();
      }
      let distance = p5.Vector.dist(predictLoc, normalPoint);
      if (distance < worldRecord) {
        worldRecord = distance;
        normal = normalPoint;
        let dir = p5.Vector.sub(b, a);
        dir.normalize();
        dir.mult(10);
        target = normalPoint.copy();
        target.add(dir);
      }
    }
    if (worldRecord > p.radius && target !== null) {
      this.seek(target);
    }

    if (debug) {
      stroke(255);
      fill(200);
      line(this.position.x, this.position.y, predictLoc.x, predictLoc.y);
      ellipse(predictLoc.x, predictLoc.y, 4, 4);
      
      stroke(255);
      fill(200);
      ellipse(normal.x, normal.y, 4, 4);
 
      line(predictLoc.x, predictLoc.y, normal.x, normal.y);
      if (worldRecord > p.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }
  }


  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); 
    if (desired.mag() === 0) return;
    desired.normalize();
    desired.mult(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  borders(p) {
    if (this.position.x > p.getEnd().x + this.r) {
      this.position.x = p.getStart().x - this.r;
      this.position.y = p.getStart().y + (this.position.y - p.getEnd().y);
    }
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    fill(255);
    stroke(255);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate();
    fill("blue")
    ellipse(-10, 0, 28, 8) //badan pesawat
    arc(-20, -1, 4, 10, radians(180), radians(360)) //ekor
    fill(128)
    arc(-10,-4, 5, 15, radians(180), radians(360)) //sayap kiri
    arc(-10, 2, 5, 20, radians(0), radians(180))  //sayap kanan
    pop();
  }

}

function getNormalPoint(p, a, b) {
  // Vector from a to p
  let ap = p5.Vector.sub(p, a);
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}