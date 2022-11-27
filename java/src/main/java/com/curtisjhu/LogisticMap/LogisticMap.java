package com.curtisjhu.LogisticMap;

import java.util.ArrayList;
import java.util.List;

public class LogisticMap {
    /**
     *  x_{n+1} = r x_n ( 1 - x_n )
     *
     *  Equilibrium is at:
     *  x_n = r x_n ( 1 - x_n )
     *
     *  0 < x_n < 1
     *
     *  r:
     *  Below 3, we converge
     *  Above 3, we get oscillations
     *  Above 4, we get chaos
     */

    NumberSet domain;
    NumberSet range;

    LogisticMap(NumberSet domain, NumberSet range) {
        this.domain = domain;
        this.range = range;
    }

    float[] generate(float r, float x_next) {
        int n = 500;
        float[] next = new float[100];

        for (int i = 0, l = n - next.length; i < n; i++) {
            x_next = r * x_next * (1 - x_next);
            if (i >= l)
                next[i-l] = x_next;
        }
        return next;
    }

    private float map(float value, NumberSet set, float start, float stop) {
        return start + (stop - start) * (value - set.start) / (set.stop - set.start);
    }

    void render(App plot) {
        float r = domain.start;
        for (; r < domain.stop; r += 0.001) {
            float[] x_next = generate(r, .5f);

            float x = map(r, domain, 0, plot.width);
            for (float ypos : x_next) {
                float y = map(ypos, range, plot.height, 0);
                plot.point(x, y);
            }
        }
    }
}
