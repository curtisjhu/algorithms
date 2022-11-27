package com.curtisjhu.Boid;

import processing.core.*;

import java.util.List;

public class Boid {
    private PVector position;
    private PVector velocity;
    private float radius;
    private final float speedLimit = 2.5f;
    private final int visionField = 40;


    public Boid(PVector position) {
        this.position = position;
        this.velocity = PVector.random3D().setMag(speedLimit);
    }

    /** Returns a PVector that describes the desired velocity */
    public void towardsCenter(List<Boid> flock){
        PVector neighborCenter = new PVector(0, 0, 0);
        int total = 0;
        for (Boid other : flock) {
            float d = other.position.dist(this.position);
            if (d > 0 && d < visionField) {
                neighborCenter.add(other.position);
                total++;
            }
        }

        if (total > 0) {
            neighborCenter.div(total);
            PVector direction = PVector.sub(neighborCenter, position);

            direction.setMag(speedLimit);
            direction.mult(0.05f);
            velocity.add(direction);
        }
    }

    public void collisionAvoidance(List<Boid> flock) {
        int desiredSpace = 10;
        PVector avgDirection = new PVector(0, 0, 0);
        int total = 0;
        for (Boid other : flock) {
            if (other != this) {
                float d = other.position.dist(this.position);
                if (d > 0 && d < desiredSpace) {
                    // Vector from other boid towards yourself.
                    PVector normal = PVector.sub(this.position, other.position);
                    normal.normalize();
                    normal.mult(desiredSpace).div(d); // strength of correction = 1/d
                    avgDirection.add(normal);
                    total++;
                }
            }
        }

        if (total > 0) {
            avgDirection.div(total);
            avgDirection.setMag(speedLimit);
            avgDirection.mult(0.4f);
            velocity.add(avgDirection);
        }
    }

    public void matchVelocity(List<Boid> flock) {
        PVector avgVelocity = new PVector(0, 0, 0);
        int total = 0;
        for (Boid other : flock) {
            if (other != this) {
                float d = other.position.dist(this.position);
                if (d < visionField) {
                    avgVelocity.add(other.velocity);
                    total++;
                }
            }
        }
        if (total > 0) {
            avgVelocity.div(total);
            avgVelocity.setMag(speedLimit);
            avgVelocity.mult(0.03f);
            velocity.add(avgVelocity);
        }
    }

    private void bordersUpdate(App window) {
        float padding = 25;
        PVector correction = new PVector(0, 0, 0);
        if (position.x < padding) correction.x = 1;
        else if (position.x > window.dimensions.x - padding) correction.x = -1;

        if (position.y < padding) correction.y = 1;
        else if (position.y > window.dimensions.y - padding) correction.y = -1;

        if (position.z < padding) correction.z = 1;
        else if (position.z > window.dimensions.z - padding) correction.z = -1;

        correction.setMag(speedLimit);
        correction.mult(1f);
        velocity.add(correction);
    }

    private void positionUpdate(List<Boid> flock) {
        this.collisionAvoidance(flock);
        this.matchVelocity(flock);
        this.towardsCenter(flock);
        this.velocity.limit(speedLimit);
        this.position.add(this.velocity);
    }

    private float map(float x, float startX, float endX, float startY, float endY) {
        float p = (x - startX)/endX;
        return startY + p * (endY - startY);
    }

    public void render(App window, List<Boid> flock) {
        this.bordersUpdate(window);
        this.positionUpdate(flock);

//        radius = map(position.z, 0, window.dimensions.z, 13, 4);
//        int alphaColor = (int) map(position.z, 0, window.dimensions.z, 180, 70);
//        window.fill(0, alphaColor);
        window.circle(position.x, position.y, 3);
    }
}
