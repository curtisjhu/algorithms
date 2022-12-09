package com.curtisjhu.Boid;

import processing.core.*;

import java.util.List;

import static java.lang.Math.round;

public class Boid {
    private PVector position;
    private PVector velocity;
    private final float speedLimit = 2.5f;
    private final int visionField = 40;


    public Boid(PVector position) {
        this.position = position;
        this.velocity = PVector.random3D().setMag(speedLimit);
    }

    /** Returns a PVector that describes the desired velocity */
    public void towardsCenter(List<Boid> flock, App win){
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

            // stick to center
            PVector toCenter = PVector.sub(win.dimensions.copy().div(2), position);
            float distanceToCenter = toCenter.mag();
            toCenter.setMag(speedLimit);
            toCenter.mult(distanceToCenter).mult(0.02f);

            PVector desiredLocation = PVector.add(neighborCenter, toCenter);
            PVector desiredDirection = PVector.sub(desiredLocation, position);

            desiredDirection.setMag(speedLimit);
            desiredDirection.mult(0.03f);

            velocity.add(desiredDirection);
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

    private void positionUpdate(List<Boid> flock, App win) {
        this.collisionAvoidance(flock);
        this.matchVelocity(flock);
        this.towardsCenter(flock, win);
        this.velocity.limit(speedLimit);
        this.position.add(this.velocity);
    }

    public void render(App window, List<Boid> flock) {
        this.bordersUpdate(window);
        this.positionUpdate(flock, window);

        window.circle(position.x, position.y, 2);
    }
}
