package com.curtisjhu.Birds;

import processing.core.*;

import java.util.List;

public class Bird {
    private PVector position;
    private PVector velocity;
    private final float speedLimit = 2.5f;
    private final int visionField = 40;


    public Bird(PVector position) {
        this.position = position;
        this.velocity = PVector.random3D().setMag(speedLimit);
    }

    /** Returns a PVector that describes the desired velocity */
    public void towardsCenter(List<Bird> flock){
        PVector closestNeighbor = new PVector(0, 0, 0);
        float minDistance = 100000f;
        for (Bird other : flock) {
            float d = other.position.dist(this.position);
            if (d < minDistance) {
                minDistance = d;
                closestNeighbor = other.position;
            }
        }

        PVector direction = PVector.sub(closestNeighbor, position);
        direction.setMag(speedLimit);
        direction.mult(0.05f);
        velocity.add(direction);
    }

    public void collisionAvoidance(List<Bird> flock) {
        int desiredSpace = 10;
        PVector avgDirection = new PVector(0, 0);
        int total = 0;
        for (Bird other : flock) {
            if (other != this) {
                float d = other.position.dist(this.position);
                if (d > 0 && d < visionField) {
                    // Vector from other boid towards yourself.
                    PVector normal = PVector.sub(this.position, other.position);
                    normal.normalize();
                    // desire to have no one in front
                    PVector direction = velocity.copy();
                    direction.normalize().div((float) Math.sqrt(2));

                    double angle = PVector.angleBetween(normal, direction);
                    int wingspan = 4;
                    if (angle < Math.PI / 2 && d * Math.sin(angle) < wingspan) {
                        PVector projection = normal.copy().mult(PVector.dot(direction, normal));
                        PVector oppositeDir = PVector.sub(projection, normal);
                        oppositeDir.mult(0.08f);
                        avgDirection.add(oppositeDir);
                    }

                    if (d < desiredSpace) {
                        normal.mult(desiredSpace).div(d); // strength of correction = 1/d
                        avgDirection.add(normal);
                        total++;
                    }
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

    public void matchVelocity(List<Bird> flock) {
        PVector avgVelocity = new PVector(0, 0);
        int total = 0;
        for (Bird other : flock) {
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
        if (position.x < -padding) position.x = window.dimensions.x + padding;
        else if (position.x > window.dimensions.x + padding) position.x = -padding;

        if (position.y < -padding) position.y = window.dimensions.y + padding;
        else if (position.y > window.dimensions.y + padding) position.y = -padding;
    }

    private void positionUpdate(List<Bird> flock) {
        this.collisionAvoidance(flock);
        this.matchVelocity(flock);
        this.towardsCenter(flock);
        this.velocity.limit(speedLimit);
        this.position.add(this.velocity);
    }

    public void render(App window, List<Bird> flock) {
        this.bordersUpdate(window);
        this.positionUpdate(flock);

        window.circle(position.x, position.y, 3);
    }
}
