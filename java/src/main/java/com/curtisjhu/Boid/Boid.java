package com.curtisjhu.Boid;

import processing.core.*;

import java.util.List;

public class Boid {
    PVector position;
    PVector velocity;
    PVector acceleration;
    float radius;
    int speedLimit = 1;
    float accelLimit = 0.02f;
    int visionField = 40;


    public Boid(PVector position) {
        this.position = position;
        this.velocity = PVector.random3D();
        this.acceleration = new PVector(0, 0, 0);
    }

    /** Steer is the acceleration. AKA how it wants the velocity to change.
     * Steer = Desired - Velocity. */
    private PVector steer(PVector desired) {
        // desired is the direction we want to go
        desired.setMag(speedLimit);
        // PVector pointing from our velocity to desired velocity.
        // We must take into account its current velocity.
        PVector steeringAccel = PVector.sub(desired, velocity);
        steeringAccel.limit(accelLimit); // acceleration as high as possible
        return steeringAccel;
    }

    /** Returns a PVector that describes the desired velocity */
    public PVector towardsCenter(List<Boid> flock){
        PVector neighbors = new PVector(0, 0, 0);
        int total = 0;
        for (Boid other : flock) {
            if (other != this) {
                float d = other.position.dist(this.position);
                if (d > 0 && d < visionField) {
                    neighbors.add(other.position);
                    total++;
                }
            }
        }

        if (total > 0) {
            neighbors.div(total);
            // PVector from current position pointing to average position
            // This represents the desired velocity if it were static
            PVector desired = PVector.sub(neighbors, this.position);
            return steer(desired);
        }
        return neighbors;
    }

    public PVector collisionAvoidance(List<Boid> flock) {
        int desiredSpace = 20;
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
            // avgDirection is desired. We find the steer direction
            return steer(avgDirection);
        }
        return avgDirection;
    }

    public PVector matchVelocity(List<Boid> flock) {
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
            return steer(avgVelocity);
        }
        return avgVelocity;
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

        // Correction is desired vector. We must offset this with our current velocity.
        float turnFactor = 3f;
        PVector correctionAccel = correction.setMag(accelLimit).mult(turnFactor);
        acceleration.add(correctionAccel);
    }

    /** We need information about the flock to update */
    private void herdUpdate(List<Boid> flock) {
        /** These are accelerations */
        PVector cohesion = towardsCenter(flock);
        PVector separate = collisionAvoidance(flock);
        PVector align = matchVelocity(flock);

        cohesion.mult(0f);
        separate.mult(0f);
        align.mult(1f);

        acceleration.add(cohesion);
        acceleration.add(separate);
        acceleration.add(align);
    }

    private void positionUpdate() {
        velocity.add(acceleration);
        position.add(velocity);
        acceleration.mult(0);
    }

    private float map(float x, float startX, float endX, float startY, float endY) {
        float p = (x - startX)/endX;
        return startY + p * (endY - startY);
    }

    public void render(App window, List<Boid> flock) {
        this.herdUpdate(flock);
        this.bordersUpdate(window);
        this.positionUpdate();

        radius = map(position.z, 0, window.dimensions.z, 13, 4);
        int alphaColor = (int) map(position.z, 0, window.dimensions.z, 180, 70);
        window.fill(0, alphaColor);
        window.circle(position.x, position.y, radius);
    }
}
